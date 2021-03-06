package com.pompeu.admin.support.controller;

import com.pompeu.admin.support.service.AdminLectureService;
import com.pompeu.domain.Lecture;

//@RestController
public class AdminLectureController {

  AdminLectureService lectureService;

  //@RequestMapping("/lecture/list")
  public Object list() {
    return lectureService.list();
  }

  // @RequestMapping("/lecture/get")
  public Object get(int no) {
    Lecture lecture = lectureService.get(no);
    if (lecture == null) {
      return "";
    }
    return lecture;
  }

  // @RequestMapping("/lecture/update")
  public Object update(Lecture lecture) {
    return lectureService.update(lecture);
  }


}
