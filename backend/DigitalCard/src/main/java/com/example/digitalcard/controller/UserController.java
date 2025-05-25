package com.example.digitalcard.controller;

import com.example.digitalcard.dto.SocialMediaDto;
import com.example.digitalcard.dto.UserDto;
import com.example.digitalcard.dto.UserRequest;
import com.example.digitalcard.entity.SocialMedia;
import com.example.digitalcard.entity.User;
import com.example.digitalcard.service.QrCodeService;
import com.example.digitalcard.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final QrCodeService qrCodeService;


    public UserController(UserService userService, QrCodeService qrCodeService) {
        this.userService = userService;
        this.qrCodeService = qrCodeService;
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

    @GetMapping("/by-username/{username}")
    public ResponseEntity<UserDto> getUserDtoByUsername(@PathVariable String username) {
        User user = userService.getByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 👇 Guest sayısını artır
        Integer oldCount = user.getGuestCount() != null ? user.getGuestCount() : 0;
        user.setGuestCount(oldCount + 1);
        userService.saveUser(user); // guestCount artışını kaydet

        UserDto dto = mapToDto(user);
        return ResponseEntity.ok(dto);
    }


    @GetMapping("/cards")
    public ResponseEntity<List<UserDto>> getAll(
            @RequestParam(required = false) String query) {

        List<User> users = userService.getAllUsers();

        // Filtreleme varsa burauygula
        if (query != null && !query.isBlank()) {
            String lowerQuery = query.toLowerCase();
            users = users.stream()
                    .filter(user -> user.getUsername().toLowerCase().contains(lowerQuery)
                            || user.getFullName().toLowerCase().contains(lowerQuery))
                    .collect(Collectors.toList());
        }
        //yoksa bura
        List<UserDto> dtos = users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }


    @GetMapping("/qr/username/{username}")
    public ResponseEntity<byte[]> getQrCodeByUsername(@PathVariable String username) {
        try {
            String url = "http://192.168.1.69:4200/cards/" + username;
            System.out.println("QR URL: " + url); // 👉 BURAYI KONTROL ET

            byte[] qrImage = qrCodeService.generateQrCode(url, 250, 250);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .header("Cache-Control", "no-cache, no-store, must-revalidate")
                    .header("Pragma", "no-cache")
                    .header("Expires", "0")
                    .body(qrImage);
        } catch (Exception e) {
            e.printStackTrace(); // hata varsa göster
            return ResponseEntity.status(500).build();
        }
    }





    public UserDto mapToDto(User user) {
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
