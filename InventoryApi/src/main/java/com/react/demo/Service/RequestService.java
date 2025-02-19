package com.react.demo.Service;

import com.react.demo.Model.Request;
import com.react.demo.Repository.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {
    @Autowired
    RequestRepo repo;

    public List<Request> getRequest() {
        return repo.findAll();
    }

    public Request postRequest(Request i) {
        return repo.save(i);
    }

    public Request updateRequest(int id, Request i) {
        i.setId(id);
        return repo.save(i);
    }

    public void deleteRequest(int id) {
        repo.deleteById(id);
    }

}
