package com.example.digitalcard.dto;

import java.time.LocalDateTime;

public class LoginResponseDto {
    private Long id;
    private String username;
    private String fullName;
    private String bio;
    private String email;
    private String avatarUrl;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private Integer loginCount;

    public LoginResponseDto() {}

    public LoginResponseDto(Long id, String username, String fullName, String bio,
                            String email, String avatarUrl, LocalDateTime createdAt,
                            LocalDateTime lastLogin, Integer loginCount) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.bio = bio;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
        this.loginCount = loginCount;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
    public Integer getLoginCount() { return loginCount; }
    public void setLoginCount(Integer loginCount) { this.loginCount = loginCount; }
}
