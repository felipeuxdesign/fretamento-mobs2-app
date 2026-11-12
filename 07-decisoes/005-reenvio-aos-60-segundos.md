# 005 · O reenvio do código aos 60 s

**O contexto.** No wireframe, o reenvio do código libera aos 45 s e a dica de conferir o spam aparece aos 60 s.

**A decisão.** Os dois juntos, aos 60 s.

**O que foi descartado.** 45 s e 60 s separados: a tela mudaria duas vezes em 15 s, sairia mais código duplicado e mais SMS.

**A consequência.** O contador do T02 vai até 60. A decisão ainda depende do PM e está em `08-handoff/pendencias.md`. Se voltar para 45 s, muda `reenvioDoCodigoSeg` no mock e a ficha do T02.
