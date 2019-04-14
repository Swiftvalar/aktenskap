import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  currentNumberOfCards:number = 2;

  constructor() { 
  }

  ngOnInit() {
  }

  newCard() {
    let lastRowElement = document.getElementById('row_' + this.currentNumberOfCards);
    let newNumberOfCards:number = this.currentNumberOfCards + 1;

    let row = document.createElement('div');
    row.id = "row_" + newNumberOfCards;
    row.className = "row justify-content-md-center";

    let todoColumn = document.createElement('div');
    todoColumn.id = "todoColumn_" + newNumberOfCards;
    todoColumn.className = "col";

    let inprogressColumn = document.createElement('div');
    inprogressColumn.id = "inprogressColumn_" + newNumberOfCards;
    inprogressColumn.className = "col";

    let reviewColumn = document.createElement('div');
    reviewColumn.id = "reviewColumn_" + newNumberOfCards;
    reviewColumn.className = "col";

    let completeColumn = document.createElement('div');
    completeColumn.id = "completeColumn_" + newNumberOfCards;
    completeColumn.className = "col";

    let card = document.createElement('div');
    card.id = "card_" + newNumberOfCards;
    card.className = "card";
    
    let h5 = document.createElement('h5');
    h5.className = "card-header primary-color white-text";
    h5.textContent = "Card " + newNumberOfCards;

    let cardBody = document.createElement('div');
    cardBody.id = "cardBody_" + newNumberOfCards;
    cardBody.className = "card-body";

    let cardText = document.createElement('div');
    cardText.className = "card-text";
    cardText.textContent = "I'm card " + newNumberOfCards;

    let leftButton = document.createElement('button');
    leftButton.textContent = "Move Left";
    leftButton.addEventListener ("click", (e:Event) => this.moveLeft(card.id));

    let rightButton = document.createElement('button');
    rightButton.textContent = "Move Right";
    let newCardId:string = card.id;
    rightButton.addEventListener("click", (e:Event) => this.moveRight(card.id));

    $(row).insertAfter(lastRowElement);

    document.getElementById(row.id).appendChild(todoColumn);
    document.getElementById(todoColumn.id).appendChild(card);
    document.getElementById(card.id).appendChild(h5);
    document.getElementById(card.id).appendChild(cardBody);
    document.getElementById(cardBody.id).appendChild(cardText);
    document.getElementById(cardBody.id).appendChild(leftButton);
    document.getElementById(cardBody.id).appendChild(rightButton);
    document.getElementById(row.id).appendChild(inprogressColumn);
    document.getElementById(row.id).appendChild(reviewColumn);
    document.getElementById(row.id).appendChild(completeColumn);

    this.currentNumberOfCards = newNumberOfCards;
  }

  moveRight(cardId) {

    let currentColId:string = document.getElementById(cardId).parentElement.id;
    let columnArray:any = currentColId.split("_");
    let columnName:string = columnArray[0];
    let rowNumber:string = columnArray[1];
    console.log("Column Name: " + columnName);
    console.log("Row Number: " + rowNumber);

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
    console.log("Column Name: " + columnName);
    console.log("Row Number: " + rowNumber);

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
}
