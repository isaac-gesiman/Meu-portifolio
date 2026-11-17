/**
 * Páginas de projeto - animações GSAP no padrão do index.html
 * Título com embaralhado e conteúdo que surge aos poucos conforme a rolagem.
 */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

  // Mantém a revelação ativa mesmo com "reduzir movimento" ligado no sistema.
  // Nesse caso, apenas removemos os deslocamentos, preservando o fade progressivo.
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var MOVE_Y = reduce ? 0 : 48;
  var MOVE_X = reduce ? 0 : -32;
  var HERO_Y = reduce ? 0 : 28;

  console.info('[projeto.js] animações ativas', {
    gsap: typeof gsap,
    ScrollTrigger: typeof ScrollTrigger,
    movimentoReduzido: reduce
  });

  var CONFIG = {
    start: 'top 82%',
    end: 'bottom 35%',
    scrub: 1,
    ease: 'none'
  };

  // Título: letras surgem com embaralhado, como na página inicial
  var title = document.getElementById('proj-title');
  if (title) {
    var original = title.textContent;
    var noise = '!@#$%&*?+=<>';
    var count = 0;

    title.setAttribute('aria-label', original);
    title.textContent = '';

    original.split(' ').forEach(function (word) {
      var wordEl = document.createElement('span');
      wordEl.style.cssText = 'display:inline-block;margin-right:.25em';
      wordEl.setAttribute('aria-hidden', 'true');

      word.split('').forEach(function (char) {
        var letter = document.createElement('span');
        letter.textContent = char;
        letter.style.opacity = 0;
        wordEl.appendChild(letter);

        var state = { progress: 0 };
        var delay = count * 0.045;

        gsap.to(letter, { opacity: 1, duration: 0.12, delay: delay });
        gsap.to(state, {
          progress: 1,
          duration: 0.4,
          delay: delay,
          ease: 'none',
          onUpdate: function () {
            letter.textContent = state.progress < 1
              ? noise[Math.floor(Math.random() * noise.length)]
              : char;
          },
          onComplete: function () { letter.textContent = char; }
        });
        count++;
      });

      title.appendChild(wordEl);
    });

    // fromTo com valor final explícito: evita que o elemento fique preso em opacity 0
    gsap.fromTo('.proj-fade',
      { opacity: 0, y: HERO_Y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.18,
        delay: Math.min(count * 0.02 + 0.2, 1),
        ease: 'power3.out',
        clearProps: 'transform'
      }
    );
  }

  // Divide o texto em palavras sem perder <strong>, <code> etc.
  function splitWords(element) {
    var words = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var fragment = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              fragment.appendChild(document.createTextNode(part));
            } else {
              var span = document.createElement('span');
              span.textContent = part;
              words.push(span);
              fragment.appendChild(span);
            }
          });
          child.parentNode.replaceChild(fragment, child);
        } else {
          walk(child);
        }
      });
    })(element);
    return words;
  }

  // Parágrafos: cada palavra acende em um ritmo lento, acompanhando a rolagem
  document.querySelectorAll('.reveal-text').forEach(function (paragraph) {
    gsap.fromTo(splitWords(paragraph),
      { opacity: 0.08 },
      {
        opacity: 1,
        ease: CONFIG.ease,
        stagger: { each: 0.3 },
        scrollTrigger: {
          trigger: paragraph,
          start: CONFIG.start,
          end: CONFIG.end,
          scrub: CONFIG.scrub
        }
      }
    );
  });

  // Blocos: surgem gradualmente (fade + subida) enquanto a página desce
  document.querySelectorAll('.reveal-block').forEach(function (block) {
    gsap.fromTo(block,
      { opacity: 0, y: MOVE_Y },
      {
        opacity: 1,
        y: 0,
        ease: CONFIG.ease,
        scrollTrigger: {
          trigger: block,
          start: 'top 82%',
          end: 'top 30%',
          scrub: CONFIG.scrub
        }
      }
    );
  });

  // Títulos de seção: mesma progressão dos blocos
  document.querySelectorAll('.section-title').forEach(function (heading) {
    gsap.fromTo(heading,
      { opacity: 0, y: MOVE_Y },
      {
        opacity: 1,
        y: 0,
        ease: CONFIG.ease,
        scrollTrigger: {
          trigger: heading,
          start: 'top 82%',
          end: 'top 30%',
          scrub: CONFIG.scrub
        }
      }
    );
  });

  // Itens de lista: aparecem um por um ao longo da rolagem
  document.querySelectorAll('.reveal-list').forEach(function (list) {
    var items = list.querySelectorAll('.reveal-item');
    if (!items.length) return;

    gsap.fromTo(items,
      { opacity: 0, x: MOVE_X },
      {
        opacity: 1,
        x: 0,
        ease: CONFIG.ease,
        stagger: { each: 0.35 },
        scrollTrigger: {
          trigger: list,
          start: 'top 82%',
          end: 'bottom 35%',
          scrub: CONFIG.scrub
        }
      }
    );
  });

  // Rolagem suave para os links âncoras (como na home)
  if (typeof ScrollToPlugin !== 'undefined') {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        var target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        event.preventDefault();

        var offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
        gsap.to(window, { scrollTo: { y: offset, autoKill: false }, duration: 0.4, ease: 'power2.out' });
      });
    });
  }

  // Recalcula os gatilhos depois que as fontes carregam
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      ScrollTrigger.getAll().forEach(function (trigger) { trigger.disable(); });
    } else {
      ScrollTrigger.getAll().forEach(function (trigger) { trigger.enable(); });
    }
  });
})();
