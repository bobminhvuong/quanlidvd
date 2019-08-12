import { InvoicesService } from './service/invoices/invoices.service';
import { DvdDetailService } from './service/dvdDetail/dvd-detail.service';
import { CatalogService } from './service/catalog/catalog.service';
import { ClientService } from './service/client/client.service';

import { UserService } from './service/user/user.service';
import { LoginService } from './service/auth/login.service';
import { CanActivateService } from './service/auth/can-activate.service';
import { GlobalDataService } from './service/globalData/global-data.service';
import { AppRoutingModule } from './router/app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzButtonModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AcountComponent } from './container/acount/acount.component';
import { ClientComponent } from './container/client/client.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { HistoryComponent } from './container/history/history.component';
import { MainComponent } from './container/main/main.component';
import { ManagerDVDComponent } from './container/manager-dvd/manager-dvd.component';
import { ProfileComponent } from './container/profile/profile.component';
import { RentDiscComponent } from './container/rent-disc/rent-disc.component';
import { WarehouseComponent } from './container/warehouse/warehouse.component';
import { MainService } from './service/main.service';
import { TableComponent } from './components/table/table.component';
import { CreateOrUpdateAcountComponent } from './container/acount/create-or-update-acount/create-or-update-acount.component';
import { COrUClientComponent } from './container/client/cor-uclient/cor-uclient.component';
import { CatalogComponent } from './container/catalog/catalog.component';
import { CoruCatalogComponent } from './container/catalog/coru-catalog/coru-catalog.component';
import { DvdDetailComponent } from './container/manager-dvd/dvd-detail/dvd-detail.component';
import { ImageCtrComponent } from './components/image-ctr/image-ctr.component';
import { FileUploadService } from './service/fileUpload/file-upload.service';
import { ExchangeComponent } from './container/client/exchange/exchange.component';
import { ChatService } from './service/chat/chat.service';
import { MessagesComponent } from './container/messages/messages.component';
import { InboxComponent } from './container/messages/inbox/inbox.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AcountComponent,
    ClientComponent,
    DashboardComponent,
    HistoryComponent,
    MainComponent,
    ManagerDVDComponent,
    ProfileComponent,
    RentDiscComponent,
    WarehouseComponent,
    LoginComponent,
    TableComponent,
    CreateOrUpdateAcountComponent,
    COrUClientComponent,
    CatalogComponent,
    CoruCatalogComponent,
    DvdDetailComponent,
    ImageCtrComponent,
    ExchangeComponent,
    MessagesComponent,
    InboxComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NzButtonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    GlobalDataService,
    CanActivateService,
    LoginService,
    MainService,
    UserService,
    ClientService,
    CatalogService,
    DvdDetailService,
    FileUploadService,
    InvoicesService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
