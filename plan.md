# Plano de implementação — EcoBee

## Escopo

Criar uma homepage institucional e vitrine para a EcoBee, uma loja de crochê artesanal voltada a presentes e decoração com significado. A página deve comunicar o manifesto “Feito devagar, feito com alma”, apresentar produtos provisórios, explicar encomendas personalizadas, reforçar consumo consciente e conduzir visitantes ao WhatsApp.

## Direção visual

- **Movimento:** cottagecore contemporâneo com acabamento editorial artesanal — acolhedor, natural e refinado sem parecer rústico demais.
- **Princípios:** feito à mão visível; respiro e ritmo lento; afeto nos detalhes; contraste entre delicadeza e clareza comercial.
- **Filosofia de cor:** `#eeecc2` funciona como papel/baunilha ensolarado; `#495326` é o verde-musgo proprietário e ancora a marca; `#948f4d` traz o fio natural; `#b86b6b` dá calor e convite à ação; `#dfa5ab` e `#f4dbcf` suavizam com carinho.
- **Layout:** narrativa em faixas assimétricas, com uma hero dividida entre manifesto e imagem de produto, vitrine em cartões editoriais, manifesto em bloco de leitura e CTA final em painel orgânico.
- **Assinaturas:** marca d’água de favo/abelha construída em CSS; etiquetas de “feito à mão”; bordas arredondadas suaves e linhas pontilhadas inspiradas em pontos de crochê.
- **Interação:** navegação por âncoras, CTAs de baixa fricção para WhatsApp e microinterações suaves que convidam sem pressionar.
- **Animação:** entrada gradual de blocos ao rolar, hover com leve elevação e zoom sutil nas imagens; respeitar `prefers-reduced-motion`.
- **Tipografia:** `Fraunces` para títulos com personalidade artesanal/editorial e `DM Sans` para leitura e interface. Escala com títulos grandes no desktop, compactada no mobile.
- **Essência:** presentes e peças de decoração artesanais, únicos e afetivos, para quem quer fugir do genérico. Personalidade: acolhedora, cuidadosa, leve.
- **Voz:** frases carinhosas, concretas e sem urgência artificial. Exemplos: “Um presente com tempo dentro.” / “Escolha as cores. A gente coloca o carinho em cada ponto.”
- **Wordmark/mark:** “EcoBee” em título serifado com um pequeno símbolo de abelha entre dois pontos, acompanhado por uma célula hexagonal aberta.
- **Cor proprietária:** verde-musgo `#495326`, usado em wordmark, navegação e chamadas de confiança.

## Arquitetura

- `client/src/pages/Home.tsx`: homepage completa com navegação, hero, vitrine, manifesto, processo, encomendas e CTA.
- `client/src/index.css`: tokens de cor, tipografia, responsividade e animações.
- `client/public/images/`: fotos provisórias baixadas da busca de imagens; serão substituídas por fotos autorais mantendo os mesmos nomes.
- `client/public/manus-routes.json`: manifesto estático de rotas.
- `app.config.ts`: metadado de logo durável para o projeto.

## Implementação

- Reaproveitar o starter React + Vite e a rota `/` existente.
- Usar `lucide-react` para ícones de interface e navegação.
- Usar imagens provisórias locais para não depender de hotlink e facilitar a troca futura.
- Todos os CTAs “Pedir pelo WhatsApp” usam um placeholder editável de link com `https://wa.me/5500000000000?text=...`, sinalizado no código para a cliente substituir pelo número real.
- Incluir `/manus-routes.json` antes de iniciar o servidor.

## Etapa de comércio sem conta Shopify

Enquanto a conta Shopify não existe, a homepage funciona como uma loja demonstrativa: cada peça exibe um preço ilustrativo, pode ser adicionada a uma sacola lateral, ter sua quantidade ajustada e gerar uma reserva pelo WhatsApp. O painel informa de forma explícita que o checkout Shopify será conectado depois; não há cobrança real nem pedido persistido nesta etapa.

## Critérios do produto

- Apresentar a EcoBee com proposta de valor clara e chamadas para conhecer peças e encomendar.
- Exibir manifesto completo e narrativa do cuidado artesanal.
- Exibir vitrine visual com nomes, descrições e caráter único/feito à mão.
- Explicar personalização de cores e modelos.
- Ter botões de WhatsApp em pontos de destaque, inclusive no CTA final.
- Ressaltar produção artesanal, durabilidade, menor escala e valorização do trabalho manual.
- Apresentar a bio do Instagram e orientar o uso do WhatsApp no link da bio.
- Ser responsivo em celular e desktop com a paleta obrigatória.
