import {Teacher} from './teacher';
import {Student} from './student';

export interface Group {
  id: string;
  groupName: string;
  teacherName: Teacher;
  studentName: Student;
}
