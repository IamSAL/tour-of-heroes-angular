import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../Hero';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
   heroes:Hero[]=[]
  constructor(
    private heroService:HeroService
  ) {

  }

  ngOnInit(): void {
      this.heroService
        .getHeroes()
        .subscribe((heroes) => (this.heroes = heroes.slice(0,5)));
  }
}
