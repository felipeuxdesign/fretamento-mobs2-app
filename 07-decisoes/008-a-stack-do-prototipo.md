# 008 · A stack do protótipo

10/11/2026

**O contexto.** Os protótipos anteriores da casa usam Vite e React 18 em JavaScript, sem biblioteca de componentes. Este precisa do vidro, e a GlassyUI exige React 19 e Tailwind CSS 4, com os componentes em TypeScript.

**A decisão.** Vite, React 19, TypeScript e Tailwind CSS 4, com a GlassyUI copiada pelo CLI do shadcn e os nossos tokens como variáveis CSS. Muda só o necessário em relação aos anteriores.

**O que foi descartado.** Next: o protótipo é um site estático e não precisa de servidor. Ficar no React 18 e escrever o vidro à mão: mais trabalho e um vidro pior. Uma biblioteca de componentes inteira: o app tem as peças dele, desenhadas.

**A consequência.** O código da GlassyUI mora no repositório (`app/src/components/glassyui/`) e pode ser ajustado; toda mudança nele fica anotada. A stack do produto real é outra decisão e está em `08-handoff/stack.md`.
