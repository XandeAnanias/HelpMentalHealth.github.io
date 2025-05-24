package com.hmh.api_autenticacao_usuarios.service;

import com.hmh.api_autenticacao_usuarios.repository.PsicologoRepository;
import com.hmh.api_autenticacao_usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SistemaUsersDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PsicologoRepository psicologoRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        // Se for e-mail, busca no usuário
        if (login.contains("@")) {
            var usuario = usuarioRepository.findByEmail(login);
            if (usuario != null) return usuario;
        } else {
            // Senão, assume CPF
            var psicologo = psicologoRepository.findByCpf(login);
            if (psicologo != null) return psicologo;
        }

        throw new UsernameNotFoundException("Usuário não encontrado");
    }
}
