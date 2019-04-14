import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { generate } from 'rxjs';

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

  generateCard(rowNumber:number, columnName:string, cardHeader:string, cardTextContent:string ) {
    
    let row = document.createElement('div');
    row.id = "row_" + rowNumber;
    row.className = "row justify-content-md-center";

    let todoColumn = document.createElement('div');
    todoColumn.id = "todoColumn_" + rowNumber;
    todoColumn.className = "col";

    let inprogressColumn = document.createElement('div');
    inprogressColumn.id = "inprogressColumn_" + rowNumber;
    inprogressColumn.className = "col";

    let reviewColumn = document.createElement('div');
    reviewColumn.id = "reviewColumn_" + rowNumber;
    reviewColumn.className = "col";

    let completeColumn = document.createElement('div');
    completeColumn.id = "completeColumn_" + rowNumber;
    completeColumn.className = "col";

    let card = document.createElement('div');
    card.id = "card_" + rowNumber;
    card.className = "card";
    
    let h5 = document.createElement('h5');
    h5.className = "card-header primary-color white-text";
    h5.textContent = "Card " + rowNumber;

    let cardBody = document.createElement('div');
    cardBody.id = "cardBody_" + rowNumber;
    cardBody.className = "card-body";

    let cardText = document.createElement('div');
    cardText.className = "card-text";
    cardText.textContent = cardTextContent;

    let leftButton = document.createElement('button');
    leftButton.textContent = "Move Left";
    leftButton.addEventListener ("click", (e:Event) => this.moveLeft(card.id));

    let rightButton = document.createElement('button');
    rightButton.textContent = "Move Right";
    let newCardId:string = card.id;
    rightButton.addEventListener("click", (e:Event) => this.moveRight(card.id));

    cardBody.appendChild(cardText);
    cardBody.appendChild(leftButton);
    cardBody.appendChild(rightButton);
    card.appendChild(h5);
    card.appendChild(cardBody);

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
        alert("Invalid: Missing columnName!")
        break;
      }
    }

    row.appendChild(todoColumn);
    row.appendChild(inprogressColumn);
    row.appendChild(reviewColumn);
    row.appendChild(completeColumn);

    return row;
    // $(row).insertAfter(lastRowElement);

    // document.getElementById(row.id).appendChild(todoColumn);
    // document.getElementById(todoColumn.id).appendChild(card);
    // document.getElementById(card.id).appendChild(h5);
    // document.getElementById(card.id).appendChild(cardBody);
    // document.getElementById(cardBody.id).appendChild(cardText);
    // document.getElementById(cardBody.id).appendChild(leftButton);
    // document.getElementById(cardBody.id).appendChild(rightButton);
    // document.getElementById(row.id).appendChild(inprogressColumn);
    // document.getElementById(row.id).appendChild(reviewColumn);
    // document.getElementById(row.id).appendChild(completeColumn);
  }


  newCard() {
    let lastRowElement = document.getElementById('row_' + this.currentNumberOfCards);
    let newNumberOfCards:number = this.currentNumberOfCards + 1;

    let row = this.generateCard(newNumberOfCards, 'todoColumn', "New Card " + newNumberOfCards, "This is New Card "+ newNumberOfCards)

    $(row).insertAfter(lastRowElement);
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
