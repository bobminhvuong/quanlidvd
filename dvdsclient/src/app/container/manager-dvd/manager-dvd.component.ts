import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DvdService } from 'src/app/service/dvd/dvd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dvd',
  templateUrl: './manager-dvd.component.html',
  styleUrls: ['./manager-dvd.component.scss']
})
export class ManagerDVDComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;
  order: any[] | null = null;
  searchVL: any | null = null;
  searchDataFilter: any | null = null;
  deleteParam: any | null = null;
  constructor(private modalService: NzModalService, private dvdSV: DvdService, private router: Router) { }

  ngOnInit() {
    this.searchData(true);
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
      where: {},
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

    if (this.searchDataFilter && this.searchVL.value !== '' && !reset) {
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
        this.dvdSV.deleteDvd(this.deleteParam.id).subscribe(r => {
          this.searchData();
        });
      }
    });
  }

  getAll(filter) {
    this.dvdSV.getAll(filter).subscribe(res => {
      this.listOfData = res.rows;
      this.loading = false;
      this.total = res.count;
    });
  }

  handleCorU(client) {
    return client ? this.router.navigate(['manager/dvds', client.id]) : this.router.navigate(['manager/dvds', 'addNew']);
  }
}
