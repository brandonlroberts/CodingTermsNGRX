import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../entities/card';
import { Observable } from 'rxjs';
import { AppState } from '../entities/app.state.entity';
import { Store } from '@ngrx/store';
import { AddCardAction } from '../store/actions/card.actions';

@Component({
  selector: 'app-cards-add',
  templateUrl: './cards-add.component.html',
  styleUrls: ['./cards-add.component.css']
})
export class CardsAddComponent implements OnInit {
  closeResult: string;
  cards$: Observable<Array<Card>>;
  card: Card = {
    id: null,
    cardHeader: '',
    cardText: ''
  };

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>
    ) { }

  addCard(card) {
    this.store.dispatch(new AddCardAction( { id: card.id, cardHeader: card.cardHeader, cardText: card.cardText }));
    this.modalService.dismissAll();
  }

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

  ngOnInit() {}
}






