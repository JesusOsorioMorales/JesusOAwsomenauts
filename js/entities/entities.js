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
        this.renderable.addAnimation("attack", [65, 66, 67, 69, 70, 71, 72], 80);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            //this.renderable.setCurrentAnimation("smallWalk");
            //set.Velocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
        }
        else if (me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

        } else {
            this.body.vel.x = 0;
        }
        
        if(me.input.isKeyPressed("attack")){
            if(!this.renderable.isCurrentAnimation("attack")){
                //Sets the current animation to attack  
                this.renderable.setCurrentAnimation("attack", "idle");
            }
        }

       if (me.input.isKeyPressed("jump")) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }

        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }



        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    }
});

game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        //console.log("init");
        this.type = "PlayerBaseEntity";

   //     this.renderable.a
    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
        }
        this.body.update;

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }
});

game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        console.log = ("init");
        this.type = "EnemyBaseEntity";

    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }
});