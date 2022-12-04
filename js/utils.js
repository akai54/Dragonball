function collision_joueurs({ j1, j2 }) {
  return (
    j1.attackBox.pos.x + j1.attackBox.width >= j2.pos.x + 10 &&
    j1.attackBox.pos.x <= j2.pos.x + j2.width &&
    j1.attackBox.pos.y + j1.attackBox.height >= j2.pos.y &&
    j1.attackBox.pos.y <= j2.pos.y + j2.height
  )
}

function collision_attackBox({ j1, j2 }) {
  return (
    j1.attackBox.pos.x + j1.attackBox.width >= j2.attackBox.pos.x &&
    j1.attackBox.pos.x <= j2.pos.x + j2.width &&
    j1.attackBox.pos.y + j1.attackBox.height >= j2.pos.y &&
    j1.attackBox.pos.y <= j2.pos.y + j2.height
  )
}

let fin = false
let play_KO = true

function fin_jeu({ joueur: joueur1, joueur2, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#timerRes').style.display = 'flex'
  if (joueur1.vie === joueur2.vie) {
    document.querySelector('#timerRes').innerHTML = 'Égalité'
    joueur1.pos = { x: 360, y: 299 }
    joueur2.pos = { x: 530, y: 299 }
    joueur1.switchSprite('winning')
    joueur2.switchSprite('winning')
  } else if (joueur1.vie > joueur2.vie) {
    if (play_KO) ko.play()
    document.querySelector('#timerRes').innerHTML = 'Joueur1 a gagné'
    joueur2.pos.y = joueur2.sprites.mort.limit
    joueur2.switchSprite('mort')
    if (joueur2.mort) {
      joueur1.pos = { x: 460, y: 299 }
      joueur1.switchSprite('winning')
    }
  } else if (joueur1.vie < joueur2.vie) {
    if (play_KO) ko.play()
    document.querySelector('#timerRes').innerHTML = 'Joueur2 a gagné'
    joueur1.pos.y = joueur1.sprites.mort.limit
    joueur1.switchSprite('mort')
    if (joueur1.mort) {
      joueur2.pos = { x: 460, y: 299 }
      joueur2.switchSprite('winning')
    }
  }
  play_KO = false
}

let timer = 300
let timerId
function dec_Timer() {
  if (timer > 0) {
    timerId = setTimeout(dec_Timer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
}
