/**
 * assets/js/sacola.js
 * Comportamento da pagina: menu do celular e sacola de compras (demonstrativa).
 * A sacola e so visual, nao grava nada em servidor: ela "reserva" pelo WhatsApp.
 * O numero do WhatsApp vem de assets/js/config.js (variavel WHATSAPP_NUMERO).
 */
(function () {
    'use strict';

    // ---------- Atalhos ----------
    var $ = function (id) { return document.getElementById(id); };

    // Elementos da pagina
    var gaveta        = $('sacola');
    var fundo         = $('fundo-sacola');
    var btnAbrir      = $('btn-abrir-sacola');
    var btnFechar     = $('btn-fechar-sacola');
    var contador      = $('contador-sacola');
    var tituloQtd     = $('sacola-quantidade');
    var blocoVazio    = $('sacola-vazia');
    var blocoCheio    = $('sacola-cheia');
    var listaLinhas   = $('sacola-linhas');
    var totalEl       = $('sacola-total');
    var linkWhatsapp  = $('sacola-whatsapp');
    var modeloLinha   = $('modelo-linha-sacola');
    var btnMenu       = $('btn-menu');
    var menuMobile    = $('menu-mobile');
    var iconeMenu     = $('icone-menu');
    var iconeFechar   = $('icone-menu-fechar');

    // Endereco base do WhatsApp, montado com o numero do config.js
    var WHATSAPP_BASE = 'https://wa.me/' + WHATSAPP_NUMERO;

    // Todos os links marcados com data-whatsapp passam a usar o numero do config.js
    // (a mensagem de cada link, depois do "?text=", e mantida como esta no HTML)
    document.querySelectorAll('a[data-whatsapp]').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var posicao = href.indexOf('?');
        if (posicao !== -1) {
            a.setAttribute('href', WHATSAPP_BASE + href.substring(posicao));
        }
    });

    // Cada item: { nome, preco, imagem, quantidade }
    var sacola = [];

    // Formata em reais: 89 -> "R$ 89,00"
    function formatarPreco(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // ---------- Abrir / fechar a sacola ----------
    function abrirSacola() {
        gaveta.classList.add('cart-drawer--open');
        fundo.classList.add('cart-backdrop--open');
        gaveta.setAttribute('aria-hidden', 'false');
    }

    function fecharSacola() {
        gaveta.classList.remove('cart-drawer--open');
        fundo.classList.remove('cart-backdrop--open');
        gaveta.setAttribute('aria-hidden', 'true');
    }

    // ---------- Regras da sacola ----------
    function adicionar(produto) {
        var existente = sacola.find(function (item) { return item.nome === produto.nome; });
        if (existente) {
            existente.quantidade += 1;
        } else {
            sacola.push({
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem,
                quantidade: 1
            });
        }
        desenhar();
        abrirSacola();
    }

    // delta = +1, -1 ou -quantidade (para remover o item inteiro)
    function alterarQuantidade(nome, delta) {
        sacola.forEach(function (item) {
            if (item.nome === nome) {
                item.quantidade = Math.max(0, item.quantidade + delta);
            }
        });
        // tira da sacola quem ficou com zero
        sacola = sacola.filter(function (item) { return item.quantidade > 0; });
        desenhar();
    }

    // ---------- Desenha a sacola na tela ----------
    function desenhar() {
        var quantidadeTotal = 0;
        var valorTotal = 0;
        var resumoWhatsapp = [];

        sacola.forEach(function (item) {
            quantidadeTotal += item.quantidade;
            valorTotal += item.preco * item.quantidade;
            resumoWhatsapp.push(item.quantidade + 'x ' + item.nome);
        });

        // Contador do icone no topo e titulo da gaveta
        contador.textContent = quantidadeTotal;
        contador.hidden = quantidadeTotal === 0;
        btnAbrir.setAttribute('aria-label', 'Abrir sacola com ' + quantidadeTotal + ' itens');
        tituloQtd.textContent = '(' + quantidadeTotal + ')';

        // Mostra "vazia" ou "com itens"
        blocoVazio.hidden = sacola.length > 0;
        blocoCheio.hidden = sacola.length === 0;

        // Recria as linhas a partir do <template> do cabecalho.php
        listaLinhas.innerHTML = '';
        sacola.forEach(function (item) {
            var linha = modeloLinha.content.cloneNode(true);

            var img = linha.querySelector('img');
            img.src = item.imagem;

            // textContent (e nao innerHTML) evita injetar HTML por engano
            linha.querySelector('[data-campo="nome"]').textContent = item.nome;
            linha.querySelector('[data-campo="preco"]').textContent = formatarPreco(item.preco);
            linha.querySelector('[data-campo="quantidade"]').textContent = item.quantidade;

            var diminuir = linha.querySelector('[data-acao="diminuir"]');
            var aumentar = linha.querySelector('[data-acao="aumentar"]');
            var remover  = linha.querySelector('[data-acao="remover"]');

            diminuir.setAttribute('aria-label', 'Diminuir ' + item.nome);
            aumentar.setAttribute('aria-label', 'Aumentar ' + item.nome);
            remover.setAttribute('aria-label', 'Remover ' + item.nome);

            diminuir.addEventListener('click', function () { alterarQuantidade(item.nome, -1); });
            aumentar.addEventListener('click', function () { alterarQuantidade(item.nome, 1); });
            remover.addEventListener('click', function () { alterarQuantidade(item.nome, -item.quantidade); });

            listaLinhas.appendChild(linha);
        });

        // Total e link de reserva pelo WhatsApp
        totalEl.textContent = formatarPreco(valorTotal);
        var mensagem = 'Oi EcoBee! Quero reservar: ' + resumoWhatsapp.join(', ') +
                       '. Total demonstrativo: ' + formatarPreco(valorTotal) + '.';
        linkWhatsapp.href = WHATSAPP_BASE + '?text=' + encodeURIComponent(mensagem);
    }

    // ---------- Menu do celular ----------
    function alternarMenu(abrir) {
        menuMobile.classList.toggle('mobile-nav--open', abrir);
        btnMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
        btnMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
        iconeMenu.hidden = abrir;
        iconeFechar.hidden = !abrir;
    }

    // ---------- Ligando os eventos ----------
    // Botoes "Adicionar" dos produtos (os dados vem dos atributos data-* do HTML)
    document.querySelectorAll('.add-to-cart').forEach(function (botao) {
        botao.addEventListener('click', function () {
            adicionar({
                nome: botao.getAttribute('data-nome'),
                preco: parseFloat(botao.getAttribute('data-preco')),
                imagem: botao.getAttribute('data-imagem')
            });
        });
    });

    btnAbrir.addEventListener('click', abrirSacola);
    btnFechar.addEventListener('click', fecharSacola);
    fundo.addEventListener('click', fecharSacola);

    // Link "Ver peças" da sacola vazia
    document.querySelectorAll('[data-fechar-sacola]').forEach(function (el) {
        el.addEventListener('click', fecharSacola);
    });

    // Tecla Esc fecha a sacola
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { fecharSacola(); }
    });

    btnMenu.addEventListener('click', function () {
        alternarMenu(!menuMobile.classList.contains('mobile-nav--open'));
    });

    // Clicar em um link do menu fecha o menu do celular
    document.querySelectorAll('#menu-mobile a, .desktop-nav a').forEach(function (a) {
        a.addEventListener('click', function () { alternarMenu(false); });
    });

    // Desenho inicial (sacola vazia)
    desenhar();
})();
