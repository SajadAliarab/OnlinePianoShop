import type { ProductsModel } from "~/models/ProductsModel";


export function createProduct(productData:ProductsModel){
    return $fetch('https://api.sajad.uk/api/v1/product_create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              title:productData.title,
              slug:productData.slug,
              price:productData.price,
              reviews:productData.review,
              rating:productData.rating,
              stock:productData.stock,
              image:productData.image,
              discount:productData.discount,
              description:productData.description,
              status:productData.status,
              brand_id:productData.brand,
              category_id:productData.category,
              colors:productData.colors
            },
          });

}
export function showProduct(){
  return $fetch('https://api.sajad.uk/api/v1/product_show');
}
export function deleteProduct(productId:number){
  return $fetch(`https://api.sajad.uk/api/v1/product_delete/${productId}`, {
          method: 'DELETE',
        });
}
export function updateProduct(id:number,productData:ProductsModel){
  return $fetch(`https://api.sajad.uk/api/v1/product_update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            title:productData.title,
            slug:productData.slug,
            price:productData.price,
            reviews:productData.review,
            rating:productData.rating,
            stock:productData.stock,
            image:productData.image,
            discount:productData.discount,
            description:productData.description,
            status:productData.status,
            brand_id:productData.brand,
            category_id:productData.category,
            colors:productData.colors
          },
        });
}
export function showProductBySlug(slug:string){
  return $fetch(`https://api.sajad.uk/api/v1/product_show_by_slug/${slug}`);
}

export function showProductById(id:number){
  return $fetch(`https://api.sajad.uk/api/v1/product_show_by_id/${id}`);
}

export function updateProductStock(id:number,stock:number){
  return $fetch(`https://api.sajad.uk/api/v1/product_update_stock/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            stock:stock
          },
        });
}