import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TodoService } from '../services/todo.service';
import { TaskFilter } from '../enums/task-filter.enum';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  newTask: string = '';
  tasks: Task[] = [];
  filter: TaskFilter = TaskFilter.All;
  TaskFilter = TaskFilter;
  successMessage: string = '';


  menuOptions = [
    { label: 'Todas', value: TaskFilter.All, class: 'btn-outline-primary' },
    { label: 'Completadas', value: TaskFilter.Completed, class: 'btn-outline-success' },
    { label: 'Pendientes', value: TaskFilter.Pending, class: 'btn-outline-warning' }
  ];

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => {
      if (this.filter === TaskFilter.Completed) return task.completed;
      if (this.filter === TaskFilter.Pending) return !task.completed;
      return true;
    });
  }


  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  addTask() {
    const newTask: Task = { id: 0, description: this.newTask, completed: false };
    this.todoService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.newTask = '';
      this.successMessage = '✅ Tarea creada con éxito';
      setTimeout(() => this.successMessage = '', 3000); //
    });
  }

  toggleTask(id: number) {
    this.todoService.toggleTask(id);
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

  enableEdit(task: Task) {
    task.editing = true;
  }

  saveEdit(task: Task) {
    task.editing = false;
  }

  cancelEdit(task: Task) {
    task.editing = false;
    // Opcional: restaurar el valor original si lo guardaste antes
  }
}
