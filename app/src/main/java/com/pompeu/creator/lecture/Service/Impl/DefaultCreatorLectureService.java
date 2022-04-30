package com.pompeu.creator.lecture.Service.Impl;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.pompeu.creator.lecture.Service.CreatorLectureService;
import com.pompeu.creator.lecture.controller.CreatorLectureController;
import com.pompeu.creator.lecture.dao.CreatorLectureDao;
import com.pompeu.domain.Lecture;
import com.pompeu.domain.LectureList;

@Service
public class DefaultCreatorLectureService implements CreatorLectureService {

  private static final Logger log = LogManager.getLogger(CreatorLectureController.class);
  @Autowired
  CreatorLectureDao creatorLectureDao;

  @Override
  public int countAll() {
    return creatorLectureDao.countAll();
  }
  //강좌 목록 호출 - 강좌, 강좌시간, 강좌이미지
  @Override
  public List<LectureList> list(int no) {
    return creatorLectureDao.findAllMyclass(no);
  }

  @Override
  public List<LectureList> openRequestList(int no) {
    return creatorLectureDao.findRequestList(no);
  }
  @Override
  public List<LectureList> openedClassList(int no) {
    return creatorLectureDao.findClassList(no);
  }


  @Override
  //@Transactional 
  public int add(Lecture lecture) {
    log.info("강좌등록");
    creatorLectureDao.insert(lecture);
    //creatorLectureDao.insertTimes(lectureTime);
    creatorLectureDao.insertTimes(lecture.getNo(), lecture.getTimes());
    creatorLectureDao.insertImages(lecture.getNo(), lecture.getImages());
    return 1;
  }




  @Override
  public Lecture get(int no) {
    return creatorLectureDao.findByNo(no);
  }

  @Override
  @Transactional 
  public int update(Lecture lecture) {
    int count = creatorLectureDao.update(lecture);
    if (count > 0) {
      creatorLectureDao.deleteTelBylectureNo(lecture.getNo()); //  강의 변경 전에 기존 데이터를를 모두 삭제한다.
      //  creatorLectureDao.insertTimes(lecture.getNo(), lecture.getTimes());
      creatorLectureDao.insertImages(lecture.getNo(), lecture.getImages());
    }
    return count;
  }

  @Override
  public int delete(int no) {
    creatorLectureDao.deleteTelBylectureNo(no);
    return creatorLectureDao.delete(no);
  }

}
