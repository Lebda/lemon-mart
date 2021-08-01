import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardData } from '../auth/auth-guard.data';

import { AuthGuard } from '../auth/auth-guard.service';
import { Role } from '../auth/auth.enum';
import { PosComponent } from './pos/pos.component';

const authData = new AuthGuardData([Role.Cashier, Role.Manager]);

const routes: Routes = [
  {
    path: '',
    component: PosComponent,
    canActivate: [AuthGuard],
    data: authData,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
