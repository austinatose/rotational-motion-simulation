class Car {
    // rectangle placeholder for now, will replace with image of car
    constructor(xpos, ypos) {
        this.pos = createVector(xpos, ypos);
        this.angvel = 2; // radians per second
        this.angle = 0; // radians, from rotcentre
        this.velocity = 0;
        this.mass = 10;
        this.sizemult = 1; // changes with mass
        this.rotcentre = createVector(450, 350); // pivot point (centre of track)
        this.radius = 100; // distance from rotcentre
        this.cforce = this.mass * this.radius * this.angvel^2; // centripetal force
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rectMode(CENTER);
        rect(0, 0, 50, 100);
        pop();
    }

    update() {
        this.angle += -this.angvel * deltaTime / 1000;
        this.pos.x = this.rotcentre.x + cos(this.angle) * this.radius;
        this.pos.y = this.rotcentre.y + sin(this.angle) * this.radius;
        this.cforce = this.mass * this.radius * this.angvel^2;
    }
}