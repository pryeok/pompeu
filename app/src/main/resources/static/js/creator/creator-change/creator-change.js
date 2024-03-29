  var cThumbNail = document.querySelector("#thumbnail");
  var cThumbNailFile = document.querySelector("#thumbnail-file");
  var cFileName = document.querySelector("#file-name");
  var cName = document.querySelector("input[name=name]");
  var cNickName = document.querySelector("input[name=nickName]");
  var cEmail = document.querySelector("input[name=email]");
  var cPassword = document.querySelector("input[name=password]");
  var cPasswordCheck = document.querySelector("#passwordCheck");
  var cPhone = document.querySelector("input[name=phone]");
  var cInfo = document.querySelector("input[name=info]");
  var cBank = document.querySelector("input[name=bank]");
  var cAccount = document.querySelector("input[name=account]");
  
  var cBankDefault = document.querySelector("#bank-input-default");

  var TBtn = document.querySelector("#thumbnail-file-button");
  var CBtn = document.querySelector("#check-btn");
  var UBtn = document.querySelector("#update-btn");
  var DBtn = document.querySelector("#delete-btn");

	var nickCheck=false;
	
  fetch("/creatorChange/getCreator")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
	console.log(result);
      cName.placeholder = result.name;
      cNickName.placeholder = result.nickName;
      cEmail.placeholder = result.email;
      cPhone.placeholder = result.phone;
      
      if (result.info == "" || result.info == null) {
      cInfo.placeholder = "";
      } else {        
      cInfo.placeholder = result.info;
      }

      if (result.bank == "" || result.bank == null) {
      cBankDefault.innerHTML = "";
      } else {        
      cBankDefault.innerHTML = result.bank;
      }

      if (result.account == "" || result.account == null) {
      cAccount.placeholder = "";
      } else {        
      cAccount.placeholder = result.account;
      }

      
      
      if (result.img != null) {
    	  cThumbNail.src = "/creatorChange/image?filename=" + result.img;
      } else if (result.img == null){
				cThumbNail.src = "/creatorChange/image?filename=default.jpg";
			}
    });

	cThumbNailFile.addEventListener("change", function(){
		cFileName.innerHTML = cThumbNailFile.value.substr(12);
	})
	
	CBtn.onclick = function() {  
		fetch(`/creatorChange/checkNickname?nickname=${cNickName.value}`)
		.then(function(response) {
      return response.json();
    })
    .then(function(result) {
		  if (cNickName.value ==""){
						 Swal.fire({
                    icon: 'warning',
                    title: "중복확인을 하려면 닉네임을 입력해주세요",
                });
			//window.alert("중복확인을 하려면 닉네임을 입력해주세요");
      return;
		  } else if(result == 0){
			 Swal.fire({
                    icon: 'success',
                    title: "사용가능한 닉네임입니다",
                });
			//window.alert("사용가능한 닉네임입니다");
			nickCheck=true;
			cNickName.style = "background-color:white"
			cNickName.readOnly = true;
			return;
		  } else if (result == 1){
			 Swal.fire({
                    icon: 'warning',
                    title: "이미 사용중인 닉네임입니다",
                });
			//window.alert("이미 사용중인 닉네임입니다");
			nickCheck=false;
			cNickName.style = "background-color:#f5a0a0";
			return;
		  }
    });
	}

  UBtn.onclick = function() {
		
		if (cNickName.value !="" && nickCheck==false){
			 Swal.fire({
                    icon: 'warning',
                    title: "닉네임 중복 체크를 해주세요",
                });
			//window.alert("닉네임 중복 체크를 해주세요");
			cNickName.style = "background-color:#f5a0a0";
			
				  if (cPassword.value != cPasswordCheck.value ) {
			 Swal.fire({
                    icon: 'warning',
                    title: "비밀번호와 비밀번호 확인 값이 같지 않습니다.",
                });
		      //window.alert("비밀번호와 비밀번호 확인 값이 같지 않습니다.");
					cPassword.style = "background-color:#f5a0a0";
					cPasswordCheck.style = "background-color:#f5a0a0";
					return;
		    } else if (cPassword.value == cPasswordCheck.value) {
					cPassword.style = "background-color:white";
					cPasswordCheck.style = "background-color:white";
					return;
		    };
			
		} else if (cNickName.value =="") {
			cNickName.style = "background-color:white";
			
				  if (cPassword.value != cPasswordCheck.value ) {
			 Swal.fire({
                    icon: 'warning',
                    title: "비밀번호와 비밀번호 확인 값이 같지 않습니다.",
                });
		      //window.alert("비밀번호와 비밀번호 확인 값이 같지 않습니다.");
					cPassword.style = "background-color:#f5a0a0";
					cPasswordCheck.style = "background-color:#f5a0a0";
					return;
		    } else if (cPassword.value == cPasswordCheck.value) {
					cPassword.style = "background-color:white";
					cPasswordCheck.style = "background-color:white";
		    };
			
		}
	  
	  var fd = new FormData(document.forms.namedItem("form1"));
	    
    //if (xReadDate.value == "") { // 독서일을 지정하지 않았으면 서버에 보내지 않는다.
     // fd.delete("readDate");
    //}
    
    // 변경할 독서록 데이터의 PK 값을 FormData에 추가한다.
    //fd.append("no", userNo);
    
    fetch("/creatorChange/updateCreator", { 
        method: "POST",
        body: fd
      }) 
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        console.log(text);
				window.location.reload();
      });
  };

  DBtn.onclick = function() {
	    window.location.href = "creator-delete.html";
}


 function preView(tag){
      var reader = new FileReader();
      // files메서드는 배열로 반환되기 때문에 멀티파일도 처리가능하다.
       console.log(this);
      console.log(tag.files[0]);
     reader.readAsDataURL(tag.files[0]);
      reader.onload = function() {
          // 여기서의 this는 reader객체
          cThumbNail.src = this.result;
      }
} 
