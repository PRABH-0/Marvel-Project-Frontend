import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {

  baseURL:string = "https://localhost:7216/api/MarvelMovies";
  http = inject(HttpClient);
  data:any = '';
  formVisible=false;
  addformVisible=false;
  UpdateId:number=0;
// updateForm: any;
  movie = { Name: '',movieHero:'',releaseDate:'',rating:'' };


  LoadData(){
    this.data = this.http.get(this.baseURL).subscribe((res:any)=>{
      console.log(res);
      this.data = res;
    });
  }
  editMovie(id:number){
    this.formVisible = true;
    this.UpdateId = id ;

  }
  updateMovie(formData:any){
    console.log(formData.value)
    this.data = this.http.put(`${this.baseURL}/${this.UpdateId}`,this.movie).subscribe((res:any)=>{
      console.log(res);
      this.data = res;
    });
  }
  deleteMovie(id:number){
   
    this.data = this.http.delete(`${this.baseURL}/${id}`).subscribe((res:any)=>{
      console.log(res);
      this.data = res;
    });
  }
  Visible(){
    this.addformVisible = true;

  }
  addMovie(){
    this.data = this.http.post(`${this.baseURL}`,this.movie).subscribe((res:any)=>{
      console.log(this.movie);
      this.data = res;
    });
  }
}
