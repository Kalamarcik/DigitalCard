package com.example.digitalcard.service;

import com.example.digitalcard.dto.SocialMediaDto;
import com.example.digitalcard.entity.SocialMedia;

import java.util.List;

public interface SocialMediaService {

    List<SocialMedia> getSocialMediaByUserId(Long userId);

    SocialMedia saveSocialMedia(SocialMedia media);

    SocialMedia saveSocialMediaDto(SocialMediaDto dto);


    void deleteSocialMedia(Long id);
}
