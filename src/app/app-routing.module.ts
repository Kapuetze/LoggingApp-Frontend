import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: []
    },
    // {
    //   path: 'admin',
    //   loadChildren: './admin/admin.module#AdminModule'
    // },
    {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'container',
        loadChildren: () => import('./modules/container/container.module').then(m => m.ContainerModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }