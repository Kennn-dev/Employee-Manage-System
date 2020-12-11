import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import { CloseBlackButton } from './buttons/index'
import { TextLight } from './text/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ShowHover = styled.div`
    display : none;
`
const Tab = styled.div`
    background: rgba(4, 4, 4, 0.7);
    backdrop-filter: blur(10px);
    color : #f8f8f8;
    padding : 10px 20px;
    border-radius: 20px;
    position: relative;
    margin-top : 10px;
    transition : transform .6s ease-in-out;
    animation : toast-in-right .7s;

    &:hover ${ShowHover}{
        transition-duration : 0.3s;
        display : flex;
    }

`

const ToastContainer = styled.div`
    position : fixed;
    top : 10px;
    right : 10px;
    box-sizing : border-box;
    z-index : 9;
`

const Toast = (props) => {
    const {toastList} = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);

    return(
        <ToastContainer >
            {
                list.map((toast , i) =>
                <Tab key={i} className={i}>
                    <div className="title" style = {{ display : "block"}}>
                        <TextLight fontWeight ="500" fontSize = "16px" >
                            {toast.title}
                        </TextLight>
                    </div>
                    <div className="content" style = {{
                            width: "300px",
                            display: "inline-block",
                            height:" 50px"
                    }}>
                        <TextLight fontWeight ="300" fontSize = "14px" >
                            {toast.content}
                        </TextLight>
                    </div>
                    <ShowHover>
                        <CloseBlackButton >
                            <FontAwesomeIcon color="#f8f8f8" icon={faTimes} />
                        </CloseBlackButton>  
                    </ShowHover> 
                </Tab>
                )
            }
        </ToastContainer>
    )
}

export default Toast;