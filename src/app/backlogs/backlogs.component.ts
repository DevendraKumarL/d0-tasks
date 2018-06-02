import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { D0ApiService } from '../d0-api.service';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';

declare var $: any;

@Component({
	selector: 'backlogs',
	templateUrl: './backlogs.component.html',
	styleUrls: ['./backlogs.component.css']
})
export class BacklogsComponent {

	@Input()
	public todo: any;

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

	constructor(public d0Service : D0ApiService) {
		if (this.d0Service.todos.length === 0) {
			this.d0Service.getToDos();
		}
	}

	invokeEditToDo(todo) {
		this.todoModalChildComp.invokeEditToDo(todo);
	}

	invokeDelete(todoID) {
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
