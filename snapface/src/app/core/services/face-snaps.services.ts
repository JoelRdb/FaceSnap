import { Injectable } from "@angular/core";
import { FacesSnaps } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn : 'root' // enregister ce service à la racine de l'application, pour avoir une seule instance de ce service
})
export class FaceSnapsService { // Pour centraliser les interactions aves les données


  constructor(private http: HttpClient) {}
  
    getAllFaceSnaps(): Observable<FacesSnaps[]>{
      return this.http.get<FacesSnaps[]>('http://localhost:3000/facesnaps');
    }



    getFaceSnapById(faceSnapId: number) : Observable<FacesSnaps>{
      return this.http.get<FacesSnaps>(`http://localhost:3000/facesnaps/${faceSnapId}`)
    }

    
    snapFaceSnapById(faceSnapId: number, snapType : SnapType) : Observable<FacesSnaps>{
      return this.getFaceSnapById(faceSnapId).pipe(
        map(faceSnap => ({
          ...faceSnap,
          snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
        })),
        switchMap(updatedFaceSnap => this.http.put<FacesSnaps>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
      );
    }


    addFaceSnap(formValue: {title: string, description: string, imageUrl: string, location?: string }): Observable<FacesSnaps> {    
     return this.getAllFaceSnaps().pipe(
      map(facesSnaps => [...facesSnaps].sort((a, b) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length -1]),
      map(previousFacesnap => ({
        ...formValue,
        snaps:0,
        createdDate : new Date(),
        id: previousFacesnap.id + 1
      })),
      switchMap(newFaceSnap => this.http.post<FacesSnaps>('http://localhost:3000/facesnaps', newFaceSnap))
     );
    }
}