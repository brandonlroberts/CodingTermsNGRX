import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Card } from 'src/app/entities/card';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  [x: string]: any;
  // private cardsUrl = 'https://brandonsgenericcore22webapiefcore.azurewebsites.net/api/cards';
  private cardsUrl = 'https://localhost:44333/api/cards';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  public getCards() {
    return this.http.get(
      this.cardsUrl
    );
  }

  public create(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.urlAddress), body, this.generateHeaders());
  }
  public edit(route: string, body) {
    return this.http.put(this.createCompleteRoute(route + body.cardID, this.urlAddress), body, this.generateHeaders());
  }
  public delete(route: string, body) {
    return this.http.delete(this.createCompleteRoute(route + body, this.urlAddress), this.generateHeaders());
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
