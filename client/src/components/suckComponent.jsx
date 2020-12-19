import React from 'react'

import {toast} from 'react-toastify'
import { ReactComponent as DevIcon} from '../../public/design-team.svg';
import { TextBlackUnderline} from './text/index'

export default function suckComponent() {
    return (
        <div>
            <TextBlackUnderline fontSize="16px">Developing</TextBlackUnderline>
                <DevIcon style ={{ width: "230px" , height : "250px"}}/>
                <button onClick={()=> toast('Lick lick !')}>click</button>
        </div>
    )
}
