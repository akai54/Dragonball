const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.2

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
  }

  // Methode pour afficher les sprites.
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.pos.x, this.pos.y, 50, this.height)
  }

  // Methode pour mettre a jour, les pos des personnages.
  update_pos() {
    this.draw()
    this.pos.y += this.vitesse.y

    // Tant que le perso est en l'air, on mettra 0 comme vitesse y, pour le faire descendre.
    if (this.pos.y + this.height + this.vitesse.y >= canvas.height) {
      this.vitesse.y = 0
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
    y: 100,
  },
  vitesse: {
    x: 0,
    y: 5,
  },
})

console.log(joueur)

// La fonction qui va etre appeler en boucle.
function update() {
  window.requestAnimationFrame(update)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  joueur.update_pos()
  joueur2.update_pos()
}

update()
