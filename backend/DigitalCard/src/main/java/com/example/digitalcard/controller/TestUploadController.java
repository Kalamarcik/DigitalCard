package com.example.digitalcard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api")
public class TestUploadController {

    private final String uploadDir = "uploads/";

    @PostMapping("/test-upload")
    public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Dosya boş!");
        }

        try {
            // Uygulama dizininde uploads klasörü
            String uploadDir = System.getProperty("user.dir") + "/uploads";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs(); // klasör yoksa oluştur
            }

            String filePath = uploadDir + "/" + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            return ResponseEntity.ok("Dosya başarıyla yüklendi: " + file.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Yükleme sırasında hata oluştu: " + e.getMessage());
        }
    }
}



