import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {TeacherService} from '../../../services/teacher.service';
import {Router} from '@angular/router';
import {Teacher} from '../../../models/teacher';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  public teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService,
              private router: Router) { }

  ngOnInit(): void {
    this.allTeacher();
  }

  allTeacher(): void {
    this.teacherService.getAllTeacher()
      .subscribe(res => this.teachers = res)
  }

  goToEdit(id: string): void {
    this.router.navigate([`/create-teacher/${id}`]);
  }

  delete(id): void {
    this.teacherService.deleteTeacher(id)
      .subscribe(res => {
        this.teachers = this.teachers.filter( val => val.id !== id);
      }, error => console.error(error))
  }
}
