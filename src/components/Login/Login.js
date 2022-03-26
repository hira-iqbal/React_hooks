import React, { useState, useEffect, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {

  if(action.type === 'User_Input'){
    return{ value: action.val, isValid: action.val.includes('@') };
  }

  if(action.type === 'Input_Blur'){
    return{ value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false }
};

const passwordReducer = (state, action) => {

  if(action.type === 'User_Input'){
    return{ value: action.val, isValid: action.val.trim().length > 6 };
  }

  if(action.type === 'Input_Blur'){
    return{ value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: '', isValid: false }
};




  const [emailState, dispatchEmail] = useReducer((emailReducer) , { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer((passwordReducer) , { value: '', isValid: null });



  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;


   const emailInputRef = useRef();
   const passwordInputRef = useRef();

  useEffect(() => {
    console.log('Effect executed')

    return () => {
      console.log('Effect cleaning')
    }
  }, [passwordIsValid]);

  useEffect(() => {
    const Identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('Effect Clean up!');
      clearTimeout(Identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'User_Input', val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'User_Input', val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'Input_Blur' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'Input_Blur' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      props.onLogin(emailState.value, passwordState.value);
    }
    else if (!emailIsValid){
      emailInputRef.current.focus();
    }
    else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={ classes.login }>
      <form onSubmit={ submitHandler }>
        <Input
          ref={ emailInputRef }
          id="email"
          label="E-mail"
          type="email"
          isValid={ emailIsValid }
          value={ emailState.value }
          onChange={ emailChangeHandler }
          onBlur={ validateEmailHandler }
        />
        <Input
          ref={ passwordInputRef }
          id="password"
          label="Password"
          type="password"
          isValid={ passwordIsValid }
          value={ passwordState.value }
          onChange={ passwordChangeHandler }
          onBlur={ validatePasswordHandler }
        />

          <Button type="submit" className={ classes.btn }>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
