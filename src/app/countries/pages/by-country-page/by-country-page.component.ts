import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  countries: Country[] = [];

  constructor(private coutrieService: CountriesService){}

  searchByCountry(value: string): void{
    this.coutrieService.searchCountry( value ).subscribe( response => {
      this.countries = response;
    });
  }

}
