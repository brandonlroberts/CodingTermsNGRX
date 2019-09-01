import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../entities/card';
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
  closeResult: string;
  cards$: Observable<Array<Card>>;

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
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

  deleteCard(id) {
    this.store.dispatch(new DeleteCardAction(id));
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.cards$ = this.store.select(store => store.cards);
  }

}
