import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main.component';
import {GroupListComponent} from './views/group/group-list/group-list.component';
import {NewGroupComponent} from './views/group/new-group/new-group.component';
import {StudentListComponent} from './views/students/student-list/student-list.component';
import {CreateStudentComponent} from './views/students/create-student/create-student.component';
import {TeacherListComponent} from './views/teacher/teacher-list/teacher-list.component';
import {CreateTeacherComponent} from './views/teacher/create-teacher/create-teacher.component';
import {SingleGroupComponent} from './views/group/single-group/single-group.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'groups'
  },
  {
    path: 'groups',
    component: GroupListComponent
  },
  {
    path: 'create-group',
    component: NewGroupComponent
  },
  {
    path: 'create-group/:id',
    component: NewGroupComponent
  },
  {
    path: 'teacher-list',
    component: TeacherListComponent
  },
  {
    path: 'create-teacher',
    component: CreateTeacherComponent
  },
  {
    path: 'create-teacher/:id',
    component: CreateTeacherComponent
  },
  {
    path: 'student-list',
    component: StudentListComponent
  },
  {
    path: 'create-student',
    component: CreateStudentComponent
  },
  {
    path: 'create-student/:id',
    component: CreateStudentComponent
  },
  {
    path: 'single-group',
    component: SingleGroupComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
