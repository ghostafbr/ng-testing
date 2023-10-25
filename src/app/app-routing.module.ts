import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PicoPreviewComponent} from "./components/pico-preview/pico-preview.component";
import {PeopleComponent} from "./components/people/people.component";
import {OthersComponent} from "./components/others/others.component";

const routes: Routes = [
  {
    path: 'pico-preview',
    component: PicoPreviewComponent
  },
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'others',
    component: OthersComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
