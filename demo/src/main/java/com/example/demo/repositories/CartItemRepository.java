package com.example.demo.repositories;

import com.example.demo.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("SELECT COUNT(ci) > 0 FROM CartItem ci WHERE ci.product.id = :id")
    boolean existsByProductId(Long id);
}
