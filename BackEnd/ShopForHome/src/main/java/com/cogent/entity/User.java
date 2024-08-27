package com.cogent.entity;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cogent.dtos.UserDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User implements UserDetails{
	
	

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="username")
	private String username;
	
	@Column(name="password")
	private String password;
	
	public UserDto toDTO() {
        UserDto dto = new UserDto();
        dto.setId(this.id);
        dto.setUsername(this.username);
        dto.setRoles(this.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList()));
        return dto;
    }
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User(long id, String username, String password) {
		
		this.id = id;
		this.username = username;
		this.password = password;
	}
	
	public User() {
		
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority("user"));
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		//return UserDetails.super.isAccountNonExpired();
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		//return UserDetails.super.isAccountNonLocked();
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		//return UserDetails.super.isCredentialsNonExpired();
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		//return UserDetails.super.isEnabled();
		return true;
	}

	public Object orElseThrow(Object object) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
