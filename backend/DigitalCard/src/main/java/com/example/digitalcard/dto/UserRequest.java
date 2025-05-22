package com.example.digitalcard.dto;

import java.util.List;

public class UserRequest {
    private String fullName;
    private String bio;
    private String avatarUrl;
    private List<SocialMediaDto> socialMediaList;


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
