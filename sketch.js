let mon; // Playable character
let monIdle; // Playable character idle.
let monWalk; // Playable character walking.

// Variables for the NPCs.
let npc1; let npc1idle;
let npc2; let npc2idle;
let npc3; let npc3idle;
let clown; let clownIdle;

let music; // Variable to load the music.
let outcome; // Variable that generates a random value between 1-10. This is to determine the outcome of each game.
let popp = 0; // The number of balloons that's popped. Originally exclusive to the "balloon pop" game, but I decided to also use it for "basketball" so I could get the points system to work.
let blink = 0; // Makes a result blink just to show if an outcome has been repeated.
let bScore = 0; // Basketball score.
let speed = []; // Speed for the horses.
let x = [];
let score = 0; // Your overall score.
let darts = 12; // Number of darts for Balloon Pop.
let basketballs = 20; // Number of basketballs.
let ride; // Variable for the class "RidesList."
let fS; // Variable for the "Food" class.

// Class variables for each game.
let bP; let bB; let hR;

// Variables for each ride. This is so that spending points on each ride would function properly.
let r1; let r2; let r3; let r4; let r5;

let scene = 1; // Variable used to change scenes. Reference: https://youtu.be/IWyPwbt5ZrA

// Displays the images and sprites.
function preload() {
  // Loads the music.
  music = loadSound("Menu - Carnival Games OST.mp3");
  
  // Sprite sheets for each character.
  monIdle = loadSpriteSheet("Pink_Monster_Idle_4.png", 128 / 4, 32, 4);
  monWalk = loadSpriteSheet("Pink_Monster_Walk_6.png", 192 / 6, 32, 6);
  npc1idle = loadSpriteSheet("ChikBoy_idle.png", 32, 192 / 6, 6);
  npc2idle = loadSpriteSheet("Idle (32 x 32).png", 160 / 5, 32, 5);
  npc3idle = loadSpriteSheet("Knight 64x64.png", 512 / 8, 704 / 11, 8);
  bobIdle = loadSpriteSheet("Bob.gif", 190, 190, 1);
  clownIdle = loadSpriteSheet("Clown-Idle.gif", 64, 64, 1);
  
  // Sprite sheets for each horse.
  horse1idle = loadSpriteSheet("Horse Idle Brown.png", 128, 127, 1);
  horse1run = loadSpriteSheet("Horse Gallop Brown.png", 768/6, 120, 6);
  
  horse2idle = loadSpriteSheet("Horse Idle Black.png", 128, 127, 1);
  horse2run = loadSpriteSheet("Horse Gallop Black.png", 768/6, 130, 6);
  
  horse3idle = loadSpriteSheet("Horse Idle Gold.png", 128, 127, 1);
  horse3run = loadSpriteSheet("Horse Gallop Gold.png", 768/6, 122, 6);
  
  horse4idle = loadSpriteSheet("Horse Idle Gray.png", 128, 127, 1);
  horse4run = loadSpriteSheet("Horse Gallop Gray.png", 768/6, 120, 6);
  
  cR = loadImage("CarnivalRides.png");
  merry = loadImage("merryGoRound.gif");
  ferris = loadImage("ferrisWheel.gif");
  ty = loadImage("Typhoon.gif");
  rCoaster = loadImage("roller_coaster.gif");
  tent = loadImage("carnival_tent.png");
  hoop = loadImage("basketball-goal.png");
  dStand = loadImage("Darts Game.png");
  bStand = loadImage("Basketball Stand.png");
  flag = loadImage("Flag.png");
  food = loadImage("Food.png");
  fStand = loadImage("Food Stand.png");
  circus = loadImage("Circus.jpg");
  juggle = loadImage("Juggling.gif");
} // Variables for each image.
let hoop; let tent; let cR; let juggle;
let merry; let ferris; let ty; let rCoaster;
let dStand; let bStand; let flag; let circus; let cc;
let food; let fStand; let bob; let bobIdle;

// Variables for the horse sprites.
let horse1; let horse2; let horse3; let horse4;
let horse1idle; let horse2idle; let horse3idle; let horse4idle;
let horse1run; let horse2run; let horse3run; let horse4run;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  // Plays the music.
  music.play();
  
  bP = new BalloonPop();
  bB = new Basketball();
  hR = new HorseRace();
  
  fS = new Food();
  cc = new Circus();

  ride = new RidesList();

  // Randomizes the speed for each horse.
  // Source: https://editor.p5js.org/adamcstephens/sketches/-HYpzMa1i
  for (let i = 0; i < 5; i++) {
    speed[i] = random(1, 2);
    x[i] = 0;
  }

  mon = createSprite(width / 2, width / 1.75, 50, 50);
  mon.addAnimation("Pink_Monster_Idle_4.png", monIdle);
  mon.addAnimation("Pink_Monster_Walk_6.png", monWalk);
  mon.setCollider("rectangle", 0, 0, 32, 32);

  npc1 = createSprite(width / 4, width / 1.77, 50, 50);
  npc1.addAnimation("ChikBoy_idle.png", npc1idle);
  npc1.setCollider("rectangle", 0, 0, 8, 24);

  npc2 = createSprite(width / 2, width / 1.77, 50, 50);
  npc2.mirrorX(-1);
  npc2.addAnimation("Idle (32 x 32).png", npc2idle);
  npc2.setCollider("rectangle", 0, 0, 8, 32);

  npc3 = createSprite(width - width / 4, width / 1.77, 50, 50);
  npc3.mirrorX(-1);
  npc3.addAnimation("Knight 64x64.png", npc3idle);
  npc3.setCollider("rectangle", 0, 0, 8, 64);
  
  horse1 = createSprite(100, height - 400, 200, 150);
  horse1.addAnimation("Horse Idle Brown.png", horse1idle);
  horse1.addAnimation("Horse Gallop Brown.png", horse1run);
  
  horse2 = createSprite(100, height - 300, 200, 150);
  horse2.addAnimation("Horse Idle Black.png", horse2idle);
  horse2.addAnimation("Horse Gallop Black.png", horse2run);
  
  horse3 = createSprite(100, height - 200, 200, 150);
  horse3.addAnimation("Horse Idle Gold.png", horse3idle);
  horse3.addAnimation("Horse Gallop Gold.png", horse3run);
  
  horse4 = createSprite(100, height - 100, 200, 150);
  horse4.addAnimation("Horse Idle Gray.png", horse4idle);
  horse4.addAnimation("Horse Gallop Gray.png", horse4run);
  
  bob = createSprite(100, width / 1.75, 50, 50);
  bob.addAnimation("Bob.gif", bobIdle);
  
  clown = createSprite(150, width / 1.8, 50, 50);
  clown.addAnimation("Clown-Idle.gif", clownIdle);

  textFont("Paytone One"); // Font taken from Google Fonts. Source: https://youtu.be/wfX8Z0D2aDw
  textSize(width / 50);
}

function draw() {
  background(185, 100, 100);
  noStroke();
  
  scenes();
  
  highScore(score); // Displays your current score on the top right of the canvas.
  
  if (scene == 1 || scene == 2 || scene == 3 || scene == 4) {
    drawSprite(mon);
    mon.scale = width / 350;
    moveMon();
  }

  blink++; // Makes a result blink just to show if an outcome has been repeated.
}

// The function where all of the scenes take place.
function scenes() {
  // Scene 1 is the main hub, the very first scene in the game.
  if (scene == 1) {
    mainHub();
    drawSprite(bob);
    bob.scale = width/1500;
    if (mon.position.x > width) {
      mon.position.x = 0;
      scene = 2;
    }
    if (mon.position.x < 0) {
      mon.position.x = width;
      scene = 3;
    }
    
    if(mon.overlap(bob)){
      fill("black");
      text("You want some food and drinks?\n(Press Y to say yes)", 40, 150);
    }
    
    if (mon.position.x >= width/2 - 75 && mon.position.x <= width/2 + 75) {
      fill("black");
      text("Press E to enter the tent.", 40, 150);
      if (key == "e") {
        scene = 4;
      }
    }
  }
  
  // Scenes for the food stand.
  if (scene == 1.1) {
    fS.show1();
  }
  if (scene == 1.2) {
    fS.show2();
  }
  
  // If the character moves all the way to the right, the game will switch to scene 2, where all of the carnival games take place.
  if (scene == 2) {
    games();

    drawSprite(npc1);
    npc1.scale = width / 300;
    drawSprite(npc2);
    npc2.scale = width / 300;
    drawSprite(npc3);
    npc3.scale = width / 300;

    fill("black");
    if (mon.overlap(npc1)) {
      text("Hey you! Do you have what it takes to pop every balloon?\n(Press Y to play)", 40, 150);
    }
    if (mon.overlap(npc2)) {
      text("Basketball is a lot of fun! Wanna shoot some hoops???\n(Press Y to play)",40,150);
    }
    if (mon.overlap(npc3)) {
      text("We got some really skilled horses racing against each other.\nCare to bet who wins?\n(Press Y to play)", 40, 150);
    }

    if (mon.position.x < 0) {
      scene = 1;
    }
    if (mon.position.x > width) {
      mon.position.x = width;
    }
  }

  // Scenes 2.1-2.3 are the carnival games.
  if (scene == 2.1) {
    bP.show();
  }
  if (scene == 2.2) {
    bB.show();
  }
  if (scene == 2.3) {
    hR.show();
  }

  // To the left of the main hub is scene 3, the place where you choose which ride to go on.
  if (scene == 3) {
    rides();
    rideDeterminer();
    if (mon.position.x > width) {
      scene = 1;
    }
    if (mon.position.x < 0) {
      mon.position.x = 0;
    }
  }

  // Scenes 3.1-3.4 are the rides.
  if (scene == 3.1) {
    ride.merryGoRound();
  }
  if (scene == 3.2) {
    ride.ferrisWheel();
  }
  if (scene == 3.3) {
    ride.typhoon();
  }
  if (scene == 3.4) {
    ride.rollerCoaster();
  }
  
  if (scene == 4) {
    cc.show1();
    drawSprite(clown);
    clown.mirrorX(-1);
    clown.scale = width / 300;
    if(mon.overlap(clown)){
      blink = 0;
      stroke("black")
      strokeWeight(2);
      fill("lightgray");
      text("You want to watch our circus performance? It's only 20 points.\n(Press Y to say yes)", 40, 150);
      if (key == "y" && score < 20 && blink < 200) {
        text("You don't have enough points!", 40, 200);
      }
    }
  }
  if (scene == 4.1) {
    cc.show2();
  }
}

// Function dedicated to displaying the user's current score.
function highScore(points = 0) {
  if(scene == 4 || scene == 4.1) {
    stroke("black")
    strokeWeight(2);
    fill("lightgray");
    text("Points: " + points, width - 100, 30);
  }
  else {
    fill("black");
    text("Points: " + points, width - 100, 30);
  }
}

// Function that creates the very first page/scene of the sketch.
function mainHub() {
  text(
    "Welcome to the carnival! \nTo the right are some games that you can play to earn points. \nTo the left are different rides. Earn enough points to spend on each ride. \nWhere would you like to go?",
    40,
    40
  );
  fill(120, 100, 100);
  rectMode(CORNER);
  rect(0, height / 1.5, width, height);
  image(tent, width / 4, height / 4, width / 2, height / 2);
  image(fStand, 30, height / 1.9, width / 5, height / 5)
}

// Class for the food stand.
class Food {
  constructor() {}
  
  show1() {
    text(
    "That'll be 10 points each. What would you like to order?\n1. Popcorn\n2. French Fries\n3. Hot Dog\n4. Soda\n\nPress G to go back.\nPress S to steal.",
    40,
    40
  );
    fill(0, 100, 100);
    rectMode(CORNER);
    rect(0, height / 1.4, width, height);
    image(food, width / 4, height / 2.25, width / 2, height / 2);
    
    if (key == 1 || key == 2 || key == 3 || key == 4) {
      if (score < 10 && blink < 151) {
        fill("black");
        text("Sorry. You don't have enough points.", width/3, 170);
      }
      else if (score >= 10 && blink < 151) {
        fill("black");
        text("Mmm that was delicious!", width/3, 170);
        if (blink == 150){
          score -= 10;
        }
      }
    }
  }
  
  show2() {
    text("You got kicked out of the carnival. Next time, don't steal!", 40, 40);
    push();
    textSize(width / 6);
    text("GAME\nOVER", width / 4, height / 2.25);
    pop();
  }
}

// Class for the circus scene.
class Circus {
  constructor() {}
  
  show1() {
    image(circus, -width/2, 0, width*2, height);
    stroke("black")
    strokeWeight(2);
    fill("lightgray");
    text("Press G to go back outside.", 40, 40);
    
  }
  
  show2() {
    cc.show1();
    image(juggle, width/2.75, height/3.45, 365/2.5, 498/2.5);
  }
}

// Function that displays the template for scene 2.
function games() {
  text("Interact with any of the NPCs to play their games.", 40, 40);
  fill(120, 100, 100);
  rectMode(CORNER);
  rect(0, height / 1.5, width, height);
  image(dStand, width / 8, height / 2.5, width / 4, height / 3);
  image(bStand, width / 3, height / 2.66, width / 3, height / 2.5);
  image(flag, width / 1.5, height / 2, width / 4.5, height / 4);
}

// Function that displays the template for scene 3.
function rides() {
  text(
    "Which ride would you like to go on? (Press keys 1-4)\n\n1. Merry Go Round (25 Points)\n2. Ferris Wheel (50 Points)\n3. Typhoon (75 Points)\n4. Roller Coaster (100 Points)", 40, 40);
  fill(120, 100, 100);
  rectMode(CORNER);
  rect(0, height / 1.5, width, height);
  image(cR, width / 6, height / 6, width / 1.55, height / 1.5);
}

// Moves the character. Learned from one of the class demos:
// https://editor.p5js.org/adamcstephens/sketches/FlCsPJF3L
function moveMon() {
  if (keyDown(LEFT_ARROW)) {
    mon.changeAnimation("Pink_Monster_Walk_6.png");
    mon.mirrorX(-1);
    if (mon.position.x < 0) {
      mon.position.x = width;
    } else {
      mon.position.x -= 4.5;
    }
  } else if (keyDown(RIGHT_ARROW)) {
    mon.changeAnimation("Pink_Monster_Walk_6.png");

    mon.mirrorX(1);

    if (mon.position.x > width) {
      mon.position.x = 0;
    } else {
      mon.position.x += 4.5;
    }
  } else {
    mon.changeAnimation("Pink_Monster_Idle_4.png");
  }

  // The conditionals below will make the NPCs change positions so that they will always face the playable character.
  if (mon.position.x < width / 4) {
    npc1.mirrorX(-1);
  } else {
    npc1.mirrorX(1);
  }
  if (mon.position.x < width / 2) {
    npc2.mirrorX(-1);
  } else {
    npc2.mirrorX(1);
  }
  if (mon.position.x < width - width / 4) {
    npc3.mirrorX(-1);
  } else {
    npc3.mirrorX(1);
  }
}

// In order to make the balloons disappear, I decided to make an array variable for each balloon representing their transparecny. These arrays are placed in the last parameter of each balloon. So if the user "pops" a balloon, then the transparency will be 0 to make it appear that the balloon is gone.
let bL = [1, 1, 1, 1, 1, 1];

// Class dedicated to the "balloon pop" game.
class BalloonPop {
  constructor() {
    this.color1 = 120;
    this.color2 = 0;
    this.x1 = 0;
    this.y1 = height / 1.4;
    this.x2 = width / 2;
    this.y2 = height / 2 + 50;
  }

  // Cursor that I made specifically for this game
  curs() {
    line(mouseX - 5, mouseY, mouseX + 5, mouseY);
    line(mouseX, mouseY - 5, mouseX, mouseY + 5);
  }

  show() {
    text(
      "You have 12 darts. Click on any of the balloons in order to pop them. \nYou have a 50% chance of popping each balloon. \nPop every balloon and you'll earn 20 points. \nWhat would you like to do? \n(G)o Back\n\nDarts left: " + darts,
      40,
      40
    );
    if (key == 1 || key == "p" || key == "y") {
      fill(this.color1, 100, 100);
      rectMode(CORNER);
      rect(this.x1, this.y1, width, height);
      fill(this.color2, 100, 100);
      rectMode(CENTER);
      rect(this.x2, this.y2, width / 1.5, height / 2);

      // The code will detect if your cursor is on the balloons.
      // Source: https://youtu.be/Spg0ct-zsro
      if (
        dist(mouseX, mouseY, width / 3.5, height / 2.6 + 50) < 50 &&
        darts > 0
      ) {
        fill(60, 100, 100, bL[0]);
        // If you click to throw a dart on any of the balloons, then there is a 50/50 chance of you making the shot based on the random value from the "outcome" variable.
        if (
          outcome >= 1 &&
          outcome <= 5 &&
          mouseIsPressed == true &&
          bL[0] == 1
        ) {
          popp++;
          bL[0] = 0;
        }
      } else {
        fill(60, 100, 100, bL[0]);
      }
      ellipse(width / 3.5, height / 2.6 + 50, 100);

      if (
        dist(mouseX, mouseY, width / 2, height / 2.6 + 50) < 50 &&
        darts > 0
      ) {
        fill(175, 100, 100, bL[1]);
        if (
          outcome >= 1 &&
          outcome <= 5 &&
          mouseIsPressed == true &&
          bL[1] == 1
        ) {
          popp++;
          bL[1] = 0;
        }
      } else {
        fill(175, 100, 100, bL[1]);
      }
      ellipse(width / 2, height / 2.6 + 50, 100);

      if (
        dist(mouseX, mouseY, width / 1.4, height / 2.6 + 50) < 50 &&
        darts > 0
      ) {
        fill(300, 100, 100, bL[2]);
        if (
          outcome >= 1 &&
          outcome <= 5 &&
          mouseIsPressed == true &&
          bL[2] == 1
        ) {
          popp++;
          bL[2] = 0;
        }
      } else {
        fill(300, 100, 100, bL[2]);
      }
      ellipse(width / 1.4, height / 2.6 + 50, 100);

      if (
        dist(mouseX, mouseY, width / 3.5, height / 1.6 + 50) < 50 &&
        darts > 0
      ) {
        fill(90, 100, 100, bL[3]);
        if (
          outcome >= 1 &&
          outcome <= 5 &&
          mouseIsPressed == true &&
          bL[3] == 1
        ) {
          popp++;
          bL[3] = 0;
        }
      } else {
        fill(90, 100, 100, bL[3]);
      }
      ellipse(width / 3.5, height / 1.6 + 50, 100);

      if (
        dist(mouseX, mouseY, width / 2, height / 1.6 + 50) < 50 &&
        darts > 0
      ) {
        fill(45, 100, 100, bL[4]);
        if (
          outcome >= 1 &&
          outcome <= 5 &&
          mouseIsPressed == true &&
          bL[4] == 1
        ) {
          popp++;
          bL[4] = 0;
        }
      } else {
        fill(45, 100, 100, bL[4]);
      }
      ellipse(width / 2, height / 1.6 + 50, 100);

      if (
        dist(mouseX, mouseY, width / 1.4, height / 1.6 + 50) < 50 &&
        darts > 0
      ) {
        fill(215, 100, 100, bL[5]);
        if (
          outcome >= 1 &&
          outcome <= 5 &&
          mouseIsPressed == true &&
          bL[5] == 1
        ) {
          popp++;
          bL[5] = 0;
        }
      } else {
        fill(215, 100, 100, bL[5]);
      }
      ellipse(width / 1.4, height / 1.6 + 50, 100);
    }

    if (
      bL[0] == 0 &&
      bL[1] == 0 &&
      bL[2] == 0 &&
      bL[3] == 0 &&
      bL[4] == 0 &&
      bL[5] == 0 &&
      mouseIsPressed == true &&
      popp < 10
    ) {
      popp += 10;
      score += 20;
    }

    // If every balloon is popped, you earn 20 points.
    if (
      bL[0] == 0 &&
      bL[1] == 0 &&
      bL[2] == 0 &&
      bL[3] == 0 &&
      bL[4] == 0 &&
      bL[5] == 0
    ) {
      fill("black");
      text("Congratulations! You earn 20 points!", width / 3.5, height / 4);
      text("(P)lay again or (G)o back?", width / 3, height / 3.5);
    }

    // If you run out of darts and failed to pop every balloon, you lose 5 points.
    if (darts == 0) {
      fill("black");
      text("You've run out of darts.", width / 2.9, height / 4);
      text("(P)lay again or (G)o back?", width / 3, height / 3.5);
    }
    if (darts == 0 && mouseIsPressed == true && popp < 10) {
      score -= 5;
      popp += 10;
    }

    push(); // This is to make the cursor visible.
    stroke("black");
    this.curs();
    pop();
  }
}

// Class dedicated to the "basketball" game.
class Basketball {
  constructor() {
    this.color1 = 185;
    this.color2 = "black";
    this.x = 0;
    this.y = height / 1.5;
    this.size = width / 5;
  }

  // Function dedicated to displaying the basketball hoop.
  hoop() {
    fill(this.color1, 100, 100);
    rectMode(CORNER);
    rect(this.x, this.y, width, height);
    image(hoop, width / 5, height / 4.5, width / 1.7, height / 1.3);
    fill(this.color2);

    // Displays the basketball score.
    push();
    if (bScore < 10) {
      textSize(this.size);
      text("0" + bScore, width / 2.85, height / 2);
    } else {
      textSize(this.size);
      text(bScore, width / 2.6, height / 2);
    }
    pop();
  }

  show() {
    text(
      "You have 20 basketballs.\nShoot up to 10 basketballs into the hoop to earn 15 points.\n(S)hoot basketball\n(G)o back\n\nBasketballs: " + basketballs,
      40,
      40
    );
    // If you press "2" from the main menu, then this generates a new scene displaying a basketball hoop. If you shoot every hoop and want to (P)lay again, then this scene regenerates.
    if (key == 2 || key == "p" || key == "y") {
      this.hoop();
    }
    // If you (S)hoot a basketball, then there is a 50/50 chance of you making the shot based on the random value from the "outcome" variable.
    if (key == "s" && bScore <= 25) {
      if (outcome >= 1 && outcome <= 5) {
        this.hoop();
      } else {
        fill(this.color2);
        if (blink > 5) {
          if (blink < 100) {
            text("You missed!", width / 2.4, height / 6);
          }
        }
        this.hoop();
      }
    }
    // If the basketball game reaches 10 points, then it stays at 10 until you (P)lay again or (G)o back to the main menu.
    if (bScore > 10) {
      bScore = 10;
    }

    if (key == "s" && bScore == 10) {
      text(
        "Congratulations! (P)lay again or (G)o back?",
        width / 3.5,
        height / 6
      );
      this.hoop();
    }

    // If you shoot 10 hoops, then you earn 15 points.
    if (key == "s" && bScore == 10 && popp < 10) {
      score += 15;
      popp += 10;
    }

    if (key == "s" && basketballs == 0 && bScore < 10 && popp < 10) {
      score -= 5;
      if (score < 0) {
        score = 0; // If your current score is 0 but you lose points, then the score will remain 0. This is so that the score won't go into the negatives.
      }
      popp += 10;
    }

    // If you run out of darts before shooting 10 hoops, then you lose 5 points.
    if (basketballs == 0 && bScore < 10) {
      fill("black");
      text(
        "You've run out of basketballs. You lose 5 points",
        width / 4,
        height / 6.25
      );
      text("(P)lay again or (G)o back?", width / 3, height / 5.25);
    }
  }
}

let h; // This variable is made so that the score for the horse race would change depending on the outcome.
// Class dedicated to the "horse race" game.
class HorseRace {
  constructor() {
    this.color = "black";
  }

  // Function for the "a," "b," "c," and "d" text.
  horseSelection() {
    background(120, 100, 100);
    fill(this.color);
    text("(A)", 25, height - 400);
    text("(B)", 25, height - 300);
    text("(C)", 25, height - 200);
    text("(D)", 25, height - 100);
  }

  // Function for the image of each horse.
  horseImages() {
    drawSprite(horse1);
    drawSprite(horse2);
    drawSprite(horse3);
    drawSprite(horse4);
  }

  show() {
    // If you press "3" from the main menu, then this generates a new scene showing a horse race. You only get 1 try but you can restart if you (P)lay again.
    if (key == 3 || key == "p" || key == "y") {
      this.horseSelection();
      this.horseImages();
    } else if (key == "a" || key == "b" || key == "c" || key == "d") {
      this.horseSelection();
      // Randomly generates how fast each horse goes based on the "speed" variable. The horses will also have a running animation when this happens.
      for (let i = 0; i < speed.length; i++) {
        this.horseImages();
        horse1.changeAnimation("Horse Gallop Brown.png");
        horse1.position.x += x[0]/1000;
        
        horse2.changeAnimation("Horse Gallop Black.png");
        horse2.position.x += x[1]/1000;
        
        horse3.changeAnimation("Horse Gallop Gold.png");
        horse3.position.x += x[2]/1000;
        
        horse4.changeAnimation("Horse Gallop Gray.png");
        horse4.position.x += x[3]/1000;
        x[i] += speed[i];
      }
    }

    // If the horse you bet on wins, then a message will pop up saying congratulations and you earn 40 points. If the horse you bet on loses, then a different message will pop up and you lose 10 points.
    if (
      key == "a" &&
      x[0] > width &&
      x[0] > x[1] &&
      x[0] > x[2] &&
      x[0] > x[3]
    ) {
      fill(this.color);
      text(
        "Congratulations! You earn 40 points.\n(P)lay again or (G)o back?",
        width / 3.5,
        height / 5
      );
      h = width;
    } else if (
      key == "b" &&
      x[1] > width &&
      x[1] > x[0] &&
      x[1] > x[2] &&
      x[1] > x[3]
    ) {
      fill(this.color);
      text(
        "Congratulations! You earn 40 points.\n(P)lay again or (G)o back?",
        width / 3.5,
        height / 5
      );
      h = width;
    } else if (
      key == "c" &&
      x[2] > width &&
      x[2] > x[1] &&
      x[2] > x[0] &&
      x[2] > x[3]
    ) {
      fill(this.color);
      text(
        "Congratulations! You earn 40 points.\n(P)lay again or (G)o back?",
        width / 3.5,
        height / 5
      );
      h = width;
    } else if (
      key == "d" &&
      x[3] > width &&
      x[3] > x[1] &&
      x[3] > x[2] &&
      x[3] > x[0]
    ) {
      fill(this.color);
      text(
        "Congratulations! You earn 40 points.\n(P)lay again or (G)o back?",
        width / 3.5,
        height / 5
      );
      h = width;
    } else {
      fill(this.color);
      if (x[0] > width || x[1] > width || x[2] > width || x[3] > width) {
        text(
          "Your horse lost. You lose 10 points.\n(P)lay again or (G)o back?",
          width / 3.5,
          height / 5
        );
        h = -1;
      }
    }
    text(
      "Pick a horse to bet on.\nIf your chosen horse wins, then you earn 40 points.\nLose and you lose 10 points. Which horse do you choose?\n(G)o back",
      40,
      40
    );
  }
}

function keyPressed() {
  // For each game selection.
  if (mon.overlap(npc1) && scene == 2) {
    if (key == "y") {
      scene = 2.1;
    }
  }
  if (mon.overlap(npc2) && scene == 2) {
    if (key == "y") {
      scene = 2.2;
    }
  }
  if (mon.overlap(npc3) && scene == 2) {
    if (key == "y") {
      scene = 2.3;
    }
  }
  if(mon.overlap(bob) && scene == 1){
    if (key == "y") {
      scene = 1.1;
    }
  }
  
  // Makes the food stand functional.
  if (scene == 1.1 && key == "g") {
    scene = 1;
  }
  if (scene == 1.1 && key == "s") {
    scene = 1.2;
  }
  
  // Returns to the main menu from the circus.
  if (scene == 4 && key == "g") {
    scene = 1;
  }
  
  // Makes the circus functional.
  if(mon.overlap(clown) && scene == 4) {
    if (key == "y" && score >= 20) {
      scene = 4.1;
      r5 = 0;
    }
  }
  if (scene == 4.1 && key == "g" && r5 == 0) {
    scene = 1;
    score -= 20
    r5 = 1;
  }

  // Makes basketball functional
  if (key == "s" && scene == 2.2) {
    outcome = int(random(1, 10)); // Resets random value whenever "s" is pressed.
    blink = 0; // Makes the outcome blink when "s" is pressed.
    if (outcome >= 1 && outcome <= 5 && bScore < 10) {
      if (basketballs > 0) {
        bScore++; // If you shoot a hoop, then basketball score increases by 1.
      }
      basketballs -= 1; // If you throw a basketball, then the number of basketballs you have goes down by 1.
      if (basketballs < 0) {
        basketballs = 0; // This is so the basketball counter won't go into the negatives.
      }
    } else if (bScore < 10) {
      bScore += 0; // If you miss, then basketball score stays the same.
      basketballs -= 1;
      if (basketballs < 0) {
        basketballs = 0;
      }
    }
  }

  // Resets basketball.
  if (key == "p" || key == "g") {
    bScore = 0;
    basketballs = 20;
    popp = 0;
  }
  if (scene == 2.2 && key == "g") {
    scene = 2;
  }

  // Resets balloon pop.
  if (
    (key == "p" &&
      bL[0] == 0 &&
      bL[1] == 0 &&
      bL[2] == 0 &&
      bL[3] == 0 &&
      bL[4] == 0 &&
      bL[5] == 0) ||
    darts == 0 ||
    key == "g"
  ) {
    popp = 0;
    darts = 12;
    bL[0] = 1;
    bL[1] = 1;
    bL[2] = 1;
    bL[3] = 1;
    bL[4] = 1;
    bL[5] = 1;
  }
  if (scene == 2.1 && key == "g") {
    scene = 2;
  }

  // Adds 40 points or removes 10 points for the horse race. The caveat is that you won't see the score change until you press a key. I'm not sure how to fix that.
  if (h == width) {
    score += 40;
    h = 0;
  } else if (h == -1) {
    score -= 10;
    h = 0;
    if (score < 0) {
      score = 0;
    }
  }

  // Resets horse race.
  for (let i = 0; i < speed.length; i++) {
    speed[i] = random(1, 2);
    horse1.position.x += x[0]/1000;
    horse2.position.x += x[1]/1000;
    horse3.position.x += x[2]/1000;
    horse4.position.x += x[3]/1000;
    x[i] += speed[i];
    if (key == "p" || key == "g") {
      x[i] = 0;
      horse1.position.x = 100;
      horse2.position.x = 100;
      horse3.position.x = 100;
      horse4.position.x = 100;
      horse1.changeAnimation("Horse Idle Brown.png");
      horse2.changeAnimation("Horse Idle Black.png");
      horse3.changeAnimation("Horse Idle Gold.png");
      horse4.changeAnimation("Horse Idle Gray.png");
    }
  }
  if (scene == 2.3 && key == "g") {
    scene = 2;
  }

  if (score < 0) {
      score = 0;
  }
  
  if (
    scene == 3.1 ||
    scene == 3.2 ||
    scene == 3.3 ||
    (scene == 3.4 && key == "g")
  ) {
    scene = 3;
    // The only way I figured out how to decrease the score count when you pay for a ride is if you "(G)o back" after viewing one of the rides scenes. The conditionals below show how many points you've spent after going to any of the rides.
    if (r1 == 0) {
      score -= 25;
      r1 = 1;
    }
    if (r2 == 0) {
      score -= 50;
      r2 = 1;
    }
    if (r3 == 0) {
      score -= 75;
      r3 = 1;
    }
    if (r4 == 0) {
      score -= 100;
      r4 = 1;
    }
  }

  // Makes it so that "You don't have enough points!" disappears unless the key is pressed again.
  if (key == 1 || key == 2 || key == 3 || key == 4 && blink > 200) {
    blink = 0;
  }
}

function mousePressed() {
  // The radius/location of each balloon.
  // Source: https://youtu.be/Spg0ct-zsro
  let b1 = dist(mouseX, mouseY, width / 3.5, height / 2.6 + 50);
  let b2 = dist(mouseX, mouseY, width / 2, height / 2.6 + 50);
  let b3 = dist(mouseX, mouseY, width / 1.4, height / 2.6 + 50);
  let b4 = dist(mouseX, mouseY, width / 3.5, height / 1.6 + 50);
  let b5 = dist(mouseX, mouseY, width / 2, height / 1.6 + 50);
  let b6 = dist(mouseX, mouseY, width / 1.4, height / 1.6 + 50);
  // Makes balloon pop functional.
  if (b1 < 50 || b2 < 50 || b3 < 50 || b4 < 50 || b5 < 50 || b6 < 50) {
    if (scene == 2.1) {
      outcome = int(random(1, 10)); // Resets random value whenever mouse is pressed.
      darts -= 1; // If you throw a dart, then the number of darts decrease.
      if (darts < 0) {
        darts = 0; // This is so the darts counter won't go into the negatives.
      }
      blink = 0; // Makes the outcome blink when mouse is pressed.
    }
  }
}

// Function that determines whether you can go on a ride based on how many points you earn.
function rideDeterminer() {
  fill("black");
  if (key == 1 && score >= 25 && scene == 3) {
    r1 = 0;
    scene = 3.1;
  } else if (key == 1 && score < 25 && blink < 200) {
    text("You don't have enough points!", 40, 170);
  }

  if (key == 2 && score >= 50 && scene == 3) {
    r2 = 0;
    scene = 3.2;
  } else if (key == 2 && score < 50 && blink < 200) {
    text("You don't have enough points!", 40, 170);
  }

  if (key == 3 && score >= 75 && scene == 3) {
    r3 = 0;
    scene = 3.3;
  } else if (key == 3 && score < 75 && blink < 200) {
    text("You don't have enough points!", 40, 170);
  }

  if (key == 4 && score >= 100 && scene == 3) {
    r4 = 0;
    scene = 3.4;
  } else if (key == 4 && score < 100 && blink < 200) {
    text("You don't have enough points!", 40, 170);
  }
}

// A class consisting of different rides. Each function is a different ride and they'll each cost a certain number of points to go on.
class RidesList {
  constructor() {}

  // The layout for each ride.
  layout() {
    background(185, 100, 100);
    text("(G)o back?", 40, 40);
    highScore(score);
    push();
    textSize(width / 15);
    text("Congratulations!", width / 5, 150);
    pop();
    fill(120, 100, 100);
    rectMode(CORNER);
    rect(0, height / 1.4, width, height);
  }

  merryGoRound() {
    this.layout();
    image(merry, width / 4, height / 3, width / 2, height / 2);
  }

  ferrisWheel() {
    this.layout();
    image(ferris, width / 4, height / 3, width / 2, height / 2);
  }

  typhoon() {
    this.layout();
    image(ty, width / 4, height / 3, width / 2, height / 1.5);
  }

  rollerCoaster() {
    this.layout();
    image(rCoaster, width / 4, height / 3, width / 2, height / 2);
  }
}
