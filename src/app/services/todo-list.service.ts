import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  apiUrl = 'http://localhost:3005';
  taskList = new BehaviorSubject({});
  $taskList = this.taskList.asObservable();
  constructor(private http: HttpClient) {}
  // get all
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }
  // create Task
  create(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, data);
  }
  // update Task
  update(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${data.id}`, data);
  }
  // delete Task
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }
}
