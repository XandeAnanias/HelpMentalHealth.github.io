package com.hmh.api_autenticacao_usuarios.infra.security.psicologo.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.hmh.api_autenticacao_usuarios.domain.psicologo.Psicologo;
import com.hmh.api_autenticacao_usuarios.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenPsicologoService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateTokenPsicologo(Psicologo psicologo){
        try{

            Algorithm algorithm=Algorithm.HMAC256(secret);
            String token= JWT.create()
                    .withIssuer("api-autenticacao-hmh")
                    .withSubject(psicologo.getUsername())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);

            return token;

        }catch(JWTCreationException exception){
            throw new RuntimeException("Erro na geração de Token", exception);
        }
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm=Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("api-autenticacao-hmh")
                    .build()
                    .verify(token)
                    .getSubject();

        }catch(JWTVerificationException exception){
            return "";
        }
    }

    public Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
