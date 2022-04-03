package com.pompeu.domain;

import java.sql.Date;
import java.util.List;
import lombok.Data;

@Data
public class Lecture {

  int no;
  int locationNo;
  int creatorNo;
  int exNo;
  String name;
  Date startDate;
  Date endDate;
  int lecturePrice;
  String lectureInfo;
  Date registerDate;
  int status;
  String adminMessage;
  double totalRate;
  int inOutEx;
  List<LectureTime> times;

}