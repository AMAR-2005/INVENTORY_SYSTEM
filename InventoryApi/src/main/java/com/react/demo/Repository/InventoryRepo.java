package com.react.demo.Repository;

import com.react.demo.Model.Items;
import com.react.demo.Model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepo extends JpaRepository< Items, Integer> {

}
