import { Component, ViewChild, ElementRef } from '@angular/core';
import { D0ApiService } from './d0-api.service';

declare var $: any;

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	@ViewChild("wsModal")
	public wsModal: ElementRef;

	public wsName: string;
	public errOccurred: boolean = false;

	constructor(public d0Service: D0ApiService) {
		this.d0Service.getAllWorkspaces();
	}

	switchWS(ws) {
		console.log("switchWS ws => ", ws);
		this.d0Service.selectedWS = ws;
	}

	closeWSModal() {
		this.wsName = null;
		this.errOccurred = false;
		$(this.wsModal.nativeElement).modal("hide");
	}

	wsNameValid() {
		if (this.wsName) {
			return true;
		}
		return false;
	}

	createWS() {
		console.log("wsName: ", this.wsName);
		this.d0Service.createWorspace(this.wsName).subscribe((response: any) => {
			console.log("Success response. ws: ", response.workspace);
			this.d0Service.workspaces.push(response.workspace);
			this.closeWSModal();
		}, (error: any) => {
			console.log("Error response. error: ", error.error.error);
			this.errOccurred = true;
		});
	}

}
