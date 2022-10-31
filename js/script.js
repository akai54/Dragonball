const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Taille de la fenêtre.
canvas.width = 1024
canvas.height = 576

// Changer la couleur du fond de la fenêtre.
c.fillRect(0, 0, canvas.width, canvas.height)

// Une classe dédiée aux sprites.
class Sprite {
  constructor(pos) {
    this.pos = pos
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.pos.x, this.pos.y, 50, 150)
  }
}

const joueur = new Sprite({
  x: 0,
  y: 0,
})

joueur.draw()

console.log(joueur)
