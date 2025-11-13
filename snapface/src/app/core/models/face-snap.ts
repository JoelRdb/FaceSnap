import { SnapType } from "./snap-type.type";

export class FacesSnaps{

  location?: string; // ? signifie que cet propriété peut etre undefinied, à utiliser par une condition alors là où il sera utilisé

  id: number;
  constructor(public title: string,
            public description : string,
            public imageUrl: string,
            public createdAt: Date,
            public snaps: number) 
            {
               this.id = 0;
            }

   removeSnap(){
      this.snaps--;
   }   
   addSnap(){
      this.snaps++;
   }

   snap(snapType : SnapType){
      if(snapType === 'snap'){
         this.addSnap()
      }else if(snapType === 'unsnap'){
         this.removeSnap();
      }
   }

   setLocation(location: string){
      this.location = location;
   }

   withLocation(location: string) : FacesSnaps{
      this.setLocation(location);
      return this;
   }
}