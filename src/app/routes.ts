import { TodosComponent } from "./todos/todos.component";
import { DoneComponent } from "./done/done.component";
import { BacklogsComponent } from "./backlogs/backlogs.component";

export let routes = [
    {
        path: "todos",
        component: TodosComponent
    },
    {
        path: "done",
        component: DoneComponent
    },
    {
        path: "backlogs",
        component: BacklogsComponent
    },
    {
        path: "",
        redirectTo: "todos",
        pathMatch: "full"
    }
];