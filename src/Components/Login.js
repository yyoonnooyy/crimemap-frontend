import * as React from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {KAKAO_AUTH_URL, NAVER_AUTH_URL } from "./OAuth";

function Login(){

  return (
    <div class="product-title">
      <div class="product-img-div">
  	   <div class="product-img">
           <img class="login_logo" src="img/loginLogo.png"/>
           <Box className="login_box" sx={{ width: 550, height: 313, ml:60, mt:3 }}>
             <Button href={KAKAO_AUTH_URL} sx = {{width: 320, height: '7vh'
               ,background: '#FEE500', color: 'black', fontWeight: 'bold'
               ,fontSize: 18, mt: 5}}>
               <img class="kakao_logo" src="img/kakaoLogo.png"/>
               카카오 로그인하기
               </Button>

               <Button href={NAVER_AUTH_URL} sx = {{width: 320, height: '7vh'
                 ,background: '#02C758', color: 'white', fontWeight: 'bold'
                 ,fontSize: 18, mt: 4}}>
                 <img class="kakao_logo" src="img/naverLogo.png"/>
                 네이버 로그인하기
                </Button>

                <Button href={KAKAO_AUTH_URL} sx = {{width: 320, height: '7vh'
                   ,background: '#ffffff', color: 'black', fontWeight: 'bold'
                   ,fontSize: 18, mt: 4}}>
                   <img class="kakao_logo" src="img/kakaoLogo.png"/>
                   구글 로그인하기
                </Button>
           </Box>
       </div>
      </div>
    </div>
 );

}

export default Login;