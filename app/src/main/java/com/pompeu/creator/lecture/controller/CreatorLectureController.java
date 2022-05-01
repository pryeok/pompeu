package com.pompeu.creator.lecture.controller;


import static com.pompeu.creator.lecture.controller.ResultMap.FAIL;
import static com.pompeu.creator.lecture.controller.ResultMap.SUCCESS;
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.pompeu.creator.lecture.Service.CreatorLectureService;
import com.pompeu.domain.Lecture;
import com.pompeu.domain.LectureTime;
import com.pompeu.domain.Member;

@RestController
@RequestMapping("/creatorLecture/")
public class CreatorLectureController {
  // log를 출력하는 도구 준비
  private static final Logger log = LogManager.getLogger(CreatorLectureController.class);

  @Autowired
  CreatorLectureService creatorLectureService;

  //크리에이터가 등록한 클래스 목록조회
  @RequestMapping("list")
  public Object list(@AuthenticationPrincipal Member member) { // 각자 역할에 따른 분리 - 웹기술은 컨트럴러 단에서만 처리 하도록 

    log.debug(member.getNo());

    return new ResultMap().setStatus(SUCCESS).setData(creatorLectureService.list(member.getNo()));
    //return new ResultMap().setStatus(SUCCESS).setData(creatorLectureService.list(no));
    //return creatorLectureService.list(member.getNo());
  }

  /*
  @RequestMapping("openRequest")
  public Object openRequest(@AuthenticationPrincipal Member member) { // 각자 역할에 따른 분리 - 웹기술은 컨트럴러 단에서만 처리 하도록 

    log.debug(member.getNo());

    return new ResultMap().setStatus(SUCCESS).setData(creatorLectureService.openRequestList(member.getNo()));
  }



  @RequestMapping("openedClass")
  public Object  openedClass(@AuthenticationPrincipal Member member) { // 각자 역할에 따른 분리 - 웹기술은 컨트럴러 단에서만 처리 하도록 

    log.debug(member.getNo());

    return new ResultMap().setStatus(SUCCESS).setData(creatorLectureService.openedClassList(member.getNo()));
  }
   */


  //클래스 등록
  @RequestMapping("add")
  public Object add(@AuthenticationPrincipal Member member, Lecture lecture , List<MultipartFile> file, LectureTime lectureTime)  {
    //log.debug(file.toString(),lectureTime.toString()); 

    //강의 시간 데이터 가공 - 시간대 1개 입력가능

    lecture.setCreatorNo(member.getNo());
    //log.debug(lecture);
    // log.debug(lectureTime);
    lecture.setTimes(lectureTime); 

    /*
     * 파라미터로 스트링 배열을 받을 때 String[]
    try {
      ArrayList<LectureTime> timesList = new ArrayList<>();
      for(int i= 0; i< time.length; i++) {

        String[] value = time[i].split(",");
        if(value[0].length() == 0) { //시작시간
          continue;
        } 
        if(value[1].length() == 0) { //종료시간
          continue;
        }  
        LectureTime lectureTime = new LectureTime(value[0],value[1],Integer.parseInt(value[2]));
        timesList.add(lectureTime);
      } 

      log.info("정보받아와3");

      // lecture 객체에 타임리스트를 담는다. 
      lecture.setTimes(timesList);
      log.info(SUCCESS);

    } catch(Exception e) {
      StringWriter out = new StringWriter();
      e.printStackTrace(new PrintWriter(out));
      log.error(out);
      log.info("시간등록실패");
    }    
     */


    //강의 이미지 데이터 가공 
    ArrayList<String> fileList = new ArrayList<>();
    try { 
      for(int i = 0; i< file.size(); i++) { 
        fileList.add(savePhoto(file.get(i)));
      }

      // lecture 객체에 이미지리스트를 담는다. 
      lecture.setImages(fileList);

      //강좌정보와 이미지, 타임정보를 입력하라
      creatorLectureService.add(lecture);

      log.info("사진등록성공");
      return new ResultMap().setStatus(SUCCESS);

    } catch (Exception e) {

      StringWriter out = new StringWriter();
      e.printStackTrace(new PrintWriter(out));
      log.error(out);
      log.info("사진등록실패");

      return new ResultMap().setStatus(FAIL);
    } 

  }


  //클래스 상세보기
  @RequestMapping("get")
  public Object get(int no) {
    Lecture lecture = creatorLectureService.get(no);
    if (lecture == null) {
      return new ResultMap().setStatus(FAIL).setData("해당 번호의 연락처가 없습니다.");
    }
    return new ResultMap().setStatus(SUCCESS).setData(lecture);
  }


  /*

  //클래스 수정
  @RequestMapping("update")
  public Object update(Lecture lecture , String[] time , List<MultipartFile> file) {

    //강의 시간 데이터 가공
    try {
      ArrayList<LectureTime> timesList = new ArrayList<>();
      for(int i= 0; i< time.length; i++) {
        String[] value = time[i].split(",");
        if(value[0].length() == 0) { //시작시간
          continue;
        } 
        if(value[1].length() == 0) { //종료시간
          continue;
        }  
        //이미 강의 번호를 알고 있으므로 강의 번호를 꺼낸다. 
        LectureTime lectureTime = new LectureTime(lecture.getNo(), value[0], value[1], Integer.parseInt(value[2]));
        timesList.add(lectureTime);
      } 

      // lecture 객체에 타임리스트를 담는다. 
      //lecture.setTimes(timesList);
      log.info(SUCCESS);

    } catch(Exception e) {
      StringWriter out = new StringWriter();
      e.printStackTrace(new PrintWriter(out));
      log.error(out);
      log.info("시간등록실패");
    }    

    //강의 이미지 데이터 가공 
    ArrayList<String> fileList = new ArrayList<>();
    try { 
      for(int i = 0; i< file.size(); i++) { 
        fileList.add(savePhoto(file.get(i)));
      }

      // lecture 객체에 이미지리스트를 담는다. 
      lecture.setImages(fileList);

      //강좌정보와 이미지, 타임정보를 입력하라
      creatorLectureService.update(lecture);

      log.info("사진등록성공");
      return new ResultMap().setStatus(SUCCESS);

    } catch (Exception e) {

      StringWriter out = new StringWriter();
      e.printStackTrace(new PrintWriter(out));
      log.error(out);
      log.info("사진등록실패");

      return new ResultMap().setStatus(FAIL);
    } 
  }

  /*
  //클래스 삭제
  @RequestMapping("delete")
  public Object delete(int no) {
    return creatorLectureService.delete(no);
  }

   */

  @RequestMapping("photo")
  public ResponseEntity<Resource> photo(String filename) {

    try {
      // 다운로드할 파일의 입력 스트림 자원을 준비한다.
      File downloadFile = new File("./upload/lecture-image/" + filename); // 다운로드 상대 경로 준비
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath()); // 다운로드 파일의 실제 경로를 지정하여 입력 스트림 준비
      InputStreamResource resource = new InputStreamResource(fileIn); // 입력 스트림을 입력 자원으로 포장

      // HTTP 응답 헤더를 준비한다.
      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");

      // 다운로드 파일명을 지정하고 싶다면 다음의 응답 헤더를 추가하라!
      // => 다운로드 파일을 지정하지 않으면 요청 URL이 파일명으로 사용된다.
      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);



      //      // HTTP 응답 생성기를 사용하여 다운로드 파일의 응답 데이터를 준비한다.
      //      BodyBuilder http응답생성기 = ResponseEntity.ok(); // 요청 처리에 성공했다는 응답 생성기를 준비한다.
      //      http응답생성기.headers(header); // HTTP 응답 헤더를 설정한다.
      //      http응답생성기.contentLength(downloadFile.length()); // 응답 콘텐트의 파일 크기를 설정한다.
      //      http응답생성기.contentType(MediaType.APPLICATION_OCTET_STREAM); // 응답 데이터의 MIME 타입을 설정한다.
      //      
      //      // 응답 데이터를 포장한다.
      //      ResponseEntity<Resource> 응답데이터 = http응답생성기.body(resource);
      //      
      //      return 응답데이터; // 포장한 응답 데이터를 클라이언트로 리턴한다.

      return ResponseEntity.ok() // HTTP 응답 프로토콜에 따라 응답을 수행할 생성기를 준비한다.
          .headers(header) // 응답 헤더를 설정한다.
          .contentLength(downloadFile.length()) // 응답할 파일의 크기를 설정한다.
          .contentType(MediaType.APPLICATION_OCTET_STREAM) // 응답 콘텐트의 MIME 타입을 설정한다.
          .body(resource); // 응답 콘텐트를 생성한 후 리턴한다.

    } catch (Exception e) {

      return null;
    }

  }




  //이미지파일 등록
  private String savePhoto(MultipartFile file) throws Exception {

    if (file != null && file.getSize() > 0) { 

      // 파일을 저장할 때 사용할 파일명을 준비한다.
      String filename = UUID.randomUUID().toString();
      log.debug(filename);

      // 파일명의 확장자를 알아낸다.
      int dotIndex = file.getOriginalFilename().lastIndexOf(".");
      if (dotIndex != -1) {

        filename += file.getOriginalFilename().substring(dotIndex);
      }

      // 파일을 지정된 폴더에 저장한다.
      File photoFile = new File("./upload/lecture_image/" + filename); // App 클래스를 실행하는 프로젝트 폴더
      file.transferTo(photoFile.getCanonicalFile()); // 프로젝트 폴더의 전체 경로를 전달한다.

      return filename;

    } else {
      return null;
    }
  }
}
