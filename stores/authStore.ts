export const useAuthStore = defineStore('auth',()=>{
const loginResult=ref(null);
const currentUser=ref(null);
const loading=ref(false);
const token=ref(null);
const isLogin = computed(()=>loginResult.value!=null);

const setCurrentUserValue = () => {
    const userData:any= localStorage.getItem('auth-data');
    if (userData) {
      loading.value = true;
      loginResult.value = JSON.parse(userData);
      token.value=userData.token;
      currentUser.value= userData.user;
    }

}
return {loginResult,currentUser,loading,token,isLogin,setCurrentUserValue}
});