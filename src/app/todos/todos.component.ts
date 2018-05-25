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

	public todoData : any = {
		title: undefined,
		text: undefined,
		dueDate: undefined,
		tasks: []
	}

	public createMode : boolean = true;

	@ViewChild("todoModal")
	public todoModal : ElementRef;

	public todoForm : FormGroup;
	public formError : boolean = false;
	public formErrMsg : string;

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
		this.todoData.tasks.push({name: "", done: false});
	}

	removeTaskItem(i) {
		this.todoData.tasks.splice(i, 1);
	}

	clearToDoData() {
		// clear todo data
		this.todoData = {
			title: undefined,
			text: undefined,
			dueDate: undefined,
			tasks: []
		}

		// reset createMode flag
		this.createMode = true;

		// clear todo form
		this.todoForm.reset();

		// clear error messages and flags
		this.errorOccured = false;
		this.errorMessage = "";
		this.formError = false;
		this.formErrMsg = "";
	}

	createToDo() {
		console.log("CreateTodo: ", this.todoData);
		this.d0Service.addToDo(this.todoData).subscribe((response : any) => {
			console.log("Sucess response. message: ", response.success);
			$(this.todoModal.nativeElement).modal("hide");
			this.clearToDoData();
			// Get the new updated list of todos
			this.d0Service.getToDos();
		}, (error : any) => {
			console.log("Error response. error: ", error);
			this.formError = true;
			// TODO: Handle when api server is down
			this.formErrMsg = error.error.error;
		});
	}

	updateToDo() {
		console.log("EditTodo: ", this.todoData);
		this.d0Service.updateToDo(this.todoData.todoID, this.todoData).subscribe((response : any) => {
			console.log("Success response. success: ", response.success);
			$(this.todoModal.nativeElement).modal("hide");
			this.clearToDoData();
			// get the upated list of todos
			this.d0Service.getToDos();
		}, (error: any) => {
			console.log("Error response. error: ", error);
			this.formError = true;
			// TODO: Handle when api server is down
			this.formErrMsg = error.error.error;
		});
	}

	invokeEditToDo(todo) {
		this.createMode = false;
		// check with todo form
		this.todoData = {
			title: todo.title,
			text: todo.text,
			dueDate: todo.dueDate,
			tasks: todo.tasks,
			todoId: todo._id
		}
	}

	// TODO: Handle confirmation modal
	deleteToDo(todoID) {
		this.d0Service.deleteToDo(todoID).subscribe((response : any) => {
			console.log("Success response. success: ", response.success);
			// Get the new updated list of todos
			this.d0Service.getToDos();
		}, (error : any) => {
			console.log("Error response. error: ", error);
			this.errorOccured = true;
			// TODO: Handle when api server is down
			this.errorMessage = error.error.error;
		});
	}

}
