// ---------------- board -------------------------------------------
function Board(height, width, probAccess) {	
	this.height = height;
	this.width = width;
	this.grid = (function(height, width) {
		var grid = new Array(new Array());
		for(var i = 1; i <= height; i++) {
			grid[i - 1] = [];
			for(var j = 1;j <= width; j++) {
				grid[i - 1][j - 1] = new Cell(i - 1, j - 1, probAccess);
			};
		};
		return grid;
	})(height, width);
	
	this.isSuitableForWeapon = function(pos) {
		if((this.grid[pos[0]][pos[1]].weaponOnCell > 0) || (this.grid[pos[0]][pos[1]].playerOnCell > 0) || (!this.grid[pos[0]][pos[1]].accessible)) {
			return false;
		} else {
			return true;
		};
	};
	
	this.isSuitableForPlayer = function(pos) {
		if((this.grid[pos[0]][pos[1]].triggerCombat) || (this.grid[pos[0]][pos[1]].weaponOnCell > 0) || (this.grid[pos[0]][pos[1]].playerOnCell > 0) || (!this.grid[pos[0]][pos[1]].accessible)) {
			return false;
		} else {
			return true;
		};
	};
	
	this.putWeaponOnBoard = function(id, pos) {
		this.grid[pos[0]][pos[1]].weaponOnCell = id;	
	};
	
	this.movePlayerOnBoard = function(id, lastPos, newPos) {
		if (lastPos !== 0) {
			this.grid[lastPos[0]][lastPos[1]].playerOnCell = 0;
			this.toggleTriggerArround(lastPos);	
		};
			this.grid[newPos[0]][newPos[1]].playerOnCell = id;
			this.toggleTriggerArround(newPos);	
	};

	this.toggleTriggerArround = function (pos) {
			if(pos[0] > 0) {
			this.grid[pos[0] - 1][pos[1]].toggleTrigger();	
			};
			if(pos[0] < this.height - 1) {
				this.grid[pos[0] + 1][pos[1]].toggleTrigger();	
			};
			if(pos[1] > 0) {
				this.grid[pos[0]][pos[1] - 1].toggleTrigger();	
			};
			if(pos[1] < this.width - 1) {
				this.grid[pos[0]][pos[1] + 1].toggleTrigger();	
			};
	};

	this.checkPlayerMovementOptions = function(pos, range) {
		var movementOptions = new Array(new Array()), nbOptions = 0;
		for (var top = pos[0] - 1; top >= Math.max(pos[0] - range, 0); top -= 1) {
			if ((this.grid[top][pos[1]].accessible) && (this.grid[top][pos[1]].playerOnCell === 0)) {
				movementOptions[nbOptions] = [top, pos[1]];
				nbOptions += 1;
			} else {
				break;
			};
		};
		for (var bottom = pos[0] + 1; bottom <= Math.min(pos[0] + range, this.height - 1); bottom += 1) {
			if ((this.grid[bottom][pos[1]].accessible) && (this.grid[bottom][pos[1]].playerOnCell === 0)) {
				movementOptions[nbOptions] = [bottom, pos[1]];
				nbOptions += 1;
			} else {
				break;
			};
		};
		for (var left = pos[1] - 1; left >= Math.max(pos[1] - range, 0); left -= 1) {
			if ((this.grid[pos[0]][left].accessible) && (this.grid[pos[0]][left].playerOnCell === 0)) {
				movementOptions[nbOptions] = [pos[0], left];
				nbOptions += 1;
			} else {
				break;
			};
		};
		for (var right = pos[1] + 1; right <= Math.min(pos[1] + range, this.width - 1); right += 1) {
			if ((this.grid[pos[0]][right].accessible) && (this.grid[pos[0]][right].playerOnCell === 0)) {
				movementOptions[nbOptions] = [pos[0], right];
				nbOptions += 1;
			} else {
				break;
			};
		};
		return movementOptions;
	};
};
