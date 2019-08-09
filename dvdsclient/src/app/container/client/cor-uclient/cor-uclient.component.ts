import { ClientService } from './../../../service/client/client.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cor-uclient',
  templateUrl: './cor-uclient.component.html',
  styleUrls: ['./cor-uclient.component.scss']
})
export class COrUClientComponent implements OnInit {
  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  dateFormat = 'YYYY/MM/DD';

  constructor(private clientService: ClientService, private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null],
      dob: [null, [Validators.required]],
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
    console.log(this.validateForm.value)
    if (this.validateForm.status === 'VALID') {
      let client = this.validateForm.value;
      client = { ...this.dataEdit, ...client };
      if (this.dataEdit.id) {
        this.clientService.updateClient(client).subscribe(r => {
          this.handleCancel();
        });
      } else {
        this.clientService.createClient(client).subscribe(r => {
          this.handleCancel();
        });
      }
    }
  }
}
