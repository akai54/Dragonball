const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

const dbz_music = document.createElement('audio')
dbz_music.src = './ressources/sounds/musics/DBZ_theme.ogg'
const gokuBlock = document.createElement('audio')
gokuBlock.src = './ressources/sounds/voices/goku/gokuBlock.ogg'
const goku1 = document.createElement('audio')
goku1.src = './ressources/sounds/voices/goku/gokuHandAttack.ogg'
const goku2 = document.createElement('audio')
goku2.src = './ressources/sounds/voices/goku/gokuJumpKick.ogg'
const goku3 = document.createElement('audio')
goku3.src = './ressources/sounds/voices/goku/gokuRushAttack.ogg'
const gokuHit = document.createElement('audio')
gokuHit.src = './ressources/sounds/voices/goku/gokuTouchedPropels.ogg'
const ko = document.createElement('audio')
ko.src = './ressources/sounds/effects/DBZ_KO.ogg'
const fight_banner = document.createElement('audio')
fight_banner.src = './ressources/sounds/effects/DBZ_FIGHT.ogg'
const vegetaHit = document.createElement('audio')
vegetaHit.src = './ressources/sounds/voices/vegeta/6.wav'
const vegeta1 = document.createElement('audio')
vegeta1.src = './ressources/sounds/voices/vegeta/34.wav'
const vegeta2 = document.createElement('audio')
vegeta2.src = './ressources/sounds/voices/vegeta/35.wav'
const vegeta3 = document.createElement('audio')
vegeta3.src = './ressources/sounds/voices/vegeta/36.wav'
const vegetaBlock = document.createElement('audio')
vegetaBlock.src = './ressources/sounds/voices/vegeta/19.wav'

let gameStarted = false
let startTimer = false

const gravity = 0.8
const bg = new Sprite({
  pos: {
    x: 0,
    y: 0,
  },
  imgSrc: './ressources/bg/test.png',
})

const ready = new Sprite({
  pos: {
    x: 300,
    y: 139,
  },
  imgSrc: './ressources/bg/ready.png',
})

const fighting = new Sprite({
  pos: {
    x: 300,
    y: 139,
  },
  imgSrc: './ressources/bg/fight.png',
})

// Taille de la fenêtre.
canvas.width = 1024
canvas.height = 576

// Changer la couleur du fond de la fenêtre.
c.fillRect(0, 0, canvas.width, canvas.height)

// Le joueur principale.
const joueur1 = new Joueur({
  pos: {
    x: 80,
    y: 410,
  },
  vitesse: {
    x: 0,
    y: 2,
  },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
  imgSrc: './ressources/sprites/goku/idle.png',
  framesMax: 4,
  scale: 1.6,
  sprites: {
    idle: {
      imgSrc: './ressources/sprites/goku/idle.png',
      framesMax: 4,
      limit: 410,
    },
    walk: {
      imgSrc: './ressources/sprites/goku/test.png',
      framesMax: 1,
      limit: 370,
    },
    walkL: {
      imgSrc: './ressources/sprites/goku/test2.png',
      framesMax: 1,
      limit: 370,
    },
    winning: {
      imgSrc: './ressources/sprites/goku/won.png',
      framesMax: 1,
      limit: 350,
    },
    recharge: {
      imgSrc: './ressources/sprites/goku/power.png',
      framesMax: 2,
      limit: 410,
    },
    recharge2: {
      imgSrc: './ressources/sprites/goku/power1.png',
      framesMax: 3,
      limit: 410,
    },
    attack1: {
      imgSrc: './ressources/sprites/goku/Attack1.png',
      framesMax: 1,
      limit: 410,
    },
    attack2: {
      imgSrc: './ressources/sprites/goku/Attack2.png',
      framesMax: 4,
      limit: 410,
    },
    attack3: {
      imgSrc: './ressources/sprites/goku/Attack3.png',
      framesMax: 5,
      limit: 410,
    },
    block: {
      imgSrc: './ressources/sprites/goku/Goku_block_2.png',
      framesMax: 1,
      limit: 410,
    },
    hit: {
      imgSrc: './ressources/sprites/goku/hittest.png',
      framesMax: 3,
      limit: 410,
    },
    mort: {
      imgSrc: './ressources/sprites/goku/death.png',
      framesMax: 4,
      limit: 480,
    },
    fly: {
      imgSrc: './ressources/sprites/goku/fly.png',
      framesMax: 1,
      limit: 480,
    },
    descendre: {
      imgSrc: './ressources/sprites/goku/descendre.png',
      framesMax: 1,
      limit: 480,
    },
    kamehameha: {
      imgSrc: './ressources/sprites/goku/kamehameha.png',
      framesMax: 7,
      limit: 480,
    },
  },
  attackBox: {
    offset: {
      x: 130,
      y: 0,
    },
    width: 100,
    height: 50,
  },
  name: 'joueur1',
})

// Le deuxième joueur.
const joueur2 = new Joueur({
  pos: {
    x: 655,
    y: 393,
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
  imgSrc: './ressources/sprites/Vegeta/idle-3.png',
  framesMax: 2,
  limit: 393,
  scale: 1.6,
  sprites: {
    idle: {
      imgSrc: './ressources/sprites/Vegeta/idle-3.png',
      framesMax: 2,
      limit: 393,
    },
    walk: {
      imgSrc: './ressources/sprites/Vegeta/walk.png',
      framesMax: 1,
      limit: 370,
    },
    walkL: {
      imgSrc: './ressources/sprites/Vegeta/walk2.png',
      framesMax: 1,
      limit: 370,
    },
    winning: {
      imgSrc: './ressources/sprites/Vegeta/won.png',
      framesMax: 1,
      limit: 350,
    },
    recharge: {
      imgSrc: './ressources/sprites/goku/power.png',
      framesMax: 3,
      limit: 410,
    },
    recharge2: {
      imgSrc: './ressources/sprites/goku/power1.png',
      framesMax: 3,
      limit: 410,
    },
    attack1: {
      imgSrc: './ressources/sprites/Vegeta/Attacking1.png',
      framesMax: 1,
      limit: 410,
    },
    attack2: {
      imgSrc: './ressources/sprites/Vegeta/Attacking2.3.png',
      framesMax: 2,
      limit: 410,
    },
    attack3: {
      imgSrc: './ressources/sprites/Vegeta/Attack3.png',
      framesMax: 2,
      limit: 320,
    },
    block: {
      imgSrc: './ressources/sprites/Vegeta/block.png',
      framesMax: 1,
      limit: 410,
    },
    hit: {
      imgSrc: './ressources/sprites/Vegeta/hit.png',
      framesMax: 3,
      limit: 410,
    },
    mort: {
      imgSrc: './ressources/sprites/Vegeta/death.png',
      framesMax: 4,
      limit: 500,
    },
    fly: {
      imgSrc: './ressources/sprites/Vegeta/fly.png',
      framesMax: 1,
      limit: 480,
    },
    descendre: {
      imgSrc: './ressources/sprites/Vegeta/descendre.png',
      framesMax: 1,
      limit: 393,
    },
  },
  attackBox: {
    offset: {
      x: -35,
      y: 17,
    },
    width: 105,
    height: 50,
  },
  name: 'joueur2',
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
  space: {
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
  u: {
    pressed: false,
  },
}

function dec_Health(p1, p2) {
  p1.isAttacking = false
  p2.vie -= 5
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let changeFight = false
async function readyAnim() {
  ready.animation()
  await sleep(2000)
  changeFight = true
  fight_banner.play()
  await sleep(1000)
  gameStarted = true
}

// La fonction qui va etre appeler en boucle.
function update() {
  window.requestAnimationFrame(update)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  bg.animation()
  if (!gameStarted) {
    if (!changeFight) readyAnim()
    else {
      fighting.animation()
      if (!startTimer) {
        dec_Timer()
        startTimer = true
      }
    }
  }
  c.fillStyle = 'rgba(255,255,255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  joueur1.animation()
  joueur2.animation()

  // La vitesse par défaut est 0.
  joueur1.vitesse.x = 0
  joueur2.vitesse.x = 0

  // Par defaut, on joue le sprite idle.
  if (!fin && gameStarted) {
    // Mouvement joueur1.
    dbz_music.play()
    if (touches.d.pressed && joueur1.lastKey === 'd') {
      joueur1.vitesse.x = 5
      joueur1.switchSprite('walk')
    } else if (touches.a.pressed && joueur1.lastKey === 'a') {
      joueur1.vitesse.x = -5
      joueur1.switchSprite('walkL')
    } else if (touches.r.pressed && joueur1.lastKey === 'r') {
      if (joueur1.force < 100) {
        /* Si le joueur essaie de recharger ses forces, alors qu'il est sur le sol,
           On monte un peu sa position pour mieux montrer le sprite. */
        if (joueur1.on_ground) {
          joueur1.pos.y -= 20
          joueur1.on_ground = false
        }
        joueur1.switchSprite('recharge2')
      } else {
        joueur1.switchSprite('recharge')
      }
    } else if (touches.h.pressed && joueur1.lastKey === 'h') {
      joueur1.switchSprite('attack1')
    } else if (touches.j.pressed && joueur1.lastKey === 'j') {
      joueur1.switchSprite('attack2')
    } else if (touches.l.pressed && joueur1.lastKey === 'l') {
      joueur1.switchSprite('attack3')
    } else if (touches.space.pressed && joueur1.lastKey === 'space') {
      joueur1.switchSprite('kamehameha')
    } else if (touches.q.pressed && joueur1.lastKey === 'q') {
      joueur1.switchSprite('block')
    } else if (touches.w.pressed && joueur1.lastKey === 'w') {
      joueur1.switchSprite('fly')
    } else if (touches.s.pressed && joueur1.lastKey === 's') {
      joueur1.switchSprite('descendre')
    } else {
      joueur1.switchSprite('idle')
    }

    // Mouvement joueur2.
    if (touches.ArrowRight.pressed && joueur2.lastKey === 'ArrowRight') {
      joueur2.vitesse.x = 5
      joueur2.switchSprite('walkL')
    } else if (touches.ArrowLeft.pressed && joueur2.lastKey === 'ArrowLeft') {
      joueur2.vitesse.x = -5
      joueur2.switchSprite('walk')
    } else if (touches.ArrowUp.pressed && joueur2.lastKey === 'ArrowUp') {
      joueur2.switchSprite('fly')
    } else if (touches.ArrowDown.pressed && joueur2.lastKey === 'ArrowDown') {
      joueur2.switchSprite('descendre')
    } else if (touches.p.pressed && joueur2.lastKey === 'p') {
      joueur2.switchSprite('block')
    } else if (touches.o.pressed && joueur2.lastKey === 'o') {
      joueur2.switchSprite('attack1')
    } else if (touches.i.pressed && joueur2.lastKey === 'i') {
      joueur2.switchSprite('attack2')
    } else if (touches.u.pressed && joueur2.lastKey === 'u') {
      joueur2.switchSprite('attack3')
    } else {
      joueur2.switchSprite('idle')
    }

    // Détection collisions.
    if (
      collision_joueurs({
        j1: joueur1,
        j2: joueur2,
      }) &&
      joueur1.isAttacking &&
      !joueur1.isBlocking &&
      !joueur2.isBlocking &&
      !fin
    ) {
      joueur2.switchSprite('hit')
      vegetaHit.play()
      dec_Health(joueur1, joueur2)
      gsap.to('#joueur2Vie', {
        width: joueur2.vie + '%',
      })
    }

    if (
      collision_joueurs({
        j1: joueur2,
        j2: joueur1,
      }) &&
      joueur2.isAttacking &&
      !joueur1.isBlocking &&
      !joueur2.isBlocking &&
      !fin
    ) {
      joueur1.switchSprite('hit')
      gokuHit.play()
      dec_Health(joueur2, joueur1)
      gsap.to('#joueur1Vie', {
        width: joueur1.vie + '%',
      })
    }
  }

  // Fin jeu
  if (joueur1.vie <= 0 || joueur2.vie <= 0) {
    fin_jeu({ joueur: joueur1, joueur2, timerId })
  }
}

update()

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      touches.d.pressed = true
      joueur1.lastKey = 'd'
      break
    case 'a':
      touches.a.pressed = true
      joueur1.lastKey = 'a'
      break
    case 'w':
      touches.w.pressed = true
      joueur1.lastKey = 'w'
      if (!fin) joueur1.fly()
      break
    case 's':
      touches.s.pressed = true
      joueur1.lastKey = 's'
      if (!fin) joueur1.descendre()
      break
    case 'r':
      touches.r.pressed = true
      joueur1.lastKey = 'r'
      if (joueur1.force < 100) joueur1.force++
      break
    case 'h':
      goku1.play()
      joueur1.attack()
      touches.h.pressed = true
      joueur1.lastKey = 'h'
      joueur1.force--
      break
    case 'j':
      goku2.play()
      joueur1.attack()
      touches.j.pressed = true
      joueur1.lastKey = 'j'
      joueur1.force--
      break
    case 'l':
      goku3.play()
      touches.l.pressed = true
      joueur1.lastKey = 'l'
      joueur1.attack()
      joueur1.force--
      joueur2.vie -= 8
      break
    case 'q':
      if (joueur1.lastKey !== 'q') gokuBlock.play()
      touches.q.pressed = true
      joueur1.lastKey = 'q'
      joueur1.isBlocking = true
      joueur1.force--
      break
    case ' ':
      touches.space.pressed = true
      joueur1.lastKey = 'space'
      joueur1.attack()
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
      vegeta1.play()
      break
    case 'p':
      if (joueur2.lastKey !== 'p') vegetaBlock.play()
      touches.p.pressed = true
      joueur2.lastKey = 'p'
      joueur2.isBlocking = true
      break
    case 'i':
      if (!fin) joueur2.attack()
      touches.i.pressed = true
      joueur2.lastKey = 'i'
      vegeta2.play()
      joueur2.force--
      break
    case 'u':
      if (!fin) joueur2.attack()
      touches.u.pressed = true
      joueur2.lastKey = 'u'
      vegeta3.play()
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
      joueur1.isAttacking = false
      break
    case 'j':
      touches.j.pressed = false
      joueur1.isAttacking = false
      break
    case 'l':
      touches.l.pressed = false
      joueur1.isAttacking = false
      break
    case 'q':
      touches.q.pressed = false
      joueur1.isBlocking = false
      break
    case ' ':
      touches.space.pressed = false
      joueur1.isAttacking = false
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
      joueur2.isAttacking = false
      break
    case 'p':
      touches.p.pressed = false
      joueur2.isBlocking = false
      break
    case 'i':
      touches.i.pressed = false
      joueur2.isAttacking = false
      break
    case 'u':
      touches.u.pressed = false
      joueur2.isAttacking = false
      break
  }
})
