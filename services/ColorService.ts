import type { ColorsModel } from "~/models/ColorsModel";

export function createColor(colorData:ColorsModel){
    return $fetch('https://api.sajad.uk/api/v1/color_create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              name:colorData.colorName,
              image:colorData.colorImage,
  
            },
          });
}
export function showColor(){
  return $fetch('https://api.sajad.uk/api/v1/color_show');
}
export function deleteColor(colorId:number){    
  return $fetch(`https://api.sajad.uk/api/v1/color_delete/${colorId}`, {
          method: 'DELETE',
        });
}
export function updateColor(id:number,colorData:ColorsModel){
  return $fetch(`https://api.sajad.uk/api/v1/color_update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            name:colorData.colorName,
            image:colorData.colorImage
          },
        });
}
export function showColorById(id:number){
  return $fetch(`https://api.sajad.uk/api/v1/color_show_by_id/${id}`);
}

export function showColorByName(name:string){
  return $fetch(`https://api.sajad.uk/api/v1/color_show_by_name/${name}`);
}





