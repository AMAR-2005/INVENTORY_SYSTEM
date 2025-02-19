package com.react.demo.Service;

import com.react.demo.Model.User;
import com.react.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return repository.findById(id);
    }

    public User createUser(User user) {
        return repository.save(user);
    }

    public User updateUser(int id, User userDetails) {
        userDetails.setId(id);
        return repository.save(userDetails);
    }
    public void deleteUser(int id) {
        repository.deleteById(id);
    }
}
