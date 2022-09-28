package com.pompeu.creator.lecture.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.pompeu.domain.Lecture;
import com.pompeu.domain.LectureList;
import com.pompeu.domain.LectureTime;

@Mapper
public interface CreatorLectureDao {

  //int countAll();
  List<LectureList> findAllMyclass(@Param("no") int no); //리스트 받기

  //List<LectureList> findRequestList(@Param("no") int no);

  //List<LectureList> findClassList(@Param("no") int no);

  //강의 등록 및 시간, 이미지 등록
  int insert(Lecture lecture);

  int insertTimes(@Param("lectureNo") int lectureNo, @Param("times") LectureTime times);

  int insertImages(@Param("lectureNo") int lectureNo, @Param("images") List<String> images);

  Lecture findByNo(int no);

  // int update(Lecture lecture);

  // int delete(int no);


}

