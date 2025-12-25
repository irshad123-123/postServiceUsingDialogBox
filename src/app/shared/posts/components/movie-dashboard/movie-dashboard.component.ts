import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { MoviesService } from '../../services/movies.service';
import { Imovie } from '../../models/movie';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {

  constructor(private _matDialog : MatDialog,
              private _movieServiec : MoviesService
  ) { }
  moviesArr : Array<Imovie> = []
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this._movieServiec.getAllMovies()
      .subscribe({
        next : res =>{
          this.moviesArr = res
        },
        error : err =>{
          console.log(err); 
        }
      })
  }
  onOpen(){
    const dialogConfi = new MatDialogConfig()
    dialogConfi.width = '500px'
    dialogConfi.maxWidth = '90%'
    dialogConfi.disableClose = true
   let dialogRef = this._matDialog.open(MovieFormComponent, dialogConfi)
  }

}
