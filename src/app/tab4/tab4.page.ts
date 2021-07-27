import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ClassesService } from '../services/classes.service';
import { MarksheetsService } from '../services/marksheets.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  classes

  resultByClassId;
  resultByStudentId;

  classResultStatus = false
  studentResultStatus = false

  form1 = new FormGroup({
    classId: new FormControl('',[Validators.required])
  });

  form2 = new FormGroup({
    studentId: new FormControl('',[Validators.required])
  });
  state = 'selectedClass';
  colorofClassTab = "primary";
  colorofStudentTab = "light";

  constructor(private alertController: AlertController,private classesService: ClassesService,private markSheetsService: MarksheetsService) { }

  ngOnInit() {
    this.classesService.readClasses()
      .subscribe(result=>{
        this.classes = result
      },err=>{
        console.log(err)
      })
  }

  stateChange(){
    if(this.state === 'selectedClass'){
      this.colorofClassTab = "light"
      this.colorofStudentTab = "primary"
      this.state = 'selectedStudent'
    }
    else if(this.state === 'selectedStudent'){
      this.colorofStudentTab = "light"
      this.colorofClassTab = "primary"
      this.state = 'selectedClass'
    }
  }

  onClassIdSubmit(){

    if(this.form1.invalid){
      this.alertController.create({
        header: 'Please Select Class',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel'
          }
        ]
      }).then(alertctrl=>{
        alertctrl.present();
      });
    }
    if(this.form1.valid){

      this.markSheetsService.getMarksheetByClassId(parseInt(this.form1.get('classId').value.toString()))
      .subscribe(result=>{
        console.log(result)
        this.classResultStatus = true
        this.resultByClassId = result
      },err=>{
        console.log(err)
        console.log(err)
      })

    }

  }

  onStudentIdSubmit(){

    if(this.form2.invalid){
      this.alertController.create({
        header: 'Please Enter Student ID',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel'
          }
        ]
      }).then(alertctrl=>{
        alertctrl.present();
      });
    }
    if(this.form2.valid){

      this.markSheetsService.getMarksheetByStudentId(parseInt(this.form2.get('studentId').value.toString()))
      .subscribe(result=>{
        this.resultByStudentId = result
        console.log(result)
      },err=>{
        console.log(err.error.msg)
        this.alertController.create({
          header: err.error.msg.toString(),
          buttons: [
            {
              text: 'Okay',
              role: 'cancel'
            }
          ]
        }).then(alertctrl=>{
          alertctrl.present();
        });
      })
    }
  }

}
