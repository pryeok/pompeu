const xName = document.querySelector('input[name=name]');
const xNickName = document.querySelector('input[name=nickName]');
const xJoinEmail = document.querySelector('input[name=email]');
const xJoinPassword = document.querySelector('input[name=password]');
const xPasswordchk = document.querySelector('#passwordcheck');
const xJoinPhone = document.querySelector('input[name=phone]');
const xBtn = document.querySelector('.btn_submit');
const nickNameBtn = document.querySelector('.btn_nickname');
const emailBtn = document.querySelector('.btn_email');
const xCreatorBtn = document.querySelector('.creator_submit');
// const save = {
//     name: xName.value,
//     nickName: xNickName.value,
//     email: xJoinEmail.value,
//     password: xJoinPassword.value,
//     phone: xJoinPhone.value
// };
// $().ready(function () {
//     Swal.fire({
//         icon: 'warning',
//         title: 'Alert가 실행되었습니다.',
//         text: '이곳은 내용이 나타나는 곳입니다.',
//     });



//     $("#confirmStart").click(function () {
// Swal.fire({
//     title: '정말로 그렇게 하시겠습니까?',
//     text: "다시 되돌릴 수 없습니다. 신중하세요.",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: '승인',
//     cancelButtonText: '취소',
//     reverseButtons: true, // 버튼 순서 거꾸로

//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 '승인이 완료되었습니다.',
//                 '화끈하시네요~!',
//                 'success'
//             )
//         }
//     })
// });


// });







let nicknameCheck = nickNameBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    fetch(`/user/nickcheck?nickname=${xNickName.value}`)
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            if (data == 'success') {

                Swal.fire({
                    icon: 'success',
                    title: '사용가능한 닉네임입니다.',
                });
                nickNameBtn.value = 'Y';
                $("#memberEmail").focus();
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '이미 사용중인 닉네임입니다.',
                });
                const input = xNickName.focus();
            }

        })
});

emailBtn.addEventListener('click', function (e) {

    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if ($("#nicknameCheck").val() != 'Y') {
        Swal.fire({
            icon: 'warning',
            title: '닉네임 중복확인을 해주세요.',
        });
        return false;
    }


    if (!emailRule.test($("#memberEmail").val())) {
        Swal.fire({
            icon: 'warning',
            title: '유효하지않은 E-mail주소입니다.',
            text: 'ex) email.gmail.com',
        });
        $("#memberEmail").focus();
        return false;
    }
    e.preventDefault();
    e.stopPropagation();
    fetch(`/user/emailcheck?email=${xJoinEmail.value}`)
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            if (data == 'success') {
                Swal.fire({
                    icon: 'success',
                    title: '이메일인증이 완료되었습니다.',
                });
                emailBtn.value = 'Y';
                $("#password").focus();
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '이미 가입되어있는 회원입니다.',
                });
                const input = xNickName.focus();
            }
        })
});



xBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const telRule = /^\d{2,3}-\d{3,4}-\d{4}$/;

    if ($("#memberName").val() == null || $("#memberName").val() == "") {
        Swal.fire({
            icon: 'warning',
            title: '이름을 입력해주세요.',
        });
        $("#memberName").focus();

        return false;
    }

    if ($("#memberNickName").val() == null || $("#memberNickName").val() == "") {
        Swal.fire({
            icon: 'warning',
            title: '닉네임을 입력해주세요.',
        });
        $("#memberNickName").focus();

        return false;
    }

    if ($("#nicknameCheck").val() != 'Y') {
        Swal.fire({
            icon: 'warning',
            title: '닉네임 중복확인을 해주세요.',
        });
        $("#memberNickName").focus();

        return false;
    }


    if ($("#memberEmail").val() == null || $("#memberEmail").val() == "") {
        Swal.fire({
            icon: 'warning',
            title: '이메일을 입력해주세요.',
        });
        $("#memberEmail").focus();

        return false;
    }



    if ($("#emailCheck").val() != 'Y') {
        Swal.fire({
            icon: 'warning',
            title: '이메일 중복확인을 해주세요.',
        });
        $("#emailCheck").focus();

        return false;
    }




    if ($("#password").val() == null || $("#password").val() == "") {
        Swal.fire({
            icon: 'warning',
            title: '비밀번호를 입력해주세요.',
        });
        $("#password").focus();

        return false;
    }

    if ($("#passwordCheck").val() == null || $("#passwordCheck").val() == "") {
        Swal.fire({
            icon: 'warning',
            title: '비밀번호확인을 입력해주세요.',
        });
        $("#passwordCheck").focus();

        return false;
    }

    if ($("#password").val() != $("#passwordCheck").val()) {
        Swal.fire({
            icon: 'warning',
            title: '비밀번호가 일치하지 않습니다.',
        });
        $("#passwordCheck").focus();

        return false;
    }

    if (!emailRule.test($("#memberEmail").val())) {
        Swal.fire({
            icon: 'warning',
            title: '유효하지않은 E-mail주소입니다.',
            text: 'ex) email.gmail.com',
        });
        $("#memberEmail").focus();
        return false;
    }

    if ($("#memberPhone").val() == null || $("#memberPhone").val() == "") {
        Swal.fire({
            icon: 'warning',
            title: '휴대폰번호를 입력해주세요.',
        });
        $("#memberPhone").focus();

        return false;
    }

    if (!telRule.test($("#memberPhone").val())) {
        Swal.fire({
            icon: 'warning',
            title: '휴대폰 번호가 올바르지 않습니다.',
            text: '010-1111-2222',
        });
        $("#memberPhone").focus();
        return false;
    }



    //  ★ 안될경우 이걸로  
    //  if (confirm('회원가입 하시겠습니까?')){
    //       fetch('/user/join', {
    //               method: 'POST',
    //               headers: {
    //                   'Content-Type': 'application/json'
    //               },
    //               body: JSON.stringify({
    //                   name: xName.value,
    //                   nickName: xNickName.value,
    //                   email: xJoinEmail.value,
    //                   password: xJoinPassword.value,
    //                   phone: xJoinPhone.value
    //               })
    //           })
    //           .then(function (resp) {
    //               console.log(resp);
    //               return resp.text();
    //           })
    //           .then(function (text) {
    //               if (text == 'success') {
    //                   Swal.fire({
    //                       icon: 'success',
    //                       title: '회원가입이 완료되었습니다.',
    //                   });
    //                       location.href = '/user/main/user-main.html';
    //                       location.replace = '/user/login/user-join.html';
    //               } else {
    //                   Swal.fire({
    //                       icon: 'warning',
    //                       title: '회원가입이 정상적으로 진행되지않았습니다.',
    //                       text: '내용을 다시 확인해주세요',
    //                   });
    //                   return false;
    //               }
    //           })
    //  }






    Swal.fire({
        title: '회원가입 하시겠습니까?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '가입',
        cancelButtonText: '취소',
        reverseButtons: false, // 버튼 순서 거꾸로

    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/user/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: xName.value,
                        nickName: xNickName.value,
                        email: xJoinEmail.value,
                        password: xJoinPassword.value,
                        phone: xJoinPhone.value
                    })
                })
                .then(function (resp) {
                    console.log(resp);
                    return resp.text();
                })
                .then(function (text) {
                    if (text == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: '회원가입이 완료되었습니다.',
                        });
                        setTimeout(function () {
                            location.href = '/user/main/user-main.html';
                            location.replace = '/user/login/user-join.html';
                        }, 2000)
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: '회원가입이 정상적으로 진행되지않았습니다.',
                            text: '내용을 다시 확인해주세요',
                        });
                        return false;
                    }
                })
        }
    })


});










// Swal.fire({
//     title: '회원가입 하시겠습니까?',
//     icon: 'info',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: '승인',
//     cancelButtonText: '취소',
//     reverseButtons: true, // 버튼 순서 거꾸로

// })



// xCreatorBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     // console.log(save);
//     fetch('http://localhost:8080/user/creatorJoin', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: xName.value,
//                 nickName: xNickName.value,
//                 email: xJoinEmail.value,
//                 password: xJoinPassword.value,
//                 phone: xJoinPhone.value
//             })
//         })
//         .then(function (resp) {
//             console.log(resp);
//             return resp.text();
//         })
//         .then(function (text) {
//             if (text == 'success') {
//                 alert('회원가입이 완료되었습니다.');
//                 location.href = '/creator2/nouse/creator_original_form.html';
//                 location.replace = '/user/login/user-join.html';
//             } else {
//                 window.alert("회원가입 실패");
//             }
//         })
// })


// $("#passwordCheck").blur(function () {
//     if ($("#passwordCheck".val() == $("#password").val())) {
//         $(".successPwcheck").text("비밀번호가 일치합니다.");
//         $(".successPwcheck").css("color", "green");
//         $("#pwDoubleChk").val("true");
//     } else {
//         $(".successPwcheck").text("비밀번호가 일치하지 않습니다.");
//         $(".successPwcheck").css("color", "red");
//         $("#pwDoubleChk").val("false");
//     }
// })










// xBtn.addEventListener('click', function () {
//     const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//     const telRule = /^\d{2,3}-\d{3,4}-\d{4}$/;


//     if ($("#memberName").val() == null || $("#memberName").val() == "") {
//         alert("이름을 입력해주세요.");
//         $("#memberName").focus();

//         return false;
//     }

//     if ($("#memberNickName").val() == null || $("#memberNickName").val() == "") {
//         alert("닉네임을 입력해주세요.");
//         $("#memberNickName").focus();

//         return false;
//     }


//     if ($("#memberEmail").val() == null || $("#memberEmail").val() == "") {
//         alert("이메일을 입력해주세요.");
//         $("#memberEmail").focus();

//         return false;
//     }



//     if ($("#emailCheck").val() != 'Y') {
//         alert("이메일 중복체크를 눌러주세요.");
//         $("#emailCheck").focus();

//         return false;
//     }




//     if ($("#password").val() == null || $("#password").val() == "") {
//         alert("비밀번호를 입력해주세요.");
//         $("#password").focus();

//         return false;
//     }

//     if ($("#passwordCheck").val() == null || $("#passwordCheck").val() == "") {
//         alert("비밀번호 확인을 입력해주세요.");
//         $("#passwordCheck").focus();

//         return false;
//     }

//     //   if ($("#memberPw").val() != $("#memberPw2").val()) {
//     //       alert("비밀번호가 일치하지 않습니다.");
//     //       $("#memberPw2").focus();

//     //       return false;
//     //   }

//     if (!emailRule.test($("#memberEmail").val())) {
//         alert("이메일을 형식에 맞게 입력해주세요. ex) email@gmail.com");
//         $("#memberEmail").focus();
//         return false;
//     }

//     if (confirm("회원가입하시겠습니까?")) {


//     }
// });













// let index = {
//     init: function () {
//         xBtn.addEventListener('click', (e) => {
//             this.save;
//         });
//     },
// };
// save: (function () {
//     let data = {
//         name: xName.value,
//         nickname: xNickname.value,
//         email: xJoinEmail.value,
//         password: xJoinPassword.value,
//         phone: xJoinPhone.value,
//     };
//     console.log(data);
// });



// const Toast = Swal.mixin({
//     toast: true,
//     position: 'center-center',
//     showConfirmButton: false,
//     timer: 30,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//         toast.addEventListener('mouseenter', Swal.stopTimer)
//         toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
// })


//      Swal.fire({
//          title: '정말로 그렇게 하시겠습니까?',
//          text: "다시 되돌릴 수 없습니다. 신중하세요.",
//          icon: 'warning',
//          showCancelButton: true,
//          confirmButtonColor: '#3085d6',
//          cancelButtonColor: '#d33',
//          confirmButtonText: '승인',
//          cancelButtonText: '취소',
//          reverseButtons: true, // 버튼 순서 거꾸로

//      }).then((result) => {
//          if (result.isConfirmed) {
//              Swal.fire(
//                  '승인이 완료되었습니다.',
//                  '화끈하시네요~!',
//                  'success'
//              )
//          }
//      })