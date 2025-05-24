package com.hmh.api_autenticacao_usuarios.infra.security.psicologo.security;

import com.hmh.api_autenticacao_usuarios.infra.security.usuario.security.SecurityUsuarioFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Order(2)
@Configurable
@EnableWebSecurity
public class SecurityPsicologoConfiguration {

    @Autowired
    SecurityPsicologoFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChainPsicologo(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .securityMatcher("/autenticacaoPsicologo/**")
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/autenticacaoPsicologo/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/autenticacaoPsicologo/registrar").permitAll()
                        .requestMatchers(HttpMethod.GET, "/autenticacaoPsicologo/mostrar").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
