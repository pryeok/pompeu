package com.pompeu.security.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;
import com.pompeu.security.CustomAccessdeniedHandler;
import com.pompeu.security.CustomLoginFailureHandler;
import com.pompeu.security.CustomLoginSuccessHandler;
import lombok.RequiredArgsConstructor;
//import com.pompeu.config.oauth.PrincipalOauth2UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Configuration      // bean 등록 및 각종 설정
@EnableWebSecurity  // springSecurity 필터 사용
@EnableGlobalMethodSecurity(
    securedEnabled = true,  // @Secured 어노테이션 활성화
    jsr250Enabled = true,   // @RolesAllowed 어노테이션 활성화
    prePostEnabled = true)  // @prePost 어노테이션 활성화
public class SecuityConfig extends WebSecurityConfigurerAdapter {

  //  @Autowired
  //  private PrincipalDetailService principalDetailService;

  //  @Autowired
  //  private PrincipalOauth2UserService principalOauth2UserService;

  @Autowired
  CorsFilter corsFilter;

  @Bean // 비밀번호 암호화
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Autowired
  CustomLoginSuccessHandler successHandler;

  @Autowired
  CustomLoginFailureHandler failureHandler;

  @Autowired
  CustomAccessdeniedHandler accessdeniedHandler;

  //  @Bean
  //  @Override
  //  public AuthenticationManager authenticationManagerBean() throws Exception {
  //    return super.authenticationManagerBean();
  //  }


  //  @Bean //실제 인증을 한 이후에 인증이 완료되면 Authentication객체를 반환을 위한 bean등록
  //  public DaoAuthenticationProvider authenticationProvider(SecurityService homeService) {
  //      DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
  //      authenticationProvider.setUserDetailsService(homeService);
  //      authenticationProvider.setPasswordEncoder(passwordEncoder());
  //      return authenticationProvider;
  //  }


  @Override
  protected void configure(HttpSecurity http) throws Exception{
    //HTTP 관련 보안 설정   
    // 경로 권한설정
    http              // .cors() cors 허용
    .addFilter(corsFilter) // 시큐리티 필터에 등록
    .httpBasic()
    .disable()// rest api시 httpBasic 비활성화 token사용시
    //    .and()
    .csrf()
    .disable()         // rest api시 csrf 비활성화


    //        .and()
    .authorizeRequests()
    .antMatchers("/").permitAll()
    .antMatchers("/user/user-join").permitAll()
    .antMatchers("/join/**").permitAll()
    .antMatchers("/*/login/**", "/login/auth/**").permitAll()
    .antMatchers("/mypage/**").hasRole("USER")
    .antMatchers("/user/party/party-regist.html").hasRole("USER")
    .antMatchers("/userparty/crewAdd").hasRole("USER")
    //        .antMatchers("/user/main/**").permitAll()
    //    .antMatchers("/user/**").hasAnyRole("ADMIN", "CREATOR", "USER")
    .antMatchers("/creator/**").permitAll()
    //.antMatchers("/creator/**").hasRole("ADMIN")
    .antMatchers("/admin/**").hasRole("ADMIN") // ROLE_ADMIN
    //    .anyRequest().authenticated() // authenticated() 요청에대해 인증된사용자만 접근설정

    .and()

    .formLogin()
    //    .disable() // 폼기반 로그인 인증 허용x
    .loginPage("/user/login/login.html")
    .loginProcessingUrl("/user/login") // login 주소 호출시 시큐리티가 진행
    .usernameParameter("email")
    .passwordParameter("password")
    .successHandler(successHandler)
    .failureHandler(failureHandler)
    //    .failureUrl("/user/login/login.html");
    //
    .and()
    .logout()


    .logoutUrl("/user/logout")
    .deleteCookies("JSESSIONID") // 쿠키삭제
    .invalidateHttpSession(true) // 로그아웃시 세션초기화
    .logoutSuccessUrl("/user/main/user-main.html")
    //
    .and()
    //
    .exceptionHandling()  // ExceptionHandler 설정
    //              .authenticationEntryPoint(new RestAuthenticationEntryPoint())
    //    .accessDeniedPage("/form/denied.html")
    .accessDeniedHandler(accessdeniedHandler)    
    //
    //        .and()
    //    //
    //    //
    //        .oauth2Login();
    //    .loginPage("/user/login/login.html")
    //    .userInfoEndpoint()  // 유저인포 엔트리포인트 유저서비스로 설정
    //    .userService(principalOauth2UserService);
    // 구글 로그인완료뒤 후처리 Tip 코드X (엑세스토큰+사용자프로필정보 O)


    .and()
    .sessionManagement()
    .maximumSessions(1) //같은 아이디로 1명만 로그인
    .maxSessionsPreventsLogin(false) //false :신규 로그인은 허용, 기존 사용자는 세션 아웃  true: 이미 로그인 한경우 로그인 불가 
    .expiredUrl("/user/login/login.html"); // 세션만료시 경로 

  }



  //  어떤 Authentication 매니저를 사용할지
  //  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  //  @Override
  //  public AuthenticationManager authenticationManagerBean() throws Exception {
  //    return super.authenticationManager();
  //  }




  @Override
  public void configure(WebSecurity web) {
    //이미지,자바스크립트,css 디렉토리 보안 설정 
    web.ignoring().antMatchers("/resource/static/css/**",
        "/css/**",
        "/js/**",
        "/form/**",
        "/image/**",
        "/resource/static/user/js/**", "resource/img/**",
        "resource/static/js/**",
        "/resource/static/form/**");    
  }


}