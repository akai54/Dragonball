const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.8

// Taille de la fenêtre.
canvas.width = 1024
canvas.height = 576

// Changer la couleur du fond de la fenêtre.
c.fillRect(0, 0, canvas.width, canvas.height)

// Une classe dédiée aux sprites.
class Sprite {
  constructor({ pos, vitesse }) {
    this.pos = pos
    this.vitesse = vitesse
    this.height = 150
    this.lastKey
  }

  // Methode pour afficher les sprites.
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.pos.x, this.pos.y, 50, this.height)
  }

  // Methode pour mettre a jour, les pos des personnages.
  update_pos() {
    this.draw()
    this.pos.x += this.vitesse.x
  }

  descendre() {
    this.pos.y += this.vitesse.y

    // Tant que le perso est en l'air, on mettra 0 comme vitesse y, pour le faire descendre.
    if (this.pos.y + this.height + this.vitesse.y >= canvas.height) {
      this.vitesse.y = 0
    } else {
      this.vitesse.y += gravity
    }
  }

  fly() {
    this.pos.y -= this.vitesse.y
    if (this.pos.y < 0) {
      this.pos.y = 0
    } else {
      this.vitesse.y += gravity
    }
  }
}

// Le joueur principale.
const joueur = new Sprite({
  pos: {
    x: 0,
    y: 0,
  },
  vitesse: {
    x: 0,
    y: 10,
  },
})

// Le deuxième joueur.
const joueur2 = new Sprite({
  pos: {
    x: 400,
    y: joueur.pos.y,
  },
  vitesse: {
    x: 0,
    y: 5,
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
}

// Cette variable servira pour savoir, quelle a été la dernière touche appuyée.
let derniere_touche

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
  if (touches.d.pressed && derniere_touche === 'd') {
    joueur.vitesse.x = 3
  } else if (touches.a.pressed && derniere_touche === 'a') {
    joueur.vitesse.x = -3
  }
  // Mouvement joueur2.
  if (touches.ArrowRight.pressed && joueur2.lastKey === 'ArrowRight') {
    joueur2.vitesse.x = 3
  } else if (touches.ArrowLeft.pressed && joueur2.lastKey === 'ArrowLeft') {
    joueur2.vitesse.x = -3
  }
}

update()

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      touches.d.pressed = true
      derniere_touche = 'd'
      break
    case 'a':
      touches.a.pressed = true
      derniere_touche = 'a'
      break
    case 'w':
      touches.w.pressed = true
      derniere_touche = 'w'
      joueur.fly()
      break
    case 's':
      touches.s.pressed = true
      derniere_touche = 's'
      joueur.descendre()
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
      joueur2.fly()
      break
    case 'ArrowDown':
      touches.ArrowDown.pressed = true
      joueur2.descendre()
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
  }
  switch (e.key) {
    case 'ArrowLeft':
      touches.ArrowLeft.pressed = false
      break
    case 'ArrowRight':
      touches.ArrowRight.pressed = false
      break
  }
})
