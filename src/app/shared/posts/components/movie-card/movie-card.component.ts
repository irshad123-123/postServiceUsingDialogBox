import { Component, Input, OnInit } from '@angular/core';
import { Imovie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { SnackBarService } from 'src/app/shared/service/snack-bar.service';
import { MovieFormComponent } from '../movie-form/movie-form.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input()movieObj ! : Imovie
  constructor(private _movieService : MoviesService,
              private _matDailog : MatDialog,
              private _snackBar : SnackBarService
  ) { }

  ngOnInit(): void {
  }
  onRemove(){
    const dialogConfi = new MatDialogConfig()
    dialogConfi.disableClose = true;
    dialogConfi.data = `Are you sure, you want to remove this <strong>${this.movieObj.name}</strong> movie?`
    let dialogRef = this._matDailog.open(GetConfirmComponent,dialogConfi)
    dialogRef.afterClosed()
      .subscribe({
        next : res =>{
          if(res){
            this._movieService.removeMovie(this.movieObj)
            this._snackBar.snackBar('The movie is removed successfully!!!')
          }
        },
        error : err =>{
          this._snackBar.snackBar(err)
        }
      })
  }
  onEdit(){
    const dailogConf = new MatDialogConfig()
    dailogConf.width = '500px'
    dailogConf.maxWidth = '90%'
    dailogConf.disableClose = true;
    dailogConf.data = this.movieObj
    let dailogRef = this._matDailog.open(MovieFormComponent, dailogConf)
  }

}
