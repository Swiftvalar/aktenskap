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

  save(activeCards, archivedCards) {
    console.log("Nope Nope Nope. But here is what you would have saved!");
    console.log("Active Cards")
    for(let card of activeCards) {
      console.log("Number:" + card.cardNumber + "Col:" + card.columnName + "Text:" + card.cardTextContent)
    }

    console.log("Archived Cards")
    for(let card of archivedCards) {
      console.log("Number:" + card.cardNumber + "Col:" + card.columnName + "Text:" + card.cardTextContent)
    }
  }
}
