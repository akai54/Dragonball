// Une classe dédiée aux sprites.
class Sprite {
  constructor({ pos }) {
    this.pos = pos
    this.height = 150
    this.width = 50
  }

  // Methode pour afficher les sprites.
  draw() {}

  // Methode pour mettre a jour, les pos des personnages.
  update_pos() {
    this.draw()
  }
}

class Joueur {
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
    this.vie = 100
  }

  // Methode pour afficher les sprites.
  draw() {
    c.fillStyle = this.color
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height)

    // AttackBox
    if (this.isAttacking) {
      c.fillStyle = 'green'
      c.fillRect(
        this.attackBox.pos.x,
        this.attackBox.pos.y,
        this.attackBox.width,
        this.attackBox.height
      )
    }
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
