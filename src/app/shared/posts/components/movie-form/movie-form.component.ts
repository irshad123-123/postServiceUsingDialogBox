import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Imovie } from '../../models/movie';
import { NgForm } from '@angular/forms';
import { UuidService } from 'src/app/shared/service/uuid.service';
import { MoviesService } from '../../services/movies.service';
import { SnackBarService } from 'src/app/shared/service/snack-bar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  isEditMode: boolean = false
  getMsg ! : Imovie
  @ViewChild('formRef') formRef !: NgForm
  constructor(private _dialogRef: DialogRef<MovieFormComponent>,
    private _uuid: UuidService,
    private _movieService: MoviesService,
    private _snackBar : SnackBarService,
    @Inject(MAT_DIALOG_DATA) msg : Imovie
  ) { this.getMsg = msg}

  ngOnInit(): void {
    this.fetchData()
  }
  fetchData(){
   if(this.getMsg){
     this.isEditMode = true
    setTimeout(()=>{
      this.formRef.form.patchValue(this.getMsg)
    },0)
   }
  }
  onClose() {
    this._dialogRef.close()
  }
  onAddMovie(){
    if (this.formRef.valid) {
      let obj = {
        ...this.formRef.value,
        id: this._uuid.uuid()
      }
      this._movieService.addMovies(obj)
        .subscribe({
          next: res => {
            this.formRef.reset()
            this._dialogRef.close()
            this._snackBar.snackBar('The new movie is added successfully!!!')
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }
  onUpdate(){
    if(this.formRef.valid){
      let Updated_Obj : Imovie = {
        ...this.formRef.value,
        id : this.getMsg.id
      }
      // console.log(Updated_Obj);
      this._movieService.updateMovie(Updated_Obj)
        .subscribe({
          next : res =>{
            this._snackBar.snackBar('Movie is updated successfully !!!')
            this.formRef.reset()
            this.isEditMode = false;
            this._dialogRef.close()
          },
          error : err =>{
            this._snackBar.snackBar(err)
          }
        })
      
    }
  }
}
