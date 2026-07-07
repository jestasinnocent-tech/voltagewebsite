const nav = document.getElementById("nav");
const sidebar = document.getElementById("sidebar");
const menuIcon = document.querySelector(".menu-btn i");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");
const contactForm = document.querySelector("#contact form");
const formStatus = document.getElementById("formStatus");
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalIcon = document.getElementById("modalIcon");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const modalClose = document.querySelector(".modal-close");
const whatsappNumber = "255775678082";

const services = {
  web: {
    title: "Website Development",
    icon: "fa-solid fa-globe",
    description: "Professional websites for businesses, portfolios, landing pages and organizations. Includes responsive layout, clean design and basic contact setup.",
    price: "Kuanzia TSh 150,000"
  },
  accounting: {
    title: "Accounting",
    icon: "fa-solid fa-calculator",
    description: "Bookkeeping, financial records, reports and business account organization for individuals and small businesses.",
    price: "Kuanzia TSh 100,000"
  },
  tax: {
    title: "Tax Filing",
    icon: "fa-solid fa-file-invoice-dollar",
    description: "Tax return preparation, TRA related support and filing assistance for individuals and businesses.",
    price: "Kuanzia TSh 100,000"
  },
  auditing: {
    title: "Auditing",
    icon: "fa-solid fa-magnifying-glass-chart",
    description: "Review of business records, internal checks and preparation of clear audit-style reports.",
    price: "Kuanzia TSh 100,000"
  },
  excel: {
    title: "Excel Solutions",
    icon: "fa-solid fa-table",
    description: "Excel templates, formulas, dashboards, data cleaning and business sheets that make daily work easier.",
    price: "Kuanzia TSh 25,000"
  },
  cv: {
    title: "CV Writing",
    icon: "fa-solid fa-file-lines",
    description: "Modern CV writing, editing and formatting for job applications, internships and professional profiles.",
    price: "Kuanzia TSh 10,000"
  },
  typing: {
    title: "Typing",
    icon: "fa-solid fa-keyboard",
    description: "Fast and clean typing for letters, reports, assignments, forms and document formatting.",
    price: "Kuanzia TSh 1,000 kwa page"
  },
  powerpoint: {
    title: "PowerPoint",
    icon: "fa-solid fa-file-powerpoint",
    description: "Professional PowerPoint slides for business presentations, school projects, proposals and pitch decks.",
    price: "Kuanzia TSh 20,000"
  },
  design: {
    title: "Graphic Design",
    icon: "fa-solid fa-palette",
    description: "Posters, flyers, social media graphics, announcements and promotional designs for brands and events.",
    price: "Kuanzia TSh 10,000"
  },
  computer: {
    title: "Computer Services",
    icon: "fa-solid fa-laptop-code",
    description: "General computer support, software assistance, document handling, installations and basic troubleshooting.",
    price: "Kuanzia TSh 20,000"
  }
};

function toggleMenu() {
  nav.classList.toggle("open");
  sidebar.classList.toggle("open");

  const isOpen = nav.classList.contains("open");
  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
}

function closeMenu() {
  nav.classList.remove("open");
  sidebar.classList.remove("open");
  menuIcon.classList.add("fa-bars");
  menuIcon.classList.remove("fa-xmark");
}

function openService(serviceKey) {
  const service = services[serviceKey];

  if (!service) {
    return;
  }

  modalTitle.textContent = service.title;
  modalDescription.textContent = service.description;
  modalPrice.textContent = service.price;
  modalIcon.className = service.icon;

  const message = encodeURIComponent(`Habari Innovoltage, nahitaji huduma ya ${service.title}. Naomba maelezo zaidi kuhusu ${service.price}.`);
  modalWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${message}`;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeMenu();
}

function closeServiceModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    openService(button.dataset.service);
  });
});

modalClose.addEventListener("click", closeServiceModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeServiceModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeServiceModal();
  }
});

document.addEventListener("click", (event) => {
  const clickedMenu = event.target.closest(".menu-btn");
  const clickedNav = event.target.closest("#nav");
  const clickedSidebar = event.target.closest("#sidebar");
  const clickedModal = event.target.closest(".modal-content");

  if (!clickedMenu && !clickedNav && !clickedSidebar && !clickedModal) {
    closeMenu();
  }
});

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

const revealItems = document.querySelectorAll(".card, .about-wrap, form, .contact-info");

revealItems.forEach((item) => {
  item.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status show ${type}`;
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const [nameInput, emailInput] = contactForm.querySelectorAll("input:not([type='hidden'])");
  const messageInput = contactForm.querySelector("textarea");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in your name, email and message.");
    return;
  }

  const formAction = contactForm.getAttribute("action");
  const hasFormspreeEndpoint = formAction && !formAction.includes("YOUR_FORM_ID");

  if (!hasFormspreeEndpoint) {
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:jestasinnocent@gmail.com?subject=${subject}&body=${body}`;
    showFormStatus("Email app imefunguka. Bonyeza send kwenye email yako ili ujumbe utumwe.", "success");
    return;
  }

  try {
    showFormStatus("Sending your message...", "success");

    const response = await fetch(formAction, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Message failed");
    }

    contactForm.reset();
    showFormStatus("Message sent successfully. Tutakujibu hivi karibuni.", "success");
  } catch (error) {
    showFormStatus("Message haijatumwa. Tafadhali jaribu tena au tumia WhatsApp.", "error");
  }
});
