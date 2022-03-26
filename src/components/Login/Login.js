import React, { useState, useEffect, useReducer } from 'react';

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

  // const authctx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

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
    props.onLogin( emailState.value, passwordState.value );
  };

  return (
    <Card className={ classes.login }>
      <form onSubmit={ submitHandler }>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={ classes.btn } disabled={ !formIsValid }>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
