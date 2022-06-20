import React, { useState, useEffect } from 'react';
import './Infopost.css';
import { getStorage, ref, getDownloadURL, deleteObject } from "firebase/storage"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function MissingPost() {
	const { post_num } = useParams();

	const [post_title, setTitle] = useState("");
	const [post_region, setRegion] = useState("");
	const [post_name, setName] = useState("");
	const [post_content, setContent] = useState("");
	const [post_time, setTime] = useState("");
	const [img_url, setUrl] = useState("");

	useEffect(() => {
		const requestOptions = {
		    method : "GET",
		    headers: { "Content-Type":"application/json"}
		}
		fetch("http://localhost:8080/MissingPost/" + post_num, requestOptions)
		    .then((response) => response.json())
		    .then((response) => {
		    	setTitle(response.title);
		    	setRegion(response.region);
		    	setName(response.name);
		    	setContent(response.content);
		    	setTime(response.reg_time);

			    const imgId = "missing_" + post_num;
				const requestOptions2 = {
					method : "GET",
					headers: { "Content-Type":"application/json"}
				}
				fetch("http://localhost:8080/MissingPost/Image/" + imgId, requestOptions2)
					.then((response) => response.json())
					.then((response) => {
						setUrl(response.imgUrl);
					},
					(error) => {
						alert('이미지 불러오기 실패: 다시 한 번 시도해주세요.('+error+')');
					}
				);
			},
			(error) => {
				alert('글 불러오기 실패: 다시 한 번 시도해주세요.('+error+')');
			}
		);
	},[]);

	function onClickDelete() {
		const imgId2 = "missing_" + post_num;
			const requestOptions = {
				method : "DELETE",
				headers: { "Content-Type":"application/json"}
			}
			fetch("http://localhost:8080/MissingPost/Image/" + imgId2, requestOptions)
				.then((response) => response.text())
				.then((response) => {
					const requestOptions2 = {
						method : "DELETE",
						headers: { "Content-Type":"application/json"}
					}
					fetch("http://localhost:8080/MissingPost/" + post_num, requestOptions2)
						.then((response) => response.text())
						.then((response) => {
							alert('글 삭제가 완료되었습니다.');
						},
						(error) => {
							alert('글 삭제 실패: 다시 한 번 시도해주세요.('+error+')');
						}
					);
				},
				(error) => {
					alert('이미지 삭제 실패(RDS): 다시 한 번 시도해주세요.('+error+')');
				}
			);

			const storage = getStorage();
			const desertRef = (ref(storage, `/missing/${post_num}`))
			deleteObject(desertRef).then(() => {
			}).catch((error) => {
				alert('이미지 삭제 실패(FB): 다시 한 번 시도해주세요.('+error+')');
			});
	} // onClickDelete

	return (
		<div className="infopost">
			<div className="title">
				<h2>실종 / 분실</h2>
			</div>
			<p></p>
			<div></div>
			<Box
				sx={{
					p: 3,
					border: "1px solid black",
					borderRadius: 1,
				}}
			>

			<TableContainer component={Paper} sx= {{maxWidth: 1200}} >
			    <Table aria-label="simple table">

			        <TableHead className="TableHead">
			            <TableRow>
			            	<TableCell align="center">제목</TableCell>
			                <TableCell align="center">지역</TableCell>
			                <TableCell align="center">이름</TableCell>
			                <TableCell align="center">최종 등록일</TableCell>
			            </TableRow>
			        </TableHead>

			        <TableBody>
			        	<TableRow
			                  sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
			                >
			                  <TableCell component="th" align="center">{post_title}</TableCell>
			                  <TableCell align="center">{post_region}</TableCell>
			                  <TableCell align="center">{post_name}</TableCell>
			                  <TableCell align="center">{post_time}</TableCell>
			                </TableRow>
			        </TableBody>

			    </Table>
			</TableContainer>

			<Divider sx={{ height: 10,  maxWidth: 1200, bgcolor: "#00777d" }} />

			<p></p>

			<img src={img_url} width="400px" height="400px" />

			<p></p>

			<Box
				sx={{
					p: 2,
					border: "1px solid black",
					borderRadius: 1,
					minHeight: 300
				}}>
				{post_content}
			</Box>

				<Box sx={{ display: 'flex', flexDirection: 'row' }}>

					<Link to={{pathname:`Update`}}>
						<Button
							variant="outlined"
							sx={{color: '#00777d', border: 2, mt: 3, ml: 115}}>
							수정하기
						</Button>
					</Link>

					<Button
						component={ Link } to="/Community"
						variant="outlined"
						onClick={onClickDelete}
						sx={{color: '#00777d', border: 2, mt: 3, ml: 3}}>
						삭제하기
					</Button>

					<Button
						component={ Link } to="/Community"
						variant="outlined"
						sx={{color: '#00777d', border: 2, mt: 3, ml: 3}}>
						목록으로
					</Button>

				</Box>

			</Box>

		</div>
	)
}

export default MissingPost;