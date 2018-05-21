import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})
export class TodoComponent {

	@Input()
	public todo : any;

}
