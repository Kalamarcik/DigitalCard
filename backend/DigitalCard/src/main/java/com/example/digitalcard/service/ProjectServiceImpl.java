package com.example.digitalcard.service;

import com.example.digitalcard.dto.ProjectDto;
import com.example.digitalcard.entity.Project;
import com.example.digitalcard.entity.User;
import com.example.digitalcard.repository.ProjectRepository;
import com.example.digitalcard.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;

    public ProjectServiceImpl(ProjectRepository projectRepo, UserRepository userRepo) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }

    @Override
    public ProjectDto saveProject(ProjectDto dto, MultipartFile imageFile) {
        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String fileName = System.currentTimeMillis() + "-" + imageFile.getOriginalFilename();

        // Gerçek dizin (örnek: /Users/kalamarcik/digital-card-project/uploads)
        String uploadPath = System.getProperty("user.dir") + "/uploads";
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        try {
            File destinationFile = new File(uploadPath + "/" + fileName);
            imageFile.transferTo(destinationFile);
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed", e);
        }

        Project project = new Project(
                dto.getTitle(),
                dto.getDescription(),
                "/uploads/" + fileName, // public image path
                dto.getTechnologies(),
                user
        );

        Project saved = projectRepo.save(project);

        dto.setId(saved.getId());
        dto.setImageUrl(saved.getImagePath());
        return dto;
    }

    @Override
    public List<ProjectDto> getProjectsByUserId(Long userId) {
        return projectRepo.findByUserId(userId).stream().map(project -> {
            ProjectDto dto = new ProjectDto();
            dto.setId(project.getId());
            dto.setTitle(project.getTitle());
            dto.setDescription(project.getDescription());
            dto.setImageUrl(project.getImagePath());
            dto.setTechnologies(project.getTechnologies());
            dto.setUserId(project.getUser().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteProject(Long projectId) {
        projectRepo.deleteById(projectId);
    }
}
