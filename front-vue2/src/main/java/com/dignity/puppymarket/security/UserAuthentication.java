package com.dignity.puppymarket.security;

import com.dignity.puppymarket.domain.Role;
import lombok.Builder;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class UserAuthentication extends AbstractAuthenticationToken {
    private final String email;

    @Builder
    public UserAuthentication(String email, List<Role> roles) {
        super(authorities(roles));
        this.email = email;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return this.email;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    public String getEmail() {
        return this.email;
    }

    @Override
    public String toString() {
        return "UserAuthentication{" +
                "email='" + email + '\'' +
                '}';
    }

    private static List<GrantedAuthority> authorities(List<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getEmail()))
                .collect(Collectors.toList());
    }
}
