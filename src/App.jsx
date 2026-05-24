import AnimatedBackground from "./components/AnimatedBackground";
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

function Navbar() {
  const navLinks = [
    { name: "Accueil", id: "accueil" },
    { name: "Curriculum Vitae", id: "cv" }, 
    { name: "Projets", id: "projets" },
    { name: "Reseaux", id: "reseaux" },
    { name: "Compétences", id: "compétences" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-xl z-50 border-b border-white/5"
    >
      <h1 className="text-white font-black text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        AA
      </h1>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <a 
            key={link.id} 
            href={`#${link.id}`} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

function Hero() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
        delayChildren: 0.5,   
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Halo de fond qui apparaît aussi en douceur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 px-4"
      >
        {/* 1. Le Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 text-[10px] font-black tracking-[0.3em] uppercase text-blue-400 border border-blue-400/20 rounded-full bg-blue-950/20 mb-10 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Disponible pour Alternance 2026-2027
        </motion.div>
        
        {/* 2. Le Nom */}
        <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9]">
          <span className="block text-white italic">AYMANE</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-white">
            ALLAOUI
          </span>
        </motion.h1>

        {/* 3. Le Texte descriptif */}
        <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Étudiant en <span className="text-white font-medium border-b-2 border-blue-500/30">BUT Informatique</span> à l'IUT d'Orsay.<br/>
          Expertise <span className="text-blue-400 font-medium">Full-Stack</span>,<span className="text-blue-400 font-medium"> Systèmes Réseaux</span>  & <span className="text-blue-400 italic">Base de données</span>.
        </motion.p>

        {/* 4. Les Boutons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#projets" className="px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-transform shadow-xl">
            Explorer mes travaux
          </a>
          <a href="#contact" className="px-10 py-5 border border-white/10 bg-white/5 backdrop-blur-md text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all">
            Me contacter
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Application de Gestion de Stock",
      client: "Projet Technique",
      description: "Système centralisé de suivi des stocks avec contrôle d'accès et traçabilité des flux.",
      details: "Conception et développement en autonomie complète d'une application découplée pour numériser la gestion empirique du matériel. Modélisation d'une base de données relationnelle SQLite articulée autour des produits, des emplacements physiques (box, cave) et de l'historique complet des mouvements. Backend robuste exposant des API REST sécurisées avec contrôles de cohérence côté serveur — toute sortie ou transfert dépassant le stock disponible est automatiquement refusé. Frontend React modulaire avec design system dark/light mode, graphiques Recharts, recherche globale partagée via Context API et notifications temps réel.",
      tech: ["Python", "Django REST Framework", "SQLite", "React.js", "Vite", "Recharts", "Axios"],
      images: [
        "/img/Gestion 1.png", 
        "/img/Gestion 2.png",
        "/img/Gestion 3.png",
        "/img/Gestion 4.png",
        "/img/Gestion 5.png"
      ] 
    },
    {
      title: "Application Médicale Intelligente",
      client: "Cabinet Médical",
      description: "Optimisation de l'accueil patient avec système d'appel automatique.",
      details: "Développement d'une solution full-stack incluant une interface d'affichage dynamique pour la salle d'attente. Comme en milieu hospitalier, le système gère l'appel des patients via un écran dédié, accompagné d'un signal sonore et d'une animation visuelle pour orienter le patient vers le bon box de consultation. Côté praticien, une interface intuitive permet de gérer la file d'attente en temps réel.",
      tech: ["Django", "Python", "React", "MySQL", "Django REST Framework"],
      images: [
        "/img/Connexion liste.png",
        "/img/ajout_patient.png",
        "/img/enregistrement_patient.png",
        "/img/liste_patient.png"
      ]
    },
    {
      title: "Système de Suivi Orthodontique",
      client: "Cabinet d'orthodontie",
      description: "Numérisation complète de dossiers patients : fiches, paiements et photos cliniques.",
      details: "Développement d'une application web responsive permettant la numérisation, la centralisation et la gestion complète des dossiers patients au sein d’un cabinet médical. Mise en place d’une interface utilisateur intuitive facilitant l’accès aux informations médicales, aux rendez-vous, aux paiements et aux documents associés. Conception d’une architecture robuste assurant la fiabilité et la cohérence des données, optimisant le suivi des patients et permettant le remplacement total des fiches papier par une solution numérique performante, sécurisée et évolutive",
      tech: ["PHP", "JavaScript", "AJAX", "MySQL"],
      images: ["/img/dentalcare_login.png",
        "/img/dentalcare_dashboard.png",
        "/img/dentalcare_formulaire.png",
        "/img/dentalcare_liste_patient.png",
        "/img/dentalcare_detail1.png",
        "/img/dentalcare_detail2.png",
        "/img/dentalcare_detail3.png",
        "/img/dentalcare_rdv1.png",
        "/img/dentalcare_rdv2.png"
      ] 
    },
    {
      title: "Plateforme Démocratie Participative",
      client: "Projet Universitaire",
      description: "Architecture REST complète avec interface utilisateur moderne et modulaire.",
      details: "Conception et développement d'une application web full-stack reposant sur une architecture REST moderne, permettant une communication fluide entre le frontend et le backend. Implémentation d’API REST pour la gestion, la récupération et la mise à jour des données, avec manipulation et échange des informations au format JSON afin d’assurer une interactivité dynamique et performante. Mise en place d’une architecture modulaire facilitant la maintenabilité, l’évolutivité et l’intégration de nouvelles fonctionnalités, tout en garantissant une expérience utilisateur fluide et réactive.",
      tech: ["Java", "Spring", "JSON", "Architecture REST"],
      images: ["/img/demo1.png",
        "/img/demo2.png"
      ] 
    },
    {
      title: "Développeur logiciel / jeu vidéo",
      client: "Projet Académique",
      description: "Développement d’un jeu vidéo éducatif sur le thème des mathématiques.",
      details: "Travail sur la logique de jeu, l'interface utilisateur et l'interactivité pour créer une expérience d'apprentissage ludique.",
      tech: ["Unity", "Godot", "C#", "Java"],
      images: ["/img/godot1.png",
        "/img/godot2.png",
        "/img/godot3.png"
      ] 
    },
    {
      title: "Administrateur systèmes & réseaux",
      client: "Projet Académique – Debian/Linux",
      description: "Configuration complète de réseaux informatiques sous Linux.",
      details: "Mise en place de services critiques (DHCP, DNS, SSH, NAT, VLAN). Gestion de la sécurité, du routage et de l'interconnexion des réseaux.",
      tech: ["DHCP", "DNS", "SSH", "NAT", "VLAN"],
      images: ["/img/marionnet-screen.png"]
    }
  ];

  return (
    <section id="projets" className="py-24 px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl md:text-5xl font-black mb-16 text-center text-white"
      >
        Réalisations <span className="text-blue-500">Majeures</span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedProject(p)}
            className="group cursor-pointer p-8 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
          >
            <span className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">{p.client}</span>
            <h3 className="text-2xl font-bold mt-2 mb-4 text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.slice(0, 3).map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-gray-300 uppercase">{t}</span>
              ))}
              {p.tech.length > 3 && <span className="text-[10px] text-gray-500">+{p.tech.length - 3}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Récapitulatif */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white hover:text-black text-white rounded-full transition-all"
              >
                ✕
              </button>

              {/* Partie Gauche : Galerie */}
              <div className="w-full md:w-3/5 bg-black p-6 overflow-y-auto space-y-6">
                {selectedProject.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt="Capture" 
                    className="w-full rounded-xl border border-white/5 shadow-2xl"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/800x450/111/333?text=Image+en+attente"; }}
                  />
                ))}
              </div>

              {/* Partie Droite : Descriptif */}
              <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto">
                <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">{selectedProject.client}</span>
                <h2 className="text-3xl font-black text-white mt-2 mb-6">{selectedProject.title}</h2>
                <p className="text-gray-300 leading-relaxed mb-8 italic">"{selectedProject.details}"</p>
                
                <h4 className="text-white text-xs font-bold uppercase mb-4 tracking-widest">Technologies utilisées</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
function LowLevelArchitecture() {
  return (
    <section id="architecture" className="py-24 px-8 bg-zinc-950/50 relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Architecture <span className="text-blue-500">Bas Niveau</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.3em]">
            Programmation Assembleur & Microarchitecture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visualisation de la stack/registres */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-black/80 border border-blue-500/20 p-8 rounded-3xl font-mono relative group"
          >
            <div className="absolute top-4 right-6 text-[10px] text-blue-500/50">CPU_SIMULATOR_X86_64</div>
            
            <div className="space-y-4">
              {/* Registres */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 p-2 rounded border border-white/10">
                  <span className="text-blue-400 text-[10px]">RAX:</span> <span className="text-white text-xs">0x00000042</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/10">
                  <span className="text-blue-400 text-[10px]">RIP:</span> <span className="text-white text-xs">0x40102A</span>
                </div>
              </div>

              {/* Code ASM */}
              <div className="mt-6 p-4 bg-zinc-900 rounded-xl border border-white/5 text-[13px]">
                <div className="text-gray-500 text-[11px] mb-2">; Instruction Flow</div>
                <div className="flex gap-4">
                  <span className="text-gray-600 italic">401020:</span>
                  <span className="text-emerald-400">mov</span>
                  <span className="text-white">rax, 60</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600 italic">401027:</span>
                  <span className="text-emerald-400">cmp</span>
                  <span className="text-white">rbx, rcx</span>
                </div>
                <div className="flex gap-4 bg-blue-500/10 border-l-2 border-blue-500 pl-2">
                  <span className="text-gray-400 italic">40102A:</span>
                  <span className="text-blue-400">jne</span>
                  <span className="text-white">_handle_error</span>
                </div>
                <div className="flex gap-4 opacity-50">
                  <span className="text-gray-600 italic">40102F:</span>
                  <span className="text-emerald-400">syscall</span>
                </div>
              </div>

              {/* Illustration Jump */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
                <div className="text-[10px] text-blue-400 uppercase font-black italic">Conditional Jump Triggered</div>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
              </div>
            </div>
          </motion.div>

          {/* Texte descriptif */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs">01</span>
                Maîtrise de l'Assembleur (ASM)
              </h3>
              <p className="text-gray-400 leading-relaxed pl-11">
                Étude approfondie des jeux d'instructions x86 et ARM. Capacité à comprendre la manipulation directe des <strong className="text-white">registres</strong>, la gestion de la <strong className="text-white">pile (stack)</strong> et l'optimisation des sauts conditionnels (JMP, JNE, JE).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs">02</span>
                Fonctionnement du Processeur
              </h3>
              <p className="text-gray-400 leading-relaxed pl-11">
                Compréhension du cycle <strong className="text-white">Fetch-Decode-Execute</strong>. Analyse des schémas de processeurs, incluant l'Unité Arithmétique et Logique (ALU), les bus de données et le séquençage des instructions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pl-11 pt-4">
              {["x86-64", "ARM", "GPR Registers", "Branch Prediction", "Stack Frames", "OpCodes"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-500 uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Infrastructure() {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const scenario = [
    // --- 1. DIAGNOSTIC (Le réseau est coupé) ---
    { text: "aymane@debian:~$ ping 8.8.8.8 -c 2", delay: 2000 },
    { text: "PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.", delay: 800 },
    { text: "From 192.168.1.1 icmp_seq=1 Destination Net Unreachable", delay: 1200 },
    { text: "From 192.168.1.1 icmp_seq=2 Destination Net Unreachable", delay: 1500 },
    { text: "aymane@debian:~$ ip link show", delay: 1800 },
    { text: "2: eth0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN", delay: 1000 },

    // --- 2. RÉPARATION COUCHE 2 (VLAN & Bridge) ---
    { text: "aymane@debian:~$ sudo ip link set eth0 up", delay: 1500 },
    { text: "aymane@debian:~$ sudo vconfig add eth0 10", delay: 2000 },
    { text: "[ OK ] VLAN 10 (PROD) created and UP.", delay: 1000 },
    { text: "aymane@debian:~$ brctl addbr br0 && brctl addif br0 eth0.10", delay: 2000 },
    { text: "[ INFO ] Bridge br0 linked to VLAN 10 (Layer 2 Isolation)", delay: 1200 },

    // --- 3. CONFIGURATION COUCHE 3 (IP & Gateway) ---
    { text: "aymane@debian:~$ ip addr add 192.168.10.1/24 dev br0", delay: 1800 },
    { text: "aymane@debian:~$ ip route add default via 192.168.10.254", delay: 2000 },
    { text: "[ SYS ] Default gateway set to 192.168.10.254 (Static Routing)", delay: 1200 },

    // --- 4. SERVICES (DHCP, DNS & SSH) ---
    { text: "aymane@debian:~$ systemctl restart isc-dhcp-server", delay: 1500 },
    { text: "aymane@debian:~$ named-checkconf /etc/bind/named.conf.local", delay: 1800 },
    { text: "[ OK ] DNS Zone 'infra.local' valid (UDP/53).", delay: 1000 },
    { text: "aymane@debian:~$ ssh-keygen -t ed25519 -C 'admin_key'", delay: 2200 },
    { text: "aymane@debian:~$ sudo ufw allow 22/tcp && sudo ufw allow 53/udp", delay: 2000 },
    { text: "[ FW ] Firewall: SSH (TCP) and DNS (UDP) OPEN.", delay: 1200 },

    // --- 5. VÉRIFICATION FINALE (Ça marche !) ---
    { text: "aymane@debian:~$ ping 8.8.8.8 -c 2", delay: 2000 },
    { text: "64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=14.2 ms", delay: 800 },
    { text: "64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=13.5 ms", delay: 2000 },
    
    { text: "aymane@debian:~$ clear", delay: 3000 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentLine = scenario[currentStep];

      if (currentLine.text.includes("clear")) {
        setTerminalHistory([]);
      } else {
        setTerminalHistory((prev) => [...prev, currentLine]);
      }

      setCurrentStep((prev) => (prev + 1) % scenario.length);
    }, scenario[currentStep].delay);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <section id="reseaux" className="py-24 px-8 bg-black relative overflow-hidden border-y border-white/5">
      {/* Effet de scanline (fond d'écran technique) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Texte de gauche */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
  <div className="inline-block px-3 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono mb-4 rounded-full">
    STATUS: INFRA_OPERATIONAL
  </div>
  
  <h2 className="text-5xl font-black mb-6 italic text-white uppercase tracking-tighter leading-none">
    Expertise <br/>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">
      Systèmes & Réseaux
    </span>
  </h2>

  <div className="space-y-6 text-gray-400 text-[14px] leading-relaxed max-w-xl">
    <p>
      Administration réseau sous <strong className="text-white font-bold">Debian</strong>, avec une bonne compréhension du cheminement d’un paquet réseau, depuis son arrivée sur une interface jusqu’à son routage, son filtrage ou sa traduction d’adresse.
    </p>

    <div className="grid grid-cols-1 gap-6 mt-8">
      {/* Routage */}
      <div className="group">
        <h3 className="text-white font-bold flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Routage statique & passerelles
        </h3>
        <p className="pl-4 border-l border-white/10">
          Configuration de l’adressage IPv4, des passerelles par défaut et des routes statiques afin d’assurer la communication entre plusieurs sous-réseaux. Analyse des tables de routage et vérification de la connectivité entre machines à l’aide d’outils comme <strong className="text-white font-bold">ping</strong>, <strong className="text-white font-bold">ip route</strong>, <strong className="text-white font-bold">links</strong> ou <strong className="text-white font-bold">dig</strong>.
        </p>
      </div>

      {/* Filtrage */}
      <div className="group">
        <h3 className="text-white font-bold flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Filtrage de paquets avec Netfilter / iptables
        </h3>
        <p className="pl-4 border-l border-white/10">
          Mise en place de règles de pare-feu avec <strong className="text-white font-bold">iptables</strong> sur les chaînes INPUT, OUTPUT et FORWARD. Configuration de politiques par défaut, autorisation ou blocage de flux TCP, UDP et ICMP, gestion des connexions ESTABLISHED/RELATED, distinction entre <strong className="text-white font-bold">DROP</strong> et <strong className="text-white font-bold">REJECT</strong>, et journalisation des paquets avec LOG et limit.
        </p>
      </div>

      {/* NAT */}
      <div className="group">
        <h3 className="text-white font-bold flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Translation d’adresses : NAT, SNAT, DNAT et Masquerading
        </h3>
        <p className="pl-4 border-l border-white/10">
          Configuration de la table nat avec les chaînes POSTROUTING et PREROUTING. Mise en place de <strong className="text-white font-bold">MASQUERADE</strong> pour masquer les adresses d’un réseau interne, de <strong className="text-white font-bold">SNAT</strong> pour imposer une adresse source précise, et de <strong className="text-white font-bold">DNAT</strong> pour rediriger des connexions vers une machine ou un port interne. Tests réalisés avec tcpdump et netcat.
        </p>
      </div>

      {/* Commutation */}
      <div className="group">
        <h3 className="text-white font-bold flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Commutation virtuelle : bridges Linux
        </h3>
        <p className="pl-4 border-l border-white/10">
          Création de ponts réseau Linux avec <strong className="text-white font-bold">brctl</strong> afin de relier plusieurs interfaces au niveau couche 2. Configuration d’une interface bridge br0, ajout d’interfaces physiques, activation du pont, attribution d’une adresse IP au bridge et vérification de la connectivité entre machines. Utilisation d’<strong className="text-white font-bold">ebtables</strong> pour filtrer le trafic au niveau Ethernet selon les adresses MAC.
        </p>
      </div>

      {/* Services */}
      <div className="group">
        <h3 className="text-white font-bold flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Services réseau : DNS et HTTP
        </h3>
        <p className="pl-4 border-l border-white/10">
          Tests de résolution DNS avec <strong className="text-white font-bold">dig</strong>, interrogation de serveurs DNS cache sur le port UDP 53, vérification de services HTTP avec <strong className="text-white font-bold">links</strong>, manipulation de ports web standards et alternatifs comme 80, 8080 et 8118. Mise en place d’un proxy HTTP avec <strong className="text-white font-bold">Privoxy</strong> dans un contexte de proxy transparent.
        </p>
      </div>
    </div>
  </div>
  
  {/* Badges / Grille du bas */}
  <div className="flex flex-wrap gap-2 mt-10 mb-8">
    {["iptables", "NAT/SNAT/DNAT", "Linux Bridges", "ebtables", "DNS (dig)", "TCPDump"].map((tool) => (
      <span key={tool} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-mono text-gray-300">
        {tool}
      </span>
    ))}
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="p-5 bg-zinc-900/50 rounded-2xl border border-blue-500/40 backdrop-blur-md relative overflow-hidden group">
      <div className="text-blue-500 font-black text-2xl italic">Debian</div>
      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold italic">Systèmes & Administration</div>
    </div>
    
    <div className="p-5 bg-zinc-900/50 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden group">
      <div className="text-gray-300 font-black text-2xl italic text-white">Netfilter</div>
      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold italic">Réseaux & Sécurité</div>
    </div>
  </div>
</motion.div>

        {/* Terminal Réaliste */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          whileInView={{ scale: 1, opacity: 1 }}
          className="relative aspect-video flex flex-col rounded-xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden font-mono"
        >
          {/* Header du Terminal */}
          <div className="bg-zinc-900 px-4 py-2 flex gap-2 items-center border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="text-[10px] text-gray-500 ml-2 italic">root@aymane-infra:~</span>
          </div>

          {/* Corps du Terminal */}
          <div className="p-6 text-[12px] sm:text-[13px] h-full flex flex-col justify-start gap-1 overflow-y-auto">
            {terminalHistory.map((line, index) => (
              <div 
                key={index}
                className={`whitespace-pre-wrap ${
                  line.text.includes('[ OK ]') ? "text-emerald-400" : 
                  line.text.includes('[') ? "text-blue-400" : "text-gray-300"
                }`}
              >
                {line.text}
              </div>
            ))}
            
            {/* Ligne active avec curseur */}
            <div className="text-emerald-500 whitespace-pre-wrap">
              {scenario[currentStep].text.includes("clear") ? "" : scenario[currentStep].text}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-white ml-1 translate-y-1" 
              />
            </div>

            <div className="mt-auto opacity-30 text-[10px] text-gray-500 border-t border-white/5 pt-4">
              [SYS_LOG] NETWORK_STACK: MONITORING...
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const categories = [
    { 
      name: "Backend", 
      skills: ["Python (FastAPI, Django)", "PHP (Laravel)", "Java", "C#", "Node.js"], 
      color: "text-blue-400" 
    },
    { 
      name: "Frontend", 
      skills: ["React.js", "Angular", "JavaScript", "HTML5/CSS3", "AJAX"], 
      color: "text-emerald-400" 
    },
    { 
      name: "Données", 
      skills: ["MySQL", "Oracle", "SQL", "PL/SQL", "SPARQL"], 
      color: "text-amber-400" 
    },
    { 
      name: "Outils & Sys", 
      skills: ["Linux/UNIX", "Git/Github", "Administration Réseaux", "Docker"], 
      color: "text-purple-400" 
    }
  ];

  return (
    <section id="compétences" className="py-24 px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-white">
        Stack <span className="text-gray-500">Technique</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}
            className="p-8 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-sm transition-all duration-300"
          >
            <h3 className={`font-bold mb-6 flex items-center gap-2 ${cat.color}`}>
              <div className="w-2 h-2 rounded-full bg-current" />
              {cat.name}
            </h3>
            <ul className="space-y-3">
              {cat.skills.map(s => (
                <li key={s} className="text-gray-400 text-sm font-light hover:text-white transition-colors cursor-default italic">
                  • {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CVPreview() {
  return (
    <section id="cv" className="py-24 px-8 bg-zinc-950 relative overflow-hidden">
      {/* Effet de lumière en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Partie Visuelle : L'aperçu du CV */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer w-full md:w-1/2"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            <img 
              src="/img/preview_cv.png" 
              alt="Aperçu du CV" 
              className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity"
            />
            {/* Overlay au survol */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <a 
                href="/CV_Aymane_Allaoui_Cyber.pdf" 
                download 
                className="p-4 bg-white text-black rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
               </a>
            </div>
          </div>
        </motion.div>

        {/* Partie Texte & Bouton */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter italic">
            Prêt à collaborer ?
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Mon parcours académique à l'IUT d'Orsay et mes expériences en <span className="text-white font-bold">Developpement, Base de données et systèmes & réseaux</span> m'ont permis d'acquérir une solide base technique. Téléchargez mon CV complet pour découvrir le détail de mes compétences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="/CV_Aymane_Allaoui_Cyber.pdf" 
              download 
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              <span>Télécharger le PDF</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); 

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    
    const SERVICE_ID = "service_g714cio";
    const TEMPLATE_ID = "template_ho9njel";
    const PUBLIC_KEY = "woYUxsXrl-WWzulhq";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          form.current.reset();
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      })
      .finally(() => {
          setIsSending(false);
          
          setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <section id="contact" className="py-24 px-8 relative overflow-hidden bg-black">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic">
              Envie de me <br/> <span className="text-blue-500">Contacter ?</span>
            </h2>
            <p className="text-gray-400 text-xl font-light leading-relaxed mb-10">
              Je suis actuellement à la recherche d'une alternance (2026-2027). 
              Que ce soit pour discuter d'une opportunité ou simplement en apprendre plus sur moi, ma boîte mail est ouverte.
            </p>

            <div className="space-y-6">
              <a href="mailto:aymane.wood@outlook.fr" className="flex items-center gap-4 text-white hover:text-blue-400 transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 bg-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <span className="font-mono text-sm tracking-widest">aymane.wood@outlook.fr</span>
              </a>
              
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/aymane-allaoui-98571a348" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                  LinkedIn
                </a>
                <a href="https://github.com/aallao3" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulaire Correctement Connecté */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold ml-1">Nom</label>
                  <input 
                    name="user_name"
                    required
                    type="text" 
                    placeholder="Votre nom" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold ml-1">Email</label>
                  <input 
                    name="user_email" 
                    required
                    type="email" 
                    placeholder="votre@email.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold ml-1">Message</label>
                <textarea 
                  name="message" 
                  required
                  rows="4" 
                  placeholder="Votre projet d'alternance..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSending}
                className={`w-full py-5 font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-lg active:scale-95 ${isSending ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'}`}
              >
                {isSending ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {/* Feedback visuel */}
              {status === 'success' && (
                <p className="text-emerald-400 text-center text-xs font-bold uppercase animate-pulse">Message envoyé avec succès !</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center text-xs font-bold uppercase">Erreur lors de l'envoi. Réessayez.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    
    <div className="relative text-white font-sans bg-transparent">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10"> {/* Le contenu passe devant avec z-10 */}
        <Hero />
        <CVPreview/>
        <Projects />
        <Infrastructure />
        <LowLevelArchitecture />
        <Skills />
        <Contact />
      </main>
      <footer className="py-8 text-center text-gray-600 text-xs tracking-widest uppercase">
        © 2026 Aymane Allaoui — IUT d'Orsay
      </footer>
    </div>
  );
}

export default App;