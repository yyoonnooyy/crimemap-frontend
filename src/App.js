import * as React from 'react';
import './App.css';
import * as firebase from "firebase/app";
import Community from './Components/Community';
import Main from './Components/Main';

import CrimeArea from './Components/Data_CrimeArea';
import CrimeAll from './Components/Data_CrimeAll';
import CrimeMurder from './Components/Data_CrimeMurder';
import CrimeBurglar from './Components/Data_CrimeBurglar';
import CrimeRape from './Components/Data_CrimeRape';
import CrimeTheft from './Components/Data_CrimeTheft';
import CrimeViol from './Components/Data_CrimeViolence';

import Safepath from './Components/Map';
import WriteInfo from './Components/WriteInfo';
import WriteMissing from './Components/WriteMissing';
import Infopost from './Components/Infopost';

import UpdateInfo from './Components/UpdateInfo';

import Login from './Components/Login';
import SignUp from './Components/SignUP';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDNuTxbTsgvORII0g6gOes8e2H2U9iXCJQ",
    authDomain: "crimemap-files.firebaseapp.com",
    projectId: "crimemap-files",
    storageBucket: "crimemap-files.appspot.com",
    messagingSenderId: "201725736606",
    appId: "1:201725736606:web:8bc34ec302d6e67ca6ed8f"
  };

  firebase.initializeApp(firebaseConfig);
  
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Container maxWidth="xl" sx={{ bgcolor: 'white', width: '100%' }}>
                <Toolbar disableGutters>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black', ml: 5, mt:1}}>
                    <img class='main_logo' src='img/logo.png'/>
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
                    <Button component={Link} to="/Data" variant="text" sx={{color:'black', ml: 25, width: 150, display: {fontWeight:'bold'}}} > 메인분석화면 </Button>
                    <Button component={Link} to="/Safepath"variant="text" sx={{color:'black', ml:7, width: 150, display: {fontWeight:'bold'}}} > 지도/경로추천 </Button>
                    <Button component={Link} to="/Community" variant="text" sx={{color:'black', ml:7, mr:5, width: 150, display: {fontWeight:'bold'}}} > 커뮤니티 </Button>
                  </Box>

                  <Button component={Link} to="/Login" variant="contained" sx={{bgcolor: '#474747', mr:1, ml: 12, width: 100}} > 로그인 </Button>
                  <Button component={Link} to="/SignUp" variant="outlined" sx={{color: '#00777d', border: 2, mr:5, width: 110}}>회원가입</Button>
                </Toolbar>
              </Container>
            </AppBar>
          </Box>
        </header>

          <Routes>
            <Route path = "/" element = { <Main /> } />
            <Route path = "/Safepath" element = { <Safepath /> } />
            <Route path = "/Community" element = { <Community /> } />
            <Route path = "/WriteMissing" element = { <WriteMissing /> } />
            <Route path = "/WriteInfo" element = { <WriteInfo /> } />
            <Route path = "/Community/Infopost/:post_num/Update" element = { <UpdateInfo /> } />
            <Route path="/Community/Infopost/:post_num" element = { <Infopost /> }/>

            <Route path = "/Data" element = { <CrimeArea/> } />
            <Route path = "/All" element = { <CrimeAll /> } />
            <Route path = "/One" element = { <CrimeMurder /> } />
            <Route path = "/Two" element = { <CrimeBurglar /> } />
            <Route path = "/Three" element = { <CrimeRape /> } />
            <Route path = "/Four" element = { <CrimeTheft /> } />
            <Route path = "/Five" element = { <CrimeViol /> } />

            <Route path = "/Login" element = { <Login /> } />
            <Route path = "/SignUp" element = { <SignUp /> } />

          </Routes>       

        <footer className="App-footer">
          <p>이용약관, 개인정보처리방침</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
