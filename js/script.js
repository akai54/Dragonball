const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Taille de la fenêtre.
canvas.width = 1024
canvas.height = 576

// Changer la couleur du fond de la fenêtre.
c.fillRect(0, 0, canvas.width, canvas.height)

// Une classe dédiée aux sprites.
class Sprite {
  constructor(pos, vitesse) {
    this.pos = pos
    this.vitesse = vitesse
  }

  // Methode pour afficher les sprites.
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.pos.x, this.pos.y, 50, 150)
  }
}

const joueur = new Sprite({
  x: 0,
  y: 0,
})

const ennemi = new Sprite({
  x: 400,
  y: 100,
})
joueur.draw()
ennemi.draw()

console.log(joueur)

function update() {
  window.requestAnimationFrame(update)
}

update()
