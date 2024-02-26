import type { RegisterUser } from "~/models/auth/RegisterModel";

export function RegisterUser(userData:RegisterUser){

          return $fetch('http://localhost:8000/api/v1/insert_user', {
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