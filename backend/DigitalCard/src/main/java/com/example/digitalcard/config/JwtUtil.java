package com.example.digitalcard.config;

import com.example.digitalcard.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // ✅ En az 32 karakterlik sabit secret key (256-bit)
    private static final String SECRET = "Wf8rJx09KqLs7ZtCvNaRbM3yXpD2e6UhGvTqWcYjLmEsPoBxHdRgVnAkMzLqTyZu";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // Token oluştur
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("id", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1 gün geçerli
                .signWith(key)
                .compact();
    }

    // Token'dan username çıkar
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Token geçerli mi kontrol et
    public boolean validateToken(String token, User user) {
        try {
            String username = extractUsername(token);
            return username.equals(user.getUsername());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
