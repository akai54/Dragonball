const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Taille de la fenetre.
canvas.width = 1024
canvas.height = 576

// Changer la couleur du fond de la fenetre.
c.fillRect(0, 0, canvas.width, canvas.height)
