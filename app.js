const titreSpans = document.querySelectorAll('h1 span');
const btns = document.querySelectorAll('.btn-first');
const logo = document.querySelector('.logo');
const medias = document.querySelectorAll('.bubble');
const nav_item = document.querySelectorAll('.nav-item')
const l1 = document.querySelector('.l1');
const l2 = document.querySelector('.l2');
const item = document.querySelector('.bulle-container')
const l3 = document.querySelector('.l3')

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nav-item-1').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.body.classList.toggle('active');
    });
});


/* -------- ANIMATION 3D --------*/



function openSidebar() {
    document.getElementById('sidebar').classList.add('active');
    document.body.classList.add('active');  
}   

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.body.classList.remove('active');

} 

var sidenav = document.getElementById("Mysidebar")
var openBtn = document.getElementById("openBtn")
var closeBtn = document.getElementById("Close-Btn")

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

function openNav() {
    sidenav.classList.add("active");
}

function closeNav() {
    sidenav.classList.remove("active");
}


window.onscroll = function() {stickNav()};

var navBar = document.querySelector(".container-barre-nav");
var stickyClone = document.getElementById('stickyNav');
stickyClone.className = 'sticky';
stickyClone.style.opacity = '0';  
document.body.appendChild(stickyClone);  

function stickNav() {
    if (window.pageYOffset > 100) { 
        stickyClone.style.display = 'block';  
        setTimeout(function() {
            stickyClone.style.opacity = '1';  
        }, 20); 
    } else {
        stickyClone.style.opacity = '0';  
        setTimeout(function() {
            stickyClone.style.display = 'none';  
        });  
    }
}





window.addEventListener('load', () => {

    const TL = gsap.timeline({paused: true});

    TL
    .staggerFrom(titreSpans, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3)
    .staggerFrom(btns, 1, {opacity: 0, ease: "power2.out"}, 0.3, '-=1')
    .from(l1, 1, {width: 0, ease: "power2.out"}, '-=2')
    .from(l2, 1, {width: 0, ease: "power2.out"}, '-=2')
    .from(logo, 0.5, {transform: "scale(0)", ease: "power2.out"}, '-=2')
    .staggerFrom(medias, 1, {right: -200, opacity: 0, ease: "power2.out"}, 0.3, '-=1')
    .staggerFrom(nav_item, 1, {top: -200, opacity: 0, ease: "power2.out"}, 0,3, '-=2')
    .from(item, 1.5, {top: -200, opacity: 0, ease: "power2.out"}, 0,3)


    TL.play();
})

function submitForm() {
    // Récupérer les valeurs des champs du formulaire
    const companyName = document.getElementById('companyName').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const description = document.getElementById('description').value;

    // Vérifier que tous les champs sont remplis
    if (!companyName || !name || !email || !website || !description) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Créer un objet avec les données du formulaire
    const formData = {
        companyName: companyName,
        name: name,
        email: email,
        website: website,
        description: description
    };

    // Envoyer les données au serveur via une requête POST
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Formulaire soumis avec succès !');
        // Réinitialiser le formulaire
        document.getElementById('companyName').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('website').value = '';
        document.getElementById('description').value = '';
    })
    .catch(error => {
        console.error('Erreur lors de la soumission:', error);
        alert('Erreur lors de la soumission du formulaire. Veuillez réessayer plus tard.');
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return;
}

}

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0]);
  e.target.matches('.prev') && slider.append(items[items.ngth -1]);
}
document.addEventListener('click',activate,false);



  const bg = document.querySelector('.background-animation');

for (let i = 0; i < 25; i++) {
    const span = document.createElement('span');
    const size = Math.random() * 10 + 6;
    const duration = Math.random() * 25 + 15;
    const left = Math.random() * 100; // position horizontale
    const delay = Math.random() * 20;

    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${left}%`;
    span.style.bottom = `0px`; // démarrage depuis le bas
    span.style.animationDuration = `${duration}s`;
    span.style.animationDelay = `${delay}s`;

    bg.appendChild(span);
}

// interaction souris (inchangée)
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    bg.style.transform = `translate(${x}px, ${y}px)`;
});



// Animation d'apparition douce des champs
const formInputs = document.querySelectorAll("#contact-form .input-group");

formInputs.forEach((input, index) => {
    input.style.opacity = 0;
    input.style.transform = "translateY(15px)";
    setTimeout(() => {
        input.style.transition = "all 0.6s ease";
        input.style.opacity = 1;
        input.style.transform = "translateY(0)";
    }, 200 * index);
});

const serviceSelect = document.getElementById("service");
const formuleSelect = document.getElementById("formule");
const formuleGroup = document.getElementById("formule-group");

const formules = {
    siteweb: [
        "Service principal (One Page)",
        "Service secondaire (Multi-pages)",
        "Service secondaire complet",
        "Service professionnel"
    ],
    packaging: [
        "Starter Pack",
        "Business Pack",
        "Pro Pack"
    ],
    reseaux: [
        "Setup réseau social",
        "Contenu & gestion standard",
        "Contenu & gestion Premium"
    ]
};

serviceSelect.addEventListener("change", () => {
    const value = serviceSelect.value;

    // Réinitialiser
    formuleSelect.innerHTML = "";
    formuleSelect.disabled = true;
    formuleGroup.classList.remove("visible");

    if (value && formules[value]) {
        // Créer les options correspondantes
        formules[value].forEach(opt => {
            const option = document.createElement("option");
            option.value = opt.toLowerCase().replace(/\s+/g, "-");
            option.textContent = opt;
            formuleSelect.appendChild(option);
        });

        formuleSelect.disabled = false;
        formuleGroup.classList.add("visible");
    } else if (value === "autres") {
        const option = document.createElement("option");
        option.textContent = "Aucune formule spécifique";
        formuleSelect.appendChild(option);
        formuleSelect.disabled = false;
        formuleGroup.classList.add("visible");
    } else {
        // Si aucun service choisi
        const option = document.createElement("option");
        option.textContent = "⚠️ Veuillez d’abord choisir un service";
        formuleSelect.appendChild(option);
        formuleSelect.disabled = true;
        formuleGroup.classList.add("visible");
    }
});


const cards = document.querySelectorAll(".card");

const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);

const cardUpdate = (e, card) => {
  let pos = [e.clientX, e.clientY];
  if (e.type === "touchmove") {
    pos = [e.touches[0].clientX, e.touches[0].clientY];
  }
  const rect = card.getBoundingClientRect();
  const l = pos[0] - rect.left;
  const t = pos[1] - rect.top;
  const px = clamp((100 / rect.width) * l);
  const py = clamp((100 / rect.height) * t);

  card.style.setProperty("--pointer-x", `${px}%`);
  card.style.setProperty("--pointer-y", `${py}%`);
};

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => cardUpdate(e, card));
  card.addEventListener("touchmove", (e) => cardUpdate(e, card));
});





  