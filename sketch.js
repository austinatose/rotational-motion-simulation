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
  if (radSlider.value() != car1.radius) {
    car1.radius = radSlider.value();
  } else if (massSlider.value() != car1.mass) {
    car1.mass = massSlider.value();
  } else if (angvelSlider.value() != car1.velocity) {
    car1.angvel = angvelSlider.value();
  }

  car1.update();
  
}

function drawSidebarSliders() {
  radSlider = createSlider(100, 300, 200, 10);
  radSlider.position(1000, 200);
  angvelSlider = createSlider(0, 10, 2, 0.1);
  angvelSlider.position(1000, 300);
  massSlider = createSlider(50, 300, 200, 10);
  massSlider.position(1000, 400);
}

function drawSidebarText() {
  text("F_Centripetal = " + car1.cforce, 1000, 500);
}

function drawTrack() {
  noFill();
  circle(450, 350, 100);
  circle(450, 350, 690);
  fill(0);
}