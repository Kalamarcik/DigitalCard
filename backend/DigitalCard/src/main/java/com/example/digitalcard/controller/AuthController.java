package com.example.digitalcard.controller;

import com.example.digitalcard.config.JwtUtil;
import com.example.digitalcard.dto.LoginRequest;
import com.example.digitalcard.dto.LoginResponseDto;
import com.example.digitalcard.dto.RegisterRequest;
import com.example.digitalcard.entity.User;
import com.example.digitalcard.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserController userController;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;


    public AuthController(UserService userService, UserController userController, JwtUtil jwtUtil , PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userController = userController;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userService.emailExists(request.getEmail())) {
            return ResponseEntity.badRequest().body("Bu e-posta adresi zaten kayıtlı.");
        }

        if(userService.usernameExists(request.getUsername())) {
            return ResponseEntity.badRequest().body("Bu kullanıcı adı alınmış.");
        }

        // 🔐 Şifreyi hashle
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getUsername(),
                request.getFullName(),
                "", // bio
                request.getEmail(),
                encodedPassword, // ✔ HASH'LENMİŞ ŞİFRE
                "" // avatarUrl
        );

        userService.saveUser(user);
        return ResponseEntity.ok("Kayıt başarılı");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest httpReq) {
        Optional<User> optionalUser = userService.getAllUsers().stream()
                .filter(u -> u.getEmail().equals(request.getEmail()))
                .filter(u -> passwordEncoder.matches(request.getPassword(), u.getPassword()))
                .findFirst();

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("Geçersiz e-posta veya şifre.");
        }

        User user = optionalUser.get();
        user.setLastLogin(LocalDateTime.now());
        user.setLoginCount(user.getLoginCount() + 1);
        userService.saveUser(user);

        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", userController.mapToDto(user)
        ));
    }


    private String getClientIpAddress(HttpServletRequest request) {
        // Proxy headers'ları kontrol et
        String[] headerNames = {
                "X-Forwarded-For",
                "X-Real-IP",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_X_FORWARDED_FOR",
                "HTTP_X_FORWARDED",
                "HTTP_X_CLUSTER_CLIENT_IP",
                "HTTP_CLIENT_IP",
                "HTTP_FORWARDED_FOR",
                "HTTP_FORWARDED"
        };

        for (String header : headerNames) {
            String ip = request.getHeader(header);
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                // Birden fazla IP varsa ilkini al
                if (ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                // Localhost değilse kullan
                if (!isLocalhost(ip)) {
                    return ip;
                }
            }
        }

        // Remote address'i kontrol et
        String remoteAddr = request.getRemoteAddr();

        // IPv6 localhost'u IPv4'e çevir
        if ("0:0:0:0:0:0:0:1".equals(remoteAddr) || "::1".equals(remoteAddr)) {
            remoteAddr = "127.0.0.1";
        }

        // Eğer localhost ise ve development environment'taysa gerçek IP'yi bulmaya çalış
        if (isLocalhost(remoteAddr)) {
            String realIp = getRealLocalIp();
            return realIp != null ? realIp : remoteAddr;
        }

        return remoteAddr;
    }

    private boolean isLocalhost(String ip) {
        return ip == null ||
                "127.0.0.1".equals(ip) ||
                "localhost".equals(ip) ||
                "0:0:0:0:0:0:0:1".equals(ip) ||
                "::1".equals(ip) ||
                ip.startsWith("192.168.") ||
                ip.startsWith("10.") ||
                ip.startsWith("172.");
    }

    private String getRealLocalIp() {
        try {
            java.net.NetworkInterface networkInterface = java.net.NetworkInterface.getByName("eth0");
            if (networkInterface == null) {
                // Windows için
                networkInterface = java.net.NetworkInterface.getByName("wlan0");
            }
            if (networkInterface == null) {
                // Tüm network interface'leri kontrol et
                java.util.Enumeration<java.net.NetworkInterface> interfaces = java.net.NetworkInterface.getNetworkInterfaces();
                while (interfaces.hasMoreElements()) {
                    java.net.NetworkInterface ni = interfaces.nextElement();
                    if (!ni.isLoopback() && ni.isUp()) {
                        java.util.Enumeration<java.net.InetAddress> addresses = ni.getInetAddresses();
                        while (addresses.hasMoreElements()) {
                            java.net.InetAddress addr = addresses.nextElement();
                            if (!addr.isLoopbackAddress() && addr instanceof java.net.Inet4Address) {
                                return addr.getHostAddress();
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("IP tespit edilemedi: " + e.getMessage());
        }
        return null;
    }
}
