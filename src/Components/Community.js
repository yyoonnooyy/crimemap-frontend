import React, { useState, useEffect } from 'react';
import './Community.css';
import Infopost from './Infopost';
import { Routes, Route, Link } from "react-router-dom";

import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Community () {
	const [post, setPost] = useState([]);

	useEffect(() => {
		const requestOptions = {
		    method : "GET",
		    headers: { "Content-Type":"application/json"}
		}
		fetch("http://localhost:8080/Community/InfoPost", requestOptions)
		    .then((response) => response.json())
		    .then((response) => {
		    	setPost(response);
		    },
		    (error) => {
		    	setPost(error);
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

	const [search_key, setKey] = useState('');

	const handleChange = (event) => {
		setKey(event.target.value);
		console.log(post[2].post_num);
	 };

	return (

			<div className="community">
            
			        <Button
			          style = {{
			            backgroundColor: "#EFFBFB",
			            width: "200px",
			            height:"150px",
			            padding: "25px 25px",
			            fontSize: "12px",
			            color: "#000000"
			          }}
			          variant="contained"
			          sx={{ mr: 5 }}
			        >
			          실종, 분실 포스터
			      	</Button>

			      	<Button
			          style = {{
			            backgroundColor: "#EFFBFB",
			            width: "200px",
			            height:"150px",
			            padding: "25px 25px",
			            fontSize: "12px",
			            color: "#000000"
			          }}
			          variant="contained"
			          sx={{ mr: 5 }}
			        >
			          실종, 분실 포스터
			      	</Button>

			      	<Button
			          style = {{
			            backgroundColor: "#EFFBFB",
			            width: "200px",
			            height:"150px",
			            padding: "25px 25px",
			            fontSize: "12px",
			            color: "#000000"
			          }}
			          variant="contained"
			          sx={{ mr: 5 }}
			        >
			          실종, 분실 포스터
			      	</Button>

			      	<Button
			          style = {{
			            backgroundColor: "#EFFBFB",
			            width: "200px",
			            height:"150px",
			            padding: "25px 25px",
			            fontSize: "12px",
			            color: "#000000"
			          }}
			          variant="contained"
			          sx={{ mr: 5 }}
			        >
			          실종, 분실 포스터
			      	</Button>

			      	<p></p>
			      	<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				        <Button
				        onClick={handleClick}
				        variant="outlined"
				        sx={{color: '#00777d', border: 2, mt: 10, mb: 3, mr: 100}}>
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

					      <FormControl sx={{maxWidth: 100, mt: 10, mr: 2}} fullWidth>
					        <InputLabel id="demo-simple-select-label">종류</InputLabel>
					        <Select
					          labelId="demo-simple-select-label"
					          id="demo-simple-select"
					          value={search_key}
					          label="Search"
					          onChange={handleChange}
					        >
					          <MenuItem value={"Title"}>글 제목</MenuItem>
					          <MenuItem value={"Content"}>글 내용</MenuItem>
					        </Select>
					      </FormControl>
					    <TextField sx={{ mt: 10, mr: 2 }} id="outlined-basic" label="검색어를 입력하세요" variant="outlined" />
					    <Button
				        component={ Link } to="/Write"
				        variant="outlined"
				        sx={{color: '#00777d', border: 2, mt: 10, mb: 3}}>
				        검색</Button>
				    </Box>

				    <h2>정보 글 게시판</h2>

			        <TableContainer component={Paper}>
			          <Table sx={{minWidth: 500}} aria-label="simple table">

			            <TableHead className="TableHead">
			              <TableRow>
			                <TableCell align="center">No</TableCell>
			                <TableCell align="center">제목</TableCell>
			                <TableCell align="center">사진 첨부파일</TableCell>
			                <TableCell align="center">등록일</TableCell>
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
			                  <TableCell align="center">(img)</TableCell>
			                  <TableCell align="center">{post.reg_time}</TableCell>
			                </TableRow>
			              ))}
			            </TableBody>

			          </Table>
			    	</TableContainer>
		    	
		    </div>

    )
	
}

export default Community;