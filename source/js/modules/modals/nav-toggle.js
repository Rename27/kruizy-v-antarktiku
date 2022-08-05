const pageBody = document.querySelector('.page__body');
const pageMain = pageBody.querySelector('.main');
const headerLogo = pageBody.querySelector('.header__logo');
const navOverlay = pageBody.querySelector('.nav__overlay');
const navToggleButton = pageBody.querySelector('.nav__toggle-button');

const navLinks = pageBody.querySelectorAll('.nav__link');

navOverlay.classList.remove('nav__overlay--jsnone');

const openNavOverlay = () => {
  navOverlay.classList.remove('nav__overlay--is-close');
  navOverlay.classList.add('nav__overlay--is-open');
  navToggleButton.classList.remove('nav__toggle-button--is-close');
  navToggleButton.classList.add('nav__toggle-button--is-open');
  headerLogo.style.visibility = 'hidden';
  pageBody.style.overflowY = 'hidden';
};

const closeNavOverlay = () => {
  navOverlay.classList.add('nav__overlay--is-close');
  navOverlay.classList.remove('nav__overlay--is-open');
  navToggleButton.classList.remove('nav__toggle-button--is-open');
  navToggleButton.classList.add('nav__toggle-button--is-close');
  headerLogo.style.visibility = 'visible';
  pageBody.style.overflowY = 'scroll';
};

export const navToggle = () => {
  navToggleButton.addEventListener('click', function () {
    if (navToggleButton.classList.contains('nav__toggle-button--is-close')) {
      openNavOverlay();
      pageMain.addEventListener('click', closeNavOverlay);
    } else {
      closeNavOverlay();
    }

    navLinks.forEach((navLink) => {
      navLink.addEventListener('click', closeNavOverlay);
    });
  });
};
