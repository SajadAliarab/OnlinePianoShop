import type { UsersModel } from "~/models/UsersModel";

export function updateUser(id:number,userData:UsersModel){
    return $fetch(`http://localhost:8000/api/v1/user_update/${id}`, {
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
    return $fetch(`http://localhost:8000/api/v1/change_password/${id}`, {
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
    return $fetch(`http://localhost:8000/api/v1/user_delete/${id}`, {
            method: 'DELETE',
          });
  }