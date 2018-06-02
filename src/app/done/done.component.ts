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
			this.d0Service.deleteToDo(this.deleteTodoID).subscribe((response: any) => {
				console.log("Success response. response: ", response);
				$(this.delConfirmModal.nativeElement).modal("hide");
				// get the updated list of todos now
				this.d0Service.getToDos();
			}, (error: any) => {
				console.log("Error response. error: ", error);
				$(this.delConfirmModal.nativeElement).modal("hide");
				// FIXME: Handle when api server is down
				this.errorOccured = true;
				this.errorMsg = error.error.error;
			});
		}
	}

}
