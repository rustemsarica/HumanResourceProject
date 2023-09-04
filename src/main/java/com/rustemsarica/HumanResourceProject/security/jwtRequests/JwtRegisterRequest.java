package com.rustemsarica.HumanResourceProject.security.jwtRequests;


import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtRegisterRequest {
    @NotEmpty
    private String name;

    @NotEmpty
    @Email(regexp=".*@.*\\..*")
    @Column(unique = true)
    private String username;

    @NotEmpty
    @Size(min = 6, max = 255)
    private String password;

    @NotEmpty
    private String role;
}
