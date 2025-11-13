import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaceSnapList } from "./components/face-snap-list/face-snap-list";
import { NewFaceSnap } from "./components/new-face-snap/new-face-snap";
import { SingleFaceSnap } from "./components/single-face-snap/single-face-snap";
import { AuthGuard } from "../core/guards/auth.guard";


export const routes: Routes = [ // Ordre des routes important, car Angular traverse le tableau de Routes dans l'ordre et applique la première qui ressemble à la route demandée
    { path : 'create', component: NewFaceSnap, canActivate: [AuthGuard]}, 
    { path : ':id', component: SingleFaceSnap, canActivate: [AuthGuard]}, // équivaut à facesnaps/:id car on l'a mis dans le root parent (app.routes.ts)
    { path: '', component: FaceSnapList, canActivate: [AuthGuard]},  //équivaut à facesnaps car on l'a mis dans le root parent (app.routes.ts)
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class FaceSnapsRoutingModule {
    
}