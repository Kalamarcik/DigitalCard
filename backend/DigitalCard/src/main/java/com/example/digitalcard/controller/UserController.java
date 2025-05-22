package com.example.digitalcard.controller;

import com.example.digitalcard.dto.SocialMediaDto;
import com.example.digitalcard.dto.UserDto;
import com.example.digitalcard.dto.UserRequest;
import com.example.digitalcard.entity.SocialMedia;
import com.example.digitalcard.entity.User;
import com.example.digitalcard.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://192.168.1.69:4200") // Angular'dan gelen isteklere izin ver
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Yeni kullanıcı oluştur
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    //Tüm kullanıcıları getir
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //ID ile kullanıcı getir
    /*@GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }*/

    // Kullanıcı sil
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserDtoById(@PathVariable Long id) {
        User user = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
        UserDto dto = mapToDto(user);
        return ResponseEntity.ok(dto);
    }

    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFullName(user.getFullName());
        dto.setBio(user.getBio());
        dto.setEmail(user.getEmail());
        dto.setAvatarUrl(user.getAvatarUrl());

        if (user.getSocialMediaList() != null) {
            List<SocialMediaDto> smList = user.getSocialMediaList().stream().map(sm -> {
                SocialMediaDto s = new SocialMediaDto();
                s.setId(sm.getId());
                s.setPlatform(sm.getPlatform());
                s.setUrl(sm.getUrl());
                s.setUserId(user.getId());
                return s;
            }).collect(Collectors.toList());

            dto.setSocialMediaList(smList);
        }

        return dto;
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserRequest req) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(req.getFullName());
        user.setBio(req.getBio());
        user.setAvatarUrl(req.getAvatarUrl());

        List<SocialMedia> existingList = user.getSocialMediaList();
        List<SocialMediaDto> incomingList = req.getSocialMediaList();

        // Silinecek olanlar
        Set<Long> incomingIds = incomingList.stream()
                .filter(i -> i.getId() != null)
                .map(SocialMediaDto::getId)
                .collect(Collectors.toSet());

        existingList.removeIf(existing -> existing.getId() != null && !incomingIds.contains(existing.getId()));

        for (SocialMediaDto dto : incomingList) {
            if (dto.getId() != null) {
                for (SocialMedia existing : existingList) {
                    if (existing.getId().equals(dto.getId())) {
                        existing.setPlatform(dto.getPlatform());
                        existing.setUrl(dto.getUrl());
                    }
                }
            } else {
                SocialMedia sm = new SocialMedia();
                sm.setPlatform(dto.getPlatform());
                sm.setUrl(dto.getUrl());
                sm.setUser(user);
                existingList.add(sm);
            }
        }

        user.setSocialMediaList(existingList);

        User saved = userService.saveUser(user);
        return ResponseEntity.ok(mapToDto(saved));
    }








}
