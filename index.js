    const canvas = document.querySelector('canvas');
    let scoreElement = document.querySelector('#scoreEl');
    let scoreGameOverElement = document.querySelector('gameOverTotal');
    const ctx = canvas.getContext('2d'); 
    const startButton = document.querySelector('startButton');
    const resetButton = document.querySelector('#resetButton')
    const gameOverScreen = document.querySelector('gameOverEl')

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

    // function reset () {
    //   enemyArray = []
    //   enemiesStillOnScreen = [];
    //   projectiles = [new Projectile(-300, -300, -5)]
    //   drawPlayer()
    // }

    class Enemy {
      constructor(x, projectiles) {
        this.xPos = x;
        this.yPos = -40;
        this.height = 35;
        this.width = 35; 
        this.projectiles = projectiles
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
            scoreElement.innerHTML = score;
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

    const projectiles = [
      new Projectile(-300, -300, -5)]

    const drawPlayer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillStyle = 'blue'
      ctx.rect(playerX, playerY, playerWidth, playerHeight);
      ctx.fill();
      ctx.closePath();
    };


    const animate = () => {

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
            playerX -= 4;
        } else if (isMovingRight && playerX + playerWidth <= canvas.width) {
            playerX += 4;
        } else if (isMovingUp && playerY >= 0) {
            playerY -= 4;
        } else if (isMovingDown && playerY + playerHeight <= canvas.height) {
            playerY += 4;
        };


        if (gameOver) {
          cancelAnimationFrame(animateId)
          gameOverEl.style.display = 'block';
          gameOverTotal.innerHTML += score;
        } else {
          animateId = requestAnimationFrame(animate) 
        }
    };
    const windowLoad = () => {
        canvas.style.display = "none"
    }

    const startGame = () => {
        document.querySelector('.title-screen').style.display = 'none';
        document.querySelector('.game-board').style.display = 'block';
        document.querySelector('#gameOverEl').style.display = 'none';
        

        animate()
    };
    
    document.getElementById('startButton').onclick = () => {
        startGame();
      };

  
    document.getElementById('resetButton').onclick = () => {
        startGame()
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