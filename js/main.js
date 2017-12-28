/* ---------------------------------- main.js  ----------------------*/

// ---------------------  display game ----------------
function displayGame(game) {
	displayBoard(game.board); // affichage du board
	
	for (var player in game.players) {
		displayPlayer(game.players[player]); // affichage des joueurs
		displayHP(game.players[player]);
	};
	
	for (var weapon in game.weapons) {
		displayWeapon(game.weapons[weapon]); // affichage des weapons
	};
	$("#player1-controls").css("color","black");
	$("#player2-controls").css("color","black");
};

// ---------------- display board ----------------------
function displayBoard(board) {	
	var $board = $("#board"); // affichage du bord avec des div
	var $row, $cell;
	
	$board.html("");
	for(var i = 0; i < board.grid.length; i++) {
		$row = $("<div class='row'></div>");
		for(var j=0; j < board.grid[i].length; j++) {
			$cell = $("<div class='cell'></div>");
			$cell.attr("id", "cell-" + board.grid[i][j].row + "-" + board.grid[i][j].col);
			board.grid[i][j].accessible ? $cell.addClass("cell-accessible") : $cell.addClass("cell-inaccessible");
			$cell.appendTo($row);	
		};
		$row.appendTo($board);
	};
};

// ---------------- display weapon ----------------------
function displayWeapon(weapon) {
	var classList;
	if (weapon.position === 0) {
	} else if ((typeof weapon.position === "string") && weapon.position.startsWith("player")) {
		classList = $("#" + weapon.position + "-controls .player-weapon-icon").attr("class").split(/\s+/);
		$.each(classList, function(index, item){
    		if (item !== "player-weapon-icon") {
       			$("#" + weapon.position + "-controls .player-weapon-icon").removeClass(item);
    		}
		});
		$("#" + weapon.position + "-controls .player-weapon-icon").addClass("cell-weapon" + weapon.id);
		$("#" + weapon.position + "-controls .player-weapon-specs").html(weapon.name + "<br>Dégâts : " + weapon.damages);
	} else {
		classList = $("#cell-" + weapon.position[0] + "-" + weapon.position[1]).attr("class").split(/\s+/);
		$.each(classList, function(index, item){
    		if ((item === "cell") || (item === "cell-accessible") || (item === "cell-inaccessible") || (item.startsWith("cell-player"))) {
       			
    		} else {
				$("#cell-" + weapon.position[0] + "-" + weapon.position[1]).removeClass(item);
			}
		});
		$("#cell-" + weapon.position[0] + "-" + weapon.position[1]).addClass("cell-weapon" + weapon.id);
	};
};

// ---------------- display player ----------------------
function displayPlayer(player) {
	// affichage des div joueurs
	if (player.lastPosition !== 0) {
		$("#cell-" + player.lastPosition[0] + "-" + player.lastPosition[1]).removeClass("cell-player" + player.id);	
	};
	$("#cell-" + player.position[0] + "-" + player.position[1]).addClass("cell-player" + player.id);
};

// ---------------- displayHP player ----------------------
function displayHP(player) {
	
	$("#player" + player.id + "-controls .player-hp").html("Santé:" + player.hp + "/100");
};

// ---------------- toogle movements ----------------------
function toggleMovement(movement) {
	if ($("#cell-" + movement[0] + "-" + movement[1]).hasClass("cell-movement")) {
		$("#cell-" + movement[0] + "-" + movement[1]).removeClass("cell-movement");
	} else {
		$("#cell-" + movement[0] + "-" + movement[1]).addClass("cell-movement");
	};
};

//----- setupMovementOptions ---------------------------------
function setupMovementOptions(movementOptions) {
	currentMovements = movementOptions;
	for (option in currentMovements) {
		$("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]).bind("click", 
		{row: currentMovements[option][0], col: currentMovements[option][1]}, currentGame.makeMovementTurn);
		toggleMovement(currentMovements[option]); // affichage des cell de mouvements
	};
};

//-------------------------------------------------------------------------------
function setupCombatOptions() {
	$("button[name='attack']").bind("click", {option: "atk"}, currentGame.makeCombatTurn);
	$("button[name='defense']").bind("click", {option: "def"}, currentGame.makeCombatTurn);
};

//------------------------------------------------------------------------------
function unsetMovementOptions(movementOptions) {
	for (option in currentMovements) {
		$("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]).unbind("click");
		toggleMovement(currentMovements[option]); // efface la classe cell-movement
	};
	displayPlayer(currentGame.currentPlayer);  // deplace le joueur
	movementOptions = null;
};

//-------------------------------------------------------------------------------------------
function unsetCombatOptions() {
	$("button[name='attack']").unbind("click");
	$("button[name='defense']").unbind("click");
};


//-------------------------------------------------------------------------------------------
var currentGame;
var currentMovements;

function playGame() {	
	currentGame = new Game(10,10,0.9,0.9,4); // param: boardWidth, boardHeight, boardAccess, weaponAvail, maxBonusWeapons
	displayGame(currentGame);
	currentGame.nextMovementTurn();	
};

$(document).ready(function() {
	$("button[name='playGame']").click(playGame);
	playGame();
});