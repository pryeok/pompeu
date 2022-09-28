package com.pompeu.admin.lecture.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.pompeu.domain.Lecture;

@Mapper  
public interface AdminLectureDao {
  int countAll();

  List<Lecture> findAll();

  Lecture findByNo(int no);

  int update(Lecture lecture);

}