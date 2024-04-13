import type { UsersModel } from "~/models/UsersModel";

export function updateUser(id:number,userData:UsersModel){
    return $fetch(`https://api.sajad.uk/api/v1/user_update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
                name:userData.name,
                email:userData.email,
                role:userData.role,
                phone:userData.phone,
                country:userData.country,
                city:userData.city,
                postCode:userData.postCode,
                address:userData.address
            },
          });
  }

  export function changePassword(id:number,password:string){
    return $fetch(`https://api.sajad.uk/api/v1/change_password/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
                password:password
            },
          });
  }
  export function deleteUser(id:number){
    return $fetch(`https://api.sajad.uk/api/v1/user_delete/${id}`, {
            method: 'DELETE',
          });
  }
  export function getUsers(){
    return $fetch(`https://api.sajad.uk/api/v1/users_show`, {
            method: 'GET',
          });
  }