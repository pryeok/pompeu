package com.pompeu.admin.support.service;

import java.util.List;
import com.pompeu.domain.Lecture;

public interface LectureService {


  int countAll();

  List<Lecture> list();

  Lecture get(int no);

  int update(Lecture lecture);

}
