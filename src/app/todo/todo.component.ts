import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
	selector: 'todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})
export class TodoComponent {

	@Input()
	public todo: any;

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

}
