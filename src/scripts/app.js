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

// Utilisation de Github Copilot pour l'implémentation de matchMedia dans la timeline (je ne connaissais pas cette manière d'écrire des conditions). La timeline en tant que telle a bien été créée par moi.

mm.add({
  isDesktop: "(min-width: 769px)",
  isMobile: "(max-width: 768px)",
}, (context) => {
  const { isDesktop, isMobile } = context.conditions;

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

  // Animation pour .nav
  tl.to(".nav", {
    rotate: 0,
    height: "auto",
    width: isDesktop ? "50%" : "100%",
    xPercent: isDesktop ? -50 : -50,
    y: isDesktop ? "2rem" : 0, 
    x: 0,
    yPercent: 0,
    top: "0",
    left: isDesktop ? "50%" : "50%",
    position: "fixed",
    background: "rgba(11, 21, 48, 0.25)",
    ease: "power2.inOut",
    duration: 1,
    border: "1px solid rgba(216, 227, 236, 0.5)",
    borderRadius: isDesktop ? "4rem" : "0 0 2rem 2rem",
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
    height: isDesktop ? "80vh" : "90dvh",
    y: "-90vh",
    ease: "power2.inOut",
    duration: 1,
    borderRadius: isDesktop ? "4rem" : "2rem 2rem 0 0",
  })
  .to(works, {
    xPercent: isMobile ? -100 * (works.length - 1) : -30 * (works.length - 1),
    // x: isDesktop ? "-25vw" : "-300vw",
    // ease: "power2.inOut",
    // duration: isDesktop ? 1 : 5,
  });

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