import Particle from './particle.js';
import Vector from './vector.js';
import Generator from './generator.js';
//import through from 'through';


export default class ParticleManager {
  all=[]; // all particles
  
  constructor(n) {
    this.all=Array.from(new Array(n),() => new Particle());
    this.generatorList = [];
    this.productivesGenerators = [];
     // this.generator = new Generator(new Vector(100,100), new Vector(300,300) ); question 10
  }
  
  // return all the particles list of a particle manager
  particles(){
    return this.all;
  }
    
  update() {
    var productivesGenerators = this.filter();
    if(productivesGenerators.length > 0){
      let generator = productivesGenerators[0]
      let nbBirthsPerImage = generator.getNumberOfBirthPerImage();
      for (let i =0; i < this.all.length; i++){
        
        if (this.all[i].isAlive ){
          if (this.all[i].duration <= 0){
            this.all[i].isAlive = false;
          }
          //ajustement de l'opacité
          else if(this.all[i].duration <= 5){
            this.all[i].color.a = 0.2
          }
          else if(this.all[i].duration <= 10){
            this.all[i].color.a = 0.5
          }

          this.all[i].duration-=1; // réduction de la durée de vie
        }else{
          
          if(generator.nbBirth <= 0 || productivesGenerators.length == 0){
            productivesGenerators.shift()
            if(productivesGenerators.length== 0){
              return undefined; // arêt de la boucle , tous les génerateurs sont utilisés
            }else{
              generator = productivesGenerators[0];
            }
          }
          if(nbBirthsPerImage == 0){
            if(productivesGenerators.length== 1){
              return undefined; 
            }
            generator = productivesGenerators[1];
            nbBirthsPerImage = generator.getNumberOfBirthPerImage();
          }
          generator.initParticle(this.all[i]);         
          this.all[i].isAlive = true;
      
          nbBirthsPerImage-=1;
        

        }

      }
    }

    /*
    let generator = this.generatorList[0];
    for(let i= 0; i < this.all.length; i++){
      if( i>= this.all.length/2){ generator = this.generatorList[1];}
      generator.initParticle(this.all[i]);
      //this.all[i].position.setRandint(new Vector(100,100),new Vector(300,300));
    }*/
  }
  
  add(generator){
    this.generatorList.push(generator);
    this.filter();
  }


  filter(){
    let res = []
    for(let i=0; i< this.generatorList.length; i++){
      if (this.generatorList[i].nbBirth > 0){
        res.push(this.generatorList[i]);
      }
    }
    return res;
  }
  
  applyForces(forceFunction,object){
    for (var particle of this.all){
      if(forceFunction == "gravityForce"){
        particle.gravityForce(object);
      }else if(forceFunction == "attractionForce"){
        particle.attractionForce(object);
      }
      else if(forceFunction == "frictionForce"){
        particle.frictionForce(object);
      }
    }
  }
  motion(deltaTime){
    for (var particle of this.all){

      var newPosition = particle.oldPosition.copy();
      var newVelocity = particle.oldVelocity.copy();

      particle.oldVelocity.setXY(particle.velocity.x,particle.velocity.y);
      particle.oldPosition.setXY(particle.position.x,particle.position.y);

      newPosition.add(new Vector(particle.velocity.x*deltaTime,particle.velocity.y*deltaTime))
      particle.position.setXY(newPosition.x,newPosition.y);


      newVelocity.add(new Vector(particle.force.x*deltaTime,particle.force.y*deltaTime));
      particle.velocity.setXY(newVelocity.x,newVelocity.y);
    }
  }
  draw(ctx) {
    for (let i=0; i<this.all.length; i++){
      if( this.all[i].isAlive){
        this.all[i].draw(ctx);
      }
      
    }
  }
}
