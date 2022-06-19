import React, { useState } from 'react';
import './Write.css';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

function WriteInfo () {

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [region, setRegion] = useState('');

	const [file, setFile] = useState(''); // file name
	const [attachment, setAttachment] = useState(); // image file

	function onClickSubmit() {
		if (title.trim() === '') {
            alert('제목을 입력해주세요');
        }
        else if (content.trim() === '') {
            alert('내용을 입력해주세요');
        }
        else if (region.trim() === '') {
        	alert('지역을 입력해주세요');
        }
        else {
        	const regTime = new Date();
			const fixTime = new Date();
			var flag = "";
			if (attachment !== undefined) {
				flag = "Y"
			} else {
				flag = "N";
			}
			
			const requestOptions = {
		    	method : "POST",
		    	body: JSON.stringify({ title, region, content, regTime, fixTime, flag }),
		    	headers: { "Content-Type":"application/json"}
		  	}
			fetch("http://localhost:8080/InfoPost", requestOptions)
				.then((response) => response.json())
	    		.then((response) => {
	          		if (response) {

                    	if (attachment !== undefined) {
			    			const storage = getStorage();
			    			const attachmentRef = ref(storage, `info/${response}`);
							uploadString(attachmentRef, attachment, "data_url")
								.then((snapshot) => {
				
									getDownloadURL(ref(storage, `info/${response}`))
										.then((url) => {
											const imgId = "info_" + response;
											const imgUrl = url;

											const requestOptions2 = {
										    	method : "POST",
										    	body: JSON.stringify({ imgId, imgUrl }),
										    	headers: { "Content-Type":"application/json"}
										  	}
										  	fetch("http://localhost:8080/InfoPost/Image", requestOptions2)
										    	.then((response) => response.text())
										    	.then((response) => {
										    		if (response) {
											  			alert('글 작성이 완료되었습니다.');
											  		}
												},
												(error) => {
													alert('다시 한 번 시도해주세요.('+error+')');
												}
											);

										}); // getDownloadURL
								},
								(error) => {
									alert('이미지 업로드에 실패하였습니다.('+error+')');
								});

				    	} else {
				    		alert('글 작성이 완료되었습니다.');
				    	}
				    } // if
		      	},
		      	(error) => {
		        	alert('다시 한 번 시도해주세요.('+error+')');
		      	}
	    	);

		} // else
	}; // onClickSubmit

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

	return (
		<div className="write">
			<div className="title">
				<h2>정보 공유 글 작성</h2>
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
			<TextField onChange={(event) => setRegion(event.target.value)} sx={{ minWidth: 1200 }} id="outlined-basic" label="글과 관련된 지역을 입력해주세요(서울 서초구 서초1동, 인천 중구 중산동)" variant="outlined" />
			<TextField onChange={(event) => setContent(event.target.value)} multiline rows={20} sx={{ minWidth: 1200 }} id="outlined-basic" label="내용을 입력하세요" variant="outlined" />
			<Divider sx={{ height: 10,  maxWidth: 1200, bgcolor: "lightgrey" }} />
			<p></p>
			<input type="file" accept="image/*" onChange={onFileChange} value={file}/>
			<img src={attachment} width="50px" height="50px" alt="선택된 파일"/>
			<button onClick={onClearAttachment}>다시 업로드</button>

			<p></p>

			<Button onClick={ onClickSubmit } component={ Link } to="/Community" variant="contained" sx={{bgcolor: '#00777d', minWidth: 100, ml: 135}} > 완료 </Button>
			</Box>
		</div>
	)
}

export default WriteInfo;