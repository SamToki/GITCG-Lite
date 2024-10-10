// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// (C) 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

// Simplifications
	// Read
		// Selection
		function ReadActionSelection() {
			return Game0.Selection.Action;
		}

		// Phase & turn
		function ReadPhase() {
			switch(true) {
				case Game.Status.Phase[1] == "Initialization":
				case Game.Status.Phase[1] == "InitialCharacter":
					AlertGameFunctionError("Function ReadPhase was called at an improper game phase \"" + Game.Status.Phase[1] + "\".");
					break;
				case Game.Status.Phase[2] == "Initialization":
				case Game.Status.Phase[2] == "Standby":
				case Game.Status.Phase[2].startsWith("Working") == true:
					AlertGameFunctionError("Function ReadPhase was called at an improper game phase \"" + Game.Status.Phase[1] + " " + Game.Status.Phase[2] + "\".");
					break;
				default:
					switch(Game.Status.Phase[1]) {
						case "StartingHand":
						case "RollPhase":
							return Game.Status.Phase[1] + " " + Game.Status.Phase[2];
						case "ActionPhase":
							switch(Game.Status.Phase[2]) {
								case "BeforeCombatAction":
								case "CombatAction":
								case "AfterCombatAction":
									return Game.Status.Phase[2];
								default:
									return Game.Status.Phase[1] + " " + Game.Status.Phase[2];
							}
						case "EndPhase":
							return "EndPhase";
						default:
							AlertGameFunctionError("The value of Game.Status.Phase[1] \"" + Game.Status.Phase[1] + "\" in function ReadPhase is invalid.");
							break;
					}
					break;
			}
		}
		function ReadPhase1() {
			switch(true) {
				case Game.Status.Phase[1] == "Initialization":
				case Game.Status.Phase[1] == "InitialCharacter":
					AlertGameFunctionError("Function ReadPhase1 was called at an improper game phase \"" + Game.Status.Phase[1] + "\".");
					break;
				default:
					return Game.Status.Phase[1];
			}
		}
		function IsInTurn() {
			// ???
		}

		// Card
			// Card handling
			function ReadCardNumberByID(CardID) {
				for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
					if(Casket.Card[Looper].BasicProperties.ID == CardID) {
						return Looper;
					}
				}
				return 0;
			}
			function ReadCardNameByID(CardID) {
				for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
					if(Casket.Card[Looper].BasicProperties.ID == CardID) {
						return ConvertEmptyName(Casket.Card[Looper].BasicProperties.Name);
					}
				}
				return null;
			}
			function ReadCardIDBySelection(SelfOrEnemy, CardType, Number) {
				let PlayerOrOpponent = ConvertSelfOrEnemyToPlayerOrOpponent(SelfOrEnemy);
				switch(CardType) {
					case "CharacterCard":
					case "SummonsCard":
					case "ActionCard":
						return Game.Status[PlayerOrOpponent][CardType][Number].ID;
					default:
						AlertGameFunctionError("The value of CardType \"" + CardType + "\" in function ReadCardIDBySelection is invalid.");
						break;
				}
			}

			// Card info
			function ReadCardKeywordsByID(CardID) {
				// ???
			}
			function ReadCharacterFromByID(CardID) {
				// ???
			}
			function ReadCharacterVAByID(CardID) {
				// ???
			}
			function ReadCharacterGenderByID(CardID) {
				// ???
			}
			function ReadCharacterBirthdayByID(CardID) {
				// ???
			}

			// Character card
			function IsCharacterAvailable(SelfOrEnemy, Number) {
				// ???
			}
			function IsCharacterAvailableByID(SelfOrEnemy, CardID) {
				// ???
			}
			function IsCharacterActiveByID(SelfOrEnemy, CardID) {
				// ???
			}
			function ReadActiveCharacterNumber(SelfOrEnemy) {
				// ???
			}
			function ReadHP(SelfOrEnemyOrMaster, ActiveOrNumber) {
				// ???
			}
			function IsHPFull(SelfOrEnemyOrMaster, ActiveOrNumber) {
				// ???
			}
			function ReadEnergy(SelfOrEnemyOrMaster, ActiveOrNumber) {
				// ???
			}
			function IsEnergyFull(SelfOrEnemyOrMaster, ActiveOrNumber) {
				// ???
			}
			function ReadElementType(SelfOrEnemy, ActiveOrNumber) {
				// ???
			}
			function ReadTalentCardID(PlayerOrOpponentOrMaster, ActiveOrNumber) {
				// ???
			}
			function ReadWeaponCardID(PlayerOrOpponentOrMaster, ActiveOrNumber) {
				// ???
			}
			function ReadArtifactCardID(PlayerOrOpponentOrMaster, ActiveOrNumber) {
				// ???
			}
			function IsStatusPresent(SelfOrEnemy, ActiveOrStandbyOrAllOrNumber, CardID, Number) {
				// ??? Caution: "(Copy)"
			}

			// Summons card
			function IsThereSummonsCards(SelfOrEnemy) {
				// ???
			}

			// Action card
			function ReadPileQuantity(SelfOrEnemy) {
				// ???
			}
			function ReadHandQuantity(SelfOrEnemy) {
				// ???
			}
			function IsCardInHandByID(CardID) {
				// ??? Caution: "(Copy)"
			}
			function IsThereSupportCards(SelfOrEnemy) {
				// ???
			}

		// Dice
		function ReadDiceQuantity(SelfOrEnemy, ElementTypeOrAll) {
			// ???
		}

		// Action
		function ReadActionType() {
			if(Game.Status.Action.Queue.length >= 2) {
				return Game.Status.Action.Queue[1].Type[1];
			} else {
				AlertGameFunctionError("Trying to read action type when the action queue is empty.");
			}
		}
		function ReadActionSubtype() {
			if(Game.Status.Action.Queue.length >= 2) {
				return Game.Status.Action.Queue[1].Type[2];
			} else {
				AlertGameFunctionError("Trying to read action type when the action queue is empty.");
			}
		}
		function ReadDamage() {
			// ???
		}
		function IsReactionTriggered(SelfOrEnemyOrMaster, ActiveOrStandbyOrAllOrNumber, ReactionType) {
			// ???
		}
		function ReadActionUsed(ActionType) {
			// ???
		}
		function IsCardPlayedByID(CardID) {
			Game.Status.Action.CardPlayed = Game.Status.Action.CardPlayed.replaceAll("(Copy)", "");
			return Game.Status.Action.CardPlayed == CardID;
		}
		function IsCardPlayedByKeyword(Keyword) {
			Game.Status.Action.CardPlayed = Game.Status.Action.CardPlayed.replaceAll("(Copy)", "");
			return Casket.Card[ReadCardNumberByID(Game.Status.Action.CardPlayed)].BasicProperties.Keyword.includes(Keyword);
		}

	// Write
		// Cost
		function AdjustCost(ActionType, ElementType, Operator, Amount) {
			// ???
		}

		// Combat actions
			// Properties
			function TreatAsFastAction() {
				Game.Status.Action.IsCombatAction = false;
			}
			function ApplyInfusion(ElementType) {
				// ???
			}

			// Execution
			function SetActiveCharacter(SelfOrEnemy, Number) {
				// ???
			}
			function SwitchCharacter(SelfOrEnemy, PreviousOrNextOrNumber) {
				// ???
			}
			function SwitchCharacterByID(SelfOrEnemy, CardID) {
				// ???
			}
			function Damage(SelfOrEnemyOrMaster, ActiveOrStandbyOrAllOrNumber, ElementType, Amount) {
				// ???
			}
			function AdjustDamage(ElementType, Operator, Amount) {
				// ???
			}
			function AdjustCriticalRate(SelfOrEnemy, Operator, Amount) {
				// ???
			}
			function AdjustCriticalDamage(SelfOrEnemy, Operator, Amount) {
				// ???
			}
			function Heal(SelfOrEnemyOrMaster, ActiveOrStandbyOrAllOrNumber, Amount) {
				// ???
			}
			function AdjustHeal(Operator, Amount) {
				// ???
			}
			function EndAction() {
				// ???
			}

		// Fast actions
			// Card
			function DrawCard(Amount) {
				// ???
			}
			function DrawCardByKeyword(Keyword, Amount) {
				// ???
			}
			function GetAffiliatedCard() {
				// ???
			}
			function DiscardCardManually(PlayerOrOpponent, CardType, Number) {
				// ???
			}
			function DiscardCardByID(SelfOrEnemy, CardID) {
				// ???
			}
			function AdjustCardDurationByID(SelfOrEnemy, CardID, Operator, Amount) {
				// ??? Caution: "(Copy)"
			}

			// Energy
			function RechargeEnergy(SelfOrEnemyOrMaster, ActiveOrStandbyOrAllOrNumber, Amount) {
				// ???
			}
			function ClearEnergy(SelfOrEnemyOrMaster, ActiveOrStandbyOrAllOrNumber) {
				// ???
			}

			// Counter
			function CountSupportCard() {
				// ???
			}
			
			// Status
			function AddElementApplication(SelfOrEnemy, ActiveOrStandbyOrAllOrNumber, ElementType) {
				// ???
			}
			function ClearElementApplication(SelfOrEnemy, ActiveOrStandbyOrAllOrNumber) {
				// ???
			}
			function AddStatus(SelfOrEnemy, ActiveOrStandbyOrAllOrNumber, CardID, Number) {
				// ??? Caution: "(Copy)"
			}
			function AddBuiltinStatus(SelfOrEnemy, ActiveOrStandbyOrAllOrNumber, Value) {
				// ??? Frozen, Satiety, ...
			}
			function ClearStatus(SelfOrEnemy, ActiveOrStandbyOrAllOrNumber) {
				// ???
			}
			function AdjustStatusDuration(SelfOrEnemy, ActiveOrStandbyOrAllOrNumber, CardID, Number, Operator, Amount) {
				// ??? Caution: "(Copy)"
			}

			// Usage
			function ConsumeUsage() {
				// ??? Glow once, using drop shadow in a special class.
			}

			// Dice
			function AddDice(SelfOrEnemy, ElementType, Amount) {
				// ???
			}
			function ConvertDice(SelfOrEnemy, TargetElementType, Amount) {
				// ???
			}

// Features
	// Converters
	function ConvertSelfOrEnemyToPlayerOrOpponent(SelfOrEnemy) {
		switch(true) {
			case Game.Status.Player.Turn == "InTurn":
				switch(SelfOrEnemy) {
					case "Self":
						return "Player";
					case "Enemy":
						return "Opponent";
					default:
						AlertGameFunctionError("The value of SelfOrEnemy \"" + SelfOrEnemy + "\" in function ConvertSelfOrEnemyToPlayerOrOpponent is invalid.");
						break;
				}
				break;
			case Game.Status.Opponent.Turn == "InTurn":
				switch(SelfOrEnemy) {
					case "Self":
						return "Opponent";
					case "Enemy":
						return "Player";
					default:
						AlertGameFunctionError("The value of SelfOrEnemy \"" + SelfOrEnemy + "\" in function ConvertSelfOrEnemyToPlayerOrOpponent is invalid.");
						break;
				}
				break;
			default:
				AlertGameFunctionError("Function ConvertSelfOrEnemyToPlayerOrOpponent was called when no one is in turn.");
				break;
		}
	}
