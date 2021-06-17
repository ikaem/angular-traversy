// angular-crash\src\app\components\add-task\add-task.component.ts

import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text: string = '';
  day: string = '';
  reminder: boolean = false;

  showAddTask?: boolean;
  subscription?: Subscription;

  @Output() onSubmitNewTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = uiService
      .onToggle()
      .subscribe((v) => (this.showAddTask = v));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('No text');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    // TODO emit event

    console.log('new taks', newTask);

    this.onSubmitNewTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
