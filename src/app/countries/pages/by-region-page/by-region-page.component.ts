import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  countries: Country[] = [];

  constructor(private coutrieService: CountriesService){}

  searchByRegion(value: string): void{
    this.coutrieService.searchRegion( value ).subscribe( response => {
      this.countries = response;
    });
  }
}
