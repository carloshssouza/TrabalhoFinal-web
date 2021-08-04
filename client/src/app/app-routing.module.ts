import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { BrokerCrudComponent } from './views/broker-crud/broker-crud.component';
import { BrokerCreateComponent } from './components/brokers/broker-create/broker-create.component';
import { BrokerUpdateComponent } from './components/brokers/broker-update/broker-update.component';
import { SalesCrudComponent } from './views/sales-crud/sales-crud.component';
import { SaleCreateComponent } from './components/sale/sale-create/sale-create.component';
import { ReadPaymentComponent } from './views/read-payment/read-payment.component';
import { ReadReportComponent } from './views/read-report/read-report.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "products/update/:codigo",
    component: ProductUpdateComponent
  },
  {
    path: "products/delete/:codigo",
    component: ProductDeleteComponent
  },
  {
    path: "brokers",
    component: BrokerCrudComponent
  },
  {
    path: "brokers/create",
    component: BrokerCreateComponent
  },
  {
    path: "brokers/update/:creci",
    component: BrokerUpdateComponent
  },
  {
    path: "sales",
    component: SalesCrudComponent
  },
  {
    path: "sales/create",
    component: SaleCreateComponent
  },
  {
    path: "payments",
    component: ReadPaymentComponent
  },
  {
    path: "reports",
    component: ReadReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
