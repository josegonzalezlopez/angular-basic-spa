import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  countries: Country[] = [];
  isLoading: boolean = false;
  initialValue: string = '';

  constructor(private countrieService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countrieService.cacheStore.byCapital.countries;
    this.initialValue = this.countrieService.cacheStore.byCapital.term;
  }

  searchByCapital(value: string): void{
    this.isLoading = true;
    this.countrieService.searchCapital( value ).subscribe( response => {
      this.countries = response;
      this.isLoading = false;
    });
  }
}
