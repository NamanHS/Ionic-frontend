import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarksheetsService } from 'src/app/services/marksheets.service';

@Component({
  selector: 'app-students-marksheet',
  templateUrl: './students-marksheet.page.html',
  styleUrls: ['./students-marksheet.page.scss'],
})
export class StudentsMarksheetPage implements OnInit {

  marksheet : any;
  resultStatus: any;
  marks;

  constructor(private activatedRoute: ActivatedRoute,private markSheetsService: MarksheetsService) {
    this.marksheet =  {
      firstName: 'Loading...',
      lastName: '',
    }
    this.resultStatus = false;
   }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(paramMap=>{
        let id: any
        id = paramMap.get('id')
        id = parseInt(id.toString())
          this.markSheetsService.getMarksheetByStudentId(id)
            .subscribe(res=>{
              this.marksheet = res[0]
              this.resultStatus = true;
              this.marks = JSON.parse(this.marksheet['marks'])
              console.log(this.marks)
              console.log(this.marksheet)
            })
      })
  }

}
