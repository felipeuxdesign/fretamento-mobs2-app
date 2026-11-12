# T03 · Preparar o app · quadros e estados

## Os quadros desta tela · 3

A tela como ela abre e os momentos, aonde se chega tocando, no caminho feliz.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T03-00 | tela | depois do código válido, no primeiro acesso | termos ainda não aceitos · avisos ligados · proteção desligada | `00-tela` |
| T03-01 | momento | tocar "Começar" com os avisos ligados | o celular pergunta; "Permitir" ou "Não Permitir", e o Início abre | `01-momento-comecar-com-os-avisos-ligados-o-celular-pergunta` |
| T03-02 | momento | ligar a proteção | o celular pede o Face ID; reconhecido, o switch fica ligado | `02-momento-ligar-a-protecao-o-celular-pede-a-digital` |

## Os estados desta tela · 3

O que o celular decide: não ter bloqueio de tela, não reconhecer a pessoa, ou não permitir os avisos. No protótipo, os estados entram pelo palco, não tocando na tela.

| referência | tipo | como se chega · o que causa | caso do mock | arquivo |
| --- | --- | --- | --- | --- |
| T03-03 | estado | o celular não tem bloqueio de tela | a proteção fica desligada, com o aviso e o atalho para os ajustes | `03-estado-celular-sem-bloqueio-de-tela` |
| T03-04 | estado | a digital não foi reconhecida (cancelar o pedido só o fecha, com o switch desligado e sem erro) | o switch volta a desligado, com o erro no lugar | `04-estado-nao-reconhecido` |
| T03-05 | estado | tocar "Não Permitir" na pergunta do celular | os avisos ficam desligados, com o aviso de como ligar depois | `05-estado-avisos-negados-no-celular` |
