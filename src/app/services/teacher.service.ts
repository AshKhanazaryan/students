import { Injectable } from '@angular/core';
import {BaseApiService} from './base-api.service';
import {v4 as uuidv4} from 'uuid';
import {Observable} from 'rxjs';
import {Teacher} from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private api: BaseApiService) { }

  createTeacher(data): Observable<Teacher> {
    return this.api.post(`/teacher`, {id: uuidv4(), ...data});
  }

  getProfession(): Observable<any> {
    return this.api.get('/profession');
  }

  getTeacherById(id: string): Observable<Teacher> {
    return this.api.get(`/teacher/${id}`);
  }

  teacherEdit(id: string, data): Observable<Teacher> {
    return this.api.put(`/teacher/${id}`, {id, ...data});
  }

  getAllTeacher(): Observable<any> {
    return this.api.get('/teacher');
  }

  deleteTeacher(id: string): Observable<any> {
    return this.api.delete(`/teacher/${id}`);
  }
}
