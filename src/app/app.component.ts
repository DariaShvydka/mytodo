import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DropEvent } from 'ng-drag-drop';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showDialog = false;
  editingTodo: any = null;
  fieldValue = '';
  todoGeneral: any = [];
  todoToday: any = [];

  num = 2;
  okButtonText = 'Create task';
  @Output() completeChange = new EventEmitter<MatCheckboxChange>();

  constructor() {}

  removeItem(todo: any, list: Array<any>) {
    const index = list.map(function (e) {
      return e.title;
    }).indexOf(todo.title);
    list.splice(index, 1);
  }

  todoDialog(todo = null) {
    this.okButtonText = 'Create task';
    this.fieldValue = '';
    this.editingTodo = todo;
    if (todo) {
      this.fieldValue = todo.title;
      this.okButtonText = 'Edit task';
    }
    this.showDialog = true;
  }

  remove(index: number) {
    this.todoGeneral.splice(index, 1);
  }

  editTodo(title) {
    this.editingTodo.title = title;
  }

  updateTodo(title) {
    if (title) {
      title = title.trim();
      if (this.editingTodo) {
        this.editTodo(title);
      } else {
        this.addTodo(title);
      }
    }
    this.hideDialog();
  }

  addTodo(title) {
    const todo = {title: title, completed: false};
    this.todoGeneral.push(todo);
  }

  hideDialog() {
    this.showDialog = false;
    this.editingTodo = null;
    this.fieldValue = null; // make sure Input is new
  }

  onDrop(e: DropEvent) {
    this.todoToday.push(e.dragData);
    this.removeItem(e.dragData, this.todoGeneral);
  }

  isDropAllowedLessThan = (dragData) => {
    return dragData < this.num;
  }

  ngOnInit() {
    // this.todoDefault = true;
    // console.log('ngOnInit', todo);

  }
}
