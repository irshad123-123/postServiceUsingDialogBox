import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { CommonModule } from "@angular/common";
import { MovieDashboardComponent } from './components/movie-dashboard/movie-dashboard.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { GetConfirmComponent } from './components/get-confirm/get-confirm.component';
import { FormsModule } from "@angular/forms";




@NgModule({
    declarations: [
        MovieDashboardComponent,
        MovieCardComponent,
        MovieFormComponent,
        GetConfirmComponent
    ],
    imports: [CommonModule, MaterialModule, FormsModule],
    exports: [MovieDashboardComponent]
})
export class PostModule { }