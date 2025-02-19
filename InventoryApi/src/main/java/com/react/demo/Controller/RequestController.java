package com.react.demo.Controller;

import com.react.demo.Model.Items;
import com.react.demo.Model.Request;
import com.react.demo.Service.ItemsService;
import com.react.demo.Service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class RequestController {
    @Autowired
    RequestService service;

    @GetMapping("/request")
    public List<Request> getRequest(){
        return service.getRequest();
    }

    @PostMapping("/request")
    public Request postRequest(@RequestBody Request i){
        return service.postRequest(i);
    }
    @PutMapping("request/{id}")
    public Request updateRequest(@PathVariable int id,@RequestBody Request i){
        return service.updateRequest(id,i);
    }
    @DeleteMapping("request/{id}")
    public void deleteRequest(@PathVariable int id){
        service.deleteRequest(id);
    }
}
