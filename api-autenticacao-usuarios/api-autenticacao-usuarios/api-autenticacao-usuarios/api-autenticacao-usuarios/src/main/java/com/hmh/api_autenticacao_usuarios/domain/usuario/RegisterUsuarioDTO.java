package com.hmh.api_autenticacao_usuarios.domain.usuario;

import jakarta.validation.constraints.*;

public record RegisterUsuarioDTO(

        @NotBlank String nome,

        @NotBlank @Email String email,

        @NotBlank @Size(min = 8) String senha

) {}
