import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ClassesService } from '../services/classes.service';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  student;
  classes;


  form = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern('[- +()0-9]{10,15}')]),
    emailId: new FormControl('',[Validators.required,Validators.email]),
    classId: new FormControl('',[Validators.required])
  });

  constructor(private alertctrl: AlertController, private studentsService: StudentsService, private classesService: ClassesService) { }

  ngOnInit() {

    this.classesService.readClasses()
      .subscribe(result=>{
        this.classes = result
      },err=>{
        console.log(err)
      })

  }

  onSubmit(){
    console.log(this.form)
    let alerter;
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
        this.student = {
        firstName: this.form.get('firstName').value.toString(),
        lastName: this.form.get('lastName').value.toString(),
        phoneNumber: this.form.get('phoneNumber').value.toString(),
        emailId: this.form.get('emailId').value.toString(),
        classId: parseInt(this.form.get('classId').value.toString())
      }

      console.log(this.student)

      this.studentsService.createStudent(this.student)
      .subscribe((resp)=>{
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
          header: err,
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
