import * as React from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignUP() {

  return (
    <div class="product-title">
      <div class="product-img-div">
  	   <div class="product-img2">
           <img class="sign_logo" src="img/SignUpLogo.png"/>
             <Box className="login_box" sx={{ width: 550, height: 650, ml:60, mt:3 }}>

              <div><TextField id="standard-basic"
                label="이메일" variant="filled" sx={{width:450, mt: 9, color:'white'}} />
              </div>
              <div><TextField id="standard-basic"
                label="비밀번호" variant="filled" sx={{width:450, mt: 5}} />
              </div>
              <div><TextField id="standard-basic"
                label="비밀번호 확인" variant="filled" sx={{width:450, mt: 5}} />
              </div>
              <div><TextField id="standard-basic"
                label="이름" variant="filled" sx={{width:450, mt: 5}} />
              </div>
              <div><TextField id="standard-basic"
                label="전화번호" variant="filled" sx={{width:450, mt: 5}} />
              </div>
              <div><Button variant="outlined"
                sx={{width: 150, height: 50, mt:4, color: '#00F2FF',
                  display: {fontWeight:'bold'}}}>회원가입</Button>
              </div>
              
             </Box>
       </div>
      </div>
    </div>
  );

}

export default SignUP;