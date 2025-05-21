package com.example.digitalcard.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String imagePath; // Görsel dosya yolu

    @ElementCollection
    private List<String> technologies; // Etiketler

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Project() {}

    public Project(String title, String description, String imagePath, List<String> technologies, User user) {
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.technologies = technologies;
        this.user = user;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
