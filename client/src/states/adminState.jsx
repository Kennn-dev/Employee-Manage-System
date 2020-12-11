import {atom} from 'recoil'

export const isAdmin = atom({
    key: 'isAdmin', // unique ID (with respect to other atoms/selectors)
    default: {
       isAuth : false
    }, // default value (aka initial value)
  });
export const adminState = atom({
    key: 'adminState', // unique ID (with respect to other atoms/selectors)
    default: {
        id : "",
        position : "Admin",
        username : ""
    }, // default value (aka initial value)
  });