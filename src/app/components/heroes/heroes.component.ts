import { Component, OnInit } from '@angular/core';
import { Hero } from '../../Hero';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../services/hero.service';
import { MessagesComponent } from '../messages/messages.component';
import { MessageService } from '../../services/message.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroDetailComponent, MessagesComponent, RouterModule],

  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  onSelect(hero: Hero) {
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  add(name:string): void{
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe((hero) => {
      this.heroes.push(hero)
    })
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }


  delete(id: number): void{
    this.heroes = this.heroes.filter((h) => h.id != id);
    this.heroService.deleteHero(id).subscribe(() => {

    })
  }

  ngOnInit(): void {
    this.getHeroes();
  }
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {

  }
}
