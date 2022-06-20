import React, { useState, useEffect } from 'react';
import './Update.css';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function UpdateInfo() {
	const { post_num }= useParams();

	const [title, setTitle] = useState("");
	const [region, setRegion] = useState("");
	const [content, setContent] = useState("");

	function onClickUpdate() {
    	const fixTime = new Date();
    	const requestOptions = {
		    method : "PATCH",
		    body: JSON.stringify({ title, region, content, fixTime }),
		    headers: { "Content-Type":"application/json"}
		}
		fetch("http://3.39.103.11:8080/InfoPost/" + post_num, requestOptions)
		    .then((response) => response.json())
		    .then((response) => {
		    	alert('글 수정이 완료되었습니다.');
		    },
		    (error) => {
		    	alert('다시 한 번 시도해주세요.('+error+')');
		    }
		);
    }

    useEffect(() => {
		const requestOptions = {
		    method : "GET",
		    headers: { "Content-Type":"application/json"}
		}
		fetch("http://3.39.103.11:8080/InfoPost/" + post_num, requestOptions)
		    .then((response) => response.json())
		    .then((response) => {
		    	setTitle(response.title);
		    	setRegion(response.region);
		    	setContent(response.content);
		    },
		    (error) => {
		    	setTitle(error);
		    }
		);
	},[]);

	return (
		<div className="update">
			<div className="title">
				<h2>글 수정</h2>
			</div>
			<p></p>
			<Box
				sx={{
					p: 3,
					border: "1px solid black",
					borderRadius: 1,
				}}
			>

			<h3 className="title">제목</h3>
			<TextField onChange={(event) => setTitle(event.target.value)} sx={{ minWidth: 1200, mb: 3}} id="outlined-basic" value={title} variant="outlined" />

			<h3 className="title">내용</h3>
			<Divider sx={{ height: 10,  maxWidth: 1200, bgcolor: "#00777d" }} />
			<TextField onChange={(event) => setRegion(event.target.value)} sx={{ minWidth: 1200 }} id="outlined-basic" value={region} variant="outlined" />
			<TextField onChange={(event) => setContent(event.target.value)} multiline rows={20} sx={{ minWidth: 1200 }} id="outlined-basic" value={content} variant="outlined" />
			<Divider sx={{ height: 10,  maxWidth: 1200, bgcolor: "lightgrey" }} />

			<p></p>

			<Button onClick={ onClickUpdate } component={ Link } to="/Community" variant="contained" sx={{bgcolor: '#00777d', minWidth: 100, ml: 135}} > 수정 완료 </Button>
			</Box>
		</div>
	)

}

export default UpdateInfo;