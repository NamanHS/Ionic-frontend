import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private url = 'http://localhost:5000/api/classes'

  constructor(private httpClient: HttpClient) { }

  readClasses(){
    return this.httpClient.get(this.url);
  }

}
