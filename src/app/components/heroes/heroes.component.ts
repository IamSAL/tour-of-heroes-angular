import { Component } from '@angular/core';
import { Hero } from '../../Hero';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { HEROES } from '../../mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule,HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?:Hero
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
