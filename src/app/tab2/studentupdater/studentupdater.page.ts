import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClassesService } from 'src/app/services/classes.service';
import { StudentsService } from 'src/app/services/students.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-studentupdater',
  templateUrl: './studentupdater.page.html',
  styleUrls: ['./studentupdater.page.scss'],
})
export class StudentupdaterPage implements OnInit {
  studentId: any;
  studentToUpdate: any;
  classes
  formwithIntialValue
  initialStudent

  form = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern('[- +()0-9]{10,15}')]),
    emailId: new FormControl('',[Validators.required,Validators.email]),
    classId: new FormControl('',[Validators.required])
  });

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentsService, private alertctrl: AlertController,private classesService: ClassesService) {

    this.studentId = 'Loading...';

    this.classesService.readClasses()
      .subscribe(result=>{
        this.classes = result
      },err=>{
        console.log(err)
      })

  }

  ngOnInit() {

    this.activatedRoute.paramMap
      .subscribe(paramMap=>{
        let id: any
        id = paramMap.get('id')
        this.studentId = id
        id = parseInt(id.toString())
          this.studentService.readOneStudent(id)
            .subscribe(res=>{
              this.form.get('firstName').setValue(res[0].firstName)
              this.form.get('lastName').setValue(res[0].lastName)
              this.form.get('emailId').setValue(res[0].emailId)
              this.form.get('phoneNumber').setValue(res[0].phoneNumber)
              this.form.get('classId').setValue(res[0].classId)

              this.initialStudent = {
                firstName: res[0].firstName.toString(),
                lastName: res[0].lastName.toString(),
                emailId: res[0].emailId.toString(),
                phoneNumber: res[0].phoneNumber.toString(),
                classId : parseInt(res[0].classId.toString())
              }
            })
      })
  }

  onSubmit(){
    let alerter;

    console.log(this.form)
    if(this.form.invalid){

      if(this.form.pristine){
        alerter = 'Please fill all the details';
      }

      else if(this.form.get('firstName').invalid){
        if(this.form.get('firstName').errors.required){
          alerter = 'Enter First Name';
        }else if(this.form.get('firstName').errors.minlength || this.form.get('firstName').errors.maxlength){
          alerter = 'First Name must be between 3 - 20 characters long';
        }
      }

      else if(this.form.get('lastName').invalid){
        if(this.form.get('lastName').errors.required){
          alerter = 'Enter Last Name';
        }else if(this.form.get('lastName').errors.minlength || this.form.get('lastName').errors.maxlength){
          alerter = 'Last Name must be between 3 - 20 characters long';
        }
      }

      else if(this.form.get('phoneNumber').invalid){
        if(this.form.get('phoneNumber').errors.required){
          alerter = 'Enter Phone Number';
        }else if(this.form.get('phoneNumber').errors.pattern){
          alerter = 'Phone number must be between 10 - 15 Numbers';
        }
      }

      else if(this.form.get('emailId').invalid){
        if(this.form.get('emailId').errors.required){
          alerter = 'Enter E-mail Id';
        }else if(this.form.get('emailId').errors.email){
          alerter = 'Please enter valid E-mail Id';
        }
      }

      else if(this.form.get('classId').invalid){
        if(this.form.get('classId').errors.required){
          alerter = 'Select class';
        }else{
          alerter = 'unexpected error'
        }
        }

        this.alertctrl.create({
          header: alerter,
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

      if(this.form.valid){

        this.studentToUpdate = {
        firstName: this.form.get('firstName').value.toString(),
        lastName: this.form.get('lastName').value.toString(),
        phoneNumber: this.form.get('phoneNumber').value.toString(),
        emailId: this.form.get('emailId').value.toString(),
        classId: parseInt(this.form.get('classId').value.toString())
      }

      if(this.isChanged(this.studentToUpdate)){ //----------------------CHECK IF ATLEAST ONE FIELD VALUE CHANGED OR NOT

        console.log(this.studentToUpdate)

        this.studentService.updateOneStudent(this.studentToUpdate,this.studentId)
        .subscribe((resp)=>{
          console.log(resp)
          this.alertctrl.create({
            header: resp['msg'].toString(),
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
          console.log(err)
          this.alertctrl.create({
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
      }else{
        this.alertctrl.create({
          header: 'No Changes Detected',  //---------------IF NO CHANGES
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

  isChanged(newstudent){   //----------------------------CHECK CHANGES
    console.log(newstudent)
    console.log(this.initialStudent)
    for(let key in this.initialStudent){
      if(newstudent[key] !== this.initialStudent[key]) return true;
    }
    return false;
  }


}
