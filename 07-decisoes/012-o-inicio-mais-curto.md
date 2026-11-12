# 012 · O Início mais curto, e um fundo em teste

11/11/2026

**O contexto.** Depois da 011, o Início ainda dizia coisa demais antes da pessoa embarcar: a chegada na fábrica embaixo do número, o selo "No horário" ao lado do "Ao vivo", e a lista começando numa parada que já tinha passado. O cartão "Ver no mapa" ficava abaixo da dobra, e por isso o herói tinha ganhado um botão de mapa. E não havia como comparar o fundo de luz com outra paleta sem mexer no padrão.

**A decisão.**

- **Antes do embarque, o herói fala só do seu ponto.** A linha "Chega na fábrica · Fábrica, Portaria 2 · 07:15" sai. Depois do embarque, a fábrica vira o alvo do herói, como já era.
- **O selo de estado só aparece na exceção.** "Atrasado" e "Adiantado", com os minutos, continuam. No horário, fica só o "Ao vivo". A tolerância de 3 min das regras não muda: muda o que a tela mostra.
- **A lista do Início começa onde o ônibus está.** O que já passou sai daqui. A viagem inteira, com o que passou, continua nas Paradas.
- **O mapa abre pelo cartão "Ver no mapa"**, na T05 e na T06. O botão de mapa do herói sai: com os cortes, o cartão sobe.
- **O fundo de luz vira um conjunto de variáveis** (a cor, a opacidade, o lugar, o raio e o miolo de cada ponto, o lavado e a base), e um segundo conjunto fica em teste atrás de `?fundo=novo`: roxo da marca, magenta e índigo no lugar do lima. O padrão não muda enquanto o teste não for aprovado no olho.

**O que não mudou.** A frase "Toque quando subir: a transportadora sabe que você está a bordo." fica como está. O herói do mapa (T07) continua com o "No horário": o corte vale no Início (no mapa, ele saiu em `015-face-id-a-volta-e-o-mapa.md`).

**A consequência.** O cartão "Ver no mapa" aparece inteiro em rota e no ponto, e espia em chegando, num celular de 844 de altura. As referências do Início mostram o conteúdo de antes e esperam o desenho novo; estão em `06-prototipo/fotos/fidelidade/a-redesenhar.json`, com o porquê de cada uma. O `textos.md` da T05 perdeu as linhas que saíram da tela. Nesta versão, o cartão "Sua volta hoje · 17:20" estava na tela e não levava a lugar nenhum; ele passou a abrir a volta programada em `015-face-id-a-volta-e-o-mapa.md`. O quadro da volta programada continua no `CHANGELOG.md` como falta.
