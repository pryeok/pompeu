package com.pompeu.admin.member.service;

import java.util.List;
import java.util.Map;
import com.pompeu.domain.Member;

public interface MemberService {

  /**
   * 회원 현황
   * @return
   */
  int countAll();

  /**
   * 회원 현황
   * @return
   */
  List<Integer> findCount();

  /**
   * 회원 목록
   * @return
   */
  List<Member> findAll();

  /**
   * 회원 상세 조회
   * @param no
   * @return
   */
  Member findByNo(int no);

  /**
   * 회원 상세 구분 조회
   * @param no
   * @return
   */
  Member findByMemberTypeNo(int no);

  /**
   * 회원 상세 이름 조회
   * @param name
   * @return
   */
  List<Member> findByName(String name);

  /**
   * 회원 상세 휴대번호 조회
   * @param phone
   * @return
   */
  List<Member> findByphone(String phone);

  /**
   * 회원 조건 조회
   * @param member
   * @return
   * 
   */
  List<Map<String,Object>> srchMember(Member member);

  int memberRegi(Member member);

}