package com.hmh.api_autenticacao_usuarios.domain.psicologo;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.br.CPF;

public record RegisterPsicologoDTO (

        @NotBlank String nome,

        @NotBlank @CPF String cpf,

        @NotBlank String estado,

        @NotBlank @Email String email,

        @NotBlank @Size(min = 8) String senha

)
{ }
