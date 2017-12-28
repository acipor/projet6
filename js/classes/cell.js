// --------------------------  Cell ----------------------------------------
function Cell(rowIndex, colIndex, probAccess) {
	this.row = rowIndex;
	this.col = colIndex;
	this.triggerCombat = false;
	this.weaponOnCell = 0;
	this.playerOnCell = 0;
	this.accessible = Math.random() < probAccess ? true : false;
	this.toggleTrigger = function(){
		if (this.triggerCombat) {this.triggerCombat = false} else {this.triggerCombat = true} ;
	};
};