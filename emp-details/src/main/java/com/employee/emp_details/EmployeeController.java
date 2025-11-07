// EmployeeController.java (read-only)
package com.employee.emp_details;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeRepository repo;

    public EmployeeController(EmployeeRepository repo) {
        this.repo = repo;
    }

    // Read all employees (works with existing table)
    @GetMapping
    public List<Employee> list() {
        return repo.findAll();
    }

    // Optional: read one by id
    @GetMapping("/{id}")
    public Employee one(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }
}
