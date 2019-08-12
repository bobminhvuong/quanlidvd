import { MessagesComponent } from './../container/messages/messages.component';
import { ExchangeComponent } from './../container/client/exchange/exchange.component';
import { DvdDetailComponent } from './../container/manager-dvd/dvd-detail/dvd-detail.component';
import { CatalogComponent } from './../container/catalog/catalog.component';
import { CanActivateService } from './../service/auth/can-activate.service';
import { DashboardComponent } from './../container/dashboard/dashboard.component';
import { WarehouseComponent } from './../container/warehouse/warehouse.component';
import { ManagerDVDComponent } from './../container/manager-dvd/manager-dvd.component';
import { ClientComponent } from './../container/client/client.component';
import { HistoryComponent } from './../container/history/history.component';
import { AcountComponent } from './../container/acount/acount.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../container/main/main.component';
import { ProfileComponent } from '../container/profile/profile.component';
import { RentDiscComponent } from '../container/rent-disc/rent-disc.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'manager', component: MainComponent, canActivate: [CanActivateService], children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'acounts', component: AcountComponent },
            { path: 'histories', component: HistoryComponent },
            { path: 'clients', component: ClientComponent },
            { path: 'clients/:id', component: ExchangeComponent },
            {
                path: 'dvds', component: ManagerDVDComponent

            },
            { path: 'dvds/:id', component: DvdDetailComponent },
            { path: 'warehouse', component: WarehouseComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'rent-disc', component: RentDiscComponent },
            { path: 'catalog', component: CatalogComponent },
            { path: 'messager', component: MessagesComponent }
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { enableTracing: true })
    ]
})
export class AppRoutingModule { }
