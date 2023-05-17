import { Component, OnInit, Type } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public seletedRegion?: Region;

  constructor(private coutrieService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.coutrieService.cacheStore.byRegion.countries;
    this.seletedRegion = this.coutrieService.cacheStore.byRegion.term;
  }

  searchByRegion(value: Region): void{
    this.seletedRegion = value;
    this.coutrieService.searchRegion( value ).subscribe( response => {
      this.countries = response;
    });
  }
}
