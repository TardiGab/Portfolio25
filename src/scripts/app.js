"use strict";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    top: "1rem", // Trouver une autre solution pour le top
    y: 0, // Avant c'était -300 mais ne fonctionne pas sur toutes les hauteurs d'écran
    position: "fixed",
    background: "rgba(11, 21, 48, 0.25)",
    ease: "power2.inOut"
  }, 0)
  .to(".nav__container", {
    opacity: 1,
    ease: "power2.inOut"
  }, 0.2);
