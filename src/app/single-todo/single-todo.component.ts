import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { D0ApiService } from '../d0-api.service';

@Component({
	selector: 'app-single-todo',
	templateUrl: './single-todo.component.html',
	styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent {

	public todoID: string;
	public todo: any;

	public errPresent: boolean = false;
	public errMsg: string;

	constructor(public activeRouter: ActivatedRoute, public d0Service: D0ApiService) {
		this.activeRouter.params.subscribe(
			params => {
				this.todoID = params.id;
				console.log("todoID: ", this.todoID);
				this.getToDo();
			}
		);
	}

	getToDo() {
		this.d0Service.getToDo(this.todoID).subscribe((todo: any) => {
			console.log("Success response.todo: ", todo);
			if (todo === null) {
				this.todo = undefined;
				this.errPresent = true;
				this.errMsg = "Sorry the t0d0 could not be fetched";
			} else {
				this.todo = todo;
			}
		}, (error: any) => {
			console.log("Error response. error: ", error);
			this.todo = undefined;
			// TODO: Handle when api service is down
			this.errPresent = true;
			this.errMsg = error.error.error;
		});
	}
}
