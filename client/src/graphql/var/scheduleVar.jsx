import { makeVar } from '@apollo/client';

export const dataEmployee = makeVar([])
export const config = makeVar({
    licenseKey:
      '====BEGIN LICENSE KEY====\np4VyYwGt6tlYKBoSY58jiAj9wyrDPMHwnVp7K7kEweQRcXE9DlCKNrYMZMvxVd5/nriO3rZmhoBludPEEUdBsXQBJQqVdkGwIt+o6Q+SZc7cSczW6EfVFF3uhef/mqzOHa8h7p2Yaz2onJxpskHl2en5tWKy0xFnjbGCCNPR6SfBtKd/cbKNGq/JriZ7If477PdiLy2j1UYjsCdvUYEr1+66Y8whjnvFlfMvuSmUiQ84ClspMZdy1CL0KD/ps3k3RFCjz3xTvEV26BAbNRelX95aAw9FaHZadkdjkUmx3o+E5HnPNzaqX9NXMK3OEBtwEtwBk1ISF2LuneCFAHnRow==||U2FsdGVkX1+NYY/k8YEgg/IS48SB7CMr6U9yNiqucmqd0TeidIfXqL1NMOfht5G4Xv5F+Vex56WnCwpzoweUQj0+rCzhHO0YfqybrnnGI6U=\njAOWu+LmEMHf/XiydlE5+lX/RlzB/Vk6uG8Od7i2b1qPVnXKP1nh4Y7ZIhj3JwoUHFdzCzEfg62IsxIZ0mmNJnwRPN5HNwB8N5pM96pakcYHSlZHwAmdQQIfW+wLRmkQF6M1/+8Tr6wi6dCnEeDGUzGRxSZp9LvIFznYVq6KjDUwFpY6JIjnYL0gwC5mkaw3x6jzIaOAw5+fNVkb6vn+seTlZAJqSjorTcuUvTalo97WxpBOoX/hL+8G3ok9NsTvhPTO35tb7p+3Jr0I+PlTsQarJPs4X6cAIG9ZYM+BnRO8SPvLKWTILdVS22cvvSOZHIrbJbMjwCpAZb9LKFB3IA==\n====END LICENSE KEY====',
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {
        data: {
          [GSTC.api.GSTCID('id')]: {
            id: GSTC.api.GSTCID('id'),
            width: 60,
            data: ({ row }) => GSTC.api.sourceID(row.id),
            header: {
              content: 'ID',
            },
          },
          name : {
            id: 'name',
            width: 200,
            data: 'label',
            header: {
              content: 'Label',
            },
          },
        },
      },
      rows: [
        {
          id : '1',
          label : 'custo Label'
        },
        {
          id : '2',
          label : 'custo Label 2 '
        },
        {
          id : '3',
          label : 'custo Label 3'
        }
      ],
    },
    chart: {
      items: generateItems(),
    },
})
// const config = {
    
//   };