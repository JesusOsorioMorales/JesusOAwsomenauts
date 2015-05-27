game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change'
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10);
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";       
        
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.A);
        //me.input.bindKey(me.input.KEY.ENTER, "start");
        
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);//me.game.viewport.width, me.game.viewport.height
                this.font = new me.Font("Arial", 26, "white");

            },
        draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PICK A USER\n\NAME AND PASSWORD" + game.data.gold, this.pos.x, this.pos.y);
                }
            
        })));
        
    },
//            if (action === "start") {
//                me.sta
//        });
//te.change(me.state.PLAY);
//            }
   
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("register").style.visibility = "hidden";     
    }
});
