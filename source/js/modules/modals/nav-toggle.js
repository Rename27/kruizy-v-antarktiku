const navToggleButton = document.querySelector('.nav__toggle-button');
const navMain = document.querySelector('.nav__list');
const headerLogo = document.querySelector('.header__logo');

navMain.classList.remove('nav__list--js-none');
navMain.classList.add('nav__list--is-close');
navMain.classList.remove('nav__list--is-open');

export const navToggle = () => {
  navToggleButton.addEventListener('click', function () {
    if (navMain.classList.contains('nav__list--is-close')) {
      navMain.classList.remove('nav__list--is-close');
      navMain.classList.add('nav__list--is-open');
      navToggleButton.classList.remove('nav__toggle-button--is-close');
      navToggleButton.classList.add('nav__toggle-button--is-open');
      headerLogo.style.visibility = 'hidden';
    } else {
      navMain.classList.add('nav__list--is-close');
      navMain.classList.remove('nav__list--is-open');
      navToggleButton.classList.remove('nav__toggle-button--is-open');
      navToggleButton.classList.add('nav__toggle-button--is-close');
      headerLogo.style.visibility = 'visible';
    }
  });
};
