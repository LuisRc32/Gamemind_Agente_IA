# 🎮 GameMind — Agente Inteligente Recomendador de Videojuegos

> Sistema de recomendación personalizada de videojuegos basado en 5 categorías de gustos del usuario, con más de 52 juegos en base de datos y clasificación en 5 categorías de salida.

---

## 📁 Estructura del Proyecto

```
game-recommender/
├── index.html          ← Frontend completo (autocontenido, funciona sin backend)
├── README.md
└── backend/
    ├── server.js       ← API Node.js + Express
    └── package.json
```

---

## 🚀 Opción 1: Abrir directamente (sin backend)

El archivo `index.html` es completamente autocontenido. Incluye toda la lógica del agente en JavaScript del lado del cliente.

```bash
# Simplemente abre en tu navegador:
open index.html
# o doble clic en el archivo
```

✅ No requiere instalación. Funciona offline.

---

## 🖥️ Opción 2: Con Backend Node.js + Express

### Requisitos
- Node.js v18+ → https://nodejs.org
- npm v9+

### Instalación

```bash
# 1. Ir a la carpeta backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor
npm start
# o para desarrollo con recarga automática:
npm run dev
```

El servidor arranca en **http://localhost:3000**

---

## 📡 Endpoints de la API

### `GET /categorias`
Devuelve las 5 categorías de gustos con todas sus opciones.

**Respuesta:**
```json
{
  "success": true,
  "categorias": {
    "genero": {
      "label": "Género Principal",
      "options": [
        { "value": "aventura", "label": "Aventura", "desc": "..." },
        ...
      ]
    },
    "trama": { ... },
    "combate": { ... },
    "visual": { ... },
    "duracion": { ... }
  },
  "total_juegos": 52
}
```

---

### `POST /recomendar`
Recibe las preferencias del usuario y devuelve las recomendaciones.

**Body (JSON):**
```json
{
  "genero":   "rpg",
  "trama":    "mundo_abierto",
  "combate":  "accion",
  "visual":   "realista",
  "duracion": "largo"
}
```

**Respuesta:**
```json
{
  "success": true,
  "perfil_usuario": {
    "genero": "RPG",
    "trama": "Mundo Abierto",
    "combate": "Acción Frenética",
    "visual": "Realista",
    "duracion": "Largo (>30h)"
  },
  "resumen": {
    "total_juegos": 38,
    "total_categorias": 5
  },
  "recomendaciones": [
    {
      "id": "perfect",
      "label": "Perfectos para ti",
      "icon": "⭐",
      "games": [
        {
          "id": 16,
          "name": "Elden Ring",
          "tags": ["Mundo abierto", "Difícil", "Soulslike"],
          "pop": 98,
          "matchScore": 100,
          "reason": "El match más alto posible..."
        },
        ...
      ]
    },
    ...
  ]
}
```

---

## 🧠 Lógica del Agente

### Función de Utilidad f(s, a)
El agente implementa un **agente basado en utilidad** (utility-based agent). Dado el estado del usuario `s` (sus preferencias) y un juego candidato `a`:

```
a* = argmax f(s, a)

f(s, a) = Σ wᵢ · match(sᵢ, aᵢ)
```

Donde `match(sᵢ, aᵢ) = 1` si el atributo coincide, `0` si no.

### Pesos por categoría (sincronizados en frontend y backend)

| Categoría | Peso | Justificación |
|-----------|------|---------------|
| Género    | 25 pts | Define el tipo de experiencia principal |
| Trama     | 20 pts | Estructura narrativa — segundo factor clave |
| Combate   | 20 pts | Mecánica central de juego |
| Estilo Visual | 18 pts | Dirección artística |
| Duración  | 17 pts | Compromiso de tiempo |
| **Total máximo** | **100 pts** | |

### Retroalimentación — Respuesta al entorno
El usuario puede marcar juegos como "No me interesa". El agente **penaliza -40 puntos** a esos juegos y **recalcula inmediatamente** todas las recomendaciones. Esto demuestra que el agente responde a cambios en el entorno (percepción → decisión → actualización).

### Categorías de Salida

| Categoría | Criterio |
|-----------|----------|
| ⭐ **Perfectos para ti** | Score ≥ 95 pts |
| 💜 **Parecidos a tus favoritos** | Score 60–94 pts |
| 💎 **Joyas ocultas** | Popularidad < 90%, mayor score |
| 🚀 **Si quieres algo nuevo** | Género diferente al seleccionado |
| 🔥 **Los más populares de tu perfil** | Mayor popularidad global |

- Se garantizan **mínimo 30 juegos** en la respuesta.
- Cada juego muestra su **score exacto sobre 100** para transparencia del agente.

---

## 🎨 Categorías de Entrada

### Géneros
`aventura` · `rpg` · `pelea` · `estrategia` · `simulacion` · `shooter` · `terror`

### Tipos de Trama
`lineal` · `ramificada` · `mundo_abierto` · `narrativa_ligera`

### Sistemas de Combate
`por_turnos` · `tactico` · `accion` · `sin_combate`

### Estilos Visuales
`realista` · `anime` · `lowpoly` · `fotorrealista`

### Duración
`corto` (<10h) · `medio` (10–30h) · `largo` (>30h)

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript Vanilla |
| Backend  | Node.js 18+ + Express 4 |
| Base de datos | JSON embebido (52 juegos) |
| Comunicación | Fetch API / REST |
| Fuentes | Google Fonts (Syne + DM Sans) |

---

## 📝 Notas de Diseño

- El frontend funciona **completamente sin backend** — toda la lógica está en JS del lado del cliente.
- El backend es opcional, permite integrar con otros frontends o aplicaciones.
- Sin dependencias de APIs externas — todo es autocontenido.
- Diseño responsive: mobile-first, funciona en cualquier tamaño de pantalla.
- El usuario puede reiniciar la búsqueda sin recargar la página.

---

*GameMind v1.0 — Desarrollado como agente de recomendación inteligente de videojuegos*
