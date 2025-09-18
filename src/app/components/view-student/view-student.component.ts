import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Student } from 'src/app/model/student';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  data$:Observable<any[]>=of([])
  finalData$:Observable<any[]>=of([])
  idVal$!:string
  constructor(private service:StudentServiceService,private ar :ActivatedRoute,
    private route:Router)
  {}
  ngOnInit(): void {
    this.idVal$=String(this.ar.snapshot.paramMap.get('id'))
    if(this.idVal$){
      this.deleteStudent(this.idVal$)
    }
    this.getData()
  }
    getData(){
      this.data$=this.service.viewStudent()
      this.finalData$=this.data$
      .pipe(map((d)=>d.sort((a:any,b:any)=>a.name.localeCompare(b.name))));
    }

    searchvalue(e:any){
      const val = e.target.value
      if(!val){
        this.finalData$=this.data$
        return
      }
      else{
        this.finalData$=this.data$
        .pipe(map((student)=>{
          return student.filter((students)=>
           students.username.toString().includes(val) ||
          students.id.toString().includes(val))
        }));
      }
    
    }
    deleteStudent(id:any){
      this.service.deleteByIdStudent(id).subscribe(()=>{
        alert("Deleted!")
        this.route.navigate(['/viewStudent'])
      })
    }

}

