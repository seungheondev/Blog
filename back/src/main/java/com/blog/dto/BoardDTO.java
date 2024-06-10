package com.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {
	
	private Long id;
    private String boardWriter;
    private String boardTitle;
    private String boardContents;
    private String boardFile;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY-MM-dd HH:mm", timezone = "GMT+9")
    private Timestamp boardRegDate;

}