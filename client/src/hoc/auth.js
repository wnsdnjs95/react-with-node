import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
  //options
  // 1. null: 아무나 출입이 가능한 페이지
  // 2. true: 로그인한 유저만 출입이 가능한 페이지
  // 3. false: 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    //backend에 요청해 유저의 상태를 확인하는 코드

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
        } //로그인한 상태
        else {
          //관리자 페이지로 들어가려할때
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            //로그인한 상태에서 로그인하려 할때
            if (option === false) props.history.push('/');
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
