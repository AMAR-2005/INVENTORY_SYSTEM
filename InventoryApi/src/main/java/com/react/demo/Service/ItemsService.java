package com.react.demo.Service;

import com.react.demo.Model.Items;

import com.react.demo.Repository.InventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemsService {
    @Autowired
    InventoryRepo repo;

    public List<Items> getItems() {
        return repo.findAll();
    }

    public Items postItems(Items i) {
        return repo.save(i);
    }

    public Items updateItems(int id, Items i) {
            i.setId(id);
            return repo.save(i);
    }

    public void deleteItems(int id) {
      repo.deleteById(id);
    }

    public Optional<Items> getItemsId(int id) {
        return repo.findById(id);
    }
}
