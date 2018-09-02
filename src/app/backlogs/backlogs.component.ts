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

	public undoPopup: boolean;
	public delTodoTmp: any;
	public undoInterval: any;
	public beingDeleted: boolean;

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
			$(this.delConfirmModal.nativeElement).modal("hide");
			for(let i = 0; i < this.d0Service.backlogs.length; i++) {
				if (this.d0Service.backlogs[i]._id === this.deleteTodoID) {
					this.delTodoTmp = this.d0Service.backlogs[i]
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
					this.errorMessage = error.error.error;
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
