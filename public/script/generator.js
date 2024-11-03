import Vector, {randint} from './vector.js';
import Particle from './particle.js';

export default class Generator{

    
    constructor(center,size,birthRate,nbBirth,minDuration,maxDuration){
        this.center = center;
        this.size = size;
        this.birthRate = birthRate;
        this.nbBirth = nbBirth;
        this.minDuration = minDuration;
        this.maxDuration = maxDuration;
        this.v_min = new Vector(1,1);
        this.v_max = new Vector(10,20);
    }

    getNumberOfBirthPerImage(){
        let ratio = parseInt(this.birthRate*this.nbBirth);
        if(ratio == 0 && this.nbBirth>0){
            return 1;
        }
        return ratio;
    }

    distance(m){
        return Math.sqrt( (this.center.x-m.x)**2+ (this.center.y -m.y)**2 )
    }

    selected(){
        
    }

    deselect(){

    }


    setVelocities(v_min,v_max){
        this.v_min.setXY(v_min.x,v_min.y);
        this.v_max.setXY(v_max.x,v_max.y);
    }

    initParticle(p){
        p.velocity.setRandint(this.v_min,this.v_max);
        p.oldVelocity.setXY(p.velocity.x,p.velocity.y);
        p.position.setRandBox(this.center,this.size);
        p.oldPosition.setXY(p.position.x,p.position.y);
        p.color.r = randint(0,255);
        p.color.g = randint(0,255);
        p.color.b = randint(0,255);
        p.color.a = 1;
        p.duration = randint(this.minDuration,this.maxDuration);
    }

    move(m){
        this.center.setXY(m.x,m.y);
    }
}