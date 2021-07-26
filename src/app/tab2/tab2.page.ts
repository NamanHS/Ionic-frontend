import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  students: any;

  constructor(private studentsService: StudentsService, private alertctrl: AlertController) { }

  ngOnInit() {
    this.studentsService.readAllStudent()
      .subscribe(result=>{
        this.students = result;
      },err=>{
        console.log(err)
      })
  }

  refreshPage() {
    this.studentsService.readAllStudent()
      .subscribe(result=>{
        this.students = result;
      },err=>{
        console.log(err)
      })
   }

  onDelete(student){
    let Id = parseInt(student['studentId'].toString())
    this.studentsService.deleteOneStudent(Id)
      .subscribe(result=>{
        let index = this.students.indexOf(student)
        this.students.splice(index,1)
        this.alertctrl.create({
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
        console.log(err)
        this.alertctrl.create({
          header: err.error['msg'].toString(),
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
    console.log(Id)
  }

}
