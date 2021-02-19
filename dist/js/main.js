"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

var header = document.querySelector('#header');
var menuBtn = document.querySelector('#menu-btn');
var headerMenu = document.querySelector('#menu');
var uspCards = document.querySelectorAll('.usp__card');
var uspArrows = document.querySelectorAll('.usp__card-arrow');
var uspLines = document.querySelectorAll('.usp__center-line'); // const uspCenter = document.querySelector('.usp__center-img');

var bodyPlash = document.querySelector('.body-plash');
var anchorBtn = document.querySelector('#anchor');
var intro = document.querySelector('.intro');
var cookieBtn = document.querySelector('#cookies-btn');
var cookieBlock = document.querySelector('.cookies');
var mobileLines = document.querySelectorAll('.usp__center-line-mobile');
var uspCenter = document.querySelectorAll('#center-collapse');
uspArrows.forEach(function (arrow) {
  arrow.addEventListener('click', function (e) {
    var currentCard = e.currentTarget.parentElement;
    var hiddenText = currentCard.querySelector('.usp__card-hidden');
    var hiddenDots = currentCard.querySelector('.usp__card-dots');
    currentCard.classList.toggle('active');

    if (hiddenText) {
      if (currentCard.classList.contains('active')) {
        hiddenDots.style.display = 'none';
        hiddenText.style.maxHeight = "".concat(hiddenText.scrollHeight, "px");
      } else {
        hiddenDots.style.display = 'inline';
        hiddenText.style.maxHeight = "".concat(0, "px");
      }
    }
  });
});

function animCard() {
  function lineAnim(dataCard) {
    uspLines.forEach(function (line) {
      var lineData = line.getAttribute('data-line');

      if (lineData === dataCard) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });
  }

  uspCards.forEach(function (card) {
    card.addEventListener('mouseenter', function (e) {
      var cardData = e.currentTarget.getAttribute('data-card');
      lineAnim(cardData);
    });
  });
}

animCard();
uspCenter.forEach(function (item) {
  item.addEventListener('mousemove', function () {
    uspLines.forEach(function (item) {
      item.classList.add('active');
    });
    mobileLines.forEach(function (item) {
      item.classList.add('active');
    });
  });
  item.addEventListener('mouseleave', function () {
    uspLines.forEach(function (item) {
      item.classList.remove('active');
    });
    mobileLines.forEach(function (item) {
      item.classList.remove('active');
    });
  });
}); // Шапка

menuBtn.addEventListener('click', function (e) {
  e.currentTarget.classList.toggle('header__menu-active');
  header.classList.toggle('active');
  headerMenu.classList.toggle('active');
  bodyPlash.classList.toggle('active');
});

function headerAnimate() {
  var indicator = 50;

  if (window.pageYOffset >= indicator) {
    header.classList.add('header-fixed');
  } else {
    header.classList.remove('header-fixed');
  }
}

function dynamicAdaptive() {
  var originalParent = document.querySelector('.header-side');
  var futureParent = document.querySelector('#menu');
  var currentItem = document.querySelector('.header__login');
  var mediaSize = 992;
  var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  if (viewportWidth <= mediaSize) {
    if (!currentItem.classList.contains('dynamic-adaptive')) {
      futureParent.insertBefore(currentItem, futureParent.children[0]);
      currentItem.classList.add('dynamic-adaptive');
    }
  } else if (currentItem.classList.contains('dynamic-adaptive')) {
    originalParent.insertBefore(currentItem, originalParent.children[1]);
    currentItem.classList.remove('dynamic-adaptive');
  }
} // Слайдеры


var communitySlider = new Swiper('.community-container', {
  loop: true,
  slidesPerView: 5,
  spaceBetween: 15,
  slidesPerColumn: 1,
  watchSlidesVisibility: true,
  keyboard: true,
  speed: 400,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    1150: {
      slidesPerView: 5
    },
    992: {
      slidesPerView: 4
    },
    850: {
      slidesPerView: 4
    },
    540: {
      slidesPerView: 2.7
    },
    0: {
      slidesPerView: 1.3
    }
  }
});
var serviceSlider = new Swiper('.services-container', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    1201: {
      slidesPerView: 3
    },
    850: {
      slidesPerView: 2.2
    },
    769: {
      slidesPerView: 1.8
    },
    550: {
      slidesPerView: 1.6
    },
    0: {
      slidesPerView: 1.2
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  keyboard: true
}); // Якорь

function anchorShow() {
  var indicator = 500;

  if (window.pageYOffset >= indicator) {
    anchorBtn.classList.add('active');
  } else {
    anchorBtn.classList.remove('active');
  }
}

function anchorScroll(element, duration) {
  var target = document.querySelector(element);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(curTime) {
    if (startTime === null) startTime = curTime;
    var timeElapsed = curTime - startTime;
    var run = animationName(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function animationName(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

cookieBtn.addEventListener('click', function () {
  cookieBlock.classList.remove('active');
  Cookies.set('tm-cookie', 'true', {
    expires: 30
  });
  var getNone = setTimeout(function () {
    cookieBlock.style.display = 'none';
    clearTimeout(getNone);
  }, 1000);
});

function cookies() {
  if (!Cookies.get('tm-cookie')) {
    setTimeout(function () {
      cookieBlock.classList.add('active');
    }, 1000);
  }
}

cookies();
anchorBtn.addEventListener('click', function (e) {
  e.preventDefault();
  anchorScroll('.intro', 2000);
});
window.addEventListener('scroll', function () {
  headerAnimate();
  anchorShow();
});
window.addEventListener('resize', function () {
  dynamicAdaptive();
});
window.addEventListener('DOMContentLoaded', function () {
  dynamicAdaptive();
  headerAnimate();
  anchorShow();
});
AOS.init();