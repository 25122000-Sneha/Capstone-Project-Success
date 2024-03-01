import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  itemForm: FormGroup; 
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  eventList:any=[];
  assignModel: any={};

  showMessage: any;
  responseMessage: any;
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        title: [this.formModel.title,[ Validators.required]],
        description: [this.formModel.description,[ Validators.required]],
        dateTime: [this.formModel.dateTime,[ Validators.required]],
        location: [this.formModel.location,[ Validators.required]], 
        status: [this.formModel.status,[ Validators.required]], 
       
    });

   
  }
  ngOnInit(): void {

    this.getEvent();
  }
  getEvent() {
    this.eventList=[];
    this.httpService.GetAllevents().subscribe((data: any) => {
      this.eventList=data;
      console.log(this.eventList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred.. Please try again later.";
      console.error('Login error:', error);
    });;
  }

 
  onSubmit()
  {
    if(this.itemForm.valid)
    {
      if (this.itemForm.valid) {
        this.showError = false;
        this.httpService.createEvent(this.itemForm.value).subscribe((data: any) => {
          this.itemForm.reset();
          this.getEvent();
          
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = "An error occurred while created in. Please try again later.";
          console.error('Login error:', error);
        });;
      } else {
        this.itemForm.markAllAsTouched();
      }
    }
    else{
      this.itemForm.markAllAsTouched();
    }
  }

  
}
