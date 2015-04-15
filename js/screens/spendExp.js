game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10);

        //me.input.bindKey(me.input.KEY.ENTER, "start");

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {                                                
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);//me.game.viewport.width, me.game.viewport.height
                this.font = new me.Font("Arial", 46, "white");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Spend", this.pos.x, this.pos.y);
                //this.font.draw(renderer.getContext(), "press the button on top of shift", 250, 430);
            }                       
        })));
        

//        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
//            if (action === "start") {
//                me.state.change(me.state.PLAY);
//            }
//        });

   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
//        me.input.unbindKey(me.input.KEY.ENTER);
//        me.event.unsubscribe(this.handler);
    }
});
