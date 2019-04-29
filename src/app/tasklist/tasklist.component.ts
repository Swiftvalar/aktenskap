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

  activeCards;
  archivedCards;
  tasklistService;

  constructor(service: TasklistService) {
    this.activeCards = service.getActiveCards();
    this.archivedCards = [];
    this.tasklistService = service;
  }

  ngOnInit() {
    for (let i=0; i<this.activeCards.length; i++) {
      let card = this.activeCards[i];
      let newRow = this.generateCard(card.cardNumber, card.columnName, card.cardTextContent);

      let lastCardDisplayed = 0;
      if (i>0) {
        lastCardDisplayed = this.activeCards[i-1].cardNumber;
      }

      let lastRowElement = document.getElementById('row_' + lastCardDisplayed);
      $(newRow).insertAfter(lastRowElement);
    }
  }

  save() {
    this.tasklistService.save(this.activeCards, this.archivedCards);
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
    if(cardNumber % 2 == 0){
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
        console.log("Todo Card Number:" + cardNumber + "Column:"+columnName+"CardText:"+cardTextContent);
        todoColumn.appendChild(card);
        break;
      }
      case "inprogressColumn": {
        console.log("Inprogress Card Number:" + cardNumber + "Column:"+columnName+"CardText:"+cardTextContent);
        inprogressColumn.appendChild(card);
        break;
      }
      case "reviewColumn": {
        console.log("Review Card Number:" + cardNumber + "Column:"+columnName+"CardText:"+cardTextContent);
        reviewColumn.appendChild(card);
        break;
      }
      case "completeColumn": {
        console.log("Complete Card Number:" + cardNumber + "Column:"+columnName+"CardText:"+cardTextContent);
        completeColumn.appendChild(card);
      }
    }

    cardBody.appendChild(cardText);
    cardBody.appendChild(leftButton);
    cardBody.appendChild(rightButton);
    cardBody.appendChild(archiveButton);
    card.appendChild(h5);
    card.appendChild(cardBody);
    row.appendChild(todoColumn);
    row.appendChild(inprogressColumn);
    row.appendChild(reviewColumn);
    row.appendChild(completeColumn);

    return row;
  }


  newCard() {
   
    let newCardText:string = prompt("Please enter a card description", "");
    if (newCardText != null && newCardText != "") {
      let lastCardDisplayed:number = 0;
      if(this.activeCards.length > 0) {
        lastCardDisplayed = this.activeCards[this.activeCards.length-1].cardNumber
      } 

      let newCardNumber:number = +lastCardDisplayed + 1; //there will be duplicate numbers in archives, but I can't think of a better solution at the moment
      let newCardObject = {cardNumber: newCardNumber, columnName:"todoColumn", cardTextContent:newCardText};
      this.activeCards.push(newCardObject);
      //Display
      let lastRowElement = document.getElementById('row_' + lastCardDisplayed);
      let row = this.generateCard(newCardObject.cardNumber, newCardObject.columnName, newCardObject.cardTextContent);
      $(row).insertAfter(lastRowElement);
      
      alert("Card number " + newCardNumber + " created!");
    } else if (newCardText == "") {
      alert("No Description? No new card :)");
    } else {
      alert("Invalid Input");
    }
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

  //Removes card from display and active card array, and places it in the array of archived cards.
  archiveCard(cardId) {
    let currentRowId:string = document.getElementById(cardId).parentElement.parentElement.id;
    document.getElementById(currentRowId).remove()

    let cardIdArray:any = cardId.split("_");
    let cardNumber = cardIdArray[1];

    //find the card in the activeCards array, add it to the archiveCards array, then delete from the active array.

    for(let i=0; i<this.activeCards.length; i++) {
      let card = this.activeCards[i];
      if(card.cardNumber == cardNumber) {
        this.archivedCards.push(card);
        this.activeCards.splice(i, 1);
      }
    }
  }
}
