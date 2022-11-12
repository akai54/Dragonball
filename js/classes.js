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
    limit = 410,
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
    this.color = color
    this.isAttacking
    this.vie = 100
    this.force = 20
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.on_ground = false
    this.sprites = sprites
    this.limit = limit
    this.attackBox = {
      pos: {
        x: this.pos.x,
        y: this.pos.y,
      },
      offset,
      width: 100,
      height: 50,
    }

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

    c.fillStyle = 'black'
    c.fillRect(
      this.attackBox.pos.x,
      this.attackBox.pos.y,
      this.attackBox.width,
      this.attackBox.height
    )

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
    if (this.pos.y >= this.limit) {
      this.pos.y = this.limit
      this.on_ground = true
    } else {
      this.vitesse.y += 2
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
      this.vitesse.y += 2
      this.on_ground = false
    }
  }

  // Apres 100ms le joueur ne sera plus en état d'attaque.
  attack() {
    //this.switchSprite('attack2')
    this.isAttacking = true
  }

  switchSprite(sprite) {
    // Si on attaque, on ne montre pas d'autre sprite.
    if (
      !fin &&
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return
    if (
      !fin &&
      this.image === this.sprites.attack2.image &&
      this.framesCurrent < this.sprites.attack2.framesMax - 1
    )
      return
    if (
      !fin &&
      this.image === this.sprites.attack3.image &&
      this.framesCurrent < this.sprites.attack3.framesMax - 1
    )
      return

    // Si on est touchée, on ne montre pas d'autre sprite.
    if (
      !fin &&
      this.image === this.sprites.hit.image &&
      this.framesCurrent < this.sprites.hit.framesMax - 1
    )
      return

    if (
      fin &&
      this.image === this.sprites.mort.image &&
      this.framesCurrent < this.sprites.mort.framesMax - 1
    )
      return

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.limit = this.sprites.idle.limit
          this.framesCurrent = 0
        }
        break
      case 'walk':
        if (this.image !== this.sprites.walk.image) {
          this.image = this.sprites.walk.image
          this.framesMax = this.sprites.walk.framesMax
          this.limit = this.sprites.walk.limit
          this.framesCurrent = 0
        }
        break
      case 'walkL':
        if (this.image !== this.sprites.walkL.image) {
          this.image = this.sprites.walkL.image
          this.framesMax = this.sprites.walkL.framesMax
          this.limit = this.sprites.walkL.limit
          this.framesCurrent = 0
        }
        break
      case 'winning':
        if (this.image !== this.sprites.winning.image) {
          this.image = this.sprites.winning.image
          this.framesMax = this.sprites.winning.framesMax
          this.limit = this.sprites.winning.limit
          this.framesCurrent = 0
        }
        break
      case 'recharge':
        if (this.image !== this.sprites.recharge.image) {
          this.image = this.sprites.recharge.image
          this.framesMax = this.sprites.recharge.framesMax
          this.limit = this.sprites.recharge.limit
          this.framesCurrent = 0
          this.image = this.sprites.recharge.image
          if (this.framesCurrent === this.sprites.attack1.framesMax - 1)
            this.framesCurrent === this.sprites.attack1.framesMax - 1
        }
        break
      case 'recharge2':
        if (this.image !== this.sprites.recharge2.image) {
          this.image = this.sprites.recharge2.image
          this.framesMax = this.sprites.recharge2.framesMax
          this.limit = this.sprites.recharge2.limit
          this.framesCurrent = 0
        }
        break
      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.limit = this.sprites.recharge2.limit
          this.framesCurrent = 0
        }
        break
      case 'attack2':
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image
          this.framesMax = this.sprites.attack2.framesMax
          this.limit = this.sprites.recharge2.limit
          this.framesCurrent = 0
        }
        break
      case 'attack3':
        if (this.image !== this.sprites.attack3.image) {
          this.image = this.sprites.attack3.image
          this.framesMax = this.sprites.attack3.framesMax
          this.limit = this.sprites.recharge2.limit
          this.framesCurrent = 0
        }
        break
      case 'block':
        if (this.image !== this.sprites.block.image) {
          this.image = this.sprites.block.image
          this.framesMax = this.sprites.block.framesMax
          this.limit = this.sprites.recharge2.limit
          this.framesCurrent = 0
        }
        break
      case 'hit':
        if (this.image !== this.sprites.hit.image) {
          this.image = this.sprites.hit.image
          this.framesMax = this.sprites.hit.framesMax
          this.limit = this.sprites.recharge2.limit
          this.framesCurrent = 0
        }
        break
      case 'mort':
        if (this.image !== this.sprites.mort.image) {
          this.image = this.sprites.mort.image
          this.framesMax = this.sprites.mort.framesMax
          this.limit = this.sprites.recharge2.limit
          this.framesCurrent = 0
        }
        break
    }
  }
}
