"use strict";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
  smoothTouch: 0.1,
});

// Créer une timeline principale
const mainTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=100%",
    pin: true,
    scrub: 1,
    anticipatePin: 1 
  }
});


mainTL
  .to(".hero__container", {
    width: "100%",
    height: "100vh",
    marginTop: 0,
    borderRadius: 0,
    ease: "power2.inOut"
  }, 0)
  .to(".nav", {
    rotate: 0,
    height: "auto",
    width: "50%",
    y: "2rem",
    top: "0",
    position: "fixed",
    background: "rgba(11, 21, 48, 0.25)",
    ease: "power2.inOut"
  }, 0)
  .to(".nav__container", {
    opacity: 1,
    ease: "power2.inOut"
  });
