   var arr = location.href.split("?");
  // console.log(arr);

  if (arr.length == 1) {
    alert("요청 형식이 옳바르지 않습니다.")
    throw "URL 형식 오류!";
  }

  var qs = arr[1];
  // console.log(qs);

  var params = new URLSearchParams(qs);
  var no = params.get("no");

  if (no == null) {
    alert("게시글 번호가 없습니다.");
    throw "파라미터 오류!";
  }
  console.log(no);
  
  var xTitle = document.querySelector("#x-title");
  var xPartyContent = document.querySelector("#x-partyContent");
  var xStartDate = document.querySelector("#x-startDate");
  var xEndDate = document.querySelector("#x-endDate");
  var xCrew = document.querySelector("#x-crew");
  var xTag = document.querySelector("#x-tag");
  var xNickname = document.querySelector("#x-nickname");
  var xImage = document.querySelector("#x-image");
  var xCur = document.querySelector("#x-cur");
  var xParty;
  
  fetch(`/userparty/get?no=${no}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      console.log("getparty");
      console.log(result);
      
      xTitle.innerHTML = result[0].title;
      xPartyContent.innerHTML = result[0].content;
      xStartDate.innerHTML = result[0].startDate;
      xEndDate.innerHTML = result[0].endDate;
      xCur.innerHTML = result[0].curMember;
      xCrew.innerHTML = result[0].maxMember;
      xTag.innerHTML = result[0].tag;
      xNickname.innerHTML = result[0].nickname;
      xImage.innerHTML = `<img src="/userparty/image?filename=${result[0].image}" width="430px" height="300px">`;
      
      
      xParty = result[0].partyNo;
    }) 
    

  // 지도 API 
  var xAddress = document.querySelector(".x-address");
     
    fetch(`/userparty/mapping?no=${no}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
     // console.log("map");
     // console.log(result);

    add = result[0].address;
    xAddress.innerHTML = add;
        
  var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
      };  
  
  // 지도를 생성합니다    
  var map = new kakao.maps.Map(mapContainer, mapOption); 
  
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();
  
  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(add, function(result, status) {
  
      // 정상적으로 검색이 완료됐으면 
       if (status === kakao.maps.services.Status.OK) {
  
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords
          });
  
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
      } 
  });    
})

  // 지역 Tag
  var xlocation = document.querySelector(".x-location");
   
     fetch(`/userparty/siSep?no=${no}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      // console.log("AAA");
      // console.log(result);
          
    si = result[0].address
    xlocation.innerHTML = si;
     })

   
  // 소모임 참가
  document.querySelector("#x-btn-regist").onclick = function() {
    console.log("regist");
    console.log(xParty);
    
    
    fetch(`/userparty/crewAdd?partyNo=${xParty}`)
    .then(function(response) {
      return response.text();
    })
    .then(function(result) {
      console.log(result);
      if(result == "null"){
         Swal.fire({
                    icon: 'warning',
                    title: '로그인 후 이용해주세요',
                });
              }else{
      Swal.fire({
                    icon: 'success',
                    title: '소모임 참여가 완료되었습니다.',
                });
        
      }
    });
  }; 
  
  var zzimCheck = 0;
  var xHeart = document.querySelector("#x-heart");
    
  // 소모임 찜하기
  document.querySelector("#x-btn-zzim").onclick = function() {
    console.log("wishlist");
    console.log(xParty);
    
    if (zzimCheck == 0) {
      xHeart.style.color = "red";
      zzimCheck = 1;
    } else if (zzimCheck == 1) {
      xHeart.style.color = "black";
      zzimCheck = 0;
    }
    
    
    fetch(`/userparty/wishlistAdd?partyNo=${xParty}`)
    .then(function(response) {
      return response.text();
    })
    .then(function(result) {
      console.log(result);
     //location.href = '/user/party/party-home.html/'
     });
     
  };
    
   // 소모임 신고하기
  document.querySelector("#btn-claim").onclick = function() {
    console.log("claim");
    console.log(xParty);
    
    
    fetch(`/userparty/claimAdd?partyNo=${xParty}`)
    .then(function(response) {
      return response.text();
    })
    .then(function(result) {
      console.log(result);
         Swal.fire({
                    icon: 'success',
                    title: '신고 신청이 완료되었습니다.',
                });
    });           
  };
  
  // 소모임 글 삭제
  document.querySelector("#x-delete-btn").onclick = function() {
    fetch(`/board/delete?no=${no}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if (result.status == "success") {
        location.href = "?party-home.html";
        location.href = "?content=/board/index.html";
      } else {
        window.alert("게시글 삭제 실패!");
        console.log(result.data);
      }
    });
  };