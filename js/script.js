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
    x: 80,
    y: 410,
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
    walkL: {
      imgSrc: 'ressources/sprites/goku/walkL.png',
      framesMax: 2,
      limit: 370,
    },
    winning: {
      imgSrc: 'ressources/sprites/goku/won.png',
      framesMax: 1,
      limit: 350,
    },
    recharge: {
      imgSrc: 'ressources/sprites/goku/power.png',
      framesMax: 3,
      limit: 410,
    },
    recharge2: {
      imgSrc: 'ressources/sprites/goku/power1.png',
      framesMax: 3,
      limit: 410,
    },
    attack1: {
      imgSrc: 'ressources/sprites/goku/Attack1.png',
      framesMax: 2,
      limit: 410,
    },
    attack2: {
      imgSrc: 'ressources/sprites/goku/Attack2.png',
      framesMax: 4,
      limit: 410,
    },
    attack3: {
      imgSrc: 'ressources/sprites/goku/Attack3.png',
      framesMax: 5,
      limit: 410,
    },
    block: {
      imgSrc: 'ressources/sprites/goku/Goku_block_2.png',
      framesMax: 1,
      limit: 410,
    },
  },
})

// Le deuxième joueur.
const joueur2 = new Joueur({
  pos: {
    x: 655,
    y: 397,
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
  imgSrc: 'ressources/sprites/Vegeta/idle.png',
  framesMax: 4,
  limit: 397,
  scale: 1.6,
  sprites: {
    idle: {
      imgSrc: 'ressources/sprites/Vegeta/idle.png',
      framesMax: 4,
      limit: 397,
    },
    walk: {
      imgSrc: 'ressources/sprites/goku/walk.png',
      framesMax: 2,
      limit: 370,
    },
    walkL: {
      imgSrc: 'ressources/sprites/goku/walkL.png',
      framesMax: 2,
      limit: 370,
    },
    winning: {
      imgSrc: 'ressources/sprites/goku/won.png',
      framesMax: 1,
      limit: 350,
    },
    recharge: {
      imgSrc: 'ressources/sprites/goku/power.png',
      framesMax: 3,
      limit: 410,
    },
    recharge2: {
      imgSrc: 'ressources/sprites/goku/power1.png',
      framesMax: 3,
      limit: 410,
    },
    attack1: {
      imgSrc: 'ressources/sprites/Vegeta/Attacking1.png',
      framesMax: 2,
      limit: 410,
    },
    attack2: {
      imgSrc: 'ressources/sprites/Vegeta/Attacking2.3.png',
      framesMax: 2,
      limit: 410,
    },
    attack3: {
      imgSrc: 'ressources/sprites/goku/Attack3.png',
      framesMax: 5,
      limit: 320,
    },
    block: {
      imgSrc: 'ressources/sprites/Vegeta/block.png',
      framesMax: 1,
      limit: 410,
    },
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
  r: {
    pressed: false,
  },
  h: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
  q: {
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
  o: {
    pressed: false,
  },
  p: {
    pressed: false,
  },
  i: {
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
  joueur2.animation()

  // La vitesse par défaut est 0.
  joueur.vitesse.x = 0
  joueur2.vitesse.x = 0

  // Par defaut, on joue le sprite idle.
  if (!fin) {
    // Mouvement joueur1.
    if (touches.d.pressed && joueur.lastKey === 'd') {
      joueur.vitesse.x = 5
      joueur.switchSprite('walk')
    } else if (touches.a.pressed && joueur.lastKey === 'a') {
      joueur.vitesse.x = -5
      joueur.switchSprite('walkL')
    } else if (touches.r.pressed && joueur.lastKey === 'r') {
      if (joueur.force < 100) {
        joueur.switchSprite('recharge2')
      } else {
        joueur.switchSprite('recharge')
      }
    } else if (touches.h.pressed && joueur.lastKey === 'h') {
      joueur.switchSprite('attack1')
    } else if (touches.j.pressed && joueur.lastKey === 'j') {
      joueur.switchSprite('attack2')
    } else if (touches.l.pressed && joueur.lastKey === 'l') {
      joueur.switchSprite('attack3')
    } else if (touches.q.pressed && joueur.lastKey === 'q') {
      joueur.switchSprite('block')
    } else {
      joueur.switchSprite('idle')
    }

    // Mouvement joueur2.
    if (touches.ArrowRight.pressed && joueur2.lastKey === 'ArrowRight') {
      joueur2.vitesse.x = 5
    } else if (touches.ArrowLeft.pressed && joueur2.lastKey === 'ArrowLeft') {
      joueur2.vitesse.x = -5
    } else if (touches.p.pressed && joueur2.lastKey === 'p') {
      joueur2.switchSprite('block')
    } else if (touches.o.pressed && joueur2.lastKey === 'o') {
      joueur2.switchSprite('attack1')
    } else if (touches.i.pressed && joueur2.lastKey === 'i') {
      joueur2.switchSprite('attack2')
    } else {
      joueur2.switchSprite('idle')
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
    case 'r':
      touches.r.pressed = true
      joueur.lastKey = 'r'
      if (joueur.force < 100) joueur.force++
      break
    case 'h':
      joueur.attack()
      touches.h.pressed = true
      joueur.lastKey = 'h'
      joueur.force--
      break
    case 'j':
      joueur.attack()
      touches.j.pressed = true
      joueur.lastKey = 'j'
      joueur.force--
      break
    case 'l':
      joueur.attack()
      touches.l.pressed = true
      joueur.lastKey = 'l'
      joueur.force--
      break
    case 'q':
      touches.q.pressed = true
      joueur.lastKey = 'q'
      joueur.force--
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
    case 'o':
      if (!fin) joueur2.attack()
      touches.o.pressed = true
      joueur2.lastKey = 'o'
      joueur2.force--
      break
    case 'p':
      touches.p.pressed = true
      joueur2.lastKey = 'p'
      joueur2.force--
      break
    case 'i':
      if (!fin) joueur2.attack()
      touches.i.pressed = true
      joueur2.lastKey = 'i'
      joueur2.force--
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
    case 'r':
      touches.r.pressed = false
      break
    case 'h':
      touches.h.pressed = false
      break
    case 'j':
      touches.j.pressed = false
      break
    case 'l':
      touches.l.pressed = false
      break
    case 'q':
      touches.q.pressed = false
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
    case 'o':
      touches.o.pressed = false
      break
    case 'p':
      touches.p.pressed = false
      break
    case 'i':
      touches.i.pressed = false
      break
  }
})
