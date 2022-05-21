// 템플릿 엔진에서 사용할 HTML 조각을 가져오기
var trTemplate = document.querySelector("#tr-template");
var trTemplate2 = document.querySelector("#tr-template2");
var trTemplate3 = document.querySelector("#tr-template3");
var trTemplate4 = document.querySelector("#tr-template4");

//템플릿 엔진 준비
var htmlGenerator = Handlebars.compile(trTemplate.innerHTML);
var htmlGenerator2 = Handlebars.compile(trTemplate2.innerHTML);
var htmlGenerator3 = Handlebars.compile(trTemplate3.innerHTML);
var htmlGenerator4 = Handlebars.compile(trTemplate4.innerHTML);
  
// Can also be used with $(document).ready()
$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide"
  });
});

// 1) URL에서 쿼리스트링(query string)을 추출한다.
var arr = location.href.split("?");
console.log(arr);

if (arr.length == 1) {
  alert("요청 형식이 옳바르지 않습니다.")
  throw "URL 형식 오류!";
}

var qs = arr[1];
console.log(qs);

// 2) 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get("no");

if (no == null) {
  alert("독서록 번호가 없습니다.");
  throw "파라미터 오류!";
}
console.log(no);


var lectureInfo = document.querySelector(".lecture-introduce");
var info = document.querySelector(".teacher-introduce");
var askContent = document.querySelector("#ask-content");
var addingAsk;
 
fetch(`/userLecture/findLecture?no=${no}`)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  console.log("AAA");
  console.log(result);
  
lectureInfo.innerHTML = result[0].lectureInfo;
info.innerHTML = result[0].info;
})


var userContent = document.querySelector("#user-content");
  
fetch(`/userLecture/userContent?no=${no}`)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  console.log("AAA");
  console.log(result);
  
$("#user-con").html(htmlGenerator2(result));
})


var creatorContent = document.querySelector("#creator-content");
 
fetch(`/userLecture/creatorContent?no=${no}`)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  console.log("AAA");
  console.log(result);
  
$("#creator-content").html(htmlGenerator4(result));
})


var creatorContent = document.querySelector(".creator-content");
 
fetch(`/userLecture/creatorPro?no=${no}`)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  console.log("AAA");
  console.log(result);
    
$("#creator-con").html(htmlGenerator3(result));
})
     
     
var lectureImage = [];
lectureImage[0] = document.querySelector("#lecture-image0");
lectureImage[1] = document.querySelector("#lecture-image1");
lectureImage[2] = document.querySelector("#lecture-image2");
lectureImage[3] = document.querySelector("#lecture-image3");
 
fetch(`/userLecture/addImage?no=${no}`)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  console.log("BBB");
  console.log(result);
  
  for (i=0; i<4; i++){
    if (result[i].image == null) {
      result[i].image = "default.jpg";
    }
    lectureImage[i].innerHTML = `<img src="/userLecture/image?filename=${result[i].image}" width="350px" height="210px">`; 
  }
})


var exercise = document.querySelector(".exercise");
var lectureName = document.querySelector(".lecture-name");
var maxMember = document.querySelector(".max-member");
var lecturePrice = document.querySelector(".lecture-price");

fetch(`/userLecture/registLecture?no=${no}`)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  console.log("AAA");
  console.log(result);
 
 exercise.innerHTML = result[0].exName;
 lectureName.innerHTML = result[0].name;
 maxMember.innerHTML = `최대인원: ${result[0].maxMember} 명`;
 lecturePrice.innerHTML = `수강금액: ${result[0].lecturePrice}원`;
 addingAsk = result[0].lectureNo;
 })
 
 
var lectureDate = document.querySelector("#lecture-date");
var lectureTime = document.querySelector("#lecture-time");
 
fetch(`/userLecture/registTime?no=${no}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
  console.log("AAA");
  console.log(result);
  
  $("#time-box").html(htmlGenerator(result));
})

     
var regionIntroduce = document.querySelector(".region-introduce");
     
  fetch(`/userLecture/mapping?no=${no}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      console.log("AAA");
      console.log(result);

          
add = result[0].address
regionIntroduce.innerHTML = add;
        
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
     

var regionSi = document.querySelector(".region-si");
 
   fetch(`/userLecture/siSep2?no=${no}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log("AAA");
    console.log(result);
  si = result[0].address
  regionSi.innerHTML = si;
})

    
    
var lectureAsk = document.querySelector("#lecture-ask");
    
document.querySelector("#btn-ask").onclick = function() {
  if (lectureAsk.value == "") {
    window.alert("필수 입력 항목이 비어 있습니다.");
    return;
  }
  fetch(`/userLecture/addAsk?no=${no}&content=${lectureAsk.value}`)
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    console.log(text);
      
  location.reload();
  });
};


var selectedTimeNo;

function registBtn(e) {
    selectedTimeNo = e.target.getAttribute("data-no");
}

document.querySelector("#btn-regist").onclick = function() {
    
  console.log(selectedTimeNo)
  
  fetch(`/userLecture/add?lectureTimeNo=${selectedTimeNo}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result);

  location.href = '/user/payment/myorder.html/'
  });
};


var contentAsk = document.querySelector("#lecture-ask");

document.querySelector("#btn-ask").onclick = function() {
  if (lectureAsk.value == "") {
  window.alert("필수 입력 항목이 비어 있습니다.");
  return;
}
    
askText = contentAsk.value;
  
  fetch(`/userLecture/addAsk?lectureNo=${addingAsk}&askContent=${askText}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result);
    
    location.reload();
  });
};

var zzimCheck = 0;
var xHeart = document.querySelector("#x-heart");

document.querySelector("#x-btn-zzim").onclick = function() {
  console.log("wishlist");
  console.log(no);
  
  if (zzimCheck == 0) {
    xHeart.style.color = "red";
    zzimCheck = 1;
  } else if (zzimCheck == 1) {
    xHeart.style.color = "black";
    zzimCheck = 0;
  }

  fetch(`/userLecture/wishlistAdd?lectureNo=${no}`)
  .then(function(response) {
    return response.text();
  })
  .then(function(result) {
    console.log(result);
   });
};