import Segment from './segment.js';

export default class ObstacleManager{
    constructor(){
        this.all = [];
    }

    // return the obstacles contained in this obstacle manager
    obstacles(){
        return this.all;
    }
    add(obstacle){
        this.all.push(obstacle);
    }

    draw(ctx){
        for( var obstacle of this.all){
            obstacle.draw(ctx);
        }
    }
}