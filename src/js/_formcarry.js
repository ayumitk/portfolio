/*-------------------------------------------------------------------------------
    formcarry.
-------------------------------------------------------------------------------*/

export default function formcarry() {
  const contactForm = document.querySelector('#ajaxForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formMessage = document.querySelector('#form-message');
    formMessage.style.display = 'none';

    const url = 'https://formcarry.com/s/SyJGIGvZ7';
    const form = document.forms.formcarry;
    const formData = new FormData(form);
    const data = {};

    for (const [key, prop] of formData) {
      data[key] = prop;
    }

    const method = 'POST';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(data);

    fetch(url, {
      method,
      headers,
      body
    }).then(res => res.json())
      .catch((error) => {
        formMessage.innerHTML = `An error occured: ${error.message}.`;
        formMessage.style.display = 'block';
      })
      .then((response) => {
        formMessage.innerHTML = `${response.title} ${response.message}.`;
        formMessage.style.display = 'block';
      });
  });
}