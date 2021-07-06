import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../../services/group.service';
import {StudentService} from '../../../services/student.service';
import {TeacherService} from '../../../services/teacher.service';
import {combineLatest} from 'rxjs';
import {Teacher} from '../../../models/teacher';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  public groupForm: FormGroup;
  public profession: Array<string>[];
  public teachers: Teacher[] = [];
  public students: Student[] = [];
  public groupId: string;
  public selectedStudents: Array<any> = []

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private groupService: GroupService,
              private studentService: StudentService,
              private teacherService: TeacherService) {
    this.route.params.subscribe(res => this.groupId = res.id);
  }

  // convenience getter for easy access to form fields
  get formGroup() {
    return this.groupForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    this.getAll();
    this.getOneGroup();
  }

  changeTeacher(): void {
    this.teachers = this.teachers.filter(val => val.id === this.groupForm.value.teacherName);
  }
  changeStudent(): void {
    this.students = this.students.filter(val => val.id === this.groupForm.value.studentName);
  };
  createForm(): void {
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required]],
      teacherName: ['', [Validators.required]],
      studentName: [[], [Validators.required]],
    });
  }

  getAll(): void {
    combineLatest(this.teacherService.getProfession(),
      this.teacherService.getAllTeacher(),
      this.studentService.getAllStudents())
      .subscribe(([prof, teach, student]) => {
        this.profession = prof;
        this.teachers = teach;
        this.students = student;
      });
  }

  save(): void {

    const data = {
      groupName: this.groupForm.value.groupName,
      teacherName: this.teachers[0],
      studentName: this.selectedStudents.filter(item => item.name),
    };

    this.groupForm.controls.studentName.setValue(data.studentName);
    this.groupForm.controls.teacherName.setValue(data.teacherName)

    if (this.groupForm.invalid) {
      return;
    }

    if (!this.groupId) {
      this.createGroup(data);
    } else {
      this.editGroup(data);
    }
  }

  getOneGroup(): void {
    if (!this.groupId) {
      return;
    }
    this.groupService.getGroupById(this.groupId)
      .subscribe(res => {
        this.formGroup.groupName.setValue(res.groupName);
        this.formGroup.teacherName.setValue(res.teacherName.id);
        this.formGroup.studentName.setValue(res.studentName.id);
      });
  }

  createGroup(data): void {
    this.groupService.createGroup(data)
      .subscribe(res => this.router.navigate(['/groups']));
  }

  editGroup(data): void {
    this.groupService.groupEdit(this.groupId, data)
      .subscribe(res => this.router.navigate(['/groups']));
  }

  shareCheckedList(item: any[]): void{ }

  shareIndividualCheckedList(item: {}): void{
    if (item['checked']) {
      this.selectedStudents.push(item);
    } else {
      this.selectedStudents.map((student, index) => {
        if (student.name.id === item['name'].id) {
          this.selectedStudents.splice(index, 1);
        }
      })
      // this.selectedStudents.splice(this.selectedStudents.indexOf())
    }
    console.log(this.selectedStudents, 55555);
  }
}
