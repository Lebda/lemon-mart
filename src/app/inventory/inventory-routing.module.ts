import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardData } from '../auth/auth-guard.data';
import { AuthGuard } from '../auth/auth-guard.service';
import { Role } from '../auth/auth.enum';

import { CategoriesComponent } from './categories/categories.component';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductsComponent } from './products/products.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';

const authData = new AuthGuardData([Role.Clerk, Role.Manager]);

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
        data: authData,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        data: authData,
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: authData,
      },
      {
        path: 'stock-entry',
        component: StockEntryComponent,
        canActivate: [AuthGuard],
        data: authData,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
