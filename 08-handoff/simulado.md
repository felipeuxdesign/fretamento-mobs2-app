# O que o protótipo simula

O protótipo parece o app, mas quase tudo atrás da tela é de mentira. Quem for construir o produto real não copia a simulação.

| no protótipo | no produto |
| --- | --- |
| O relógio é fixo: terça, 27/10/2026, 06:24. Cada estado tem a hora dele | o relógio do celular e o do servidor |
| O ônibus anda pelo tocador do palco, em cinco passos | a posição chega do módulo de rastreamento da Mobs2, o tempo todo |
| A previsão é o número escrito no caso | a previsão é calculada com a posição do ônibus |
| Os campos já vêm preenchidos, para ninguém precisar digitar: o e-mail e o celular da Ana no Entrar, o texto do pedido em Meus dados | os campos abrem vazios, como nas referências |
| O Código abre vazio, e qualquer código de seis dígitos entra. O incorreto, o expirado e o bloqueado se veem como estados parados | o código de 6 números chega por e-mail ou SMS e é validado no servidor |
| Qualquer e-mail ou celular "recebe" o código | o servidor envia só para contato cadastrado, sem nunca dizer se existe |
| Os botões que carregam esperam 700 ms; o Início mostra o esqueleto por 650 ms | o tempo é o da rede |
| O pedido do Face ID e a senha do celular são desenhados, e sempre confirmam. No Bloqueado, o pedido espera o toque no desenho do Face ID | a biometria e a senha do sistema, com o nome do método do aparelho |
| O pedido de notificações é um alerta desenhado. O de localização não tem quadro: "Permitir", no sheet de pré-permissão, já concede | os pedidos do sistema |
| O push é um cartão desenhado | a notificação do sistema, enviada pelo servidor |
| O teclado, no computador, é desenhado | o teclado do sistema, no tipo certo, com o código de uso único |
| O mapa é um desenho do Recife, decorativo, com a rota e as paradas | outro mapa, de verdade. Do protótipo levam-se os marcadores, a rota e as peças de cima, não o desenho das ruas |
| O mapa arrasta com o dedo; a pinça, ou a roda do mouse no computador, troca entre o mapa de perto e a linha inteira | o mapa arrasta e pinça livre, em qualquer escala |
| "Minha localização" põe um ponto azul num lugar fixo | a localização do celular, só quando a pessoa pede |
| Ligar e abrir o WhatsApp não saem do protótipo: um toast diz que ali o WhatsApp não abre e a ligação não é feita | abrem o telefone e o WhatsApp |
| "Ativar" e "Abrir ajustes" não saem do protótipo. Depois do "Não Permitir" do Preparar o app, o "Ativar" das Notificações e dos Avisos liga a permissão na hora, como se a pessoa tivesse ido aos ajustes e voltado | abrem os ajustes do celular |
| Os estados (sem sinal, sem internet, cancelada) entram pelo palco | acontecem pelo mundo: o ônibus, a rede, o servidor, o dado |
| A troca de ponto, o embarque, o "Não fui eu" e o pedido de dados só mudam a tela | vão para o servidor, e a transportadora fica sabendo |
| O protocolo do pedido é 2026-1027-0042, sempre | o protocolo vem do servidor |
| Sair e excluir a conta voltam ao Entrar, e recarregar a página desfaz tudo | encerram a sessão e a conta de verdade |
| A sessão de 30 dias, os 5 min fora do app e o bloqueio de 15 min são estados que se abrem pelo palco | são contados de verdade |
| O háptico não existe no computador nem no iPhone; no Android, a vibração do navegador faz o papel no chegando, no ponto e na confirmação | o háptico do sistema, nos quatro momentos da folha F09 |
| O vidro é feito no navegador, e a lente da borda só existe no Chrome | no iOS, o vidro é o do sistema, com a lente de verdade |
