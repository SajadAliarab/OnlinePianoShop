import type { SlidesModel } from "~/models/SlidesModel";

export function createSlide(slideData:SlidesModel){
    return $fetch('http://localhost:8000/api/v1/slide_create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              title:slideData.imageTitle,
              link:slideData.imageLink,
              file:slideData.imageFile,
              alt:slideData.imageAlt
            },
          });
}
export function showSlide(){
  return $fetch('http://localhost:8000/api/v1/slide_show');
}

export function deleteSlide(slideId:number){
  return $fetch(`http://localhost:8000/api/v1/slide_delete/${slideId}`, {
          method: 'DELETE',
        });
}

export function updateSlide(id:number,slideData:SlidesModel){
  return $fetch(`http://localhost:8000/api/v1/slide_update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            title:slideData.imageTitle,
            link:slideData.imageLink,
            file:slideData.imageFile,
            alt:slideData.imageAlt
          },
        });
}