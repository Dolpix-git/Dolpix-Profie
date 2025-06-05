import './style.css'
import Experience from "./Experience/Experience.js"

const experience = new Experience(document.querySelector(".experience-canvas"))


let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY === 0) {
    navbar.style.boxShadow = 'none';
  } else {
    navbar.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.5)';
  }


  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
    navbar.style.top = `-${navbar.offsetHeight}px`;
  } else if (scrollTop === 0 || scrollTop <= navbar.offsetHeight) {
    navbar.style.top = '0';
  } else {
    navbar.style.top = '0';
  }
  lastScrollTop = scrollTop;
});

window.scrollToElement = function(id) {
  const element = document.querySelector(id);
  element.scrollIntoView({ behavior: 'smooth' });
}



const messages = [
  { text: `
  Dolpix's Website [Version 10.0.19041.746]
  (c) Dolpix Corporation. All rights reserved.
  
  C:\\Users\\Username>cd Desktop\\Website\\Assets



  Fetching Assets...`, delay: 1000 },
  { text: `
  


  C:\\Users\\Username\\Desktop\\Website\\Assets>dir
  
   Directory of C:\\Users\\Username\\Desktop\\Website\\Assets
  
  05/25/2023  09:00 AM              .
  05/25/2023  09:00 AM              ..
  05/25/2023  09:00 AM              1,024 style.css
  05/25/2023  09:00 AM              2,048 script.js
  05/25/2023  09:00 AM              1,024 index.html

              3 File(s)             4,096 bytes
  
  C:\\Users\\Username\\Desktop\\Website\\Assets>start index.html
  



  Loading website...
  



  `, delay: 2000 },
  { text: `
  C:\\Users\\Username\\Desktop\\Website\\Assets>node server.js
  
  Starting server...
  
  Connecting to database... Done
  Loading CSS... Done
  Loading JS... Done
  Compiling assets... Done
  
  GET / - 200 OK
  GET /style.css - 200 OK
  GET /script.js - 200 OK
  
  Server running at http://127.0.0.1:8080/
  
  All systems operational... Website successfully launched!
  `, delay: 100 },
];

let currentMessageIndex = 0;
let i = 0;
const charactersPerInterval = 5;

const typeWriter = () => {
  if (currentMessageIndex < messages.length) {
    let currentMessage = messages[currentMessageIndex].text;
    if (i < currentMessage.length) {
      // Check if the next character is the beginning of a HTML tag.
      if (currentMessage[i] === "<") {
        // Find where the HTML tag ends.
        const tagEndIndex = currentMessage.indexOf(">", i);

        // Write out the entire HTML tag.
        const tag = currentMessage.slice(i, tagEndIndex + 1);
        document.getElementById("code-animation").insertAdjacentHTML('beforeend', tag);

        // Skip past the HTML tag for the next iteration.
        i = tagEndIndex + 1;
      } else {
        // Otherwise, continue with the typewriter effect as normal.
        const substring = currentMessage.slice(i, i + charactersPerInterval);
        document.getElementById("code-animation").insertAdjacentHTML('beforeend', substring);
        i += charactersPerInterval;
      }

      setTimeout(typeWriter, 1);
    } else {
      i = 0;
      currentMessageIndex++;
      setTimeout(typeWriter, messages[currentMessageIndex - 1].delay);
    }
  } else {
    document.getElementById("code-animation").style.borderRight = "none";
    document.getElementById("loading-screen").style.animation = "fadeOut 1s forwards";
    setTimeout(() => {
      document.getElementById("loading-screen").remove();
    }, 1000); // The timeout duration should match the animation duration
  }
};

window.addEventListener('load', (event) => {
  typeWriter();
});



// select all the elements you want to animate
const sections = document.querySelectorAll('.new-section');

const options = {
  root: null, // relative to the viewport
  threshold: 0.1, // trigger when at least 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.style.animationPlayState = 'running';
    observer.unobserve(entry.target);
  });
}, options);

sections.forEach(section => {
  section.style.animationPlayState = 'paused';
  observer.observe(section);
});

window.addEventListener('scroll', () => {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / docHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
});
