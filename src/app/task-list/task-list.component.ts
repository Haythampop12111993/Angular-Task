import { TaskItemComponent } from '../task-item/task-item.component';
import { TodoListService } from './../services/todo-list.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, MatCheckboxModule, NgClass, FontAwesomeModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  constructor(
    private TodoListService: TodoListService,
    private Toastr: ToastrService
  ) {}
  tasks: any = [];
  faTrash = faTrash;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TodoListService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.TodoListService.taskList.next(data);
        this.TodoListService.$taskList.subscribe({
          next: (data) => {
            console.log(data);
            this.tasks = data;
          },
        });
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  update(item: any) {
    item.isDone = !item.isDone;
    console.log(item);
    this.TodoListService.update(item).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        if (item.isDone) {
          this.Toastr.success('Task Completed');
        }
      },
    });
  }
  deleteTask(id: any) {
    console.log(id);
    this.TodoListService.delete(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {},
      complete: () => {
        this.Toastr.success('Task Deleted');
        this.TodoListService.getAll().subscribe({
          next: (data) => {
            this.TodoListService.taskList.next(data);
          },
        });
      },
    });
  }
}
