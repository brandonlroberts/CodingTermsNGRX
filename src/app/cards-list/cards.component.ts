import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card/card.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../entities/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppState } from '../entities/app.state.entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteCardAction } from '../store/actions/card.actions';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  // [x: string]: any;
  closeResult: string;
  // cards: any;
  cards$: Observable<Array<Card>>;

  constructor(
    private store: Store<AppState>,
    // private cardService: CardService,
    private modalService: NgbModal,
    // private http: HttpClient
    ) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // editCard(card) {
  //   const newCard: any = {
  //     cardID: card.cardID,
  //     cardHeader: card.cardHeader,
  //     cardText: card.cardText
  //   };

  //   const apiUrl = 'https://localhost:44333/api/cards/';
  //   this.cardService.edit(apiUrl, newCard).subscribe();
  //   this.modalService.dismissAll();
  //   location.reload();
  // }

  // deleteCard(card) {
  //   const newCard: any = {
  //     cardID: card.cardID
  //   };

  //   const apiUrl = 'https://localhost:44333/api/cards/';
  //   this.cardService.delete(apiUrl, newCard.cardID).subscribe();
  //   this.modalService.dismissAll();
  //   location.reload();
  // }

  deleteCard(id) {
    this.store.dispatch(new DeleteCardAction(id));
    this.modalService.dismissAll();
  }

  ngOnInit() {
    // this.cardService.getCards()
    //   .subscribe(data => this.cards = data);

    this.cards$ = this.store.select(store => store.cards);
  }

}
