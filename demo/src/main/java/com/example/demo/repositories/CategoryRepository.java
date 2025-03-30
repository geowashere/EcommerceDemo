package com.example.demo.repositories;

import com.example.demo.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByOrderByPositionAsc();

    @Query("SELECT COALESCE(MAX(c.position),0) FROM Category c")
    Integer findMaxPosition();
    @Modifying
    @Query("UPDATE Category c SET c.position = NULL")
    void clearAllPositions();

    @Query("SELECT c FROM Category c")
    List<Category> findAll();
    @Modifying
    @Query("UPDATE Category c SET c.position = :newPosition WHERE c.id = :categoryId")
    void updatePosition(@Param("categoryId") Long categoryId,
                        @Param("newPosition") int newPosition);

}
