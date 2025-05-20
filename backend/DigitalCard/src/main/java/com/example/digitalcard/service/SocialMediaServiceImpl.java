package com.example.digitalcard.service;

import com.example.digitalcard.dto.SocialMediaDto;
import com.example.digitalcard.entity.SocialMedia;
import com.example.digitalcard.entity.User;
import com.example.digitalcard.repository.SocialMediaRepository;
import com.example.digitalcard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocialMediaServiceImpl implements SocialMediaService {

    private final SocialMediaRepository socialMediaRepository;
    private final UserRepository userRepository;

    public SocialMediaServiceImpl(SocialMediaRepository socialMediaRepository,
                                  UserRepository userRepository) {
        this.socialMediaRepository = socialMediaRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<SocialMedia> getSocialMediaByUserId(Long userId) {
        return socialMediaRepository.findByUserId(userId);
    }

    @Override
    public SocialMedia saveSocialMedia(SocialMedia media) {

        System.out.println("Gelen user ID: " + media.getUser());
        System.out.println("Gelen user ID (gerçek): " + (media.getUser() != null ? media.getUser().getId() : "YOK"));

        if (media.getUser() == null || media.getUser().getId() == null) {
            throw new IllegalArgumentException("User ID is required.");
        }

        Long userId = media.getUser().getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        media.setUser(user);
        return socialMediaRepository.save(media);
    }

    @Override
    public void deleteSocialMedia(Long id) {
        socialMediaRepository.deleteById(id);
    }


    public SocialMedia saveSocialMediaDto(SocialMediaDto dto) {
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("User ID is required.");
        }

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + dto.getUserId()));

        SocialMedia media = new SocialMedia();
        media.setPlatform(dto.getPlatform());
        media.setUrl(dto.getUrl());
        media.setUser(user);

        return socialMediaRepository.save(media);
    }

}
