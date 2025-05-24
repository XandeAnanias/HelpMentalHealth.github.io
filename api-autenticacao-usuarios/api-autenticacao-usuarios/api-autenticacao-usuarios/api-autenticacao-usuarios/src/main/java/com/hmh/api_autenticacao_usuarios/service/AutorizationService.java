package com.hmh.api_autenticacao_usuarios.service;

import com.hmh.api_autenticacao_usuarios.repository.PsicologoRepository;
import com.hmh.api_autenticacao_usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutorizationService implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    PsicologoRepository psicologoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(username.contains("@"))
            return usuarioRepository.findByEmail(username);
        else
            return psicologoRepository.findByCpf(username);
    }
}
