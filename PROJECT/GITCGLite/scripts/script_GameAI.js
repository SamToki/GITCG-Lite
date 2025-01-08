// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// © 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

// Features
	// Game
		function EvaluateAction(PlayerOrOpponent) {
			// ???
		}
		function RecommendAction() {
			// Evaluate actions
			// ???

			// Display
			if(Game.Status.Operation == "Table" && Game.Status.Player.Turn == "InTurn" && Game0.Selection.RecommendedAction.Type != "") {
				AddClass("Button_Game" + Game0.Selection.RecommendedAction.Type, "Glow");
			}
		}
		function OpponentAct() {
			switch(Game.Status.Phase[1]) {
				case "StartingHand":
					// ???
					break;
				case "InitialCharacter":
					let InitialCharacter = 0;
					for(let Looper = 1; Looper <= 3; Looper++) {
						if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.CombatOrientation == "Support") {
							InitialCharacter = Looper;
							break;
						}
					}
					if(InitialCharacter == 0) {
						InitialCharacter = 1;
					}
					Game.Status.Opponent.ActiveCharacter = InitialCharacter;
					break;
				case "RollPhase":
					// First roll
					for(let Looper = 1; Looper <= 8; Looper++) {
						Game.Status.Opponent.Dice[Looper].Type = ConvertNumberToElementType(Randomize(10, 17));
					}
					Game.Status.Opponent.RerollChance = 1;
					Scan();

					// Reroll (exclude all characters' elements)
					while(Game.Status.Opponent.RerollChance > 0) {
						// Select
						let DiceSelection = [0, true, true, true, true, true, true, true, true];
						for(let Looper = 1; Looper <= 8; Looper++) {
							if(Game.Status.Opponent.Dice[Looper].Type == "Omni") {
								DiceSelection[Looper] = false;
							} else {
								if(
									(Game.Status.Opponent.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[1].ID)].CharacterCardProperties.ElementType &&
									Game.Status.Opponent.CharacterCard[1].HP > 0) ||
									(Game.Status.Opponent.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[2].ID)].CharacterCardProperties.ElementType &&
									Game.Status.Opponent.CharacterCard[2].HP > 0) ||
									(Game.Status.Opponent.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[3].ID)].CharacterCardProperties.ElementType &&
									Game.Status.Opponent.CharacterCard[3].HP > 0)
								) {
									Game0.Selection.Dice[Looper] = false;
								}
							}
						}

						// Reroll
						for(let Looper = 1; Looper <= 8; Looper++) {
							if(DiceSelection[Looper] == true) {
								Game.Status.Opponent.Dice[Looper].Type = ConvertNumberToElementType(Randomize(10, 17));
							}
						}

						// Consume reroll chance
						Game.Status.Opponent.RerollChance--;
					}
					break;
				case "ActionPhase":
					// ???
					break;
				default:
					AlertSystemError("The value of Game.Status.Phase \"" + Game.Status.Phase + "\" in function OpponentAct is invalid.");
					break;
			}
		}
