import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';
import { TaskService } from './../task.service';
import { Task } from './../models/task.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  selectedTask: Task;
  loading = true;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks.valueChanges();
    this.tasks$.pipe(take(1)).subscribe(() => (this.loading = false));
  }

  onPerformTask(task: Task): void {
    task.done = !task.done;
    this.taskService.update(task);
  }

  showDialog(task?: Task): void {
    const config: MatDialogConfig<any> = task ? { data: { task } } : null;
    this.dialog.open(TaskDialogComponent, config);
  }

  onDelete(task: Task): void {
    this.taskService.delete(task);
  }
}