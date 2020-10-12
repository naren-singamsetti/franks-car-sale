import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CarslistComponent } from './carslist.component';
import { CarsService } from '../../services/cars.service';
import { carsTestData } from '../../testdata/carsData';
import { carsTestDataFormatted } from '../../testdata/carsDataFormatted';

describe('CarslistComponent', () => {
  let component: CarslistComponent;
  let fixture: ComponentFixture<CarslistComponent>;
  let carsService: CarsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarslistComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CarsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    carsService = TestBed.inject(CarsService);
    spyOn(carsService, 'getCarsData').and.returnValue(of(carsTestDataFormatted));
    component.ngOnInit();
  });

  it('should create Carslist component', () => {
    expect(component).toBeTruthy();
  });

  it('should test getCarsData subscribe in ngOnInit', () => {
    expect(component.carsData.length).toEqual(6);
    expect(component.carsData[0]._id).toEqual(1);
  });

  it('should filter carsData based on search criteria', () => {
    component.filterCarsData({ searchText: 'model', modelYearsSelected: ['1997', '2001'] });
    expect(component.filteredCarsData.length).toEqual(3);
    component.filterCarsData({ searchText: 'maker', modelYearsSelected: ['1991', '1993'] });
    expect(component.filteredCarsData.length).toEqual(1);
  });
});
