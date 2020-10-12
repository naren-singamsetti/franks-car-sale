import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CardetailsComponent } from './cardetails.component';
import { CarsService } from '../../services/cars.service';
import { carsTestData } from '../../testdata/carsData';
import { carsTestDataFormatted } from '../../testdata/carsDataFormatted.js';

describe('CardetailsComponent', () => {
  let component: CardetailsComponent;
  let fixture: ComponentFixture<CardetailsComponent>;
  let carsService: CarsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        CarsService,
        {
          provide: Router, useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }, {

          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) }

        }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    fixture = TestBed.createComponent(CardetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    carsService = TestBed.inject(CarsService);
    spyOn(carsService, 'getCarsData').and.returnValue(of(carsTestDataFormatted));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test getCarsData subscribe in ngOnInit', () => {
    expect(component.carDetails).toEqual(carsTestDataFormatted[0]);
    expect(component.carDetails._id).toEqual(1);
  });

  it('should bookmark selected car item', () => {
    component.bookmarkCar(1);
    expect(localStorage.getItem('bookmarkedCars')).toEqual('[1]');
  });

  it('should add a car item to the cart', () => {
    component.addToCart(carsTestData[0]);
    expect(localStorage.getItem('cartItems')).toEqual(JSON.stringify([{ quantity: 1, item: carsTestData[0] }]));
    component.addToCart(carsTestData[0]);
    expect(localStorage.getItem('cartItems')).toEqual(JSON.stringify([{ quantity: 2, item: carsTestData[0] }]));
    component.addToCart(carsTestData[1]);
    expect(localStorage.getItem('cartItems')).toEqual(JSON.stringify([{ quantity: 2, item: carsTestData[0] },
    { quantity: 1, item: carsTestData[1] }]));
  });
});
