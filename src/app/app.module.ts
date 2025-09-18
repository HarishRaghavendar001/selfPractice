import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from './components/add-student/add-student.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { ViewByIdStudentComponent } from './components/view-by-id-student/view-by-id-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
// import { UpdateStudentComponent } from './update-student/update-student.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ViewStudentComponent,
    ViewByIdStudentComponent,
    UpdateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
