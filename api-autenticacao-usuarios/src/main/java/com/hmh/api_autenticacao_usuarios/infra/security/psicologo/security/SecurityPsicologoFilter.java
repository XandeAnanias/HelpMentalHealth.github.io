package com.hmh.api_autenticacao_usuarios.infra.security.psicologo.security;

import com.hmh.api_autenticacao_usuarios.infra.security.usuario.security.TokenUsuarioService;
import com.hmh.api_autenticacao_usuarios.repository.PsicologoRepository;
import com.hmh.api_autenticacao_usuarios.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityPsicologoFilter extends OncePerRequestFilter {

    @Autowired
    TokenPsicologoService tokenService;

    @Autowired
    PsicologoRepository repository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if (token != null) {
            var login = tokenService.validateToken(token);
            UserDetails psi = repository.findByCpf(login);

            var authentication = new UsernamePasswordAuthenticationToken(psi, null, psi.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        for (var cookie : request.getCookies()) {
            if ("token".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }
}
