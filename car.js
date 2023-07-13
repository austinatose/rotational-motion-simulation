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
        // car is 1.8 m wide, size multiplier to turn pixels to metres
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
        this.angle += -this.angvel * deltaTime / 1000;
        this.pos.x = this.rotcentre.x + cos(this.angle) * this.radius;
        this.pos.y = this.rotcentre.y + sin(this.angle) * this.radius;
        this.trueradius = map(this.radius, 100, 300, 4, 19); //
        this.velocity = this.angvel * this.trueradius;
        this.cforce = this.mass * this.trueradius * this.angvel * this.angvel;
    }

    updateAngVel() {
        this.angvel = this.velocity / this.trueradius;
    }

    updateVel() {
        this.velocity = this.angvel * this.trueradius;
    }
}