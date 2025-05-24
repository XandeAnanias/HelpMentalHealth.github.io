package com.hmh.api_autenticacao_usuarios.domain.psicologo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public record AuthenticationPsicologoDTO(

        @NotBlank @CPF String cpf,

        @NotBlank @Size(min = 8) String senha) {
}
