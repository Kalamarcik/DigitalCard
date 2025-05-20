package com.example.digitalcard.dto;

import java.util.List;

public class UserDto {
    private Long id;
    private String username;
    private String fullName;
    private String bio;
    private String email;
    private String avatarUrl;
    private List<SocialMediaDto> socialMediaList;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public List<SocialMediaDto> getSocialMediaList() {
        return socialMediaList;
    }

    public void setSocialMediaList(List<SocialMediaDto> socialMediaList) {
        this.socialMediaList = socialMediaList;
    }
}
