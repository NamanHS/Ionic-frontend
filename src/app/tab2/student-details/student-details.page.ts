import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {

  student: any;

  constructor(private activatedRoute: ActivatedRoute, private studentsService: StudentsService) {
    this.student =  {
      firstName: 'Loading...',
      lastName: '',
      studentId : '',
      emailId : '',
      phoneNumber: '',
      classId: ''
    }
  }

  ngOnInit() {

    this.activatedRoute.paramMap
      .subscribe(paramMap=>{
        let id: any
        id = paramMap.get('id')
        id = parseInt(id.toString())
          this.studentsService.readOneStudent(id)
            .subscribe(res=>{
              this.student = res[0]
              console.log(this.student)
            })
      })
  }

}
