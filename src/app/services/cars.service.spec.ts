import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CarsService } from './cars.service';
import { ICarsList } from '../interfaces/car.interface';
import { carsTestData } from '../testdata/carsData';
import { carsTestDataFormatted } from '../testdata/carsDataFormatted';
import { CONSTANTS } from '../constants';
import { of } from 'rxjs';

describe('CarsService', () => {
  let service: CarsService;
  let httpMock: HttpTestingController;
  let carsDummyData: ICarsList[];
  let carsFormattedTestData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarsService]
    });
    service = TestBed.inject(CarsService);
    httpMock = TestBed.inject(HttpTestingController);
    carsDummyData = carsTestData;
    carsFormattedTestData = carsTestDataFormatted;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve cars data from the API via GET', () => {
    service.getCarsData().subscribe(cars => {
      expect(cars.length).toBe(6);
      expect(cars[0]._id).toEqual(5);
    });
    const request = httpMock.expectOne(`${CONSTANTS.API_URL}`);
    expect(request.request.method).toBe('GET');
    request.flush(carsDummyData);
  });

  it('should not be able to retrieve cars data from the API', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'Invalid URL given';
    let response: any;
    let errResponse: any;
    service.getCarsData().subscribe(res => response = res, err => errResponse = err);
    httpMock.expectOne(`${CONSTANTS.API_URL}`).flush(data, mockErrorResponse);
    expect(errResponse).toBe(`Error Code: 400\nMessage: Bad Request`);
  });

  it('should not be able to retrieve cars data from the API', () => {
    const mockErrorResponse = new ErrorEvent('Internal server error');
    let response: any;
    let errResponse: any;
    service.getCarsData().subscribe(res => response = res, err => errResponse = err);
    httpMock.expectOne(`${CONSTANTS.API_URL}`).error(mockErrorResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
