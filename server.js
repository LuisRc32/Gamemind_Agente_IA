/**
 * GameMind — Backend API
 * Node.js + Express
 * Ejecutar: npm install && node server.js
 */

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../'))); // sirve index.html

// ═══════════════════════════════════════════════
//  BASE DE DATOS — 52 videojuegos
// ═══════════════════════════════════════════════
const GAMES_DB = [
  { id:1,  name:"The Legend of Zelda: Breath of the Wild", icon:"🗡️", genre:"aventura",  trama:"mundo_abierto",   combate:"accion",     visual:"lowpoly",       duracion:"largo",  tags:["Mundo abierto","Exploración","Acción","Nintendo"], pop:98 },
  { id:2,  name:"Hollow Knight",      icon:"🦋", genre:"aventura",  trama:"lineal",        combate:"accion",     visual:"anime",         duracion:"medio",  tags:["Metroidvania","Plataformas","Indie","Difícil"], pop:94 },
  { id:3,  name:"A Short Hike",       icon:"🏔️", genre:"aventura",  trama:"narrativa_ligera", combate:"sin_combate", visual:"lowpoly",  duracion:"corto",  tags:["Relajante","Exploración","Casual","Indie"], pop:86 },
  { id:4,  name:"Outer Wilds",        icon:"🌌", genre:"aventura",  trama:"lineal",        combate:"sin_combate", visual:"realista",      duracion:"medio",  tags:["Misterio","Exploración espacial","Narrativa"], pop:92 },
  { id:5,  name:"Subnautica",         icon:"🌊", genre:"aventura",  trama:"lineal",        combate:"accion",     visual:"realista",       duracion:"medio",  tags:["Supervivencia","Exploración","Crafting","Terror"], pop:91 },
  { id:6,  name:"Journey",            icon:"✨", genre:"aventura",  trama:"lineal",        combate:"sin_combate", visual:"lowpoly",       duracion:"corto",  tags:["Artístico","Meditativo","Online","Belleza"], pop:90 },
  { id:7,  name:"Ori and the Blind Forest", icon:"🌸", genre:"aventura", trama:"lineal",  combate:"accion",     visual:"anime",          duracion:"corto",  tags:["Plataformas","Emotivo","Arte","Música"], pop:89 },
  { id:8,  name:"Gris",               icon:"🎨", genre:"aventura",  trama:"lineal",        combate:"sin_combate", visual:"anime",         duracion:"corto",  tags:["Arte","Emotivo","Sin combate","Indie"], pop:87 },
  { id:9,  name:"Control",            icon:"🔮", genre:"aventura",  trama:"lineal",        combate:"accion",     visual:"realista",       duracion:"medio",  tags:["Sobrenatural","Acción","Narrativa","Atmosférico"], pop:88 },
  { id:10, name:"Disco Elysium",      icon:"🕵️", genre:"aventura",  trama:"ramificada",    combate:"sin_combate", visual:"realista",      duracion:"largo",  tags:["RPG texto","Detective","Político","Único"], pop:93 },
  { id:11, name:"The Witcher 3",      icon:"🐺", genre:"rpg",       trama:"mundo_abierto", combate:"accion",     visual:"realista",       duracion:"largo",  tags:["Mundo abierto","Historia épica","Madurez"], pop:99 },
  { id:12, name:"Persona 5 Royal",    icon:"🃏", genre:"rpg",       trama:"lineal",        combate:"por_turnos", visual:"anime",          duracion:"largo",  tags:["JRPG","Estilo","Social sim","Turnos"], pop:97 },
  { id:13, name:"Dark Souls III",     icon:"🔥", genre:"rpg",       trama:"lineal",        combate:"accion",     visual:"realista",       duracion:"medio",  tags:["Difícil","Atmosférico","Lore profundo","FromSoftware"], pop:96 },
  { id:14, name:"Baldur's Gate 3",    icon:"🎭", genre:"rpg",       trama:"ramificada",    combate:"por_turnos", visual:"fotorrealista",  duracion:"largo",  tags:["D&D","Elecciones","Co-op","Épico"], pop:99 },
  { id:15, name:"Final Fantasy XVI",  icon:"⚡", genre:"rpg",       trama:"lineal",        combate:"accion",     visual:"fotorrealista",  duracion:"largo",  tags:["JRPG","Acción","Épico","Cinematográfico"], pop:88 },
  { id:16, name:"Elden Ring",         icon:"👑", genre:"rpg",       trama:"mundo_abierto", combate:"accion",     visual:"realista",       duracion:"largo",  tags:["Mundo abierto","Difícil","Soulslike","FromSoftware"], pop:98 },
  { id:17, name:"Dragon Age: Origins",icon:"🐉", genre:"rpg",       trama:"ramificada",    combate:"tactico",    visual:"realista",       duracion:"largo",  tags:["Decisiones","Compañeros","Épico","Fantasy"], pop:90 },
  { id:18, name:"Chrono Trigger",     icon:"⏳", genre:"rpg",       trama:"lineal",        combate:"por_turnos", visual:"anime",          duracion:"medio",  tags:["Clásico","JRPG","Viaje temporal","Épico"], pop:97 },
  { id:19, name:"Xenoblade Chronicles 3", icon:"🌅", genre:"rpg",  trama:"lineal",        combate:"tactico",    visual:"anime",          duracion:"largo",  tags:["JRPG","Historia profunda","Arte","Música"], pop:91 },
  { id:20, name:"Mass Effect 2",      icon:"🚀", genre:"rpg",       trama:"ramificada",    combate:"tactico",    visual:"realista",       duracion:"largo",  tags:["Sci-fi","Decisiones","Personajes","Épico"], pop:95 },
  { id:21, name:"Street Fighter 6",   icon:"🥊", genre:"pelea",     trama:"narrativa_ligera", combate:"accion", visual:"anime",          duracion:"largo",  tags:["Fighting","Competitivo","Online","Clásico"], pop:92 },
  { id:22, name:"Tekken 8",           icon:"👊", genre:"pelea",     trama:"lineal",        combate:"accion",     visual:"fotorrealista",  duracion:"medio",  tags:["3D Fighting","Historia","Online","Técnico"], pop:91 },
  { id:23, name:"Mortal Kombat 1",    icon:"💀", genre:"pelea",     trama:"lineal",        combate:"accion",     visual:"fotorrealista",  duracion:"medio",  tags:["Gore","Historia","Brutalidades","Competitivo"], pop:87 },
  { id:24, name:"Guilty Gear Strive", icon:"🎸", genre:"pelea",     trama:"lineal",        combate:"accion",     visual:"anime",          duracion:"medio",  tags:["Anime","Rock","Arte visual","Técnico"], pop:89 },
  { id:25, name:"Smash Bros Ultimate",icon:"🌟", genre:"pelea",     trama:"narrativa_ligera", combate:"accion", visual:"anime",          duracion:"largo",  tags:["Party","Nintendo","Variedad","Casual/Hardcore"], pop:96 },
  { id:26, name:"Civilization VI",    icon:"🏛️", genre:"estrategia",trama:"narrativa_ligera", combate:"por_turnos", visual:"lowpoly",    duracion:"largo",  tags:["4X","Historia","Construcción","Turno"], pop:93 },
  { id:27, name:"XCOM 2",             icon:"👽", genre:"estrategia",trama:"lineal",        combate:"por_turnos", visual:"realista",       duracion:"largo",  tags:["Tactical","Permadeath","Sci-fi","Difícil"], pop:91 },
  { id:28, name:"Into the Breach",    icon:"🤖", genre:"estrategia",trama:"narrativa_ligera", combate:"por_turnos", visual:"lowpoly",    duracion:"medio",  tags:["Puzzle","Mechs","Indie","Roguelite"], pop:88 },
  { id:29, name:"Starcraft II",       icon:"🛸", genre:"estrategia",trama:"lineal",        combate:"tactico",    visual:"realista",       duracion:"largo",  tags:["RTS","Competitivo","Sci-fi","Velocidad"], pop:94 },
  { id:30, name:"Fire Emblem: Three Houses", icon:"🏰", genre:"estrategia", trama:"ramificada", combate:"por_turnos", visual:"anime",    duracion:"largo",  tags:["JRPG táctico","Historia","Personajes","Decisiones"], pop:92 },
  { id:31, name:"Hades",              icon:"🌊", genre:"estrategia",trama:"ramificada",    combate:"accion",     visual:"anime",          duracion:"medio",  tags:["Roguelite","Mitología","Hack n Slash","Indie"], pop:97 },
  { id:32, name:"Stardew Valley",     icon:"🌾", genre:"simulacion",trama:"narrativa_ligera", combate:"accion", visual:"anime",          duracion:"largo",  tags:["Granja","Relajante","Social","Indie"], pop:96 },
  { id:33, name:"Cities: Skylines",   icon:"🏙️", genre:"simulacion",trama:"narrativa_ligera", combate:"sin_combate", visual:"realista", duracion:"largo",  tags:["Ciudad","Construcción","Gestión","Sandbox"], pop:91 },
  { id:34, name:"Planet Zoo",         icon:"🦁", genre:"simulacion",trama:"narrativa_ligera", combate:"sin_combate", visual:"fotorrealista", duracion:"largo", tags:["Zoológico","Animales","Gestión","Realismo"], pop:87 },
  { id:35, name:"The Sims 4",         icon:"🏠", genre:"simulacion",trama:"narrativa_ligera", combate:"sin_combate", visual:"realista", duracion:"largo",   tags:["Vida","Casual","Creatividad","Social"], pop:85 },
  { id:36, name:"Kerbal Space Program 2", icon:"🚀", genre:"simulacion", trama:"narrativa_ligera", combate:"sin_combate", visual:"realista", duracion:"largo", tags:["Espacial","Física real","Educativo","Difícil"], pop:82 },
  { id:37, name:"Factorio",           icon:"⚙️", genre:"simulacion",trama:"narrativa_ligera", combate:"accion", visual:"lowpoly",        duracion:"largo",  tags:["Automatización","Ingeniería","Adictivo","Complejo"], pop:90 },
  { id:38, name:"Halo Infinite",      icon:"🎮", genre:"shooter",   trama:"lineal",        combate:"accion",     visual:"fotorrealista",  duracion:"medio",  tags:["FPS","Sci-fi","Multijugador","Épico"], pop:88 },
  { id:39, name:"Doom Eternal",       icon:"😈", genre:"shooter",   trama:"lineal",        combate:"accion",     visual:"realista",       duracion:"medio",  tags:["FPS","Frenético","Metal","Difícil"], pop:92 },
  { id:40, name:"Titanfall 2",        icon:"🤖", genre:"shooter",   trama:"lineal",        combate:"accion",     visual:"realista",       duracion:"corto",  tags:["FPS","Mechs","Campaña épica","Velocidad"], pop:93 },
  { id:41, name:"BioShock Infinite",  icon:"☁️", genre:"shooter",   trama:"lineal",        combate:"accion",     visual:"realista",       duracion:"medio",  tags:["Narrativa","Filosófico","FPS","Atmósfera"], pop:94 },
  { id:42, name:"Prey (2017)",        icon:"🔬", genre:"shooter",   trama:"mundo_abierto", combate:"tactico",    visual:"realista",       duracion:"medio",  tags:["Immersive sim","Sci-fi","Exploración","Narrativa"], pop:89 },
  { id:43, name:"Deep Rock Galactic", icon:"⛏️", genre:"shooter",   trama:"narrativa_ligera", combate:"accion", visual:"lowpoly",        duracion:"largo",  tags:["Co-op","Enanos","Minería","Humor"], pop:93 },
  { id:44, name:"Resident Evil 4 (2023)", icon:"🌿", genre:"terror",trama:"lineal",        combate:"accion",     visual:"fotorrealista",  duracion:"medio",  tags:["Survival Horror","Acción","Remake","Icónico"], pop:97 },
  { id:45, name:"Alien: Isolation",   icon:"👾", genre:"terror",    trama:"lineal",        combate:"tactico",    visual:"realista",       duracion:"medio",  tags:["Stealth","Atmosférico","Sci-fi","Tensión"], pop:89 },
  { id:46, name:"Amnesia: The Bunker",icon:"🕯️", genre:"terror",    trama:"lineal",        combate:"sin_combate", visual:"realista",      duracion:"corto",  tags:["Horror","Supervivencia","Oscuridad","WWII"], pop:85 },
  { id:47, name:"SOMA",               icon:"🔩", genre:"terror",    trama:"lineal",        combate:"sin_combate", visual:"realista",      duracion:"medio",  tags:["Sci-fi","Filosófico","Narrativa","Sin combate"], pop:88 },
  { id:48, name:"Dead Space (2023)",  icon:"🪐", genre:"terror",    trama:"lineal",        combate:"accion",     visual:"fotorrealista",  duracion:"medio",  tags:["Survival Horror","Acción","Sci-fi","Remake"], pop:91 },
  { id:49, name:"Signalis",           icon:"🤖", genre:"terror",    trama:"lineal",        combate:"accion",     visual:"anime",          duracion:"corto",  tags:["Pixel Art","Sci-fi","Survival Horror","Artístico"], pop:87 },
  { id:50, name:"Celeste",            icon:"⛰️", genre:"aventura",  trama:"lineal",        combate:"sin_combate", visual:"anime",         duracion:"medio",  tags:["Plataformas","Difícil","Emotivo","Indie"], pop:95 },
  { id:51, name:"Sekiro: Shadows Die Twice", icon:"🍃", genre:"rpg", trama:"lineal",       combate:"accion",     visual:"realista",       duracion:"medio",  tags:["Samuráis","Difícil","FromSoftware","Acción"], pop:94 },
  { id:52, name:"Divinity: Original Sin 2", icon:"🧙", genre:"rpg", trama:"ramificada",    combate:"por_turnos", visual:"realista",       duracion:"largo",  tags:["Turnos","Co-op","Historia profunda","RPG táctico"], pop:95 },
];

// ═══════════════════════════════════════════════
//  CATEGORÍAS DE ENTRADA
// ═══════════════════════════════════════════════
const INPUT_CATEGORIES = {
  genero: {
    label: "Género Principal",
    description: "El tipo de juego que más disfrutas",
    options: [
      { value:"aventura",   label:"Aventura",   desc:"Exploración, misterio y descubrimiento" },
      { value:"rpg",        label:"RPG",         desc:"Desarrollo de personaje y mundo profundo" },
      { value:"pelea",      label:"Pelea",       desc:"Combate directo entre personajes" },
      { value:"estrategia", label:"Estrategia",  desc:"Planificación táctica y gestión" },
      { value:"simulacion", label:"Simulación",  desc:"Construye y gestiona mundos propios" },
      { value:"shooter",    label:"Shooter",     desc:"Acción con armas en primera o tercera persona" },
      { value:"terror",     label:"Terror",      desc:"Suspenso, horror y supervivencia" },
    ]
  },
  trama: {
    label: "Tipo de Trama",
    description: "La estructura narrativa que prefieres",
    options: [
      { value:"lineal",           label:"Lineal",          desc:"Historia cinematográfica con final fijo" },
      { value:"ramificada",       label:"Ramificada",      desc:"Tus decisiones cambian el destino" },
      { value:"mundo_abierto",    label:"Mundo Abierto",   desc:"Libertad total para explorar" },
      { value:"narrativa_ligera", label:"Narrativa Ligera",desc:"El gameplay importa más que la historia" },
    ]
  },
  combate: {
    label: "Sistema de Combate",
    description: "¿Cómo prefieres enfrentarte a los enemigos?",
    options: [
      { value:"por_turnos", label:"Por Turnos",           desc:"Estrategia pausada y deliberada" },
      { value:"tactico",    label:"Táctico en Tiempo Real",desc:"Acción con pausa y planificación" },
      { value:"accion",     label:"Acción Frenética",     desc:"Combate veloz y espectacular" },
      { value:"sin_combate",label:"Sin Combate",          desc:"Exploración, puzzles y narrativa pura" },
    ]
  },
  visual: {
    label: "Estilo Visual",
    description: "La dirección artística que más disfrutas",
    options: [
      { value:"realista",      label:"Realista",       desc:"Gráficos detallados y atmosféricos" },
      { value:"anime",         label:"Anime/Pixel Art", desc:"Estética japonesa o retro vibrante" },
      { value:"lowpoly",       label:"Low-Poly",        desc:"Formas geométricas con encanto artístico" },
      { value:"fotorrealista", label:"Fotorrealista",   desc:"Lo más cercano a la realidad posible" },
    ]
  },
  duracion: {
    label: "Duración Preferida",
    description: "¿Cuántas horas quieres invertir?",
    options: [
      { value:"corto", label:"Corto (<10h)",    desc:"Experiencia intensa y directa" },
      { value:"medio", label:"Medio (10-30h)",  desc:"El punto dulce del gaming" },
      { value:"largo", label:"Largo (>30h)",    desc:"Comprometido con el mundo" },
    ]
  },
};

// ═══════════════════════════════════════════════
//  LÓGICA DE RECOMENDACIÓN
//  Función de utilidad: f(s, a) = Σ wᵢ · match(sᵢ, aᵢ)
//  a* = argmax f(s, a) sobre todos los juegos en GAMES_DB
// ═══════════════════════════════════════════════
const SCORE_WEIGHTS = {
  genero:   25,  // Género principal  — define el tipo de experiencia
  trama:    20,  // Tipo de trama     — estructura narrativa
  combate:  20,  // Sistema de combate — mecánica central
  visual:   18,  // Estilo visual     — dirección artística
  duracion: 17,  // Duración          — compromiso de tiempo
};
// Total máximo posible: 100 puntos

function scoreGame(game, prefs) {
  let score = 0;
  if (game.genre    === prefs.genero)   score += SCORE_WEIGHTS.genero;
  if (game.trama    === prefs.trama)    score += SCORE_WEIGHTS.trama;
  if (game.combate  === prefs.combate)  score += SCORE_WEIGHTS.combate;
  if (game.visual   === prefs.visual)   score += SCORE_WEIGHTS.visual;
  if (game.duracion === prefs.duracion) score += SCORE_WEIGHTS.duracion;
  return score;
}

function generateReason(game, prefs, categoryId) {
  const reasons = {
    perfect: [
      `Coincide perfectamente con tu perfil de ${prefs.genero} con sistema de combate ${prefs.combate}.`,
      `Tu combinación de gustos apunta directamente a este juego — ${prefs.visual} visual y ${prefs.duracion}.`,
      `El match más alto posible: género, combate, estilo visual y duración alineados al 100%.`,
    ],
    similar: [
      `Comparte el espíritu del ${prefs.genero} con un giro que te sorprenderá gratamente.`,
      `Mismo ADN que tus preferencias con mecánicas únicas que ampliarán tus horizontes.`,
      `Cercano a tu perfil pero con suficiente novedad para mantener el interés fresco.`,
    ],
    hidden: [
      `Joya poco conocida que los fans de ${prefs.genero} suelen descubrir con deleite.`,
      `Bajo el radar del mercado pero con calidad de culto reconocida por la comunidad.`,
      `Infravaloráddo por los algoritmos mainstream — ideal para tu perfil específico.`,
    ],
    new: [
      `Sale de tu zona de confort pero el espíritu de ${prefs.genero} está presente.`,
      `Los jugadores de ${prefs.genero} suelen sorprenderse gratamente con este estilo.`,
      `El riesgo de probar algo nuevo se recompensa con una experiencia memorable.`,
    ],
    popular: [
      `Con ${game.pop}% de aprobación, es uno de los más queridos entre perfiles como el tuyo.`,
      `La crítica y la comunidad coinciden: imprescindible para cualquier jugador de ${prefs.genero}.`,
      `Alta popularidad respaldada — millones de jugadores con tu perfil lo recomiendan.`,
    ],
  };
  const pool = reasons[categoryId] || reasons.popular;
  return pool[game.id % pool.length];
}

function buildRecommendations(prefs) {
  const scored = GAMES_DB.map(g => ({
    ...g,
    score: scoreGame(g, prefs)
  })).sort((a, b) => b.score - a.score || b.pop - a.pop);

  const seen = new Set();
  const dedup = (list) => list.filter(g => {
    if (seen.has(g.id)) return false;
    seen.add(g.id); return true;
  });

  const cats = [
    { id:"perfect", label:"Perfectos para ti",             icon:"⭐", games: dedup(scored.filter(g => g.score >= 95).slice(0,8)) },
    { id:"similar", label:"Parecidos a tus favoritos",     icon:"💜", games: dedup(scored.filter(g => g.score>=60 && g.score<95).slice(0,8)) },
    { id:"hidden",  label:"Joyas ocultas",                  icon:"💎", games: dedup([...scored].filter(g => g.pop < 90).sort((a,b)=>b.score-a.score).slice(0,7)) },
    { id:"new",     label:"Si quieres algo nuevo",          icon:"🚀", games: dedup(scored.filter(g => g.genre !== prefs.genero).slice(0,7)) },
    { id:"popular", label:"Los más populares de tu perfil", icon:"🔥", games: dedup([...scored].sort((a,b)=>b.pop-a.pop).slice(0,8)) },
  ];

  // Ensure minimum 30
  const total = cats.reduce((s,c)=>s+c.games.length, 0);
  if (total < 30) {
    const remaining = scored.filter(g => !seen.has(g.id));
    remaining.slice(0, 30-total).forEach(g => { cats[4].games.push(g); seen.add(g.id); });
  }

  // Add reasons
  cats.forEach(cat => {
    cat.games = cat.games.map(g => ({
      ...g,
      matchScore: g.score,
      reason: generateReason(g, prefs, cat.id)
    }));
  });

  return cats;
}

// ═══════════════════════════════════════════════
//  ENDPOINTS
// ═══════════════════════════════════════════════

/**
 * GET /categorias
 * Devuelve las 5 categorías de gustos con sus opciones
 */
app.get('/categorias', (req, res) => {
  res.json({
    success: true,
    categorias: INPUT_CATEGORIES,
    total_juegos: GAMES_DB.length,
  });
});

/**
 * POST /recomendar
 * Body: { genero, trama, combate, visual, duracion }
 * Devuelve: { perfil_usuario, recomendaciones }
 */
app.post('/recomendar', (req, res) => {
  const { genero, trama, combate, visual, duracion } = req.body;

  // Validation
  const required = { genero, trama, combate, visual, duracion };
  const missing = Object.entries(required).filter(([,v]) => !v).map(([k]) => k);
  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Campos requeridos faltantes',
      missing,
    });
  }

  const prefs = { genero, trama, combate, visual, duracion };
  const recomendaciones = buildRecommendations(prefs);
  const totalJuegos = recomendaciones.reduce((s,c)=>s+c.games.length, 0);

  res.json({
    success: true,
    perfil_usuario: {
      genero:   INPUT_CATEGORIES.genero.options.find(o=>o.value===genero)?.label || genero,
      trama:    INPUT_CATEGORIES.trama.options.find(o=>o.value===trama)?.label || trama,
      combate:  INPUT_CATEGORIES.combate.options.find(o=>o.value===combate)?.label || combate,
      visual:   INPUT_CATEGORIES.visual.options.find(o=>o.value===visual)?.label || visual,
      duracion: INPUT_CATEGORIES.duracion.options.find(o=>o.value===duracion)?.label || duracion,
    },
    resumen: {
      total_juegos: totalJuegos,
      total_categorias: recomendaciones.length,
    },
    recomendaciones,
  });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', juegos: GAMES_DB.length }));

// ─── START ───
app.listen(PORT, () => {
  console.log(`\n🎮 GameMind API corriendo en http://localhost:${PORT}`);
  console.log(`   GET  /categorias  → 5 categorías de gustos`);
  console.log(`   POST /recomendar  → recomendaciones personalizadas\n`);
});
