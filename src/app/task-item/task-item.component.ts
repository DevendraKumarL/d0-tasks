import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
	selector: 'task-item',
	templateUrl: './task-item.component.html',
	styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {

	@Input()
	public item: any;

}
