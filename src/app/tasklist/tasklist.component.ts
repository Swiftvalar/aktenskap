import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../tasklist.service'
import * as $ from 'jquery/dist/jquery.min.js';
import { generate } from 'rxjs';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  currentNumberOfCards:number = 0;
  activeCards;
  archivedCards;

  constructor(service: TasklistService) { 
    this.activeCards = service.getActiveCards();
    this.archivedCards = service.getArchivedCards();
  }

  ngOnInit() {
    for (let card of this.activeCards) {
      let lastRowElement = document.getElementById('row_' + this.currentNumberOfCards);
      let newNumberOfCards:number = this.currentNumberOfCards + 1;
      let row = this.generateCard(card.cardNumber, card.columnName, card.cardTextContent);
      $(row).insertAfter(lastRowElement);
      this.currentNumberOfCards = newNumberOfCards;
    }
  }

  generateCard(cardNumber:number, columnName:string, cardTextContent:string ) {
    
    //debug logging
    // console.log("cardNumber: " + cardNumber + " column: " + columnName + " card text: " + cardTextContent);

    let row = document.createElement('div');
    row.id = "row_" + cardNumber;
    row.className = "row justify-content-md-center";

    let todoColumn = document.createElement('div');
    todoColumn.id = "todoColumn_" + cardNumber;
    todoColumn.className = "col";

    let inprogressColumn = document.createElement('div');
    inprogressColumn.id = "inprogressColumn_" + cardNumber;
    inprogressColumn.className = "col";

    let reviewColumn = document.createElement('div');
    reviewColumn.id = "reviewColumn_" + cardNumber;
    reviewColumn.className = "col";

    let completeColumn = document.createElement('div');
    completeColumn.id = "completeColumn_" + cardNumber;
    completeColumn.className = "col";

    let card = document.createElement('div');
    card.id = "card_" + cardNumber;
    card.className = "card";
    
    let cardHeaderClassName:string = "";
    if(this.currentNumberOfCards % 2 == 0){
      cardHeaderClassName = "card-header deep-orange white-text";
    } else{
      cardHeaderClassName = "card-header primary-color white-text";
    }


    let h5 = document.createElement('h5');
    h5.className = cardHeaderClassName;
    h5.textContent = "Card " + cardNumber;

    let cardBody = document.createElement('div');
    cardBody.id = "cardBody_" + cardNumber;
    cardBody.className = "card-body";

    let cardText = document.createElement('div');
    cardText.className = "card-text";
    cardText.textContent = cardTextContent;

    let leftButton = document.createElement('button');
    leftButton.textContent = "Move Left";
    leftButton.addEventListener ("click", (e:Event) => this.moveLeft(card.id));

    let rightButton = document.createElement('button');
    rightButton.textContent = "Move Right";
    rightButton.addEventListener("click", (e:Event) => this.moveRight(card.id));

    let archiveButton = document.createElement('button');
    archiveButton.textContent = "Archive";
    archiveButton.addEventListener("click", (e:Event) => this.archiveCard(card.id));

    switch(columnName) {
      case "todoColumn": {
        todoColumn.appendChild(card);
        break;
      }
      case "inprogressColumn": {
        inprogressColumn.appendChild(card);
        break;
      }
      case "reviewColumn": {
        reviewColumn.appendChild(card);
        break;
      }
      case "completeColumn": {
        completeColumn.appendChild(card);
      }
      default: {
        //debug logging
        console.log("Card Number:" + cardNumber + "\nColumn:"+columnName+"\nCardText:"+cardTextContent);
        alert("Invalid: Missing columnName!")
        break;
      }
    }

    cardBody.appendChild(cardText);
    cardBody.appendChild(leftButton);
    cardBody.appendChild(archiveButton);
    cardBody.appendChild(rightButton);
    card.appendChild(h5);
    card.appendChild(cardBody);
    row.appendChild(todoColumn);
    row.appendChild(inprogressColumn);
    row.appendChild(reviewColumn);
    row.appendChild(completeColumn);

    return row;
  }


  newCard() {
    let lastRowElement = document.getElementById('row_' + this.currentNumberOfCards);
    let newNumberOfCards:number = this.currentNumberOfCards + 1;

    let row = this.generateCard(newNumberOfCards, 'todoColumn', "This is New Card "+ newNumberOfCards)
    
    $(row).insertAfter(lastRowElement);
    this.currentNumberOfCards = newNumberOfCards;
  }

  moveRight(cardId) {

    let currentColId:string = document.getElementById(cardId).parentElement.id;
    let columnArray:any = currentColId.split("_");
    let columnName:string = columnArray[0];
    let rowNumber:string = columnArray[1];

    let rightColumn:string = '';
    switch(columnName) {
      case "todoColumn": {
        rightColumn = "inprogressColumn";
        break;
      }
      case "inprogressColumn": {
        rightColumn = "reviewColumn";
        break;
      }
      case "reviewColumn": {
        rightColumn = "completeColumn";
        break;
      }
      default: {
        console.log("Invalid: No more columns to the right!")
        break;
      }
    }

    if(rightColumn != ''){
      document.getElementById(rightColumn + '_' + rowNumber).appendChild(
        document.getElementById(cardId)
      );
    }

  }

  moveLeft(cardId) {
    
    let currentColId:string = document.getElementById(cardId).parentElement.id;
    let columnArray:any = currentColId.split("_");
    let columnName:string = columnArray[0];
    let rowNumber:string = columnArray[1];

    let leftColumn:string = '';
    switch(columnName) {
      case "completeColumn": {
        leftColumn = "reviewColumn";
        break;
      }
      case "reviewColumn": {
        leftColumn = "inprogressColumn";
        break;
      }
      case "inprogressColumn": {
        leftColumn = "todoColumn";
        break;
      }
      default: {
        console.log("Invalid: No more columns to the left!")
        break;
      }
    }

    if(leftColumn != ''){
      document.getElementById(leftColumn + '_' + rowNumber).appendChild(
        document.getElementById(cardId)
      );
    }
    
    
  }

  //Work in progress: Removes Card and its row.  Does not remove it from the active Array and place in the archive yet.
  //May have to rework how cards are placed. Maybe redraw all of them?  Maybe make the card number less
  //prominent. 
  archiveCard(cardId) {
    let currentRowId:string = document.getElementById(cardId).parentElement.parentElement.id;
    document.getElementById(currentRowId).remove()

    let cardIdArray:any = cardId.split("_");
    let cardNumber = cardIdArray[1];

    //find the card in the activeCards array, add it to the archiveCards array, then delete from the active array.
    // console.log("Card to archive: " + cardNumber);

    for(let card of this.activeCards) {
      if(card.cardNumber == cardNumber) {
        this.archivedCards.push(card);
        // this.activeCards.remove(card);  //This doesn't work
      }
    }

    for(let card of this.activeCards) {
      console.log("Active Card Number: " + card.cardNumber); //Debug
    }

    for(let card of this.archivedCards) {
      console.log("Archive Card Number: " + card.cardNumber); //Debug
    }
  }

}
