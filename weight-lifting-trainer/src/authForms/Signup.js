import React, { useState, useEffect } from 'react';
import { useForm  } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { axiosWithAuth } from '../axiosWithAuth';
import axios from 'axios';
import yup from 'yup';

import { Button } from 'reactstrap';
//local

// const schema = yup.object().shape({
//     username: yup.string().required(),

// })

const CreateAccount = (props) => {
    const [userCredentials, setUserCredentials] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = async data => {
        if (data.password === data.confirmPassword) {
            setUserCredentials({
                'username': data.username,
                'password': data.password,
                'email': data.email,
                'name': data.name,
                'avatar': data.avatar
            })
        }
    };
    useEffect(() => {
        //axiosWithAuth()
        axios
            .post("/users/register", userCredentials)
            .then(response => {
                console.log("create account response", response.data);
            })
            .catch(error => console.log(error));
    }, [userCredentials]);
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
        <input type="text" id="name" placeholder="Full name" name="name" ref={register({maxLength: 30})} />
        <input type="text" id="username" placeholder="Username" name="username" ref={register({required: true, maxLength: 15})}/>
        {errors.username && 'A username is required'}
        <input type="password" id="password" placeholder="Password" name="password" ref={register({required: true, minLength: 4})}/>
        <input type="password" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" ref={register({required: true, minLength: 4})}/>
        <input type="email" id="email" placeholder="Email" name="email" ref={register({required: true, pattern: /^\S+@\S+$/i, message: "An email address is required"})}/>
        <input type="text" id="avatar" placeholder="Profile Picture" name="avatar" ref={register} />
  
        <Button type="submit">Create Account</Button>

        <h3> Already have  an account?</h3>
        <h3> <Link exact to="/Login">
          <SignUp>Login</SignUp>
        </Link></h3>
      </form>
    );
  }


//styles
const SignUp = styled.button`  
    background-color: white;
    color: #00A35E; 
    padding: 0.5%;
    font-weight: bold;
    font-family: Roboto;
    font-size: 16px;
    border-radius: 5px;
`
const StyledButton = styled.button`
    background-color: #00A35E; 
    color:white;
    padding: 0.5%;
    font-weight: bold;
    font-family: Roboto;
    font-size: 16px;
    border-radius: 5px;
   `

const StyledLink = styled(Link)`
   color:white;
    :hover & {
        text-decoration:none;
    }
`;
export default CreateAccount;