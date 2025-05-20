package com.example.digitalcard.repository;

import com.example.digitalcard.entity.SocialMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SocialMediaRepository extends JpaRepository<SocialMedia, Long> {

    List<SocialMedia> findByUserId(Long userId);
}
