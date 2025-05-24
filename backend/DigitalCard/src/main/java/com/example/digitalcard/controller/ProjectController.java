package com.example.digitalcard.controller;

import com.example.digitalcard.dto.ProjectDto;
import com.example.digitalcard.service.ProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://192.168.1.69:4200")
public class ProjectController {

    private final ProjectService projectService;
    private final ObjectMapper objectMapper;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
        this.objectMapper = new ObjectMapper();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProjectDto> uploadProject(
            @RequestPart("project") String projectJson,
            @RequestPart("image") MultipartFile imageFile
    ) {
        try {
            ProjectDto projectDto = objectMapper.readValue(projectJson, ProjectDto.class);
            ProjectDto saved = projectService.saveProject(projectDto, imageFile);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse project JSON", e);
        }
    }


    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProjectDto> updateProject(
            @PathVariable Long id,
            @RequestPart("project") String projectJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            ProjectDto projectDto = objectMapper.readValue(projectJson, ProjectDto.class);
            projectDto.setId(id); // Ensure ID is set
            ProjectDto updated = projectService.updateProject(projectDto, imageFile);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse project JSON", e);
        }
    }


    @GetMapping("/user/{userId}")
    public List<ProjectDto> getProjects(@PathVariable Long userId) {
        return projectService.getProjectsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}
