import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class TabNavService {

    onSetSelectedTab = new Subject<any>();
    constructor() {}

    public subscribeOnSetSelectedTab(callback: (params) => void): Subscription {
        return this.onSetSelectedTab.subscribe(callback);
    }

    public dispatchOnSetSelectedTab(params?: any) {
        this.onSetSelectedTab.next(params);
    }
}