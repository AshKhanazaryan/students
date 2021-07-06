import { Injectable } from '@angular/core';
import {BaseApiService} from './base-api.service';
import {Observable} from 'rxjs';
import {Teacher} from '../models/teacher';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private api: BaseApiService) { }

  createStudent(data): Observable<Teacher> {
    return this.api.post(`/student`, {id: uuidv4(), ...data});
  }

  getStudentById(id: string): Observable<Teacher> {
    return this.api.get(`/student/${id}`);
  }

  studentEdit(id: string, data): Observable<Teacher> {
    return this.api.put(`/student/${id}`, {id, ...data});
  }

  getAllStudents(): Observable<any> {
    return this.api.get('/student');
  }

  deleteStudent(id: string): Observable<any> {
    return  this.api.delete(`/student/${id}`);
  }
}
