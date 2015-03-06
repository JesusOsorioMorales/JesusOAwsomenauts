game.Player = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spriteWidth: "64",
                spriteHeight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
    
        this.body.setVelocity(5, 20);
        
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
    
        this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta) {
        if(me.input.isKeyPressed("right")){
            //sets the  position of my x by adding
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            }else{
            this.body.vel.x = 0;
        }
        
        if(!this.renderable.isCurrentAnimation("walk"))
        this.renderable.setCurrentAnimation("walk");
    
        this.body.update(delta);   
        return true;
    }
});