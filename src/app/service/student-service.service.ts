import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  apiUrl:string="https://ec2-13-127-126-129.projects.wecreateproblems.com/proxy/5000/studentData"

  constructor(private httpCall:HttpClient) { }
  addStudent(std:Student):Observable<any>{
     return this.httpCall.post(this.apiUrl,std)
  }
  // viewStudent():Observable<Student[]>{
  //   return this.httpCall.get<Student[]>(this.apiUrl)
  // }
  viewByIdStudent(id:Student):Observable<any>{
    return this.httpCall.get(this.apiUrl+"/"+id)
  }
  deleteByIdStudent(id:Student):Observable<any>{
    return this.httpCall.delete(this.apiUrl+"/"+id)
  }
  updateStudent(id:any,std:Student):Observable<any>{
    return this.httpCall.put(this.apiUrl+"/"+id,std)
  }
  viewStudent():Observable<Student[]>{
    return this.httpCall.get<Student[]>(this.apiUrl).pipe(
      map((data:any)=>{
        if(Array.isArray(data)){
          return data
        }
        else{
          return [data]
        }
      })
    )
  }
}
