package com.zucchini.global.config.security;

import com.zucchini.global.config.jwt.JwtAuthenticationFilter;
import com.zucchini.global.config.jwt.JwtEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtEntryPoint jwtEntryPoint; // 1
    private final JwtAuthenticationFilter jwtAuthenticationFilter; // 1
    private final CustomUserDetailService customUserDetailService; // 2

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 3
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests() // 5
                .antMatchers("/api/ws/**").permitAll()
                .antMatchers("/api/ws").permitAll()
                .antMatchers("/ws/**").permitAll()
                .antMatchers("/ws").permitAll()
                .antMatchers(HttpMethod.POST, "/user", "/user/login", "/user/email", "/user/authCheck", "/user/reissue").permitAll()
                .antMatchers(HttpMethod.GET, "/user/idCheck/**", "/item", "/item/**", "/video/check/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/user", "/user/*/item/like/**").authenticated()
                .antMatchers(HttpMethod.DELETE, "/user/*")
                .hasAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/user")
                .hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint)
                .and()
                .logout().disable() // 6
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and() // 7
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
    }

}