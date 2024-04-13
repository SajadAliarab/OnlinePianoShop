import type { RegisterUser } from "~/models/auth/RegisterModel";

export function RegisterUser(userData:RegisterUser){

          return $fetch('https://api.sajad.uk/api/v1/register_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              name:userData.name,
              email: userData.email,
              password: userData.password,
            },
          });
}
export function LoginUser($email:string,$password:string){

  return $fetch('https://api.sajad.uk/api/v1/login_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: $email,
      password:$password,
    },
  });
}
export function getUserData(id:number){

  return $fetch(`https://api.sajad.uk/api/v1/user_show_by_id/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function logOutUser(token:string){
  
    return $fetch(`https://api.sajad.uk/api/v1/user_token_logout/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
    });

}
export function getUserToken(token:string){

  return $fetch(`https://api.sajad.uk/api/v1/user_token/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
  });

}