import AnimatedBackground from "./components/AnimatedBackground";
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import { useRef, useState } from 'react';
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
          Expertise <span className="text-blue-400 font-medium">Full-Stack</span>,<span className="text-blue-400 font-medium"> Base de données</span>  & <span className="text-blue-400 italic">Systèmes Réseaux</span>.
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

function Infrastructure() {
  return (
    <section className="py-24 px-8 bg-blue-600/5 relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black mb-6 italic text-white uppercase tracking-tighter">
            Expertise <br/><span className="text-blue-500 text-5xl italic">Systèmes & Réseaux</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-md">
            Maîtrise de la configuration complète sous <span className="text-white font-bold">Debian/Linux. </span> 
            Mise en place de services critiques : <span className="text-blue-400 font-mono">DHCP, DNS, SSH, NAT, VLAN</span> et routage sécurisé
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-zinc-950/80 rounded-2xl border border-blue-500/20 backdrop-blur-md relative group overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="text-blue-500 font-black text-2xl relative z-10">Debian</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 relative z-10 font-bold italic">OS de prédilection</div>
            </div>
            <div className="p-5 bg-zinc-950/80 rounded-2xl border border-white/5 backdrop-blur-md relative group overflow-hidden">
               <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="text-gray-300 font-black text-2xl relative z-10">Cisco</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 relative z-10 font-bold italic">Configuration & Switch </div>
            </div>
          </div>
        </motion.div>

        {/* Animation Réseau Interactive */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          whileInView={{ scale: 1, opacity: 1 }}
          className="relative aspect-square flex items-center justify-center rounded-3xl bg-black/40 border border-white/5"
        >
          {/* Grille de fond type Cyberpunk */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Cercles d'ondes de signal */}
             {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-blue-500/30 rounded-full"
                  initial={{ width: 100, height: 100, opacity: 0.5 }}
                  animate={{ width: 400, height: 400, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 4, delay: i * 1.2, ease: "easeOut" }}
                />
             ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Icône de transmission animée */}
            <div className="flex gap-4 mb-8">
               {[0, 1, 2].map((i) => (
                 <motion.div 
                   key={i}
                   animate={{ y: [0, -10, 0], backgroundColor: ["#1e293b", "#3b82f6", "#1e293b"] }}
                   transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                   className="w-3 h-12 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                 />
               ))}
            </div>
            
            <div className="font-mono text-[10px] text-blue-400 mb-2 tracking-[0.3em] uppercase animate-pulse">
              &lt;packet_transmission_active /&gt;
            </div>
            <h3 className="text-4xl font-black text-white tracking-widest">NETWORK</h3>
            <div className="mt-4 flex gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
               <span className="text-[9px] font-mono text-emerald-500/80">SYSTEM_ONLINE</span>
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
                href="/CV_Aymane_Allaoui.pdf" 
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
              href="/CV_Aymane_Allaoui.pdf" 
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