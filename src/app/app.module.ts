import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { BacklogsComponent } from './backlogs/backlogs.component';
import { DoneComponent } from './done/done.component';
import { D0ApiService } from './d0-api.service';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    BacklogsComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [D0ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
