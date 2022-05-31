package com.pompeu.user.lecture.controller;

import java.io.File;
import java.io.FileInputStream;
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
import com.pompeu.domain.Lecture;
import com.pompeu.domain.LectureWishlist;
import com.pompeu.domain.Member;
import com.pompeu.domain.myLectureAsk;
import com.pompeu.domain.myLectureList;
import com.pompeu.user.lecture.service.UserLectureService;

@RestController 
public class UserLectureController {

  // log를 출력하는 도구 준비
  private static final Logger log = LogManager.getLogger(UserLectureController.class);

  @Autowired
  UserLectureService userLectureService;

  @RequestMapping("/userLecture/list")
  public Object list() {
    log.debug("게실물 목록 조회!");
    return userLectureService.list();
  }

  @RequestMapping("/userLecture/add")
  public Object add(myLectureList mylecturelist, @AuthenticationPrincipal Member member) {
    log.info("lecture-add.....");
    System.out.println(member.getNo());
    mylecturelist.setUsersNo(member.getNo());
    System.out.println("========");
    return userLectureService.add(mylecturelist);
  }

  @RequestMapping("/userLecture/addAsk")
  public Object addAsk(myLectureAsk mylectureask, @AuthenticationPrincipal Member member) {
    log.info("lecture-add.....");
    System.out.println(member.getNo());
    mylectureask.setUsersNo(member.getNo());
    System.out.println("========");
    return userLectureService.ask(mylectureask);
  }

  @RequestMapping("/userLecture/wishlistAdd")
  public Object wishlistAdd(LectureWishlist lecturewishlist, @AuthenticationPrincipal Member member) {

    lecturewishlist.setUsersNo(member.getNo());
    System.out.println(member.getNo());
    System.out.println("========");
    System.out.println("partyuser:"+lecturewishlist.getUsersNo());
    System.out.println("partyno:"+lecturewishlist.getLectureNo());
    System.out.println("--------");
    return userLectureService.wishlist(lecturewishlist);
  }


  @RequestMapping("/userLecture/get")
  public Object get(int no) {
    Lecture lecture = userLectureService.get(no);
    return lecture != null ? lecture : "";
  }

  @RequestMapping("/userLecture/update")
  public Object update(Lecture lecture) {
    return userLectureService.update(lecture);
  }

  @RequestMapping("/userLecture/delete")
  public Object delete(int no) {
    return userLectureService.delete(no);
  }

  @RequestMapping("/userLecture/findEverything")
  public Object findEverything(String sort, String region) {
    return userLectureService.getEverything(sort, region);
  }

  @RequestMapping("/userLecture/findOut")
  public Object findOut(String sort, String region) {
    return userLectureService.getOut(sort, region);
  }

  @RequestMapping("/userLecture/findIn")
  public Object findIn(String sort, String region) {
    return userLectureService.getIn(sort, region);
  }

  @RequestMapping("/userLecture/findLecture")
  public Object findLecture(int no) {
    Object object = userLectureService.lecture(no);
    return object;
  }

  @RequestMapping("/userLecture/userContent")
  public Object userContent(int no) {
    Object object = userLectureService.userCon(no);
    return object;
  }

  @RequestMapping("/userLecture/creatorContent")
  public Object creatorContent(int no) {
    Object object = userLectureService.creatorCon(no);
    return object;
  }

  @RequestMapping("/userLecture/creatorPro")
  public Object creatorPro(int no) {
    Object object = userLectureService.creator(no);
    return object;
  }

  @RequestMapping("/userLecture/registLecture")
  public Object registLecture(int no) {
    return userLectureService.regist(no);
  }

  @RequestMapping("/userLecture/registTime")
  public Object registTime(int no) {
    return userLectureService.time(no);
  }

  @RequestMapping("/userLecture/addImage")
  public Object addImage(int no) {
    return userLectureService.img(no);
  }

  @RequestMapping("/userLecture/mapping")
  public Object mapping(int no) {
    return userLectureService.map(no);
  }

  @RequestMapping("/userLecture/siSep2")
  public Object siSep(int no) {
    return userLectureService.si(no);
  } 

  @RequestMapping("/userLecture/image")
  public ResponseEntity<Resource> image(String filename) {

    try {
      // 다운로드할 파일의 입력 스트림 자원을 준비한다.
      File downloadFile = new File("./upload/lecture_image/" + filename); // 다운로드 상대 경로 준비
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath()); // 다운로드 파일의 실제 경로를 지정하여 입력 스트림 준비
      InputStreamResource resource = new InputStreamResource(fileIn); // 입력 스트림을 입력 자원으로 포장

      // HTTP 응답 헤더를 준비한다. (캐시를 막기 위한 헤더 설정)
      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");

      // 다운로드 파일명을 지정하고 싶다면 다음의 응답 헤더를 추가하라!
      // => 다운로드 파일을 지정하지 않으면 요청 URL이 파일명으로 사용된다.
      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

      return ResponseEntity.ok() // HTTP 응답 프로토콜에 따라 응답을 수행할 생성기를 준비한다.
          .headers(header) // 응답 헤더를 설정한다.
          .contentLength(downloadFile.length()) // 응답할 파일의 크기를 설정한다.
          .contentType(MediaType.APPLICATION_OCTET_STREAM) // 응답 콘텐트의 MIME 타입을 설정한다.
          .body(resource); // 응답 콘텐트를 생성한 후 리턴한다.

    } catch (Exception e) {
      //e.printStackTrace();
      System.out.println("요청한 파일이 없습니다.");
      return null;
    }
  }

  @RequestMapping("/userLecture/image2")
  public ResponseEntity<Resource> image2(String filename) {

    try {
      // 다운로드할 파일의 입력 스트림 자원을 준비한다.
      File downloadFile = new File("./upload/users/" + filename); // 다운로드 상대 경로 준비
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath()); // 다운로드 파일의 실제 경로를 지정하여 입력 스트림 준비
      InputStreamResource resource = new InputStreamResource(fileIn); // 입력 스트림을 입력 자원으로 포장

      // HTTP 응답 헤더를 준비한다. (캐시를 막기 위한 헤더 설정)
      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");

      // 다운로드 파일명을 지정하고 싶다면 다음의 응답 헤더를 추가하라!
      // => 다운로드 파일을 지정하지 않으면 요청 URL이 파일명으로 사용된다.
      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

      return ResponseEntity.ok() // HTTP 응답 프로토콜에 따라 응답을 수행할 생성기를 준비한다.
          .headers(header) // 응답 헤더를 설정한다.
          .contentLength(downloadFile.length()) // 응답할 파일의 크기를 설정한다.
          .contentType(MediaType.APPLICATION_OCTET_STREAM) // 응답 콘텐트의 MIME 타입을 설정한다.
          .body(resource); // 응답 콘텐트를 생성한 후 리턴한다.

    } catch (Exception e) {
      //e.printStackTrace();
      System.out.println("요청한 파일이 없습니다.");
      return null;
    }
  }

  @RequestMapping("/userLecture/image3")
  public ResponseEntity<Resource> image3(String filename) {

    try {
      // 다운로드할 파일의 입력 스트림 자원을 준비한다.
      File downloadFile = new File("./upload/creator/" + filename); // 다운로드 상대 경로 준비
      FileInputStream fileIn = new FileInputStream(downloadFile.getCanonicalPath()); // 다운로드 파일의 실제 경로를 지정하여 입력 스트림 준비
      InputStreamResource resource = new InputStreamResource(fileIn); // 입력 스트림을 입력 자원으로 포장

      // HTTP 응답 헤더를 준비한다. (캐시를 막기 위한 헤더 설정)
      HttpHeaders header = new HttpHeaders();
      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
      header.add("Pragma", "no-cache");
      header.add("Expires", "0");

      // 다운로드 파일명을 지정하고 싶다면 다음의 응답 헤더를 추가하라!
      // => 다운로드 파일을 지정하지 않으면 요청 URL이 파일명으로 사용된다.
      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

      return ResponseEntity.ok() // HTTP 응답 프로토콜에 따라 응답을 수행할 생성기를 준비한다.
          .headers(header) // 응답 헤더를 설정한다.
          .contentLength(downloadFile.length()) // 응답할 파일의 크기를 설정한다.
          .contentType(MediaType.APPLICATION_OCTET_STREAM) // 응답 콘텐트의 MIME 타입을 설정한다.
          .body(resource); // 응답 콘텐트를 생성한 후 리턴한다.

    } catch (Exception e) {
      //e.printStackTrace();
      System.out.println("요청한 파일이 없습니다.");
      return null;
    }
  }

}
