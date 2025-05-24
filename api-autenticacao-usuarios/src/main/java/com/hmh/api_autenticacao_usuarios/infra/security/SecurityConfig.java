package com.hmh.api_autenticacao_usuarios.infra.security;

import com.hmh.api_autenticacao_usuarios.infra.security.psicologo.security.SecurityPsicologoFilter;
import com.hmh.api_autenticacao_usuarios.infra.security.usuario.security.SecurityUsuarioFilter;
import com.hmh.api_autenticacao_usuarios.service.SistemaUsersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private SistemaUsersDetailsService sistemaUsersDetailsService;

    @Autowired
    private SecurityUsuarioFilter securityUsuarioFilter;

    @Autowired
    private SecurityPsicologoFilter securityPsicologoFilter;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private AuthenticationManager buildAuthManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(sistemaUsersDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }

    @Bean
    @Order(1)
    public SecurityFilterChain usuarioSecurity(HttpSecurity http) throws Exception {
        return http
                .securityMatcher("/api-hmh/usuario/**")
                .authenticationManager(buildAuthManager())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://127.0.0.1:5500", "http://localhost:5500"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api-hmh/usuario/login-usuario").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api-hmh/usuario/registra-usuario").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api-hmh/usuario/mostra-usuario").permitAll()
                        .anyRequest().authenticated())
                .addFilterAfter(securityUsuarioFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain psicologoSecurity(HttpSecurity http) throws Exception {
        return http
                .securityMatcher("/api-hmh/psicologo/**")
                .authenticationManager(buildAuthManager())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://127.0.0.1:5500", "http://localhost:5500"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api-hmh/psicologo/login-psicologo").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api-hmh/psicologo/registra-psicologo").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api-hmh/psicologo/mostra-psicologo").permitAll()
                        .anyRequest().authenticated())
                .addFilterAfter(securityPsicologoFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) throws Exception {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authProvider);
    }

}
