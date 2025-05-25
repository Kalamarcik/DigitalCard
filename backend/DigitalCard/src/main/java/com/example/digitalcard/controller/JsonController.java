package com.example.digitalcard.controller;

import com.example.digitalcard.entity.User;
import com.example.digitalcard.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/api/json")
public class JsonController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Belirli bir kullanıcının tüm verilerini JSON formatında dışa aktar
     */
    @GetMapping("/export/{userId}")
    public ResponseEntity<InputStreamResource> exportUserData(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try {
            // Veriyi JSON string'e çevir
            String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(userOpt.get());

            // Byte stream olarak dön
            ByteArrayInputStream inputStream = new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8));
            InputStreamResource resource = new InputStreamResource(inputStream);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(ContentDisposition.attachment().filename("user-data.json").build());
            headers.setContentType(MediaType.APPLICATION_JSON);

            return new ResponseEntity<>(resource, headers, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/import")
    @Transactional
    public ResponseEntity<String> importUserData(@RequestParam("file") MultipartFile file) {
        try {
            // Dosyadan gelen User objesini deserialize et (ama direkt kaydetme!)
            User incomingData = objectMapper.readValue(file.getInputStream(), User.class);

            // LocalStorage'dan gelen kullanıcı id'si client tarafından gönderilmemeli.
            // Bunun yerine, güvenli bir şekilde kim giriş yaptıysa onun id'si alınmalı.
            // Örneğin: Auth sistemine bağlıysan SecurityContext'ten alabilirsin.
            Long currentUserId = getCurrentUserId(); // Bu metodu sen tanımlayabilirsin

            Optional<User> existingOpt = userRepository.findById(currentUserId);
            if (existingOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Geçerli kullanıcı bulunamadı.");
            }

            User existingUser = existingOpt.get();

            // Yalnızca güncellenebilir alanları set et
            existingUser.setFullName(incomingData.getFullName());
            existingUser.setBio(incomingData.getBio());
            existingUser.setAvatarUrl(incomingData.getAvatarUrl());
            // (email, password gibi hassas alanları bilerek değiştirmiyoruz!)

            // Eski verileri temizle → yeni gelen verilerle değiştir
            existingUser.getProjects().clear();
            existingUser.getSkills().clear();
            existingUser.getSocialMediaList().clear();

            if (incomingData.getProjects() != null) {
                incomingData.getProjects().forEach(project -> {
                    project.setId(null);
                    project.setUser(existingUser);
                    existingUser.getProjects().add(project);
                });
            }

            if (incomingData.getSkills() != null) {
                incomingData.getSkills().forEach(skill -> {
                    skill.setId(null);
                    skill.setUser(existingUser);
                    existingUser.getSkills().add(skill);
                });
            }

            if (incomingData.getSocialMediaList() != null) {
                incomingData.getSocialMediaList().forEach(sm -> {
                    sm.setId(null);
                    sm.setUser(existingUser);
                    existingUser.getSocialMediaList().add(sm);
                });
            }

            // Güncelle ve kaydet
            userRepository.save(existingUser);

            return ResponseEntity.ok("Veriler başarıyla güncellendi.");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Geçersiz JSON dosyası.");
        }
    }


    public Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();

        if (principal instanceof User user) {
            return user.getId();
        }

        throw new RuntimeException("Oturum açmış kullanıcı bulunamadı.");
    }



}
