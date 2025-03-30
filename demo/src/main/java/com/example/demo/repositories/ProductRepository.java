package com.example.demo.repositories;


import com.example.demo.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderByPositionAsc();

    @Query("SELECT COALESCE(MAX(p.position),0) FROM Product p")
    Integer findMaxPosition();
    @Modifying
    @Query("UPDATE Product p SET p.position = NULL")
    void clearAllPositions();

    @Query("SELECT p FROM Product p")
    List<Product> findAll();
    @Modifying
    @Query("UPDATE Product p SET p.position = :newPosition WHERE p.id = :productId")
    void updatePosition(@Param("productId") Long productId,
                        @Param("newPosition") int newPosition);
}