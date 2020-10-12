import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search keyword to other component', () => {
    spyOn(component.searchFilters, 'emit');
    component.searchCarsWithKeyword('model one');
    expect(component.searchFilters.emit).toHaveBeenCalledWith(
      { searchText: 'model one', modelYearsSelected: [] });
    component.searchCarsWithKeyword('');
    expect(component.searchFilters.emit).toHaveBeenCalledWith(
      { searchText: '', modelYearsSelected: [] });
  });

  it('should emit model years to other component', () => {
    spyOn(component.searchFilters, 'emit');
    component.searchCarsWithModelYear('1991', '2020');
    expect(component.searchFilters.emit).toHaveBeenCalledWith(
      { searchText: '', modelYearsSelected: ['1991', '2020'] });
    component.searchCarsWithModelYear('', '');
    expect(component.searchFilters.emit).toHaveBeenCalledWith(
      { searchText: '', modelYearsSelected: ['', ''] });
  });
});
