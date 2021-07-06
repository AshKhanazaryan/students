import { Injectable } from '@angular/core';
import {BaseApiService} from './base-api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Group} from '../models/group';
import {v4 as uuidv4} from 'uuid';
import {Teacher} from '../models/teacher';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private data = new BehaviorSubject<string>(null);
  public castData = this.data.asObservable();

  constructor(private api: BaseApiService) { }

  getAllGroups(): Observable<Group[]> {
    return this.api.get('/group');
  }

  createGroup(data): Observable<Group> {
    return this.api.post('/group', {id: uuidv4(), ...data})
  }

  getGroupById(id: string): Observable<Group> {
    return this.api.get(`/group/${id}`);
  }

  groupEdit(id: string, data): Observable<Group> {
    return this.api.put(`/group/${id}`, {id, ...data});
  }

  deleteGroup(id: string): Observable<any> {
    return  this.api.delete(`/group/${id}`);
  }

  sendData(newData){
    this.data.next(newData);
  }
}
