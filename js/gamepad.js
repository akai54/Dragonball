let g1 = false
let g2 = false

const pad = {
  p1: {
    a: {
      pressed: false,
    },
    b: {
      pressed: false,
    },
    x: {
      pressed: false,
    },
    y: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
    down: {
      pressed: false,
    },
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    l1: {
      pressed: false,
    },
    r1: {
      pressed: false,
    },
    l2: {
      pressed: false,
    },
    r2: {
      pressed: false,
    },
  },
  p2: {
    a: {
      pressed: false,
    },
    b: {
      pressed: false,
    },
    x: {
      pressed: false,
    },
    y: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
    down: {
      pressed: false,
    },
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    l1: {
      pressed: false,
    },
    r1: {
      pressed: false,
    },
    l2: {
      pressed: false,
    },
    r2: {
      pressed: false,
    },
  },
}

window.addEventListener('gamepadconnected', (e) => {
  console.log(e)
})

function setGamepads() {
  let gamepads = navigator.getGamepads()
  if (gamepads[0]) {
    g1 = true
  }
  if (gamepads[1]) {
    g2 = true
  }
  return gamepads
}

function gamepadInput() {
  if (!g1 && !g2) gamepadList = setGamepads()
  if (g1) {
    pad.p1.a.pressed = gamepadList[0].buttons[0].pressed
    pad.p1.b.pressed = gamepadList[0].buttons[1].pressed
    pad.p1.x.pressed = gamepadList[0].buttons[2].pressed
    pad.p1.y.pressed = gamepadList[0].buttons[3].pressed
    pad.p1.l1.pressed = gamepadList[0].buttons[4].pressed
    pad.p1.r1.pressed = gamepadList[0].buttons[5].pressed
    pad.p1.l2.pressed = gamepadList[0].buttons[6].pressed
    pad.p1.r2.pressed = gamepadList[0].buttons[7].pressed
    pad.p1.up.pressed = gamepadList[0].buttons[12].pressed
    pad.p1.down.pressed = gamepadList[0].buttons[13].pressed
    pad.p1.left.pressed = gamepadList[0].buttons[14].pressed
    pad.p1.right.pressed = gamepadList[0].buttons[15].pressed
  }
  if (g2) {
    pad.p2.a.pressed = gamepadList[0].buttons[0].pressed
    pad.p2.b.pressed = gamepadList[0].buttons[1].pressed
    pad.p2.x.pressed = gamepadList[0].buttons[2].pressed
    pad.p2.y.pressed = gamepadList[0].buttons[3].pressed
    pad.p2.l1.pressed = gamepadList[0].buttons[4].pressed
    pad.p2.r1.pressed = gamepadList[0].buttons[5].pressed
    pad.p2.l2.pressed = gamepadList[0].buttons[6].pressed
    pad.p2.r2.pressed = gamepadList[0].buttons[7].pressed
    pad.p2.up.pressed = gamepadList[1].buttons[12].pressed
    pad.p2.down.pressed = gamepadList[1].buttons[13].pressed
    pad.p2.left.pressed = gamepadList[1].buttons[14].pressed
    pad.p2.right.pressed = gamepadList[1].buttons[15].pressed
  }
}

function gamepadActions() {
  if (pad.p1.x.pressed) {
    goku1.play()
    joueur1.attack()
    joueur1.lastpad = 'x'
    joueur1.force--
  }
  if (pad.p1.y.pressed) {
    goku2.play()
    joueur1.attack()
    joueur1.lastpad = 'y'
    joueur1.force--
  }
  if (pad.p1.b.pressed) {
    goku3.play()
    joueur1.attack()
    joueur1.lastpad = 'b'
    joueur1.force--
  }
  if (pad.p1.up.pressed) {
    joueur1.lastpad = 'up'
    if (!fin) {
      joueur1.fly()
      return
    }
  }
  if (pad.p1.down.pressed) {
    joueur1.lastpad = 'down'
    if (!fin) {
      joueur1.descendre()
      return
    }
  }
  if (pad.p1.l1.pressed) {
  }
  if (pad.p1.r1.pressed) {
    joueur1.lastpad = 'r1'
    if (joueur1.force < 100) joueur1.force++
  }
  if (pad.p1.l2.pressed) {
    if (joueur1.lastpad !== 'l2') gokuBlock.play()
    joueur1.lastpad = 'l2'
    joueur1.isBlocking = true
    joueur1.force--
  }
  if (pad.p1.r2.pressed) {
    joueur1.attack()
  }
}

function gamepadDone() {
  if (pad.p1.x.pressed) {
    joueur1.isAttacking = false
  }
  if (pad.p1.y.pressed) {
    joueur1.isAttacking = false
  }
  if (pad.p1.b.pressed) {
    joueur1.isAttacking = false
  }
  if (pad.p1.up.pressed) {
    joueur1.lastpad = 'up'
    if (!fin) {
      joueur1.fly()
      return
    }
  }
  if (pad.p1.down.pressed) {
    joueur1.lastpad = 'down'
    if (!fin) {
      joueur1.descendre()
      return
    }
  }
  if (pad.p1.l1.pressed) {
  }
  if (pad.p1.r1.pressed) {
    joueur1.lastpad = 'r1'
    if (joueur1.force < 100) joueur1.force++
  }
  if (pad.p1.l2.pressed) {
    if (joueur1.lastpad !== 'l2') gokuBlock.play()
    joueur1.lastpad = 'l2'
    joueur1.isBlocking = true
    joueur1.force--
  }
  if (pad.p1.r2.pressed) {
    joueur1.attack()
  }
}
