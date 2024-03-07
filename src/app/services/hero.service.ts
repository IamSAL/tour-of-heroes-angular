import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Hero } from '../Hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private heroesUrl = 'api/heroes'; // URL to web api

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    this.log(`${operation} failed: ${result}`);
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addHero(hero: Hero):Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
         tap((_) => this.log('HeroService: create hero')),
         catchError(this.handleError<Hero>('addHero', hero))
      )
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl, this.httpOptions).pipe(
      tap((_) => this.log('HeroService: fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number) {
    return this.http
      .get<Hero>(this.heroesUrl + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => this.log(`HeroService: fetched hero id=${_.id}`)),
        catchError(this.handleError<Hero>('getHeroe', undefined))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(this.heroesUrl + '/' + hero.id, hero, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log({ _ });
          this.log(`updated hero id=${hero.id}`);
        }),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  deleteHero(id: number): Observable<any>{
    return this.http
      .delete<Hero>(this.heroesUrl + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log({ _ });
          this.log(`Delete Hero=${id}`);
        }),
        catchError(this.handleError<any>('deleteHero'))
      );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
}
