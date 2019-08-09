import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from './../../../service/catalog/catalog.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-coru-catalog',
  templateUrl: './coru-catalog.component.html',
  styleUrls: ['./coru-catalog.component.scss']
})
export class CoruCatalogComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;

  constructor(private catalogService: CatalogService, private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      note: [null]
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
      let catalog = this.validateForm.value;
      catalog = { ...this.dataEdit, ...catalog };
      if (this.dataEdit.id) {
        this.catalogService.updateCatalog(catalog).subscribe(r => {
          this.handleCancel();
        });
      } else {
        this.catalogService.createCatalog(catalog).subscribe(r => {
          this.handleCancel();
        });
      }
    }
  }
}
