 package com.blog.repository;

import com.blog.dto.MemberDTO;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
	
    private final SqlSessionTemplate sql;
    
    public int save(MemberDTO memberDTO) {
        return sql.insert("Member.save", memberDTO);
    }
    
    public MemberDTO login(MemberDTO memberDTO) {
        return sql.selectOne("Member.login", memberDTO);
    }
    
    public void delete(Long id) {
        sql.delete("Member.delete", id);
    }
    
    public void update(MemberDTO memberDTO) {
        sql.update("Member.update", memberDTO);
    }
    
    public List<MemberDTO> findAll() {
        return sql.selectList("Member.findAll");
    }
    
    public MemberDTO findById(Long id) {
        return sql.selectOne("Member.findById", id);
    }

    
}