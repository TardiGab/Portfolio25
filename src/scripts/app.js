"use strict";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 2,
  effects: true,
  smoothTouch: 0.1,
});

let mm = gsap.matchMedia();

// Utilisation de Github Copilot pour l'implémentation de matchMedia dans la timeline (je ne connaissais pas les opérations ternaires). La timeline en tant que telle a bien été créée par moi.

mm.add({
  isDesktop: "(min-width: 1025px)",
  isTablet: "(min-width: 769px) and (max-width: 1024px)",
  isMobile: "(max-width: 768px)",
}, (context) => {
  const { isDesktop, isMobile, isTablet } = context.conditions;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".main",
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    }
  });

  let works = gsap.utils.toArray(".work__cards .work__card");

  tl.to(".hero__container", {
    width: "100%",
    height: "100vh",
    marginTop: 0,
    borderRadius: 0,
    ease: "power2.inOut",
    position: "fixed",
  }, 0);

  let navWidth;
  if (isDesktop) {
    navWidth = "50%";
  } else if (isTablet) {
    navWidth = "70%";
  } else {
    navWidth = "100%";
  }

  // Animation pour .nav
  tl.to(".nav", {
    rotate: 0,
    height: "auto",
    width: navWidth,
    xPercent: -50,
    y: isMobile ? 0 : "1rem",
    x: 0,
    yPercent: 0,
    top: "0",
    left: "50%",
    position: "fixed",
    background: "rgba(11, 21, 48, 0.25)",
    ease: "power2.inOut",
    duration: 1,
    border: "1px solid rgba(216, 227, 236, 0.5)",
    borderRadius: isMobile ? "0 0 2rem 2rem" : "4rem",
    borderTop: isMobile ? "none" : "1px solid rgba(216, 227, 236, 0.5)",
  }, 0);

  tl.to(".nav__container", {
    opacity: 1,
    ease: "power2.inOut",
  })
    .to(".hero__h1", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".hero__span", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, "<")
    .to(".work__container", {
      width: isDesktop ? "90vw" : "100%",
      height: isDesktop ? "85vh" : "90dvh",
      y: "-90vh",
      ease: "power2.inOut",
      duration: 1,
      borderRadius: isDesktop ? "4rem" : "2rem 2rem 0 0",
    })
    .fromTo(works, {
      display: "none",
      opacity: 0,
    }, {
      display: "flex",
      opacity: 1,
      stagger: 0.1,
      ease: "power2.inOut",
      duration: .5,
    })

  // Fonction de nettoyage : sera appelée lorsque la condition de media query ne correspond plus
  return () => {
    tl.kill();
  };
});

const burger = document.querySelector(".nav__burger");
burger.addEventListener("click", () => {
  gsap.to(".nav__mobile", {
    y: 0,
    ease: "power4.inOut",
    duration: .5,
  });
  document.body.style.overflow = "hidden";
});

const closeNav = document.querySelector(".nav__mobile-close");
closeNav.addEventListener("click", () => {
  gsap.to(".nav__mobile", {
    y: "-100%",
    ease: "power2.inOut",
    duration: .5,
  });
  document.body.style.overflow = "auto";
});

fetch("../assets/data/projects.json")
  .then(response => response.json())
  .then(data => {
    console.log("Projects loaded:", data);
    if (data && data.projects) { // Vérifiez si data.projects existe
      displayProjects(data.projects); // Passez le tableau des projets
    } else {
      console.error("Error: 'projects' array not found in data", data);
    }
  })
  .catch(error => console.error("Error loading projects:", error));

function displayProjects(projects) {
  const worksContainer = document.querySelector(".work__cards");
  worksContainer.innerHTML = ""; // Clear existing content
  projects.forEach(project => {
    const card = document.createElement("div");
    const cardTop = document.createElement("div");
    const cardBottom = document.createElement("div");
    const cardTitleContainer = document.createElement("div");
    const cardTitle = document.createElement("h3");
    const cardYear = document.createElement("span");
    const cardLinksContainer = document.createElement("div");
    const cardLink = document.createElement("a");
    const cardCaseStudy = document.createElement("a");
    const cardImage = document.createElement("img");
    card.className = "work__card";
    cardTop.className = "work__card--top";
    cardBottom.className = "work__card--bottom";
    cardTitleContainer.className = "work__card-title";
    cardTitle.className = "work__card-h3";
    cardYear.className = "work__card-year";
    cardLinksContainer.className = "work__card-links";
    cardImage.className = "work__card-img";

    cardTitle.textContent = project.name;
    cardYear.textContent = project.releaseYear;

    cardTitleContainer.appendChild(cardTitle);
    cardTitleContainer.appendChild(cardYear);
    cardBottom.appendChild(cardLinksContainer);
    card.appendChild(cardTop);
    card.appendChild(cardBottom);
    worksContainer.appendChild(card);
    cardTop.appendChild(cardImage);
    cardTop.appendChild(cardTitleContainer);
    cardImage.src = project.imageUrl;
    cardLink.href = project.siteUrl;
    cardLink.textContent = "Site en ligne";
    cardCaseStudy.href = project.caseStudyUrl;
    if (!project.caseStudyUrl) {
      cardCaseStudy.style.display = "none";
    }
    cardCaseStudy.textContent = "Case Study";
    cardLinksContainer.appendChild(cardLink);
    cardLinksContainer.appendChild(cardCaseStudy);


  })
}