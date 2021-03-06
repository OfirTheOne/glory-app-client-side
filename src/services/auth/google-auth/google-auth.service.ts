import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { HttpHeaders } from "@angular/common/http";

import { EnvironmentService } from '../../environment/environment.service';
import { UserApiService } from "../../api-services/user-api/user-api.service";
import { AuthStrategyService } from "../auth-strategy-service.abstract";

import { ServerResponse } from './../../../models/custom-auth-models/server-response.interface';
import { UserDataBase } from "../../../models/user-data-base.interface";
import { SignInResult } from "../../../models/google-auth-models/sign-in-result.interface";
import { AuthResponse } from '../../../models/custom-auth-models/auth-response.interface';
import { UserAuthData } from "../../../models/google-auth-models/user-auth-data.interface";
import { Provider } from "../../../models/provider.enum";

const EXTRA_SCOPES = "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me";
/**
 * << READ THIS >>
 * 1.   Using this service requires the api 'https://apis.google.com/js/platform.js' .
 *      Add this line <script src="https://apis.google.com/js/platform.js" async defer></script>
 *      to the index.html file .
 * 
 * 2.   define the string 'CLIENT_ID' in an external json file, and import it to this service . 
 * 
 * doc :
 *  https://developers.google.com/identity/protocols/OAuth2UserAgent#example
 */

@Injectable()
export class GoogleAuthStrategyService extends AuthStrategyService {


    // reasurce
    private auth2;
    private isAuth2Init = false;
    private auth2InitEvent: Subject<void> = new Subject();
    private delayedSignInOnLoadEvent: Subject<void> = new Subject();

    constructor(private environment: EnvironmentService, userApi: UserApiService) {
        super(Provider.GOOGLE_PROVIDER, 'google', userApi);
        this.googleAuthResourceInit();
    }


    /************************ public ************************/  

    public async onSignIn(): Promise<UserDataBase> {
        console.log(`GAS.onSignIn()`);
        // auth2 is init 
        if (this.isAuth2Init) {

            // sign in the user using google services.
            try {
                const res = await this.auth2.signIn();
                console.log(res);
                console.log('User signed in.');
                const token = res.Zi.id_token;
                return await this._signInToServer({ token });
                
            } catch (error) {
                console.log(error);
                throw error;
            }
                
        } else {

            throw new Error('the auth2 object is\'nt initialized');
        }
    }

    public async onSignOut(): Promise<void> {
        console.log(`GAS.onSignOut()`);
        const tmpProfile = this.userDbProfile;
        if (this.isAuth2Init && this.auth2.isSignedIn.get()) {
            this.userDbProfile = undefined;
            //const headers = this.getAuthHeader();
            try {
                await this.auth2.signOut(); // this method do have no return value
            } catch(e) {
                console.log(e)
                this.userDbProfile = tmpProfile;
            }
            console.log('User signed out.');
            // await this._signOutFromServer(headers);

        } else {
            throw new Error('the user is\'nt sign in or the auth2 object is\'nt initialized');
        }
    }

    /**
     * @returns true if the current user is currently signed in. 
     * if the auth2 object is not initialized it will return false.
     */
    public isSignIn(): boolean {
       // console.log(`GAS.isSignIn()`);

        if (this.isAuth2Init) {
            return (this.auth2.isSignedIn.get() /* && this.userDbProfile != undefined */);
        } else {
            return false;
        }
    }

    public getAuthHeader(): HttpHeaders {
        console.log(`GAS.getAuthHeader()`);

        const token = this.getUserAuthData().id_token;
        return this._buildAuthHeader({token, providerName: this.getProviderName() });
    }


    public getToken(): string {
        return this.getUserAuthData().id_token;
    }

    /** @description subscribe to auth resource done initializing event. 
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    public authResInitEventSubscribe(callback: () => void): Subscription {
        return this.auth2InitEvent.subscribe(callback);
    }

    /** @description subscribe to delayed signIn event. 
     *          when the user is allready signed in when the app load. 
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    public delayedSignInOnLoadEventSubscribe(callback: () => void): Subscription {
        return this.delayedSignInOnLoadEvent.subscribe(callback);
    }

    /**
     * @returns true if the auth2 object is initialized.
     */
    public isAuthResourceInit(): boolean {
        return this.isAuth2Init;
    }


    /************************ protected ************************/  

    protected authenticateServerResponse(res: AuthResponse): boolean {
        const authValue = res.authValue;
        const authuid = this.auth2.currentUser.get().getBasicProfile().getId();
        return authValue == authuid;
    }


    /************************ private ************************/  

    private googleAuthResourceInit() {
        /**
         * doc : 
         *  https://developers.google.com/identity/protocols/OAuth2UserAgent#example
         *  https://developers.google.com/identity/protocols/OAuth2UserAgent#creatingclient
         */

        const setAuthResource = () => {
            // listening to both client and auth2 objects.
            window['gapi'].load('client:auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                    client_id: this.environment.get('GGL_CLIENT_ID'),
                    fetch_basic_profile: true,
                    scope: `profile ${EXTRA_SCOPES}`
                });
                window['gapi'].client.init({
                    'apiKey': this.environment.get('GGL_API_KEY'),
                    'clientId': this.environment.get('GGL_CLIENT_ID'),
                    'scope': `https://www.googleapis.com/auth/drive.metadata.readonly  ${EXTRA_SCOPES}`,
                    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
                });

                const authInstance = window['gapi'].auth2.getAuthInstance();
         
                this.isAuth2Init = true;
                this.auth2InitEvent.next();
            });
        }

        // if the plugin has been loaded
        if (document.readyState === 'complete') {
            setAuthResource();
        } else {
            // if the plugin has not been loaded, listening to load event of window
            // and when it dispatched calling setAuth2()
            try {
                window.addEventListener('load', (e) => {
                    setAuthResource();
                });
            } catch (ex) {
                console.log(ex);
            }
        }
    }

    private getUserAuthData(): undefined | UserAuthData {
        // doc : https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserget
        if (this.auth2.isSignedIn.get()) {
            const curUser = this.auth2.currentUser.get();
            const userAuthData = curUser.Zi;
            return userAuthData;
        } else {
            console.log('the user is\'nt sign in');
        }
    }


}
