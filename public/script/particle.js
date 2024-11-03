import Vector from './vector.js';


export default class Particle {
  
  constructor() {
    this.position = new Vector(0,0);
    this.color={r:0,g:0,b:0,a:1}
    this.isAlive = false;
    this.duration = undefined;
    this.velocity = new Vector(10,20);
    this.oldPosition = this.position.copy();
    this.force = new Vector(0,0);
    this.oldVelocity = this.velocity.copy();
  }


  // draw a particule in the canvas context ctx
  draw(ctx) {
    ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`; //'rgb(47,104,139)'
    ctx.fillRect(this.position.x,this.position.y,5,5);
    
  }

  // apply gravity force to the particle
  gravityForce(object){
    this.force.setXY(0,100);
  }

  // apply attraction force to the particle towards the mouse position
  attractionForce(object){
    let distancePM = Math.sqrt((this.position.x - object.mouse.x)**2 + (this.position.y - object.mouse.y));
    let coef = object.factor/(distancePM**2);
    let vector = new Vector(object.mouse.x-this.position.x , object.mouse.y - this.position.y);
    vector.setXY(coef*vector.x,coef*vector.y);
    this.force.set(vector);
  }

  impulse(c,n){
    let prod = Vector.produitScalaire(this.velocity,n);
    let x = prod*n.x; // coordonnée x de vnew
    let y = prod*n.y; // coordonnée y de vnew

    let vColX = this.velocity.x - (1.5*x);
    let vColY = this.velocity.y - (1.5*y);

    this.oldVelocity.set(this.velocity);
    this.velocity.setXY(vColX,vColY);

    let prodH = Vector.produitScalaire(c,n);
    let hX = prodH * n.x;
    let hY = prodH * n.y;

    let pColX = this.position.x + (1+0.5)*hX;
    let pColY = this.position.y + (1+0.5)*hY;

    this.oldPosition.set(this.position);
    this.position.setXY(pColX,pColY);

  }

  // apply friction force to the particle
  frictionForce(object){
    let frictionForce = new Vector(-object.frictionFactor*this.velocity.x,-object.frictionFactor*this.velocity.y);

    //add friction force to the total Force of the particle
    this.force.add(frictionForce);
  }

}
