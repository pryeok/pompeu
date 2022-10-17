package com.pompeu.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.pompeu.domain.Challenge;

@Mapper
public interface ChallengeDao {

  int countAll();

  List<Challenge> findAll();

  int insert(Challenge challenge);

  Challenge findByNo(int no);

  int update(Challenge challenge);

  int delete(int no);

  int increaseViewCount(int no);


}




