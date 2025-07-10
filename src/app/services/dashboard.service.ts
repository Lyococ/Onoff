import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getMetrics(): Observable<{ total: number; completed: number; pending: number }> {
    return this.http.get<{ total: number; completed: number; pending: number }>('https://localhost:44387/api/tasks/count');
  }
}



