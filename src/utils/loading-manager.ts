// import { Injectable } from "@angular/core";

import { ModalController, Modal } from 'ionic-angular';

import { LoadPage } from './../pages';


// @Injectable()
export class LoadingManager {
    constructor(private modalCtrl:  ModalController) { }

    currentDisplayedModal: Modal;

    public PresentsLoadPage(callback?: (data, role) => void): Modal {
        if(!this.isLoadingModalDisplayed()) {
            this.currentDisplayedModal = this.modalCtrl.create(LoadPage);
            this.currentDisplayedModal.present();
            callback? this.currentDisplayedModal.onDidDismiss(callback) : null;
            return this.currentDisplayedModal;
        }
    }

    public DismissLoadPage() {
        if(this.isLoadingModalDisplayed()) {
            this.currentDisplayedModal.dismiss();
            this.currentDisplayedModal = undefined;
        }
    }

    private isLoadingModalDisplayed() {
        return this.currentDisplayedModal && this.currentDisplayedModal.isOverlay;
    }
}