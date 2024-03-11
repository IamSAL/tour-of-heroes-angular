import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../../Hero';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearchComponent implements OnInit {
  heroes!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  search(term: string) {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  count = 0;
  increment() {
    this.count = this.count + 1;
  }
  decrement() {
    this.count = this.count - 1;
  }
  constructor(private heroService: HeroService) {}
}
