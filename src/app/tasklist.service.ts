import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

  constructor() { }

  getActiveCards() {
    return [{cardNumber:"1", columnName:"todoColumn", cardTextContent:"Card 1 text"},
    {cardNumber:"3", columnName:"completeColumn", cardTextContent:"Card 2 text"}]
  }

  getArchivedCards() {

  }

  deleteCard(cardNumber:string) {

  }

  saveCards(cardsArray) {

  }
}
