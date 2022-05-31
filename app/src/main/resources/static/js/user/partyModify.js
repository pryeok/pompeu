// 템플릿 엔진에서 사용할 HTML 조각을 가져오기
var trTemplate = document.querySelector("#tr-template");

//템플릿 엔진 준비
var htmlGenerator = Handlebars.compile(trTemplate.innerHTML);

// 운동 Tag 목록 가져오기
 fetch("/userparty/tag")
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    $("#x-ex-tag").html(htmlGenerator(result));
  });
  
  // 실내외선택
$("select[name=inOutEx]").change(function() {
  console.log($(this).val());  // value 값 가져오기
  console.log($("select[name=inOutEx] option:selected").text());  // text 값 가져오기
});
  
// 운동 선택
$("select[name=tagNo]").change(function() {
  console.log($(this).val());   //value값 가져오기
  console.log($("select[name=tagNo] option:selected").text());  // text 값 가져오기
});

// 모집인원
$("select[name=maxMember]").change(function() {
  console.log($(this).val());  // value 값 가져오기
  console.log($("select[name=maxMember] option:selected").text());  // text 값 가져오기
});

var xTitle = document.querySelector("input[name=title]");
var xCrew = document.querySelector("select[name=maxMember]");
var xContent = document.querySelector("textarea");
var xStartDate = document.querySelector("input[name=startDate]");
var xEndDate = document.querySelector("input[name=endDate]");
var xInOutEx = document.querySelector("select[name=inOutEx]");
var xExTag = document.querySelector("select[name=tagNo]");
var xAddress = document.querySelector("input[name=address]");
var xFile = document.querySelector("input[name=file]");

document.querySelector("#x-update-btn").onclick = function() {
  
   if(xTitle.value == "" || 
      xCrew.value == "" ||
      xContent.value == "" ||
      xStartDate.value == "" || 
      xEndDate.value == "" || 
      xInOutEx.value == "" ||
      xExTag.value == "" ||
      xAddress.value == "" ||
      xFile.value == "" ) {
    window.alert("필수 입력 항목이 비어있습니다.");
    return;
    }
    
var fd = new FormData(document.forms.namedItem("form1"));

  
fetch("/userparty/add",{  
    method: "POST",
    body: fd
  }) 
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result);
  });
 location.href = 'party-home.html'
};
  

// 다음 주소 api
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}  


