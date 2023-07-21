class Car {
    // rectangle placeholder for now, will replace with image of car
    constructor(xpos, ypos) {
        this.pos = createVector(xpos, ypos);
        this.angvel = 1; // radians per second
        this.angle = 0; // radians, from rotcentre
        this.velocity = 17.25;
        this.mass = 1500;
        this.sizemult = 1; // changes with mass
        this.rotcentre = createVector(450, 350); // pivot point (centre of track)
        this.radius = 200; // distance from rotcentre
        this.trueradius = (this.radius - 100) * 1.8 / 100 + 5.4; // actual radius of track (m)
        this.cforce = this.mass * this.radius * this.angvel^2; // centripetal force
        this.offsetX = 0;
        this.offsetY = 0;
        // car is 1.8 m wide, size multiplier to turn pixels to metres

        this.dragging = false;
        this.pause = true;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rectMode(CENTER);
        rect(0, 0, 25, 50);
        pop();
    }

    update() {
        // dragging
        if (this.pause && this.dragging) {
            this.pos.x = mouseX;
            this.pos.y = mouseY;
        }

        this.radius = dist(this.pos.x, this.pos.y, this.rotcentre.x, this.rotcentre.y)
        constrain(this.radius, 100, 300);
        if (this.pause && !this.checkOOB()) {
            this.angle = atan2(this.pos.y - this.rotcentre.y, this.pos.x - this.rotcentre.x);
        }

        if (!this.pause && !this.checkOOB()) {
            this.angle += -this.angvel * deltaTime / 1000;
            this.pos.x = this.rotcentre.x + cos(this.angle) * this.radius;
            this.pos.y = this.rotcentre.y + sin(this.angle) * this.radius;
        }

        this.trueradius = map(this.radius, 100, 300, 4, 19); //
        this.velocity = this.angvel * this.trueradius;
        this.cforce = this.mass * this.trueradius * this.angvel * this.angvel;

        
    }
    
    pressed() {
        // Did I click on the rectangle?
        if (mouseX > this.pos.x - 12.5 && mouseX < this.pos.x + 12.5 && mouseY > this.pos.y - 25 && mouseY < this.pos.y + 25 && this.pause) {
            console.log("pressed");
            this.dragging = true;
            
        }
    }

    released() {
        // Quit dragging
        
        this.dragging = false;
    }

    updateAngVel() {
        this.constraints();
        this.angvel = this.velocity / this.trueradius;
    }

    updateVel() {
        this.constraints();
        this.velocity = this.angvel * this.trueradius;
    }

    contraints() {
        constrain(0, 1.5, this.angvel);
        constrain(0, 28.5, this.velocity);
        constrain(0, 19, this.radius);
    }

    checkOOB() {
        if (dist(this.pos.x, this.pos.y, this.rotcentre.x, this.rotcentre.y) > 300) {
            return true;
        }
    }
}