
/* Shopify Cart API */
function addToCartShopify(variantId, btn) {
  var orig = btn.textContent;
  btn.textContent = 'Adding...';
  btn.style.pointerEvents = 'none';

  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ id: parseInt(variantId), quantity: 1 }] })
  })
  .then(function(r) { return r.json(); })
  .then(function() {
    btn.textContent = 'Added \u2713';
    return fetch('/cart.js');
  })
  .then(function(r) { return r.json(); })
  .then(function(cart) {
    document.getElementById('cart-count').textContent = cart.item_count;
    setTimeout(function() {
      btn.textContent = orig;
      btn.style.pointerEvents = '';
    }, 1500);
  })
  .catch(function() {
    btn.textContent = orig;
    btn.style.pointerEvents = '';
  });
}

/* Cart */
var cartCount = 0;
function addToCart(btn) {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  var orig = btn.textContent;
  btn.textContent = 'Added \u2713';
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.7';
  setTimeout(function() {
    btn.textContent = orig;
    btn.style.pointerEvents = '';
    btn.style.opacity = '';
  }, 1500);
}

/* Sticky header shadow */
window.addEventListener('scroll', function() {
  var h = document.getElementById('site-header');
  if (window.scrollY > 10) h.classList.add('scrolled');
  else h.classList.remove('scrolled');
}, { passive: true });

/* Scroll reveal */
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach(function(el) { revealObs.observe(el); });

/* Scroll Fuel section */
(function() {
  var section = document.querySelector('.scroll-fuel');
  var bars = section.querySelector('.sfuel-bars');
  var label = section.querySelector('.sfuel-label');
  var words = section.querySelectorAll('.sfuel-word');
  if (!section || !bars) return;

  function update() {
    var rect = section.getBoundingClientRect();
    var total = section.offsetHeight - window.innerHeight;
    var progress = Math.max(0, Math.min(1, -rect.top / total));

    /* Bars travel from translateY(100vh) to translateY(-10vh) */
    var barProgress = Math.max(0, (progress - 0.4) / 0.6);
    var ty = 100 - (barProgress * 100);
    bars.style.transform = 'translateX(-50%) translateY(' + ty + 'vh)';

    /* Words fade in staggered */
    for (var i = 0; i < words.length; i++) {
      var wordStart = i * 0.15;
      var wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / 0.3));
      words[i].style.opacity = 0.08 + (wordProgress * 0.92);
      words[i].style.textShadow = ' 0 0 ' + (wordProgress * 40) + 'px rgba(255,255,255,' + (wordProgress * 0.3) + '), 0 0 ' + (wordProgress * 80) + 'px rgba(173,133,68,' + (wordProgress * 0.15) + ')';
      words[i].style.transform = 'translateY(' + (20 - wordProgress * 20) + 'px)';
    }

    /* Label fades in mid-scroll */
    label.style.opacity = (progress > 0.85) ? '1' : '0';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* FAQ accordion */
function toggleFaq(btn) {
  var item = btn.parentElement;
  var wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(el) { el.classList.remove('open'); });
  if (!wasOpen) item.classList.add('open');
}


