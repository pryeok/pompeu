package com.pompeu.user.lecture.service;

import java.util.List;
import com.pompeu.domain.CreatorContent;
import com.pompeu.domain.Lecture;
import com.pompeu.domain.LectureIntro;
import com.pompeu.domain.LectureWishlist;
import com.pompeu.domain.myLectureAsk;
import com.pompeu.domain.myLectureList;

public interface UserLectureService {

  List<Lecture> list();

  int add(myLectureList mylecturelist);

  int ask(myLectureAsk mylectureask);

  int wishlist(LectureWishlist lecturewishlist);

  Lecture get(int no);

  int update(Lecture lecture);

  int delete(int no);

  List<Lecture> getEverything(String sort, String region);

  List<Lecture> getOut(String sort, String region);

  List<Lecture> getIn(String sort, String region);

  List<LectureIntro> lecture(int no);

  List<Lecture> userCon(int no);

  List<CreatorContent> creatorCon(int no);

  List<Lecture> creator(int no);

  List<Lecture> regist(int no);

  List<Lecture> time(int no);

  List<Lecture> img(int no);

  List<Lecture> map(int no);

  List<Lecture> si(int no);
}

