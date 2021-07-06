import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../services/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {
  public teacherForm: FormGroup;
  public profession: Array<string>[];
  public teacherId: string;

  constructor(private fb: FormBuilder,
              private teacherService: TeacherService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(res => this.teacherId = res.id);
  }

  // convenience getter for easy access to form fields
  get formTeacher() {
    return this.teacherForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    this.professionGet();
    this.getTeacher();
  }

  createForm(): void {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      phone: ['', [Validators.required]],
      profession: ['', Validators.required]
    });
  }

  keyPress(event: any): void {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  professionGet(): void {
    this.teacherService.getProfession()
      .subscribe(res => this.profession = res);
  }

  getTeacher(): void {
    if (!this.teacherId) {
      return;
    }
    this.teacherService.getTeacherById(this.teacherId)
      .subscribe(res => {
        this.formTeacher.name.setValue(res.name);
        this.formTeacher.surName.setValue(res.surName);
        this.formTeacher.email.setValue(res.email);
        this.formTeacher.phone.setValue(res.phone);
        this.formTeacher.profession.setValue(res.profession);
      });
  }

  save() {
    if (this.teacherForm.invalid) {
      return;
    }
    if (!this.teacherId) {
      this.createTeacher();
    } else {
      this.editTeacher();
    }
  }

  createTeacher(): void {
    this.teacherService.createTeacher(this.teacherForm.value)
      .subscribe(res => this.router.navigate(['/teacher-list']))
  }

  editTeacher(): void {
    this.teacherService.teacherEdit(this.teacherId, this.teacherForm.value)
      .subscribe(res => this.router.navigate(['/teacher-list']));
  }

}
