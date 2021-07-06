import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../services/student.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  public studentForm: FormGroup;
  public studentId: string;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService) {
    this.route.params.subscribe(res => this.studentId = res.id);
  }

  // convenience getter for easy access to form fields
  get formStudent() {
    return this.studentForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    this.getTeacher();
  }

  createForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      phone: ['', [Validators.required]],
    });
  }

  keyPress(event: any): void {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getTeacher(): void {
    if (!this.studentId) {
      return;
    }
    this.studentService.getStudentById(this.studentId)
      .subscribe(res => {
        this.formStudent.name.setValue(res.name);
        this.formStudent.surName.setValue(res.surName);
        this.formStudent.email.setValue(res.email);
        this.formStudent.phone.setValue(res.phone);
      });
  }

  save() {
    if (this.studentForm.invalid) {
      return;
    }
    if (!this.studentId) {
      this.createStudent();
    } else {
      this.editStudent();
    }
  }

  createStudent(): void {
    this.studentService.createStudent(this.studentForm.value)
      .subscribe(res => this.router.navigate(['/student-list']));
  }

  editStudent(): void {
    this.studentService.studentEdit(this.studentId, this.studentForm.value)
      .subscribe(res => this.router.navigate(['/student-list']));
  }
}
