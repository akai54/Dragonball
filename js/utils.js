function collision_joueurs({ j1, j2 }) {
  return (
    j1.attackBox.pos.x + j1.attackBox.width >= j2.attackBox.pos.x &&
    j1.attackBox.pos.x <= j2.pos.x + j2.width &&
    j1.attackBox.pos.y + j1.attackBox.height >= j2.pos.y &&
    j1.attackBox.pos.y <= j2.pos.y + j2.height &&
    j1.isAttacking
  )
}

let fin = false

function fin_jeu({ joueur, joueur2, timerId }) {
  fin = true
  clearTimeout(timerId)
  document.querySelector('#timerRes').style.display = 'flex'
  if (joueur.vie === joueur2.vie) {
    document.querySelector('#timerRes').innerHTML = 'Égalité'
    joueur.pos = { x: 360, y: 299 }
    joueur2.pos = { x: 530, y: 299 }
    joueur.switchSprite('winning')
    joueur2.switchSprite('winning')
  } else if (joueur.vie > joueur2.vie) {
    document.querySelector('#timerRes').innerHTML = 'Joueur1 a gagné'
    joueur.pos = { x: 460, y: 299 }
    joueur.switchSprite('winning')
  } else if (joueur.vie < joueur2.vie) {
    document.querySelector('#timerRes').innerHTML = 'Joueur2 a gagné'
  }
}

let timer = 100
let timerId
function dec_Timer() {
  if (timer > 0) {
    timerId = setTimeout(dec_Timer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    fin_jeu({ joueur, joueur2, timerId })
  }
}
