package com.pompeu.user.lecture.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.pompeu.domain.CreatorContent;
import com.pompeu.domain.Lecture;
import com.pompeu.domain.LectureIntro;
import com.pompeu.domain.LectureWishlist;
import com.pompeu.domain.myLectureAsk;
import com.pompeu.domain.myLectureList;

@Mapper  
public interface UserLectureDao {

  List<Lecture> findAll();

  int insert(myLectureList mylecturelist);

  int addAsk(myLectureAsk mylectureask);

  int wishlistAdd(LectureWishlist lecturewishlist);

  Lecture findByNo(int no);

  int update(Lecture lecture);

  int delete(int no);

  List<Lecture> findEverything(@Param("sort") String sort, @Param("region") String region);

  List<Lecture> findOut(@Param("sort") String sort, @Param("region") String region);

  List<Lecture> findIn(@Param("sort") String sort, @Param("region") String region);

  List<LectureIntro> findLecture(int no);

  List<Lecture> userContent(int no);

  List<CreatorContent> creatorContent(int no);

  List<Lecture> creatorPro(int no);

  List<Lecture> registLecture(int no);

  List<Lecture> registTime(int no);

  List<Lecture> addImage(int no);

  List<Lecture> mapping(int no);

  List<Lecture> siSep2(int no);
}