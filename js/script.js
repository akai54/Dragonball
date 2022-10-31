const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

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
  }

  // Methode pour afficher les sprites.
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.pos.x, this.pos.y, 50, 150)
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
    y: 0,
  },
})

// Le deuxième joueur.
const ennemi = new Sprite({
  pos: {
    x: 400,
    y: 100,
  },
  vitesse: {
    x: 0,
    y: 0,
  },
})

joueur.draw()
ennemi.draw()

console.log(joueur)

// La fonction qui va etre appeler en boucle.
function update() {
  window.requestAnimationFrame(update)
}

update()
