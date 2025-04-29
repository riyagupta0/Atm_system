import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { CreditComponent } from './credit/credit.component';
import { CheckBalanceComponent } from './check-balance/check-balance.component';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { StatementComponent } from './statement/statement.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'credit', component: CreditComponent },
  { path: 'check-balance', component: CheckBalanceComponent },
  { path: 'change-pin', component: ChangePinComponent },
  { path: 'transfer-funds', component: TransferFundsComponent },
  { path: 'statement', component: StatementComponent },
  { path: 'success', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
