import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormControlName } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ClassesService } from '../services/classes.service';
import { MarksheetsService } from '../services/marksheets.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  form = new FormGroup({
    studentId : new FormControl('',[Validators.required, Validators.minLength(1)])
  })


  firstName;
  lastName;
  studentId
  classId;
  className;
  subjects


  form2;
  form2status = false;

  constructor(private alertcontroller: AlertController, private classService: ClassesService, private marksheetsService: MarksheetsService) { }

  ngOnInit() {
  }

  onAddStudentId(){
    if(this.form.invalid){
      this.alertcontroller.create({
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

    else if(this.form.valid){

      this.studentId = parseInt(this.form.get('studentId').value.toString())
      this.classService.readSubjectsOfStudent(this.studentId)
        .subscribe(result=>{
          if(result['length'] > 0){
            console.log(result)
            this.firstName = result[0].firstName
            this.lastName = result[0].lastName
            this.classId = result[0].classId
            this.className = result[0].className

            this.form2status = true

            this.form2 = new FormGroup({           //--------------------Generate empty form
            })

            this.subjects = JSON.parse(result[0].subjects)
            console.log(this.subjects)

            for(let subject of this.subjects){
              let fieldName = subject.sub + 'Marks';
              let maxMarks = subject.maxMarks
              this.form2.addControl(fieldName,new FormControl('',[Validators.required,Validators.min(0),Validators.max(maxMarks)])) //----------adding control as per subjects
            }

          }
          else{
            this.alertcontroller.create({
              header: 'Student with given id does not exists',
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
        },
        err=>{
          console.log(err)
        })
    }
  }

  onForm2Submit(){
    if(this.form2.invalid){

      if(this.form2.pristine){ //-----------------------------------if form is pristine (pure)
          this.alertcontroller.create({
            header: `Please enter Marks`,
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
      else{ //----------------------------form is dirty

        try{
          Object.keys(this.form2.controls).forEach(key=>{

            if(this.form2.controls[key].errors){
              let msg;
              if(this.form2.controls[key].errors.required){//-------------field required

                msg = 'Please enter all the marks'
                throw new Error(msg)  //--------------------------------------break and throw error for alert

              }else if(this.form2.controls[key].errors.max || this.form2.controls[key].errors.min){//-----------field not in range

                let subName = key.substring(0,key.indexOf('Marks')) //----------seperate marks and sub string
                msg = `Please enter ${subName} Marks in Valid Range`
                throw new Error(msg) //--------------------------------------break and throw error for alert

              }

            }
          })
        }
        catch(e){
          let msg = e.message
          this.alertcontroller.create({
            header: msg,
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
      }
  }
  else if(this.form.valid){
    console.log(this.form2)
      // enter to DB

      let marks = [];
      let count = 0

      Object.keys(this.form2.controls).forEach(key=>{
        let mark = {
          ...this.subjects[count]
        }
        mark.marks = parseInt(this.form2.get([key]).value.toString())
        marks.push(mark)
        count++
      })

      console.log(marks)

      let marksheet = {
        classId: this.classId,
        studentId: this.studentId,
        marks: marks
      }

      console.log(marksheet)

      this.marksheetsService.createMarksheet(marksheet)
        .subscribe(result=>{
          this.alertcontroller.create({
            header: result['msg'].toString(),
            buttons: [
              {
                text: 'Okay',
                role: 'cancel'
              }
            ]
          }).then(alertctrl=>{
            alertctrl.present();
          });
        },err=>{
          this.alertcontroller.create({
            header: err['msg'].toString(),
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
