package com.example.digitalcard.controller;

import com.example.digitalcard.dto.SocialMediaDto;
import com.example.digitalcard.entity.SocialMedia;
import com.example.digitalcard.service.SocialMediaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/social-media")
@CrossOrigin(origins = "http://192.168.1.69:4200")
public class SocialMediaController {

    private final SocialMediaService socialMediaService;

    public SocialMediaController(SocialMediaService socialMediaService) {
        this.socialMediaService = socialMediaService;
    }

    // Kullanıcının sosyal medya linklerini getir
    @GetMapping("/user/{userId}")
    public List<SocialMedia> getSocialMediaByUserId(@PathVariable Long userId) {
        return socialMediaService.getSocialMediaByUserId(userId);
    }

    // yeni sosyal medya linki ekle
    /*@PostMapping
    public SocialMedia addSocialMedia(@RequestBody SocialMedia socialMedia) {
        return socialMediaService.saveSocialMedia(socialMedia);
    }*/

    //sosyal medya linki sil
    @DeleteMapping("/{id}")
    public void deleteSocialMedia(@PathVariable Long id) {
        socialMediaService.deleteSocialMedia(id);
    }

    @PostMapping
    public ResponseEntity<SocialMedia> addSocialMedia(@RequestBody SocialMediaDto dto) {
        SocialMedia created = socialMediaService.saveSocialMediaDto(dto);
        return ResponseEntity.ok(created);
    }




}
