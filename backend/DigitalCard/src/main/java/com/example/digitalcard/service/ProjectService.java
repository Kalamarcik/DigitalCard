package com.example.digitalcard.service;

import com.example.digitalcard.dto.ProjectDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {
    ProjectDto saveProject(ProjectDto dto, MultipartFile imageFile);
    List<ProjectDto> getProjectsByUserId(Long userId);
    void deleteProject(Long projectId);
    ProjectDto updateProject(ProjectDto dto, MultipartFile imageFile);
}
