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
import { TodoComponent } from './todo/todo.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TodoModalComponent } from './todo-modal/todo-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    BacklogsComponent,
    DoneComponent,
    TodoComponent,
    TaskItemComponent,
    TodoModalComponent
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
