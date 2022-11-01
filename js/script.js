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
  constructor({ pos, vitesse, color, offset }) {
    this.pos = pos
    this.vitesse = vitesse
    this.height = 150
    this.width = 50
    this.lastKey
    this.attackBox = {
      pos: {
        x: this.pos.x,
        y: this.pos.y,
      },
      offset,
      width: 100,
      height: 50,
    }
    this.color = color
    this.isAttacking
  }

  // Methode pour afficher les sprites.
  draw() {
    c.fillStyle = this.color
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height)

    // AttackBox
    //if (this.isAttacking) {}
    c.fillStyle = 'green'
    c.fillRect(
      this.attackBox.pos.x,
      this.attackBox.pos.y,
      this.attackBox.width,
      this.attackBox.height
    )
  }

  // Methode pour mettre a jour, les pos des personnages.
  update_pos() {
    this.draw()
    this.attackBox.pos.x = this.pos.x + this.attackBox.offset.x
    this.attackBox.pos.y = this.pos.y
    this.pos.x += this.vitesse.x

    // Tant que le joueur est dans la fenêtre, on lui laisse bouger à droite et à guache.
    if (this.pos.x < 0) {
      this.pos.x = 0
    } else if (this.pos.x > 974) {
      this.pos.x = 974
    }
  }

  // Methode pour redescendre.
  descendre() {
    this.pos.y += this.vitesse.y

    // Tant que le perso est en l'air, on mettra 0 comme vitesse y, pour le faire descendre.
    if (this.pos.y + this.height + this.vitesse.y >= canvas.height) {
      this.vitesse.y = 0
    } else {
      this.vitesse.y += gravity
    }
  }

  // Methode pour Voler dans l'air.
  fly() {
    this.pos.y -= this.vitesse.y
    // Tant que le joueur est dans la fenêtre, on lui laisse voler.
    if (this.pos.y < 0) {
      this.pos.y = 0
    } else {
      this.vitesse.y += gravity
    }
  }

  // Apres 100ms le joueur ne sera plus en état d'attaque.
  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
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
    y: 5,
  },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
})

// Le deuxième joueur.
const joueur2 = new Sprite({
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
}

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
    joueur.attackBox.pos.x + joueur.attackBox.width >=
      joueur2.attackBox.pos.x &&
    joueur.attackBox.pos.x <= joueur2.pos.x + joueur2.width &&
    joueur.attackBox.pos.y + joueur.attackBox.height >= joueur2.pos.y &&
    joueur.attackBox.pos.y <= joueur2.pos.y + joueur2.height &&
    joueur.isAttacking
  ) {
    console.log('true')
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
  }
})
