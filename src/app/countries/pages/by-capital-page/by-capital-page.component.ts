import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  countries: Country[] = [];

  constructor(private coutrieService: CountriesService){}

  searchByCapital(value: string): void{
    this.coutrieService.searchCapital( value ).subscribe( response => {
      this.countries = response;
    });
  }
}
