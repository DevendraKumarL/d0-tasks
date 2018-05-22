import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { D0ApiService } from '../d0-api.service';

// Manually declare $ so that we can use it for jQeury within Angular Component
declare var $ : any;

@Component({
	selector: 'todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.css']
})
export class TodosComponent {

	public createTaskItems : any = [];
	public todoTitle : string;
	public todoText : string;
	public todoDueDate : any;

	@ViewChild("todoModal")
	public todoModal : ElementRef;

	constructor(public d0Service : D0ApiService) {
		this.d0Service.getToDos();
	}

	addTaskItem() {
		this.createTaskItems.push({name: ""});
	}

	clearToDoData() {
		this.todoText = undefined;
		this.todoTitle = undefined;
		this.todoDueDate = undefined;
		this.createTaskItems = [];
	}

	removeItem(i) {
		this.createTaskItems.splice(i, 1);
	}

	createToDo() {
		let todoData = {
			title: this.todoTitle,
			text: this.todoText,
			dueDate: this.todoDueDate
		};
		console.log("Todo: ", todoData, " Task: ", this.createTaskItems);
		this.d0Service.addToDo(todoData, this.createTaskItems).subscribe((response) => {
			console.log("Sucess response. message: ", response);
			$(this.todoModal.nativeElement).modal("hide");
			this.clearToDoData();
		}, (error) => {
			console.log("Error response. error: ", error);
		});
	}

}
