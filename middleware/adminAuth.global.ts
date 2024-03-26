import { getUserToken } from "~/servies/AuthService";

export default defineNuxtRouteMiddleware(async(to,from)=>{
    if(to.path.startsWith('/admin')){
        if(process.client){
            const token:any=localStorage.getItem('auth-data');
            if(token ==null){
                return navigateTo('/404');
            }
            const userToken=JSON.parse(token);
            const userData:any = await getUserToken(userToken);
            const user=userData.data;


            if(user.role !== 1){
               return navigateTo('/404');
            }
        }
        
    }
});