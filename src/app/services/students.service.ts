import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url = 'http://localhost:5000/api/students/'

  constructor(private httpClient: HttpClient) { }

  createStudent(student){
    return this.httpClient.post(this.url,student);
  }

  readAllStudent(){
    return this.httpClient.get(this.url);
  }

  readOneStudent(id){
    return this.httpClient.get(`${this.url}/${id}`);
  }

  updateOneStudent(student,id){
    console.log('-----service')
    id = parseInt(id)
    return this.httpClient.put(`${this.url}/${id}`,student);
  }

  deleteOneStudent(id){
    return this.httpClient.delete(`${this.url}/${id}`)
  }


}
