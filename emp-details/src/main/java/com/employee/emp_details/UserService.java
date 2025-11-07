package com.employee.emp_details;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public boolean isAccountNonLocked(String username) {
        User u = userRepo.findByUsername(username);
        return u == null || u.isAccountNonLocked();
    }

    // Register new user
    public User registerUser(String username, String password, String role) {
        if(userRepo.findByUsername(username) != null){
            throw new RuntimeException("Username already exists!");
        }
        if(role == null || role.isEmpty()){
            role = "USER";
        }
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User(username, encodedPassword, role);
        return userRepo.save(user);
    }

    // Validate login (+ increment attempts / lock)
    public boolean validateUser(String username, String password) {
        User user = userRepo.findByUsername(username);
        if(user == null || !user.isAccountNonLocked()) return false;

        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if(matches) {
            user.setFailedAttempts(0);
            userRepo.save(user);
            return true;
        } else {
            user.setFailedAttempts(user.getFailedAttempts() + 1);
            if(user.getFailedAttempts() >= 3){
                user.setAccountNonLocked(false);
            }
            userRepo.save(user);
            return false;
        }
    }

    public String getUserRole(String username) {
        User user = userRepo.findByUsername(username);
        return user != null ? user.getRole() : null;
    }
}
