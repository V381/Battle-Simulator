///**
// * Created by Pavle Paunovic on 10/21/2016.
// */
//


function Unit (opts) {
    for (var i in opts) {
        if (opts.hasOwnProperty(i) && opts[i] !== undefined) this[i] = opts[i];
    }
}

function Unit (opts) {
    for (var i in opts) {
        if (opts.hasOwnProperty(i) && opts[i] !== undefined) this[i] = opts[i];
    }
}

Unit.prototype = { 
    get: function(key) {
      var v = this[key];
      if (typeof v === "function") return v();
      else return v;
    },
    
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
        if (!unit.get('active')) return; 
        if (unit.get('health') <= 0) unit.active = false; 
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
    },
    
    damage : function(){
        return 0.05 + this.experience / 100;
    }

});

function Vehicle(opts) {
    Unit.call(this, opts);
    this.operators = [];
    var maxOperators = Math.floor(Math.random() * 3) + 1;
    for (var i = 0; i < maxOperators; i += 1) {
        this.operators.push(new Soldier());
    }
}

Vehicle.prototype = new Unit({
    
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
        
        var totalVehicleDamage = (this.health) - ((60 / 100) * power); 
        this.health -= 0.6 * power; 
        
    
        var ops = this.operators; // by taking the reference as a local variable, we don't have to do a lookup (faster)
        var firstOpIndex = Math.floor(Math.random * ops.length);  // calculate the index of the op which will get hit first (see your own code)
        var remainingDmg = 0.2 / (opts.length - 1); // calculate the remaning damage: 0.1 when two ops left, otherwise 0.2
        ops.forEach(function (o, i) { // go through the ops, o is op, i is index 
            if (i === firstOpIndex) o.health -= power * 0.2; // if the index is the same as the first hit op, apply 0.2
            else { 
                o.health -= remainingDmg * power; // otherwise apply whatever is left as damage either 0.1 or 0.2
            }
        });
    },
    
    vehicleHealth: 100,
    health: function () {
      var avgOps = this.operators.reduce(function (p, o) { return p + o.health; }, 0) / this.operators.length;
      return avgOps + this.vehicleHealth;
    },
    
});


function Squads(opts){
    this.squad = [] 
    
}

Squads.prototype = new Unit({
    squad: null, 
    isActive : function(){

    },
    generateSquad : function(){
        var numberOfUnits = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // The number of units per squad: 5 <= n <= 10
        for(var i = 0; i <= numberOfUnits; i++){
            if (i % 2 === 0){
                this.squad.push(new Vehicle());
            }else{
                this.squad.push(new Soldier());
            }
        }

        return this;
    },
    
    gavg : function(){

    },
    
    attackProbability : function(){

    },
    
    damage : function(){
        
    },

    attackStrategy : { 
        random : function(){

        },
        weakest : function(){

        },
        strongest : function(){
            
        }
            
    }
    
});
