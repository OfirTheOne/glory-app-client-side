import { Injectable, Inject } from "@angular/core";

import { ModalController, Modal, LoadingController, Loading } from 'ionic-angular';

import { loaderContant, LoaderType } from './load-content';
// import { LoadPage } from './../../pages';


@Injectable()
export class LoadingService {
    constructor(
        @Inject(ModalController) private modalCtrl: ModalController,
        @Inject(LoadingController) private loadingCtrl: LoadingController) { }

    // currentDisplayedModal: Modal;

    public presentsLoadPage(loadPage): Modal {
        const modal = this.modalCtrl.create(loadPage);
        modal.present();
        return modal;
    }

    // public DismissLoadPage() {
    //     if(this.isLoadingModalDisplayed()) {
    //         this.currentDisplayedModal.dismiss();
    //         this.currentDisplayedModal = undefined;
    //     }
    // }

    // private isLoadingModalDisplayed() {
    //     return this.currentDisplayedModal && this.currentDisplayedModal.isOverlay;
    // }


    public presentLoadingAlert(text?: string, loaderType: LoaderType = LoaderType.Clip_Rotate): Loading {
        const contant = this.getLoaderContantByType(loaderType)
        const loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: contant + (text? 
           `<p class="text-center">${text}</p>` :
           ''),
        });
        loading.present();
        return loading;
    }

    private getLoaderContantByType(loaderType: LoaderType) {
        return loaderContant[`${loaderType}`];
    }
}