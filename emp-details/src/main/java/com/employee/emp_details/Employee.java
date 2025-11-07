// Employee.java
package com.employee.emp_details;

import jakarta.persistence.*;

@Entity
@Table(name = "employee") // match your exact table name
public class Employee {
    @Id
    // If your existing table uses BIGSERIAL/identity, keep this. If not, remove and provide ids manually.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // If your DB columns are CHAR, JPA will map them as String (may include trailing spaces)
    @Column(name = "department")
    private String department;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    public Employee() {}
    public Long getId() { return id; }
    public String getDepartment() { return department; }
    public String getEmail() { return email; }
    public String getName() { return name; }
}
