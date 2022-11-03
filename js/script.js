const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

const gravity = 0.8
const bg = new Sprite({
  pos: {
    x: 0,
    y: 0,
  },
  imgSrc: 'ressources/bg/battle_bg.png',
})

// Taille de la fenêtre.
canvas.width = 1024
canvas.height = 576

// Changer la couleur du fond de la fenêtre.
c.fillRect(0, 0, canvas.width, canvas.height)

// Le joueur principale.
const joueur = new Joueur({
  pos: {
    x: 0,
    y: 0,
  },
  vitesse: {
    x: 0,
    y: 5,
  },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
  imgSrc: 'ressources/sprites/goku/idle.png',
  framesMax: 4,
  scale: 1.6,
  sprites: {
    idle: {
      imgSrc: 'ressources/sprites/goku/idle.png',
      framesMax: 4,
      limit: 410,
    },
    walk: {
      imgSrc: 'ressources/sprites/goku/walk.png',
      framesMax: 2,
      limit: 370,
    },
    winning: {
      imgSrc: 'ressources/sprites/goku/won.png',
      framesMax: 1,
      limit: 350,
    },
  },
})

// Le deuxième joueur.
const joueur2 = new Joueur({
  pos: {
    x: 400,
    y: 0,
  },
  vitesse: {
    x: 0,
    y: 5,
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0,
  },
})

// Les touches pour interagir avec les personnages.
const touches = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  k: {
    pressed: false,
  },
}

dec_Timer()

// La fonction qui va etre appeler en boucle.
function update() {
  window.requestAnimationFrame(update)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  bg.animation()
  joueur.animation()
  //joueur2.animation()

  // La vitesse par défaut est 0.
  joueur.vitesse.x = 0
  joueur2.vitesse.x = 0

  // Par defaut, on joue le sprite idle.
  if (!fin) {
    joueur.image = joueur.sprites.idle.image
    joueur.framesMax = joueur.sprites.idle.framesMax
    joueur.limit = joueur.sprites.idle.limit
    // Mouvement joueur1.
    if (touches.d.pressed && joueur.lastKey === 'd') {
      joueur.vitesse.x = 5
      joueur.image = joueur.sprites.walk.image
      joueur.framesMax = joueur.sprites.walk.framesMax
      joueur.limit = joueur.sprites.walk.limit
    } else if (touches.a.pressed && joueur.lastKey === 'a') {
      joueur.vitesse.x = -5
    }

    // Mouvement joueur2.
    if (touches.ArrowRight.pressed && joueur2.lastKey === 'ArrowRight') {
      joueur2.vitesse.x = 5
    } else if (touches.ArrowLeft.pressed && joueur2.lastKey === 'ArrowLeft') {
      joueur2.vitesse.x = -5
    }

    // Détection collisions.
    if (
      collision_joueurs({
        j1: joueur,
        j2: joueur2,
      }) &&
      joueur.isAttacking
    ) {
      joueur.isAttacking = false
      joueur2.vie -= 20
      document.querySelector('#j2Vie').style.width = joueur2.vie + '%'
    }

    if (
      collision_joueurs({
        j1: joueur2,
        j2: joueur,
      }) &&
      joueur2.isAttacking
    ) {
      joueur2.isAttacking = false
      joueur.vie -= 20
      document.querySelector('#j1Vie').style.width = joueur.vie + '%'
    }
  }

  // Fin jeu
  if (joueur.vie <= 0 || joueur2.vie <= 0) {
    fin_jeu({ joueur, joueur2, timerId })
  }
  console.log(joueur.pos, joueur.on_ground)
}

update()

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      touches.d.pressed = true
      joueur.lastKey = 'd'
      break
    case 'a':
      touches.a.pressed = true
      joueur.lastKey = 'a'
      break
    case 'w':
      touches.w.pressed = true
      joueur.lastKey = 'w'
      if (!fin) joueur.fly()
      break
    case 's':
      touches.s.pressed = true
      joueur.lastKey = 's'
      if (!fin) joueur.descendre()
      break
    case ' ':
      joueur.attack()
      break
    case 'ArrowRight':
      touches.ArrowRight.pressed = true
      joueur2.lastKey = 'ArrowRight'
      break
    case 'ArrowLeft':
      touches.ArrowLeft.pressed = true
      joueur2.lastKey = 'ArrowLeft'

      break
    case 'ArrowUp':
      touches.ArrowUp.pressed = true
      joueur2.lastKey = 'ArrowUp'
      if (!fin) joueur2.fly()
      break
    case 'ArrowDown':
      touches.ArrowDown.pressed = true
      joueur2.lastKey = 'ArrowDown'
      if (!fin) joueur2.descendre()
      break
    case 'k':
      touches.k.pressed = true
      joueur2.lastKey = 'k'
      joueur2.attack()
      break
  }
})
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'd':
      touches.d.pressed = false
      break
    case 'a':
      touches.a.pressed = false
      break
    case 'w':
      touches.w.pressed = false
      break
    case 's':
      touches.s.pressed = false
      break
    case 'ArrowLeft':
      touches.ArrowLeft.pressed = false
      break
    case 'ArrowRight':
      touches.ArrowRight.pressed = false
      break
    case 'ArrowDown':
      touches.ArrowDown.pressed = false
      break
    case 'ArrowUp':
      touches.ArrowUp.pressed = false
      break
    case 'k':
      touches.k.pressed = false
      break
  }
})
