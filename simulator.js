///**
// * Created by Pavle Paunovic on 10/21/2016.
// */
//


function Unit (opts) {
    for (var i in opts) {
        if (opts.hasOwnProperty(i) && opts[i] !== undefined) this[i] = opts[i];
    }
}

Unit.prototype = { 
    health: null, 
    rechargeCost: null, 
    active: true, 
    experience: 0, 
    
    attackEquation: null,
    actualAttack: null, 
    
    random: function (from, to) {
        var diff = to - from;
        return Math.floor(Math.random() * diff) + from;  
    },
    
    attack: function (unit) {
        if (!unit.active) return;  
        
        if (unit.health <= 0) unit.active = false;
    }
    
}

function Soldier (opts) {
    Unit.call(this, opts); // have the same constructor applied to the current new object
}

Soldier.prototype = new Unit({ // Inherits
    
    attackProbability: function () {
        var h = 1 + (health/100);
        var exp = this.random(50 + this.experience, 100);
        return 0.5 * h * exp / 100;
    }

});

function Vehicle(opts) {
    Unit.call(this, opts);
    this.operators = [];
}

Vehicle.prototype = new Unit({
    
    addOperators : function(){
        var maxOperators = Math.floor(Math.random() * 3) + 1;
        for (var i = 0; i < maxOperators; i += 1) {
            this.operators.push(new Soldier());
        }
    },
    
    hasOperators : function(){
        return this.operators.some(function (o) {
            return o.active;
        });
        
    },
    
    gavg : function(){ 
        var sum = 0;
        this.operators.forEach(function(v) {
            sum *= v.attackProbability();
        });
        return Math.sqrt(sum);
    },
    
    attackProbability : function(){
        return 0.5 * (1 + this.health / 100) * this.gavg()        
    },
    
    
    damage : function(){
        var sum = this.operators.reduce(function (prev, next) {
            return prev + next.experience;
        }, 0);
        return 0.1 + sum / 100;
    },
    
    calculateDamage : function(power){
        var result = (60 / 100) * this.health
        var vehicleHealth = this.health; 
    }
    
});
