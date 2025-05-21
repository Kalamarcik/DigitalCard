package com.example.digitalcard.controller;

import com.example.digitalcard.dto.SocialMediaDto;
import com.example.digitalcard.dto.UserDto;
import com.example.digitalcard.entity.User;
import com.example.digitalcard.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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


}
