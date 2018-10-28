import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsComponent } from './entries/apps/apps.component';
import { AddComponent } from './entries/apps/add/add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'apps',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'login',
    loadChildren: './account/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './account/register/register.module#RegisterModule'
  },
  {
    path:'apps',
    children:[
      {
        path:'',
        loadChildren:'./entries/apps/apps.module#AppsModule',
      },
      {
        path:'add',
        component: AddComponent
        // loadChildren:'./entries/apps/apps.module#AppsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
