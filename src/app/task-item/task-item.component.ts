import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
	selector: 'task-item',
	templateUrl: './task-item.component.html',
	styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {

	@ViewChild("tskItem")
	public inputEle : ElementRef;

	@Input()
	public item : any;

}
