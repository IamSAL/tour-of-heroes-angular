import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { Hero } from '../Hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    const heroes = of(HEROES);
    return heroes;
  }

  getHero(id: number) {
    const hero = of(HEROES.find(hero => hero.id === id));
      this.messageService.add(`HeroService: fetched hero id=${id}`);
     return hero;
  }
  constructor(
    private messageService: MessageService
  ) {}
}
