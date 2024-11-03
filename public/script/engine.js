import Generator from './generator.js';
import ParticleManager from './particleManager.js';
import Vector from './vector.js';
import ObstacleManager from './obstacleManager.js';
import Circle from './circle.js';
import Segment from './segment.js';


export default class Engine {

    
  constructor(ctx) {
    this.ctx=ctx;          // context of the canvas
    this.deltaTime = 0.2;  // 0.2 time step for simulation
    this.particleManager=new ParticleManager(10000); // contains all the particles      
    this.obstacleManager = new ObstacleManager(); 
    this.selected = null;
    this.selectable = [];
    this.forceFunction = "gravityForce";
    this.forceFunctionObject = {};
  }

  // start = initialize the engine then start the main loop
  start() {
    this.initialize();
    this.loop();
  }
  
  // all initializations to be done (generators, obstacles, ...) before the main loop. Should be called once (from start)
  initialize() {

    let gen1 = new Generator(new Vector(100,100),new Vector(5,5),0.2,20,100,200); // centre, dimensions
    let gen2 = new Generator(new Vector(200,200),new Vector(100,150),0.4,20,100,200);
    gen1.setVelocities(new Vector(-20,-20),new Vector(20,20))
    
    let obs1=new Circle(new Vector(100,100),50);
    let obs2=new Segment(new Vector(100,200),new Vector(250,300));

    this.particleManager.add(gen1); // ajoute au tableau generatorList (faire la méthode add)
    this.particleManager.add(gen2);

    this.obstacleManager.add(obs1);
    this.obstacleManager.add(obs2)

    this.selectable.push(gen1,gen2,obs1,obs2);
    

  }
  
  // update all data at each frame (called from the main loop)
  updateData() {
    this.particleManager.applyForces(this.forceFunction,this.forceFunctionObject);
    this.particleManager.motion(this.deltaTime);
    this.particleManager.update();
    this.collision();
  }

  updateOldPositions(){
    for(var obstacle of this.obstacleManager){
      obstacle.setOldPosition();
    }
  }
  select(m){
    let distance;
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (var el of this.selectable){
      distance = el.distance(m);
      if (Math.abs(distance) <=50 ){
        if(this.selected == null || distance < minDistance){
          this.selected = el;
          minDistance = distance;
        }
        
      }
    }
    if(this.selected){
      this.selected.selected();
    }
    //console.log("test",this.selected.center)
  }

  abandonObstacle(){
    if(this.selected){
      this.selected.deselect()
    }
    
  }
  // draw all data (on the canvas) at each frame (called from main loop)
  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height); // clear all canvas
    this.particleManager.draw(this.ctx);
    this.obstacleManager.draw(this.ctx);

    /* question 7
    let center = new Vector(0,0);
    center.setRandint(0,this.ctx.canvas.width);
    this.ctx.fillStyle='rgb(47,199,39)';
    this.ctx.fillRect(center.x,center.y,20,40);
    */


  }
  
  // main loop = updateData, then draw, then redo for each frame
  loop() {
    this.updateData();
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }
  

  collision(){
    for (let particle of this.particleManager.particles() ){
      if (particle.isAlive){
        for (let obstacle of this.obstacleManager.obstacles() ){
          this.solveCollision(particle,obstacle);
        }
      }
    }
  }

  solveCollision(une_particule,un_obstacle){
    let detection = un_obstacle.detect(une_particule.oldPosition,une_particule.position);
    if (detection.isCollide){
      //une_particule.position.set(une_particule.oldPosition);
      une_particule.impulse(detection.position,detection.normal);
    }
  }

  // called when the left mouse button is pressed
  // x,y : mouse position (relative to canvas of this.ctx)
  selectMouse(x,y) {
    this.select(new Vector(x,y));
    //console.log("left mouse click :"+x+","+y);
  }
  
  // called when the mouse moves **while** left button is pressed
  // x,y : mouse position (relative to canvas of this.ctx)
  moveMouse(x,y) {
    if(this.selected){
      this.selected.move(new Vector(x,y));
    }
  }
  
  moveRightMouse(x,y){
    this.forceFunction = "attractionForce";
    this.forceFunctionObject.mouse = new Vector(x,y);
    this.forceFunctionObject.factor = 500;
  }

  rightMouseStopped(){
    this.forceFunction = "gravityForce";
  }
  faster() {
    this.deltaTime *= 1.10;
    console.log(`deltaTime = ${this.deltaTime}`);
  }
    
  slower() {
    this.deltaTime *= 0.9;
    console.log(`deltaTime = ${this.deltaTime}`);
  }

  increaseFactor(){
    this.forceFunctionObject.factor *= 1.10;
  }

  decreaseFactor(){
    this.forceFunctionObject.factor *= 0.9;
  }

  applyFrictionForce(){
    this.forceFunction == "frictionForce";
    this.forceFunctionObject.frictionFactor = 10;
  }

  disableFrictionForce(){
    this.forceFunction = "gravityForce";
  }
}
