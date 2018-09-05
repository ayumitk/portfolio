// Smooth Scroll
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

/*-------------------------------------------------------------------------------
    Smooth Scroll
-------------------------------------------------------------------------------*/
// Scroll to section when nav is clicked
export function smoothScroll() {
  const navLinks = document.querySelectorAll('header a');

  Array.from(navLinks).forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();

      const heading = e.target.getAttribute('href');
      document.querySelector(heading).scrollIntoView({
        behavior: 'smooth'
      });

      // Hide the menu once clicked if mobile
      const isActive = document.querySelector('body').classList.contains('nav-active');
      if (isActive) {
        document.querySelector('body').classList.remove('navactive');
      }
    });
  });
}

// Scroll to top
export function scrollTop() {
  document.querySelector('#to-top').addEventListener('click', () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
}

// Scroll to first element
export function scrollLead() {
  document.querySelector('#lead-down span').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth'
    });
  });
}