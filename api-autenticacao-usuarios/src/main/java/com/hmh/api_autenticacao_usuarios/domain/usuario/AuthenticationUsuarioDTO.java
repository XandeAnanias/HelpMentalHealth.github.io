package com.hmh.api_autenticacao_usuarios.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthenticationUsuarioDTO(

        @NotBlank @Email String email,

        @NotBlank @Size(min=8) String senha)
{ }
