import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Ipost } from '../../models/posts';
import { SnackBarService } from '../../service/snack-bar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  constructor(private _postService : PostService,
              private _matSnackBar : SnackBarService,
              private _matDialog : MatDialog
  ) { }
  postsArr : Array<Ipost> = []
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this._postService.getAllPost()
      .subscribe({
        next : data =>{
          this.postsArr = data
        },
        error : err =>{
          this._matSnackBar.snackBar(err)
        }
      })
  }

  onOpen(){
    const matConfi = new MatDialogConfig()
    matConfi.disableClose = true;
    matConfi.width = '400px'
    let dailogRef = this._matDialog.open(PostFormComponent, matConfi)
  }

}
