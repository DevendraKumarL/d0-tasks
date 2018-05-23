import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { D0ApiService } from '../d0-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Manually declare $ so that we can use it for jQeury within Angular Component
declare var $ : any;

/* TODO: Add comments everywhere */

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

	public todoForm : FormGroup;
	public formError : boolean = false;
	public errMssg : string;

	public errorOccured : boolean = false;
	public errorMessage : string;

	constructor(public d0Service : D0ApiService, public formBuilder : FormBuilder) {
		this.d0Service.getToDos();
		this.todoForm = this.formBuilder.group({
			title: ["", Validators.compose([Validators.required])],
			text: ["", Validators.compose([Validators.required])],
			dueDate: ["", Validators.compose([Validators.required])],
		});
	}

	addTaskItem() {
		this.createTaskItems.push({name: ""});
	}

	removeTaskItem(i) {
		this.createTaskItems.splice(i, 1);
	}

	clearToDoData() {
		this.todoText = undefined;
		this.todoTitle = undefined;
		this.todoDueDate = undefined;
		this.todoForm.reset();
		this.createTaskItems = [];
	}

	createToDo() {
		let todoData = {
			title: this.todoTitle,
			text: this.todoText,
			dueDate: this.todoDueDate
		};
		console.log("Todo: ", todoData, " Task: ", this.createTaskItems);
		this.d0Service.addToDo(todoData, this.createTaskItems).subscribe((response : any) => {
			console.log("Sucess response. message: ", response.success);
			$(this.todoModal.nativeElement).modal("hide");
			this.clearToDoData();
			// Get the new updated list of todos
			this.d0Service.getToDos();
		}, (error : any) => {
			console.log("Error response. error: ", error);
			this.formError = true;
			// TODO: Handle when api server is down
			this.errMssg = error.error.error;
		});
	}

	deleteToDo(todoID) {
		this.d0Service.deleteToDo(todoID).subscribe((response : any) => {
			console.log("Success response. success: ", response.success);
			// Get the new updated list of todos
			this.d0Service.getToDos();
		}, (error : any) => {
			console.log("Error response. error: ", error);
			this.errorOccured = true;
			// TODO: Handle when api server is down
			this.errorMessage = error.error.errMssg;
		});
	}

}
