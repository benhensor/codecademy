
























// Footer

const year = new Date().getFullYear();
const footerContent = document.getElementById('footer-content');
const copyright = document.createElement('p');

copyright.textContent = `© Ben Hensor ${year}`;

footerContent.appendChild(copyright);