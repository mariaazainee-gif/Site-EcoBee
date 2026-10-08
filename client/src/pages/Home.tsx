import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Gift,
  HandHeart,
  Heart,
  Leaf,
  Menu,
  Minus,
  MessageCircle,
  Plus,
  Scissors,
  ShoppingBag,
  Sparkles,
  X,
  Trash2,
} from "lucide-react";

const whatsappNumber = "https://wa.me/5500000000000";
const whatsappUrl = `${whatsappNumber}?text=Oi%20EcoBee!%20Quero%20encomendar%20uma%20pe%C3%A7a%20com%20alma.`;
const navItems = [
  { label: "Peças", href: "#pecas" },
  { label: "Nosso jeito", href: "#manifesto" },
  { label: "Encomendas", href: "#encomendas" },
  { label: "Instagram", href: "#instagram" },
];

type Product = {
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  tone: string;
  price: number;
};
const products: Product[] = [
  {
    name: "Flores para guardar",
    eyebrow: "Decoração afetiva",
    description:
      "Um vasinho que floresce o ano todo — e lembra alguém querido toda vez que você olha.",
    image: "/manus-storage/ecobee-rosas_10915252.jpg",
    tone: "blush",
    price: 89,
  },
  {
    name: "Cestinha de carinho",
    eyebrow: "Presente único",
    description:
      "Pequenos buquês feitos ponto a ponto para levar cor, aconchego e um sorriso junto.",
    image: "/manus-storage/ecobee-cestinhas_b0e7373d.jpg",
    tone: "moss",
    price: 119,
  },
  {
    name: "Kit fio & pausa",
    eyebrow: "Para quem ama criar",
    description:
      "Texturas, fios e detalhes para transformar um cantinho em um lugar só seu.",
    image: "/manus-storage/ecobee-fios_95cba346.png",
    tone: "rose",
    price: 149,
  },
];

const values: Array<{ icon: LucideIcon; title: string; copy: string }> = [
  {
    icon: HandHeart,
    title: "Feito por mãos presentes",
    copy: "Cada peça carrega o tempo, a atenção e as pequenas marcas de quem fez.",
  },
  {
    icon: Leaf,
    title: "Menos excesso, mais sentido",
    copy: "Produzimos em menor escala, escolhendo materiais e ideias que duram.",
  },
  {
    icon: Gift,
    title: "Pensado para alguém",
    copy: "Cores, modelos e detalhes podem contar uma história que é só de vocês.",
  },
];

type CartLine = Product & { quantity: number };
const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function EcoBeeMark() {
  return (
    <a
      className="brand-mark"
      href="#inicio"
      aria-label="EcoBee, voltar ao início"
    >
      <span className="brand-mark__icon" aria-hidden="true">
        <span className="brand-mark__hexagon" />
        <span className="brand-mark__bee">✦</span>
      </span>
      <span className="brand-mark__word">EcoBee</span>
    </a>
  );
}

function WhatsAppButton({
  className = "",
  label = "Pedir pelo WhatsApp",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      className={`button button--whatsapp ${className}`}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={17} strokeWidth={2.2} aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight size={16} strokeWidth={2.1} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const closeMenu = () => setMenuOpen(false);
  const addToCart = (product: Product) => {
    setCart(current => {
      const existing = current.find(item => item.name === product.name);
      if (existing) {
        return current.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const updateQuantity = (name: string, delta: number) => {
    setCart(current =>
      current
        .map(item =>
          item.name === name
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartMessage = cart
    .map(item => `${item.quantity}x ${item.name}`)
    .join(", ");
  const cartWhatsAppUrl = `${whatsappNumber}?text=${encodeURIComponent(`Oi EcoBee! Quero reservar: ${cartMessage}. Total demonstrativo: ${formatPrice(cartTotal)}.`)}`;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner">
          <EcoBeeMark />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(item => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a
              className="header-instagram"
              href="#instagram"
              aria-label="Conheça nosso Instagram"
            >
              @ecobee.croche
            </a>
            <WhatsAppButton
              label="Falar com a gente"
              className="button--small"
            />
            <button
              className="cart-button"
              type="button"
              aria-label={`Abrir sacola com ${cartCount} itens`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={18} aria-hidden="true" />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(value => !value)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </header>

      <div
        className={`cart-backdrop ${cartOpen ? "cart-backdrop--open" : ""}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${cartOpen ? "cart-drawer--open" : ""}`}
        aria-label="Sua sacola"
        aria-hidden={!cartOpen}
      >
        <div className="cart-drawer__header">
          <div>
            <p className="card-eyebrow">Seu cantinho de compras</p>
            <h2>
              Sua sacola <span>({cartCount})</span>
            </h2>
          </div>
          <button
            className="cart-close"
            type="button"
            aria-label="Fechar sacola"
            onClick={() => setCartOpen(false)}
          >
            <X size={19} />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={26} />
            <p>
              Sua sacola está esperando
              <br />
              uma peça com alma.
            </p>
            <a
              className="button button--primary"
              href="#pecas"
              onClick={() => setCartOpen(false)}
            >
              Ver peças
            </a>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.map(item => (
                <div className="cart-line" key={item.name}>
                  <img src={item.image} alt="" />
                  <div className="cart-line__copy">
                    <strong>{item.name}</strong>
                    <span>{formatPrice(item.price)}</span>
                    <div className="quantity-control">
                      <button
                        type="button"
                        aria-label={`Diminuir ${item.name}`}
                        onClick={() => updateQuantity(item.name, -1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar ${item.name}`}
                        onClick={() => updateQuantity(item.name, 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-remove"
                    type="button"
                    aria-label={`Remover ${item.name}`}
                    onClick={() => updateQuantity(item.name, -item.quantity)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div>
                <span>Total demonstrativo</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <p>
                O checkout Shopify será conectado quando a conta da loja estiver
                criada. Por enquanto, reserve pelo WhatsApp.
              </p>
              <a
                className="button button--whatsapp"
                href={cartWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} /> Reservar pelo WhatsApp{" "}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </>
        )}
      </aside>

      <main id="conteudo">
        <section className="hero section-shell" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> Crochê artesanal, ponto a ponto
            </p>
            <h1>
              Um presente
              <br />
              <em>com tempo</em> dentro.
            </h1>
            <p className="hero-description">
              Peças únicas para presentear, decorar e guardar na memória —
              feitas devagar, com fios, cuidado e intenção.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#pecas">
                Conhecer as peças
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href="#manifesto">
                Conheça nosso jeito{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>e</span>
                <span>c</span>
                <span>o</span>
              </div>
              <p>
                <strong>Pequenas marcas de cuidado.</strong>
                <br />
                Nenhuma peça sai igual à outra.
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="/manus-storage/ecobee-rosas_10915252.jpg"
                alt="Flores de crochê coloridas em pequenos vasos artesanais"
              />
              <div className="image-caption">
                <span className="image-caption__line" />
                <span>
                  uma peça para
                  <br />
                  <strong>ficar na história</strong>
                </span>
              </div>
            </div>
            <div className="hero-side-note">
              <span className="hero-side-note__number">01</span>
              <span>
                presentes que
                <br />
                têm significado
              </span>
            </div>
          </div>
        </section>

        <section className="intro-strip" aria-label="Resumo da proposta EcoBee">
          <div className="intro-strip__inner">
            <span className="strip-label">EcoBee / desde sempre</span>
            <p>
              Para quem sente que o bonito é aquilo que tem <em>história.</em>
            </p>
            <a
              className="strip-arrow"
              href="#encomendas"
              aria-label="Ir para encomendas"
            >
              <ArrowDownRight size={19} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="products-section section-shell" id="pecas">
          <div className="section-heading section-heading--products">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot eyebrow-dot--rose" /> Para
                presentear & morar
              </p>
              <h2>
                Peças com
                <br />
                <em>jeito de lembrança.</em>
              </h2>
            </div>
            <p className="section-lead">
              Cada criação nasce de uma vontade: deixar a vida um pouquinho mais
              bonita e cheia de afeto.
            </p>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article
                className={`product-card product-card--${product.tone}`}
                key={product.name}
              >
                <div className="product-card__image">
                  <img src={product.image} alt={product.name} />
                  <span className="product-card__index">0{index + 1}</span>
                  <span className="product-card__tag">feito à mão</span>
                </div>
                <div className="product-card__body">
                  <p className="card-eyebrow">{product.eyebrow}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-card__buy-row">
                    <strong>{formatPrice(product.price)}</strong>
                    <button
                      className="add-to-cart"
                      type="button"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag size={15} /> Adicionar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="provisional-note">
            <Sparkles size={15} aria-hidden="true" /> Catálogo demonstrativo —
            preços e checkout Shopify entram na próxima etapa.
          </p>
        </section>

        <section className="manifesto-section" id="manifesto">
          <div className="manifesto-section__pattern" aria-hidden="true" />
          <div className="manifesto-inner section-shell">
            <div className="manifesto-label">
              <span className="manifesto-label__line" />
              <span>
                Nosso
                <br />
                manifesto
              </span>
            </div>
            <div className="manifesto-copy">
              <p className="eyebrow eyebrow--light">
                <span className="eyebrow-dot eyebrow-dot--cream" /> Feito
                devagar, feito com alma
              </p>
              <blockquote>
                “Nada que importa
                <br />
                <em>nasce com pressa.</em>”
              </blockquote>
              <div className="manifesto-text">
                <p>
                  Uma abelha constrói seu mundo uma célula de cada vez, e nós
                  construímos o nosso um ponto de cada vez.
                </p>
                <p>
                  Cada peça da EcoBee passa pelas mãos de alguém que se importa.
                  Não existem duas iguais, porque o feito à mão carrega pequenas
                  marcas de cuidado que nenhuma máquina reproduz.
                </p>
              </div>
              <a className="light-link" href="#processo">
                O jeito EcoBee <ArrowDownRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="manifesto-aside">
              <div className="manifesto-quote-mark">“</div>
              <p>
                Presente bom é aquele que alguém teve tempo de fazer pensando em
                você.
              </p>
              <span className="signature">
                EcoBee <span>✦</span>
              </span>
            </div>
          </div>
        </section>

        <section className="process-section section-shell" id="processo">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> O nosso jeito
            </p>
            <h2>
              Da ideia ao carinho,
              <br />
              <em>um ponto por vez.</em>
            </h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <article className="value-card" key={value.title}>
                  <div className="value-card__top">
                    <span className="value-card__icon">
                      <Icon size={21} strokeWidth={1.7} />
                    </span>
                    <span className="value-card__number">0{index + 1}</span>
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              );
            })}
          </div>
          <div className="process-bridge">
            <span className="process-bridge__number">04</span>
            <p>
              <strong>Agora é com você.</strong> Conte a história, escolha as
              cores e a gente transforma tudo em pontos.
            </p>
            <a className="process-bridge__link" href="#encomendas">
              Começar uma encomenda{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="custom-section section-shell" id="encomendas">
          <div className="custom-visual">
            <img
              src="/manus-storage/ecobee-cestinhas_b0e7373d.jpg"
              alt="Cestinhas de flores de crochê coloridas penduradas"
            />
            <div className="custom-visual__card">
              <strong>
                do seu
                <br />
                jeitinho
              </strong>
              <span>
                cores + modelo
                <br />+ intenção
              </span>
            </div>
          </div>
          <div className="custom-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot eyebrow-dot--rose" /> Encomendas
              personalizadas
            </p>
            <h2>
              Tem uma ideia
              <br />
              morando aí?
            </h2>
            <p className="custom-lead">
              A gente transforma em crochê. Você escolhe as cores, conta para
              quem é e nós cuidamos do resto — com calma, conversa e muito
              carinho.
            </p>
            <ul className="check-list">
              <li>
                <span>
                  <Check size={14} />
                </span>{" "}
                Cores que combinam com a sua história
              </li>
              <li>
                <span>
                  <Check size={14} />
                </span>{" "}
                Modelos pensados para presentear ou decorar
              </li>
              <li>
                <span>
                  <Check size={14} />
                </span>{" "}
                Um processo acompanhado de perto
              </li>
            </ul>
            <WhatsAppButton label="Conversar sobre uma ideia" />
            <p className="custom-footnote">
              <Scissors size={14} aria-hidden="true" /> Cada encomenda é um
              pequeno projeto feito só para você.
            </p>
          </div>
        </section>

        <section className="conscious-section">
          <div className="conscious-inner section-shell">
            <div className="conscious-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot eyebrow-dot--cream" /> Escolher com
                consciência
              </p>
              <h2>
                Menos pressa.
                <br />
                <em>Mais sentido.</em>
              </h2>
              <p>
                Em um mundo de coisas produzidas aos montes, escolhemos o
                contrário: peças para durar, para presentear, para guardar na
                memória e no coração.
              </p>
            </div>
            <div className="conscious-facts">
              <div className="fact-item">
                <span>01</span>
                <p>
                  produção
                  <br />
                  <strong>em menor escala</strong>
                </p>
              </div>
              <div className="fact-item">
                <span>02</span>
                <p>
                  tempo para
                  <br />
                  <strong>fazer bem feito</strong>
                </p>
              </div>
              <div className="fact-item">
                <span>03</span>
                <p>
                  valor para
                  <br />
                  <strong>o trabalho manual</strong>
                </p>
              </div>
            </div>
            <div className="conscious-symbol" aria-hidden="true">
              ⌁
            </div>
          </div>
        </section>

        <section className="instagram-section section-shell" id="instagram">
          <div className="instagram-card">
            <div className="instagram-card__copy">
              <p className="eyebrow">
                <span className="eyebrow-dot eyebrow-dot--rose" /> Um cantinho
                nosso
              </p>
              <h2>
                Vem ver o que
                <br />
                <em>estamos criando.</em>
              </h2>
              <p className="instagram-handle">@ecobee.croche</p>
              <p className="instagram-bio">
                🐝 Crochê feito à mão, ponto a ponto
                <br />
                🧶 Peças únicas para presentear e decorar
                <br />✨ Encomendas personalizadas
                <br />
                👇 Peça pelo WhatsApp
              </p>
              <a className="text-link" href="#contato">
                Seguir esse fio <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="instagram-card__mosaic">
              <div className="mosaic-photo mosaic-photo--large">
                <img
                  src="/manus-storage/ecobee-fios_95cba346.png"
                  alt="Fios de crochê em cores suaves"
                />
              </div>
              <div className="mosaic-photo mosaic-photo--small">
                <img
                  src="/manus-storage/ecobee-texturas_f63464af.png"
                  alt="Texturas de fios artesanais em tons neutros"
                />
              </div>
              <div className="mosaic-note">
                <Heart size={17} fill="currentColor" aria-hidden="true" />
                <span>
                  feito para
                  <br />
                  fazer bem
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta" id="contato">
          <div className="final-cta__pattern" aria-hidden="true" />
          <div className="final-cta__inner section-shell">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow-dot eyebrow-dot--cream" /> O próximo
              ponto pode ser seu
            </p>
            <h2>
              Vamos fazer
              <br />
              <em>algo com alma?</em>
            </h2>
            <p>
              Conta para a gente quem você quer presentear — ou qual cantinho da
              sua casa pede um pouco mais de carinho.
            </p>
            <WhatsAppButton
              label="Pedir uma encomenda"
              className="button--cream"
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner section-shell">
          <div>
            <EcoBeeMark />
            <p>
              crochê com alma,
              <br />
              ponto a ponto.
            </p>
          </div>
          <div className="footer-links">
            <a href="#pecas">Peças</a>
            <a href="#manifesto">Manifesto</a>
            <a href="#encomendas">Encomendas</a>
            <a href="#instagram">Instagram</a>
          </div>
          <div className="footer-contact">
            <span>Quer conversar?</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom section-shell">
          <span>© 2026 EcoBee. Feito devagar, feito com alma.</span>
          <span>
            feito com carinho <span aria-hidden="true">✦</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
