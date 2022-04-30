package com.pompeu.domain;

import java.sql.Date;
import lombok.Data;

@Data
public class LectureList {
  int lectureNo;
  String classTitle;
  String startDate;
  String endDate;
  int status;
  Date registerDate;
  String startTime;
  String endTime;
  String statusCheck;
}