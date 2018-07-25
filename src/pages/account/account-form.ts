import { FormGroup } from '@angular/forms';
class AccountForm {

    myForm: FormGroup;
    editMode = false;

    onEditModeToggle() {
        const currentEditMode = this.editMode;
        this.editMode = !currentEditMode;
        this.setFiledsState();
    }

    setFiledsState(callback?: (params?) => void) {
        const currentEditMode = this.editMode;  
        if (currentEditMode) {
          this.myForm.enable();
        } else {
          this.myForm.disable();
        }
        callback? callback(currentEditMode) : null ;

    }

    resetFormToActualUserData(actualData: {[key: string]: string}, callback?: (params?) => void) { 
        this.myForm.reset(actualData);
        callback? callback(actualData) : null;
    }

    onSubmit() { }
}