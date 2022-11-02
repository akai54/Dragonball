const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.8

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

console.log(joueur)

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

function collision_joueurs({ j1, j2 }) {
  return (
    j1.attackBox.pos.x + j1.attackBox.width >= j2.attackBox.pos.x &&
    j1.attackBox.pos.x <= j2.pos.x + j2.width &&
    j1.attackBox.pos.y + j1.attackBox.height >= j2.pos.y &&
    j1.attackBox.pos.y <= j2.pos.y + j2.height &&
    j1.isAttacking
  )
}

function fin_jeu({ joueur, joueur2, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#timerRes').style.display = 'flex'
  if (joueur.vie === joueur2.vie) {
    document.querySelector('#timerRes').innerHTML = 'Égalité'
  } else if (joueur.vie > joueur2.vie) {
    document.querySelector('#timerRes').innerHTML = 'Joueur1 a gagné'
  } else if (joueur.vie < joueur2.vie) {
    document.querySelector('#timerRes').innerHTML = 'Joueur2 a gagné'
  }
}

let timer = 10
let timerId
function dec_Timer() {
  if (timer > 0) {
    timerId = setTimeout(dec_Timer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    fin_jeu({ joueur, joueur2, timerId })
  }
}

dec_Timer()

// La fonction qui va etre appeler en boucle.
function update() {
  window.requestAnimationFrame(update)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  joueur.update_pos()
  joueur2.update_pos()

  // La vitesse par défaut est 0.
  joueur.vitesse.x = 0
  joueur2.vitesse.x = 0

  // Mouvement joueur1.
  if (touches.d.pressed && joueur.lastKey === 'd') {
    joueur.vitesse.x = 5
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
      joueur.fly()
      break
    case 's':
      touches.s.pressed = true
      joueur.lastKey = 's'
      joueur.descendre()
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
      joueur2.fly()
      break
    case 'ArrowDown':
      touches.ArrowDown.pressed = true
      joueur2.lastKey = 'ArrowDown'
      joueur2.descendre()
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
