package com.hmh.api_autenticacao_usuarios.repository;

import com.hmh.api_autenticacao_usuarios.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    UserDetails findByEmail(String email);
}
