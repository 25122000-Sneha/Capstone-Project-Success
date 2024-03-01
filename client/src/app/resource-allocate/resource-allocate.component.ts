import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-resource-allocate',
  templateUrl: './resource-allocate.component.html',
  styleUrls: ['./resource-allocate.component.scss']
})
export class ResourceAllocateComponent implements OnInit {
  itemForm: FormGroup; 
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  resourceList:any=[];
  assignModel: any={};

  showMessage: any;
  responseMessage: any;
  eventList: any=[];
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        quantity: [this.formModel.quantity,[ Validators.required]],
        eventId: [this.formModel.eventId,[ Validators.required]],
        resourceId: [this.formModel.resourceId,[ Validators.required]]
       
    });

   
  }
  ngOnInit(): void {
    this.getResources();
    this.getEvent();    
  }
 
  onSubmit()
  {
      debugger;
      if (this.itemForm.valid) {
        this.showError = false;
        this.httpService.allocateResources(this.itemForm.controls['eventId'].value,this.itemForm.controls['resourceId'].value, this.itemForm.value).subscribe((data: any) => {
          this.itemForm.reset();
          this.showMessage=true;
          this.responseMessage='Save Successfully';
          
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = "An error occurred while logging in. Please try again later.";
          console.error('Login error:', error);
        });;
      } else {
        this.itemForm.markAllAsTouched();
      }
    }
    
    getEvent() {
      this.eventList=[];
      this.httpService.GetAllevents().subscribe((data: any) => {
        this.eventList=data;
        console.log(this.eventList);
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }

  getResources() {
    this.resourceList=[];
    this.httpService.GetAllResources().subscribe((data: any) => {
      this.resourceList=data;
      console.log(this.resourceList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }
  
}
