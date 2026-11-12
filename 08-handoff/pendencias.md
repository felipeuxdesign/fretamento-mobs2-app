# Pendências

Três decisões ainda dependem do PM; o desenho já tem uma saída provisória para cada uma.

- [ ] **Tipos de lugar das paradas.** Quais tipos o cadastro de paradas tem? O desenho tem ícone para terminal, comércio e fábrica, e usa o pino quando o tipo não vem.
- [ ] **Nome do app.** Na tela ele se chama Fretamento, por enquanto. É esse o nome embaixo do ícone e na loja? "App Passageiro Fretamento" segue como nome do projeto.
- [ ] **Reenvio do código.** O wireframe do PM libera o reenvio aos 45 s e a dica do spam aos 60 s. O desenho junta os dois aos 60 s: a tela muda uma vez só, sai menos código duplicado e menos SMS. Fecha em 60 s?

## O que ainda não foi visto no olho

- [ ] **O tema claro, tela por tela.** O claro nasce dos tokens e não foi desenhado quadro a quadro. No protótipo, as 145 referências estão fotografadas no claro em `06-prototipo/fotos/claro/`, e uma régua mede o contraste de cada texto (`node conferencias/claro.mjs`): nenhum par de cores fica abaixo de 4,5:1. Falta o olho de quem aprova o desenho, pelo interruptor do palco, nas 13 telas e nos estados.
- [ ] **O rótulo de água no claro.** O token `mapa-agua-tinta` ganhou o valor `#4F5C96` no claro pela conta de contraste (4,9:1). Nas fotos do claro (T07), "Rio Capibaribe" se lê sobre a água. Falta a aprovação de quem desenha.
- [ ] **O vidro.** Cada peça de vidro é aprovada na vitrine antes de entrar nas telas (ver `03-design-system/vidro/`).

## O nome da biometria, na produção

- O protótipo mostra um iPhone com Face ID. No produto, o sistema diz qual método o aparelho tem, e o texto do app acompanha: "Pedir o Face ID para abrir o app" num iPhone com Face ID, "Pedir o Touch ID..." num iPhone com digital, "Pedir a digital ou o rosto..." no Android.
- A saída do pedido é "Usar a senha do celular" (o texto que o app dá ao sistema), para não confundir com o código de acesso do app.

## O campo do código, na produção

- **Um campo só**, e não seis caixas, com `autocomplete="one-time-code"` e `inputmode="numeric"`.
- **Aceita colar**: seis dígitos colados validam na hora, como o sexto dígito digitado.
- **O iOS sugere o código acima do teclado** quando ele chega por SMS; no Android, o equivalente é a leitura do SMS pelo sistema. Um toque preenche e valida.
- **Não há botão de entrar**: a validação começa no sexto dígito. Depois de um erro, completar seis dígitos de novo valida de novo.
- **A tela abre com o teclado aberto**, com o foco no campo, para o desenho não saltar quando o teclado sobe.
