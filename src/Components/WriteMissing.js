import React, { useState } from 'react';
import './Write.css';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

function WriteInfo () {

	const [post_value, setValue] = React.useState('missingPost');
	const [attachment, setAttachment] = useState();
	const [file, setFile] = useState('');

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const regTime = new Date();
	const fixTime = new Date();

	function onClickSubmit() {
		if (title.trim() === '') {
            alert('제목을 입력해주세요');
        }
        else if (content.trim() === '') {
            alert('내용을 입력해주세요');
        }
        else {

			const requestOptions = {
		    	method : "POST",
		    	body: JSON.stringify({ title, content, regTime, fixTime }),
		    	headers: { "Content-Type":"application/json"}
		  	}
			fetch("http://ec2-3-39-103-11.ap-northeast-2.compute.amazonaws.com:8080/InfoPost", requestOptions)
	    	.then((response) => response.json())
	    	.then((response) => {
	          if (response) {
                    alert('글 작성이 완료되었습니다.' + response[0]);
	          }
	      	},
	      	(error) => {
	        	alert('오류: '+error);
	      	}
	    );
		}
}

	const onFileChange = (event) => {
	    const {target:{files, value}} = event;
	    const theFile = files[0];
	    const reader = new FileReader();
	    setFile(value)
	    reader.onloadend = (finishedEvent) => {
	      const { currentTarget: {result}} = finishedEvent
	      setAttachment(result)
    	}
    	reader.readAsDataURL(theFile);
	};

	const onClearAttachment = (event) => {
		setAttachment(null)
	    setFile('')
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className="write">
			<div className="title">
				<h2>실종, 분실 관련 글 작성</h2>
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
			<TextField onChange={(event) => setTitle(event.target.value)} sx={{ minWidth: 1200, mb: 3}} id="outlined-basic" label="제목을 적어주세요" variant="outlined" />

			<h3 className="title">내용</h3>
			<Divider sx={{ height: 10,  maxWidth: 1200, bgcolor: "#00777d" }} />
			<TextField sx={{ minWidth: 1200 }} id="outlined-basic" label="실종, 분실 지역을 입력해주세요(서울 서초구 서초1동, 인천 중구 중산동)" variant="outlined" />
			<TextField sx={{ minWidth: 1200 }} id="outlined-basic" label="실종, 분실 대상의 이름을 설정해주세요" variant="outlined" />
			<TextField onChange={(event) => setContent(event.target.value)} multiline rows={20} sx={{ minWidth: 1200 }} id="outlined-basic" label="내용을 입력하세요" variant="outlined" />
			<Divider sx={{ height: 10,  maxWidth: 1200, bgcolor: "lightgrey" }} />
			<p></p>
			<input type="file" accept="image/*" onChange={onFileChange} value={file}/>
			<img src={attachment} width="50px" height="50px" alt="선택된 파일"/>
			<button onClick={onClearAttachment}>다시 업로드</button>

			<p></p>

			<Button onClick={onClickSubmit} component={ Link } to="/Community" variant="contained" sx={{bgcolor: '#00777d', minWidth: 100, ml: 135}} > 완료 </Button>
			</Box>
		</div>
	)
}

export default WriteInfo;