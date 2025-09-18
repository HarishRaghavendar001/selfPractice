import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  apiUrl:string="https://ec2-43-205-231-188.projects.wecreateproblems.com/proxy/5000/studentData"

  constructor(private httpCall:HttpClient) { }
  addStudent(std:Student):Observable<any>{
     return this.httpCall.post(this.apiUrl,std)
  }
  viewStudent():Observable<any>{
    return this.httpCall.get(this.apiUrl)
  }
  viewByIdStudent(id:Student):Observable<any>{
    return this.httpCall.get(this.apiUrl+"/"+id)
  }
  deleteByIdStudent(id:Student):Observable<any>{
    return this.httpCall.delete(this.apiUrl+"/"+id)
  }
  updateStudent(id:any,std:Student):Observable<any>{
    return this.httpCall.put(this.apiUrl+"/"+id,std)
  }
}
