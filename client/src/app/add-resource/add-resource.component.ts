import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  itemForm: FormGroup; 
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  resourceList:any=[];
  assignModel: any={};

  showMessage: any;
  responseMessage: any;
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        name: [this.formModel.name,[ Validators.required]],
        type: [this.formModel.type,[ Validators.required]],
        availability: [this.formModel.availability,[ Validators.required]]
       
    });

   
  }
  ngOnInit(): void {
    this.getResources();
    
  }

 
  onSubmit()
  {
      debugger;
      if (this.itemForm.valid) {
        this.showError = false;
        this.httpService.addResource(this.itemForm.value).subscribe((data: any) => {
          this.itemForm.reset();
         this.getResources();
          
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
