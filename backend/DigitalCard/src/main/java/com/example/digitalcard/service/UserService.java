package com.example.digitalcard.service;

import com.example.digitalcard.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    Optional<User> getUserById(Long id);

    List<User> getAllUsers();

    Optional<User> getByUsername(String username);

    boolean emailExists(String email);

    void deleteUser(Long id);
}
