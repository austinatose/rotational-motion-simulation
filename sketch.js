let car1;

function setup() {
  createCanvas(1200, 700); // 16:10
  car1 = new Car(350, 350);

  drawSidebarSliders();
}

function draw() {
  background(220);

  drawTrack();
  drawSidebarText();
  car1.display();
  

  // check for value update
  car1.radius = radSlider.value();
  car1.mass = massSlider.value();


  // make sure angvelslider doesnt overshoot
  angvelSlider.input(updateCarVel);
  if (angvelSlider.value() >= 1.5) {
    velSlider.attribute('disabled', '');

    updateCarAngVel();
    updateCarVel();
  } else if (angvelSlider.value() < 1.5) {
    velSlider.removeAttribute('disabled');
    let temp = velSlider.value();
  }
  velSlider.input(updateCarAngVel);
  radSlider.input(updateCarVel);

  
  car1.update();
}

function drawSidebarSliders() {
  radSlider = createSlider(100, 300, 200, 10);
  radSlider.position(1000, 100);
  velSlider = createSlider(0, 28.5, 17.25, 0.5);
  velSlider.position(1000, 200);
  angvelSlider = createSlider(0, 1.5, 1, 0.1);
  angvelSlider.position(1000, 300);
  massSlider = createSlider(1000, 2500, 1500, 10);
  massSlider.position(1000, 400);
}

function drawSidebarText() {
  
  text("Angular Velocity = " + round(car1.angvel, 2), 1000, 350);
  text("Mass = " + car1.mass, 1000, 450);
  text("F_Centripetal = " + round(car1.cforce), 1000, 500);
  text("Radius = " + round(car1.trueradius, 2), 1000, 150);
  text("Raw Radius = " + car1.radius, 1000, 650);
  text("Velocity = " + round(car1.velocity, 2), 1000, 250);
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
  velSlider.value(car1.velocity);
}

function updateCarAngVel() {
  car1.velocity = velSlider.value();
  car1.angvel = car1.velocity / car1.trueradius;
  angvelSlider.value(car1.angvel);
}