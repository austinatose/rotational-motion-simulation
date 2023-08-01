let carArray = [];
let lastCar;
let pause = true;

function setup() {
  createCanvas(1200, 700); // 16:10
  carArray.push(new Car(100, 100));
  lastCar = carArray[0];

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
      updateCarVel(currCar);
    } 

    currCar.update();
  }

  // check for value update
  // car1.mass = massSlider.value();


  // make sure angvelslider doesnt overshoot

  
}

function drawSidebarSliders() {
  angvelSlider = createSlider(0, 1.5, 1, 0.1);
  angvelSlider.position(1000, 300);
  massSlider = createSlider(1000, 2500, 1500, 10);
  massSlider.position(1000, 400);
  pauseButton = createButton('Pause');
  pauseButton.position(1000, 500);
  pauseButton.mousePressed(togglePause);
  createCarButton = createButton('Create Car');
  createCarButton.position(1000, 600);
  createCarButton.mousePressed(createCar);
}

function drawSidebarText() {

  // loop all cars
  for (let i = 0; i < carArray.length; i++) {
    currCar = carArray[i];

    // check which was was moused over
    if (currCar.dragging) {
      text("Angular Velocity = " + round(currCar.angvel, 2), 1000, 350);
      text("Mass = " + currCar.mass, 1000, 450);
      text("F_Centripetal = " + round(currCar.cforce), 1000, 500);
      text("Radius = " + round(currCar.trueradius, 2), 1000, 100);
      text("Raw Radius = " + currCar.radius, 1000, 650);
      text("Velocity = " + round(currCar.velocity, 2), 1000, 150);
      text("xpos = " + round(currCar.pos.x, 2) + " " + String(mouseX), 1000, 550);
      text("ypos = " + round(currCar.pos.y, 2) + " " + String(mouseY), 1000, 600);
      text("pause = " + pause, 1000, 700);
      text("dragging = " + currCar.dragging, 800, 650);

      lastCar = currCar;
      break;
    } 

    if (i == carArray.length - 1) {
      text("Angular Velocity = " + round(lastCar.angvel, 2), 1000, 350);
      text("Mass = " + lastCar.mass, 1000, 450);
      text("F_Centripetal = " + round(lastCar.cforce), 1000, 500);
      text("Radius = " + round(lastCar.trueradius, 2), 1000, 100);
      text("Raw Radius = " + lastCar.radius, 1000, 650);
      text("Velocity = " + round(lastCar.velocity, 2), 1000, 150);
      text("xpos = " + round(lastCar.pos.x, 2) + " " + String(mouseX), 1000, 550);
      text("ypos = " + round(lastCar.pos.y, 2) + " " + String(mouseY), 1000, 600);
      text("pause = " + pause, 1000, 700);
      text("dragging = " + lastCar.dragging, 800, 650);
    }
  }
  
}

function drawTrack() {
  fill(63, 63, 71);
  circle(450, 350, 690);
  circle(450, 350, 100);
  
  fill(0);
}

function updateCarVel() {
  /*
  car1.angvel = angvelSlider.value();
  car1.velocity = car1.angvel * car1.trueradius;
  */
}

function mousePressed() {
  for (let i = 0; i < carArray.length; i++) {
    carArray[i].pressed();
  }
}

function mouseReleased() {
  for (let i = 0; i < carArray.length; i++) {
    carArray[i].released();
  }
}

function togglePause() {
  pause = !pause;
}

function createCar() {
  carArray.push(new Car(100, 100));
}