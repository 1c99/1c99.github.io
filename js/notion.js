/* ================================================================
   notion.js — Scroll fade-in animations for project detail pages
   Uses IntersectionObserver with progressive enhancement
   ================================================================ */
(function () {
  'use strict';

  // Top-level containers animate as a whole unit
  var CONTAINERS = ['.section', '.metrics-banner', '.impact-statement'];

  // Child elements only animate when NOT inside a container
  var CHILDREN = [
    '.diagram',
    '.content-image-wrap',
    '.status-callout',
    '.comparison',
    '.pipeline',
    '.model-table',
    '.flow',
    '.challenges',
    '.two-prong',
    '.approaches',
    '.quality-grid',
    '.lang-pills',
  ];

  function init() {
    var targets = [];
    var containerSel = CONTAINERS.join(',');

    // Always include containers
    var containers = document.querySelectorAll(containerSel);
    for (var i = 0; i < containers.length; i++) {
      targets.push(containers[i]);
    }

    // Only include children that are NOT nested inside a container
    var children = document.querySelectorAll(CHILDREN.join(','));
    for (var j = 0; j < children.length; j++) {
      if (!children[j].closest(containerSel)) {
        targets.push(children[j]);
      }
    }

    if (!targets.length) return;

    // Progressive enhancement: add fade-in class via JS
    for (var a = 0; a < targets.length; a++) {
      targets[a].classList.add('fade-in');
    }

    // Fallback if IntersectionObserver not supported
    if (!('IntersectionObserver' in window)) {
      for (var b = 0; b < targets.length; b++) {
        targets[b].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger metric cards within this element
            var cards = entry.target.querySelectorAll('.metric-card');
            for (var k = 0; k < cards.length; k++) {
              cards[k].style.transitionDelay = k * 100 + 'ms';
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    for (var m = 0; m < targets.length; m++) {
      observer.observe(targets[m]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
