import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarslistComponent } from './components/carslist/carslist.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: '/cars' },
  { path: 'cars', component: CarslistComponent },
  { path: 'cars/:id', component: CardetailsComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
