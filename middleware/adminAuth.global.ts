export default defineNuxtRouteMiddleware((to,from)=>{
    if(to.path.startsWith('/admin')){
        if(process.client){
            const userData:any=localStorage.getItem('auth-data');
            const user=JSON.parse(userData);
            if(userData ==null || user.role !== 1){
               return navigateTo('/404');
            }
        }
        
    }
});