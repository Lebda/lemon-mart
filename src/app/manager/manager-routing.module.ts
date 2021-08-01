import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardData } from '../auth/auth-guard.data';
import { AuthGuard } from '../auth/auth-guard.service';
import { Role } from '../auth/auth.enum';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagementComponent } from './user-management/user-management.component';

const authData = new AuthGuardData([Role.Manager]);

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: '/manager/home', pathMatch: 'full' },
      {
        path: 'home',
        component: ManagerHomeComponent,
        canActivate: [AuthGuard],
        data: authData,
      },
      {
        path: 'users',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: authData,
      },
      {
        path: 'receipts',
        component: ReceiptLookupComponent,
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
export class ManagerRoutingModule {}
