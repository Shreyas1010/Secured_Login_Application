// EmployeeRepository.java
package com.employee.emp_details;

import org.springframework.data.jpa.repository.JpaRepository;
public interface EmployeeRepository extends JpaRepository<Employee, Long> {}
