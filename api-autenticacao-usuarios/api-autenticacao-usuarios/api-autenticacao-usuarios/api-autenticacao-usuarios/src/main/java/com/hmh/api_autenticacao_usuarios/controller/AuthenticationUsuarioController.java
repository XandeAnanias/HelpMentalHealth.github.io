package com.hmh.api_autenticacao_usuarios.controller;

import com.hmh.api_autenticacao_usuarios.domain.MensagemDTO;
import com.hmh.api_autenticacao_usuarios.domain.usuario.AuthenticationUsuarioDTO;
import com.hmh.api_autenticacao_usuarios.domain.usuario.LoginResponseUsuarioDTO;
import com.hmh.api_autenticacao_usuarios.domain.usuario.RegisterUsuarioDTO;
import com.hmh.api_autenticacao_usuarios.domain.usuario.Usuario;
import com.hmh.api_autenticacao_usuarios.infra.security.usuario.security.TokenUsuarioService;
import com.hmh.api_autenticacao_usuarios.repository.UsuarioRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api-hmh/usuario")
public class AuthenticationUsuarioController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private TokenUsuarioService tokenService;

    @PostMapping("/login-usuario")
    public ResponseEntity<LoginResponseUsuarioDTO> login(@RequestBody @Valid AuthenticationUsuarioDTO data, HttpServletResponse response){
        var emailSenha = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = authenticationManager.authenticate(emailSenha);
        var usuario = (Usuario) auth.getPrincipal();
        var token = tokenService.generateTokenUsuario(usuario);

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);

        response.addCookie(cookie);

        return ResponseEntity.ok(new LoginResponseUsuarioDTO(token));

    }

    @PostMapping("/registra-usuario")
    public ResponseEntity registrar(@RequestBody @Valid RegisterUsuarioDTO data){
        if(this.repository.findByEmail(data.email())!=null) return ResponseEntity.badRequest().body(new MensagemDTO("Usuário já cadastrado!"));

        String senhaEscriptada=new BCryptPasswordEncoder().encode(data.senha());
        Usuario usuario=new Usuario(data.nome(),data.email(),senhaEscriptada);

        this.repository.save(usuario);

        return ResponseEntity.ok().body(new MensagemDTO("Usuário cadastrado!"));
    }

    @GetMapping("/mostra-usuario")
    public List<Usuario> mostrar(){
        return repository.findAll();
    }
}
