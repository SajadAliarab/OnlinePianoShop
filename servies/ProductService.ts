import type { ProductsModel } from "~/models/ProductsModel";


export function createProduct(productData:ProductsModel){
    return $fetch('http://localhost:8000/api/v1/product_create', {
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