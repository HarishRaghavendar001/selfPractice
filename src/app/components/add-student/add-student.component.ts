import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Student } from 'src/app/model/student';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{
    formG!:FormGroup
    submitted:boolean=false
    constructor(private fb:FormBuilder,private service:StudentServiceService){
      
    }
    get f(){
      return this.formG.controls
    }
  ngOnInit(): void {
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
addStudent(){

  if(this.formG.valid){
  this.service.addStudent(this.formG.value).subscribe((d)=>{
    // alert('added')
    console.log("success")
    this.submitted=true
    this.formG.reset()
  })
}
}
}