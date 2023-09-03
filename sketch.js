let carArray = [];
let lastCar;
let uniquelastCar;
let pause = true;
let helpshown = false;
let tutorialshown = true;

function setup() {
  fill(220);
  createCanvas(1200, 700);
  angleMode(RADIANS);
  carArray.push(new Car(100, 100));
  lastCar = carArray[0];
  uniquelastCar = carArray[0];

  // needs to be drawn separately from text
  drawSidebarSliders();
}

// console.log(lastCar);
// console.log(carArray);

function draw() {
  background(220);
  drawTrack();
  drawSidebarText();

  for (let i = 0; i < carArray.length; i++) {
    currCar = carArray[i];
    currCar.display();

    if (!pause) {
      currCar.velocity = currCar.angvel * currCar.trueradius;
    } 

    currCar.update();
  }
  
  // handles the sliders staying on car even after it is released
  currCar = getDraggedCar();
  if (currCar.dragging) {
    massSlider.value(currCar.mass);
    angvelSlider.value(currCar.angvel);
  } else if (currCar == lastCar) {
    lastCar.mass = massSlider.value();
    lastCar.angvel = angvelSlider.value();
  }

  // handle help screen
  if (helpshown) {
    drawHelp();
  }

  // tutorial handling

  // hide tutorial upon first drag of car
  if (tutorialshown && uniquelastCar.dragging) {
    tutorialshown = false;
  }

  if (tutorialshown) {
    drawTutorial();
  }
}





// draw functions (no logic)

function drawSidebarSliders() {
  angvelSlider = createSlider(0, 1.5, 1, 0.1);
  angvelSlider.position(1000, 200);
  massSlider = createSlider(1000, 2500, 1500, 10);
  massSlider.position(1000, 300);
  pauseButton = createButton("Play");
  pauseButton.position(1000, 400);
  pauseButton.mousePressed(togglePause);
  createCarButton = createButton('Create Car');
  createCarButton.position(1000, 425);
  createCarButton.mousePressed(createCar);
  showVectorToggle = createButton('Hide Vectors');
  showVectorToggle.position(1000, 450);
  showVectorToggle.mousePressed(toggleShowVector);
  deleteCarButton = createButton('Reset');
  deleteCarButton.position(1000, 475);
  deleteCarButton.mousePressed(reset);
  helpButton = createButton('Show Help');
  helpButton.position(1000, 500);
  helpButton.mousePressed(toggleHelp);
}

function drawSidebarText() {
  // nice looking border rectangle with rounded corners
  fill(0, 0, 0, 0);
  rect(975, 50, 200, 500, 20);

  // loop all cars
  fill(0);
  for (let i = 0; i < carArray.length; i++) {
    currCar = getDraggedCar();
    text("Angular Velocity = " + round(currCar.angvel, 2) + " rad/s", 1000, 250);
    text("Mass = " + currCar.mass + " kg", 1000, 350);
    text("Radius = " + round(currCar.trueradius, 2) + " m", 1000, 100);
    text("Velocity = " + round(currCar.velocity, 2) + " m/s", 1000, 150);

    // the below are debug texts

    // text("F_Centripetal = " + round(currCar.cforce), 1000, 400);
    // text("Raw Radius = " + currCar.radius, 1000, 650);
    // text("angle = " + round(currCar.angle, 2) + " rad", 1000, 600);
    // text("pause = " + pause, 1000, 700);
    // text("dragging = " + currCar.dragging, 800, 650);
  }
  // text(pause ? "Paused" : "Playing", 1000, 575);
}

function drawTrack() {
  push();
  fill(63, 63, 71);
  circle(450, 350, 690);
  circle(450, 350, 100);
  pop();
}

function drawHelp() {
  // purpose of vectors
  push();
  fill(0, 0, 0, 0);
  rect(750, 50, 200, 100, 20);
  fill(0);
  textSize(12);
  text(" The blue arrow represents the \n centripetal force acting on the car. \n\n The red arrow represents the \n velocity of the car.", 755, 75);
  pop();

  // how to edit cars
  push();
  fill(0, 0, 0, 0);
  rect(810, 200, 140, 170, 20);
  fill(0);
  textSize(12);
  text(" Click on a car and use\n sliders to edit its\n attributes. \n\n Press 'Create Car' to\n add a new car. \n\n Press 'Reset' to delete\n all cars.", 815, 225);
  pop();

  // thinking questions
  push();
  fill(0, 0, 0, 0);
  rect(750, 575, 425, 110, 20);
  fill(0);
  textSize(14);
  text(" How do the following factors affect the length of the arrows? \n\n Distance of the car from the centre \n Angular velocity of the car \n Mass of the car", 755, 600);
  pop();
}

function drawTutorial() {
  // arrow pointing towards the car from the right
  push();
  stroke(0, 0, 0);
  strokeWeight(2);
  line(130, 100, 300, 100);
  line(130, 100, 160, 90);
  line(130, 100, 160, 110);
  pop();
  text("Find out what affects the centripetal force acting on the car. \n Get started by dragging the car onto the track and press 'play'.", 320, 100);
}

// button functions

function toggleHelp() {
  helpshown = !helpshown;
  helpButton.remove();

  helpButton = createButton(helpshown ? "Hide Help" : "Show Help");
  helpButton.position(1000, 500);
  helpButton.mousePressed(toggleHelp);
}

function togglePause() {
  pause = !pause;
  pauseButton.remove();

  pauseButton = createButton(pause ? "Play" : "Pause");
  pauseButton.position(1000, 400);
  pauseButton.mousePressed(togglePause);
}

function createCar() {
  carArray.push(new Car(100, 100));
}

function toggleShowVector() {
  for (let i = 0; i < carArray.length; i++) {
    carArray[i].showVectorToggle = !carArray[i].showVectorToggle;
  }
  showVectorToggle.remove();
  showVectorToggle = createButton(carArray[0].showVectorToggle ? "Hide Vectors" : "Show Vectors");
  showVectorToggle.position(1000, 450);
  showVectorToggle.mousePressed(toggleShowVector);
}

function reset() {
  carArray = [];
  carArray.push(new Car(100, 100));
  lastCar = carArray[0];
  uniquelastCar = carArray[0];
  pause = false;
  togglePause();
}

// miscellaneous functions

function mousePressed() {
  for (let i = 0; i < carArray.length; i++) {
    carArray[i].pressed();
  }
}

function getDraggedCar() {
  for (let i = 0; i < carArray.length; i++) {
    currCar = carArray[i];

    // check which was last moused over
    if (currCar.dragging) {
      lastCar = currCar;
      if (uniquelastCar != lastCar) uniquelastCar = lastCar;
      return currCar;
    } 
    
    // only car exception
    if (i == carArray.length - 1) {
      return lastCar;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < carArray.length; i++) {
    carArray[i].released();
  }
}
