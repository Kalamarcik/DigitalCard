package com.example.digitalcard.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String fullName;

    private String bio;

    private String email;

    private String password;

    private String avatarUrl;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SocialMedia> socialMediaList;

    // Boş constructor (JPA için)
    public User() {}

    // Parametreli constructor
    public User(String username, String fullName, String bio, String email, String password, String avatarUrl) {
        this.username = username;
        this.fullName = fullName;
        this.bio = bio;
        this.email = email;
        this.password = password;
        this.avatarUrl = avatarUrl;
    }

    // Getter & Setter’lar
    public Long getId() {
        return id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<SocialMedia> getSocialMediaList() {
        return socialMediaList;
    }

    public void setSocialMediaList(List<SocialMedia> socialMediaList) {
        this.socialMediaList = socialMediaList;
    }

}
