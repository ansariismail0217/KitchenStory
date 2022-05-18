import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from '../restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  formValue: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData;
  allRestaurantData:any;
  showAdd:boolean;
  showbtn: boolean;

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name: [''],
      rating: [''],
      price: ['']
    });
    this.getAllData();
  }
  //Now subscribing our data
  addRestro(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.rating = this.formValue.value.rating;
    this.restaurantModelObj.price = this.formValue.value.price;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant records added successfully!");
      this.formValue.reset();
      this.getAllData(); // this will show added data without refreshing the browser
    },
    err=>{
      alert("Something went wrong!");
    }
    )
  }
  //click add restro
  clickAddRestro(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //Get all data to put it inside the form
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData = res;
    })
  }
  //Delete records
  deleteRestro(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restaurant record deleted.");
      this.getAllData(); //quick refresh data
    })
  }
  onEditRestro(data:any){
    this.showAdd=false;
    this.showbtn=true;

    this.restaurantModelObj.id= data.id;

    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['rating'].setValue(data.rating);
    this.formValue.controls['price'].setValue(data.price);
  }
  updateRestro(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.rating = this.formValue.value.rating;
    this.restaurantModelObj.price = this.formValue.value.price;

    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res=>{
      alert("Restaurant record updated!");

      this.formValue.reset();
      this.getAllData(); // this will show added data without refreshing the browser
    })
  }
}
