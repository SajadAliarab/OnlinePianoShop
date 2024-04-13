import type { BrandsModel } from "~/models/BrandsModel";


export function createBrand(brandData:BrandsModel){
    return $fetch('https://api.sajad.uk/api/v1/brand_create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              name:brandData.brandName,
              image:brandData.brandImage,
  
            },
          });
}
export function showBrand(){
  return $fetch('https://api.sajad.uk/api/v1/brand_show');
}

export function deleteBrand(brandId:number){
  return $fetch(`https://api.sajad.uk/api/v1/brand_delete/${brandId}`, {
          method: 'DELETE',
        });
}

export function updateBrand(id:number,brandData:BrandsModel){
  return $fetch(`https://api.sajad.uk/api/v1/brand_update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            name:brandData.brandName,
            image:brandData.brandImage
          },
        });
}
export function showBrandById(id:number){
  return $fetch(`https://api.sajad.uk/api/v1/brand_show_by_id/${id}`);
}