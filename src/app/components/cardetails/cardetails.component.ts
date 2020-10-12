import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarsService } from '../../services/cars.service';
import { ICartItems, ICarsListFormatted } from '../../interfaces/car.interface';


@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {

  carId: number;
  carIds: number[];
  cartItems: ICartItems[];
  carDetails: ICarsListFormatted;

  constructor(private activatedRoute: ActivatedRoute, private carsService: CarsService) { }

  /**
   * Takes car id param from the url and filter car details based on the id
   * @returns an object with car details
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.carId = Number(params.id);
      this.carsService.getCarsData().subscribe(res => {
        this.carDetails = res.filter(item => {
          return item._id === this.carId;
        })[0];
      });
    });
  }

  /**
   * Takes car id and stores into local storage
   * @param id car id
   * @returns no returns in this function
   */
  bookmarkCar(id): void {
    this.carIds = localStorage.getItem('bookmarkedCars') ? JSON.parse(localStorage.getItem('bookmarkedCars')) : [];
    if (this.carIds && !this.carIds.includes(id)) {
      this.carIds.push(id);
      localStorage.setItem('bookmarkedCars', JSON.stringify(this.carIds));
    }
  }

  /**
   * Takes car item and stores into local storage
   * @param carItem Model year from value
   * @returns no returns in this function
   */
  addToCart(carItem): void {
    this.cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    if (!this.cartItems.length) {
      this.cartItems.push({ quantity: 1, item: carItem});
    } else {
      let cartItemExists = false;
      this.cartItems.forEach(item => {
        if (item.item._id === carItem._id) {
          item.quantity++;
          cartItemExists = true;
        }
      });
      if (!cartItemExists) {
        this.cartItems.push({ quantity: 1, item: carItem});
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
