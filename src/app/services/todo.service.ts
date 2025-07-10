import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) { }
  private tasks: Task[] = [];

  getTasks(): Observable<Task[]> {
    //return this.tasks;
    return this.http.get<Task[]>('https://localhost:44387/api/Tasks');
  }

  /* addTask(description: string) {
     const newTask: Task = {
       id: Date.now(),
       description,
       completed: false
     };
     this.tasks.push(newTask);
   }*/

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('https://localhost:44387/api/tasks', task);
  }

  toggleTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:44387/api/Tasks/${id}`);
  }
}
