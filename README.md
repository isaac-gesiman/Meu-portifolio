# Portfólio — Isaac Gesiman

Portfólio pessoal de **Isaac Rodrigues de Medeiros**, também conhecido como **Isaac Gesiman**. O site apresenta trajetória, habilidades, projetos e formas de contato, com animações feitas com **GSAP** e estilos compartilhados em `style.css`.

## Sobre o site

O portfólio é um site estático, sem backend e sem etapa de build. Ele é dividido nestas seções:

- **Início:** apresentação com nome, foto e atuação, com efeito de texto embaralhado e digitação.
- **Sobre:** perfil, tecnologias, formação e experiência.
- **Projetos:** cartões clicáveis que abrem uma página de detalhes para cada projeto.
- **Habilidades:** serviços técnicos, conhecimentos em IA e cursos.
- **Contato:** links para GitHub, e-mail, telefone e botão para copiar as informações.

O menu superior rola até cada seção de forma suave com `ScrollToPlugin`, e os elementos surgem conforme a página é rolada com `ScrollTrigger`.

## Projetos

Cada projeto tem uma página própria em `projetos/`, com as seções **Objetivo**, **Sobre**, **Como funciona** e **Habilidades demonstradas**, todas com textos específicos e animações de revelação durante a rolagem.

| Projeto | Página | Principais tecnologias |
| --- | --- | --- |
| Lista Compartilhada | [lista-compartilhada.html](projetos/lista-compartilhada.html) | JavaScript, Firebase Authentication, Cloud Firestore |
| Site da Igreja Batista Getsêmani | [site-da-igreja.html](projetos/site-da-igreja.html) | HTML, CSS, SEO, Firebase Hosting |
| Biblioteca Municipal | [biblioteca-municipal.html](projetos/biblioteca-municipal.html) | Ruby on Rails, PostgreSQL, Railway, GitHub Actions |
| Reconhecimento de Movimentos Faciais | [reconhecimento-facial.html](projetos/reconhecimento-facial.html) | Python, OpenCV, MediaPipe, NumPy |
| Abrir 100 Abas com 1 Link | [abrir-100-abas.html](projetos/abrir-100-abas.html) | HTML, CSS, JavaScript puro |

## Animações com GSAP

O padrão visual foi definido na página inicial e replicado nas páginas de projeto:

- **Título:** as letras aparecem com embaralhado antes de assumir o texto final.
- **Cabeçalho das páginas de projeto:** subtítulo, tecnologias e botões entram com `fromTo()` (valor final explícito `opacity: 1`), evitando que o conteúdo fique preso invisível.
- **Blocos e cards:** surgem com `fade` e leve deslocamento vertical (`y`) de forma gradual, sem disparo único.
- **Parágrafos:** as palavras clareiam progressivamente de `opacity: 0.08` até `1`, com `stagger` e `scrub: 1`, acompanhando a rolagem.
- **Itens de lista:** aparecem um por um com `stagger: 0.35` e deslocamento lateral.
- **Gatilhos:** `ScrollTrigger` começa em `top 82%` (parte de baixo da tela) e termina entre `top 30%` e `bottom 35%`, com `scrub: 1`, para o conteúdo surgir aos poucos conforme a página desce.
- **Rolagem suave:** `ScrollToPlugin` usado nos links de navegação e âncoras internas.
- **Acessibilidade:** o conteúdo continua legível sem JavaScript (`<noscript>`). Com `prefers-reduced-motion`, a revelação progressiva continua acontecendo, mas sem os deslocamentos laterais/verticais.

As bibliotecas `gsap.min.js`, `ScrollTrigger.min.js`, `ScrollToPlugin.min.js` e `TextPlugin.min.js` ficam em `vendor/` e funcionam **sem internet**. Cada página carrega primeiro o arquivo local e, se ele faltar, usa automaticamente o CDN como fallback.

Ao abrir uma página de projeto, o console do navegador registra `[projeto.js] animações ativas` com o estado dos plugins — útil para confirmar que os scripts carregaram.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica do site e das páginas de projeto.
- **CSS3:** layout responsivo, variáveis (design tokens), cards, grid e modo escuro — arquivo `style.css`.
- **JavaScript:** navegação, interações e animações.
- **GSAP:** animações de entrada, texto, rolagem e revelação progressiva.
- **Google Fonts:** Space Grotesk, Inter e JetBrains Mono.

## Estrutura de arquivos

```text
meu-portifolio/
├── index.html               # Página inicial
├── style.css                # Folha de estilo compartilhada
├── script.js                # Animações da página inicial
├── projeto.js               # Animações das páginas de projeto
├── README.md
├── vendor/                  # GSAP local (funciona sem internet)
│   ├── gsap.min.js
│   ├── ScrollTrigger.min.js
│   ├── ScrollToPlugin.min.js
│   └── TextPlugin.min.js
└── projetos/
    ├── lista-compartilhada.html
    ├── site-da-igreja.html
    ├── biblioteca-municipal.html
    ├── reconhecimento-facial.html
    └── abrir-100-abas.html
```

> A pasta `vendor/` e o arquivo `projeto.js` precisam ficar no mesmo nível da pasta `projetos/`. Os caminhos relativos (`../vendor/...`, `../projeto.js`, `../style.css`) dependem dessa estrutura.

## Como executar

O projeto é estático. Extraia o ZIP completo e abra `index.html` no navegador.

Se preferir servir os arquivos localmente, execute um dos comandos abaixo na pasta `meu-portifolio/`:

```bash
python -m http.server 8000
```

Ou:

```bash
npx serve .
```

Depois acesse `http://localhost:8000` (ou o endereço mostrado no terminal).

## Solução de problemas

Se o texto aparecer pronto, sem animação:

1. Confirme que a pasta `vendor/` foi extraída junto com os HTMLs.
2. Dê **Ctrl+F5** para ignorar o cache do navegador.
3. Abra o console (F12) e verifique se aparece `[projeto.js] animações ativas`. Se não aparecer, o `projeto.js` não foi carregado — confira os caminhos relativos.

## Responsividade

O layout se adapta a computadores, tablets e celulares. Os textos das páginas de projeto usam limites de largura, tipografia fluida com `clamp()` e animações que funcionam tanto com mouse quanto com toque.

## Autor

**Isaac Rodrigues de Medeiros** (Isaac Gesiman) — Mossoró, RN.

- GitHub: [isaac-gesiman](https://github.com/isaac-gesiman)
- E-mail: [isaac.gesiman@email.com](mailto:isaac.gesiman@email.com)
- Telefone: (84) 99708-4078

© 2026 Isaac Rodrigues de Medeiros. Todos os direitos reservados.
