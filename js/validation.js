const id = document.querySelector('#id');
const pw1 = document.querySelector('#pswd1');
const pwMsg = document.querySelector('#alertTxt');
const pwImg1 = document.querySelector('#pswd1_img1');

const pw2 = document.querySelector('#pswd2');
const pwImg2 = document.querySelector('#pswd2_img1');
const pwMsgArea = document.querySelector('.int_pass');

const userName = document.querySelector('#name');

const yy = document.querySelector('#yy');
const mm = document.querySelector('#mm');
const dd = document.querySelector('#dd');

const gender = document.querySelector('#gender');

const email = document.querySelector('#email');

const mobile = document.querySelector('#mobile');

const error = document.querySelectorAll('.error_next_box');





/*이벤트 핸들러 연결*/


id.addEventListener("focusout", checkId);
pw1.addEventListener("focusout", checkPw);
pw2.addEventListener("focusout", comparePw);
userName.addEventListener("focusout", checkName);
yy.addEventListener("focusout", isBirthCompleted);
mm.addEventListener("focusout", isBirthCompleted);
dd.addEventListener("focusout", isBirthCompleted);
gender.addEventListener("focusout", function() {
    if(gender.value === "성별") {
        error[5].style.display = "block";
    } else {
        error[5].style.display = "none";
    }
})
email.addEventListener("focusout", isEmailCorrect);
mobile.addEventListener("focusout", checkPhoneNum);





/*콜백 함수*/


function checkId() {
    const idPattern = /[a-zA-Z0-9!@#*]{5,20}/;
    if(id.value === "") {
        error[0].innerHTML = "필수 정보입니다.";
        error[0].style.display = "block";
    } else if(!idPattern.test(id.value)) {
        error[0].innerHTML = "5~20자의 영문 소문자, 숫자와 특수기호(!),(@),(#),(*)만 사용 가능합니다.";
        error[0].style.display = "block";
    } else {
        error[0].innerHTML = "사용가능한 아이디입니다!";
        error[0].style.color = "#08A600";
        error[0].style.display = "block";
    }
}

function checkPw() {
    const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
    if(pw1.value === "") {
        error[1].innerHTML = "필수 정보입니다.";
        error[1].style.display = "block";
    } else if(!pwPattern.test(pw1.value)) {
        error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용불가";
        pwMsgArea.style.paddingRight = "93px";
        error[1].style.display = "block";
        
        pwMsg.style.display = "block";
        pwImg1.src = "../images/m_icon_not_use.png";
    } else {
        error[1].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsg.style.display = "block";
        pwMsg.style.color = "#03c75a";
        pwImg1.src = "../images/m_icon_safe.png";
    }
}

function comparePw() {
    if(pw2.value === pw1.value && pw2.value != "") {
        pwImg2.src = "../images/m_icon_check_enable.png";
        error[2].style.display = "none";
    } else if(pw2.value !== pw1.value) {
        pwImg2.src = "../images/m_icon_check_disable.png";
        error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[2].style.display = "block";
    } 

    if(pw2.value === "") {
        error[2].innerHTML = "필수 정보입니다.";
        error[2].style.display = "block";
    }
}

function checkName() {
    const namePattern = /[a-zA-Z가-힣]/;
    if(userName.value === "") {
        error[3].innerHTML = "필수 정보입니다.";
        error[3].style.display = "block";
    } else if(!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
        error[3].innerHTML = "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
        error[3].style.display = "block";
    } else {
        error[3].style.display = "none";
    }
}


function isBirthCompleted() {
    const yearPattern = /[0-9]{4}/;

    if(!yearPattern.test(yy.value)) {
        error[4].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
        error[4].style.display = "block";
    } else {
        isMonthSelected();
    }


    function isMonthSelected() {
        if(mm.value === "월") {
            error[4].innerHTML = "태어난 월을 선택하세요.";
        } else {
            isDateCompleted();
        }
    }

    function isDateCompleted() {
        if(dd.value === "") {
            error[4].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
        } else {
            isBirthRight();
        }
    }
}



function isBirthRight() {
    const datePattern = /\d{1,2}/;
    if(!datePattern.test(dd.value) || Number(dd.value)<1 || Number(dd.value)>31) {
        error[4].innerHTML = "생년월일을 다시 확인해주세요.";
    } else {
        checkAge();
    }
}

function checkAge() {
    if(Number(yy.value) < 1900) {
        error[4].innerHTML = "정말입니까??";
        error[4].style.display = "block";
    } else if(Number(yy.value) > 2023) {
        error[4].innerHTML = "미래를 입력할 수 없습니다.";
        error[4].style.display = "block";
    }  else {
        error[4].style.display = "none";
    }
}


function isEmailCorrect() {
    const emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

    if(email.value === ""){ 
        error[6].style.display = "none"; 
    } else if(!emailPattern.test(email.value)) {
        error[6].style.display = "block";
    } else {
        error[6].style.display = "none"; 
    }

}

function checkPhoneNum() {
    const isPhoneNum = /([01]{2})([01679]{1})([0-9]{3,4})([0-9]{4})/;

    if(mobile.value === "") {
        error[7].innerHTML = "필수 정보입니다.";
        error[7].style.display = "block";
    } else if(!isPhoneNum.test(mobile.value)) {
        error[7].innerHTML = "형식에 맞지 않는 번호입니다.";
        error[7].style.display = "block";
    } else {
        error[7].style.display = "none";
    }

    
}
const btnJoin = document.querySelector('#btnJoin');

btnJoin.addEventListener('click', join);

function join() {
    alert("회원가입 성공!")
};




const saveUserInfo = () => {
    const frm = document.signupFrm;
    const id = frm.id;
    const pw1 = frm.pswd1;
    const pw2 = frm.pswd2;
    const userName = frm.name;
    const yy = frm.yy;
    const mm = frm.mm;
    const dd = frm.dd;
    const gender = frm.gender;
    const email = frm.email;
    const mobile = frm.mobile;

    const userInfo = new UserInfo(id.value, pw1.value, userName.value, gender.value, email.value, mobile.value);

    const userInfos = JSON.parse(localStorage.getItem('userInfos')) || [];
    userInfos.push(userInfo);
    const jsonStr = JSON.stringify(userInfos);
    localStorage.setItem("userInfos", jsonStr);

    // 초기화 
    id.value = '';
    pw1.value = '';
    pw2.value = '';
    userName.value = '';
    yy.value = '';
    mm.value = '';
    dd.value = '';
    gender.value = '';
    email.value = '';
    mobile.value = '';

}


function UserInfo(id, pw1, userName, gender, email, mobile){
    this.id = id;
    this.pw1 = pw1;
    this.userName = userName;
    this.gender = gender;
    this.email = email;
    this.mobile = mobile;
}




    




