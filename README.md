# FranksCarSale

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Unit tests code coverage

After running the command `ng test`, a folder with name `coverage` will be generated at project's root directory. Open `index.html` in a browser to see the coverage.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Features implemented in this project.

. Cars list displayed on the first page with search features like Text search and car model years search

. Cars list is sorted in ascending way using `date_added` field

. By clicking on a card in cars list, page will be redirected to cars details page

. In Carslist page, click is restricted to the card(s) with the condition like `licensed=false`

. Car details page is showing the complete car details and it contains two buttons `addToCart` and `Bookmark`

. User can bookmark a car by clicking on `Bookmark` button, then the car id will be saved in local storage

. User can add a car to cart by clicking `Add To cart` button, which will be saved as an object in local storage

. User can see the selected cars in cart page. Here we are showing car price along with car information and total price of the cart.

. If user added an item more than one time, total will be calculated based on the quantity and price.
