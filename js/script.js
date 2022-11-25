const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

const dbz_music = document.createElement('audio')
dbz_music.src = './ressources/sounds/musics/DBZ_theme.ogg'
const dbz_menu = document.createElement('audio')
dbz_menu.src = './ressources/sounds/musics/DBZ_overTheGalaxy.ogg'
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
const btnJouer = document.querySelector('#jouer')

let gameStarted = false
let startTimer = false
let menu = true

const gravity = 0.8
const bg = new Sprite({
  pos: {
    x: 0,
    y: 0,
  },
  imgSrc: './ressources/bg/test.png',
})
const menuImg = new Sprite({
  pos: {
    x: 0,
    y: 0,
  },
  imgSrc: './ressources/bg/menu.png',
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
  nom: 'joueur1',
  compteur: 0,
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
  nom: 'joueur2',
  compteur: 0,
})

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
  if (!menu) {
    document.querySelector('#fdiv').style.display = 'flex'
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
  } else {
    //Menu.
    menuImg.animation()
    dbz_menu.play()
  }
}

// bouton jouer
btnJouer.addEventListener('click', function () {
  dbz_menu.pause()
  menu = false
  document.querySelector('#btnStart').style.display = 'none'
})

update()
