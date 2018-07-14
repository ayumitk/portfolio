// Behance projects list
import {
  behanceUser
} from './_behance';
behanceUser();


/*-------------------------------------------------------------------------------
    Smooth Scroll
-------------------------------------------------------------------------------*/
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

// Scroll to section when nav is clicked
const navLinks = document.querySelectorAll('header a');

Array.from(navLinks).forEach(el => {

  el.addEventListener('click', (e) => {

    e.preventDefault();

    const heading = event.target.getAttribute('href');
    document.querySelector(heading).scrollIntoView({
      behavior: 'smooth'
    });

    // Hide the menu once clicked if mobile
    if ($('header').hasClass('active')) {
      $('header, body').removeClass('active');
    }
  })
})

// Scroll to top
document.querySelector('#to-top').addEventListener('click', (e) => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})

// Scroll to first element
document.querySelector('#lead-down span').addEventListener('click', (e) => {
  document.querySelector('#about').scrollIntoView({
    behavior: 'smooth'
  });
})


/*-------------------------------------------------------------------------------
    Mobile Nav
-------------------------------------------------------------------------------*/
// Open mobile menu
document.querySelector('#mobile-menu-open').addEventListener('click', (e) => {
  document.querySelector('header, body').classList.add('active');
})

// Close mobile menu
document.querySelector('#mobile-menu-close').addEventListener('click', (e) => {
  document.querySelector('header, body').classList.remove('active');
})


/*-------------------------------------------------------------------------------
    Form
-------------------------------------------------------------------------------*/
import serialize from 'form-serialize'

const contactForm = document.querySelector('#ajaxForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // const formMessage = document.querySelector('#form-message');
  // formMessage.fadeOut();

  const url = 'https://formcarry.com/s/SyJGIGvZ7';
  const data = serialize(e.target);

  fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));


  /*$.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'https://formcarry.com/s/SyJGIGvZ7',
    data: $(this).serialize(),
    success: function (response) {
      if (response.status == "success") {
        formMessage.html('I received your submission, thank you!');
        formMessage.fadeIn();
      } else {
        formMessage.html('An error occured: ' + response.message);
        formMessage.fadeIn();
      }
    }
  });*/

})