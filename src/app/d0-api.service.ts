import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class D0ApiService {

	public API_URL :string = "http://localhost:5002/d0/";

	public todos : any = [];
	public backlogs : any = [];

	constructor(public client : HttpClient) { }

	getAllToDos() {
		this.todos = [];
		let observableObject = this.client.get(this.API_URL + "todos");
		observableObject.subscribe((todos : any) => {
			console.log("Success response. todos: ", todos);
			this.todos = todos;
		}, (error) => {
			console.log("Error response. error: ", error);
		});
	}

	getToDo(todoID) {
		return this.client.get(this.API_URL + "todo/" + todoID);
	}

	getBacklogs() {
		this.backlogs = [];
		let observableObject = this.client.get(this.API_URL + "backlogs");
		observableObject.subscribe((backlogs : any) => {
			console.log("Success response. backlogs: ", backlogs);
			// Fetch todo data of each backlog
			backlogs.forEach(backl => {
				this.getToDo(backl.todoID).subscribe((todo : any) => {
					this.backlogs.push(todo)
				}, (error : any) => {
					console.log("Error response. error: ", error)
				})
			});
			console.log("backlogs: ", this.backlogs)
		}, (error : any) => {
			console.log("Error response. error: ", error);
		});
	}

	addToBackLog(todoID) {
		let observableObject = this.client.post(this.API_URL + "backlog", {id: todoID});
		observableObject.subscribe((response : any) => {
			console.log("Success response. success: ", response.success);
		}, (error : any) => {
			console.log("Error response. error: ", error);
		})
	}
}
