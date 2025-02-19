package com.react.demo.Controller;

import com.react.demo.Model.Items;
import com.react.demo.Service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class ItemsController {
    @Autowired
    ItemsService service;

    @GetMapping("/item")
   public List<Items> getItems(){
       return service.getItems();
   }
    @GetMapping("/item/{id}")
    public Optional<Items> getItemsById(@PathVariable int id){
        return service.getItemsId(id);
    }
   @PostMapping("/item")
   public Items postItems(@RequestBody Items i){
        System.out.print(i);
        return service.postItems(i);
   }
   @PutMapping("item/{id}")
   public Items updateItems(@PathVariable int id,@RequestBody Items i){
        System.out.print(i);
        return service.updateItems(id,i);
   }
   @DeleteMapping("item/{id}")
   public void deleteItems(@PathVariable int id){
       service.deleteItems(id);
   }


}
