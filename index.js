
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d') 
    const startButton = document.querySelector('startButton')

    let isMovingDown = false
    let isMovingLeft = false
    let isMovingRight = false 
    let isMovingUp = false

    let playerX = 240
    let playerY = 75

    const animate = () => {
        ctx.beginPath();
        ctx.fillStyle = 'black'
        ctx.arc(playerX, playerY, 20, 0, 2 * Math.PI);
        ctx.fill()
        ctx.closePath();

        //playerX += 5
        if (isMovingLeft) {
            playerX -= 2
        } else if (isMovingRight) {
            playerX += 2
        } else if (isMovingUp) {
            playerY -= 2
        } else if (isMovingDown) {
            playerY += 2
        };

        requestAnimationFrame(animate) 
    }
   // window.onload = () => {
        //canvas.style.display = "none"

    const startGame = () =>{
        document.querySelector('.title-screen').style.display = 'none'
        document.querySelector('.game-board').style.display = 'block'

        animate()
    }
    

    document.getElementById('startButton').onclick = () => {
        startGame();
      };

      document.addEventListener('keydown', event => {
        console.log(event)
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
            isMovingUp = true
          }
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
            isMovingDown = true
          }
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
          isMovingLeft = true
        }
        if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
          isMovingRight = true
        }
        console.log({ isMovingDown, isMovingLeft, isMovingRight, isMovingUp })
      })
    
      document.addEventListener('keyup', event => {
        console.log(event)
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
            isMovingUp = false
          }
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
            isMovingDown = false
          }
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
          isMovingLeft = false
        }
        if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
          isMovingRight = false
        }
        console.log({ isMovingDown, isMovingLeft, isMovingRight, isMovingUp })
        })
    
//}