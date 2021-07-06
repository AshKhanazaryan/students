import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainModule} from './components/main.module';
import {GroupListComponent} from './views/group/group-list/group-list.component';
import {NewGroupComponent} from './views/group/new-group/new-group.component';
import { StudentListComponent } from './views/students/student-list/student-list.component';
import { CreateStudentComponent } from './views/students/create-student/create-student.component';
import { TeacherListComponent } from './views/teacher/teacher-list/teacher-list.component';
import { CreateTeacherComponent } from './views/teacher/create-teacher/create-teacher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SingleGroupComponent } from './views/group/single-group/single-group.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    NewGroupComponent,
    StudentListComponent,
    CreateStudentComponent,
    TeacherListComponent,
    CreateTeacherComponent,
    SingleGroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MainModule,
    FontAwesomeModule,
    CommonModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
