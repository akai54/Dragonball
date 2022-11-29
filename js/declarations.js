const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Taille de la fenêtre.
canvas.width = 1024
canvas.height = 576

// Changer la couleur du fond de la fenêtre.
c.fillRect(0, 0, canvas.width, canvas.height)

//Musique Jeu.
const dbz_music = document.createElement('audio')
dbz_music.src = './ressources/sounds/musics/DBZ_theme.ogg'
const dbz_menu = document.createElement('audio')
dbz_menu.src = './ressources/sounds/musics/DBZ_overTheGalaxy.ogg'
const ko = document.createElement('audio')
ko.src = './ressources/sounds/effects/DBZ_KO.ogg'
const fight_banner = document.createElement('audio')
fight_banner.src = './ressources/sounds/effects/DBZ_FIGHT.ogg'

//Audio GOKU.
const gokuBlock = document.createElement('audio')
gokuBlock.src = './ressources/sounds/voices/goku/gokuBlock.ogg'
const goku1 = document.createElement('audio')
goku1.src = './ressources/sounds/voices/goku/gokuHandAttack.ogg'
const goku2 = document.createElement('audio')
goku2.src = './ressources/sounds/voices/goku/gokuJumpKick.ogg'
const goku3 = document.createElement('audio')
goku3.src = './ressources/sounds/voices/goku/gokuRushAttack.ogg'
const gokuHit = document.createElement('audio')
gokuHit.src = './ressources/sounds/voices/goku/gokuTouchedPropels.ogg'

//Audio VEGETA.
const vegetaHit = document.createElement('audio')
vegetaHit.src = './ressources/sounds/voices/vegeta/6.wav'
const vegeta1 = document.createElement('audio')
vegeta1.src = './ressources/sounds/voices/vegeta/34.wav'
const vegeta2 = document.createElement('audio')
vegeta2.src = './ressources/sounds/voices/vegeta/35.wav'
const vegeta3 = document.createElement('audio')
vegeta3.src = './ressources/sounds/voices/vegeta/36.wav'
const vegetaBlock = document.createElement('audio')
vegetaBlock.src = './ressources/sounds/voices/vegeta/19.wav'

const gravity = 0.8
let gameStarted = false
let startTimer = false
let menu = true
