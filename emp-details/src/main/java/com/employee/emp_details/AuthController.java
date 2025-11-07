package com.employee.emp_details;

import org.springframework.web.bind.annotation.*;

import com.employee.emp_details.JWT.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
    public class AuthController {

    private final UserService userService;
    private final LoginAuditRepository auditRepo;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, LoginAuditRepository auditRepo, JwtUtil jwtUtil) {
        this.userService = userService;
        this.auditRepo = auditRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String,String> body){
        String username = body.get("username");
        String password = body.get("password");
        String role = body.get("role");

        try {
            userService.registerUser(username, password, role);
            return ResponseEntity.ok(Map.of("message","User registered successfully!"));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String,String> body){
    String username = body.get("username");
    String password = body.get("password");

    boolean valid = userService.validateUser(username, password);

    if(valid){
        auditRepo.save(new LoginAudit(username, "LOGIN"));
        String role = userService.getUserRole(username);

        // ✅ Generate token
        String token = jwtUtil.generateToken(username, role);

        return Map.of(
            "message", "Login Successful",
            "role", role,
            "token", token
        );
    } else {
        auditRepo.save(new LoginAudit(username, "FAILED"));
        return Map.of("message", "Invalid username or password");
    }
}

}