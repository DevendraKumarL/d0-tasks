import { Component } from '@angular/core';
import { D0ApiService } from './d0-api.service';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(public d0Service: D0ApiService) { }

}
