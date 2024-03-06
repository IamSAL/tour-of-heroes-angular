import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { Hero } from '../Hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
  constructor() {}
}
