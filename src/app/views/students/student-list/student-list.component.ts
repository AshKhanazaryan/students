import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {StudentService} from '../../../services/student.service';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  public students: Student[] = [];

  constructor( private router: Router,
               private studentService: StudentService) { }

  ngOnInit(): void {
    this.allStudents();
  }

  allStudents(): void {
    this.studentService.getAllStudents()
      .subscribe(res => this.students = res)
  }

  goToEdit(id: string): void {
    this.router.navigate([`/create-student/${id}`]);
  }

  delete(id): void {
    this.studentService.deleteStudent(id)
      .subscribe(res => {
        this.students = this.students.filter( val => val.id !== id);
      }, error => console.error(error));
  }

}
