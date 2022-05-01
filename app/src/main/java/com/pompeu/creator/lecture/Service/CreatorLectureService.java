package com.pompeu.creator.lecture.Service;

import java.util.List;
import com.pompeu.domain.Lecture;
import com.pompeu.domain.LectureList;

public interface CreatorLectureService {

  //int countAll();

  List<LectureList> list(int no);

  // List<LectureList> openRequestList(int no);

  // List<LectureList> openedClassList(int no);

  Lecture get(int no);

  int add(Lecture lecture);

  // int update(Lecture lecture);

  //int delete(int no);

}
