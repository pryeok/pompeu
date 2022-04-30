package com.pompeu.domain;

import java.util.List;
import lombok.Data;

@Data
public class Lecture {
  int no;
  int locationNo;
  int creatorNo;
  int exNo;
  String name;
  String startDate;
  String endDate;
  int lecturePrice;
  String lectureInfo;
  String registerDate;
  // int status; // 기본값이 0이 들어옴으로 막음
  String adminMessage;
  double totalRate;
  int inOutEx;
  String address;
  // List<LectureTime> times;//강좌시간
  LectureTime times;
  List<String> images;//강좌이미지 
}
