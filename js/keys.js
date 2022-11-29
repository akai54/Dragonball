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
  r: {
    pressed: false,
  },
  h: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  k: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  space: {
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
  o: {
    pressed: false,
  },
  p: {
    pressed: false,
  },
  i: {
    pressed: false,
  },
  u: {
    pressed: false,
  },
  y: {
    pressed: false,
  },
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      touches.d.pressed = true
      joueur1.lastKey = 'd'
      break
    case 'a':
      touches.a.pressed = true
      joueur1.lastKey = 'a'
      break
    case 'w':
      touches.w.pressed = true
      joueur1.lastKey = 'w'
      if (!fin) joueur1.fly()
      break
    case 's':
      touches.s.pressed = true
      joueur1.lastKey = 's'
      if (!fin) joueur1.descendre()
      break
    case 'r':
      touches.r.pressed = true
      joueur1.lastKey = 'r'
      if (joueur1.force < 100) joueur1.force++
      break
    case 'h':
      goku1.play()
      joueur1.attack()
      touches.h.pressed = true
      joueur1.lastKey = 'h'
      joueur1.force--
      break
    case 'j':
      goku2.play()
      joueur1.attack()
      touches.j.pressed = true
      joueur1.lastKey = 'j'
      joueur1.force--
      break
    case 'k':
      goku3.play()
      joueur1.attack()
      touches.k.pressed = true
      joueur1.lastKey = 'k'
      joueur1.force--
      break
    case 'q':
      if (joueur1.lastKey !== 'q') gokuBlock.play()
      touches.q.pressed = true
      joueur1.lastKey = 'q'
      joueur1.isBlocking = true
      joueur1.force--
      break
    case ' ':
      touches.space.pressed = true
      joueur1.lastKey = 'space'
      joueur1.attack()
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
      if (!fin) joueur2.fly()
      break
    case 'ArrowDown':
      touches.ArrowDown.pressed = true
      joueur2.lastKey = 'ArrowDown'
      if (!fin) joueur2.descendre()
      break
    case 'o':
      if (!fin) joueur2.attack()
      touches.o.pressed = true
      joueur2.lastKey = 'o'
      joueur2.force--
      vegeta1.play()
      break
    case 'p':
      if (joueur2.lastKey !== 'p') vegetaBlock.play()
      touches.p.pressed = true
      joueur2.lastKey = 'p'
      joueur2.isBlocking = true
      break
    case 'i':
      if (!fin) joueur2.attack()
      touches.i.pressed = true
      joueur2.lastKey = 'i'
      vegeta2.play()
      joueur2.force--
      break
    case 'u':
      if (!fin) joueur2.attack()
      touches.u.pressed = true
      joueur2.lastKey = 'u'
      vegeta3.play()
      joueur2.force--
      break
    case 'y':
      touches.y.pressed = true
      joueur2.lastKey = 'y'
      if (joueur2.force < 100) joueur2.force++
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
    case 'r':
      touches.r.pressed = false
      break
    case 'h':
      touches.h.pressed = false
      joueur1.isAttacking = false
      break
    case 'j':
      touches.j.pressed = false
      joueur1.isAttacking = false
      break
    case 'k':
      touches.k.pressed = false
      joueur1.isAttacking = false
      break
    case 'q':
      touches.q.pressed = false
      joueur1.isBlocking = false
      break
    case ' ':
      touches.space.pressed = false
      joueur1.isAttacking = false
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
    case 'o':
      touches.o.pressed = false
      joueur2.isAttacking = false
      break
    case 'p':
      touches.p.pressed = false
      joueur2.isBlocking = false
      break
    case 'i':
      touches.i.pressed = false
      joueur2.isAttacking = false
      break
    case 'u':
      touches.u.pressed = false
      joueur2.isAttacking = false
      break
    case 'y':
      touches.y.pressed = false
      break
  }
})
