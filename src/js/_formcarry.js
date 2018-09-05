/*-------------------------------------------------------------------------------
    formcarry.
-------------------------------------------------------------------------------*/

export default function formcarry() {
  const contactForm = document.querySelector('#ajaxForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitText = document.querySelector('#submit-text');
    const iconProcessing = document.querySelector('#submit-processing');
    const iconSuccess = document.querySelector('#submit-success');
    const iconError = document.querySelector('#submit-error');

    iconSuccess.style.display = 'none';
    iconError.style.display = 'none';
    iconProcessing.style.display = 'block';
    submitText.innerHTML = 'Sending...';


    const url = 'https://formcarry.com/s/SyJGIGvZ7';
    const form = document.forms.formcarry;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((prop, key) => {
      data[key] = prop;
    });

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
      // success!
      .then((response) => {
        iconProcessing.style.display = 'none';
        iconSuccess.style.display = 'block';
        submitText.innerHTML = `${response.title} ${response.message}.`;
      })
      // Error!
      .catch((error) => {
        iconProcessing.style.display = 'none';
        iconError.style.display = 'block';
        submitText.innerHTML = `An error occurred: ${error.message}.`;
      });
  });
}