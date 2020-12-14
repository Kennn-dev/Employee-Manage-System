// import React, {useState} from 'react';
import { Row, Col } from 'reactstrap';
import {
    Link,
    useHistory
} from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useJwt } from 'react-jwt'
import { useCookies } from 'react-cookie'
import { useRecoilState } from 'recoil'
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

//import states
import {adminState} from '../states/adminState'

export default function Login() {
    //global states
    const [admin , setAdmin] = useRecoilState(adminState);
    
    let history = useHistory()
    const [cookies, setCookie] = useCookies(['accessToken']);
    const { register, handleSubmit, errors } = useForm();
    // const { decodedToken } = useJwt(cookies.accessToken);
    // console.log(login)
    
    const LOGIN_ADMIN = gql`
        mutation loginAdmin($username: String! , $password : String!) {
            loginAdmin(username: $username , password : $password) {
                id
                username
                position
                token
            }
        }
    `

    const [loginAdmin , {loading}] = useMutation(LOGIN_ADMIN,{
        credentials: 'include',
      });

    const onSubmit = async dataSubmit => {
        try{
            if(loading) toast('🔃 Loading ...');
            
            const {data} = await loginAdmin({
                variables : 
                {
                    username : dataSubmit.username,
                    password : dataSubmit.password
                }
            })
            //submit data
            //data ? success
            // console.log(data)
           
            if(data) 
            toast('✅ Login successfully');
            //token = cookies.accessToken
            // console.log(decodedToken);
            // console.log(data) = {loginAdmin}
            let newAdmin = data.loginAdmin;
            setAdmin({
                id : newAdmin.id,
                username : newAdmin.username,
                position : newAdmin.position
            })
            // console.log(admin)
            history.push("/dashboard")
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
