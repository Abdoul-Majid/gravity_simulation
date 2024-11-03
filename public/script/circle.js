import Vector from './vector.js';

export default class Circle{

    constructor(center,radius){
        this.center = center;
        this.radius = radius;
        this.oldCenter = this.center.copy();
        this.color={r:255,g:0,b:0,a:1}
    }

    setOldPosition(){
        this.oldCenter.set(this.center);
    }
    distance(m){
        let mDist = Math.sqrt( (this.center.x-m.x)**2+ (this.center.y -m.y)**2 ); // distance entre le centre et le point m
        return this.radius - mDist;
    }

    move(m){
        this.center.setXY(m.x,m.y);
    }

    selected(){
        this.color.r = 35;
        this.color.g = 200;
    }

    deselect(){
        this.color = {r:255,g:0,b:0,a:1};
    }
    
    detect(p_old,p_new){
        let pOldCorrected = new Vector(p_old.x+this.oldCenter.x,p_old.y+this.oldCenter.y);
        let distanceOld = Math.sqrt( (this.center.x-pOldCorrected.x)**2+ (this.center.y -pOldCorrected.y)**2 );
        let distanceNew = Math.sqrt( (this.center.x-p_new.x)**2+ (this.center.y -p_new.y)**2 );

        let milieu = new Vector( (pOldCorrected.x+p_new.x)/2, (p_new.y+pOldCorrected.y)/2);

        let normal = new Vector(milieu.x - this.center.x, milieu.y - this.center.y).normaliser();
    
        let checkCol = (distanceOld < this.radius || distanceNew < this.radius) && (distanceOld > this.radius || distanceNew > this.radius) ;
        return {isCollide : checkCol,normal:normal ,position:milieu};
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.stroke();
    }
}