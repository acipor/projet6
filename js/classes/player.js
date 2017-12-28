// ----------------- player --------------------------
function Player(id, weapon, board) {
	this.id = id;
	this.hp = 100;
	this.weapon = weapon;
	this.lastPosition = 0;
	this.position = (function(id, last, board) {
		var rndPos, suitable = false;
		while (!suitable) {
			rndPos = [Math.floor(Math.random()*board.height), Math.floor(Math.random()*board.width)];
			suitable = board.isSuitableForPlayer(rndPos);	
		};
		board.movePlayerOnBoard(id, last, rndPos);
		return rndPos;
	})(this.id, this.lastPosition, board);

	this.movement = 3; /* deplacement 3 cases maximum */
	
	this.defensePosture = false;
		
	this.makeMovement = function(newPos, board) {
		this.lastPosition = this.position;
		board.movePlayerOnBoard(this.id, this.lastPosition, newPos);
		this.position = newPos;
	};
	
	this.lastMovementCells = function() {
		var lastMovement = new Array(new Array()), deltaRow, deltaCol;
		deltaRow = this.position[0] - this.lastPosition[0];
		deltaCol = this.position[1] - this.lastPosition[1];
		if(deltaRow > 0) {
			for (var right = 1; right <= deltaRow; right += 1) {
				lastMovement[right - 1] = [this.lastPosition[0] + right, this.lastPosition[1]];	
			}
		} else if (deltaRow < 0) {
			for (var left = 1; left <= Math.abs(deltaRow); left += 1) {
				lastMovement[left - 1] = [this.lastPosition[0] - left, this.lastPosition[1]];	
			}
		} else if (deltaCol > 0) {
			for (var bottom = 1; bottom <= deltaCol; bottom += 1) {
				lastMovement[bottom - 1] = [this.lastPosition[0], this.lastPosition[1] + bottom];	
			}
		} else if (deltaCol < 0) {
			for (var top = 1; top <= Math.abs(deltaCol); top += 1) {
				lastMovement[top - 1] = [this.lastPosition[0], this.lastPosition[1] - top];	
			}
		}
		return lastMovement;
	};
	
	this.takeDamages = function(damages) {
		if(this.defensePosture) {
			this.hp -= (damages / 2);	/* si defense 50% de degats */
		} else {
			this.hp -= damages; 
		}	
	};
};