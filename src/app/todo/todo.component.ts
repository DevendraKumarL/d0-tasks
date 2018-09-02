import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
	selector: 'todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})
export class TodoComponent {

	@Input()
	public todo: any;
	@Input()
	public mode: string;
	@Input()
	public beingDeleted: boolean;

	@Output()
	public editToDoEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output()
	public deleteToDoEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output()
	public doneToDoEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output()
	public notDoneToDoEvent: EventEmitter<string> = new EventEmitter<string>();


	public dueDateSimple: string;
	public dueStatus: boolean = false;

	ngOnInit() {
		let todoDate = new Date(this.todo.dueDate);
		this.dueDateSimple = todoDate.toISOString().substr(0, 10);
		let currentDate = new Date();
		this.dueStatus = currentDate.getTime() > todoDate.getTime();
		if (this.todo.done) {
			this.dueStatus = undefined;
		}
	}

	ngAfterViewInit() {
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		});
	}

	invokeEditToDo() {
		this.editToDoEvent.emit(this.todo);
	}

	invokeDeleteToDo() {
		this.deleteToDoEvent.emit(this.todo._id);
	}

	invokeDoneToDo() {
		this.doneToDoEvent.emit(this.todo._id);
	}

	invokeNotDoneToDo() {
		this.notDoneToDoEvent.emit(this.todo._id);
	}

}
