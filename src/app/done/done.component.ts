import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { D0ApiService } from '../d0-api.service';

declare var $: any;

@Component({
	selector: 'done',
	templateUrl: './done.component.html',
	styleUrls: ['./done.component.css']
})
export class DoneComponent {

	@Input()
	public todo: any;

	public undoPopup: boolean;
	public delTodoTmp: any;
	public undoInterval: any;
	public beingDeleted: boolean;

	@ViewChild("notDoneConfirmModal")
	public notDoneConfModal: ElementRef;

	@ViewChild("delConfirmModal")
	public delConfirmModal: ElementRef;

	public todoID: string;
	public deleteTodoID: string;

	public errorOccured: boolean = false;
	public errorMsg: string;

	constructor(public d0Service: D0ApiService) {
		if (this.d0Service.done.length === 0) {
			this.d0Service.getToDos();
		}
	}

	invokeNotDoneToDo(todoID) {
		this.todoID = todoID;
	}

	invokeDeleteTodo(todoID) {
		this.deleteTodoID = todoID;
	}

	clearData() {
		this.todoID = undefined;
		this.deleteTodoID = undefined;
		this.errorOccured = false;
		this.errorMsg = "";
	}

	updateDoneStatus() {
		if (this.todoID !== undefined) {
			this.d0Service.updateDoneStatus(this.todoID, false).subscribe((response: any) => {
				console.log("Success response. response: ", response)
				$(this.notDoneConfModal.nativeElement).modal("hide");
				// get the updated list of todos now
				this.d0Service.getToDos();
			}, (error: any) => {
				console.log("Error response: error", error);
				$(this.notDoneConfModal.nativeElement).modal("hide");
				// FIXME: Handle when api server is down
				this.errorOccured = true;
				this.errorMsg = error.error.error;
			});
		}
	}

	deleteToDo() {
		if (this.deleteTodoID !== undefined) {
			$(this.delConfirmModal.nativeElement).modal("hide");
			for(let i = 0; i < this.d0Service.done.length; i++) {
				if (this.d0Service.done[i]._id === this.deleteTodoID) {
					this.delTodoTmp = this.d0Service.done[i]
					this.delTodoTmp.todoDeleting = true;
					this.undoPopup = true;
					this.beingDeleted = true;
					console.log(this.delTodoTmp);
					break;
				}
			}
			this.undoInterval = setTimeout(() => {
				this.d0Service.deleteToDo(this.deleteTodoID).subscribe((response: any) => {
					console.log("Success response. success: ", response.success);
					this.delTodoTmp = {};
					this.undoPopup = false;
					this.beingDeleted = false;
					// Get the new updated list of todos
					this.d0Service.getToDos();
				}, (error: any) => {
					console.log("Error response. error: ", error);
					// FIXME: Handle when api server is down
					this.errorOccured = true;
					this.errorMsg = error.error.error;
					this.delTodoTmp = {};
					this.undoPopup = false;
				});
			}, 5000);
		}
	}

	undoDeleteTodo() {
		clearInterval(this.undoInterval);
		this.delTodoTmp.todoDeleting = false;
		this.undoPopup = false;
		this.delTodoTmp = {};
		this.beingDeleted = false;
	}
}
