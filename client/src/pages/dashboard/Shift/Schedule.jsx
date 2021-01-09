
import React, { useCallback, useEffect } from 'react';

import GSTC from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js';

import 'gantt-schedule-timeline-calendar/dist/style.css';
let gstc, state;

//TODO:  get Rows from DB rows = employees
//TODO:  get Items from DB 
// items[] = {
//   {
//     id: '1',
//     label: 'Item 1', // label : "Ca 1 (6h - 11h)"
//     rowId: '1',
//     time: {
//       start: date('2020-01-01').startOf('day').valueOf(),
//       end: date('2020-01-02').endOf('day').valueOf(),
//     },
//   },
// }

// helper functions




function generateItems() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  // @ts-ignore
  let start = GSTC.api.date().startOf('day').subtract(6, 'day');
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString());
    start = start.add(1, 'day');
    items[id] = {
      id,
      label: `Item ${i}`,
      rowId,
      time: {
        start: start.valueOf(),
        end: start.add(1, 'day').endOf('day').valueOf(),
      },
    };
  }
  return items;
}

function initializeGSTC(element) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */
  const config = {
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
      items: [
        {
          id: '1',
          label: 'Item 1', // label : "Ca 1 (6h - 11h)"
          rowId: '1',
          time: {
            start: (new Date("29/12/2020 00:00:00")).getTime(),
            end: (new Date("30/12/2020 00:00:00")).getTime(),
          },
        },
      ],
    },
  };
  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

const getDataEmployee = () => {

}

function updateFirstRow() {
  state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row) => {
    row.label = 'Changed dynamically';
    return row;
  });
}
export default function Schedule(){
   
    const callback = useCallback((element) => {
        if (element) initializeGSTC(element);
      }, []);
    
      useEffect(() => {
        return () => {
          if (gstc) {
            gstc.destroy();
          }
        };
      });
    
    
      function changeZoomLevel() {
        state.update('config.chart.time.zoom', 21);
      }
    return(
        <>
        <div >
        <div className="toolbox">
            <button onClick={updateFirstRow}>Update first row</button>
            <button onClick={changeZoomLevel}>Change zoom level</button>
        </div>
        <div className="gstc-wrapper" ref={callback}></div>
        </div>
        </>
    )
}
