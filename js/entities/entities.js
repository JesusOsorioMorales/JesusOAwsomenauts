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
        this.facing = "right";
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 69, 70, 71, 72], 80);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        this.now = new Date().getTime();
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            //this.renderable.setCurrentAnimation("smallWalk");
            //set.Velocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
            this.facing = "right";
            this.flipX(true);
        }
        else if (me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
            this.flipX(false);
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.falling) {
            this.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }

        if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }

        if (me.input.isKeyPressed("attack")) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //Sets the current animation to attack  
                this.renderable.setCurrentAnimation("attack", "idle");
                this.renderable.setAnimationFrame();
            }
        }

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;


            if (ydif < -40 && xdif < 70 && xdif > -35) {
                this.body.falling = false;
                this.body.vel.y = -1;
            }
            else if (xdif > -35 && this.facing === 'right' && (xdif > 0)) {
                this.body.vel.x = 0;
                this.pos.x = this.pos.x - 1;
            } else if (xdif > -60 && this.facing === 'left' && (xdif > 0)) {
                this.body.vel.x = 0;
                this.pos.x = this.pos.x + 1;
            }

            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 400) {
                this.lastHit = this.now;
                response.b.loseHealth();
            }

        }
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

        },
        loseHealth: function() {
            this.health--;
        }

});

