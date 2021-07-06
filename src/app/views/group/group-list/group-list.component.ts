import {Component, OnInit} from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {GroupService} from '../../../services/group.service';
import {Group} from '../../../models/group';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  public allGroups: Group[] = [];
  public students: any[] = [];
  public teachers: any[] = [];

  constructor(private groupService: GroupService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.getAllGroups()
      .subscribe(res => this.allGroups = res);
  }

  goToEdit(id: string): void {
    this.router.navigate([`/create-group/${id}`]);
  }

  delete(id: string): void {
    this.groupService.deleteGroup(id)
      .subscribe(res => {
        this.allGroups = this.allGroups.filter(val => val.id !== id);
      });
  }


  showData(id: string, type: string): void {
    if (type === 'teacher') {
      this.allGroups.map((val: any) =>  {
        if (val.teacherName.id === id) {
          if (!this.students.includes(val.studentName)) {
            this.students.push(val.studentName);
            this.groupService.sendData(val.studentName);
          }

          if (!val.studentName.length) {
            const tempArray = [];
            tempArray.push(val.studentName);
            val.studentName = tempArray;
          }
        }
      });
    } else {
      this.allGroups.map((val: any) => {
        if (val.studentName.id === id) {
          if (!this.teachers.includes(val.teacherName)) {
            this.teachers.push(val.teacherName);
            this.groupService.sendData(val.teacherName);
          }

          if (!val.teacherName.length) {
            const tempArray = [];
            tempArray.push(val.teacherName);
            val.teacherName = tempArray;
          }
        }
      })
    }
  }
}
