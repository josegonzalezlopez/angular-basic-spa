import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})

export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital:{ term: '', countries: [] },
        byCountry:{ term: '', countries: [] },
        byRegion:{ countries: [] },
    }
    
    constructor(private httpClient: HttpClient) {
        this.LoadFromLocalStorage();
     }

    private saveToLocalStorage(): void{
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private LoadFromLocalStorage(): void{
        if(!localStorage.getItem('cacheStore')) return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    }

    private getcountriesRequest(url: string): Observable<Country[]>{
        return this.httpClient.get<Country[]>(url).pipe(
            catchError( ()=> of([])),
        );
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null>{
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.httpClient.get<Country[]>(url)
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null),
                catchError( ()=> of(null))
            );
    }

    searchCapital(term: string): Observable<Country[]>{
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getcountriesRequest(url).pipe(
            tap( countries => {
                this.cacheStore.byCapital = { term, countries};
                this.saveToLocalStorage();
            })
        );
    }

    searchCountry(term: string): Observable<Country[]>{
        const url = `${this.apiUrl}/name/${term}`;
        return this.getcountriesRequest(url).pipe(
            tap( countries => {
                this.cacheStore.byCountry = { term, countries };
                this.saveToLocalStorage();
            })
        );
    }

    searchRegion(term: Region): Observable<Country[]>{
        const url = `${this.apiUrl}/region/${term}`;
        return this.getcountriesRequest(url).pipe(
            tap(countries =>{
                this.cacheStore.byRegion = { term, countries};
                this.saveToLocalStorage();
            })
        );
    }
    
}