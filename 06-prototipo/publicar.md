# Publicar o protótipo

**O endereço publicado:** https://fretamento-mobs2-prototipo.vercel.app

O protótipo é um site estático, publicado na Vercel no projeto `fretamento-mobs2-prototipo`.

## Publicar de novo

O build roda na máquina e a Vercel recebe o resultado pronto. O app lê o mock, os recursos e os tokens de fora da pasta dele, e por isso o build não roda sozinho do lado da Vercel a partir de `06-prototipo/app`.

```bash
cd 06-prototipo/app
npm run conferir
npx vercel build --prod
npx vercel deploy --prebuilt --prod
```

A pasta `06-prototipo/app/.vercel/` guarda a ligação com o projeto e fica fora do git. Numa máquina nova: `npx vercel link --project fretamento-mobs2-prototipo` antes.

## Se quiser que a Vercel publique sozinha a cada envio

1. Ligar o repositório ao projeto, nas configurações do projeto na Vercel.
2. **Root Directory:** `06-prototipo/app`, com "Include files outside of the Root Directory in the Build Step" ligado.
3. **Framework Preset:** Vite. **Build Command:** `npm run build`. **Output Directory:** `dist`.

## Antes de publicar

`npm run conferir`, em `06-prototipo/app`: o que funciona em desenvolvimento às vezes quebra no build. A conferência do build confirma que o app sobe sem nenhuma chamada para fora.

## A prévia do link

As marcações de prévia estão no `index.html` do app, e a imagem é `app/public/previa-social.png`, a mesma de `05-recursos/readme/`. `node conferencias/fotos-readme.mjs` refaz as duas. Se o endereço publicado mudar, o endereço da imagem no `index.html` muda junto. A capa do repositório se troca em Settings › Social preview, com o mesmo arquivo.

## Depois de publicar

Abrir o endereço e três estados (`?ref=T05-00`, `?ref=T07-00&tema=claro`, `?vidro=0`). O endereço está no `README.md` da raiz e no campo Website do repositório.
