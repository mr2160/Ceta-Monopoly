import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VodovaStranComponent } from './vodova-stran/vodova-stran.component';
import { ModeratorStranComponent } from './moderator-stran/moderator-stran.component';
import { PrijavaComponent } from './prijava-stran/prijava.component';
import { DbComponent } from './db/db.component';


const routes: Routes = [{
  path: '',
  component: VodovaStranComponent
},{
  path:'moderator',
  component: ModeratorStranComponent
},{
  path:'prijava',
  component: PrijavaComponent
},{
  path:'db',
  component: DbComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
