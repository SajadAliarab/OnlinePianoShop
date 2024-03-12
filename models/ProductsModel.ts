export interface ProductsModel{
    title:string;
    slug:string;
    price:number|undefined;
    review:number;
    rating:number;
    stock:number|undefined;
    image:string;
    discount:number;
    description:string;
    status:string|undefined;
    brand:number|undefined;
    category:number|undefined;
    colors:Array<number>;
}