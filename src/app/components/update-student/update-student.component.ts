import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{
  formG!:FormGroup
  submitted:boolean=false
  idVal$!:any
  constructor(private fb:FormBuilder,private service:StudentServiceService,private ar:ActivatedRoute,
    private route:Router
  ){
    
  }
  get f(){
    return this.formG.controls
  }
ngOnInit(): void {
  this.idVal$=String(this.ar.snapshot.paramMap.get('id'))
  if(this.idVal$){
     this.service.viewByIdStudent(this.idVal$).subscribe((data)=>{
      this.formG.patchValue(data)
     })
  }
this.formG=this.fb.group({
  name:["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  password:["",[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@]).{8,}$")]],
  email:["",[Validators.required,Validators.email]],
  mobile:["",[Validators.required,Validators.pattern("^[6-9][0-9]{9}$")]],
  dob:["",[Validators.required,this.dateValid]]
})
}
dateValid(control:AbstractControl):ValidationErrors | null{
const datepat=/^\d{4}-\d{2}-\d{2}$/
if(!datepat.test(control.value)){
  return {invalidDate:true}
}
return null
}
updateStudent(){

if(this.formG.valid){
this.service.updateStudent(this.idVal$,this.formG.value).subscribe(()=>{
  alert("update success")
})
}
}
}