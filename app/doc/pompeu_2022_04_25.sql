-- pompeudb.SNS definition

CREATE TABLE `SNS` (
  `sns_no` int(11) NOT NULL AUTO_INCREMENT COMMENT 'SNS번호',
  `name` varchar(20) NOT NULL COMMENT '이름',
  PRIMARY KEY (`sns_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='SNS';

-- pompeudb.claim_reason definition

CREATE TABLE `claim_reason` (
  `claim_reason_no` int(11) NOT NULL COMMENT '신고사유번호',
  `type` varchar(30) NOT NULL COMMENT '신고유형',
  PRIMARY KEY (`claim_reason_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='신고사유';


-- pompeudb.coupon_type definition

CREATE TABLE `coupon_type` (
  `coupon_type_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '쿠폰적용유형번호',
  `name` varchar(20) NOT NULL COMMENT '쿠폰유형명',
  PRIMARY KEY (`coupon_type_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='쿠폰적용유형';


-- pompeudb.ex_type definition

CREATE TABLE `ex_type` (
  `ex_type_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '운동성향번호',
  `ex_type_name` varchar(20) DEFAULT NULL COMMENT '운동성향명',
  PRIMARY KEY (`ex_type_no`),
  UNIQUE KEY `UIX_ex_type` (`ex_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COMMENT='운동성향';


-- pompeudb.location definition

CREATE TABLE `location` (
  `location_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '지역번호',
  `si` varchar(20) DEFAULT NULL COMMENT '시',
  PRIMARY KEY (`location_no`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='지역';


-- pompeudb.member_type definition

CREATE TABLE `member_type` (
  `member_type_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원유형번호',
  `member_type` varchar(100) NOT NULL COMMENT '회원유형',
  PRIMARY KEY (`member_type_no`),
  UNIQUE KEY `UIX_member_type` (`member_type`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='회원유형';


-- pompeudb.tag_name definition

CREATE TABLE `tag_name` (
  `tag_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '태그번호',
  `tag` varchar(20) NOT NULL COMMENT '태그',
  PRIMARY KEY (`tag_no`),
  UNIQUE KEY `UIX_tag_name` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COMMENT='태그명';


-- pompeudb.exercise definition

CREATE TABLE `exercise` (
  `ex_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '운동번호',
  `name` varchar(20) NOT NULL COMMENT '운동명',
  `ex_type_no` int(11) NOT NULL COMMENT '운동성향번호',
  PRIMARY KEY (`ex_no`),
  UNIQUE KEY `UIX_exercise` (`name`),
  KEY `IX_exercise` (`name`),
  KEY `FK_ex_type_TO_exercise` (`ex_type_no`),
  CONSTRAINT `FK_ex_type_TO_exercise` FOREIGN KEY (`ex_type_no`) REFERENCES `ex_type` (`ex_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='운동';


-- pompeudb.faq definition

CREATE TABLE `faq` (
  `faq_no` int(11) NOT NULL AUTO_INCREMENT COMMENT 'FAQ질문번호',
  `member_type_no` int(11) NOT NULL COMMENT '회원유형번호',
  `ask` mediumtext NOT NULL COMMENT '질문내용',
  `answer` mediumtext NOT NULL COMMENT '답변내용',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '작성일',
  `modify_date` timestamp NULL DEFAULT NULL COMMENT '수정일',
  PRIMARY KEY (`faq_no`),
  KEY `FK_member_type_TO_faq` (`member_type_no`),
  CONSTRAINT `FK_member_type_TO_faq` FOREIGN KEY (`member_type_no`) REFERENCES `member_type` (`member_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COMMENT='FAQ';


-- pompeudb.`member` definition

CREATE TABLE `member` (
  `member_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원번호',
  `member_type_no` int(11) DEFAULT NULL COMMENT '회원유형번호',
  `sns_no` int(11) DEFAULT NULL COMMENT 'SNS번호',
  `join_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '가입일시',
  `name` varchar(20) CHARACTER SET utf8mb4 NOT NULL COMMENT '이름',
  `email` varchar(40) CHARACTER SET utf8mb4 NOT NULL COMMENT '이메일',
  `phone` varchar(30) CHARACTER SET utf8mb4 NOT NULL COMMENT '휴대폰',
  `nickname` varchar(20) CHARACTER SET utf8mb4 NOT NULL COMMENT '닉네임',
  `use_check` int(11) NOT NULL DEFAULT 1 COMMENT '1:사용 2:탈퇴 9:휴먼계정',
  `login_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '최종접속일시',
  `modify_date` timestamp NULL DEFAULT NULL COMMENT '정보수정일시',
  `password` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '비밀번호',
  `role` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '권한',
  `delete_type` int(11) DEFAULT NULL COMMENT '1:회원탈퇴후 재가입 2:서비스 이용안함 3.혜택 부족 4.서비스 이용불편 5.기타',
  `delete_detail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_no`),
  UNIQUE KEY `UIX_member` (`email`),
  UNIQUE KEY `UIX_member2` (`phone`),
  UNIQUE KEY `UIX_member3` (`nickname`),
  KEY `IX_member` (`name`),
  KEY `FK_SNS_TO_member` (`sns_no`),
  KEY `FK_member_type_TO_member` (`member_type_no`),
  CONSTRAINT `FK_SNS_TO_member` FOREIGN KEY (`sns_no`) REFERENCES `SNS` (`sns_no`),
  CONSTRAINT `FK_member_type_TO_member` FOREIGN KEY (`member_type_no`) REFERENCES `member_type` (`member_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb3 COMMENT='회원';


-- pompeudb.notice definition

CREATE TABLE `notice` (
  `notice_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '공지사항번호',
  `member_type_no` int(11) NOT NULL COMMENT '회원유형번호',
  `critical_check` tinyint(1) NOT NULL COMMENT '0: 보통1:중요',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '작성일',
  `view_count` int(11) NOT NULL DEFAULT 0 COMMENT '조회수',
  `name` varchar(100) NOT NULL COMMENT '공지제목',
  `content` mediumtext NOT NULL COMMENT '공지내용',
  `modify_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp() COMMENT '수정일',
  PRIMARY KEY (`notice_no`),
  KEY `IX_notice` (`name`),
  KEY `FK_member_type_TO_notice` (`member_type_no`),
  CONSTRAINT `FK_member_type_TO_notice` FOREIGN KEY (`member_type_no`) REFERENCES `member_type` (`member_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COMMENT='공지사항';


-- pompeudb.notice_file definition

CREATE TABLE `notice_file` (
  `notice_file_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '공지사항파일번호',
  `notice_no` int(11) NOT NULL COMMENT '공지사항번호',
  `org_file` varchar(255) NOT NULL COMMENT '원본파일명',
  `real_file` varchar(100) NOT NULL COMMENT '실제파일명',
  PRIMARY KEY (`notice_file_no`),
  KEY `FK_class_TO_class_notice_file` (`notice_no`),
  CONSTRAINT `FK_class_TO_class_notice_file` FOREIGN KEY (`notice_no`) REFERENCES `notice` (`notice_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COMMENT='공지사항파일';


-- pompeudb.party definition

CREATE TABLE `party` (
  `party_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '소모임번호',
  `name` varchar(100) NOT NULL COMMENT '소모임명',
  `content` mediumtext NOT NULL COMMENT '소모임내용',
  `register_date` date NOT NULL DEFAULT current_timestamp() COMMENT '등록일',
  `start_date` date NOT NULL DEFAULT '0000-00-00' COMMENT '시작일',
  `end_date` date NOT NULL DEFAULT '0000-00-00' COMMENT '종료일',
  `max_member` int(11) NOT NULL DEFAULT 0 COMMENT '최대인원',
  `in_out_ex` int(11) DEFAULT NULL COMMENT '1:실내 2:실외',
  `modify_date` timestamp NULL DEFAULT NULL COMMENT '수정일',
  `image` varchar(255) DEFAULT NULL COMMENT '강좌이미지',
  `tag_no` int(11) NOT NULL COMMENT '태그번호',
  `address` varchar(100) DEFAULT NULL COMMENT '상세주소',
  PRIMARY KEY (`party_no`),
  KEY `IX_party` (`name`),
  KEY `party_FK` (`tag_no`),
  CONSTRAINT `party_FK` FOREIGN KEY (`tag_no`) REFERENCES `tag_name` (`tag_no`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COMMENT='소모임';


-- pompeudb.users definition

CREATE TABLE `users` (
  `users_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '이용자번호',
  `image` varchar(255) DEFAULT NULL COMMENT '사진',
  `ex_type_no` int(11) DEFAULT NULL COMMENT '운동성향번호',
  PRIMARY KEY (`users_no`),
  KEY `FK_ex_type_TO_users` (`ex_type_no`),
  CONSTRAINT `FK_ex_type_TO_users` FOREIGN KEY (`ex_type_no`) REFERENCES `ex_type` (`ex_type_no`),
  CONSTRAINT `users_FK` FOREIGN KEY (`users_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COMMENT='이용자';


-- pompeudb.ask definition

CREATE TABLE `ask` (
  `ask_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '1:1문의번호',
  `parents_ask_no` int(11) DEFAULT NULL COMMENT '1:1문의 부모키',
  `ask_name` varchar(100) NOT NULL COMMENT '문의제목',
  `ask_content` mediumtext NOT NULL COMMENT '문의내용',
  `answer_content` mediumtext DEFAULT NULL COMMENT '답변내용',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '작성일',
  `answer_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp() COMMENT '답변일시',
  `answer_check` tinyint(1) NOT NULL COMMENT '답변체크',
  `member_no` int(11) NOT NULL COMMENT '회원번호',
  PRIMARY KEY (`ask_no`),
  KEY `ask_FK` (`member_no`),
  CONSTRAINT `ask_FK` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COMMENT='1:1문의';


-- pompeudb.ask_file definition

CREATE TABLE `ask_file` (
  `ask_file_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '1:1문의파일번호',
  `ask_no` int(11) NOT NULL COMMENT '1:1문의번호',
  `org_file` varchar(255) NOT NULL COMMENT '원본파일명',
  `real_file` varchar(100) NOT NULL COMMENT '실제파일명',
  PRIMARY KEY (`ask_file_no`),
  KEY `FK_class_TO_class_ask_file` (`ask_no`),
  CONSTRAINT `FK_class_TO_class_ask_file` FOREIGN KEY (`ask_no`) REFERENCES `ask` (`ask_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='1:1문의파일';


-- pompeudb.coupon definition

CREATE TABLE `coupon` (
  `coupon_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '쿠폰번호',
  `code` varchar(40) NOT NULL COMMENT '쿠폰코드',
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `coupon_type_no` int(11) NOT NULL COMMENT '쿠폰적용유형번호',
  `name` varchar(100) NOT NULL COMMENT '쿠폰명',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '발급일',
  `valid_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '유효일자',
  `use_check` int(11) NOT NULL COMMENT '1:미사용 2:사용',
  `use_date` timestamp NULL DEFAULT NULL COMMENT '사용날짜',
  `content` varchar(255) NOT NULL COMMENT '쿠폰내용',
  `price` int(11) NOT NULL DEFAULT 0 COMMENT '쿠폰금액',
  `modify_date` timestamp NULL DEFAULT NULL COMMENT '수정일시',
  PRIMARY KEY (`coupon_no`),
  UNIQUE KEY `UIX_coupon` (`code`),
  KEY `IX_coupon` (`name`),
  KEY `FK_users_TO_coupon` (`users_no`),
  KEY `FK_coupon_type_TO_coupon` (`coupon_type_no`),
  CONSTRAINT `FK_coupon_type_TO_coupon` FOREIGN KEY (`coupon_type_no`) REFERENCES `coupon_type` (`coupon_type_no`),
  CONSTRAINT `FK_users_TO_coupon` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='쿠폰';


-- pompeudb.creator definition

CREATE TABLE `creator` (
  `creator_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '크리에이터번호',
  `info` mediumtext DEFAULT NULL COMMENT '소개',
  `bank` varchar(20) DEFAULT NULL COMMENT '입금은행명',
  `account` varchar(30) DEFAULT NULL COMMENT '계좌번호',
  `img` varchar(255) DEFAULT NULL COMMENT '사진',
  PRIMARY KEY (`creator_no`),
  CONSTRAINT `FK_member_TO_creator` FOREIGN KEY (`creator_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COMMENT='크리에이터';


-- pompeudb.lecture definition

CREATE TABLE `lecture` (
  `lecture_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '강좌번호',
  `location_no` int(11) NOT NULL COMMENT '지역번호',
  `creator_no` int(11) NOT NULL COMMENT '크리에이터번호',
  `ex_no` int(11) NOT NULL COMMENT '운동번호',
  `name` varchar(100) NOT NULL COMMENT '강좌명',
  `start_date` date DEFAULT NULL COMMENT '시작일',
  `end_date` date NOT NULL COMMENT '종료일',
  `lecture_price` int(11) NOT NULL DEFAULT 0 COMMENT '강좌료',
  `lecture_info` varchar(255) NOT NULL COMMENT '수업소개',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '등록일',
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0:임시저장 1:개설신청 2:수강대기 3:수강중 4:수강완료 9:승인보류',
  `admin_message` varchar(255) DEFAULT NULL COMMENT '비고',
  `total_rate` float unsigned NOT NULL DEFAULT 0 COMMENT '전체평점',
  `in_out_ex` int(11) NOT NULL COMMENT '1:실내 2:실외',
  `address` varchar(255) DEFAULT NULL COMMENT '상세주소(도로명)',
  PRIMARY KEY (`lecture_no`),
  KEY `IX_class` (`name`),
  KEY `FK_creator_TO_class` (`creator_no`),
  KEY `FK_exercise_TO_class` (`ex_no`),
  KEY `lecture_FK` (`location_no`),
  CONSTRAINT `FK_creator_TO_class` FOREIGN KEY (`creator_no`) REFERENCES `creator` (`creator_no`),
  CONSTRAINT `FK_exercise_TO_class` FOREIGN KEY (`ex_no`) REFERENCES `exercise` (`ex_no`),
  CONSTRAINT `FK_location_TO_class` FOREIGN KEY (`location_no`) REFERENCES `location` (`location_no`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COMMENT='강좌';


-- pompeudb.lecture_image definition

CREATE TABLE `lecture_image` (
  `lecture_image_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '강좌이미지번호',
  `lecture_no` int(11) NOT NULL COMMENT '강좌번호',
  `image` varchar(255) NOT NULL COMMENT '강좌이미지 오리지널명',
  `random_image` varchar(100) NOT NULL COMMENT '파일경로',
  PRIMARY KEY (`lecture_image_no`),
  KEY `FK_class_TO_class_image` (`lecture_no`),
  CONSTRAINT `FK_class_TO_class_image` FOREIGN KEY (`lecture_no`) REFERENCES `lecture` (`lecture_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COMMENT='강좌이미지';


-- pompeudb.lecture_like definition

CREATE TABLE `lecture_like` (
  `users_no` int(11) NOT NULL COMMENT '이용자 번호',
  `lecture_no` int(11) NOT NULL COMMENT '강좌 번호',
  PRIMARY KEY (`users_no`,`lecture_no`),
  KEY `lecture_like_FK` (`lecture_no`),
  CONSTRAINT `lecture_like_FK` FOREIGN KEY (`lecture_no`) REFERENCES `lecture` (`lecture_no`),
  CONSTRAINT `lecture_like_FK_1` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- pompeudb.lecture_time definition

CREATE TABLE `lecture_time` (
  `lecture_time_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '강좌시간분류번호',
  `lecture_no` int(11) NOT NULL COMMENT '강좌번호',
  `start_time` time NOT NULL COMMENT '시작시간',
  `end_time` time NOT NULL COMMENT '종료시간',
  `max_member` int(11) NOT NULL DEFAULT 0 COMMENT '최대인원',
  `no_member` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`lecture_time_no`),
  UNIQUE KEY `UIX_class_time2` (`lecture_no`,`start_time`,`end_time`),
  CONSTRAINT `FK_class_TO_class_time` FOREIGN KEY (`lecture_no`) REFERENCES `lecture` (`lecture_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COMMENT='강좌시간분류';


-- pompeudb.lecture_wishlist definition

CREATE TABLE `lecture_wishlist` (
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `lecture_no` int(11) NOT NULL COMMENT '강좌번호',
  PRIMARY KEY (`users_no`,`lecture_no`),
  KEY `FK_class_TO_class_wishlist` (`lecture_no`),
  CONSTRAINT `FK_class_TO_class_wishlist` FOREIGN KEY (`lecture_no`) REFERENCES `lecture` (`lecture_no`),
  CONSTRAINT `FK_users_TO_class_wishlist` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='강좌찜';


-- pompeudb.mylecture_ask definition

CREATE TABLE `mylecture_ask` (
  `mylecture_ask_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '강좌문의번호',
  `lecture_no` int(11) NOT NULL COMMENT '강좌번호',
  `users_no` int(11) DEFAULT NULL COMMENT '이용자번호',
  `ask_content` mediumtext NOT NULL COMMENT '문의내용',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '작성일시',
  `answer_content` mediumtext DEFAULT NULL COMMENT '답변내용',
  `answer_register_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp() COMMENT '답변일시',
  `display` int(11) DEFAULT NULL COMMENT '1:공개 2:비공개',
  PRIMARY KEY (`mylecture_ask_no`),
  KEY `FK_class_TO_myclass_ask` (`lecture_no`),
  KEY `FK_users_TO_myclass_ask` (`users_no`),
  CONSTRAINT `FK_class_TO_myclass_ask` FOREIGN KEY (`lecture_no`) REFERENCES `lecture` (`lecture_no`),
  CONSTRAINT `FK_users_TO_myclass_ask` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COMMENT='강좌문의';


-- pompeudb.mylecture_list definition

CREATE TABLE `mylecture_list` (
  `mylecture_list_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '강좌신청자번호',
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `lecture_time_no` int(11) DEFAULT NULL COMMENT '강좌시간분류번호',
  `register_member` int(11) NOT NULL DEFAULT 0 COMMENT '신청인원',
  `pay_status` int(11) DEFAULT NULL COMMENT '1:개설신청 2:수강대기 3:수강중 4:수강완료 9:승인보류',
  `content` varchar(255) DEFAULT NULL COMMENT '후기',
  `register_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp() COMMENT '후기작성일',
  PRIMARY KEY (`mylecture_list_no`),
  UNIQUE KEY `UIX_myclass_list` (`lecture_time_no`,`users_no`),
  KEY `FK_users_TO_myclass_list` (`users_no`),
  CONSTRAINT `FK_class_time_TO_myclass_list` FOREIGN KEY (`lecture_time_no`) REFERENCES `lecture_time` (`lecture_time_no`),
  CONSTRAINT `FK_users_TO_myclass_list` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COMMENT='강좌신청자';


-- pompeudb.party_claim definition

CREATE TABLE `party_claim` (
  `party_no` int(11) NOT NULL COMMENT '소모임번호',
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `claim_reason_no` int(11) NOT NULL COMMENT '신고사유번호',
  `claim_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) DEFAULT 1 COMMENT '1: 신고 2:미신고',
  PRIMARY KEY (`party_no`,`users_no`),
  KEY `FK_users_TO_party_claim` (`users_no`),
  KEY `FK_claim_reason_TO_party_claim` (`claim_reason_no`),
  CONSTRAINT `FK_claim_reason_TO_party_claim` FOREIGN KEY (`claim_reason_no`) REFERENCES `claim_reason` (`claim_reason_no`),
  CONSTRAINT `FK_party_TO_party_claim` FOREIGN KEY (`party_no`) REFERENCES `party` (`party_no`),
  CONSTRAINT `FK_users_TO_party_claim` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='소모임신고';


-- pompeudb.party_user definition

CREATE TABLE `party_user` (
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `party_no` int(11) NOT NULL COMMENT '소모임번호',
  `party_maker` tinyint(1) NOT NULL COMMENT '0:회원 1:방장',
  `join_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '소모임참가일시',
  PRIMARY KEY (`users_no`,`party_no`),
  KEY `FK_party_TO_party_user` (`party_no`),
  CONSTRAINT `FK_party_TO_party_user` FOREIGN KEY (`party_no`) REFERENCES `party` (`party_no`),
  CONSTRAINT `FK_users_TO_party_user` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='소모임참여자';


-- pompeudb.party_wishlist definition

CREATE TABLE `party_wishlist` (
  `users_no` int(11) NOT NULL COMMENT '이용자 번호',
  `party_no` int(11) NOT NULL COMMENT '소모임 번호',
  PRIMARY KEY (`users_no`,`party_no`),
  KEY `party_wishlist_FK_1` (`party_no`),
  CONSTRAINT `party_wishlist_FK` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`),
  CONSTRAINT `party_wishlist_FK_1` FOREIGN KEY (`party_no`) REFERENCES `party` (`party_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='소모임 찜';


-- pompeudb.payment definition

CREATE TABLE `payment` (
  `payment_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '결제번호',
  `myclass_list_no` int(11) DEFAULT NULL COMMENT '강좌신청자번호',
  `coupon_no` int(11) NOT NULL COMMENT '쿠폰번호',
  `class_price` int(11) DEFAULT 0 COMMENT '강좌료',
  `pay_type` int(11) NOT NULL COMMENT '1:카드 2: 계좌이체',
  `pay_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '결제일시',
  `pay_price` int(11) NOT NULL DEFAULT 0 COMMENT '최종결제금액',
  `refund_date` timestamp NULL DEFAULT NULL COMMENT '환불일자',
  `pay_status` int(11) NOT NULL COMMENT '1:결제대기 2:결제완료 3:환불요청 4:환불완료',
  `calculate_date` timestamp NULL DEFAULT NULL COMMENT '정산일자',
  `calculate_price` int(11) DEFAULT 0 COMMENT '정산금액',
  `commission` int(11) DEFAULT 0 COMMENT '수수료',
  `code` varchar(40) DEFAULT NULL COMMENT '쿠폰코드',
  PRIMARY KEY (`payment_no`),
  KEY `FK_coupon_TO_payment` (`coupon_no`),
  KEY `FK_myclass_list_TO_payment` (`myclass_list_no`),
  CONSTRAINT `FK_coupon_TO_payment` FOREIGN KEY (`coupon_no`) REFERENCES `coupon` (`coupon_no`),
  CONSTRAINT `FK_myclass_list_TO_payment` FOREIGN KEY (`myclass_list_no`) REFERENCES `mylecture_list` (`mylecture_list_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='결제';


-- pompeudb.challenge definition

CREATE TABLE `challenge` (
  `challenge_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '챌린지번호',
  `lecture_no` int(11) NOT NULL COMMENT '강좌번호',
  `users_no` int(11) NOT NULL COMMENT '작성자',
  `name` varchar(100) NOT NULL COMMENT '챌린지명',
  `content` varchar(255) NOT NULL COMMENT '챌린지내용',
  `image` varchar(255) NOT NULL COMMENT '이미지',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '작성일',
  `modify_date` timestamp NULL DEFAULT NULL COMMENT '수정일시',
  `view_count` int(11) NOT NULL DEFAULT 0 COMMENT '조회수',
  PRIMARY KEY (`challenge_no`),
  KEY `IX_challenge` (`name`),
  KEY `FK_class_TO_challenge` (`lecture_no`),
  KEY `FK_users_TO_challenge` (`users_no`),
  CONSTRAINT `FK_class_TO_challenge` FOREIGN KEY (`lecture_no`) REFERENCES `lecture` (`lecture_no`),
  CONSTRAINT `FK_users_TO_challenge` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='챌린지';


-- pompeudb.challenge_claim definition

CREATE TABLE `challenge_claim` (
  `challenge_no` int(11) NOT NULL COMMENT '챌린지번호',
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `claim_reason_no` int(11) NOT NULL COMMENT '신고사유번호',
  `status` int(11) NOT NULL COMMENT '1:승인대기 2:정상게시물 3:불법게시물',
  PRIMARY KEY (`challenge_no`,`users_no`),
  KEY `FK_users_TO_challenge_claim` (`users_no`),
  KEY `FK_claim_reason_TO_challenge_claim` (`claim_reason_no`),
  CONSTRAINT `FK_challenge_TO_challenge_claim` FOREIGN KEY (`challenge_no`) REFERENCES `challenge` (`challenge_no`),
  CONSTRAINT `FK_claim_reason_TO_challenge_claim` FOREIGN KEY (`claim_reason_no`) REFERENCES `claim_reason` (`claim_reason_no`),
  CONSTRAINT `FK_users_TO_challenge_claim` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='챌린지신고';


-- pompeudb.challenge_comment definition

CREATE TABLE `challenge_comment` (
  `challenge_comment_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '챌린지댓글번호',
  `challenge_no` int(11) NOT NULL COMMENT '챌린지번호',
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `content` varchar(255) NOT NULL COMMENT '댓글내용',
  PRIMARY KEY (`challenge_comment_no`),
  KEY `FK_challenge_TO_challenge_comment` (`challenge_no`),
  KEY `FK_users_TO_challenge_comment` (`users_no`),
  CONSTRAINT `FK_challenge_TO_challenge_comment` FOREIGN KEY (`challenge_no`) REFERENCES `challenge` (`challenge_no`),
  CONSTRAINT `FK_users_TO_challenge_comment` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='챌린지댓글';


-- pompeudb.challenge_like definition

CREATE TABLE `challenge_like` (
  `users_no` int(11) NOT NULL COMMENT '이용자번호',
  `challenge_no` int(11) NOT NULL COMMENT '챌린지번호',
  PRIMARY KEY (`users_no`,`challenge_no`),
  KEY `FK_challenge_TO_challenge_like` (`challenge_no`),
  CONSTRAINT `FK_challenge_TO_challenge_like` FOREIGN KEY (`challenge_no`) REFERENCES `challenge` (`challenge_no`),
  CONSTRAINT `FK_users_TO_challenge_like` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='챌린지좋아요';