// function for dynamically displaying auto write text  
consoleText(['Full Stack Developer.', 'Data Analyst.', 'UI/UX Designer.'], 'text',['rgb(1, 214, 214)','rgb(9, 247, 247)','rgb(1, 214, 214)']);

function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true; 
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function() {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function() {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0])
            letterCount += x;
            waiting = false;
        }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
    }, 1000)
    } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
    }
    }, 120)
}

// function for sticky navbar  
const nav = document.querySelector(".main-header");
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
    nav.classList.add("nav--hidden");
    }else{
    nav.classList.remove("nav--hidden");
    }
    lastScrollY = window.scrollY;
})

// function to handle responsive menu 
let icon = document.querySelector('.menu-icon');
icon.addEventListener("click", myMenu);
function myMenu() {
    let menu = document.querySelector('#menu');
    if (menu.className === "menu-list") {
        menu.className += " responsive"
    }else{
        menu.className = "menu-list"
    }
}

// function for active class 
const navItems = document.querySelectorAll('.menu-link');
navItems[0].classList.add('active');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    removeActiveClass();
    item.classList.add('active');
  });
});

function removeActiveClass() {
  navItems.forEach(item => {
    item.classList.remove('active');
  });
}


// This function handled lazy loading in the page
// Every Image will remain hidden untill scroll to view
const images = document.querySelectorAll("[data-src]");
function preloadImage(img) {
    const src = img.getAttribute("data-src");
        if(!src) {
            return;
        }
         img.src = src;
    }

    const imageOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -150px 0px"
    }

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                return
            }else{
                preloadImage(entry.target);
                imgObserver.unobserve(entry.target);
            }
        });
    }, imageOptions);

    images.forEach(image => {
    imgObserver.observe(image)
});
