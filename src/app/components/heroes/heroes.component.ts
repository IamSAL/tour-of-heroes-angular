import { Component, OnInit } from '@angular/core';
import { Hero } from '../../Hero';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { HEROES } from '../../mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../services/hero.service';
import { MessagesComponent } from '../messages/messages.component';
import { MessageService } from '../../services/message.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroDetailComponent, MessagesComponent,RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  onSelect(hero: Hero) {

    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
}
