import { Component, OnInit } from '@angular/core';
import { D0ApiService } from '../d0-api.service';

@Component({
	selector: 'todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.css']
})
export class TodosComponent {

	constructor(public d0Service : D0ApiService) {
		this.d0Service.getToDos();
	}

}
