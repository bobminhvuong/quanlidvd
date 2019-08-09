import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  constructor(
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.acRoute.paramMap.subscribe(params => {
      console.log(params);
    });
  }

}
