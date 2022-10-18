import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintPageComponent } from './mint-page/mint-page.component';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
  { path: '', redirectTo: 'shares', pathMatch: 'full' },
  { path: 'mint', component: MintPageComponent },
  { path: 'shares', component: ShareComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
