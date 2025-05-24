package com.hmh.api_autenticacao_usuarios.repository;

import com.hmh.api_autenticacao_usuarios.domain.psicologo.Psicologo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface PsicologoRepository extends JpaRepository<Psicologo, Integer> {
    UserDetails findByCpf(String cpf);
}
