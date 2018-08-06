import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class D0ApiService {

	public API_URL: string = "http://localhost:5001/d0/";

	public todos: any = [];
	public backlogs: any = [];
	public done: any = [];

	public workspaces: any = [];
	public selectedWS: string;

	public totalTodos: number = 0;

	constructor(public client: HttpClient) {}

	getToDos() {
		this.todos = [];
		this.done = [];
		this.backlogs = [];
		let observableObject = this.client.get(this.API_URL + "todos");
		observableObject.subscribe((todos: any) => {
			console.log("Success response");
			this.todos = todos;
			// process somethings internally for the app
			for (let i = 0; i < this.todos.length; ++i) {
				// 1. add the todo to done list if done: true
				if (this.todos[i].done) {
					this.done.push(JSON.parse(JSON.stringify(this.todos[i]))); // deep clone
				}
				let tasksDone = true;

				// 2. check if all the tasks in a todo are done then add a property allTasksDone: true locally
				for (let j = 0; j < this.todos[i].tasks.length; ++j) {
					if (!this.todos[i].tasks[j].done) {
						tasksDone = false;
						break;
					}
				}
				this.todos[i].allTasksDone = tasksDone;

				// 3. check if a todo is behind schedule then add a property backlog: true locally
				let currentDate = new Date();
				let date = new Date(this.todos[i].dueDate);
				let backlogFlag = false;
				if ((!this.todos[i].done) && (date.getTime() < currentDate.getTime())) {
					backlogFlag = true;
					this.backlogs.push(JSON.parse(JSON.stringify(this.todos[i]))) // deep clone
				}
				this.todos[i].backlog = backlogFlag;
			}
			console.log("todos: ", this.todos);
			console.log("done: ", this.done);
			this.totalTodos = this.todos.length - (this.done.length + this.backlogs.length)
		}, (error) => {
			console.log("Error response. error: ", error);
		});
	}

	getToDo(todoID) {
		return this.client.get(this.API_URL + "todo/" + todoID);
	}

	addToDo(todoData: any) {
		return this.client.post(this.API_URL + "todo", todoData);
	}

	updateToDo(todoID, todoData) {
		return this.client.put(this.API_URL + "todo/" + todoID + "/update", { updatedToDo: todoData });
	}

	deleteToDo(todoID) {
		return this.client.delete(this.API_URL + "todo/" + todoID);
	}

	updateDoneStatus(todoID, done) {
		return this.client.put(this.API_URL + "todo/" + todoID, { done: done });
	}

	getAllWorkspaces() {
		let observableObject = this.client.get(this.API_URL + "workspaces");
		observableObject.subscribe((workspaces: any) => {
			console.log("Success response. workspaces: ", workspaces);
			this.workspaces = workspaces.length > 0 ? workspaces : [];
			this.selectedWS = this.workspaces[0].name;
		}, (error: any) => {
			// FIXME: Handle when node server is unreachable
			console.log("Error response. error: ", error.error.error);
		});
	}

	createWorspace(name: string) {
		return this.client.post(this.API_URL + "workspace", { name: name });
	}
}
