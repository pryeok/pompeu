package com.pompeu.admin.member.service;

import java.util.List;
import java.util.Map;
import com.pompeu.domain.Member;

public interface MemberService {

  List<Member> list();

  int add(Member member);

  Member get(int no);

  int update(Member member);

  int delete(int no);

  List<Integer> findCount();

  List<Integer> findGoodbyeCount();

  List<Member> srchMember(Member member);

  List<Member> srchGoodbyeMember(Member member);

  List<Map<Object, Object>> getLecture(int no);

  Member findGoodbyeReason(int no);

  List<Map<Object, Object>> creatorLecture(int no);

  List<Map<Object, Object>> applyingLecture(int no);

}