package com.example.techshop_api.repository;

import com.example.techshop_api.entity.inventory.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
