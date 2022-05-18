import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Item {
  id:number;
  name:string;
  rating: string;
  price: string;
}

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  searchItem='';
  items: Item[]=[];
  term='';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Item[]>("http://localhost:3000/posts").subscribe((data: Item[])=>{
      this.items=data;
    });
  }
  
}
