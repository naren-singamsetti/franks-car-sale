import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { sortArrayOfObjects } from '../utils/utils';
import { ICarsList, ICarsListFormatted } from '../interfaces/car.interface';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  /**
   * Service to get the cars data from the API
   * @returns Formatted cars data in an array
   */
  getCarsData(): Observable<ICarsListFormatted[]> {
    const apiURL = CONSTANTS.API_URL;
    return this.http.get<ICarsList[]>(apiURL).pipe(
      map((res) => {
        return [...this.formatCarsData(res)];
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Helper function to format the API response data
   * @param carsData cars data object from the API
   * @returns an array with sorted cars data set
   */
  formatCarsData(carsData): Array<ICarsListFormatted> {
    let formattedCarsData = [];
    carsData.forEach(carsDataItem => {
      carsDataItem.cars.vehicles.map(carItem => {
        carItem.location = carsDataItem.cars.location;
        formattedCarsData.push(carItem);
      });
    });
    formattedCarsData = [...sortArrayOfObjects(formattedCarsData, 'date_added')];
    return formattedCarsData;
  }

  /**
   * Error function to handle client and server errors
   * @param error HTTP error response object
   * @returns and throw an error message
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.statusText}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
    }
    return throwError(errorMessage);
  }
}
