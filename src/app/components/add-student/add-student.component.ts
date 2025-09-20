import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { group } from 'console';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  formG!: FormGroup;
  submitted: boolean = false;
  edit: boolean = false;
  idVal$!: any;

  constructor(
    private fb: FormBuilder,
    private service: StudentServiceService,
    private ar: ActivatedRoute,
    private route: Router
  ) {}

  get f() {
    return this.formG.controls;
  }

  ngOnInit(): void {
    // Initialize form
    this.formG = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ["", [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@]).{8,}$")]],
      email: ["", [Validators.required, Validators.email,this.uniqueEmail]],
      mobile: ["", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      dob: ["", [Validators.required, this.dateValid]],
      start:["",[Validators.required,this.dateValid]],
      end:["",[Validators.required,this.dateValid]]
    },{validators:this.dateRangeCheck}) ;

  
    this.idVal$ = this.ar.snapshot.paramMap.get('id') || '';
    this.edit = !!this.idVal$;

    if (this.edit) {
      this.service.viewByIdStudent(this.idVal$).subscribe((data) => {
        console.log(data)
        if (data) {
          this.formG.patchValue({
            name: data.name,
            password: data.password,
            email: data.email,
            mobile: data.mobile,
            dob: data.dob
          });
        }
      });
    }
  }
  dateRangeCheck(group: FormGroup): ValidationErrors | null {
    const startD = group.get('start')?.value;
    const endD = group.get('end')?.value;
    if (startD && endD) {
      const startDate = new Date(startD);
      const endDate = new Date(endD);
      if (endDate < startDate) {
        return { rangeCheck: true };
      }
    }
    return null;
  }
  
  
  

  dateValid(control: AbstractControl): ValidationErrors | null {
    const datepat = /^\d{4}-\d{2}-\d{2}$/;
    if (!datepat.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
  }
  uniqueEmail(control: AbstractControl): ValidationErrors | null {
    const studEmail = control.value;
    let value = JSON.parse(localStorage.getItem('studentarray') || '[]');
    console.log(value);
    if (Array.isArray(value)) {
      const emails = value.map((d: any) => d.email);
      console.log(emails)
      if (emails.includes(studEmail)) {
        return { duplicateEmail: true };
      }
    }
    return null;
  }
  

  addStudent(): void {
    if (this.formG.invalid) return;

    if (this.edit) {
      this.service.updateStudent(this.idVal$, this.formG.value).subscribe(() => {
        alert("Update successful");
        this.route.navigate(['/viewStudent']);
      });
    } else {
      this.service.addStudent(this.formG.value).subscribe((d) => {
        // console.log("Student added successfully");
        this.submitted = true;
        this.idVal$ = d.id;
        this.formG.reset();
      });
    }
  }
}
