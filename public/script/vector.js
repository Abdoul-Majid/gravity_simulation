

// @return an int between the ints a and b (included)
export const randint=(a,b) => Math.floor(Math.random()*(b-a+1)+a);



export default class Vector {
  x=0;
  y=0;
  
  constructor(x,y) {
    this.x=x;this.y=y;
  }

  // set this to p (Vector)
  set(p) {
    this.x=p.x;
    this.y=p.y;
    return this; // allows chain operation
  }

  // @return a copy of this
  copy() {
    return new Vector(this.x,this.y);
  }
    
  // set this to x,y
  setXY(x,y) {
    this.x=x;
    this.y=y;
    return this; // allows chain
  }
  
  // add u to this (i.e. this += u)
  add(u) {
    this.x+=u.x;
    this.y+=u.y;
    return this; // allows chain
  }
  
  // @return the (new) vector p1+p2  
  static add(p1,p2) {    
    return new Vector(p1.x+p2.x,p1.y+p2.y);
  }
  
  // set the vector position by random coordinates
  setRandint(p1,p2){
    this.setXY(randint(p1.x,p2.x),randint(p1.y,p2.y));
  }

  setRandBox(c,s){
    let left = c.x - (s.x/2);
    let right = c.x + (s.x/2);

    let top = c.y - (s.y/2);
    let bottom = c.y + (s.y/2);

    let newX = randint(left,right);
    let newY = randint(top,bottom);
    this.setXY(newX,newY);
    
  }

  // calcul la norme du vecteur
  norme(){
    return Math.sqrt(this.x **2 + this.y **2);
  }


  normaliser(){
    let norme = this.norme()
    return new Vector(this.x/norme, this.y/norme);
  }

  // Retourne un vecteur normal à ce vecteur
  normal(){
    return new Vector(-this.y,this.x);
  }
  // 
  static produitScalaire(vec1,vec2){
    return vec1.x*vec2.x + vec1.y*vec2.y;
  }


  // @return a string that represents this
  toString() {
	  return "("+this.x+","+this.y+")";
  }
  
  

}
