  
    const canvas = document.querySelector('canvas');
    const titleScreen = document.querySelector('.title-screen')
    const gameBoard = document.querySelector('.game-board')
    const ctx = canvas.getContext('2d'); 
    const startButton = document.querySelector('#startButton');
    const resetButton = document.querySelector('#resetButton')
    const gameOverScreen = document.querySelector('#gameOverEl')
    const playerSprite = new Image()
    playerSprite.src ='images/DurrrSpaceShip.png'
    const enemySprite = new Image()
    enemySprite.src ='images/13.png'
    let bgImg = new Image()
    bgImg.src ='images/Background_space_original.png'
    let bg1Y = 0
    let bg2Y = -canvas.height
 

    let scoreElement = document.querySelector('#scoreEl');
    let scoreGameOverElement = document.querySelector('#gameOverTotal');
  

    let score = 0;

    let isMovingDown = false;
    let isMovingLeft = false;
    let isMovingRight = false; 
    let isMovingUp = false;
    let isShooting = false;

    let playerX = 240;
    let playerY = 600;
    let playerHeight = 40;
    let playerWidth = 40;

    let gameOver = false; 
    let animateId; 

    let enemyArray = []

    function reset () {
      enemyArray = []
      projectiles = []
      drawPlayer()
    }

    class Enemy {
      constructor(x, projectiles) {
        this.xPos = x;
        this.yPos = -40;
        this.height = 35;
        this.width = 35; 
        this.projectiles = projectiles
      }
      drawEnemy() {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.drawImage(enemySprite, this.xPos, this.yPos, this.width, this.height);
        ctx.fill();
        ctx.closePath();
      };

      movement() {
        this.yPos += 7
      };

      checkCollison = () => {
      if (playerX < this.xPos + this.width &&
          playerX + playerWidth > this.xPos &&
          playerY < this.yPos + this.height &&
          playerY + playerHeight > this.yPos
          ) {
            gameOver = true;
            console.log('collision');
          }
        }

      checkEnemyCollision = () => {
        this.projectiles.forEach((projectiles) => {
        if (projectiles.positionX < this.xPos + this.width &&
            projectiles.positionX + projectiles.projWidth > this.xPos &&
            projectiles.positionY < this.yPos + this.height &&
            projectiles.positionY + projectiles.projHeight > this.yPos
            ) {
            this.xPos = -500; 
            score += 100;
            console.log('bulletCollision')
            console.log(score)
            }
        })
      } 
      }

    class Projectile {
      constructor(positionX, positionY, velocity) {
        this.positionX = positionX
        this.positionY = positionY
        this.velocity = velocity 
        this.projHeight = 5
        this.projWidth = 5
      } 

      draw() {
        ctx.beginPath();
        ctx.fillStyle = 'yellow'
        ctx.rect(this.positionX, this.positionY, this.projWidth, this.projHeight);
        ctx.fill();
        ctx.closePath();
      };

      update() {
        this.draw() 
        this.positionY += this.velocity
      }
    }

    let projectiles = [
      new Projectile(-300, -300, -8)]

    let drawPlayer = () => {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.drawImage(playerSprite, playerX, playerY, playerWidth, playerHeight);
      ctx.fill();
      ctx.closePath();
    };


    const animate = () => {
      ctx.drawImage(bgImg, 0, bg1Y, canvas.width, canvas.height)
      ctx.drawImage(bgImg, 0, bg2Y, canvas.width, canvas.height)

      bg1Y += 3;
      bg2Y += 3;

      if(bg1Y > canvas.height) {
        bg1Y = -canvas.height
      } 
      if(bg2Y > canvas.height) {
        bg2Y = -canvas.height
      }

      scoreElement.innerHTML = score;
      
      drawPlayer(); 
      projectiles.forEach((projectile) => {
        projectile.update()
      })
      
      const enemiesStillOnScreen = [];

      enemyArray.forEach(enemy => {
        enemy.drawEnemy();
        enemy.checkCollison();
        enemy.checkEnemyCollision();
        enemy.movement();
        if(enemy.yPos < canvas.height) {
          enemiesStillOnScreen.push(enemy)
        };
      });
      enemy = enemiesStillOnScreen;

      if (animateId % 125 === 0) {
      enemyArray.push(new Enemy(Math.random() * (canvas.width - 75), projectiles))
      };

        if (isMovingLeft && playerX >= 0) {
            playerX -= 6;
        } else if (isMovingRight && playerX + playerWidth <= canvas.width) {
            playerX += 6;
        } else if (isMovingUp && playerY >= 0) {
            playerY -= 6;
        } else if (isMovingDown && playerY + playerHeight <= canvas.height) {
            playerY += 6;
        };


        if (gameOver) {
          cancelAnimationFrame(animateId)
          gameOverEl.style.display = 'block';
          gameOverTotal.innerHTML = score;
        } else {
          animateId = requestAnimationFrame(animate) 
        };
    };
    const windowLoad = () => {
        gameBoard.style.display = 'none';
        gameOverScreen.style.display = 'none';
    }

    const startGame = () => {
        titleScreen.style.display = 'none';
        gameBoard.style.display = 'block';
        gameOverScreen.style.display = 'none';
        

        animate();
    };
    
    startButton.onclick = () => {
        startGame();
      };

  const resetGame = () => {
        reset();
        gameOverScreen.style.display = 'none';
        titleScreen.style.display = 'none';

        score = 0;

        isMovingDown = false;
        isMovingLeft = false;
        isMovingRight = false; 
        isMovingUp = false;
        isShooting = false;

        playerX = 240;
        playerY = 600;
        playerHeight = 40;
        playerWidth = 40;

        gameOver = false; 
        startGame()
      };
    
      document.getElementById('resetButton').onclick = () => {
        resetGame();
      };
    
      window.addEventListener('load', windowLoad)
    

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
        if (event.key === ' ' && !isShooting) {
          projectiles.push(
            new Projectile(playerX + playerWidth / 2, playerY, -5)); 
          isShooting = true
          console.log('shoot')
          };
          
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
        if (event.key === ' ') {
          isShooting = false
          };
        });
      