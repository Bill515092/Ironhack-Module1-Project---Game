
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d'); 
    const startButton = document.querySelector('startButton');

    let isMovingDown = false;
    let isMovingLeft = false;
    let isMovingRight = false; 
    let isMovingUp = false;
    let isShooting = false;
    let shot = false;

    let playerX = 240;
    let playerY = 600;
    let playerHeight = 40;
    let playerWidth = 40;

    let bulletX = 100;
    let bulletY = 100;
    let bulletHeight = 20;
    let bulletWidth = 20;
    let bulletSpeedY = 4;

    let gameOver = false; 
    let animateId; 

    let enemyArray = []

    class Enemy {
      constructor(x) {
        this.xPos = x;
        this.yPos = -40;
        this.height = 35;
        this.width = 35; 
      }
      drawEnemy() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height) - blocking player asset 
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.fill();
        ctx.closePath();
      };

      movement() {
        this.yPos += 2
      };

      checkCollison = () => {
        if (playerX < this.xPos + this.width &&
          playerX + playerWidth > this.xPos &&
          playerY < this.yPos + this.height &&
          playerHeight + playerY > this.yPos
          ) {
            //collison detected. 
            //decrease health by 1. 
            //once health is 0. Game Over.
            gameOver = true;
            console.log('collision');
          }
        }
    };

    const drawPlayer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillStyle = 'blue'
      ctx.rect(playerX, playerY, playerWidth, playerHeight);
      ctx.fill();
      ctx.closePath();
    };

    const drawBullet = () => {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillStyle = 'pink';
      ctx.rect(bulletX, bulletY, bulletWidth, bulletHeight);
      ctx.fill();
      ctx.closePath();
    };

    const bulletShoot = () => {
      if (isShooting && shot == false) {
        bulletX = playerX + playerHeight / 2 - bulletWidth / 2;
        bulletY = playerY - bulletHeight;
        shot = true; 
      }
      if (isShooting && shot == true) {
        bulletY -= bulletSpeedY
      }
      if (bulletY < 0) {
        shot = false;
        isShooting = false;
      }
      if (shot == false && isShooting == false) {
        bulletX = 0;
        bulletY = 0;
      }
    };
  
    const animate = () => {

      drawPlayer(); 
      drawBullet();

      const enemiesStillOnScreen = [];

      enemyArray.forEach(enemy => {
        enemy.drawEnemy();
        enemy.checkCollison();
        enemy.movement();
        if(enemy.yPos < canvas.height) {
          enemiesStillOnScreen.push(enemy)
        };
      });
      enemy = enemiesStillOnScreen;

      if (animateId % 125 === 0) {
      enemyArray.push(new Enemy(Math.random() * (canvas.width - 35)))
      };
     

        if (isMovingLeft) {
            playerX -= 4;
        } else if (isMovingRight) {
            playerX += 4;
        } else if (isMovingUp) {
            playerY -= 4;
        } else if (isMovingDown) {
            playerY += 4;
        };

        bulletShoot(); 


        if (gameOver) {
          cancelAnimationFrame(animateId)
        } else {
          animateId = requestAnimationFrame(animate) 
        }

        
    };
   // window.onload = () => {
        //canvas.style.display = "none"

    const startGame = () =>{
        document.querySelector('.title-screen').style.display = 'none';
        document.querySelector('.game-board').style.display = 'block';

        animate()
    };
    

    document.getElementById('startButton').onclick = () => {
        startGame();
      };

      document.addEventListener('keydown', event => {
        console.log(event)
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
            isMovingUp = true
          };
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
            isMovingDown = true
          };
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
          isMovingLeft = true
          };
        if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
          isMovingRight = true
          };
        if (event.key === '32') {
          isShooting = true
          };
          console.log('shoot')
        //console.log({ isMovingDown, isMovingLeft, isMovingRight, isMovingUp })
      });
    
      document.addEventListener('keyup', event => {
        console.log(event)
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
            isMovingUp = false
          };
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
            isMovingDown = false
          };
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
          isMovingLeft = false
          };
        if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
          isMovingRight = false
          };
        if (event.key === '32') {
          isShooting = false
          };
          //console.log('shoot')
        //console.log({ isMovingDown, isMovingLeft, isMovingRight, isMovingUp })
        });
    
//}