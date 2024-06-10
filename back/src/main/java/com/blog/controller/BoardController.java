package com.blog.controller;

import com.blog.dto.BoardDTO;
import com.blog.service.BoardService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
@CrossOrigin(origins = "*")
public class BoardController {
	
    private final BoardService boardService;
    
    @ResponseBody
    @PostMapping("/write")
    public void save(@RequestParam("data") String formData,
    			     @RequestParam("boardFile") MultipartFile file) throws JsonProcessingException {
    	ObjectMapper objectMapper = new ObjectMapper();
    	BoardDTO boardDTO = objectMapper.readValue(formData, BoardDTO.class);

    	String filePath = "/program/react-app/blog/public/upload/" ;
    	UUID uuid = UUID.randomUUID();
    	String originalFileName = file.getOriginalFilename();
    	String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
    	String fileName = uuid + extension;

    	try {
			file.transferTo(new File(filePath + fileName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	boardDTO.setBoardFile(fileName);
    	boardService.save(boardDTO);
    } 
    
    @GetMapping("/")
    public List<BoardDTO> findAll() {
        List<BoardDTO> boardDTOList = boardService.findAll();
        return boardDTOList;
    }
    
    @GetMapping("/@{id}")
    public BoardDTO findById(@PathVariable Long id) {
        BoardDTO boardDTO = boardService.findById(id);
        return boardDTO;
    }

    @GetMapping("/delete/@{id}")
    public void delete(@PathVariable Long id) {
        boardService.delete(id);
    }

    @PostMapping("/update/@{id}")
    public void update(@PathVariable Long id,
    				   @RequestBody BoardDTO boardDTO) {
        boardService.update(boardDTO);
    }
    
}