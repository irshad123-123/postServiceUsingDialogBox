import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';


let marArr = [MatButtonModule,MatIconModule,MatDialogModule,MatSnackBarModule,MatCardModule,MatDividerModule]

@NgModule({
    imports : [...marArr],
    exports : [...marArr]
})
export class MaterialModule{}