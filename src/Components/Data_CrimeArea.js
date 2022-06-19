import * as React from 'react';
import { useState } from "react";
import '../App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

function Data () {
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

	return (
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
						        MenuListProps={{'aria-labelledby': 'basic-button'}} >
						        <MenuItem component={Link} to="/Data" onClick={handleClose}>범죄취약지역</MenuItem>
					       </Menu>
					       <Menu
					       		id="basic-menu"
					         	anchorEl={anchorEl2}
					         	open={open2}
					         	onClose={handleClose2}
					         	MenuListProps={{'aria-labelledby': 'basic-button'}} >
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

     		<div className="main_box">
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
			            }}>
			            범죄취약지역 분석
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
			            }}>
			            5대 강력 범죄
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
			            }}>
			            강력범죄란 흉기나 폭력을 써서 저지르는
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
			            }}>
			            범죄 행위로 살인이나 강도, 강간처럼
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
			            }}>
			            그 죄의 정도가 중하면서 사회적으로 강한
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
			            }}>
			            영향력을 가지는 범죄들을 이야기합니다.
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
			               	mt:7
			            }}>
			           지역별 범죄취약 분석 방법
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
			            }}>
			            '5개년치 자치구별 5대 범죄 데이터',
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
			            }}>
			            '자치구별 CCTV 데이터',
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
			            }}>
			            '자치구별 파출소/지구대 데이터'
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
			            }}>
			            등을 활용해 각 데이터의 가중치를
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
			            }}>
			            구하고 이를 활용해 서울시
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
			            }}>
			            자치구별 범죄 정도를 수치화하여
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
			            }}>
			            최종 범죄취약지역을 산출한다.
           			</Typography>
           		</div>
           		<div>
           			<img class='img_box' src='img/imgcrime_data_main.png' />
                </div>
     		</div>
		</div>
	);
}

export default Data;