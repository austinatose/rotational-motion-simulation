let carArray = [];
let lastCar;
let uniquelastCar;
let pause = true;
let helpshown = false;

function setup() {
  createCanvas(1200, 700); // 16:10
  angleMode(RADIANS);
  carArray.push(new Car(100, 100));
  lastCar = carArray[0];
  uniquelastCar = carArray[0];

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

  currCar = getDraggedCar();
  if (currCar.dragging) {
    massSlider.value(currCar.mass);
    angvelSlider.value(currCar.angvel);
  } else if (currCar == lastCar) {
    lastCar.mass = massSlider.value();
    lastCar.angvel = angvelSlider.value();
  }

  // make sure angvelslider doesnt overshoot

  
}

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
  showVectorToggle = createButton('Show / Hide Vectors');
  showVectorToggle.position(1000, 450);
  showVectorToggle.mousePressed(toggleShowVector);
  deleteCarButton = createButton('Clear Cars');
  deleteCarButton.position(1000, 475);
  deleteCarButton.mousePressed(deleteCars);
  helpButton = createButton('Help');
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
    // text("F_Centripetal = " + round(currCar.cforce), 1000, 400);
    text("Radius = " + round(currCar.trueradius, 2) + " m", 1000, 100);
    // text("Raw Radius = " + currCar.radius, 1000, 650);
    text("Velocity = " + round(currCar.velocity, 2) + " m/s", 1000, 150);
    // text("angle = " + round(currCar.angle, 2) + " rad", 1000, 600);
    // text("pause = " + pause, 1000, 700);
    // text("dragging = " + currCar.dragging, 800, 650);
  }
  // text(pause ? "Paused" : "Playing", 1000, 575);
}

function drawTrack() {
  fill(63, 63, 71);
  circle(450, 350, 690);
  circle(450, 350, 100);
  
  fill(0);
}

function drawHelp() {

}

function drawTutorial() {
  text("Find out what affects the centripetal force acting on the car. \n Get started by dragging the car onto the track.", 100, 100);
}

function mousePressed() {
  for (let i = 0; i < carArray.length; i++) {
    carArray[i].pressed();
  }
}

function getDraggedCar() {
  for (let i = 0; i < carArray.length; i++) {
    currCar = carArray[i];

    // check which was was moused over
    if (currCar.dragging) {
      lastCar = currCar;
      if (uniquelastCar != lastCar) uniquelastCar = lastCar;
      return currCar;
    } 

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

function toggleHelp() {
  helpshown = !helpshown;
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
}

function deleteCars() {
  carArray = [];
  carArray.push(new Car(100, 100));
  lastCar = carArray[0];
  uniquelastCar = carArray[0];
}