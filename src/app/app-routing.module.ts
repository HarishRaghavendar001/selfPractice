import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { ViewByIdStudentComponent } from './components/view-by-id-student/view-by-id-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

const routes: Routes = [
  {path:'',redirectTo:"addStudent",pathMatch:'full'},
  {path:"addStudent",component:AddStudentComponent},
  {path:"viewStudent",component:ViewStudentComponent},
  {path:"viewStudent/:id",component:ViewStudentComponent},
  {path:"viewByIdStudent/:id",component:ViewByIdStudentComponent},
  {path:"updateStudent/:id",component:UpdateStudentComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
