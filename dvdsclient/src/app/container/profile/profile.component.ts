import { MainService } from './../../service/main.service';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  host = '';
  dataImg: any | null;
  dataEdit: any;
  isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  dateFormat = 'YYYY/MM/DD';

  constructor(private userSV: UserService, private fb: FormBuilder, private globalSV: GlobalDataService, private mainSV: MainService) { }

  ngOnInit() {
    this.globalSV.getCurrentUser().subscribe(r => {
      this.dataEdit = r;
    });
    this.host = this.mainSV.host1();
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, [Validators.required]],
      address: [null],
      dob: [null, [Validators.required]],
      note: [null],
      gender: [null, [Validators.required]]
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      let user = this.validateForm.value;
      user = { ...this.dataEdit, ...user };

      delete user.checkPassword;
      if (this.dataEdit.id) {
        this.userSV.updateUser(user).subscribe(r => {
          this.handleCancel();
        });
      } else {
        this.userSV.createUser(user).subscribe(r => {
          this.handleCancel();
        });
      }
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  onOkImg(e) {
    this.dataImg = e;
    this.isVisible = false;
  }

  onCancelImg(e) {
    this.isVisible = false;
  }

  showImgForm() {
    this.isVisible = true;
  }


}
