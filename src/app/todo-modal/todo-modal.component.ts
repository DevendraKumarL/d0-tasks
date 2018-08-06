import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { D0ApiService } from '../d0-api.service';

// Manually declare $ so that we can use it for jQeury within Angular Component
declare var $: any;

const dueTime: string = "T17:29:59.999Z";

@Component({
	selector: 'todo-modal',
	templateUrl: './todo-modal.component.html',
	styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent {

	@Input()
	public createMode: boolean;

	@ViewChild("todoModal")
	public todoModal: ElementRef;

	public todoData: any = {
		title: undefined,
		text: undefined,
		dueDate: undefined,
		tasks: [],
		workspace: undefined
	}

	public todoForm: FormGroup;

	public formError: boolean = false;
	public formErrMsg: string;
	public tasksError: boolean = false;
	public tasksErrMsg: string;

	constructor(public d0Service: D0ApiService, public formBuilder: FormBuilder) {
		this.todoForm = this.formBuilder.group({
			title: ["", Validators.compose([Validators.required])],
			text: ["", Validators.compose([Validators.required])],
			dueDate: ["", Validators.compose([Validators.required])],
			workspace: ["", Validators.compose([Validators.required])]
		});
	}

	addTaskItem() {
		this.todoData.tasks.push({ name: "", done: false });
	}

	removeTaskItem(i) {
		this.todoData.tasks.splice(i, 1);
		if (this.todoData.tasks.length === 0) {
			this.tasksError = false;
			this.tasksErrMsg = "";
		}
	}

	clearToDoData() {
		// clear todo data
		this.todoData = {
			title: undefined,
			text: undefined,
			dueDate: undefined,
			tasks: [],
			workspace: this.d0Service.selectedWS
		}

		// reset createMode flag
		this.createMode = true;

		// clear todo form
		this.todoForm.reset();

		// clear error messages and flags
		this.formError = false;
		this.formErrMsg = "";
		this.tasksError = false;
		this.tasksErrMsg = "";
	}

	private checkTasksEmpty() {
		this.tasksError = false;
		this.tasksErrMsg = "";
		for (let i = 0; i < this.todoData.tasks.length; ++i) {
			if (this.todoData.tasks[i].name === "") {
				this.tasksError = true
				break;
			}
		}
		if (this.tasksError) {
			this.tasksErrMsg = "Tasks cannot be empty";
			return false;
		}
		return true;
	}

	createToDo() {
		if (!this.checkTasksEmpty()) {
			return
		}
		this.todoData.dueDate = this.calculateDueDate(this.todoData.dueDate);		
		console.log("T0D0: ", this.todoData);
		this.d0Service.addToDo(this.todoData).subscribe((response: any) => {
			console.log("Sucess response. message: ", response.success);
			$(this.todoModal.nativeElement).modal("hide");
			this.clearToDoData();
			// Get the new updated list of todos
			this.d0Service.getToDos();
		}, (error: any) => {
			console.log("Error response. error: ", error);
			this.formError = true;
			// FIXME: Handle when api server is down
			this.formErrMsg = error.error.error;
		});
	}

	updateToDo() {
		console.log("EditTodo: ", this.todoData);
		if (!this.checkTasksEmpty()) {
			return;
		}
		this.todoData.dueDate = this.calculateDueDate(this.todoData.dueDate);
		console.log("T0D0: ", this.todoData);
		this.d0Service.updateToDo(this.todoData.todoID, this.todoData).subscribe((response: any) => {
			console.log("Success response. success: ", response.success);
			$(this.todoModal.nativeElement).modal("hide");
			this.clearToDoData();
			// get the upated list of todos
			this.d0Service.getToDos();
		}, (error: any) => {
			console.log("Error response. error: ", error);
			this.formError = true;
			// FIXME: Handle when api server is down
			this.formErrMsg = error.error.error;
		});
	}

	invokeEditToDo(todo) {
		this.createMode = false;
		// check with todo form
		this.todoData = {
			title: todo.title,
			text: todo.text,
			dueDate: new Date(todo.dueDate).toISOString().substr(0, 10),
			tasks: JSON.parse(JSON.stringify(todo.tasks)), // Deep clone
			todoID: todo._id,
			workspace: todo.workspace
		}
	}

	// modify the dueDate so that the time is set to 23:59:59 for the date given
	private calculateDueDate(date) {
		return new Date(new Date(date).toISOString().substr(0, 10) + dueTime);
	}
}
