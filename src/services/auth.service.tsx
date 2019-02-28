// import { config } from '../static/config';

// import { any } from 'prop-types';

// function login(username: String, password: String){

//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }, 
//         body: JSON.stringify({ username, password })
//     }

//     return fetch(`/user/signin`, requestOptions)
//     .then(response => {
//         if (!response.ok) {
//             alert(response.json());
//         }else{
//             alert(response.json());
//         }
//     })
//     .catch(err => {
//         throw new Error(err)
//     })

// }

// function logout() {
//     // remove login status from browser
//     localStorage.removeItem('isLoggedIn');
// }

// function isLoggedIn(){
//     return localStorage.getItem('isLoggedIn') == 'true';
// }

// export const authService = {
//     login,
//     logout,
//     isLoggedIn
// }