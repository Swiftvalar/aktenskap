import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

  constructor() { }

  getActiveCards() {
    return [{cardNumber:"1", columnName:"todoColumn", cardTextContent:"Card 1 text"},
    {cardNumber:"3", columnName:"reviewColumn", cardTextContent:"Card 3 text"},
    {cardNumber:"4", columnName:"completeColumn", cardTextContent:"Card 4 text"}];
  }

  getArchivedCards() {
    return [];
  }

  archiveCard(cardNumber:string) {

  }

  saveCards(activeCards, archiveCards) {

  }
}
