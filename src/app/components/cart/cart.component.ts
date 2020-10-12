import { Component, OnInit } from '@angular/core';

import { ICartItems } from '../../interfaces/car.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: ICartItems[];
  cartTotal: number;

  constructor() {
    this.cartTotal = 0;
  }

  /**
   * Takes cart items from local storage
   * @returns an object with search text and model years selected
   */
  ngOnInit(): void {
    this.cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    this.cartItems.map(item => {
      this.cartTotal += (item.quantity * item.item.price);
    });
    this.cartTotal = Number(this.cartTotal.toFixed(2));
  }
}
