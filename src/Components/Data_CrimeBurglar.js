import * as React from 'react';
import '../App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";

function Data_CrimeBurglar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
  	const open = Boolean(anchorEl);
  	const handleClick = (event) => {
    	setAnchorEl(event.currentTarget);
  	};
  	const handleClose = () => {
	    setAnchorEl(null);
	 };

	const [anchorEl2, setAnchorEl2] = React.useState(null);
  	const open2 = Boolean(anchorEl2);
  	const handleClick2 = (event) => {
    	setAnchorEl2(event.currentTarget);
  	};
  	const handleClose2 = () => {
    	setAnchorEl2(null);
  	};

  	const [change, setChange] = useState(false);
	return(
		<div className="App">
			<header>
   				<Box sx={{ flexGrow: 1, height: '20vh', mr: 90, mt: 8 }}>
     				<Container maxWidth="sm">
     					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
     						<Button
     							variant="outlined"
						        aria-controls={open ? 'basic-menu' : undefined}
						        aria-haspopup="true"
						        aria-expanded={open ? 'true' : undefined}
						        onClick={handleClick} sx={{width: 80, borderColor: '#00777D'}}>
						        지역
						    </Button>
						    <Button
						    	variant="outlined"
						        aria-controls={open2 ? 'basic-menu' : undefined}
						        aria-haspopup="true"
						        aria-expanded={open2 ? 'true' : undefined}
						        onClick={handleClick2} sx={{width: 80, borderColor: '#00777D'}}>
						        범죄
						    </Button>
						    <Menu
						    	id="basic-menu"
						        anchorEl={anchorEl}
						        open={open}
						        onClose={handleClose}
						        MenuListProps={{
						        	'aria-labelledby': 'basic-button'
						        }} >
						        <MenuItem component={Link} to="/Area" onClick={handleClose}>범죄취약지역</MenuItem>
					       </Menu>
					       <Menu
					       		id="basic-menu"
					         	anchorEl={anchorEl2}
					         	open={open2}
					         	onClose={handleClose2}
					         	MenuListProps={{
					         		'aria-labelledby': 'basic-button'
					         	}} >
           						<MenuItem component={Link} to="/All" onClick={handleClose2}>전 체</MenuItem>
					            <MenuItem component={Link} to="/One" onClick={handleClose2}>살 인</MenuItem>
					            <MenuItem component={Link} to="/Two" onClick={handleClose2}>강 도</MenuItem>
					            <MenuItem component={Link} to="/Three" onClick={handleClose2}>강 간</MenuItem>
					            <MenuItem component={Link} to="/Four" onClick={handleClose2}>절 도</MenuItem>
					            <MenuItem component={Link} to="/Five" onClick={handleClose2}>폭 력</MenuItem>
       						</Menu>
						</Box>
						<Box className = "linear_gradient" sx={{ width: '178vh', height: 50, borderBottom: 1, borderColor: 'divider' }}>
       					</Box>
     				</Container>
     			</Box>
     		</header>

     		<div class="main_box">
     			<div>
     				<Typography
     					variant="h5"
		             	noWrap
		             	component="a"
		             	href="/"
		             	sx={{
		             		mr: 2,
			               	display: { xs: 'none', md: 'flex' },
			               	fontWeight: 700,
			               	letterSpacing: '.3rem',
			               	color: 'black',
			               	textDecoration: 'none',
			               	mt:2
			            }}
			        >
			            강력 범죄: 강도
           			</Typography>
           			<Typography
     					variant="h7"
		             	noWrap
		             	component="a"
		             	href="/"
		             	sx={{
		             		mr: 2,
			               	display: { xs: 'none', md: 'flex' },
			               	fontWeight: 700,
			               	letterSpacing: '.3rem',
			               	color: 'black',
			               	textDecoration: 'none',
			               	mt:3
			            }}
			        >
			            강도
           			</Typography>
           			<Typography
     					variant="body2"
		             	noWrap
		             	component="a"
		             	href="/"
		             	sx={{
			               	display: { xs: 'none', md: 'flex' },
			               	fontWeight: 300,
			               	letterSpacing: '.3rem',
			               	color: 'black',
			               	textDecoration: 'none',
			               	mt:5
			            }}
			        >
			             다른 사람의 재산을 빼앗는 범죄자를 말한다.
           			</Typography>
           			<Typography
     					variant="body2"
		             	noWrap
		             	component="a"
		             	href="/"
		             	sx={{
			               	display: { xs: 'none', md: 'flex' },
			               	fontWeight: 300,
			               	letterSpacing: '.3rem',
			               	color: 'black',
			               	textDecoration: 'none'
			            }}
			        >
			            대한민국의 법(法)에서는 '폭행 또는
           			</Typography>
           			<Typography
     					variant="body2"
		             	noWrap
		             	component="a"
		             	href="/"
		             	sx={{
			               	display: { xs: 'none', md: 'flex' },
			               	fontWeight: 300,
			               	letterSpacing: '.3rem',
			               	color: 'black',
			               	textDecoration: 'none'
			            }}
			        >
			            협박으로 타인의 재물을 강취하거나
           			</Typography>
           			<Typography
     					variant="body2"
		             	noWrap
		             	component="a"
		             	href="/"
		             	sx={{
			               	display: { xs: 'none', md: 'flex' },
			               	fontWeight: 300,
			               	letterSpacing: '.3rem',
			               	color: 'black',
			               	textDecoration: 'none'
			            }}
			        >
			            기타 재산상의 이득을 취득하거나
           			</Typography>
           			<Typography
     					variant="body2"
		             	noWrap
		             	component="a"
		             	href="/"
		             	sx={{
			               	display: { xs: 'none', md: 'flex' },
			               	fontWeight: 300,
			               	letterSpacing: '.3rem',
			               	color: 'black',
			               	textDecoration: 'none'
			            }}
			        >
			            이를 취득하게 하는 자'라고 규정함.
           			</Typography>
           			<img class='img_round_box' src='img/crime_all_round3.png' />
           		</div>
           		<div>
                    <ButtonGroup variant="outlined" size="large" aria-label="outlined button group" sx={{mt:4, ml:2}}>
                    <Button onClick={() => { setChange(!change);}}>발생 건수</Button>
                    <Button onClick={() => { setChange(!change);}}>미 검거 </Button>
                    </ButtonGroup>
                    {!change && <img class='img_box' src='img/imgcrime_data_5.png' />}
                    {change && <img class='img_box' src='img/imgcrime_data_6.png' />}
                </div>
     		</div>
     		
		</div>
		);
}

export default Data_CrimeBurglar;