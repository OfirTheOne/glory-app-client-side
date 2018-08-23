import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { AgentAuthService, UserApiService, LoadingService } from '../../../services';

/**
 * Generated class for the UserAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-address',
  templateUrl: 'user-address.html',
})
export class UserAddressPage {

  editMode = false;
  userAddressForm: FormGroup;

  constructor(
    private authService: AgentAuthService,
    private userApi: UserApiService,
    private loadingService: LoadingService,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.userAddressForm = new FormGroup({
      country: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      postcode: new FormControl()
    });
    console.log(this.userAddressForm);
  }


  ionViewDidLoad() {
    setTimeout(() => {
      console.log('ionViewDidLoad UserAddressPage');
      this.initForm();
    });
  }

  public async onSubmit() {
    if (this.authService.isSignIn()) {
      const headers = this.authService.getAuthHeader();

      const data = {
        address: {
          country: this.userAddressForm.value['country'],
          city: this.userAddressForm.value['city'],
          address: this.userAddressForm.value['address'],
          postcode: this.userAddressForm.value['postcode'],
        }
      }
      const loading = this.loadingService.presentLoadingAlert();
      try {
        const result = await this.userApi.postUserData(headers, { data })
        console.log(result)
        this.authService.updateUserOnPostUserDataRequest(result);
        loading.dismiss();
      } catch (error) {
        console.log(error);
        loading.dismiss();
        this.initForm();
      }
    }
  }
  
  private initForm() {
    const user = this.authService.getProfile();
    this.resetFormToActualUserData(user.address);
    this.setFiledsState(false);
  }


  public onEditModeToggle() {
    const currentEditMode = this.editMode;
    this.editMode = !currentEditMode;
    this.setFiledsState(!currentEditMode);

    if (!currentEditMode) {
      const user = this.authService.getProfile();
      this.resetFormToActualUserData(user.address);
    }

  }

  private setFiledsState(currentEditMode) {
    if (currentEditMode) {
      this.userAddressForm.enable();
    } else {
      this.userAddressForm.disable();
    }
  }

  private resetFormToActualUserData(formValues) {
    if (formValues) {
      // reset country, address, city, postcode fileds
      this.userAddressForm.reset({
        country: formValues.country,
        address: formValues.address,
        city: formValues.city,
        postcode: formValues.postcode
      });
    }
  }

}
