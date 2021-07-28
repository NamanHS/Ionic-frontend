import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarksheetsService } from 'src/app/services/marksheets.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-students-marksheet',
  templateUrl: './students-marksheet.page.html',
  styleUrls: ['./students-marksheet.page.scss'],
})
export class StudentsMarksheetPage implements OnInit {

  marksheet : any;
  resultStatus: any;
  marks: any[];

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

  generatePDF() {
    let date = new Date();
    let pdfmarks = []
    this.marks.forEach(val =>{
      let temp = []
      temp.push((val.sub).toString())
      temp.push((val.marks).toString())
      temp.push((val.maxMarks).toString())
      pdfmarks.push(temp)
    }
    );
    console.log(pdfmarks)
    let docDefinition = {
      header: `Printed On - ${date}`,
      content: [
        {
          text: `MARKSHEET ID - ${this.marksheet.marksheetId}\n\nClass - ${this.marksheet.className}\n\nStudent ID - ${this.marksheet.studentId}\nFirst Name - ${this.marksheet.firstName}\nLast Name - ${this.marksheet.lastName}\n\nSTATUS - ${this.marksheet.status}` ,

        },
        {
          width: 'auto',
          table: {
            headerRows: 1,
            width: ['auto','auto','auto'],
            body: [
              ['Subject','Marks','Max Marks'],
              ...pdfmarks,
              ['TOTAL MARKS',`${this.marksheet.totalMarks}`,`${this.marksheet.totalMaxMarks}`],
              ['',{text:`Percentage - ${this.marksheet.percentage}%`,colSpan:2},''],
              ['',{text:`Grade - ${this.marksheet.grade}`,colSpan:2},'']


            ]
          }
        }
      ]
    };

    pdfMake.createPdf(docDefinition).print();
  }

}
