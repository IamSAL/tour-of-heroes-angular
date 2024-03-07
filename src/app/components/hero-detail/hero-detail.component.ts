import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../Hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit{
  hero?: Hero

  constructor(
    private location: Location,
    private heroService: HeroService,
    private route: ActivatedRoute

  ) {

  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => {
        this.goBack();
      })
    }
  }

  ngOnInit(): void {
      const id=Number(this.route.snapshot.paramMap.get('id'))
      this.heroService.getHero(id).subscribe(hero=>this.hero=hero)
  }
}
