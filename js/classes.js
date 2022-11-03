// Une classe dédiée aux sprites.
class Sprite {
  constructor({
    pos,
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.pos = pos
    this.height = 150
    this.width = 50
    this.image = new Image()
    this.image.src = imgSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = this.offset = offset
  }

  // Methode pour afficher les sprites.
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.pos.x - this.offset.x,
      this.pos.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrame() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }
  // Methode pour mettre a jour, les pos des personnages.
  animation() {
    this.draw()
    this.animateFrame()
  }
}

class Joueur extends Sprite {
  constructor({
    pos,
    vitesse,
    color,
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      pos,
      imgSrc,
      scale,
      framesMax,
      offset,
    })
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
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.on_ground = false
    this.sprites = sprites

    for (let sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imgSrc
    }
  }

  // Methode pour mettre a jour, les pos des personnages.
  animation() {
    this.draw()
    this.animateFrame()
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
    if (this.pos.y >= 410) {
      this.pos.y = 410
      this.on_ground = true
    } else {
      this.vitesse.y += 5
      this.on_ground = false
    }
  }

  // Methode pour Voler dans l'air.
  fly() {
    this.pos.y -= this.vitesse.y
    // Tant que le joueur est dans la fenêtre, on lui laisse voler.
    if (this.pos.y < 0) {
      this.on_ground = false
      this.pos.y = 0
    } else {
      this.vitesse.y += 5
      this.on_ground = false
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
