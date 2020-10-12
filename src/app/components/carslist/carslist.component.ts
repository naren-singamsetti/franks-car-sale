import { Component, OnInit } from '@angular/core';

import { CarsService } from '../../services/cars.service';
import { ICarsListFormatted } from '../../interfaces/car.interface';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.scss']
})
export class CarslistComponent implements OnInit {

  carsData: ICarsListFormatted[];
  filteredCarsData: ICarsListFormatted[];

  constructor(private carsService: CarsService) { }

  /**
   * Rertieve cars data from the API and set into class variable
   * @returns no returns in this function
   */
  ngOnInit(): void {
    this.carsData = [];
    this.filteredCarsData = [];
    this.carsService.getCarsData().subscribe(res => {
      this.carsData = res;
      this.filteredCarsData = res;
    });
  }

  /**
   * Takes search params, filter cars data using the search criteria
   * and saves into a class variable
   * @param searchFilters search text and model years
   * @returns no returns in this function
   */
  filterCarsData(searchFilters): void {
    this.filteredCarsData = this.carsData;
    if (searchFilters.searchText) {
      this.filteredCarsData = this.carsData.filter((item) => {
        return item.model.toLowerCase().includes(searchFilters.searchText)
          || item.make.toLowerCase().includes(searchFilters.searchText);
      });
    }

    if (searchFilters.modelYearsSelected.length) {
      if (searchFilters.modelYearsSelected[0]) {
        this.filteredCarsData = this.filteredCarsData.filter(item => {
          return item.year_model >= searchFilters.modelYearsSelected[0];
        });
      }
      if (searchFilters.modelYearsSelected[1]) {
        this.filteredCarsData = this.filteredCarsData.filter(item => {
          return item.year_model <= searchFilters.modelYearsSelected[1];
        });
      }
    }
  }
}
