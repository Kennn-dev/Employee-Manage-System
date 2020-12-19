// import React, {useState} from 'react';
import { Row, Col } from 'reactstrap';
import {
    Link,
    useHistory
} from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
// import { useJwt } from 'react-jwt'
import ReactLoading from 'react-loading';
import '../custom.css'

//import components
import Image from '../public/img.jpg'
import {
    FormLogin,
    ContainerMiddle,
    TitleH1,
    BigImage,
    InputItems,
    CustomInput
} from '../components/login'
import { 
    PrimaryButton,
    SecondaryButton,
 } from "../components/buttons";
import { 
    TextBlack,
    TextLight,
    TextBlackHover,
    TextError
 } from "../components/text";
import Cookies from 'js-cookie'

//gql
import {LOGIN} from '../graphql/mutation/index'

//import states
import {auth} from '../graphql/var/authVar'
import {user} from '../graphql/var/userVar'

export default function Login() {
    //global states
   
    let history = useHistory()
    const { register, handleSubmit, errors } = useForm();
    const [loginUser , {loading}] = useMutation(LOGIN,{
        credentials: 'include',
      });

    const onSubmit = async dataSubmit => {
        try{
            const {data} = await loginUser({
                variables : 
                {
                    username : dataSubmit.username,
                    password : dataSubmit.password
                }
            })
   
            if(data) {
                const dataUser = await data.loginUser;
                // console.log(dataUser)
                Cookies.set('accessToken',dataUser.token,{expires : 15})
                user({
                    id : dataUser.id,
                    position : dataUser.position,
                    username : dataUser.username
                })
                auth(true)
                // console.log(admin)--------
                history.push("/dashboard")
                toast('✅ Login successfully');
            }
        }catch(err){
            toast(`⛔ ${err.message}`);
        }
            
    };
    return (    
        <div>
            <FormLogin onSubmit={handleSubmit(onSubmit)} >
            <Row lg="2">
                <Col>
                <ContainerMiddle>
                    <TitleH1 >Login </TitleH1>
                    {loading ? <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} /> : ""}
                    <TextBlack fontWeight ="300" fontSize = "14px" >Start manage your team</TextBlack>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Username</TextBlack>
                        <CustomInput  name="username" height = "40px" placeholder="Username ..." ref={register({ required: true })} />
                        {errors.username && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Password</TextBlack>
                        <CustomInput  name="password" type="password"  height = "40px" placeholder="Password ..." ref={register({ required: true })} />
                        {errors.password && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlackHover fontWeight ="500" fontSize = "14px">Fogot Password ?</TextBlackHover>
                    </InputItems>
                    <InputItems>
                    <Row>
                        <Col lg="8">
                            <PrimaryButton type="submit"> 
                                <TextLight fontWeight = "500" fontSize="14px">Log In</TextLight> 
                            </PrimaryButton>
                        </Col>
                        
                        <Col lg="4">
                            <Link to='/register'>
                                <SecondaryButton>
                                    <TextBlack fontWeight = "300" fontSize="14px">
                                        Sign Up
                                    </TextBlack>
                                </SecondaryButton>
                            </Link>
                        </Col>
                    </Row>
                    </InputItems>
                </ContainerMiddle>
                </Col>
                <Col>
                    <BigImage url={Image} ></BigImage>
                </Col>
            </Row>
            </FormLogin>
        </div>
    )
}
