import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../service/post.service';
import { NgForm } from '@angular/forms';
import { Ipost } from '../../models/posts';
import { UuidService } from '../../service/uuid.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isEditMode: boolean = false
  data !: Ipost
  @ViewChild('formRef') formRef !: NgForm
  constructor(private _matDialogRef: DialogRef<PostFormComponent>,
    private _postService: PostService,
    private _uuid: UuidService,
    private _snackBar : SnackBarService,
    @Inject(MAT_DIALOG_DATA) getPost: Ipost
  ) {
    this.data = getPost
  }

  ngOnInit(): void {
    this.patchData()
  }
  patchData() {
    if(this.data){
          this.isEditMode = true
    setTimeout(() => {
      // console.log(this.data);
      this.formRef.form.patchValue(this.data)
    }, 0)
    }
  }
  onClose(flag: boolean) {
    this._matDialogRef.close()
  }

  onAddPost() {
    if (this.formRef.valid) {
      let obj: Ipost = {
        ...this.formRef.value,
        id: this._uuid.uuid()
      }
      console.log(obj);
      this._postService.addPost(obj)
      this.formRef.reset()
      this._matDialogRef.close()
      this._snackBar.snackBar('The new post is added successfully !!!')
    }
  }
  onUpdate(){
    if(this.formRef.valid){
      let Updated_Obj = {
      ...this.formRef.value,
      id : this.data.id
    }
    
    this._postService.updatePost(Updated_Obj)
    .subscribe({
      next : res =>{
        this._snackBar.snackBar('The post card is updated successfully !!!')
        this.formRef.reset()
        this.isEditMode = false;
          this._matDialogRef.close()
        },
        error : err =>{
          this._snackBar.snackBar(err)
        }
      })
    }
  }
}
