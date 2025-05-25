package com.example.digitalcard.repository;

import com.example.digitalcard.entity.GuestVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestVisitRepository extends JpaRepository<GuestVisit, Long> {
    // Gerekirse burada kullanıcıya göre sorgular ekleyebilirsin
}
