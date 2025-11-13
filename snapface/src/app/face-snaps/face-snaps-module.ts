import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceSnap } from './components/face-snap/face-snap';
import { SingleFaceSnap } from './components/single-face-snap/single-face-snap';
import { NewFaceSnap } from './components/new-face-snap/new-face-snap';
import { FaceSnapList } from './components/face-snap-list/face-snap-list';
import { FaceSnapsRoutingModule } from './face-snaps-routing.module';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FaceSnap,
    SingleFaceSnap,
    NewFaceSnap,
    FaceSnapList,
    FaceSnapsRoutingModule
  ],
  exports: [
    FaceSnap,
    SingleFaceSnap,
    NewFaceSnap,
    FaceSnapList
  ]
})
export class FaceSnapsModule { }
