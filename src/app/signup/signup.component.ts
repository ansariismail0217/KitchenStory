import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: ['']
    })
  }

  // sign up method for creating a user
  signUp() {
    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe((res:any) => {
      alert("Signed up successfully!");
      this.signupForm.reset();
      this.router.navigate(['login'])
    }, err => {
      alert("Something went wrong! Please try again.")
    })
  }

}
