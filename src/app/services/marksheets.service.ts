import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarksheetsService {

  private urlToCreateMarksheet = "http://localhost:5000/api/marksheets"
  private urlToReadMarksheetByStudentId = "http://localhost:5000/api/marksheets/student"
  private urlToReadMarksheetByClassId = "http://localhost:5000/api/marksheets/class"

  constructor(private httpClient: HttpClient) { }

  createMarksheet(marksheet){
    return this.httpClient.post(this.urlToCreateMarksheet,marksheet);
  }

  getMarksheetByStudentId(id){
    return this.httpClient.get(`${this.urlToReadMarksheetByStudentId}/${id}`)
  }

  getMarksheetByClassId(id){
    return this.httpClient.get(`${this.urlToReadMarksheetByClassId}/${id}`)
  }
}
