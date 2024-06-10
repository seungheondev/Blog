package com.blog.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberDTO {
	
    private Long id;
    private String memberID;
    private String memberPassword;
    private String memberName;
    private Timestamp memberRegDate;
    
}