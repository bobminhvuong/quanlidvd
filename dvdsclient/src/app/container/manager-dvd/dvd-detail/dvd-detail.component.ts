import { MainService } from './../../../service/main.service';
import { CatalogService } from './../../../service/catalog/catalog.service';
import { DvdService } from 'src/app/service/dvd/dvd.service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DvdDetailService } from 'src/app/service/dvdDetail/dvd-detail.service';

@Component({
  selector: 'app-dvd-detail',
  templateUrl: './dvd-detail.component.html',
  styleUrls: ['./dvd-detail.component.scss']
})
export class DvdDetailComponent implements OnInit {

  host = '';
  dataEdit = {};
  validateForm: FormGroup;
  validateFormDvdDetail: FormGroup;
  isLoadingOne = false;
  codeDvd = '';
  dataImg: any | null = null;
  pageIndex = 1;
  pageSize = 5;
  total = 0;
  listOfData = [];
  loading = true;
  order: any[] | null = null;
  searchVL: any | null = null;
  filterGender = [{ text: 'male', value: 'RENT' }, { text: 'female', value: 'RENTED' }];
  searchDataFilter: any | null = null;
  deleteParam: any | null = null;
  dataDVD = {};
  listCatalog = [];
  idDvd: any | null = null;
  isVisible = false;

  constructor(private fb: FormBuilder,
    private acRoute: ActivatedRoute,
    private router: Router,
    private dvdSV: DvdService,
    private catalogSV: CatalogService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private dvdDetaiSV: DvdDetailService,
    private mainSV: MainService
  ) { }



  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      supplier: [null, [Validators.required]],
      price: [null, [Validators.required]],
      note: [null],
      catalogId: [null, [Validators.required]]
    });

    this.validateFormDvdDetail = this.fb.group({
      code: [null, [Validators.required]]
    });

    this.acRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== 'addNew') {
        this.idDvd = id;
        this.dvdSV.getByIdDvd(Number(id)).subscribe(res => {
          this.dataDVD = res;
          this.dataImg = res.image || {};
          this.searchData(true);
        });
      }
    });

    this.catalogSV.getAll({}).subscribe(res => {
      this.listCatalog = res.rows;
    });

    this.host = this.mainSV.host1();
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

  submitForm(): void {
    this.isLoadingOne = true;
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      // tslint:disable-next-line:prefer-const
      let img = this.dataImg && this.dataImg.id ? { imageId: this.dataImg.id } : {};

      if (!this.idDvd) {
        // tslint:disable-next-line:prefer-const
        this.dvdSV.createDvd({ ...this.validateForm.value, ...img }).subscribe(res => {
          this.dataDVD = res;
          this.idDvd = res.id;
          this.isLoadingOne = false;
          this.message.create('success', `Tạo DVD thành công!`);
        });
      } else {
        this.dvdSV.updateDvd({ ...this.dataDVD, ...this.validateForm.value, ...img }).subscribe(res => {
          this.dataDVD = res;
          this.isLoadingOne = false;
          this.message.create('success', `Đã cập nhật DVD!`);

        });
      }
    } else {
      this.isLoadingOne = false;
    }
  }

  handelCancel() {
    this.router.navigate(['/manager/dvds']);
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    // tslint:disable-next-line:prefer-const
    let filter = {
      limit: this.pageSize,
      offset: (this.pageIndex - 1) * this.pageSize,
      where: { dvdId: this.idDvd },
      order: [['createdAt', 'DESC']]
    };

    if (this.order && !reset) {
      // tslint:disable-next-line:prefer-const
      let ft = {
        order: []
      };
      ft.order.push(this.order);
      filter.order = ft.order;
    }

    if (this.searchVL && !reset) {
      filter.where[this.searchVL.key] = { like: `.$.${this.searchVL.value}.$.` };
    }

    if (this.searchDataFilter && !reset) {
      filter.where[this.searchDataFilter.key] = this.searchDataFilter.value;
    }
    this.getAll(filter);
  }

  updateFilter(value: string[], data): void {

    if (value.length === 0) {
      this.searchData(true);
    } else {
      // tslint:disable-next-line:prefer-const
      let tmp = {
        key: '',
        value: ''
      };
      tmp.key = data.key;
      tmp.value = value[0];
      this.searchDataFilter = tmp;
      this.searchData();
    }
  }

  search(value) {
    this.searchVL = value;
    this.pageIndex = 1;
    this.searchData();
  }

  reset() {
    this.searchData(true);
  }

  sort(sort: { key: string; value: string }): void {
    // tslint:disable-next-line:prefer-const
    let sortValue = sort.value === 'descend' ? 'DESC' : 'ASC';
    this.order = [sort.key, sortValue];
    this.searchData();
  }

  delete(value): void {
    this.deleteParam = value;
    this.modalService.confirm({
      nzTitle: 'Delete',
      nzContent: 'Bạn có chắc chắn xóa mục này?',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.dvdDetaiSV.deleteDvdDetail(this.deleteParam.id).subscribe(r => {
          this.searchData(true);
        });
      }
    });
  }

  getAll(filter) {
    this.dvdDetaiSV.getAll(filter).subscribe(res => {
      this.listOfData = res.rows;
      this.loading = false;
      this.total = res.count;
    });
  }

  addDvdDetail() {
    // tslint:disable-next-line:forin
    for (const i in this.validateFormDvdDetail.controls) {
      this.validateFormDvdDetail.controls[i].markAsDirty();
      this.validateFormDvdDetail.controls[i].updateValueAndValidity();
    }
    if (this.validateFormDvdDetail.valid) {
      this.dvdDetaiSV.createDvdDetail({ ...this.validateFormDvdDetail.value, ...{ status: 'RENT', dvdId: this.idDvd } }).subscribe(r => {
        this.searchData(true);
        this.codeDvd = '';
        this.message.create('success', `Đã thêm 1 bản ghi!`);

      });
    }
  }
}
