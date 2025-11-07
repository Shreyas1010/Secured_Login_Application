package com.employee.emp_details;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="login_audit")
public class LoginAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String status; // LOGIN / LOGOUT / FAILED
    private LocalDateTime timestamp;

    public LoginAudit() {}

    public LoginAudit(String username, String status) {
        this.username = username;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
