package com.blog.service;

import com.blog.dto.MemberDTO;
import com.blog.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
	
    private final MemberRepository memberRepository;

    public int save(MemberDTO memberDTO) {
        return memberRepository.save(memberDTO);
    }
    
    public boolean login(MemberDTO memberDTO) {
        MemberDTO loginMember = memberRepository.login(memberDTO);
        if (loginMember != null) {
            return true;
        } else {
            return false;
        }
    }

    public void delete(Long id) {
        memberRepository.delete(id);
    }
    
    public void update(MemberDTO memberDTO) {
        memberRepository.update(memberDTO);   
    }
  
    public List<MemberDTO> findAll() {
        return memberRepository.findAll();
    }
    
    public MemberDTO findById(Long id) {
        return memberRepository.findById(id);
    }
    
}