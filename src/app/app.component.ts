import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent,FormsModule,CommonModule]
})
export class AppComponent {

  constructor(private http:HttpClient){}
  title = 'moviefinder';

  bgMode = "light"

  query = ""

  movieData:any;

  isError=false;
  errorMessage=""

  isLoading = false;
  searchMovie(){
    this.isLoading = true
    const res = this.http.get(`https://www.omdbapi.com/?apikey=1754851&t=${this.query.toLowerCase()}`).subscribe((data:any)=>{
      if(data.Response == "True"){
        this.movieData = data
        this.isError = false
        this.errorMessage = ""
      }else{
        this.isError = true;
        this.errorMessage = data?.Error || "Internal Server Error"
      }
      this.isLoading = false
      console.debug("Response",data)
    })
    
  }

  updateBgMode(){
    if(this.bgMode == 'light'){
      this.bgMode = 'dark'
      document.body.classList.remove("bg-light")
      document.body.classList.add("bg-dark")
    }else{
      this.bgMode = 'light'
      document.body.classList.add("bg-light")
      document.body.classList.remove("bg-dark")
    }
  }
}
