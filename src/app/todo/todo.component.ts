import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
	selector: 'todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})
export class TodoComponent {

	@Input()
	public todo : any;

	ngOnInit() {
		this.todo.dueDate = new Date(this.todo.dueDate).toISOString().substr(0, 10);
	}

}
