import { ToastrService } from 'ngx-toastr';
import { TodoListService } from './../services/todo-list.service';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    TaskListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  taskName = '';
  newTask: any = {
    id: '',
    taskName: '',
    idDone: '',
  };
  constructor(
    private TodoListService: TodoListService,
    private ToastrService: ToastrService
  ) {}
  createTask() {
    if (this.taskName) {
      this.newTask = {
        id: Date.now(),
        taskName: this.taskName,
        isDone: false,
      };
      console.log(this.newTask);
      this.TodoListService.create(this.newTask).subscribe({
        next: (task) => {
          console.log(task);
        },
        error: () => {},
        complete: () => {
          this.taskName = '';
          this.ToastrService.success('Task created successfully');
          this.TodoListService.getAll().subscribe({
            next: (tasks) => {
              this.TodoListService.taskList.next(tasks);
            },
          });
        },
      });
    } else {
      alert('Please enter task name');
    }
  }
}
