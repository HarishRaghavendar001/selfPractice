import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-view-by-id-student',
  templateUrl: './view-by-id-student.component.html',
  styleUrls: ['./view-by-id-student.component.css']
})
export class ViewByIdStudentComponent implements OnInit{
  stud$!:any
  constructor(private service:StudentServiceService,private ar:ActivatedRoute){}
  ngOnInit(): void {
   this.ar.params.subscribe((pa)=>{
    const d=pa['id']
    this.getById(d)
   })
  }
  getById(id:any){
    this.service.viewByIdStudent(id).subscribe((data)=>{
        this.stud$=data
    })
  }
  
}
