let car1;

function setup() {
  createCanvas(1200, 700); // 16:10
  car1 = new Car(100, 100);

  drawSidebarSliders();
}

function draw() {
  background(220);

  drawTrack();
  drawSidebarText();
  car1.display();

  // check for value update
  car1.mass = massSlider.value();


  // make sure angvelslider doesnt overshoot

  if (!car1.pause) {
    updateCarVel();
  } 
  
  

  
  car1.update();
}

function drawSidebarSliders() {
  angvelSlider = createSlider(0, 1.5, 1, 0.1);
  angvelSlider.position(1000, 300);
  massSlider = createSlider(1000, 2500, 1500, 10);
  massSlider.position(1000, 400);
  pauseButton = createButton('Pause');
  pauseButton.position(1000, 500);
  pauseButton.mousePressed(togglePause);
}

function drawSidebarText() {
  
  text("Angular Velocity = " + round(car1.angvel, 2), 1000, 350);
  text("Mass = " + car1.mass, 1000, 450);
  text("F_Centripetal = " + round(car1.cforce), 1000, 500);
  text("Radius = " + round(car1.trueradius, 2), 1000, 100);
  text("Raw Radius = " + car1.radius, 1000, 650);
  text("Velocity = " + round(car1.velocity, 2), 1000, 150);
  text("xpos = " + round(car1.pos.x, 2) + " " + String(mouseX), 1000, 550);
  text("ypos = " + round(car1.pos.y, 2) + " " + String(mouseY), 1000, 600);
  text("pause = " + car1.pause, 1000, 700);
  text("dragging = " + car1.dragging, 800, 650);
}

function drawTrack() {
  fill(63, 63, 71);
  circle(450, 350, 690);
  circle(450, 350, 100);
  
  fill(0);
}

function updateCarVel() {
  car1.angvel = angvelSlider.value();
  car1.velocity = car1.angvel * car1.trueradius;
}

function mousePressed() {
  car1.pressed();
}

function mouseReleased() {
  car1.released();
}

function togglePause() {
  car1.pause = !car1.pause;
}