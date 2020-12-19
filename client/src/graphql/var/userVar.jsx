import { makeVar } from '@apollo/client';

export const user = makeVar({
    id : '',
    username : '',
    position : '',
})