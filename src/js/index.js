// SVG include
import smoothscroll from 'smoothscroll-polyfill';
import svgInclude from './_svg';

// Smooth Scroll

// Behance projects list
import {
  behanceUser
} from './_behance';

// Formcarry
import formcarry from './_formcarry';

svgInclude();

smoothscroll.polyfill();

behanceUser();

formcarry();


/*-------------------------------------------------------------------------------
    Smooth Scroll
-------------------------------------------------------------------------------*/
// Scroll to section when nav is clicked
const navLinks = document.querySelectorAll('header a');

Array.from(navLinks).forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    const heading = e.target.getAttribute('href');
    document.querySelector(heading).scrollIntoView({
      behavior: 'smooth'
    });

    // Hide the menu once clicked if mobile
    /* if (document.querySelector('header').hasClass('active')) {
      document.querySelector('header, body').removeClass('active');
    } */
  });
});

// Scroll to top
document.querySelector('#to-top').addEventListener('click', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Scroll to first element
document.querySelector('#lead-down span').addEventListener('click', () => {
  document.querySelector('#about').scrollIntoView({
    behavior: 'smooth'
  });
});


/*-------------------------------------------------------------------------------
    Mobile Nav
-------------------------------------------------------------------------------*/
// Open mobile menu
document.querySelector('#mobile-menu-open').addEventListener('click', () => {
  document.querySelector('header, body').classList.add('active');
});

// Close mobile menu
document.querySelector('#mobile-menu-close').addEventListener('click', () => {
  document.querySelector('header, body').classList.remove('active');
});