package com.blog.controller;

import com.blog.dto.MemberDTO;
import com.blog.service.MemberService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
@CrossOrigin(origins = "*")
public class MemberController {
	
    private final MemberService memberService;

    @PostMapping("/save")
    public void save(@ModelAttribute MemberDTO memberDTO) {
    	memberService.save(memberDTO);
    }

    @PostMapping("/login")
    public MemberDTO login(@RequestBody MemberDTO memberDTO) {
        boolean loginResult = memberService.login(memberDTO);
        if (loginResult) {
            return memberDTO;
        } else {
        	return null;
        }
    }
    
    @GetMapping("/@{id}")
    public MemberDTO findById(@PathVariable Long id) {
        MemberDTO memberDTO = memberService.findById(id);
        return memberDTO;
    }

    @GetMapping("/delete")
    public void delete(@RequestParam("id") Long id) {
        memberService.delete(id);
    }

    @PostMapping("/update")
    public void update(@ModelAttribute MemberDTO memberDTO) {
        memberService.update(memberDTO);
    }

}