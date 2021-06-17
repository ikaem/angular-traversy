// angular-crash\src\app\components\tasks\tasks.component.ts

import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));

    console.log('tasks in ngOnInit', this.tasks);
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
    // call service method to delete task
  }

  toggleReminder(task: Task) {
    // call toggle reminder on the task service
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  submitNewTask(e: Task) {
    console.log('e', e);
    console.log('task is triggered');
    this.taskService.addTask(e).subscribe((t) => {
      console.log('what is this', t);
      this.tasks = this.tasks.concat(t);
    });
  }
}
