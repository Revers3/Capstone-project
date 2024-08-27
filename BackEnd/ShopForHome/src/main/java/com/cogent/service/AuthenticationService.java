package com.cogent.service;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.cogent.dtos.LoginUserDto;

import com.cogent.dtos.RegisterUserDto;

import com.cogent.entity.User;

@Service
public class AuthenticationService {
	private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;
    
    

    public AuthenticationService(
        UserRepository userRepository,
        
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        
        this.passwordEncoder = passwordEncoder;
    }

    

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepository.findByUsername(input.getUsername());
    }
    
    public User signup(RegisterUserDto input) {
        User user = new User();
                user.setUsername(input.getUsername());
                user.setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }
    

    
    
    
    
    
    
    
}
