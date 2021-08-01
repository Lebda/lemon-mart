import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { Role } from '../auth/auth.enum';

import { CategoriesComponent } from './categories/categories.component';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductsComponent } from './products/products.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      { path: '', redirectTo: '/inventory/home', pathMatch: 'full' },
      {
        path: 'home',
        component: InventoryHomeComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: Role.Cashier,
        },
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: Role.Cashier,
        },
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: Role.Cashier,
        },
      },
      {
        path: 'stock-entry',
        component: StockEntryComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: Role.Cashier,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
