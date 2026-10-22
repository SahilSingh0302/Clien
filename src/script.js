// EmailJS initialization – replace the placeholders with your free EmailJS account
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");   // sign‑up at emailjs.com, free tier 200 emails/mo
})();

// Simple form handler – sends via EmailJS
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();

  const templateParams = {
    name: e.target.elements.name.value,
    email: e.target.elements.email.value,
    message: e.target.elements.message.value
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Message sent! ✅');
    }, (error) => {
      console.error('FAILED...', error);
      alert('Failed to send. 😥');
    });
});