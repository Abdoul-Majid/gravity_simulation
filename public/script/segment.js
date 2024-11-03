import Vector from './vector.js';

export default class Segment{

    constructor(a,b){
        this.a = a;
        this.b = b;
        this.olda = this.a.copy();
        this.oldb = this.b.copy();
        this.color={r:255,g:0,b:0,a:1}
        this.zone = null;
    }

    setOldPosition(){
        this.olda.set(this.a);
        this.oldb.set(this.b);
    }


    isInZoneA(m){
        let vecAM = new Vector(m.x-this.a.x,m.y-this.a.y);
        let vecAB = new Vector(this.b.x-this.a.x,this.b.y-this.a.y);

        let prod = vecAM.x*vecAB.x + vecAM.y*vecAB.y;
        return prod < 0;
    }

    isInZoneB(m){
        let vecBM = new Vector(m.x-this.b.x,m.y-this.b.y);
        let vecBA = new Vector(this.a.x-this.b.x,this.a.y-this.b.y);

        let prod = vecBM.x*vecBA.x + vecBM.y*vecBA.y; //produit scalaire
        return prod < 0;
    }


    distance(m){
        if (this.isInZoneA(m) ){
            this.zone = "A";
            return Math.sqrt( (this.a.x-m.x)**2+ (this.a.y -m.y)**2 );
        }else if (this.isInZoneB(m) ){
            this.zone = "B";
            return Math.sqrt( (this.b.x-m.x)**2+ (this.b.y -m.y)**2 );
        }
        //sinon il est dans la zone line
        let vecAM = new Vector(m.x-this.a.x,m.y-this.a.y);
        let vecAB = new Vector(this.b.x-this.a.x,this.b.y-this.a.y);
        let vecN = new Vector(-vecAB.y,vecAB.x); // vecteur normal
        let prod = Vector.produitScalaire(vecAM,vecN)/ Vector.produitScalaire(vecN,vecN);
        let vecH = new Vector(prod*vecN.x,prod*vecN.y);

        //la distance est égale à la norme du vecteur H
        this.zone = "L";
        return Math.sqrt(vecH.x**2 + vecH.y**2);
        
    }

    move(m){
        if (this.zone =="A" ){
            this.a.setXY(m.x,m.y);
        }else if (this.zone == "B" ){
            this.b.setXY(m.x,m.y);
        }else{
            let distAM = Math.sqrt( (this.a.x-m.x)**2+ (this.a.y -m.y)**2 );
            let distBM = Math.sqrt( (this.b.x-m.x)**2+ (this.b.y -m.y)**2 );
            let diffX = 0;
            let diffY = 0;

            if(distAM < distBM){
                diffX = m.x - this.a.x;
                diffY = m.y - this.a.y;
            }else{
                diffX = this.b.x - m.x ;
                diffY = this.b.y - m.y ;
            }

            this.a.setXY(this.a.x+diffX,this.a.y+diffY);
            this.b.setXY(this.b.x+diffX,this.b.y+diffY);
        }
    }

    selected(){
        this.color.r = 35;
        this.color.g = 200;
    }

    deselect(){
        this.color = {r:255,g:0,b:0,a:1};
    }

    detect(p_old,p_new){
        let pOldCorrected = p_old; //new Vector(p_old.x+(this.a.x+this.b.x)/2 ,p_old.y+(this.a.y+this.b.y)/2); 
        let vecAB = new Vector(this.b.x-this.a.x,this.b.y-this.a.y);
        let normalAB = vecAB.normal().normaliser();
        
        let vecPos = new Vector((p_new.x - pOldCorrected.x), (p_new.y - pOldCorrected.y) );
        let normalVecPos = vecPos.normal().normaliser();

        let direction_a_p_new = new Vector(p_new.x - this.a.x, p_new.y - this.a.y);
        let direction_a_p_old = new Vector(pOldCorrected.x - this.a.x, pOldCorrected.y - this.a.y);
        let direction_b_p_new = new Vector(p_new.x - this.b.x, p_new.y - this.b.y);

        let scal_p_new = Vector.produitScalaire(direction_a_p_new,normalAB);
        let scal_p_old = Vector.produitScalaire(direction_a_p_old,normalAB);

        
        let scal_a = Vector.produitScalaire(direction_a_p_new,normalVecPos);
        let scal_b = Vector.produitScalaire(direction_b_p_new,normalVecPos);

        let vecPA = new Vector(this.a.x-p_new.x,this.a.y-p_new.y);

        let checkCol = (scal_p_new * scal_p_old < 0) && (scal_a * scal_b < 0);
        return {isCollide : checkCol,normal:normalAB ,position:vecPA};
    }


    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.stroke();
    }
}