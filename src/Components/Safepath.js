import React, { useEffect } from 'react';
import './Safepath.css';

function Safepath () {

	const { Tmapv2 } = window;

	useEffect(() => {
	    const map = new Tmapv2.Map("myMap", {
	        center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
	        httpsMode: true,
	        zoom: 15,
      	});

	    var markerArr = [];
	    var lonlat;

	    //$("#startPoint").keydown();



	},[]);

	return (
		<div>
			<div className="sidebar">
				<input
		          type="text"
		          className="startPoint"
		          id="startPoint"
		          name="startPoint"
		          placeholder="출발지를 입력해주세요.">
		        </input>
		        <div className="sidebarEnd"></div>
		        <input
		          type="text"
		          className="endPoint"
		          id="endPoint"
		          name="endPoint"
		          placeholder="도착지를 입력해주세요.">
		        </input>
		        <button id="btn_select">시작하기</button>
			</div>

			<div className="sidebar2">
				<div className="title"></div>
					<div className="rst_wrap">
						<div className="rst mCustomScrollbar">
							<ul id="searchResult" name="searchResult">
								<p>
									안전경로를 추천해 줍니다:)
									<br />
					                우선 출발지와 도착지를 입력해주세요!
					            </p>
					        </ul>
					    </div>
					</div>
			</div>

			<div
				id="myMap"
		        style={{
		          width: "900px",
		          height: "600px",
		          position: "absolute",
		          right: "70px",
		          top: "150px",
		          textAlign: "right",
	        	}}>
	        </div>

        </div>
	);
}

export default Safepath;