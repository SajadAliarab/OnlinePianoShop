


export function createCategory(categoryName:string){
    return $fetch('https://api.sajad.uk/api/v1/category_create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              name:categoryName,
  
            },
          });
}
export function showCategory(){
  return $fetch('https://api.sajad.uk/api/v1/category_show');
}

export function deleteCategory(categoryId:number){
  return $fetch(`https://api.sajad.uk/api/v1/category_delete/${categoryId}`, {
          method: 'DELETE',
        });
}

export function updateCategory(id:number,categoryName:string){
  return $fetch(`https://api.sajad.uk/api/v1/category_update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            name:categoryName,
          },
        });
}
export function showCategoryById(id:number){
  return $fetch(`https://api.sajad.uk/api/v1/category_show_by_id/${id}`);
}