import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

  countries: Country[] = [];
  initialValue: string = '';

  constructor(private coutrieService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.coutrieService.cacheStore.byCountry.countries;
    this.initialValue = this.coutrieService.cacheStore.byCountry.term;
  }

  searchByCountry(value: string): void{
    this.coutrieService.searchCountry( value ).subscribe( response => {
      this.countries = response;
    });
  }

}
