# 014 · Vidro por nível, a marca no quadro de vidro e o Código sem botão

11/11/2026

**O contexto.** Três coisas incomodavam nas telas de entrada e no vidro. O vidro estava empilhado: botões, abas e campos com desfoque dentro de cartões que já tinham desfoque, o que pesa e embaça sem pegar cor nova. A marca do Entrar tinha as janelas do ônibus pintadas com uma cor fixa, que sobre o fundo de luz virava remendo, e no claro era de uma cor só. E o Código pedia um toque a mais do que precisava: digitar seis dígitos e ainda tocar em "Entrar", com o título no meio da tela e o desenho saltando quando o teclado subia.

**A decisão.**

- **O vidro tem três níveis**, e nenhum desfoque mora dentro de outro: o vidro de fundo (cartões, listas, o quadro da marca), o vidro flutuante (sobre o mapa e nas bordas de rolagem, mais forte) e o vidro de controle (qualquer controle dentro de outro vidro, sem desfoque). Uma conferência cobra zero vidro dentro de vidro.
- **O desenho da marca não muda.** As mesmas formas, com os recortes vazados: as janelas, o letreiro, os faróis e os contornos viram buracos, e o que está atrás aparece por eles. A cor fixa dos recortes deixa de existir.
- **A marca é sempre em duas cores**, pela mesma regra nos dois temas: a figura na tinta, o ônibus na cor de ação, o mesmo token do botão principal. O nome "Fretamento" vai na tinta de apoio: é assinatura.
- **No Entrar, a marca mora num quadro de vidro** de 88, com um ponto de luz atrás que dá cor ao vidro. Dois outros arranjos ficam atrás do endereço, para comparar (`?marca=l2`, sem o quadro; `?marca=l3`, em linha), e `?cor=invertida` troca as duas cores.
- **O ícone da loja** é o desenho vazado sobre o fundo de luz do escuro (`05-recursos/marca/icone-loja.svg`).
- **Capa centraliza, tarefa alinha à esquerda.** O Entrar e o Bloqueado são capa. O Código é tarefa: título logo abaixo do voltar.
- **O Código abre com o teclado e valida sozinho no sexto dígito**, digitado ou colado. O botão "Entrar" sai. Os erros continuam iguais: completou seis de novo, valida de novo.

**O que foi mantido.** O desenho da marca (a pessoa, a maleta, o ônibus) não foi redesenhado: um desenho novo chegou a ser provado e não entrou. O texto "se esse contato estiver cadastrado" fica: ele não revela se o contato existe. Nas outras telas, o voltar e o sino continuam neutros no escuro.

**A consequência.** No fluxo do protótipo, o Código abre vazio e qualquer código de seis dígitos entra: com os seis já postos, a tela entraria sem ninguém ver, e quem navega não precisa saber um código. As referências do Código mostram o botão e esperam o desenho novo (`a-redesenhar.json`). O ícone do app que as referências usam (`icone-app.svg`) não foi tocado; o da loja é um arquivo novo, e os derivados (Android, monocromático, pequeno, notificação) continuam com o desenho pintado.
