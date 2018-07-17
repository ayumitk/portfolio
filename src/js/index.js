import svgInclude from './_svg';

import {
  behanceUser
} from './_behance';

import {
  smoothScroll,
  scrollTop,
  scrollLead
} from './_scroll';

import formcarry from './_formcarry';

svgInclude();

behanceUser();

formcarry();

smoothScroll();
scrollTop();
scrollLead();

/*-------------------------------------------------------------------------------
    Mobile Nav
-------------------------------------------------------------------------------*/
// Open mobile menu
document.querySelector('#mobile-menu-open').addEventListener('click', () => {
  document.querySelectorAll('header, body').classList.add('active');
});

// Close mobile menu
document.querySelector('#mobile-menu-close').addEventListener('click', () => {
  document.querySelectorAll('header, body').classList.remove('active');
});