import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostDashboardComponent } from "./shared/component/post-dashboard/post-dashboard.component";
import { MovieDashboardComponent } from "./shared/posts/components/movie-dashboard/movie-dashboard.component";
import { PageNotFoundComponent } from "./shared/component/page-not-found/page-not-found.component";

const appRoutes : Routes =[
     {
        path : '',
        component : MovieDashboardComponent
    },
    {
        path : 'movieModel',
        component : MovieDashboardComponent
    },
    {
        path : 'posts',
        component : PostDashboardComponent
    },
    {
        path : 'page-not-found',
        component : PageNotFoundComponent
    },
    {
        path : '**',
        redirectTo : 'page-Not-found'
    }
]

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : []
})
export class AppRoutingModule{}