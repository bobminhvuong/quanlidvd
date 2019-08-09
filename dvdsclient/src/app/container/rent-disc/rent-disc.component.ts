import { DvdDetailService } from './../../service/dvdDetail/dvd-detail.service';
import { ClientService } from './../../service/client/client.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { InvoicesService } from 'src/app/service/invoices/invoices.service';

@Component({
  selector: 'app-rent-disc',
  templateUrl: './rent-disc.component.html',
  styleUrls: ['./rent-disc.component.scss']
})
export class RentDiscComponent implements OnInit {
  inputSearchClient: string;
  inputSearchDvd: string;
  optionsClient = [];
  optionsDvd = [];
  arrDvd = [];
  dvd: any = null;
  dvd1: any = null;
  validateForm: FormGroup;
  totalPrice = '';
  client = {};
  total = 10;
  constructor(private fb: FormBuilder, private clientSV: ClientService, private DvdDetailSv: DvdDetailService, private message: NzMessageService, private invoiceSV: InvoicesService) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      dateReturn: [null]
    });

  }

  onChange(value: string): void {
    // tslint:disable-next-line:prefer-const
    let query = {
      where: {
        or: {
          fullName: {
            like: `.$.${this.inputSearchClient}.$.`
          },
          email: {
            like: `.$.${this.inputSearchClient}.$.`
          },
          phoneNumber: {
            like: `.$.${this.inputSearchClient}.$.`
          }
        }
      }
    };
    this.clientSV.getAll(query).subscribe(r => {
      this.optionsClient = r.rows;
    });
  }

  onChangeDvd(value: string): void {
    // tslint:disable-next-line:prefer-const
    let query = {
      where: {
        code: {
          like: `.$.${this.inputSearchDvd}.$.`
        },
        status: 'RENT'
      }
    };
    this.DvdDetailSv.getAll(query).subscribe(r => {
      this.optionsDvd = r.rows;
    });
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private chooseClient(op) {
    this.client = op;
  }

  private chooseDvd(op) {
    // tslint:disable-next-line:prefer-const
    let tmp = this.arrDvd.find(i => {
      return i.id === op.id;
    });

    if (!tmp) {
      this.dvd1 = op;
    } else {
      this.dvd1 = {};
      this.inputSearchDvd = '';
      this.message.create('error', `Code ${tmp.code} đã có trong hóa đơn!`);
    }
  }

  private handelAddDvd() {
    if (this.dvd1 && this.dvd1.id) {
      this.arrDvd.push(this.dvd1);
      this.dvd1 = {};
      this.inputSearchDvd = '';

      console.log(this.arrDvd);
    }

  }

  private submitForm() {
    // const invoices = {
    //   totalPrice: 0,
    //   dateReturn: this.dateReturn,
    //   client: this.client,
    //   dvd: this.arrDvd
    // };
    // this.invoiceSV.createInvoice(invoices).subscribe(r => {
    //   console.log(r);
    // });
  }
}
