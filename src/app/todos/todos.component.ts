import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { D0ApiService } from '../d0-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';

// Manually declare $ so that we can use it for jQeury within Angular Component
declare var $: any;

/* TODO: Mark individal todo done when there are tasks in it */
/* TODO:  */

@Component({
	selector: 'todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.css']
})
export class TodosComponent {

	public createMode: boolean = true;

	@ViewChild(TodoModalComponent)
	public todoModalChildComp: TodoModalComponent;

	@ViewChild("doneConfirmModal")
	public doneConfirmModal: ElementRef;

	@ViewChild("delConfirmModal")
	public delConfirmModal: ElementRef;

	public deleteTodoID: string;
	public doneTodoID: string;

	public errorOccured: boolean = false;
	public errorMessage: string;

	constructor(public d0Service: D0ApiService) {
		if (this.d0Service.todos.length === 0) {
			this.d0Service.getToDos();
		}
	}

	clearData() {
		// undefine todoID
		this.deleteTodoID = undefined;
		this.doneTodoID = undefined;

		// clear error messages and flags
		this.errorOccured = false;
		this.errorMessage = "";
	}

	invokeEditToDo(todo) {
		this.todoModalChildComp.invokeEditToDo(todo);
	}

	invokeDeleteTodo(todoID) {
		this.deleteTodoID = todoID;
	}

	deleteToDo() {
		if (this.deleteTodoID !== undefined) {
			this.d0Service.deleteToDo(this.deleteTodoID).subscribe((response: any) => {
				console.log("Success response. success: ", response.success);
				$(this.delConfirmModal.nativeElement).modal("hide");
				// Get the new updated list of todos
				this.d0Service.getToDos();
			}, (error: any) => {
				console.log("Error response. error: ", error);
				$(this.delConfirmModal.nativeElement).modal("hide");
				// FIXME: Handle when api server is down
				this.errorOccured = true;
				this.errorMessage = error.error.error;
			});
		}
	}

	invokeDoneToDo(todoID) {
		this.doneTodoID = todoID;
	}

	updateDoneStatus() {
		if (this.doneTodoID !== undefined) {
			this.d0Service.updateDoneStatus(this.doneTodoID, true).subscribe((response: any) => {
				console.log("Success response. success: ", response.success);
				$(this.doneConfirmModal.nativeElement).modal("hide");
				// get the new updated list of todos
				this.d0Service.getToDos();
			}, (error: any) => {
				console.log("Error response. error: ", error);
				$(this.doneConfirmModal.nativeElement).modal("hide");
				// FIXME: Handle when api server is down
				this.errorOccured = true;
				this.errorMessage = error.error.error;
			})
		}
	}

}
