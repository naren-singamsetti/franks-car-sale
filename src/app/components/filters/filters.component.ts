import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  searchText: string;
  modelYearsSelected: number[];

  @Output() searchFilters = new EventEmitter();

  constructor() {
    this.searchText = '';
    this.modelYearsSelected = [];
  }

  /**
   * Takes a string and emits an event to parent component
   * @param keyword search text
   * @returns an object with search text and model years selected
   */
  searchCarsWithKeyword(keyword: string): void {
    this.searchText = keyword ? keyword.toLowerCase() : '';
    this.searchFilters.emit({ searchText: this.searchText, modelYearsSelected: this.modelYearsSelected });
  }

  /**
   * Takes a model years and emits an event to parent component
   * @param modelYearFrom Model year from value
   * @param modelYearTo search text
   * @returns an object with search text and model years selected
   */
  searchCarsWithModelYear(modelYearFrom, modelYearTo): void {
    this.modelYearsSelected = [modelYearFrom, modelYearTo];
    this.searchFilters.emit({ searchText: this.searchText, modelYearsSelected: this.modelYearsSelected });
  }
}
