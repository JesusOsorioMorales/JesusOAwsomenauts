game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10);
        
        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        me.input.bindKey(me.input.KEY.F4, "F4");
        me.input.bindKey(me.input.KEY.F5, "F5");
        var exp1cost = ((game.data.exp1 + 1) * 10);
        //me.input.bindKey(me.input.KEY.ENTER, "start");

        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
            if(action === "F1"){
                if(game.data.exp >= exp1cost){
                    game.data.exp1 += 1;
                    game.data.exp -= exp1cost;
                    me.state.change(me.state.PLAY);
                }else{
                    console.log("not enough experience");
                }
                
            }else if(action === "F2"){
                
            }else if(action === "F3"){
                
            }else if(action === "F4"){
                
            }else if(action === "F5"){
            me.state.change(me.state.PLAY);
            }
        });
        
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
        me.input.unbindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.input.unbindKey(me.input.KEY.F5, "F5");  
//        me.input.unbindKey(me.input.KEY.ENTER);
        me.event.unsubscribe(this.handler);
    }
});
