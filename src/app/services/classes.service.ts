import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private fetchClasses = 'http://localhost:5000/api/classes'
  private fetchSubjects = "http://localhost:5000/api/classes/getsubjects"

  constructor(private httpClient: HttpClient) { }

  readClasses(){
    return this.httpClient.get(this.fetchClasses);
  }

  readSubjectsOfStudent(studentId){
    return this.httpClient.get(`${this.fetchSubjects}/${studentId}`);
  }

}
