package com.hmh.api_autenticacao_usuarios.controller;
import com.hmh.api_autenticacao_usuarios.domain.MensagemDTO;
import com.hmh.api_autenticacao_usuarios.domain.psicologo.AuthenticationPsicologoDTO;
import com.hmh.api_autenticacao_usuarios.domain.psicologo.LoginResponsePsicologoDTO;
import com.hmh.api_autenticacao_usuarios.domain.psicologo.Psicologo;
import com.hmh.api_autenticacao_usuarios.domain.psicologo.RegisterPsicologoDTO;
import com.hmh.api_autenticacao_usuarios.domain.usuario.LoginResponseUsuarioDTO;
import com.hmh.api_autenticacao_usuarios.infra.security.psicologo.security.TokenPsicologoService;
import com.hmh.api_autenticacao_usuarios.repository.PsicologoRepository;
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
@RequestMapping("/api-hmh/psicologo")
public class AuthenticationPsicologoController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PsicologoRepository repository;

    @Autowired
    private TokenPsicologoService tokenService;

    @PostMapping("/login-psicologo")
    public ResponseEntity<LoginResponsePsicologoDTO> login(@RequestBody @Valid AuthenticationPsicologoDTO data, HttpServletResponse response){
        var cpfSenha = new UsernamePasswordAuthenticationToken(data.cpf(), data.senha());
        var auth = authenticationManager.authenticate(cpfSenha);
        var psicologo = (Psicologo) auth.getPrincipal();
        var token = tokenService.generateTokenPsicologo(psicologo);

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);

        response.addCookie(cookie);

        return ResponseEntity.ok(new LoginResponsePsicologoDTO(token));
    }

    @PostMapping("/registra-psicologo")
    public ResponseEntity registrar(@RequestBody @Valid RegisterPsicologoDTO data){
        if(this.repository.findByCpf(data.cpf())!=null) return ResponseEntity.badRequest().body(new MensagemDTO("Psicólogo já cadastrado!"));

        String senhaEscriptada=new BCryptPasswordEncoder().encode(data.senha());
        Psicologo psicologo=new Psicologo(data.nome(), data.cpf(), data.estado(), data.email(), senhaEscriptada);

        this.repository.save(psicologo);

        return ResponseEntity.ok().body(new MensagemDTO("Psicólogo cadastrado!"));
    }

    @GetMapping("/mostra-psicologo")
    public List<Psicologo> mostrar(){
        return repository.findAll();
    }
}
