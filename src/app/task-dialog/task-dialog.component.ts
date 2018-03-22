import { Task } from './../models/task.model';
import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  dialogTitle = 'Nova Tarefa';
  task: Task = { title: '' };
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.dialogTitle = 'Atualizar Tarefa';
      this.task = this.data.task;
    }
  }

  onSave(): void {
    const operation: Promise<void> = !this.data
      ? this.taskService.create(this.task)
      : this.taskService.update(this.task);

    operation.then(() => {
      this.dialogRef.close();
    });
  }
}
