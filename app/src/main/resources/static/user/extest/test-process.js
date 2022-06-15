	var btn1 = document.querySelector("#test-answer-1");
	var btn2 = document.querySelector("#test-answer-2");
	
	var count = 1;
	
	var process = document.querySelector("#test-process");
	var question = document.querySelector("#test-question");
	
	var outIn = 0;
	var safeRisk = 0;
	var aloneTeam = 0;
	var poorRich = 0;
	
	btn1.onclick = function() {  
		
			switch (count) {
  			case 1:
    		btn1.innerHTML = "추천했으니 맛있겠지! 당당히 베스트라고 붙어있는 메뉴";
    		btn2.innerHTML = "내 길은 내가 정한다! 사진을 보고 가장 필이 오는 메뉴";
				process.innerHTML = "2/12";
				question.innerHTML = "유명 SNS 맛집에 왔다. 당신의 메뉴 선택은?";
				outIn++;
				count++;
   			break;
  			case 2:
    		btn1.innerHTML = "조용히 힐링할수 있는 한적한 장소";
    		btn2.innerHTML = "언제나 사람이 북적이는 인기있는 장소";
				process.innerHTML = "3/12";
				question.innerHTML = "간만에 받은 휴가다! 당신이 검색한 여행스팟은?";
				safeRisk++;
				count++;
   			break;
  			case 3:
    		btn1.innerHTML = "바로 입금하러간다";
    		btn2.innerHTML = "오늘 저녁은 치킨이닭";
				process.innerHTML = "4/12";
				question.innerHTML = "코트를 뒤져보니 만 원 짜리 몇장이 나왔다";
				aloneTeam++;
				count++;
   			break;
  			case 4:
    		btn1.innerHTML = "계획한게 있으니 고대로 땡볕으로 전진한다";
    		btn2.innerHTML = "계획은 깨지기 위해 있는거다. 호캉스로 변경한다";
				process.innerHTML = "5/12";
				question.innerHTML = "필리핀 자유여행 3일차. 호텔서 나가기 전 핸드폰을 보는데 유래없는 폭염이란다";
				poorRich++;
				count++;
   			break;
  			case 5:
    		btn1.innerHTML = "이돈이 어디야. 얌전히 주머니로 집어넣는다";
    		btn2.innerHTML = "무조건 직진! 당첨금액 전부로 다시산다";
				process.innerHTML = "6/12";
				question.innerHTML = "로또 50,000원에 당첨됬다. 당신은...?";
				outIn++;
				count++;
   			break;
  			case 6:
    		btn1.innerHTML = "난 너무 바쁘다. 혼자 보내느라";
    		btn2.innerHTML = "난 너무 바쁘다. 이미 다른 모임서 불태울 예정이라";
				process.innerHTML = "7/12";
				question.innerHTML = "오늘은 목요일. 단톡서 내일을 불태울 파티가 한창 모집중이다";
				safeRisk++;
				count++;
   			break;
  			case 7:
    		btn1.innerHTML = "당근을 켠다";
    		btn2.innerHTML = "키보드는 갬성이지. 고성능으로 추천받으러 간다";
				process.innerHTML = "8/12";
				question.innerHTML = "키보드가 망가졌다. 핸드폰을 켜고 당신은...?";
				aloneTeam++;
				count++;
   			break;
  			case 8:
    		btn1.innerHTML = "있다";
    		btn2.innerHTML = "없다";
				process.innerHTML = "9/12";
				question.innerHTML = "지금 자기 방 안에 선크림이";
				poorRich++;
				count++;
   			break;
  			case 9:
    		btn1.innerHTML = "진짠가? 친구 말이 맞나보다 하고 넘어간다";
    		btn2.innerHTML = "일단 돈부터 꺼낸다";
				process.innerHTML = "10/12";
				question.innerHTML = "친구가 말도 안되는걸 우기며 내기를 하자 한다. 당신은...?";
				outIn++;
				count++;
   			break;
  			case 10:
    		btn1.innerHTML = "티켓 한장 주문입니다! 영화 티켓 단 하나!";
    		btn2.innerHTML = "같이 보러갈 사람부터 구한다";
				process.innerHTML = "11/12";
				question.innerHTML = "보고싶은 영화가 오늘 나왔다. 당신은";
				safeRisk++;
				count++;
   			break;
  			case 11:
    		btn1.innerHTML = "충동적인 감정일수도 있다. 일단 원데이클래스부터 알아본다";
    		btn2.innerHTML = "문자가 온다. 야마하 CP-88을 구매해주셔서 감사합...";
				process.innerHTML = "12/12";
				question.innerHTML = "갑자기 음악이 좀 하고 싶어졌다";
				aloneTeam++;
				count++;
			  console.log("outIn:" + outIn);
        console.log("safeRisk:" + safeRisk);
        console.log("aloneTeam:" + aloneTeam);
        console.log("poorRich:" + poorRich);
   			break;

   			
  			case 12:
				poorRich++;
				
				console.log("outIn:" + outIn);
				console.log("safeRisk:" + safeRisk);
				console.log("aloneTeam:" + aloneTeam);
				console.log("poorRich:" + poorRich);
				
				window.location.href = "/user/extest/test-result.html";
   			break;
  			default:
        console.log("호에에엥1");
        break;
		}
	}
	
		btn2.onclick = function() {  
    
      switch (count) {
        case 1:
        btn1.innerHTML = "추천했으니 맛있겠지! 당당히 베스트라고 붙어있는 메뉴";
        btn2.innerHTML = "내 길은 내가 정한다! 사진을 보고 가장 필이 오는 메뉴";
        process.innerHTML = "2/12";
        question.innerHTML = "유명 SNS 맛집에 왔다. 당신의 메뉴 선택은?";
        outIn--;
        count++;
        break;
        case 2:
        btn1.innerHTML = "조용히 힐링할수 있는 한적한 장소";
        btn2.innerHTML = "언제나 사람이 북적이는 인기있는 장소";
        process.innerHTML = "3/12";
        question.innerHTML = "간만에 받은 휴가다! 당신이 검색중인 여행스팟은?";
        safeRisk--;
        count++;
        break;
        case 3:
        btn1.innerHTML = "바로 입금하러간다";
        btn2.innerHTML = "오늘 저녁은 치킨이닭";
        process.innerHTML = "4/12";
        question.innerHTML = "코트를 뒤져보니 만 원 짜리 몇장이 나왔다";
        aloneTeam--;
        count++;
        break;
        case 4:
        btn1.innerHTML = "계획한게 있으니 고대로 땡볕으로 전진한다";
        btn2.innerHTML = "계획은 깨지기 위해 있는거다. 호캉스로 변경한다";
        process.innerHTML = "5/12";
        question.innerHTML = "필리핀 자유여행 3일차. 호텔서 나가기 전 핸드폰을 보는데 유래없는 폭염이란다";
        poorRich--;
        count++;
        break;
        case 5:
        btn1.innerHTML = "이돈이 어디야. 얌전히 주머니로 집어넣는다";
        btn2.innerHTML = "무조건 직진! 당첨금액 전부로 다시산다";
        process.innerHTML = "6/12";
        question.innerHTML = "로또 50,000원에 당첨됬다. 당신은...?";
        outIn--;
        count++;
        break;
        case 6:
        btn1.innerHTML = "난 너무 바쁘다. 혼자 보내느라";
        btn2.innerHTML = "난 너무 바쁘다. 이미 다른 모임서 불태울 예정이라";
        process.innerHTML = "7/12";
        question.innerHTML = "오늘은 목요일. 단톡서 내일을 불태울 파티가 한창 모집중이다";
        safeRisk--;
        count++;
        break;
        case 7:
        btn1.innerHTML = "당근을 켠다";
        btn2.innerHTML = "키보드는 갬성이지. 고성능으로 추천받으러 간다";
        process.innerHTML = "8/12";
        question.innerHTML = "키보드가 망가졌다. 핸드폰을 켜고 당신은...?";
        aloneTeam--;
        count++;
        break;
        case 8:
        btn1.innerHTML = "있다";
        btn2.innerHTML = "없다";
        process.innerHTML = "9/12";
        question.innerHTML = "지금 자기 방 안에 선크림이";
        poorRich--;
        count++;
        break;
        case 9:
        btn1.innerHTML = "진짠가? 친구 말이 맞나보다 하고 넘어간다";
        btn2.innerHTML = "일단 돈부터 꺼낸다";
        process.innerHTML = "10/12";
        question.innerHTML = "친구가 말도 안되는걸 우기며 내기를 하자 한다. 당신은...?";
        outIn--;
        count++;
        break;
        case 10:
        btn1.innerHTML = "티켓 한장 주문입니다! 영화 티켓 단 하나!";
        btn2.innerHTML = "같이 보러갈 사람부터 구한다";
        process.innerHTML = "11/12";
        question.innerHTML = "보고싶은 영화가 오늘 나왔다. 당신은";
        safeRisk--;
        count++;
        break;
        case 11:
        btn1.innerHTML = "충동적인 감정일수도 있다. 일단 원데이클래스부터 알아본다";
        btn2.innerHTML = "문자가 온다. 야마하 CP-88을 구매해주셔서 감사합...";
        process.innerHTML = "12/12";
        question.innerHTML = "갑자기 음악이 좀 하고 싶어졌다";
        aloneTeam--;
        count++;
        console.log("outIn:" + outIn);
        console.log("safeRisk:" + safeRisk);
        console.log("aloneTeam:" + aloneTeam);
        console.log("poorRich:" + poorRich);
        break;
        case 12:
        poorRich--;
        
        console.log("outIn:" + outIn);
        console.log("safeRisk:" + safeRisk);
        console.log("aloneTeam:" + aloneTeam);
        console.log("poorRich:" + poorRich);
        
        window.location.href = "/user/extest/test-result.html";
        break;
        default:
        console.log("호에에엥1");
        break;
    }
	}