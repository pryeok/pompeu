package com.pompeu.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.pompeu.domain.Member;
import com.pompeu.login.dao.UserDao;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PrincipalDetailService implements UserDetailsService {

  //  @Autowired
  //  LoginDao loginDao;

  @Autowired
  UserDao userDao;


  //  @Autowired
  //  PasswordEncoder passwordEncoder;


  //시큐리티 설정에서 loginProcessingUrl();
  //login 요청시 자동으로 UserDetatilsService 타입으로 ioc되어 있는 loadUserByUsername 함수가 실행


  //스프링이 로그인 요청을 가로챌 때 username, password 변수 2개를 가로채는데
  //password 부분 처리는 알아서 함.
  //username이 DB에 있는지만 확인해주면 됨
  /* DB에서 유저정보를 불러온다.
   * Custom한 Userdetails 클래스를 리턴 해주면 된다.
   * */

  //시큐리티 session(내부 Authentication(내부 UserDetails))
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    //시큐리티 session = Authentication = UserDetails
    log.info("유저이메일 log...");
    System.out.println("email:" + email);
    Member member = userDao.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email + "not found"));
    System.out.println(userDao.findUseCheck(email));
    if (userDao.findUseCheck(email) == 2) {
      return null; // 탈퇴회원 로그인불가
    } else {

      System.out.println( member.getNo());
      member.setNo(userDao.findByMemberNo(email));
      System.out.println("=======");
      System.out.println(member.getNo());
      return member;
    }
  }












  //       .orElseThrow(() -> {
  //         return new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다.:"+email);
  //       });
  //       return new UserPrincipal(principal);  // 시큐리티의 세션에 유저 정보가 저장이 됨

  //    throw new UsernameNotFoundException("User "+email+" Not Found!");
  //   ArrayList<User> userAuthes = loginDao.findByUserEmail("email");
  //   if(userAuthes.size() == 0) {
  //     throw new UsernameNotFoundException("User "+id+" Not Found!");
  //   }
  //   return new UserPrincipal(userAuthes);
  //   }







  //  @Override
  //  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
  //      return userDao.findByEmail(email)
  //  }

  //  private UserDto addAuthorities(UserDto userDto) {
  //      userDto.setAuthorities(Arrays.asList(new SimpleGrantedAuthority(userDto.getRole())));
  //
  //      return userDto;
  //  }

}
















// 시큐리티 설정에서 loginProcessingUrl();
//login 요청시 자동으로 UserDetatilsService 타입으로 ioc되어 있는 loadUserByUsername 함수가 실행


// 스프링이 로그인 요청을 가로챌 때 username, password 변수 2개를 가로채는데
// password 부분 처리는 알아서 함.
// username이 DB에 있는지만 확인해주면 됨
/* DB에서 유저정보를 불러온다.
 * Custom한 Userdetails 클래스를 리턴 해주면 된다.
 * */

// 시큐리티 session(내부 Authentication(내부 UserDetails))
//  @Override
//  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//    System.out.println("loadUSerByUsername 호출: " + email);
//    log.info("Username log...");
//    System.out.println("email: " + email);
//    Member principal = userDao.findByEmail(email);
//    if (principal != null) {
//      return new UserPrincipal(principal);
//    }
//    throw new UsernameNotFoundException("User "+email+" Not Found!");
//  }
// 시큐리티 session = Authentication = UserDetails
//      .orElseThrow(() -> {
//        return new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다.:"+email);
//      });
//      return new UserPrincipal(principal);  // 시큐리티의 세션에 유저 정보가 저장이 됨

//    ArrayList<User> userAuthes = loginDao.findByUserEmail("email");
//    if(userAuthes.size() == 0) {
//      throw new UsernameNotFoundException("User "+id+" Not Found!");
//    }
//    return new UserPrincipal(userAuthes);
//    }



//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public String InsertUser(User user) {
//      
//      user.setPassword(passwordEncoder.encode(user.getPassword()));
//      int flag = loginDao.userSave(user);     
//      if (flag > 0) {
//
//          int userNo = loginDao.findUserNo(user.getId());
//          int roleNo = loginDao.findRoleNo(user.getRoleName());
//
//          loginDao.userRoleSave(userNo, roleNo);
//
//          return "success";
//      }       
//      return "fail";
//  }
//
//}


