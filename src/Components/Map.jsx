import React, { useEffect, useState } from "react";
import axios from "axios";
import "./map.css";
import $ from "jquery";

const { Tmapv2 } = window;

const Map = () => {

  var new_polyLine = [];
  var new_Click_polyLine = [];

  function drawData(data, map) {
    // 지도위에 선은 다 지우기
    var newData = [];
    var equalData = [];
    var pointId1 = "-1234567";
    var ar_line = [];
    var pointArray = [];
    
    for (var i = 0; i < data.features.length; i++) {
      var feature = data.features[i];
      //배열에 경로 좌표 저장
      if(feature.geometry.type == "LineString"){
        ar_line = [];
        for (var j = 0; j < feature.geometry.coordinates.length; j++) {
          var startPt = new Tmapv2.LatLng(feature.geometry.coordinates[j][1],feature.geometry.coordinates[j][0]);
          ar_line.push(startPt);
          pointArray.push(feature.geometry.coordinates[j]);
        }
        var polyline = new Tmapv2.Polyline({
              path: ar_line,
              strokeColor: "#04B431", 
              strokeWeight: 5,
              map: map
          });
        new_polyLine.push(polyline);
      }
      var pointId2 = feature.properties.viaPointId;
      if (pointId1 != pointId2) {
        equalData = [];
        equalData.push(feature);
        newData.push(equalData);
        pointId1 = pointId2;
      }
      else {
        equalData.push(feature);
      }
    }
  } // drawData();

  useEffect(
    () => {
      const map = new Tmapv2.Map("myMap", {
        center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
        httpsMode: true,
        zoom: 15,
      });

      // 출발지 설정 - POI 통합 검색 API 요청
      var markerArr = [];
      var lonlat;

      // 버튼
      $("#btn_start").click(function (key) {
        var searchKeyword = $("#startPoint").val();
            $.ajax({
              method: "GET",
              url: "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
              async: false,
              data: {
                appKey: "l7xxf92260dcdced4af1a0935ab8005108b4",
                searchKeyword: searchKeyword,
                resCoordType: "EPSG3857",
                reqCoordType: "WGS84GEO",
                count: 10,
              },
              success: function (response) {
                var resultpoisData = response.searchPoiInfo.pois.poi;

                // 기존 마커 제거
                if (markerArr.length > 0) {
                  for (var i in markerArr) {
                    markerArr[i].setMap(null);
                  }
                }

                var innerHtml = "";
                var positionBounds = new Tmapv2.LatLngBounds();

                // 결과값 리스트 생성
                for (var k in resultpoisData) {
                  var noorLat = Number(resultpoisData[k].noorLat);
                  var noorLon = Number(resultpoisData[k].noorLon);
                  var name = resultpoisData[k].name;

                  var pointCng = new Tmapv2.Point(noorLon, noorLat);
                  var projectionCng =
                    new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(pointCng);

                  var lat = projectionCng._lat;
                  var lon = projectionCng._lng;

                  var markerPosition = new Tmapv2.LatLng(lat, lon);

                  // 마커 형태로 표시
                  marker = new Tmapv2.Marker({
                    position: markerPosition,
                    icon:
                      "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                      k +
                      ".png",
                    iconSize: new Tmapv2.Size(24, 38),
                    title: name,
                    map: map,
                  });

                  innerHtml +=
                    "<li><img src='http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                    k +
                    ".png' style='vertical-align:middle;'/><span>" +
                    name +
                    "</span></li>";

                  markerArr.push(marker);
                  positionBounds.extend(markerPosition);

                  map.addListener("click", startP);

                  //출발지 마커 클릭 이벤트
                  function startP(e) {
                    if (typeof marker_s === "undefined") {
                      lonlat = e.latLng;

                      marker_s = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(lonlat.lat(), lonlat.lng()),
                        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
                        iconSize: new Tmapv2.Size(36, 54),
                        map: map,
                      });

                      for (var i in markerArr) {
                        markerArr[i].setMap(null);
                      }

                      $("#searchResult").html("도착지를 설정하세요!");
                      markerArr.push(marker);
                    }

                  }
                }

                $("#searchResult").html(innerHtml);
                map.panToBounds(positionBounds);
                map.zoomOut();
              },
              error: function (request, status, error) {
                console.log(
                  "code:" +
                    request.status +
                    "\n" +
                    "message:" +
                    request.responseText +
                    "\n" +
                    "error:" +
                    error
                );
              }, //error
            }); //ajax
        }
      ); //$("#btn_start")


      // 도착지 설정 - POI 통합 검색 API 요청
      var markerArr = [];

      // 버튼
      $("#btn_end").click(function (key) {
            var searchKeyword = $("#endPoint").val();
            $.ajax({
              method: "GET",
              url: "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
              async: false,
              data: {
                appKey: "l7xxf92260dcdced4af1a0935ab8005108b4",
                searchKeyword: searchKeyword,
                resCoordType: "EPSG3857",
                reqCoordType: "WGS84GEO",
                count: 10,
              },
              success: function (response) {
                var resultpoisData = response.searchPoiInfo.pois.poi;

                // 기존 마커 제거
                if (markerArr.length > 0) {
                  for (var i in markerArr) {
                    markerArr[i].setMap(null);
                  }
                }
                var innerHtml = "";
                var positionBounds = new Tmapv2.LatLngBounds();

                // 결과값 리스트 생성
                for (var k in resultpoisData) {
                  var noorLat = Number(resultpoisData[k].noorLat);
                  var noorLon = Number(resultpoisData[k].noorLon);
                  var name = resultpoisData[k].name;

                  var pointCng = new Tmapv2.Point(noorLon, noorLat);
                  var projectionCng =
                    new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(pointCng);

                  var lat = projectionCng._lat;
                  var lon = projectionCng._lng;

                  var markerPosition = new Tmapv2.LatLng(lat, lon);

                  // 마커 형태로 표시
                  marker = new Tmapv2.Marker({
                    position: markerPosition,
                    icon:
                      "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                      k +
                      ".png",
                    iconSize: new Tmapv2.Size(24, 38),
                    title: name,
                    map: map,
                  });

                  innerHtml +=
                    "<li><img src='http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                    k +
                    ".png' style='vertical-align:middle;'/><span>" +
                    name +
                    "</span></li>";

                  markerArr.push(marker);
                  positionBounds.extend(markerPosition);

                  map.addListener("click", endP);

                  //도착지 마커 클릭 이벤트
                  function endP(e) {
                    if (typeof marker_e == "undefined") {
                      for (var i in markerArr) {
                        markerArr[i].setMap(null);
                      }

                      lonlat = e.latLng;

                      marker_e = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(lonlat.lat(), lonlat.lng()),
                        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
                        iconSize: new Tmapv2.Size(36, 54),
                        map: map,
                      });
                      $("#searchResult").html("안전경로를 확인해보세요!");
                      markerArr.push(marker);
                    }
                  }
                }

                $("#searchResult").html(innerHtml);
                map.panToBounds(positionBounds);
                map.zoomOut();
              },
              error: function (request, status, error) {
                console.log(
                  "code:" +
                    request.status +
                    "\n" +
                    "message:" +
                    request.responseText +
                    "\n" +
                    "error:" +
                    error
                );
              }, //error
            }); //ajax
        } //endPoint
      ); //$(#btn_end)

      let marker_s, marker_e, marker, marker2, marker3, marker4, marker5, marker6;

      $("#btn_select").click(function (key) {

        var bounds_ = new Tmapv2.LatLngBounds(
            new Tmapv2.LatLng(
              marker_s.getPosition()._lat,
              marker_s.getPosition()._lng
            ),
            new Tmapv2.LatLng(
              marker_e.getPosition()._lat,
              marker_e.getPosition()._lng
            )
          )

        // 파출소 데이터 import
        var fileName = "파출소.csv";
        var latitude = [];
        var longitude= [];

        $.ajax({
          url: fileName,
          dataType:'text',
          success: function(data) {
            var singleRow = [];

            for(var count = 0; count < data.length; count++) {
                var allData = data.split("\n");
              }

            for(var count = 0; count < allData.length; count++) {
                singleRow = [];
                singleRow = allData[count].split("/");
                latitude[count] = singleRow[2];
                longitude[count] = singleRow[3];
            }

            // 사각형 영역에 포함되어 있는 데이터가 있다면 lat, lng 배열에 그 값을 담음
            var lat = [];
            var lng = [];
            var i = 0;
            for(var count = 0; count < latitude.length; count++) {
              var confirmData = new Tmapv2.LatLng(latitude[count],longitude[count]);
              if(bounds_.contains(confirmData)) {
                lat[i]= latitude[count];
                lng[i]= longitude[count];
                i= i + 1;
                break;
              }
            }

            // cctv 데이터 import
            var fileName2 = "cctv_2.csv";

            $.ajax({
              url: fileName2,
              dataType:'text',
              success: function(data) {
                // 변수 초기화
                latitude = [];
                longitude = [];
                singleRow = [];

                for(var count = 0; count < data.length; count++) {
                  var allData2 = data.split("\n");
                }

                for(var count = 0; count < allData2.length; count++) {
                    singleRow = allData2[count].split("/");
                    latitude[count] = singleRow[1];
                    longitude[count] = singleRow[2];
                }

                // 사각형 영역에 포함되어 있는 데이터가 있다면 lat, lng 배열에 그 값을 담음
                for(var count = 0; count < latitude.length; count++) {
                  var confirmData = new Tmapv2.LatLng(latitude[count],longitude[count]);
                  if(bounds_.contains(confirmData)) {
                    lat[i]= latitude[count];
                    lng[i]= longitude[count];
                    i= i + 1;
                  }
                }

                // 최종 경유지가 1, 2, 3개일 때로 나누어서 최종 경로를 표시함
                let headers = {};
                headers["appKey"] = "l7xxf92260dcdced4af1a0935ab8005108b4";
                
                if (i==1) {
                  // 경유지 마커 표시
                  marker = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(lat[0],lng[0]),
                    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
                    iconSize: new Tmapv2.Size(24, 38),
                    map: map,
                  });

                  // 경로 표시 준비 작업
                  var passList = lng[0]+","+lat[0]; // 경유지 루트가 될 passList 변수

                  $.ajax({
                    type: "POST",
                    headers: headers,
                    url: "https://apis.openapi.sk.com/tmap/routes?version=1&format=json", //
                    async: false,
                    contentType: "application/json",
                    data: JSON.stringify({
                      reqCoordType: "WGS84GEO",
                      resCoordType: "WGS84GEO",
                      startName: "출발",
                      startX: String(marker_s.getPosition()._lng),
                      startY: String(marker_s.getPosition()._lat),
                      startTime: "202111121314",
                      passList: passList,
                      endName: "도착",
                      endX: String(marker_e.getPosition()._lng),
                      endY: String(marker_e.getPosition()._lat),
                      searchOption: "0",
                    }),

                    success: function (response) {
                      var ptrcl = response;
                      drawData(ptrcl, map); // drawData 함수 호출

                    },
                    error: function (request, status, error) {
                      console.log(
                        "code:" +
                          request.status +
                          "\n" +
                          "message:" +
                          request.responseText +
                          "\n" +
                          "error:" +
                          error
                      );
                    },
                  }); //경로 그리기

                } else if (i==2) {
                   marker2 = new Tmapv2.Marker({
                      position: new Tmapv2.LatLng(lat[0],lng[0]),
                      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
                      iconSize: new Tmapv2.Size(24, 38),
                      map: map,
                    });

                    marker3 = new Tmapv2.Marker({
                      position: new Tmapv2.LatLng(lat[1],lng[1]),
                      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
                      iconSize: new Tmapv2.Size(24, 38),
                      map: map,
                    });

                    var passList2 = lng[0]+","+lat[0]+"_"+lng[1]+","+lat[1];

                    $.ajax({
                      type: "POST",
                      headers: headers,
                      url: "https://apis.openapi.sk.com/tmap/routes?version=1&format=json", //
                      async: false,
                      contentType: "application/json",
                      data: JSON.stringify({
                        reqCoordType: "WGS84GEO",
                        resCoordType: "WGS84GEO",
                        startName: "출발",
                        startX: String(marker_s.getPosition()._lng),
                        startY: String(marker_s.getPosition()._lat),
                        startTime: "202111121314",
                        passList: passList2,
                        endName: "도착",
                        endX: String(marker_e.getPosition()._lng),
                        endY: String(marker_e.getPosition()._lat),
                        searchOption: "0",
                      }),

                      success: function (response) {
                        var ptrcl = response;
                        drawData(ptrcl, map); // drawData 함수 호출

                      },
                      error: function (request, status, error) {
                        console.log(
                          "code:" +
                            request.status +
                            "\n" +
                            "message:" +
                            request.responseText +
                            "\n" +
                            "error:" +
                            error
                        );
                      },
                    }); // 경로 그리기

                  } else {
                    
                      marker4 = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(lat[0],lng[0]),
                        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
                        iconSize: new Tmapv2.Size(24, 38),
                        map: map,
                      });
                      
                      marker5 = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(lat[1],lng[1]),
                        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
                        iconSize: new Tmapv2.Size(24, 38),
                        map: map,
                      });

                      marker6 = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(lat[2],lng[2]),
                        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
                        iconSize: new Tmapv2.Size(24, 38),
                        map: map,
                      });

                      var passList3 = lng[0]+","+lat[0]+"_"+lng[1]+","+lat[1]+"_"+lng[2]+","+lat[2];

                      $.ajax({
                        type: "POST",
                        headers: headers,
                        url: "https://apis.openapi.sk.com/tmap/routes?version=1&format=json", //
                        async: false,
                        contentType: "application/json",
                        data: JSON.stringify({
                          reqCoordType: "WGS84GEO",
                          resCoordType: "WGS84GEO",
                          startName: "출발",
                          startX: String(marker_s.getPosition()._lng),
                          startY: String(marker_s.getPosition()._lat),
                          startTime: "202111121314",
                          passList: passList3,
                          endName: "도착",
                          endX: String(marker_e.getPosition()._lng),
                          endY: String(marker_e.getPosition()._lat),
                          searchOption: "0",
                        }),

                        success: function (response) {
                          var ptrcl = response;
                          drawData(ptrcl, map); // drawData 함수 호출

                        },
                        error: function (request, status, error) {
                          console.log(
                            "code:" +
                              request.status +
                              "\n" +
                              "message:" +
                              request.responseText +
                              "\n" +
                              "error:" +
                              error
                          );
                        },
                      }); // 경로 그리기

                  }

              } // success
            }); // ajax

          } // success
        }); // ajax
      }); // btn_select

    }, []); // useEffect

  return (
    <div className="Map">

      <div className="sidebar">
        <input
          type="text"
          className="startPoint"
          id="startPoint"
          name="startPoint"
          placeholder="출발지를 입력해주세요."
        ></input>
        <button id="btn_start">출발지 입력</button>

        <div className="sidebarEnd"></div>

        <input
          type="text"
          className="endPoint"
          id="endPoint"
          name="endPoint"
          placeholder="도착지를 입력해주세요."
        ></input>

        <button id="btn_end">도착지 입력</button>
        <button id="btn_select">시작하기</button>
      </div>

      <div className="sidebar2">
        <div className="title"></div>
        <div className="rst_wrap">
          <div className="rst mCustomScrollbar">
            <ul id="searchResult" name="searchResult">
              <p>
                안전경로를 추천해줍니다:)
                <br />
                우선 출발지, 도착지를 입력하고 지도에서 선택해주세요!
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
        }}
      ></div>

    </div>
  );
};

export default Map;