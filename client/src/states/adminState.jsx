import {atom} from 'recoil'

// export const isAdmin = atom({
//     key: 'isAdmin', // unique ID (with respect to other atoms/selectors)
//     default: {
//        isAuth : false
//     }, // default value (aka initial value)
//   });
export const loginState = atom({
    keu : 'loginState',
    default : false
})
export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: {
        id : "",
        position : "",
        username : ""
    }, // default value (aka initial value)
  });