import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarksheetsService {

  private url = "http://localhost:5000/api/marksheets"

  constructor(private httpClient: HttpClient) { }

  createMarksheet(marksheet){
    return this.httpClient.post(this.url,marksheet);
  }
}
