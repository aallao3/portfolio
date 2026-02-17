import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function AnimatedBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: true, zIndex: 0 },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Crée un lien avec la souris
        },
      },
      modes: {
        grab: {
          distance: 250,
          links: { opacity: 0.6 },
        },
      },
    },
    particles: {
      // Alternance de couleurs vives : bleu et violet
      color: { value: ["#00d2ff", "#92fe9d", "#00f2fe", "#4facfe", "#7f00ff"] },
      links: {
        color: "#4facfe",
        distance: 180, // Lignes plus longues
        enable: true,
        opacity: 0.5,
        width: 1.5, // Lignes un peu plus épaisses
      },
      move: {
        enable: true,
        speed: 2, // Légèrement plus rapide
        direction: "none",
        outModes: { default: "out" },
      },
      number: {
        density: { enable: true, area: 800 },
        value: 120, // Plus de particules
      },
      opacity: {
        value: { min: 0.4, max: 0.8 },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 4 }, // Particules de tailles variées
      },
    },
    detectRetina: true,
  }), []);

  return init ? (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
    <Particles id="tsparticles" options={options} />
  </div>
) : null;
}