import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../models/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { PostService } from '../../service/post.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() postObj ! : Ipost
  constructor(private _matDialog : MatDialog,
            private _postService : PostService,
            private _snackBar : SnackBarService
  ) { }

  ngOnInit(): void {
  }
  onRemove(obj : Ipost){
    let matConfi = new MatDialogConfig()
    matConfi.disableClose = true
   let matDialogRef = this._matDialog.open(GetConfirmComponent, matConfi)
   matDialogRef.afterClosed()
    .subscribe({
      next : res =>{
        if(res){
          this._postService.removePost(obj)
            .subscribe({
              next : res =>{
                this._snackBar.snackBar('The post card is removed successfully !!!')
              },
              error : err =>{
                this._snackBar.snackBar(err)
              }
            })
        }
      }
    })
  }
  onEdit(obj : Ipost){
    const dialogConfi = new MatDialogConfig()
    dialogConfi.disableClose = true;
    dialogConfi.width = '400px'
    dialogConfi.data = obj
    this._matDialog.open(PostFormComponent, dialogConfi)
  }
}
