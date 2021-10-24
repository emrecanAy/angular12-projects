import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { ToDoItem } from '../todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  displayAll: boolean = false;
  inputText: string = "";

  constructor() {
    this.model.items = this.getItemsFromLocalStorage();
  }

  model = new Model();

  message = "";

  getName(){
    return this.model.name;
  }

  getItems(){
    if(this.displayAll){
      return this.model.items;
    }else{
      return this.model.items.filter(item => !item.action);
    }
  }

  // addItem(txtItem: any){
  //   console.log(txtItem.value);
  // }

  addItem(){
    //console.log(value);
    //this.message = value;

    if(this.inputText!=""){
      let data = { description: this.inputText, action: false };
      this.model.items.push(data);

      let items = this.getItemsFromLocalStorage();
      items.push(data);
      localStorage.setItem("items", JSON.stringify(items));
      this.inputText = "";
    }else{
      alert("Alan boş bırakılamaz!");
    }

  }

  getItemsFromLocalStorage(){
    let items: ToDoItem[] = [];

    let value = localStorage.getItem("items");

    if(value != null){
      items = JSON.parse(value);
    }

    return items;
  }

  displayCount(){
    return this.model.items.filter(i => i.action).length;
  }

  getBtnClasses(){
    return {
      'disabled': this.inputText.length==0,
      'btn-secondary': this.inputText.length==0,
      'btn-success': this.inputText.length>0
    }

  }

  onActionChanged(item: ToDoItem){
    let items = this.getItemsFromLocalStorage();
    localStorage.clear();

    items.forEach(i => {
      if(i.description == item.description){
          i.action = item.action;
      }
    });

    localStorage.setItem("items", JSON.stringify(items));
  }

  ngOnInit(): void {
  }

}
