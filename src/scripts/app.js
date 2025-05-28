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

// Créer une timeline principale
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".main",
    start: "top top",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false,
    scrub: 1,
    stagger: 1,
  }
});

let mm = gsap.matchMedia();

const works = gsap.utils.toArray(".work__cards .work__card");

tl.to(".hero__container", {
    width: "100%",
    height: "100vh",
    marginTop: 0,
    borderRadius: 0,
    ease: "power2.inOut",
    position: "fixed",
  }, 0)
  .to(".nav", {
    rotate: 0,
    height: "auto",
    width: "50%",
    y: "1rem",
    top: "0",
    position: "fixed",
    background: "rgba(11, 21, 48, 0.25)",
    ease: "power2.inOut",
    duration: 1, 
    border: "1px solid rgba(216, 227, 236, 0.5)",
    borderRadius: "4rem",
    onComplete: () => {
      mm.add("(max-width: 768px)", () => {
        gsap.to(".nav", {
          width: "100%",
          borderRadius: "0",
        })
      })
    },
  }, 0)
  .to(".nav__container", {
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
    width: "90vw",
    height: "82vh",
    y: "-92vh",
    ease: "power2.inOut",
    duration: 1,
  })
  .to(".work__cards", {
    x: "-25vw", // Changer la valeur pour ajuster l'intensité du mouvement
    ease: "power2.inOut",
    duration: 2,
  })

const burger = document.querySelector(".nav__burger");

burger.addEventListener("click", () => {
  gsap.to(".nav__mobile", {
    y: 0,
    ease: "power2.inOut",
    duration: 0.5,
  })
});