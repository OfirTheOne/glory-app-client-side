import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, RadioGroup, RadioButton } from 'ionic-angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AgentAuthService } from '../../../services/auth/agent-auth.service';
import { UserApiService } from '../../../services/api-services/user-api/user-api.service';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  @ViewChild('genderMale') genderMale: RadioButton;
  @ViewChild('genderFemale') genderFemale: RadioButton;

  userDetailsForm: FormGroup;
  editMode = false;

  constructor(
    private authService: AgentAuthService,
    private userApi: UserApiService,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.userDetailsForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthDate: new FormControl(),
    });
    console.log(this.userDetailsForm);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
    const user = this.authService.getProfile();
    setTimeout(() => {
      this.resetFormToActualUserData(user.personalData);
      this.setFiledsState();
    });
  }


  public async onSubmit() {
    if (this.authService.isSignIn()) {
      const headers = this.authService.getAuthHeader();
      const birthDate = this.convertBirthDate({year: "2018", month: "07", day: "25"})
      console.log(birthDate);
      const data = {
        personalData: {
          firstName: this.userDetailsForm.value['firstName'],
          lastName: this.userDetailsForm.value['lastName'],
          birthDate,
          gender: this.getSelectedGender(),
        }
      }
      
      try {
        const result = await this.userApi.postUserData(headers, { data })
        console.log(result)
        this.authService.updateUserOnPostUserDataRequest(result);
      } catch (error) {
        console.log(error)
      }
      
    }
  }

  public onEditModeToggle() {
    const currentEditMode = this.editMode;
    this.editMode = !currentEditMode;
    this.setFiledsState();

    if (!currentEditMode) {
      const user = this.authService.getProfile();
      this.resetFormToActualUserData(user.personalData);
    }

  }

  private setFiledsState() {
    const currentEditMode = this.editMode;
    this.genderMale.disabled = !currentEditMode;
    this.genderFemale.disabled = !currentEditMode;
    if (currentEditMode) {
      this.userDetailsForm.enable();
    } else {
      this.userDetailsForm.disable();
    }
  }

  private resetFormToActualUserData(formValues) {

    if (formValues) {
      // reset firstName , lastName & birthDate fileds
      this.userDetailsForm.reset({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        birthDate: this.convertBirthDate(formValues.birthDate)
      });
      // reset gender filed
      if (formValues.gender == 'male') {
        this.genderMale.checked = true;
      } else if (formValues.gender == 'female') {
        this.genderFemale.checked = true;
      }
    }
  }

  private getSelectedGender() {
    if (this.genderMale.checked == true) {
      return 'male';
    } else if (this.genderFemale.checked == true) {
      return 'female';
    }
  }


  private convertBirthDate(birthDate: {year, month, day} | string) {
    console.log(birthDate);
    let converResult;
    if (typeof birthDate == 'string') {
      const dateParameters = birthDate.split('-');
      converResult = {
        year: dateParameters[0],
        month: dateParameters[1],
        day: dateParameters[2],
      }
    } else if (typeof birthDate == 'object') {
      converResult = `${birthDate.year}-${birthDate.month}-${birthDate.day}`;
    }
    return converResult;
  }
}
