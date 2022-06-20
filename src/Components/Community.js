import React, { useState, useEffect } from 'react';
import './Community.css';
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Infopost from './Infopost';
import { Routes, Route, Link } from "react-router-dom";

import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Community () {
	const [post, setPost] = useState([]); // infopost
	const [post_2, setPost2] = useState([]); // missingpost
	const [img_url1, setUrl1] = useState(""); // first image
	const [post_num1, setNum1] = useState("");
	const [post_num2, setNum2] = useState("");
	const [post_num3, setNum3] = useState("");
	const [img_url2, setUrl2] = useState(""); // second image
	const [img_url3, setUrl3] = useState(""); // third image

	function onClickImage() {
		alert(post_num1);
	}

	useEffect(() => {
		const requestOptions = {
		    method : "GET",
		    headers: { "Content-Type":"application/json"}
		}
		fetch("http://3.39.103.11:8080/Community/InfoPost", requestOptions)
		    .then((response) => response.json())
		    .then((response) => {
		    	setPost(response);
		    },
		    (error) => {
		    	setPost(error);
		    }
		);

		const requestOptions2 = {
		    method : "GET",
		    headers: { "Content-Type":"application/json"}
		}
		fetch("http://3.39.103.11:8080/Community/Missing", requestOptions2)
		    .then((response) => response.json())
		    .then((response) => {
		    	setPost2(response);
		    },
		    (error) => {
		    	setPost2(error);
		    }
		);

		const requestOptions3 = {
		    method : "GET",
		    headers: { "Content-Type":"application/json"}
		}
		fetch("http://3.39.103.11:8080/Community/Image", requestOptions3)
		    .then((response) => response.json())
		    .then((response) => {
		    	var count = 0;
		    	for(var i = 0; i < response.length; i ++) {
		    		if (count == 3) {
		    			break;
		    		} else {
			    		if(response[i].imgId.includes("missing")) {
			    			count = count + 1;
			    			if (count == 1) {
				    			setUrl1(response[i].imgUrl);
				    			setNum1(response[i].imgId.substr(8));
				    		}
				    		else if (count == 2) {
				    			setUrl2(response[i].imgUrl);
				    			setNum2(response[i].imgId.substr(8));
				    		}
				    		else if (count == 3) {
				    			setUrl3(response[i].imgUrl);
				    			setNum3(response[i].imgId.substr(8));
				    		} else {}
			    		}
			    	}
		    	}
		    },
		    (error) => {
		    	alert('이미지 불러오기 실패: 다시 한 번 시도해주세요.('+error+')');
		    }
		);

	},[]);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
    	setAnchorEl(event.currentTarget);
  	};

	const handleClose = () => {
	    setAnchorEl(null);
	 };

	return (

			<div className="community">
					<div className="title1">
						<h2>실종 포스터</h2>
					</div>
            
			        <Link to={{pathname:`Missingpost/${post_num1}`}}><img src={img_url1} width="400px" height="400px" /></Link>
			        <Link to={{pathname:`Missingpost/${post_num2}`}}><img src={img_url2} width="400px" height="400px" /></Link>
			        <Link to={{pathname:`Missingpost/${post_num3}`}}><img src={img_url3} width="400px" height="400px" /></Link>

			      	<p></p>

			      	<Divider sx={{ height: 10,  maxWidth: 1500, bgcolor: "#00777d", mt: 5 }} />

			      	<div className="title2">
				    	<h2>정보 글 게시판</h2>
				    </div>

			      	<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				        <Button
				        onClick={handleClick}
				        variant="outlined"
				        sx={{color: '#00777d', border: 2, mt: 5, mb: 3, mr: 100}}>
				        글 작성
				        </Button>
				        <Menu
				        	id="basic-menu"
						    anchorEl={anchorEl}
						    open={open}
						    onClose={handleClose}
						    MenuListProps={{'aria-labelledby': 'basic-button'}} >
						    <MenuItem component={ Link } to="/WriteMissing" onClick={handleClose}>실종, 분실</MenuItem>
						    <MenuItem component={ Link } to="/WriteInfo" onClick={handleClose}>정보 공유</MenuItem>
					    </Menu>
				    </Box>

			        <TableContainer component={Paper}>
			          <Table sx={{minWidth: 500, border: 1 }} aria-label="simple table">

			            <TableHead className="TableHead">
			              <TableRow>
			                <TableCell align="center">No</TableCell>
			                <TableCell align="center">제목</TableCell>
			                <TableCell align="center">등록일</TableCell>
			                <TableCell align="center">수정일</TableCell>
			              </TableRow>
			            </TableHead>

			            <TableBody>
			              {post.map((post) => (
			                <TableRow
			                  key={post.post_num}
			                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			                >
			                  <TableCell component="th" scope="row" align="center">{post.post_num}</TableCell>
			                  <TableCell align="center"><Link to={{pathname:`Infopost/${post.post_num}`}}>{post.title}</Link></TableCell>
			                  <TableCell align="center">{post.reg_time}</TableCell>
			                  <TableCell align="center">{post.fix_time}</TableCell>
			                </TableRow>
			              ))}
			            </TableBody>

			          </Table>
			    	</TableContainer>
		    	
		    </div>

    )
	
}

export default Community;