import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

  constructor() { }

  getActiveCards() {
    return [];/*[{cardNumber:"1", cardTitle:"", columnName:"todoColumn", cardTextContent:"Card 1 text"},
    {cardNumber:"3", cardTitle:"", columnName:"reviewColumn", cardTextContent:"Card 3 text"},
    {cardNumber:"4", cardTitle:"", columnName:"completeColumn", cardTextContent:"Card 4 text"}];*/
  }

  save(activeCards, archivedCards) {
    let alertStr = "Here is what you would have saved!"
    alertStr = alertStr.concat("\nActive Cards");
    for(let card of activeCards) {
      alertStr = alertStr.concat("\nNumber:" + card.cardNumber + "Col:" + card.columnName + "Text:" + card.cardTextContent)
    }

    alertStr = alertStr.concat("\nArchived Cards")
    for(let card of archivedCards) {
      alertStr = alertStr.concat("\nNumber:" + card.cardNumber + "Col:" + card.columnName + "Text:" + card.cardTextContent)
    }

    alert(alertStr);
  }
}
