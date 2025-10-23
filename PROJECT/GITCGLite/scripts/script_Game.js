// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// © 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

// Refresh
	// Game
	function ClockGame() {
		// Automation
		clearTimeout(Automation.ClockGame);
		if(Game.Status.Operation != "Title") {
			if(Game.Status.Operation == "Loading" && Game0.Load.IsPaused == false) {
				Automation.ClockGame = setTimeout(ClockGame, 0);
			} else {
				Automation.ClockGame = setTimeout(ClockGame, Automation.ClockRate);
			}
		}

		// Call
		if(Game.Status.Operation == "Loading" && Game0.Load.IsPaused == false) {
			RefreshLoadingScreen();
		}
		if(Game.Status.Operation != "Loading") {
			RefreshHPDisplay();
		}
	}
		// Sub-functions
		function RefreshLoadingScreen() {
			// Initialization
			Game0.Load.ClockTime = Date.now();
			let Counter = 0, CardValidityMessage = "", PartyBalance = 0;

			// Load
			switch(true) {
				// Check casket
				case Game0.Load.Progress >= 0 && Game0.Load.Progress < 8:
					ChangeText("Label_GameLoadingPrompt", "正在检查牌盒...");
					for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
						if(Casket.Card[Looper].BasicProperties.ID == "" ||
						Casket.Card[Looper].BasicProperties.ID == "UnknownCard" ||
						Casket.Card[Looper].BasicProperties.ID == "EmptyCharacterCard" ||
						Casket.Card[Looper].BasicProperties.ID == "EmptyActionCard" ||
						Casket.Card[Looper].BasicProperties.ID == "EmptyComplementCard" ||
						// ???
						Casket.Card[Looper].BasicProperties.ID == "???") {
							ShowDialog("Game_LoadingError",
								"Error",
								"牌盒中第" + Looper + "张卡牌「" + ConvertEmptyName(Casket.Card[Looper].BasicProperties.Name) + "」的 ID「" + Casket.Card[Looper].BasicProperties.ID + "」不合法。请尝试修复牌盒。",
								"", "", "", "确定");
							Game.Status.Operation = "Title";
							setTimeout(ExitGame, 0);
							return;
						}
					}
					for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
						Counter = 0;
						for(let Looper2 = 1; Looper2 < Casket.Card.length; Looper2++) {
							if(Casket.Card[Looper].BasicProperties.ID == Casket.Card[Looper2].BasicProperties.ID) {
								Counter++;
							}
						}
						if(Counter > 1) {
							ShowDialog("Game_LoadingError",
								"Error",
								"牌盒中存在重复的卡牌 ID「" + Casket.Card[Looper].BasicProperties.ID + "」。请尝试修复牌盒。",
								"", "", "", "确定");
							Game.Status.Operation = "Title";
							setTimeout(ExitGame, 0);
							return;
						}
					}
					Counter = 0;
					for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
						if(Casket.Card[Looper].BasicProperties.Type == "CharacterCard") {
							Counter++;
						}
					}
					if(Counter < 3) {
						ShowDialog("Game_LoadingError",
							"Error",
							"牌盒中只有" + Counter + "张角色牌。至少需要3张角色牌才能开始游戏。",
							"", "", "", "确定");
						Game.Status.Operation = "Title";
						setTimeout(ExitGame, 0);
						return;
					}
					Counter = 0;
					for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
						if(Casket.Card[Looper].BasicProperties.Type != "CharacterCard") {
							Counter++;
						}
					}
					if(Counter < 30) {
						ShowDialog("Game_LoadingError",
							"Error",
							"牌盒中只有" + Counter + "张行动牌。至少需要30张行动牌才能开始游戏。",
							"", "", "", "确定");
						Game.Status.Operation = "Title";
						setTimeout(ExitGame, 0);
						return;
					}
					Game0.Load.Progress += 8;
					break;

				// Prepare decks
				case Game0.Load.Progress >= 8 && Game0.Load.Progress < 12:
					ChangeText("Label_GameLoadingPrompt", "正在准备牌组...");
					switch(true) {
						case Casket.DeckSelection.Player == -2:
							GenerateTemporaryDeck("Player");
							break;
						case Casket.DeckSelection.Player == -1:
							RandomlySelectDeck("Player");
							break;
						case Casket.DeckSelection.Player > 0:
							if(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection.length != 4) {
								ShowDialog("Game_LoadingError",
									"Error",
									"您的牌组中有" + (Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection.length - 1) + "张角色牌。牌组中必须有且仅有3张角色牌。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							}
							if(Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection.length != 31) {
								ShowDialog("Game_LoadingError",
									"Error",
									"您的牌组中有" + (Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection.length - 1) + "张行动牌。牌组中必须有且仅有30张行动牌。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							}
							LoadDeck("Player");
							break;
						default:
							AlertSystemError("The value of Casket.DeckSelection.Player \"" + Casket.DeckSelection.Player + "\" in function ClockGame is invalid.");
							break;
					}
					switch(true) {
						case Casket.DeckSelection.Opponent == -2:
							GenerateTemporaryDeck("Opponent");
							break;
						case Casket.DeckSelection.Opponent == -1:
							RandomlySelectDeck("Opponent");
							break;
						case Casket.DeckSelection.Opponent > 0:
							if(Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection.length != 4) {
								ShowDialog("Game_LoadingError",
									"Error",
									"对手牌组中有" + (Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection.length - 1) + "张角色牌。牌组中必须有且仅有3张角色牌。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							}
							if(Casket.Deck[Casket.DeckSelection.Opponent].ActionCardSelection.length != 31) {
								ShowDialog("Game_LoadingError",
									"Error",
									"对手牌组中有" + (Casket.Deck[Casket.DeckSelection.Opponent].ActionCardSelection.length - 1) + "张行动牌。牌组中必须有且仅有30张行动牌。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							}
							LoadDeck("Opponent");
							break;
						default:
							AlertSystemError("The value of Casket.DeckSelection.Opponent \"" + Casket.DeckSelection.Opponent + "\" in function ClockGame is invalid.");
							break;
					}
					setTimeout(RefreshGame, 0);
					Game0.Load.Progress += 4;
					break;

				// Check cards
					// Player character cards
					case Game0.Load.Progress >= 12 && Game0.Load.Progress < 18:
						ChangeText("Label_GameLoadingPrompt", "正在检查玩家角色牌... " + (Game0.Load.Progress - 10) / 2 + "/3");
						CardValidityMessage = CheckCardValidity(ReadCardNumberByID(Game.Status.Player.CharacterCard[(Game0.Load.Progress - 10) / 2].ID));
						switch(CardValidityMessage) {
							case "Valid":
								Game0.Load.Progress += 2;
								break;
							case "Unknown":
								ShowDialog("Game_LoadingError",
									"Error",
									"您的牌组含有未知的角色牌。请尝试修复牌组。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							default:
								console.warn("● 卡牌不合法\n" +
									CardValidityMessage);
								ShowDialog("Game_LoadingError",
									"Error",
									"您的角色牌「" + ReadCardNameByID(Game.Status.Player.CharacterCard[(Game0.Load.Progress - 10) / 2].ID) + "」不合法。请尝试修复该卡牌，或向卡牌作者提供反馈。<br />" +
									"<br />" +
									"详细信息：" + CardValidityMessage,
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
						}
						break;

					// Player action cards
					case Game0.Load.Progress >= 18 && Game0.Load.Progress < 78:
						ChangeText("Label_GameLoadingPrompt", "正在检查玩家行动牌... " + (Game0.Load.Progress - 16) / 2 + "/30");
						CardValidityMessage = CheckCardValidity(ReadCardNumberByID(Game.Status.Player.ActionCard[(Game0.Load.Progress - 16) / 2].ID));
						switch(CardValidityMessage) {
							case "Valid":
								if(IsCardApplicable("Player", ReadCardNumberByID(Game.Status.Player.ActionCard[(Game0.Load.Progress - 16) / 2].ID)) == true ||
								Casket.DeckSelection.Player == -2 ||
								System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
									Game0.Load.Progress += 2;
								} else {
									ShowDialog("Game_LoadingPaused",
										"Question",
										"您的牌组配置不当。行动牌「" + ReadCardNameByID(Game.Status.Player.ActionCard[(Game0.Load.Progress - 16) / 2].ID) + "」不适用于任何角色牌，将无法出牌。是否继续？",
										"不再询问", "", "继续", "退出");
									Game0.Load.IsPaused = true;
								}
								break;
							case "Unknown":
								ShowDialog("Game_LoadingError",
									"Error",
									"您的牌组含有未知的行动牌。请尝试修复牌组。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							default:
								console.warn("● 卡牌不合法\n" +
									CardValidityMessage);
								ShowDialog("Game_LoadingError",
									"Error",
									"您的行动牌「" + ReadCardNameByID(Game.Status.Player.ActionCard[(Game0.Load.Progress - 16) / 2].ID) + "」不合法。请尝试修复该卡牌，或向卡牌作者提供反馈。<br />" +
									"<br />" +
									"详细信息：" + CardValidityMessage,
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
						}
						break;

					// Opponent character cards
					case Game0.Load.Progress >= 78 && Game0.Load.Progress < 84:
						ChangeText("Label_GameLoadingPrompt", "正在检查对手角色牌... " + (Game0.Load.Progress - 76) / 2 + "/3");
						CardValidityMessage = CheckCardValidity(ReadCardNumberByID(Game.Status.Opponent.CharacterCard[(Game0.Load.Progress - 76) / 2].ID));
						switch(CardValidityMessage) {
							case "Valid":
								Game0.Load.Progress += 2;
								break;
							case "Unknown":
								ShowDialog("Game_LoadingError",
									"Error",
									"对手牌组含有未知的角色牌。请尝试修复牌组。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							default:
								console.warn("● 卡牌不合法\n" +
									CardValidityMessage);
								ShowDialog("Game_LoadingError",
									"Error",
									"对手角色牌「" + ReadCardNameByID(Game.Status.Opponent.CharacterCard[(Game0.Load.Progress - 76) / 2].ID) + "」不合法。请尝试修复该卡牌，或向卡牌作者提供反馈。<br />" +
									"<br />" +
									"详细信息：" + CardValidityMessage,
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
						}
						break;

					// Opponent action cards
					case Game0.Load.Progress >= 84 && Game0.Load.Progress < 144:
						ChangeText("Label_GameLoadingPrompt", "正在检查对手行动牌... " + (Game0.Load.Progress - 82) / 2 + "/30");
						CardValidityMessage = CheckCardValidity(ReadCardNumberByID(Game.Status.Opponent.ActionCard[(Game0.Load.Progress - 82) / 2].ID));
						switch(CardValidityMessage) {
							case "Valid":
								if(IsCardApplicable("Opponent", ReadCardNumberByID(Game.Status.Opponent.ActionCard[(Game0.Load.Progress - 82) / 2].ID)) == true ||
								Casket.DeckSelection.Opponent == -2 ||
								System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
									Game0.Load.Progress += 2;
								} else {
									ShowDialog("Game_LoadingPaused",
										"Question",
										"对手牌组配置不当。行动牌「" + ReadCardNameByID(Game.Status.Opponent.ActionCard[(Game0.Load.Progress - 82) / 2].ID) + "」不适用于任何角色牌，将无法出牌。是否继续？",
										"不再询问", "", "继续", "退出");
									Game0.Load.IsPaused = true;
								}
								break;
							case "Unknown":
								ShowDialog("Game_LoadingError",
									"Error",
									"对手牌组含有未知的行动牌。请尝试修复牌组。",
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
							default:
								console.warn("● 卡牌不合法\n" +
									CardValidityMessage);
								ShowDialog("Game_LoadingError",
									"Error",
									"对手行动牌「" + ReadCardNameByID(Game.Status.Opponent.ActionCard[(Game0.Load.Progress - 82) / 2].ID) + "」不合法。请尝试修复该卡牌，或向卡牌作者提供反馈。<br />" +
									"<br />" +
									"详细信息：" + CardValidityMessage,
									"", "", "", "确定");
								Game.Status.Operation = "Title";
								setTimeout(ExitGame, 0);
								return;
						}
						break;

				// Check decks
					// Player
						// Character cards configuration
						case Game0.Load.Progress >= 144 && Game0.Load.Progress < 146:
							ChangeText("Label_GameLoadingPrompt", "正在检查玩家牌组配置... 1/7");
							PartyBalance = 0;
							for(let Looper = 1; Looper <= 3; Looper++) {
								switch(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.CombatOrientation) {
									case "Main":
										PartyBalance++;
										break;
									case "Support":
										PartyBalance--;
										break;
									default:
										AlertSystemError("The value of Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.CombatOrientation \"" + Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.CombatOrientation + "\" in function ClockGame is invalid.");
										break;
								}
							}
							if(Casket.DeckSelection.Player == -2 || System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								switch(PartyBalance) {
									case 3:
										ShowDialog("Game_LoadingPaused",
											"Question",
											"您的牌组配置不当。所有角色均为主力角色，缺乏辅助角色。是否继续？",
											"不再询问", "", "继续", "退出");
										Game0.Load.IsPaused = true;
										break;
									case -3:
										ShowDialog("Game_LoadingPaused",
											"Question",
											"您的牌组配置不当。所有角色均为辅助角色，缺乏主力角色。是否继续？",
											"不再询问", "", "继续", "退出");
										Game0.Load.IsPaused = true;
										break;
									default:
										Game0.Load.Progress += 2;
										break;
								}
							}
							break;
						case Game0.Load.Progress >= 146 && Game0.Load.Progress < 148:
							ChangeText("Label_GameLoadingPrompt", "正在检查玩家牌组配置... 2/7");
							if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[1].ID)].CharacterCardProperties.ElementType != Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[2].ID)].CharacterCardProperties.ElementType ||
							Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[2].ID)].CharacterCardProperties.ElementType != Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[3].ID)].CharacterCardProperties.ElementType ||
							Casket.DeckSelection.Player == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"您的牌组配置不当。所有角色元素类型相同，难以触发元素反应。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Talent cards configuration
						case Game0.Load.Progress >= 148 && Game0.Load.Progress < 150:
							ChangeText("Label_GameLoadingPrompt", "正在检查玩家牌组配置... 3/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.Type == "TalentCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Player == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"您的牌组配置不当。行动牌中没有天赋牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Weapon cards configuration
						case Game0.Load.Progress >= 150 && Game0.Load.Progress < 152:
							ChangeText("Label_GameLoadingPrompt", "正在检查玩家牌组配置... 4/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.Type == "WeaponCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Player == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"您的牌组配置不当。行动牌中没有武器牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Artifact cards configuration
						case Game0.Load.Progress >= 152 && Game0.Load.Progress < 154:
							ChangeText("Label_GameLoadingPrompt", "正在检查玩家牌组配置... 5/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.Type == "ArtifactCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Player == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"您的牌组配置不当。行动牌中没有圣遗物牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Support cards configuration
						case Game0.Load.Progress >= 154 && Game0.Load.Progress < 156:
							ChangeText("Label_GameLoadingPrompt", "正在检查玩家牌组配置... 6/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.Type == "SupportCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Player == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"您的牌组配置不当。行动牌中没有支援牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Event cards configuration
						case Game0.Load.Progress >= 156 && Game0.Load.Progress < 158:
							ChangeText("Label_GameLoadingPrompt", "正在检查玩家牌组配置... 7/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.Type == "EventCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Player == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"您的牌组配置不当。行动牌中没有事件牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

					// Opponent
						// Character cards configuration
						case Game0.Load.Progress >= 158 && Game0.Load.Progress < 160:
							ChangeText("Label_GameLoadingPrompt", "正在检查对手牌组配置... 1/7");
							PartyBalance = 0;
							for(let Looper = 1; Looper <= 3; Looper++) {
								switch(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.CombatOrientation) {
									case "Main":
										PartyBalance++;
										break;
									case "Support":
										PartyBalance--;
										break;
									default:
										AlertSystemError("The value of Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.CombatOrientation \"" + Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.CombatOrientation + "\" in function ClockGame is invalid.");
										break;
								}
							}
							if(Casket.DeckSelection.Opponent == -2 || System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								switch(PartyBalance) {
									case 3:
										ShowDialog("Game_LoadingPaused",
											"Question",
											"对手牌组配置不当。所有角色均为主力角色，缺乏辅助角色。是否继续？",
											"不再询问", "", "继续", "退出");
										Game0.Load.IsPaused = true;
										break;
									case -3:
										ShowDialog("Game_LoadingPaused",
											"Question",
											"对手牌组配置不当。所有角色均为辅助角色，缺乏主力角色。是否继续？",
											"不再询问", "", "继续", "退出");
										Game0.Load.IsPaused = true;
										break;
									default:
										Game0.Load.Progress += 2;
										break;
								}
							}
							break;
						case Game0.Load.Progress >= 160 && Game0.Load.Progress < 162:
							ChangeText("Label_GameLoadingPrompt", "正在检查对手牌组配置... 2/7");
							if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[1].ID)].CharacterCardProperties.ElementType != Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[2].ID)].CharacterCardProperties.ElementType ||
							Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[2].ID)].CharacterCardProperties.ElementType != Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[3].ID)].CharacterCardProperties.ElementType ||
							Casket.DeckSelection.Opponent == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"对手牌组配置不当。所有角色元素类型相同，难以触发元素反应。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Talent cards configuration
						case Game0.Load.Progress >= 162 && Game0.Load.Progress < 164:
							ChangeText("Label_GameLoadingPrompt", "正在检查对手牌组配置... 3/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.Type == "TalentCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Opponent == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"对手牌组配置不当。行动牌中没有天赋牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Weapon cards configuration
						case Game0.Load.Progress >= 164 && Game0.Load.Progress < 166:
							ChangeText("Label_GameLoadingPrompt", "正在检查对手牌组配置... 4/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.Type == "WeaponCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Opponent == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"对手牌组配置不当。行动牌中没有武器牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Artifact cards configuration
						case Game0.Load.Progress >= 166 && Game0.Load.Progress < 168:
							ChangeText("Label_GameLoadingPrompt", "正在检查对手牌组配置... 5/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.Type == "ArtifactCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Opponent == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"对手牌组配置不当。行动牌中没有圣遗物牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Support cards configuration
						case Game0.Load.Progress >= 168 && Game0.Load.Progress < 170:
							ChangeText("Label_GameLoadingPrompt", "正在检查对手牌组配置... 6/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.Type == "SupportCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Opponent == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"对手牌组配置不当。行动牌中没有支援牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

						// Event cards configuration
						case Game0.Load.Progress >= 170 && Game0.Load.Progress < 172:
							ChangeText("Label_GameLoadingPrompt", "正在检查对手牌组配置... 7/7");
							Counter = 0;
							for(let Looper = 1; Looper <= 30; Looper++) {
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.Type == "EventCard") {
									Counter++;
								}
							}
							if(Counter > 0 ||
							Casket.DeckSelection.Opponent == -2 ||
							System.DontShowAgain.includes("GITCGLite_Game_LoadingPaused") == true) {
								Game0.Load.Progress += 2;
							} else {
								ShowDialog("Game_LoadingPaused",
									"Question",
									"对手牌组配置不当。行动牌中没有事件牌。是否继续？",
									"不再询问", "", "继续", "退出");
								Game0.Load.IsPaused = true;
							}
							break;

				// Request images
					// Normal attack images
					case Game0.Load.Progress >= 172 && Game0.Load.Progress < 178:
						ChangeText("Label_GameLoadingPrompt", "正在请求普通攻击图像... " + (Game0.Load.Progress - 172) + "/5");
						if(Game0.Load.Progress == 172) {
							ResetPreloadImages();
							ChangeImage("Image_Preload1", "images/NormalAttack_Sword.png");
							ChangeImage("Image_Preload2", "images/NormalAttack_Claymore.png");
							ChangeImage("Image_Preload3", "images/NormalAttack_Polearm.png");
							ChangeImage("Image_Preload4", "images/NormalAttack_Catalyst.png");
							ChangeImage("Image_Preload5", "images/NormalAttack_Bow.png");
						}
						Counter = 0;
						for(let Looper = 1; Looper <= 5; Looper++) {
							if(IsImageLoaded("Image_Preload" + Looper) == true) {
								Counter++;
							}
						}
						Game0.Load.Progress = 173 + Counter;
						break;

					// Player character cards
					case Game0.Load.Progress >= 178 && Game0.Load.Progress < 212:
						ChangeText("Label_GameLoadingPrompt", "正在请求玩家角色牌图像... " + (Game0.Load.Progress - 178) + "/33");
						if(Game0.Load.Progress == 178) {
							ResetPreloadImages();
							for(let Looper = 1; Looper <= 3; Looper++) {
								ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 1), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].BasicProperties.Image);
								ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 2), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].ElementalSkill.Image);
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.HasSecondaryElementalSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 3), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].SecondaryElementalSkill.Image);
								}
								ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 4), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].ElementalBurst.Image);
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.HasIntroSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 5), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].IntroSkill.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.HasOutroSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 6), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].OutroSkill.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.HasPassiveSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 7), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].PassiveSkill.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.HasAffiliatedCard == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 8), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].AffiliatedCard.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].BasicProperties.StatusQuantity >= 1) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 9), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Status[1].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].BasicProperties.StatusQuantity >= 2) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 10), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Status[2].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].BasicProperties.StatusQuantity >= 3) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 11), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Status[3].Image);
								}
							}
						}
						Counter = 0;
						for(let Looper = 1; Looper <= 33; Looper++) {
							if(IsImageLoaded("Image_Preload" + Looper) == true) {
								Counter++;
							}
						}
						Game0.Load.Progress = 179 + Counter;
						break;

					// Player action cards
					case Game0.Load.Progress >= 212 && Game0.Load.Progress < 333:
						ChangeText("Label_GameLoadingPrompt", "正在请求玩家行动牌图像... " + (Game0.Load.Progress - 212) + "/120");
						if(Game0.Load.Progress == 212) {
							ResetPreloadImages();
							for(let Looper = 1; Looper <= 30; Looper++) {
								ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 1), Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.Image);
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.StatusQuantity >= 1) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 2), Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].Status[1].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.StatusQuantity >= 2) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 3), Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].Status[2].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].BasicProperties.StatusQuantity >= 3) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 4), Casket.Card[ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID)].Status[3].Image);
								}
							}
						}
						Counter = 0;
						for(let Looper = 1; Looper <= 120; Looper++) {
							if(IsImageLoaded("Image_Preload" + Looper) == true) {
								Counter++;
							}
						}
						Game0.Load.Progress = 213 + Counter;
						break;

					// Opponent character cards
					case Game0.Load.Progress >= 333 && Game0.Load.Progress < 367:
						ChangeText("Label_GameLoadingPrompt", "正在请求对手角色牌图像... " + (Game0.Load.Progress - 333) + "/33");
						if(Game0.Load.Progress == 333) {
							ResetPreloadImages();
							for(let Looper = 1; Looper <= 3; Looper++) {
								ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 1), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].BasicProperties.Image);
								ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 2), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].ElementalSkill.Image);
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.HasSecondaryElementalSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 3), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].SecondaryElementalSkill.Image);
								}
								ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 4), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].ElementalBurst.Image);
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.HasIntroSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 5), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].IntroSkill.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.HasOutroSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 6), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].OutroSkill.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.HasPassiveSkill == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 7), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].PassiveSkill.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.HasAffiliatedCard == true) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 8), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].AffiliatedCard.Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].BasicProperties.StatusQuantity >= 1) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 9), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Status[1].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].BasicProperties.StatusQuantity >= 2) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 10), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Status[2].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].BasicProperties.StatusQuantity >= 3) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 11 + 11), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Status[3].Image);
								}
							}
						}
						Counter = 0;
						for(let Looper = 1; Looper <= 33; Looper++) {
							if(IsImageLoaded("Image_Preload" + Looper) == true) {
								Counter++;
							}
						}
						Game0.Load.Progress = 334 + Counter;
						break;

					// Opponent action cards
					case Game0.Load.Progress >= 367 && Game0.Load.Progress < 488:
						ChangeText("Label_GameLoadingPrompt", "正在请求对手行动牌图像... " + (Game0.Load.Progress - 367) + "/120");
						if(Game0.Load.Progress == 367) {
							ResetPreloadImages();
							for(let Looper = 1; Looper <= 30; Looper++) {
								ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 1), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.Image);
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.StatusQuantity >= 1) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 2), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].Status[1].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.StatusQuantity >= 2) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 3), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].Status[2].Image);
								}
								if(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].BasicProperties.StatusQuantity >= 3) {
									ChangeImage("Image_Preload" + ((Looper - 1) * 4 + 4), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID)].Status[3].Image);
								}
							}
						}
						Counter = 0;
						for(let Looper = 1; Looper <= 120; Looper++) {
							if(IsImageLoaded("Image_Preload" + Looper) == true) {
								Counter++;
							}
						}
						Game0.Load.Progress = 368 + Counter;
						break;

				// Request sounds
				case Game0.Load.Progress >= 488 && Game0.Load.Progress < 518:
					ChangeText("Label_GameLoadingPrompt", "正在请求音效... " + (Game0.Load.Progress - 488) + "/29");
					if(Game0.Load.Progress == 488) {
						ResetPreloadAudio();
						if(Subsystem.Audio.SoundVolume > 0) {
							LoadAudio("Audio_Preload1", "../audio/Beep.mp3");
							LoadAudio("Audio_Preload2", "audio/Attack.mp3");
							LoadAudio("Audio_Preload3", "audio/Buff.mp3");
							LoadAudio("Audio_Preload4", "audio/CardDisappear.mp3");
							LoadAudio("Audio_Preload5", "audio/Click.mp3");
							LoadAudio("Audio_Preload6", "audio/Counter.mp3");
							LoadAudio("Audio_Preload7", "audio/CreateDice.mp3");
							LoadAudio("Audio_Preload8", "audio/Defeat.mp3");
							LoadAudio("Audio_Preload9", "audio/DrawCard.mp3");
							LoadAudio("Audio_Preload10", "audio/Fallen.mp3");
							LoadAudio("Audio_Preload11", "audio/Heal.mp3");
							LoadAudio("Audio_Preload12", "audio/Invalid.mp3");
							LoadAudio("Audio_Preload13", "audio/NewPhase.mp3");
							LoadAudio("Audio_Preload14", "audio/NewRound.mp3");
							LoadAudio("Audio_Preload15", "audio/PlayCard1.mp3");
							LoadAudio("Audio_Preload16", "audio/PlayCard2.mp3");
							LoadAudio("Audio_Preload17", "audio/RechargeComplete.mp3");
							LoadAudio("Audio_Preload18", "audio/RollDice.mp3");
							LoadAudio("Audio_Preload19", "audio/RollPhaseSelectDice.mp3");
							LoadAudio("Audio_Preload20", "audio/SelectCard.mp3");
							LoadAudio("Audio_Preload21", "audio/SelectSkill.mp3");
							LoadAudio("Audio_Preload22", "audio/SkillIndicator.mp3");
							LoadAudio("Audio_Preload23", "audio/Start.mp3");
							LoadAudio("Audio_Preload24", "audio/SwitchCharacter.mp3");
							LoadAudio("Audio_Preload25", "audio/SwitchStartingHand.mp3");
							LoadAudio("Audio_Preload26", "audio/TableSelectDice.mp3");
							LoadAudio("Audio_Preload27", "audio/Tuning.mp3");
							LoadAudio("Audio_Preload28", "audio/Turn.mp3");
							LoadAudio("Audio_Preload29", "audio/Victory.mp3");
						}
					}
					Counter = 0;
					for(let Looper = 1; Looper <= 29; Looper++) {
						if(IsAudioLoaded("Audio_Preload" + Looper) == true) {
							Counter++;
						}
					}
					Game0.Load.Progress = 489 + Counter;
					break;

				// Request voiceovers
					// Player
					case Game0.Load.Progress >= 518 && Game0.Load.Progress < 564:
						ChangeText("Label_GameLoadingPrompt", "正在请求玩家角色语音... " + (Game0.Load.Progress - 518) + "/45");
						if(Game0.Load.Progress == 518) {
							ResetPreloadAudio();
							if(Subsystem.Audio.VoiceVolume > 0) {
								for(let Looper = 1; Looper <= 3; Looper++) {
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 1), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.BecomingActive[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 2), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.BecomingActive[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 3), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.BecomingActive[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 4), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.ElementalSkill[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 5), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.ElementalSkill[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 6), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.ElementalSkill[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 7), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.ElementalBurst[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 8), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.ElementalBurst[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 9), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.ElementalBurst[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 10), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.HeavyHitTaken[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 11), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.HeavyHitTaken[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 12), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.HeavyHitTaken[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 13), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.Fallen[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 14), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.Fallen[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 15), Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].Voiceover.Fallen[3]);
								}
							}
						}
						Counter = 0;
						for(let Looper = 1; Looper <= 45; Looper++) {
							if(IsAudioLoaded("Audio_Preload" + Looper) == true) {
								Counter++;
							}
						}
						Game0.Load.Progress = 519 + Counter;
						break;

					// Opponent
					case Game0.Load.Progress >= 564 && Game0.Load.Progress < 610:
						ChangeText("Label_GameLoadingPrompt", "正在请求对手角色语音... " + (Game0.Load.Progress - 564) + "/45");
						if(Game0.Load.Progress == 564) {
							ResetPreloadAudio();
							if(Subsystem.Audio.VoiceVolume > 0) {
								for(let Looper = 1; Looper <= 3; Looper++) {
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 1), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.BecomingActive[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 2), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.BecomingActive[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 3), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.BecomingActive[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 4), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.ElementalSkill[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 5), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.ElementalSkill[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 6), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.ElementalSkill[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 7), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.ElementalBurst[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 8), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.ElementalBurst[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 9), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.ElementalBurst[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 10), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.HeavyHitTaken[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 11), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.HeavyHitTaken[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 12), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.HeavyHitTaken[3]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 13), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.Fallen[1]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 14), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.Fallen[2]);
									LoadAudio("Audio_Preload" + ((Looper - 1) * 15 + 15), Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].Voiceover.Fallen[3]);
								}
							}
						}
						Counter = 0;
						for(let Looper = 1; Looper <= 45; Looper++) {
							if(IsAudioLoaded("Audio_Preload" + Looper) == true) {
								Counter++;
							}
						}
						Game0.Load.Progress = 565 + Counter;
						break;

				// Reset HP to full
				case Game0.Load.Progress >= 610 && Game0.Load.Progress < 614:
					ChangeText("Label_GameLoadingPrompt", "正在重置角色牌血量...");
					for(let Looper = 1; Looper <= 3; Looper++) {
						Game.Status.Player.CharacterCard[Looper].HP = Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP;
					}
					for(let Looper = 1; Looper <= 3; Looper++) {
						Game.Status.Opponent.CharacterCard[Looper].HP = Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP;
					}
					Game0.Load.Progress += 4;
					break;

				// Shuffle action cards
				case Game0.Load.Progress >= 614 && Game0.Load.Progress < 618:
					ChangeText("Label_GameLoadingPrompt", "正在洗牌...");
					for(let Looper = 1; Looper <= 100; Looper++) {
						let LotteryNumber = Randomize(1, 30), LotteryNumber2 = Randomize(1, 30),
						Swapper = structuredClone(Game.Status.Player.ActionCard[LotteryNumber]);
						Game.Status.Player.ActionCard[LotteryNumber] = structuredClone(Game.Status.Player.ActionCard[LotteryNumber2]);
						Game.Status.Player.ActionCard[LotteryNumber2] = structuredClone(Swapper);
					}
					for(let Looper = 1; Looper <= 100; Looper++) {
						let LotteryNumber = Randomize(1, 30), LotteryNumber2 = Randomize(1, 30),
						Swapper = structuredClone(Game.Status.Opponent.ActionCard[LotteryNumber]);
						Game.Status.Opponent.ActionCard[LotteryNumber] = structuredClone(Game.Status.Opponent.ActionCard[LotteryNumber2]);
						Game.Status.Opponent.ActionCard[LotteryNumber2] = structuredClone(Swapper);
					}
					Game0.Load.Progress += 4;
					break;

				// Backup initial game status for restart
				case Game0.Load.Progress >= 618 && Game0.Load.Progress < 620:
					ChangeText("Label_GameLoadingPrompt", "正在备份对局状态...");
					Game.InitialStatus = structuredClone(Game.Status);
					Game.InitialStatus.Operation = "Table";
					Game0.Load.Progress += 2;
					break;

				// Check viewport
				case Game0.Load.Progress >= 620 && Game0.Load.Progress < 622:
					ChangeText("Label_GameLoadingPrompt", "正在检查窗口布局...");
					if(System.DontShowAgain.includes("GITCGLite_Game_WindowLayoutImproper") == false) {
						switch(true) {
							case window.innerWidth < 400:
								ShowDialog("Game_WindowLayoutImproper",
									"Info",
									"窗口过小。这可能导致控件重叠，影响游戏体验。建议您调大窗口或缩小网页。",
									"不再提示", "", "", "确定");
								break;
							case window.innerWidth >= 400 && window.innerWidth <= 600 && window.innerHeight < 650:
								ShowDialog("Game_WindowLayoutImproper",
									"Info",
									"窗口过矮。这可能影响游戏体验。建议您调高窗口或缩小网页。",
									"不再提示", "", "", "确定");
								break;
							case window.innerWidth > 600 && window.innerWidth <= 880:
								ShowDialog("Game_WindowLayoutImproper",
									"Info",
									"窗口在竖版布局下过宽。这可能影响游戏体验。建议您调窄窗口，或调宽至横版布局。",
									"不再提示", "", "", "确定");
								break;
							case window.innerWidth > 880 && window.innerWidth <= 1100:
								ShowDialog("Game_WindowLayoutImproper",
									"Info",
									"窗口在横板布局下过窄。这可能影响游戏体验。建议您调宽窗口，或调窄至竖版布局。",
									"不再提示", "", "", "确定");
								break;
							case window.innerWidth > 1100 && window.innerWidth <= 1920 && window.innerHeight < 700:
								ShowDialog("Game_WindowLayoutImproper",
									"Info",
									"窗口过矮。这可能影响游戏体验。建议您调高窗口或缩小网页。",
									"不再提示", "", "", "确定");
								break;
							case window.innerWidth > 1920:
								ShowDialog("Game_WindowLayoutImproper",
									"Info",
									"窗口过大。这可能影响游戏体验。建议您调小窗口或放大网页。",
									"不再提示", "", "", "确定");
								break;
							default:
								break;
						}
					}
					Game0.Load.Progress += 2;
					break;

				// Ready
				case Game0.Load.Progress == 622:
					ChangeText("Label_GameLoadingPrompt", "就绪");
					if(Game0.Load.ClockTime - Game0.Load.StartTime >= 2000) {
						Game.Status.Operation = "Table";
						RefreshGame();
					}
					break;

				// Error
				default:
					AlertSystemError("The value of Game0.Load.Progress \"" + Game0.Load.Progress + "\" in function ClockGame is invalid.");
					break;
			}

			// Refresh
			if(Game0.Load.ClockTime - Game0.Load.StartTime >= 10000) {
				Show("Ctrl_GameCheckNetworkPrompt");
			} else {
				Hide("Ctrl_GameCheckNetworkPrompt");
			}
			ChangeProgbar("ProgbarFg_GameLoading", "Horizontal", Game0.Load.Progress / 622 * 100);
		}
		function RefreshHPDisplay() {
			// Check and fix HP overflow
			for(let Looper = 1; Looper <= 3; Looper++) {
				if(ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID) > 0) {
					Game.Status.Player.CharacterCard[Looper].HP = CheckRangeAndCorrect(Game.Status.Player.CharacterCard[Looper].HP, 0, Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP);
				} else {
					Game.Status.Player.CharacterCard[Looper].HP = 0;
				}
				if(ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID) > 0) {
					Game.Status.Opponent.CharacterCard[Looper].HP = CheckRangeAndCorrect(Game.Status.Opponent.CharacterCard[Looper].HP, 0, Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP);
				} else {
					Game.Status.Opponent.CharacterCard[Looper].HP = 0;
				}
			}

			// Update display value
			if(System.Display.Anim > 0) {
				for(let Looper = 1; Looper <= 3; Looper++) {
					Game0.Stats.Player.HPDisplay[Looper] += (Game.Status.Player.CharacterCard[Looper].HP - Game0.Stats.Player.HPDisplay[Looper]) / 5;
					Game0.Stats.Opponent.HPDisplay[Looper] += (Game.Status.Opponent.CharacterCard[Looper].HP - Game0.Stats.Opponent.HPDisplay[Looper]) / 5;
				}
			} else {
				for(let Looper = 1; Looper <= 3; Looper++) {
					Game0.Stats.Player.HPDisplay[Looper] = Game.Status.Player.CharacterCard[Looper].HP;
					Game0.Stats.Opponent.HPDisplay[Looper] = Game.Status.Opponent.CharacterCard[Looper].HP;
				}
			}

			// Refresh display
			let Percentage = 0,
			TotalHP = {
				Player: {
					HPDisplay: 0, MaxHP: 0
				},
				Opponent: {
					HPDisplay: 0, MaxHP: 0
				}
			};
			for(let Looper = 1; Looper <= 3; Looper++) {
				if(ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID) > 0) {
					Percentage = Game0.Stats.Player.HPDisplay[Looper] / Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP * 100;
					TotalHP.Player.HPDisplay += Game0.Stats.Player.HPDisplay[Looper];
					TotalHP.Player.MaxHP += Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP;
				} else {
					Percentage = 0;
				}
				ChangeShapedProgbar("ProgbarFg_GamePlayerCharacter" + Looper + "HP", "Vertical", Percentage);
				if(Percentage <= Subsystem.Display.HPCautionThreshold) {
					AddClass("ProgbarFg_GamePlayerCharacter" + Looper + "HP", "Low");
				} else {
					RemoveClass("ProgbarFg_GamePlayerCharacter" + Looper + "HP", "Low");
				}
				ChangeText("ProgbarText_GamePlayerCharacter" + Looper + "HP", Game0.Stats.Player.HPDisplay[Looper].toFixed(0));
				if(ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID) > 0) {
					Percentage = Game0.Stats.Opponent.HPDisplay[Looper] / Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP * 100;
					TotalHP.Opponent.HPDisplay += Game0.Stats.Opponent.HPDisplay[Looper];
					TotalHP.Opponent.MaxHP += Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID)].CharacterCardProperties.MaxHP;
				} else {
					Percentage = 0;
				}
				ChangeShapedProgbar("ProgbarFg_GameOpponentCharacter" + Looper + "HP", "Vertical", Percentage);
				if(Percentage <= Subsystem.Display.HPCautionThreshold) {
					AddClass("ProgbarFg_GameOpponentCharacter" + Looper + "HP", "Low");
				} else {
					RemoveClass("ProgbarFg_GameOpponentCharacter" + Looper + "HP", "Low");
				}
				ChangeText("ProgbarText_GameOpponentCharacter" + Looper + "HP", Game0.Stats.Opponent.HPDisplay[Looper].toFixed(0));
			}
			Percentage = TotalHP.Player.HPDisplay / TotalHP.Player.MaxHP * 100;
			ChangeShapedProgbar("ProgbarFg_GamePlayerTotalHP", "Vertical", Percentage);
			if(Percentage <= Subsystem.Display.HPCautionThreshold) {
				AddClass("ProgbarFg_GamePlayerTotalHP", "Low");
			} else {
				RemoveClass("ProgbarFg_GamePlayerTotalHP", "Low");
			}
			ChangeText("ProgbarText_GamePlayerTotalHP", TotalHP.Player.HPDisplay.toFixed(0));
			Percentage = TotalHP.Opponent.HPDisplay / TotalHP.Opponent.MaxHP * 100;
			ChangeShapedProgbar("ProgbarFg_GameOpponentTotalHP", "Vertical", Percentage);
			if(Percentage <= Subsystem.Display.HPCautionThreshold) {
				AddClass("ProgbarFg_GameOpponentTotalHP", "Low");
			} else {
				RemoveClass("ProgbarFg_GameOpponentTotalHP", "Low");
			}
			ChangeText("ProgbarText_GameOpponentTotalHP", TotalHP.Opponent.HPDisplay.toFixed(0));
		}

	function RefreshGame() {
		// Update game status decks and cards when on title screen
		if(Game.Status.Operation == "Title") {
			RefreshCasket(); // Section "Game" relies on section "Casket".
			LoadDeck("Player");
			LoadDeck("Opponent");
		}

		// Call
		ClockGame();
		RefreshGameFlow();
		RefreshActionSelection();
		RefreshDeckImages();
		RefreshCharacterCards();
		RefreshSummonsCards();
		RefreshActionCards();
		RefreshCardsInHand();
		RefreshDice();
		RefreshTable();
		RefreshOperationPanel();
		ToggleOperationPanelTransparency("False");
		RefreshAction();

		// Settings
		ChangeValue("Textbox_SettingsImportSavedGame", "");
		ChangeText("Combobox_SettingsSelectSavedGame", "");
		if(Game.SavedGames.length > 1) {
			for(let Looper = 1; Looper <= Game.SavedGames.length - 1; Looper++) {
				AddText("Combobox_SettingsSelectSavedGame",
					"<option value=" + Looper + ">" + Game.SavedGames[Looper].Name + "</option>");
			}
			ChangeDisabled("Combobox_SettingsSelectSavedGame", false);
			ChangeDisabled("Button_SettingsLoadSavedGame", false);
			ChangeDisabled("Button_SettingsExportSavedGame", false);
			ChangeDisabled("Button_SettingsDeleteSavedGame", false);
		} else {
			ChangeDisabled("Combobox_SettingsSelectSavedGame", true);
			ChangeDisabled("Button_SettingsLoadSavedGame", true);
			ChangeDisabled("Button_SettingsExportSavedGame", true);
			ChangeDisabled("Button_SettingsDeleteSavedGame", true);
		}
		if(Game.Status.Operation != "Title" && Game.Status.Operation != "Loading") {
			ChangeDisabled("Button_SettingsSaveCurrentGame", false);
		} else {
			ChangeDisabled("Button_SettingsSaveCurrentGame", true);
		}
		ChangeChecked("Checkbox_SettingsLetOpponentActFirstAtBeginning", Game.Options.LetOpponentActFirstAtBeginning);
		ChangeChecked("Checkbox_SettingsShowOpponentDiceContent", Game.Options.ShowOpponentDiceContent);
		ChangeChecked("Checkbox_SettingsShowRecommendedActionAfterIdlingFor30Sec", Game.Options.ShowRecommendedActionAfterIdlingFor30Sec);
		ChangeChecked("Checkbox_SettingsMakeOpponentActSlowly", Game.Options.MakeOpponentActSlowly);

		// Save user data
		localStorage.setItem("GITCGLite_Game", JSON.stringify(Game));
	}
		// Sub-functions
		function RefreshGameFlow() {
			// Initialization
			if(Game.Status.Round == 0 && Game.Status.Operation == "Table") {
				if(Game.Options.LetOpponentActFirstAtBeginning == false) {
					Game.Status.First = "Player";
				} else {
					Game.Status.First = "Opponent";
				}
				setTimeout(function() {
					ChangeRound(-1);
				}, 0);
			}
			if(Game.Status.Round == -1) {
				switch(Game.Status.Phase[1]) {
					case "Initialization":
						Game.Status.Operation = "Table";
						setTimeout(function() {
							ChangePhase1("StartingHand");
						}, 500);
						break;
					case "StartingHand":
						switch(Game.Status.Phase[2]) {
							case "Beginning":
								Game.Status.Operation = "StartingHand";
								ChangeText("Label_GameStartingHand", "正在抓牌...");
								for(let Looper = 1; Looper <= 5; Looper++) {
									Game.Status.Player.ActionCard[Looper].Position = "InStartingHand";
									Game.Status.Player.ActionCard[Looper].Sequence = Looper;
								}
								setTimeout(function() {
									Game.Status.Phase[2] = "BeforeStandby";
									RefreshGame();
								}, System.Display.Anim);
								break;
							case "BeforeStandby":
								ResetGameSelection();
								Scan();
								Game.Status.Phase[2] = "Standby";
								setTimeout(RefreshGame, 0);
								break;
							case "Standby":
								Game.Status.Operation = "StartingHand";
								ChangeText("Label_GameStartingHand", "您可选中并更换暂时不需要的行动牌");
								for(let Looper = 1; Looper <= 5; Looper++) {
									Game.Status.Player.ActionCard[Looper].Position = "InStartingHand";
									Game.Status.Player.ActionCard[Looper].Sequence = Looper;
								}
								break;
							case "Working1":
								if(JSON.stringify(Game0.Selection.StartingHand) != "[0,false,false,false,false,false]") {
									Game.Status.Operation = "StartingHand";
									ChangeText("Label_GameStartingHand", "正在更换初始手牌...");
									for(let Looper = 1; Looper <= 5; Looper++) {
										if(Game0.Selection.StartingHand[Looper] == true) {
											Game.Status.Player.ActionCard[Looper].Position = "OffTable";
										} else {
											Game.Status.Player.ActionCard[Looper].Position = "InStartingHand";
											Game.Status.Player.ActionCard[Looper].Sequence = Looper;
										}
									}
									setTimeout(function() {
										Game.Status.Phase[2] = "Working2";
										RefreshGame();
									}, System.Display.Anim + 20);
								} else {
									Game.Status.Operation = "Table";
									ChangeText("Label_GameStartingHand", "您的初始手牌如下");
									OpponentAct();
									for(let Looper = 1; Looper <= 5; Looper++) {
										Game.Status.Player.ActionCard[Looper].Position = "InHand";
										Game.Status.Player.ActionCard[Looper].Sequence = Looper;
										Game.Status.Opponent.ActionCard[Looper].Position = "InHand";
										Game.Status.Opponent.ActionCard[Looper].Sequence = Looper;
									}
									setTimeout(function() {
										ChangePhase1("InitialCharacter");
									}, System.Display.Anim + 20);
								}
								break;
							case "Working2":
								Game.Status.Operation = "StartingHand";
								ChangeText("Label_GameStartingHand", "正在更换初始手牌...");
								for(let Looper = 1; Looper <= 5; Looper++) {
									if(Game0.Selection.StartingHand[Looper] == true) {
										let Swapper = Game.Status.Player.ActionCard[Looper].ID;
										Game.Status.Player.ActionCard[Looper].ID = Game.Status.Player.ActionCard[6].ID;
										for(let Looper2 = 6; Looper2 <= 29; Looper2++) {
											Game.Status.Player.ActionCard[Looper2].ID = Game.Status.Player.ActionCard[Looper2 + 1].ID;
										}
										Game.Status.Player.ActionCard[30].ID = Swapper;
									}
								}
								for(let Looper = 1; Looper <= 5; Looper++) {
									Game.Status.Player.ActionCard[Looper].Position = "InStartingHand";
								}
								setTimeout(function() {
									Game.Status.Phase[2] = "Working3";
									RefreshGame();
								}, System.Display.Anim + 20);
								break;
							case "Working3":
								Game.Status.Operation = "StartingHand";
								ChangeText("Label_GameStartingHand", "您的初始手牌如下");
								for(let Looper = 1; Looper <= 5; Looper++) {
									Game.Status.Player.ActionCard[Looper].Position = "InStartingHand";
								}
								ResetGameSelection();
								setTimeout(function() {
									Game.Status.Phase[2] = "Working4";
									RefreshGame();
								}, 1000);
								break;
							case "Working4":
								Game.Status.Operation = "Table";
								ChangeText("Label_GameStartingHand", "您的初始手牌如下");
								OpponentAct();
								for(let Looper = 1; Looper <= 5; Looper++) {
									Game.Status.Player.ActionCard[Looper].Position = "InHand";
									Game.Status.Player.ActionCard[Looper].Sequence = Looper;
									Game.Status.Opponent.ActionCard[Looper].Position = "InHand";
									Game.Status.Opponent.ActionCard[Looper].Sequence = Looper;
								}
								setTimeout(function() {
									ChangePhase1("InitialCharacter");
								}, System.Display.Anim + 20);
								break;
							default:
								AlertSystemError("The value of Game.Status.Phase[2] \"" + Game.Status.Phase[2] + "\" in function RefreshGame is invalid.");
								break;
						}
						break;
					case "InitialCharacter":
						Game.Status.Operation = "Table";
						break;
					default:
						AlertSystemError("The value of Game.Status.Phase[1] \"" + Game.Status.Phase[1] + "\" in function RefreshGame is invalid.");
						break;
				}
			}

			// Main
			if(Game.Status.Round > 0) {
				switch(Game.Status.Phase[1]) {
					case "Initialization":
						Game.Status.Operation = "Table";
						for(let Looper = 1; Looper <= 12; Looper++) {
							Game.Status.Player.Dice[Looper].Type = "Unknown";
							Game.Status.Player.Dice[Looper].Position = "OffTable";
							Game.Status.Opponent.Dice[Looper].Type = "Unknown";
							Game.Status.Opponent.Dice[Looper].Position = "OffTable";
						}
						setTimeout(function() {
							ChangePhase1("RollPhase");
						}, System.Display.Anim * 2 + 1000);
						break;
					case "RollPhase":
						switch(Game.Status.Phase[2]) {
							case "Initialization":
								Game.Status.Operation = "Table";
								Game0.RollDice.IsRolling = false;
								setTimeout(function() {
									Game.Status.Phase[2] = "Beginning";
									RefreshGame();
								}, System.Display.Anim + 1000);
								break;
							case "Beginning":
								Game.Status.Operation = "RollPhase";
								ChangeText("Label_GameRollPhase", "正在掷骰子...");
								for(let Looper = 1; Looper <= 8; Looper++) {
									Game.Status.Player.Dice[Looper].Position = "OnRolling";
								}
								if(Game0.RollDice.IsRolling == false) {
									for(let Looper = 1; Looper <= 8; Looper++) {
										Game.Status.Player.Dice[Looper].Type = "Unknown";
										Game.Status.Player.Dice[Looper].Sequence = Looper;
									}
									Game0.RollDice.IsRolling = true;
									Game0.RollDice.Progress = 0;
									RollDice();
									PlayAudio("Audio_Sound", "audio/RollDice.mp3");
								}
								break;
							case "BeforeStandby":
								ResetGameSelection();
								Scan();
								Game.Status.Phase[2] = "Standby";
								setTimeout(RefreshGame, 0);
								break;
							case "Standby":
								Game.Status.Operation = "RollPhase";
								ChangeText("Label_GameRollPhase", "您有<span class=\"LargerText\">" + Game.Status.Player.RerollChance + "</span>次重掷的机会");
								for(let Looper = 1; Looper <= 8; Looper++) {
									Game.Status.Player.Dice[Looper].Position = "OnRolling";
								}
								break;
							case "Working1":
								if(JSON.stringify(Game0.Selection.Dice) != "[0,false,false,false,false,false,false,false,false,false,false,false,false]") {
									Game.Status.Operation = "RollPhase";
									ChangeText("Label_GameRollPhase", "正在重掷骰子...");
									for(let Looper = 1; Looper <= 8; Looper++) {
										Game.Status.Player.Dice[Looper].Position = "OnRolling";
									}
									if(Game0.RollDice.IsRolling == false) {
										for(let Looper = 1; Looper <= 8; Looper++) {
											if(Game0.Selection.Dice[Looper] == true) {
												Game.Status.Player.Dice[Looper].Type = "Unknown";
											}
										}
										Game0.RollDice.IsRolling = true;
										Game0.RollDice.Progress = 0;
										RollDice();
									}
								} else {
									Game.Status.Operation = "Table";
									ChangeText("Label_GameRollPhase", "您的骰子如下");
									OpponentAct();
									for(let Looper = 1; Looper <= 8; Looper++) {
										Game.Status.Player.Dice[Looper].Position = "OnTable";
										Game.Status.Opponent.Dice[Looper].Position = "OnTable";
									}
									setTimeout(function() {
										ChangePhase1("ActionPhase");
									}, System.Display.Anim + 20);
								}
								break;
							case "Working2":
								Game.Status.Operation = "RollPhase";
								ChangeText("Label_GameRollPhase", "您的骰子如下");
								for(let Looper = 1; Looper <= 8; Looper++) {
									Game.Status.Player.Dice[Looper].Position = "OnRolling";
								}
								ResetGameSelection();
								setTimeout(function() {
									Game.Status.Phase[2] = "Working3";
									RefreshGame();
								}, 1000);
								break;
							case "Working3":
								Game.Status.Operation = "Table";
								ChangeText("Label_GameRollPhase", "您的骰子如下");
								OpponentAct();
								for(let Looper = 1; Looper <= 8; Looper++) {
									Game.Status.Player.Dice[Looper].Position = "OnTable";
									Game.Status.Opponent.Dice[Looper].Position = "OnTable";
								}
								setTimeout(function() {
									ChangePhase1("ActionPhase");
								}, System.Display.Anim + 20);
								break;
							default:
								AlertSystemError("The value of Game.Status.Phase[2] \"" + Game.Status.Phase[2] + "\" in function RefreshGame is invalid.");
								break;
						}
						break;
					case "ActionPhase":
						switch(Game.Status.Phase[2]) {
							case "Initialization":
								Game.Status.Operation = "Table";
								setTimeout(function() {
									Game.Status.Phase[2] = "Beginning";
									RefreshGame();
								}, System.Display.Anim * 2 + 1000);
								break;
							case "Beginning":
								Game.Status.Operation = "Table";
								Scan();
								setTimeout(ChangeTurn, 0);
								break;
							case "BeforeStandby":
								Game.Status.Operation = "Table";
								Game.Status.Phase[2] = "Standby";
								setTimeout(RefreshGame, 0);
								break;
							case "Standby":
								Game.Status.Operation = "Table";
								// ???
								break;
							case "Working":
								// ???
								break;
							case "BeforeCombatAction":
								// ???
								break;
							case "CombatAction":
								// ???
								break;
							case "AfterCombatAction":
								// ???
								break;
							default:
								AlertSystemError("The value of Game.Status.Phase[2] \"" + Game.Status.Phase[2] + "\" in function RefreshGame is invalid.");
								break;
						}
						break;
					case "EndPhase":
						// ???
						break;
					default:
						AlertSystemError("The value of Game.Status.Phase[1] \"" + Game.Status.Phase[1] + "\" in function RefreshGame is invalid.");
						break;
				}
			}

			// When someone falls
			for(let Looper = 1; Looper <= 3; Looper++) {
				if(Game.Status.Player.CharacterCard[Looper].HP > 0) {
					RemoveClass("Card_GamePlayerCharacter" + Looper, "Fallen");
				} else {
					AddClass("Card_GamePlayerCharacter" + Looper, "Fallen");
				}
				if(Game.Status.Opponent.CharacterCard[Looper].HP > 0) {
					RemoveClass("Card_GameOpponentCharacter" + Looper, "Fallen");
				} else {
					AddClass("Card_GameOpponentCharacter" + Looper, "Fallen");
				}
			}
			if(Game.Status.Operation == "Table" &&
			((Game.Status.Player.CharacterCard[1].HP <= 0 && Game.Status.Player.CharacterCard[1].PreviousHP > 0) ||
			(Game.Status.Player.CharacterCard[2].HP <= 0 && Game.Status.Player.CharacterCard[2].PreviousHP > 0) ||
			(Game.Status.Player.CharacterCard[3].HP <= 0 && Game.Status.Player.CharacterCard[3].PreviousHP > 0) ||
			(Game.Status.Opponent.CharacterCard[1].HP <= 0 && Game.Status.Opponent.CharacterCard[1].PreviousHP > 0) ||
			(Game.Status.Opponent.CharacterCard[2].HP <= 0 && Game.Status.Opponent.CharacterCard[2].PreviousHP > 0) ||
			(Game.Status.Opponent.CharacterCard[3].HP <= 0 && Game.Status.Opponent.CharacterCard[3].PreviousHP > 0))) {
				PlayAudio("Audio_Sound", "audio/Fallen.mp3");
				if(Game.Status.Player.CharacterCard[1].HP <= 0 && Game.Status.Player.CharacterCard[1].PreviousHP > 0 && Game.Status.Player.ActiveCharacter == 1) {
					Game.Status.Player.ActiveCharacter = 0;
					Speak("Player", 1, "Fallen");
				}
				if(Game.Status.Player.CharacterCard[2].HP <= 0 && Game.Status.Player.CharacterCard[2].PreviousHP > 0 && Game.Status.Player.ActiveCharacter == 2) {
					Game.Status.Player.ActiveCharacter = 0;
					Speak("Player", 2, "Fallen");
				}
				if(Game.Status.Player.CharacterCard[3].HP <= 0 && Game.Status.Player.CharacterCard[3].PreviousHP > 0 && Game.Status.Player.ActiveCharacter == 3) {
					Game.Status.Player.ActiveCharacter = 0;
					Speak("Player", 3, "Fallen");
				}
				if(Game.Status.Opponent.CharacterCard[1].HP <= 0 && Game.Status.Opponent.CharacterCard[1].PreviousHP > 0 && Game.Status.Opponent.ActiveCharacter == 1) {
					Game.Status.Opponent.ActiveCharacter = 0;
					Speak("Opponent", 1, "Fallen");
				}
				if(Game.Status.Opponent.CharacterCard[2].HP <= 0 && Game.Status.Opponent.CharacterCard[2].PreviousHP > 0 && Game.Status.Opponent.ActiveCharacter == 2) {
					Game.Status.Opponent.ActiveCharacter = 0;
					Speak("Opponent", 2, "Fallen");
				}
				if(Game.Status.Opponent.CharacterCard[3].HP <= 0 && Game.Status.Opponent.CharacterCard[3].PreviousHP > 0 && Game.Status.Opponent.ActiveCharacter == 3) {
					Game.Status.Opponent.ActiveCharacter = 0;
					Speak("Opponent", 3, "Fallen");
				}
			}

			// Victory or defeat
			// ???
		}
		function RefreshActionSelection() {
			// Selected action
			switch(Game0.Selection.Action.Type) {
				case "CharacterCard":
					Game.Status.Operation = "SwitchCharacter";
					break;
				case "ActionCard":
					// ???
					break;
				// ???
				case "":
					break;
				default:
					AlertSystemError("The value of Game0.Selection.Action.Type \"" + Game0.Selection.Action.Type + "\" in function RefreshActionSelection is invalid.");
					break;
			}

			// Recommend action
			for(let Looper = 1; Looper <= 3; Looper++) {
				RemoveClass("Button_GamePlayerCharacter" + Looper, "Glow");
			}
			for(let Looper = 1; Looper <= 33; Looper++) {
				RemoveClass("Button_GamePlayerAction" + Looper, "Glow");
			}
			RemoveClass("Button_GameNormalAttack", "Glow");
			RemoveClass("Button_GameElementalSkill", "Glow");
			RemoveClass("Button_GameSecondaryElementalSkill", "Glow");
			RemoveClass("Button_GameElementalBurst", "Glow");
			RemoveClass("Button_GameEndAction", "Glow");
			clearTimeout(Automation.RecommendAction);
			if(Game.Options.ShowRecommendedActionAfterIdlingFor30Sec == true) {
				Automation.RecommendAction = setTimeout(RecommendAction, 30000);
			}

			// Cheat: discard enemy object
			if(Subsystem.Dev.Cheat == true && Game.Status.Operation == "Table" && Game0.Selection.DiscardEnemyObject.Type != "") {
				let CardType = Game0.Selection.DiscardEnemyObject.Type, Number = Game0.Selection.DiscardEnemyObject.Number;
				switch(CardType) {
					case "CharacterCard":
						ShowDialog("Game_ConfirmKnockDownOpponentCharacterCard",
							"Question",
							"是否击倒对手的角色牌「" + ReadCardNameByID(Game.Status.Opponent.CharacterCard[Number].ID) + "」？<br />" +
							"(作弊功能)",
							"", "", "击倒", "取消");
						break;
					case "SummonsCard":
						ShowDialog("Game_ConfirmDiscardOpponentSummonsCard",
							"Question",
							"是否弃置对手的召唤物牌「" + ReadCardNameByID(Game.Status.Opponent.SummonsCard[Number].ID) + "」？<br />" +
							"(作弊功能)",
							"", "", "弃置", "取消");
						break;
					case "ActionCard":
						ShowDialog("Game_ConfirmDiscardOpponentActionCard",
							"Question",
							"是否弃置对手的行动牌「" + ReadCardNameByID(Game.Status.Opponent.ActionCard[Number].ID) + "」？<br />" +
							"(作弊功能)",
							"", "", "弃置", "取消");
						break;
					default:
						AlertSystemError("The value of CardType \"" + CardType + "\" in function ClickCard is invalid.");
						break;
				}
			}
		}
		function RefreshDeckImages() {
			ChangeBgImage(Game.Status.Player.DeckProperties.BgImage);
			let Elements = document.querySelectorAll(".Player .CardBack");
			if(Game.Status.Player.DeckProperties.CardBackImage != "") {
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].src = Game.Status.Player.DeckProperties.CardBackImage;
				}
			} else {
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].src = "images/CardBack.jpg";
				}
			}
			Elements = document.querySelectorAll(".Opponent .CardBack");
			if(Game.Status.Opponent.DeckProperties.CardBackImage != "") {
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].src = Game.Status.Opponent.DeckProperties.CardBackImage;
				}
			} else {
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].src = "images/CardBack.jpg";
				}
			}
		}
		function RefreshCharacterCards() {
			// General
			for(let Looper = 1; Looper <= 3; Looper++) {
				if(Game.Status.Operation == "Title" || Game.Status.Operation == "Loading") {
					ChangeCardPosition("Card_GamePlayerCharacter" + Looper, "OnTitleScreen");
					ChangeCardPosition("Card_GameOpponentCharacter" + Looper, "OnTitleScreen");
				} else {
					ChangeCardPosition("Card_GamePlayerCharacter" + Looper, "OnTable");
					ChangeCardPosition("Card_GameOpponentCharacter" + Looper, "OnTable");
				}
				if(ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID) > 0) {
					let CardNumber = ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].ID);
					ChangeImage("Image_GamePlayerCharacter" + Looper, Casket.Card[CardNumber].BasicProperties.Image);
					ChangeText("Label_GamePlayerCharacter" + Looper, ConvertEmptyName(Casket.Card[CardNumber].BasicProperties.Name));
					if(Game.Status.Player.CharacterCard[Looper].Energy > Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy) {
						Game.Status.Player.CharacterCard[Looper].Energy = Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy;
					}
					ChangeShapedProgbar("ProgbarFg_GamePlayerCharacter" + Looper + "Energy", "Vertical", Game.Status.Player.CharacterCard[Looper].Energy / Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy * 100);
					if(Game.Status.Player.CharacterCard[Looper].Energy == Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy) {
						AddClass("ProgbarFg_GamePlayerCharacter" + Looper + "Energy", "Charged");
					} else {
						RemoveClass("ProgbarFg_GamePlayerCharacter" + Looper + "Energy", "Charged");
					}
					ChangeText("ProgbarText_GamePlayerCharacter" + Looper + "Energy", Game.Status.Player.CharacterCard[Looper].Energy);
					for(let Looper2 = 1; Looper2 <= 3; Looper2++) {
						if(Game.Status.Player.CharacterCard[Looper].Element[Looper2] != "") {
							Show("Label_GamePlayerCharacter" + Looper + "ElementIndicator" + Looper2);
							ChangeText("Label_GamePlayerCharacter" + Looper + "ElementIndicator" + Looper2, ConvertElementTypeToIcon(Game.Status.Player.CharacterCard[Looper].Element[Looper2]));
						} else {
							HideHorizontally("Label_GamePlayerCharacter" + Looper + "ElementIndicator" + Looper2);
						}
					}
					if(Game.Status.Player.CharacterCard[Looper].Reaction != "") {
						Show("Label_GamePlayerCharacter" + Looper + "ReactionIndicator");
						ChangeText("Label_GamePlayerCharacter" + Looper + "ReactionIndicator", Game.Status.Player.CharacterCard[Looper].Reaction);
					} else {
						HideHorizontally("Label_GamePlayerCharacter" + Looper + "ReactionIndicator");
					}
					for(let Looper2 = 1; Looper2 <= 4; Looper2++) {
						if(Game.Status.Player.CharacterCard[Looper].Status[Looper2].CardID != "") {
							Show("Ctrl_GamePlayerCharacter" + Looper + "Status" + Looper2);
							ChangeImage("Image_GamePlayerCharacter" + Looper + "Status" + Looper2, Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Player.CharacterCard[Looper].Status[Looper2].StatusNumber].Image);
							ChangeText("Label_GamePlayerCharacter" + Looper + "Status" + Looper2, Game.Status.Player.CharacterCard[Looper].Status[Looper2].Duration);
							switch(Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Player.CharacterCard[Looper].Status[Looper2].StatusNumber].Duration.Type) {
								case "Usages":
									RemoveClass("Label_GamePlayerCharacter" + Looper + "Status" + Looper2, "DurationInRounds");
									break;
								case "Rounds":
									AddClass("Label_GamePlayerCharacter" + Looper + "Status" + Looper2, "DurationInRounds");
									break;
								default:
									AlertSystemError("The value of Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Player.CharacterCard[Looper].Status[Looper2].StatusNumber].Duration.Type \"" + Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Player.CharacterCard[Looper].Status[Looper2].StatusNumber].Duration.Type + "\" in function RefreshGame is invalid.");
									break;
							}
						} else {
							HideHorizontally("Ctrl_GamePlayerCharacter" + Looper + "Status" + Looper2);
						}
					}
				} else {
					ChangeImage("Image_GamePlayerCharacter" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Image);
					ChangeText("Label_GamePlayerCharacter" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Name);
					ChangeShapedProgbar("ProgbarFg_GamePlayerCharacter" + Looper + "Energy", "Vertical", 0);
					RemoveClass("ProgbarFg_GamePlayerCharacter" + Looper + "Energy", "Charged");
					ChangeText("ProgbarText_GamePlayerCharacter" + Looper + "Energy", "0");
					for(let Looper2 = 1; Looper2 <= 3; Looper2++) {
						HideHorizontally("Label_GamePlayerCharacter" + Looper + "ElementIndicator" + Looper2);
					}
					HideHorizontally("Label_GamePlayerCharacter" + Looper + "ReactionIndicator");
					for(let Looper2 = 1; Looper2 <= 4; Looper2++) {
						HideHorizontally("Ctrl_GamePlayerCharacter" + Looper + "Status" + Looper2);
					}
				}
				if(ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID) > 0) {
					let CardNumber = ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].ID);
					ChangeImage("Image_GameOpponentCharacter" + Looper, Casket.Card[CardNumber].BasicProperties.Image);
					ChangeText("Label_GameOpponentCharacter" + Looper, ConvertEmptyName(Casket.Card[CardNumber].BasicProperties.Name));
					if(Game.Status.Opponent.CharacterCard[Looper].Energy > Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy) {
						Game.Status.Opponent.CharacterCard[Looper].Energy = Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy;
					}
					ChangeShapedProgbar("ProgbarFg_GameOpponentCharacter" + Looper + "Energy", "Vertical", Game.Status.Opponent.CharacterCard[Looper].Energy / Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy * 100);
					if(Game.Status.Opponent.CharacterCard[Looper].Energy == Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy) {
						AddClass("ProgbarFg_GameOpponentCharacter" + Looper + "Energy", "Charged");
					} else {
						RemoveClass("ProgbarFg_GameOpponentCharacter" + Looper + "Energy", "Charged");
					}
					ChangeText("ProgbarText_GameOpponentCharacter" + Looper + "Energy", Game.Status.Opponent.CharacterCard[Looper].Energy);
					for(let Looper2 = 1; Looper2 <= 3; Looper2++) {
						if(Game.Status.Opponent.CharacterCard[Looper].Element[Looper2] != "") {
							Show("Label_GameOpponentCharacter" + Looper + "ElementIndicator" + Looper2);
							ChangeText("Label_GameOpponentCharacter" + Looper + "ElementIndicator" + Looper2, ConvertElementTypeToIcon(Game.Status.Opponent.CharacterCard[Looper].Element[Looper2]));
						} else {
							HideHorizontally("Label_GameOpponentCharacter" + Looper + "ElementIndicator" + Looper2);
						}
					}
					if(Game.Status.Opponent.CharacterCard[Looper].Reaction != "") {
						Show("Label_GameOpponentCharacter" + Looper + "ReactionIndicator");
						ChangeText("Label_GameOpponentCharacter" + Looper + "ReactionIndicator", Game.Status.Opponent.CharacterCard[Looper].Reaction);
					} else {
						HideHorizontally("Label_GameOpponentCharacter" + Looper + "ReactionIndicator");
					}
					for(let Looper2 = 1; Looper2 <= 4; Looper2++) {
						if(Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].CardID != "") {
							Show("Ctrl_GameOpponentCharacter" + Looper + "Status" + Looper2);
							ChangeImage("Image_GameOpponentCharacter" + Looper + "Status" + Looper2, Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].StatusNumber].Image);
							ChangeText("Label_GameOpponentCharacter" + Looper + "Status" + Looper2, Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].Duration);
							switch(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].StatusNumber].Duration.Type) {
								case "Usages":
									RemoveClass("Label_GameOpponentCharacter" + Looper + "Status" + Looper2, "DurationInRounds");
									break;
								case "Rounds":
									AddClass("Label_GameOpponentCharacter" + Looper + "Status" + Looper2, "DurationInRounds");
									break;
								default:
									AlertSystemError("The value of Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].StatusNumber].Duration.Type \"" + Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].CardID)].Status[Game.Status.Opponent.CharacterCard[Looper].Status[Looper2].StatusNumber].Duration.Type + "\" in function RefreshGame is invalid.");
									break;
							}
						} else {
							HideHorizontally("Ctrl_GameOpponentCharacter" + Looper + "Status" + Looper2);
						}
					}
				} else {
					ChangeImage("Image_GameOpponentCharacter" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Image);
					ChangeText("Label_GameOpponentCharacter" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Name);
					ChangeShapedProgbar("ProgbarFg_GameOpponentCharacter" + Looper + "Energy", "Vertical", 0);
					RemoveClass("ProgbarFg_GameOpponentCharacter" + Looper + "Energy", "Charged");
					ChangeText("ProgbarText_GameOpponentCharacter" + Looper + "Energy", "0");
					for(let Looper2 = 1; Looper2 <= 3; Looper2++) {
						HideHorizontally("Label_GameOpponentCharacter" + Looper + "ElementIndicator" + Looper2);
					}
					HideHorizontally("Label_GameOpponentCharacter" + Looper + "ReactionIndicator");
					for(let Looper2 = 1; Looper2 <= 4; Looper2++) {
						HideHorizontally("Ctrl_GameOpponentCharacter" + Looper + "Status" + Looper2);
					}
				}
			}

			// Active characters
			if(Game.Status.Player.ActiveCharacter < 0 || Game.Status.Player.ActiveCharacter > 3) {
				AlertSystemError("The value of Game.Status.Player.ActiveCharacter \"" + Game.Status.Player.ActiveCharacter + "\" in function RefreshGame is invalid.");
			}
			if(Game.Status.Opponent.ActiveCharacter < 0 || Game.Status.Opponent.ActiveCharacter > 3) {
				AlertSystemError("The value of Game.Status.Opponent.ActiveCharacter \"" + Game.Status.Opponent.ActiveCharacter + "\" in function RefreshGame is invalid.");
			}
			for(let Looper = 1; Looper <= 3; Looper++) {
				RemoveClass("Card_GamePlayerCharacter" + Looper, "ActiveCharacter");
				RemoveClass("Card_GameOpponentCharacter" + Looper, "ActiveCharacter");
			}
			if(Game.Status.Player.ActiveCharacter > 0) {
				AddClass("Card_GamePlayerCharacter" + Game.Status.Player.ActiveCharacter, "ActiveCharacter");
			}
			if(Game.Status.Opponent.ActiveCharacter > 0) {
				AddClass("Card_GameOpponentCharacter" + Game.Status.Opponent.ActiveCharacter, "ActiveCharacter");
			}

			// Party status
			for(let Looper = 1; Looper <= 4; Looper++) {
				if(Game.Status.Player.PartyStatus[Looper].CardID != "" && ReadCardNumberByID(Game.Status.Player.PartyStatus[Looper].CardID) > 0) {
					Show("Ctrl_GamePlayerPartyStatus" + Looper);
					ChangeImage("Image_GamePlayerPartyStatus" + Looper, Casket.Card[ReadCardNumberByID(Game.Status.Player.PartyStatus[Looper].CardID)].Status[Game.Status.Player.PartyStatus[Looper].StatusNumber].Image);
					ChangeText("Label_GamePlayerPartyStatus" + Looper, Game.Status.Player.PartyStatus[Looper].Duration);
					switch(Casket.Card[ReadCardNumberByID(Game.Status.Player.PartyStatus[Looper].CardID)].Status[Game.Status.Player.PartyStatus[Looper].StatusNumber].Duration.Type) {
						case "Usages":
							RemoveClass("Label_GamePlayerPartyStatus" + Looper, "DurationInRounds");
							break;
						case "Rounds":
							AddClass("Label_GamePlayerPartyStatus" + Looper, "DurationInRounds");
							break;
						default:
							AlertSystemError("The value of Casket.Card[ReadCardNumberByID(Game.Status.Player.PartyStatus[Looper].CardID)].Status[Game.Status.Player.PartyStatus[Looper].StatusNumber].Duration.Type \"" + Casket.Card[ReadCardNumberByID(Game.Status.Player.PartyStatus[Looper].CardID)].Status[Game.Status.Player.PartyStatus[Looper].StatusNumber].Duration.Type + "\" in function RefreshGame is invalid.");
							break;
					}
				} else {
					HideHorizontally("Ctrl_GamePlayerPartyStatus" + Looper);
				}
				if(Game.Status.Opponent.PartyStatus[Looper].CardID != "" && ReadCardNumberByID(Game.Status.Opponent.PartyStatus[Looper].CardID) > 0) {
					Show("Ctrl_GameOpponentPartyStatus" + Looper);
					ChangeImage("Image_GameOpponentPartyStatus" + Looper, Casket.Card[ReadCardNumberByID(Game.Status.Opponent.PartyStatus[Looper].CardID)].Status[Game.Status.Opponent.PartyStatus[Looper].StatusNumber].Image);
					ChangeText("Label_GameOpponentPartyStatus" + Looper, Game.Status.Opponent.PartyStatus[Looper].Duration);
					switch(Casket.Card[ReadCardNumberByID(Game.Status.Opponent.PartyStatus[Looper].CardID)].Status[Game.Status.Opponent.PartyStatus[Looper].StatusNumber].Duration.Type) {
						case "Usages":
							RemoveClass("Label_GameOpponentPartyStatus" + Looper, "DurationInRounds");
							break;
						case "Rounds":
							AddClass("Label_GameOpponentPartyStatus" + Looper, "DurationInRounds");
							break;
						default:
							AlertSystemError("The value of Casket.Card[ReadCardNumberByID(Game.Status.Opponent.PartyStatus[Looper].CardID)].Status[Game.Status.Opponent.PartyStatus[Looper].StatusNumber].Duration.Type \"" + Casket.Card[ReadCardNumberByID(Game.Status.Opponent.PartyStatus[Looper].CardID)].Status[Game.Status.Opponent.PartyStatus[Looper].StatusNumber].Duration.Type + "\" in function RefreshGame is invalid.");
							break;
					}
				} else {
					HideHorizontally("Ctrl_GameOpponentPartyStatus" + Looper);
				}
			}
		}
		function RefreshSummonsCards() {
			for(let Looper = 1; Looper <= 4; Looper++) {
				if(Game.Status.Player.SummonsCard[Looper].ID != "") {
					ChangeCardPosition("Card_GamePlayerSummons" + Looper, "OnTable");
					ChangeSequence("Card_GamePlayerSummons" + Looper, Game.Status.Player.SummonsCard[Looper].Sequence);
					switch(true) {
						// When the summons card is an affiliated card of a character card
						case ReadCardNumberByID(Game.Status.Player.SummonsCard[Looper].ID) > 0 &&
						Casket.Card[ReadCardNumberByID(Game.Status.Player.SummonsCard[Looper].ID)].BasicProperties.Type == "CharacterCard" &&
						Casket.Card[ReadCardNumberByID(Game.Status.Player.SummonsCard[Looper].ID)].CharacterCardProperties.HasAffiliatedCard == true &&
						Casket.Card[ReadCardNumberByID(Game.Status.Player.SummonsCard[Looper].ID)].AffiliatedCard.Type == "SummonsCard":
							let CardNumber = ReadCardNumberByID(Game.Status.Player.SummonsCard[Looper].ID);
							ChangeImage("Image_GamePlayerSummons" + Looper, Casket.Card[CardNumber].AffiliatedCard.Image);
							ChangeText("Label_GamePlayerSummons" + Looper, Casket.Card[CardNumber].AffiliatedCard.Name);
							ChangeShapedProgbar("ProgbarFg_GamePlayerSummons" + Looper + "Duration", "Vertical", Game.Status.Player.SummonsCard[Looper].Duration / Casket.Card[ReadCardNumberByID(Game.Status.Player.SummonsCard[Looper].ID)].AffiliatedCard.Duration.Quantity * 100);
							if(Game.Status.Player.SummonsCard[Looper].Counter != undefined && Casket.Card[CardNumber].AffiliatedCard.HasCounter == true) {
								Show("Ctrl_GamePlayerSummons" + Looper + "Counter");
								ChangeText("ProgbarText_GamePlayerSummons" + Looper + "Counter", Game.Status.Player.SummonsCard[Looper].Counter);
							} else {
								Fade("Ctrl_GamePlayerSummons" + Looper + "Counter");
							}
							break;

						// When the summons card is a built-in card
						case Casket0.BuiltinCard[Game.Status.Player.SummonsCard[Looper].ID] != undefined &&
						Casket0.BuiltinCard[Game.Status.Player.SummonsCard[Looper].ID].BasicProperties.Type == "SummonsCard":
							ChangeImage("Image_GamePlayerSummons" + Looper, Casket0.BuiltinCard[Game.Status.Player.SummonsCard[Looper].ID].BasicProperties.Image);
							ChangeText("Label_GamePlayerSummons" + Looper, Casket0.BuiltinCard[Game.Status.Player.SummonsCard[Looper].ID].BasicProperties.Name);
							ChangeShapedProgbar("ProgbarFg_GamePlayerSummons" + Looper + "Duration", "Vertical", Game.Status.Player.SummonsCard[Looper].Duration / Casket0.BuiltinCard[Game.Status.Player.SummonsCard[Looper].ID].SummonsCardProperties.Duration.Quantity * 100);
							if(Game.Status.Player.SummonsCard[Looper].Counter != undefined && Casket0.BuiltinCard[Game.Status.Player.SummonsCard[Looper].ID].SummonsCardProperties.HasCounter == true) {
								Show("Ctrl_GamePlayerSummons" + Looper + "Counter");
								ChangeText("ProgbarText_GamePlayerSummons" + Looper + "Counter", Game.Status.Player.SummonsCard[Looper].Counter);
							} else {
								Fade("Ctrl_GamePlayerSummons" + Looper + "Counter");
							}
							break;

						// Error
						default:
							AlertSystemError("The player's #" + Looper + " summons card \"" + Game.Status.Player.SummonsCard[Looper].ID + "\" is invalid.");
							break;
					}
					ChangeText("ProgbarText_GamePlayerSummons" + Looper + "Duration", Game.Status.Player.SummonsCard[Looper].Duration);
				} else {
					ChangeCardPosition("Card_GamePlayerSummons" + Looper, "OffTable");
				}
				if(Game.Status.Opponent.SummonsCard[Looper].ID != "") {
					ChangeCardPosition("Card_GameOpponentSummons" + Looper, "OnTable");
					ChangeSequence("Card_GameOpponentSummons" + Looper, Game.Status.Opponent.SummonsCard[Looper].Sequence);
					switch(true) {
						// When the summons card is an affiliated card of a character card
						case ReadCardNumberByID(Game.Status.Opponent.SummonsCard[Looper].ID) > 0 &&
						Casket.Card[ReadCardNumberByID(Game.Status.Opponent.SummonsCard[Looper].ID)].BasicProperties.Type == "CharacterCard" &&
						Casket.Card[ReadCardNumberByID(Game.Status.Opponent.SummonsCard[Looper].ID)].CharacterCardProperties.HasAffiliatedCard == true &&
						Casket.Card[ReadCardNumberByID(Game.Status.Opponent.SummonsCard[Looper].ID)].AffiliatedCard.Type == "SummonsCard":
							let CardNumber = ReadCardNumberByID(Game.Status.Opponent.SummonsCard[Looper].ID);
							ChangeImage("Image_GameOpponentSummons" + Looper, Casket.Card[CardNumber].AffiliatedCard.Image);
							ChangeText("Label_GameOpponentSummons" + Looper, Casket.Card[CardNumber].AffiliatedCard.Name);
							ChangeShapedProgbar("ProgbarFg_GameOpponentSummons" + Looper + "Duration", "Vertical", Game.Status.Opponent.SummonsCard[Looper].Duration / Casket.Card[ReadCardNumberByID(Game.Status.Opponent.SummonsCard[Looper].ID)].AffiliatedCard.Duration.Quantity * 100);
							if(Game.Status.Opponent.SummonsCard[Looper].Counter != undefined && Casket.Card[CardNumber].AffiliatedCard.HasCounter == true) {
								Show("Ctrl_GameOpponentSummons" + Looper + "Counter");
								ChangeText("ProgbarText_GameOpponentSummons" + Looper + "Counter", Game.Status.Opponent.SummonsCard[Looper].Counter);
							} else {
								Fade("Ctrl_GameOpponentSummons" + Looper + "Counter");
							}
							break;

						// When the summons card is a built-in card
						case Casket0.BuiltinCard[Game.Status.Opponent.SummonsCard[Looper].ID] != undefined &&
						Casket0.BuiltinCard[Game.Status.Opponent.SummonsCard[Looper].ID].BasicProperties.Type == "SummonsCard":
							ChangeImage("Image_GameOpponentSummons" + Looper, Casket0.BuiltinCard[Game.Status.Opponent.SummonsCard[Looper].ID].BasicProperties.Image);
							ChangeText("Label_GameOpponentSummons" + Looper, Casket0.BuiltinCard[Game.Status.Opponent.SummonsCard[Looper].ID].BasicProperties.Name);
							ChangeShapedProgbar("ProgbarFg_GameOpponentSummons" + Looper + "Duration", "Vertical", Game.Status.Opponent.SummonsCard[Looper].Duration / Casket0.BuiltinCard[Game.Status.Opponent.SummonsCard[Looper].ID].SummonsCardProperties.Duration.Quantity * 100);
							if(Game.Status.Opponent.SummonsCard[Looper].Counter != undefined && Casket0.BuiltinCard[Game.Status.Opponent.SummonsCard[Looper].ID].SummonsCardProperties.HasCounter == true) {
								Show("Ctrl_GameOpponentSummons" + Looper + "Counter");
								ChangeText("ProgbarText_GameOpponentSummons" + Looper + "Counter", Game.Status.Opponent.SummonsCard[Looper].Counter);
							} else {
								Fade("Ctrl_GameOpponentSummons" + Looper + "Counter");
							}
							break;

						// Error
						default:
							AlertSystemError("The opponent's #" + Looper + " summons card \"" + Game.Status.Opponent.SummonsCard[Looper].ID + "\" is invalid.");
							break;
					}
					ChangeText("ProgbarText_GameOpponentSummons" + Looper + "Duration", Game.Status.Opponent.SummonsCard[Looper].Duration);
				} else {
					ChangeCardPosition("Card_GameOpponentSummons" + Looper, "OffTable");
				}
			}
		}
		function RefreshActionCards() {
			for(let Looper = 1; Looper <= 33; Looper++) {
				// Position & sequence
				ChangeCardPosition("Card_GamePlayerAction" + Looper, Game.Status.Player.ActionCard[Looper].Position);
				ChangeCardPosition("Card_GameOpponentAction" + Looper, Game.Status.Opponent.ActionCard[Looper].Position);
				if(Game.Status.Player.ActionCard[Looper].Sequence != undefined) {
					ChangeSequence("Card_GamePlayerAction" + Looper, Game.Status.Player.ActionCard[Looper].Sequence);
				}
				if(Game.Status.Opponent.ActionCard[Looper].Sequence != undefined) {
					ChangeSequence("Card_GameOpponentAction" + Looper, Game.Status.Opponent.ActionCard[Looper].Sequence);
				}

				// Properties
				if(Game.Status.Player.ActionCard[Looper].ID != "" && ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID) > 0) {
					let CardNumber = ReadCardNumberByID(Game.Status.Player.ActionCard[Looper].ID);
					if(Casket.Card[CardNumber].BasicProperties.Type != "CharacterCard") {
						ChangeActionCardType("Card_GamePlayerAction" + Looper, Casket.Card[CardNumber].BasicProperties.Type.replaceAll("Card", ""));
						ChangeImage("Image_GamePlayerAction" + Looper, Casket.Card[CardNumber].BasicProperties.Image);
						ChangeText("Label_GamePlayerAction" + Looper, Casket.Card[CardNumber].BasicProperties.Name);
						ChangeElementColor("CostIndicator_GamePlayerAction" + Looper, ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[2]);
						ChangeText("CostIndicatorText_GamePlayerAction" + Looper, ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GamePlayerAction" + Looper, "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[2]) + "</span>");
						}
						switch(true) {
							case ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1] < ReadOriginalCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1]:
								AddText("CostIndicatorText_GamePlayerAction" + Looper, ReadText("Resource_CostDecreasedIcon"));
								break;
							case ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1] > ReadOriginalCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1]:
								AddText("CostIndicatorText_GamePlayerAction" + Looper, ReadText("Resource_CostIncreasedIcon"));
								break;
							default:
								break;
						}
						if(Casket.Card[CardNumber].BasicProperties.Type == "TalentCard" && Casket.Card[CardNumber].TalentCardProperties.Cost[3] > 0) {
							Show("CostIndicator_GamePlayerAction" + Looper + "Additional");
							ChangeText("CostIndicatorText_GamePlayerAction" + Looper + "Additional", ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3]);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GamePlayerAction" + Looper + "Additional", "<span class=\"SmallerText\">任</span>");
							}
							switch(true) {
								case ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3] < ReadOriginalCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3]:
									AddText("CostIndicatorText_GamePlayerAction" + Looper + "Additional", ReadText("Resource_CostDecreasedIcon"));
									break;
								case ReadCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3] > ReadOriginalCost("Player", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3]:
									AddText("CostIndicatorText_GamePlayerAction" + Looper + "Additional", ReadText("Resource_CostIncreasedIcon"));
									break;
								default:
									break;
							}
						} else {
							Fade("CostIndicator_GamePlayerAction" + Looper + "Additional");
						}
						if(Game.Status.Player.ActionCard[Looper].Duration != undefined && Casket.Card[CardNumber].BasicProperties.Type == "SupportCard") {
							ChangeShapedProgbar("ProgbarFg_GamePlayerAction" + Looper + "Duration", "Vertical", Game.Status.Player.ActionCard[Looper].Duration / Casket.Card[CardNumber].SupportCardProperties.Duration.Quantity * 100);
							ChangeText("ProgbarText_GamePlayerAction" + Looper + "Duration", Game.Status.Player.ActionCard[Looper].Duration);
							switch(Casket.Card[CardNumber].SupportCardProperties.Duration.Type) {
								case "Usages":
									RemoveClass("ProgbarText_GamePlayerAction" + Looper + "Duration", "DurationInRounds");
									if(Subsystem.Display.ColorBlindMode == true) {
										AddText("ProgbarText_GamePlayerAction" + Looper + "Duration", "<span class=\"SmallerText\">次</span>");
									}
									break;
								case "Rounds":
									AddClass("ProgbarText_GamePlayerAction" + Looper + "Duration", "DurationInRounds");
									if(Subsystem.Display.ColorBlindMode == true) {
										AddText("ProgbarText_GamePlayerAction" + Looper + "Duration", "<span class=\"SmallerText\">轮</span>");
									}
									break;
								default:
									AlertSystemError("The value of Casket.Card[CardNumber].SupportCardProperties.Duration.Type \"" + Casket.Card[CardNumber].SupportCardProperties.Duration.Type + "\" in function RefreshGame is invalid.");
									break;
							}
						}
						if(Game.Status.Player.ActionCard[Looper].Counter != undefined && Casket.Card[CardNumber].BasicProperties.Type == "SupportCard" && Casket.Card[CardNumber].SupportCardProperties.HasCounter == true) {
							Show("Ctrl_GamePlayerAction" + Looper + "Counter");
							ChangeText("ProgbarText_GamePlayerAction" + Looper + "Counter", Game.Status.Player.ActionCard[Looper].Counter);
						} else {
							Fade("Ctrl_GamePlayerAction" + Looper + "Counter");
						}
					} else {
						if(Casket.Card[CardNumber].CharacterCardProperties.HasAffiliatedCard == true && Casket.Card[CardNumber].AffiliatedCard.Type == "EventCard") {
							ChangeActionCardType("Card_GamePlayerAction" + Looper, "Event");
							ChangeImage("Image_GamePlayerAction" + Looper, Casket.Card[CardNumber].AffiliatedCard.Image);
							ChangeText("Label_GamePlayerAction" + Looper, Casket.Card[CardNumber].AffiliatedCard.Name);
							ChangeElementColor("CostIndicator_GamePlayerAction" + Looper, ReadCost("Player", "EventCard", CardNumber)[2]);
							ChangeText("CostIndicatorText_GamePlayerAction" + Looper, ReadCost("Player", "EventCard", CardNumber)[1]);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GamePlayerAction" + Looper, "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Player", "EventCard", CardNumber)[2]) + "</span>");
							}
							switch(true) {
								case ReadCost("Player", "EventCard", CardNumber)[1] < ReadOriginalCost("Player", "EventCard", CardNumber)[1]:
									AddText("CostIndicatorText_GamePlayerAction" + Looper, ReadText("Resource_CostDecreasedIcon"));
									break;
								case ReadCost("Player", "EventCard", CardNumber)[1] > ReadOriginalCost("Player", "EventCard", CardNumber)[1]:
									AddText("CostIndicatorText_GamePlayerAction" + Looper, ReadText("Resource_CostIncreasedIcon"));
									break;
								default:
									break;
							}
							Fade("CostIndicator_GamePlayerAction" + Looper + "Additional");
						} else {
							AlertSystemError("Player's action card #" + Looper + " \"" + Game.Status.Player.ActionCard[Looper].ID + "\" is invalid. It is a character card ID, but the specified character card does not have an affiliated card of event card type.");
						}
					}
				} else {
					ChangeImage("Image_GamePlayerAction" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Image);
					ChangeText("Label_GamePlayerAction" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Name);
					ChangeElementColor("CostIndicator_GamePlayerAction" + Looper, "Unknown");
					ChangeText("CostIndicatorText_GamePlayerAction" + Looper, "?");
					Fade("CostIndicator_GamePlayerAction" + Looper + "Additional");
					Fade("Ctrl_GamePlayerAction" + Looper + "Counter");
				}
				if(Game.Status.Opponent.ActionCard[Looper].ID != "" && ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID) > 0) {
					let CardNumber = ReadCardNumberByID(Game.Status.Opponent.ActionCard[Looper].ID);
					if(Casket.Card[CardNumber].BasicProperties.Type != "CharacterCard") {
						ChangeActionCardType("Card_GameOpponentAction" + Looper, Casket.Card[CardNumber].BasicProperties.Type.replaceAll("Card", ""));
						ChangeImage("Image_GameOpponentAction" + Looper, Casket.Card[CardNumber].BasicProperties.Image);
						ChangeText("Label_GameOpponentAction" + Looper, Casket.Card[CardNumber].BasicProperties.Name);
						ChangeElementColor("CostIndicator_GameOpponentAction" + Looper, ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[2]);
						ChangeText("CostIndicatorText_GameOpponentAction" + Looper, ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameOpponentAction" + Looper, "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[2]) + "</span>");
						}
						switch(true) {
							case ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1] < ReadOriginalCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1]:
								AddText("CostIndicatorText_GameOpponentAction" + Looper, ReadText("Resource_CostDecreasedIcon"));
								break;
							case ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1] > ReadOriginalCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[1]:
								AddText("CostIndicatorText_GameOpponentAction" + Looper, ReadText("Resource_CostIncreasedIcon"));
								break;
							default:
								break;
						}
						if(Casket.Card[CardNumber].BasicProperties.Type == "TalentCard" && Casket.Card[CardNumber].TalentCardProperties.Cost[3] > 0) {
							Show("CostIndicator_GameOpponentAction" + Looper + "Additional");
							ChangeText("CostIndicatorText_GameOpponentAction" + Looper + "Additional", ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3]);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GameOpponentAction" + Looper + "Additional", "<span class=\"SmallerText\">任</span>");
							}
							switch(true) {
								case ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3] < ReadOriginalCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3]:
									AddText("CostIndicatorText_GameOpponentAction" + Looper + "Additional", ReadText("Resource_CostDecreasedIcon"));
									break;
								case ReadCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3] > ReadOriginalCost("Opponent", Casket.Card[CardNumber].BasicProperties.Type, CardNumber)[3]:
									AddText("CostIndicatorText_GameOpponentAction" + Looper + "Additional", ReadText("Resource_CostIncreasedIcon"));
									break;
								default:
									break;
							}
						} else {
							Fade("CostIndicator_GameOpponentAction" + Looper + "Additional");
						}
						if(Game.Status.Opponent.ActionCard[Looper].Duration != undefined && Casket.Card[CardNumber].BasicProperties.Type == "SupportCard") {
							ChangeShapedProgbar("ProgbarFg_GameOpponentAction" + Looper + "Duration", "Vertical", Game.Status.Opponent.ActionCard[Looper].Duration / Casket.Card[CardNumber].SupportCardProperties.Duration.Quantity * 100);
							ChangeText("ProgbarText_GameOpponentAction" + Looper + "Duration", Game.Status.Opponent.ActionCard[Looper].Duration);
							switch(Casket.Card[CardNumber].SupportCardProperties.Duration.Type) {
								case "Usages":
									RemoveClass("ProgbarText_GameOpponentAction" + Looper + "Duration", "DurationInRounds");
									if(Subsystem.Display.ColorBlindMode == true) {
										AddText("ProgbarText_GameOpponentAction" + Looper + "Duration", "<span class=\"SmallerText\">次</span>");
									}
									break;
								case "Rounds":
									AddClass("ProgbarText_GameOpponentAction" + Looper + "Duration", "DurationInRounds");
									if(Subsystem.Display.ColorBlindMode == true) {
										AddText("ProgbarText_GameOpponentAction" + Looper + "Duration", "<span class=\"SmallerText\">轮</span>");
									}
									break;
								default:
									AlertSystemError("The value of Casket.Card[CardNumber].SupportCardProperties.Duration.Type \"" + Casket.Card[CardNumber].SupportCardProperties.Duration.Type + "\" in function RefreshGame is invalid.");
									break;
							}
						}
						if(Game.Status.Opponent.ActionCard[Looper].Counter != undefined && Casket.Card[CardNumber].BasicProperties.Type == "SupportCard" && Casket.Card[CardNumber].SupportCardProperties.HasCounter == true) {
							Show("Ctrl_GameOpponentAction" + Looper + "Counter");
							ChangeText("ProgbarText_GameOpponentAction" + Looper + "Counter", Game.Status.Opponent.ActionCard[Looper].Counter);
						} else {
							Fade("Ctrl_GameOpponentAction" + Looper + "Counter");
						}
					} else {
						if(Casket.Card[CardNumber].CharacterCardProperties.HasAffiliatedCard == true && Casket.Card[CardNumber].AffiliatedCard.Type == "EventCard") {
							ChangeActionCardType("Card_GameOpponentAction" + Looper, "Event");
							ChangeImage("Image_GameOpponentAction" + Looper, Casket.Card[CardNumber].AffiliatedCard.Image);
							ChangeText("Label_GameOpponentAction" + Looper, Casket.Card[CardNumber].AffiliatedCard.Name);
							ChangeElementColor("CostIndicator_GameOpponentAction" + Looper, ReadCost("Opponent", "EventCard", CardNumber)[2]);
							ChangeText("CostIndicatorText_GameOpponentAction" + Looper, ReadCost("Opponent", "EventCard", CardNumber)[1]);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GameOpponentAction" + Looper, "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Opponent", "EventCard", CardNumber)[2]) + "</span>");
							}
							switch(true) {
								case ReadCost("Opponent", "EventCard", CardNumber)[1] < ReadOriginalCost("Opponent", "EventCard", CardNumber)[1]:
									AddText("CostIndicatorText_GameOpponentAction" + Looper, ReadText("Resource_CostDecreasedIcon"));
									break;
								case ReadCost("Opponent", "EventCard", CardNumber)[1] > ReadOriginalCost("Opponent", "EventCard", CardNumber)[1]:
									AddText("CostIndicatorText_GameOpponentAction" + Looper, ReadText("Resource_CostIncreasedIcon"));
									break;
								default:
									break;
							}
							Fade("CostIndicator_GameOpponentAction" + Looper + "Additional");
							Fade("Ctrl_GameOpponentAction" + Looper + "Counter");
						} else {
							AlertSystemError("Opponent's action card #" + Looper + " \"" + Game.Status.Opponent.ActionCard[Looper].ID + "\" is invalid. It is a character card ID, and the specified character card does not have an affiliated card of event card type.");
						}
					}
				} else {
					ChangeImage("Image_GameOpponentAction" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Image);
					ChangeText("Label_GameOpponentAction" + Looper, Casket0.BuiltinCard.UnknownCard.BasicProperties.Name);
					ChangeElementColor("CostIndicator_GameOpponentAction" + Looper, "Unknown");
					ChangeText("CostIndicatorText_GameOpponentAction" + Looper, "?");
					Fade("CostIndicator_GameOpponentAction" + Looper + "Additional");
					Fade("Ctrl_GameOpponentAction" + Looper + "Counter");
				}
			}
		}
		function RefreshCardsInHand() { // This positioning cannot be done by CSS.
			// Initialization
			let InHandCardQuantity = {
				Player: 0, Opponent: 0
			},
			CenterPosition = "", CardWidth = 0, CardSeparation = 0;
			for(let Looper = 1; Looper <= 33; Looper++) {
				if(Game.Status.Player.ActionCard[Looper].Position == "InHand") {
					InHandCardQuantity.Player++;
				}
				if(Game.Status.Opponent.ActionCard[Looper].Position == "InHand") {
					InHandCardQuantity.Opponent++;
				}
			}
			if(InHandCardQuantity.Player > 10) {
				AlertSystemError("The value of InHandCardQuantity.Player \"" + InHandCardQuantity.Player + "\" in function RefreshGame is invalid.");
			}
			if(InHandCardQuantity.Opponent > 10) {
				AlertSystemError("The value of InHandCardQuantity.Opponent \"" + InHandCardQuantity.Opponent + "\" in function RefreshGame is invalid.");
			}
			if(IsMobileLayout() == false) {
				CenterPosition = "50%";
				CardWidth = 112;
				CardSeparation = 40;
			} else {
				CenterPosition = "141px";
				CardWidth = 84;
				CardSeparation = 22;
			}

			// Player
			let Counter = 0;
			for(let Looper = 1; Looper <= 33; Looper++) {
				if(Game.Status.Player.ActionCard[Looper].Position == "InHand") {
					ChangeLeft("Card_GamePlayerAction" + Looper, "calc(" + CenterPosition + " - " + (CardSeparation * (InHandCardQuantity.Player - 1) + CardWidth) / 2 + "px + " + CardSeparation * Counter + "px)");
					Counter++;
				} else {
					ChangeLeft("Card_GamePlayerAction" + Looper, "");
				}
			}
			if(Counter > 0) {
				Show("GameActionCardsIndependentHotkeyIndicator");
			} else {
				Fade("GameActionCardsIndependentHotkeyIndicator");
			}

			// Opponent
			Counter = 0;
			for(let Looper = 1; Looper <= 33; Looper++) {
				if(Game.Status.Opponent.ActionCard[Looper].Position == "InHand") {
					ChangeLeft("Card_GameOpponentAction" + Looper, "calc(" + CenterPosition + " - " + (CardSeparation * (InHandCardQuantity.Opponent - 1) + CardWidth) / 2 + "px + " + CardSeparation * Counter + "px)");
					Counter++;
					if(Subsystem.Dev.Cheat == false) {
						ChangeInert("Card_GameOpponentAction" + Looper, true);
					} else {
						ChangeInert("Card_GameOpponentAction" + Looper, false);
					}
				} else {
					ChangeLeft("Card_GameOpponentAction" + Looper, "");
				}
			}
		}
		function RefreshDice() {
			if(JSON.stringify(Game.Status.Phase) != "[0,\"RollPhase\",\"Beginning\"]" && JSON.stringify(Game.Status.Phase) != "[0,\"RollPhase\",\"Working1\"]") {
				// Determine priority (Smaller number, higher priority)
				let Priority = {
					Player: [0],
					Opponent: [0]
				};
				for(let Looper = 1; Looper <= 12; Looper++) {
					if(Game.Status.Player.Dice[Looper].Position != "OffTable") {
						// Sort by element
						Priority.Player[Looper] = ConvertElementTypeToNumber(Game.Status.Player.Dice[Looper].Type) - 5; // From 11~17 to 6~12.

						// Matching the element of any alive character in party
						if(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[1].ID)].CharacterCardProperties.ElementType && Game.Status.Player.CharacterCard[1].HP > 0) {
							Priority.Player[Looper] = 3;
						}
						if(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[2].ID)].CharacterCardProperties.ElementType && Game.Status.Player.CharacterCard[2].HP > 0) {
							Priority.Player[Looper] = 4;
						}
						if(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[3].ID)].CharacterCardProperties.ElementType && Game.Status.Player.CharacterCard[3].HP > 0) {
							Priority.Player[Looper] = 5;
						}

						// Matching the element of active character in party
						if(Game.Status.Player.ActiveCharacter > 0) {
							if(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Game.Status.Player.ActiveCharacter].ID)].CharacterCardProperties.ElementType) {
								Priority.Player[Looper] = 2;
							}
						}

						// Omni dice
						if(Game.Status.Player.Dice[Looper].Type == "Omni") {
							Priority.Player[Looper] = 1;
						}
					} else {
						// Inactive dice
						Priority.Player[Looper] = 13;
					}
					if(Game.Status.Opponent.Dice[Looper].Position != "OffTable") {
						// Sort by element
						Priority.Opponent[Looper] = ConvertElementTypeToNumber(Game.Status.Opponent.Dice[Looper].Type) - 5;

						// Matching the element of any alive character in party
						if(Game.Status.Opponent.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[1].ID)].CharacterCardProperties.ElementType && Game.Status.Opponent.CharacterCard[1].HP > 0) {
							Priority.Opponent[Looper] = 3;
						}
						if(Game.Status.Opponent.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[2].ID)].CharacterCardProperties.ElementType && Game.Status.Opponent.CharacterCard[2].HP > 0) {
							Priority.Opponent[Looper] = 4;
						}
						if(Game.Status.Opponent.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[3].ID)].CharacterCardProperties.ElementType && Game.Status.Opponent.CharacterCard[3].HP > 0) {
							Priority.Opponent[Looper] = 5;
						}

						// Matching the element of active character in party
						if(Game.Status.Opponent.ActiveCharacter > 0) {
							if(Game.Status.Opponent.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Opponent.CharacterCard[Game.Status.Opponent.ActiveCharacter].ID)].CharacterCardProperties.ElementType) {
								Priority.Opponent[Looper] = 2;
							}
						}

						// Omni dice
						if(Game.Status.Opponent.Dice[Looper].Type == "Omni") {
							Priority.Opponent[Looper] = 1;
						}
					} else {
						// Inactive dice
						Priority.Opponent[Looper] = 13;
					}
				}

				// Assign sequence
				let Sequence = {
					Player: 1,
					Opponent: 1
				};
				for(let Looper = 1; Looper <= 13; Looper++) { // Priority.
					for(let Looper2 = 1; Looper2 <= 12; Looper2++) { // Dice number.
						if(Priority.Player[Looper2] == Looper) {
							Game.Status.Player.Dice[Looper2].Sequence = Sequence.Player;
							Sequence.Player++;
						}
						if(Sequence.Player > 13) {
							AlertSystemError("The value of Sequence.Player (Dice) \"" + Sequence.Player + "\" in function RefreshGame is invalid.");
						}
						if(Priority.Opponent[Looper2] == Looper) {
							Game.Status.Opponent.Dice[Looper2].Sequence = Sequence.Opponent;
							Sequence.Opponent++;
						}
						if(Sequence.Opponent > 13) {
							AlertSystemError("The value of Sequence.Opponent (Dice) \"" + Sequence.Opponent + "\" in function RefreshGame is invalid.");
						}
					}
				}
			}
			for(let Looper = 1; Looper <= 12; Looper++) {
				ChangeDicePosition("Dice_GamePlayer" + Looper, Game.Status.Player.Dice[Looper].Position);
				ChangeDicePosition("Dice_GameOpponent" + Looper, Game.Status.Opponent.Dice[Looper].Position);
				if(Game.Status.Player.Dice[Looper].Position != "OffTable") {
					RemoveClass("HotkeyIndicator_GameDice" + Looper, "ForceFaded");
				} else {
					AddClass("HotkeyIndicator_GameDice" + Looper, "ForceFaded");
				}
				ChangeSequence("Dice_GamePlayer" + Looper, Game.Status.Player.Dice[Looper].Sequence);
				ChangeSequence("Dice_GameOpponent" + Looper, Game.Status.Opponent.Dice[Looper].Sequence);
				ChangeText("CostIndicatorText_GamePlayerDice" + Looper, ConvertElementTypeToIcon(Game.Status.Player.Dice[Looper].Type));
				if(Game.Options.ShowOpponentDiceContent == true) {
					ChangeText("CostIndicatorText_GameOpponentDice" + Looper, ConvertElementTypeToIcon(Game.Status.Opponent.Dice[Looper].Type));
				} else {
					ChangeText("CostIndicatorText_GameOpponentDice" + Looper, "");
				}
				if(Game0.Selection.Dice[Looper] == true) {
					AddClass("Button_GamePlayerDice" + Looper, "Active");
				} else {
					RemoveClass("Button_GamePlayerDice" + Looper, "Active");
				}
				if(Subsystem.Dev.Cheat == false) {
					ChangeInert("Dice_GameOpponent" + Looper, true);
				} else {
					ChangeInert("Dice_GameOpponent" + Looper, false);
				}
			}
			if(Game.Status.Player.Dice[1].Position == "OnRolling") {
				AddClass("GameDiceIndependentHotkeyIndicators", "OnRolling");
			} else {
				RemoveClass("GameDiceIndependentHotkeyIndicators", "OnRolling");
			}
		}
		function RefreshTable() {
			// Show or hide
			if(Game.Status.Operation != "Title" && Game.Status.Operation != "Loading") {
				Show("Ctnr_GameTable");
			} else {
				Fade("Ctnr_GameTable");
			}

			// Game status
			if(Game.Status.Round <= 0) {
				ChangeText("Label_GameRound", "0");
				AddClass("Label_GameRound", "Transparent");
			} else {
				ChangeText("Label_GameRound", Game.Status.Round);
				RemoveClass("Label_GameRound", "Transparent");
			}
			switch(Game.Status.Phase[1]) {
				case "":
					ChangeText("Label_GamePhase", "");
					break;
				case "Initialization":
					ChangeText("Label_GamePhase", "初始化");
					break;
				case "StartingHand":
					ChangeText("Label_GamePhase", "初始手牌");
					break;
				case "InitialCharacter":
					ChangeText("Label_GamePhase", "初始角色");
					break;
				case "RollPhase":
					ChangeText("Label_GamePhase", "掷骰阶段");
					break;
				case "ActionPhase":
					ChangeText("Label_GamePhase", "行动阶段");
					break;
				case "EndPhase":
					ChangeText("Label_GamePhase", "结束阶段");
					break;
				default:
					AlertSystemError("The value of Game.Status.Phase[1] \"" + Game.Status.Phase[1] + "\" in function RefreshGame is invalid.");
					break;
			}
			if(Game.Status.Phase[2] != "" && Game.Status.Phase[2] != "Standby") {
				ShowWithoutProtection("Ctrl_GameBusy");
			} else {
				Fade("Ctrl_GameBusy");
			}
			let InPileCardQuantity = {
				Player: 0, Opponent: 0
			};
			for(let Looper = 1; Looper <= 30; Looper++) {
				if(Game.Status.Player.ActionCard[Looper].Position == "OffTable") {
					InPileCardQuantity.Player++;
				}
				if(Game.Status.Opponent.ActionCard[Looper].Position == "OffTable") {
					InPileCardQuantity.Opponent++;
				}
			}
			if(InPileCardQuantity.Player > 30) {
				AlertSystemError("The value of InPileCardQuantity.Player \"" + InPileCardQuantity.Player + "\" in function RefreshGame is invalid.");
			}
			if(InPileCardQuantity.Opponent > 30) {
				AlertSystemError("The value of InPileCardQuantity.Opponent \"" + InPileCardQuantity.Opponent + "\" in function RefreshGame is invalid.");
			}
			ChangeText("Label_GameCardPile", InPileCardQuantity.Player + " | " + InPileCardQuantity.Opponent);

			// Action ctrl
			ChangeText("Label_GameTurnIndicatorAdditionalTextPlayer", "");
			switch(Game.Status.Player.Turn) {
				case "InTurn":
					ChangeIndicatorLight("Ctrl_GameTurnIndicatorPlayer", "Green");
					if(Subsystem.Display.ColorBlindMode == true) {
						ChangeText("Label_GameTurnIndicatorAdditionalTextPlayer", "行动");
					}
					break;
				case "Standby":
					ChangeIndicatorLight("Ctrl_GameTurnIndicatorPlayer", "Off");
					if(Subsystem.Display.ColorBlindMode == true) {
						ChangeText("Label_GameTurnIndicatorAdditionalTextPlayer", "待机");
					}
					break;
				case "EndedAction":
					ChangeIndicatorLight("Ctrl_GameTurnIndicatorPlayer", "Red");
					if(Subsystem.Display.ColorBlindMode == true) {
						ChangeText("Label_GameTurnIndicatorAdditionalTextPlayer", "结束");
					}
					break;
				default:
					AlertSystemError("The value of Game.Status.Player.Turn \"" + Game.Status.Player.Turn + "\" in function RefreshGame is invalid.");
					break;
			}
			ChangeText("Label_GameTurnIndicatorAdditionalTextOpponent", "");
			switch(Game.Status.Opponent.Turn) {
				case "InTurn":
					ChangeIndicatorLight("Ctrl_GameTurnIndicatorOpponent", "Green");
					if(Subsystem.Display.ColorBlindMode == true) {
						ChangeText("Label_GameTurnIndicatorAdditionalTextOpponent", "行动");
					}
					break;
				case "Standby":
					ChangeIndicatorLight("Ctrl_GameTurnIndicatorOpponent", "Off");
					if(Subsystem.Display.ColorBlindMode == true) {
						ChangeText("Label_GameTurnIndicatorAdditionalTextOpponent", "待机");
					}
					break;
				case "EndedAction":
					ChangeIndicatorLight("Ctrl_GameTurnIndicatorOpponent", "Red");
					if(Subsystem.Display.ColorBlindMode == true) {
						ChangeText("Label_GameTurnIndicatorAdditionalTextOpponent", "结束");
					}
					break;
				default:
					AlertSystemError("The value of Game.Status.Opponent.Turn \"" + Game.Status.Opponent.Turn + "\" in function RefreshGame is invalid.");
					break;
			}
			if(Game.Status.Player.Turn == "InTurn" && Game.Status.Player.ActiveCharacter > 0) {
				ChangeDisabled("Button_GameEndAction", false);
			} else {
				ChangeDisabled("Button_GameEndAction", true);
			}

			// Skill ctrl
			if(Game.Status.Player.ActiveCharacter > 0) {
				// Initialization
				let CardNumber = ReadCardNumberByID(Game.Status.Player.CharacterCard[Game.Status.Player.ActiveCharacter].ID);

				// Normal attack
				Show("Image_GameNormalAttack");
				ChangeImage("Image_GameNormalAttack", "images/NormalAttack_" + Casket.Card[CardNumber].CharacterCardProperties.WeaponType + ".png");
				if(IsSelectedDiceMatchingCost("Player", "NormalAttack", null) == true) {
					AddClass("Button_GameNormalAttack", "Active");
				} else {
					RemoveClass("Button_GameNormalAttack", "Active");
				}
				ChangeElementColor("CostIndicator_GameNormalAttack", ReadCost("Player", "NormalAttack", null)[2]);
				ChangeText("CostIndicatorText_GameNormalAttack", ReadCost("Player", "NormalAttack", null)[1]);
				if(Subsystem.Display.ColorBlindMode == true) {
					AddText("CostIndicatorText_GameNormalAttack", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Player", "NormalAttack", null)[2]) + "</span>");
				}
				switch(true) {
					case ReadCost("Player", "NormalAttack", null)[1] < ReadOriginalCost("Player", "NormalAttack", null)[1]:
						AddText("CostIndicatorText_GameNormalAttack", ReadText("Resource_CostDecreasedIcon"));
						break;
					case ReadCost("Player", "NormalAttack", null)[1] > ReadOriginalCost("Player", "NormalAttack", null)[1]:
						AddText("CostIndicatorText_GameNormalAttack", ReadText("Resource_CostIncreasedIcon"));
						break;
					default:
						break;
				}
				if(ReadOriginalCost("Player", "NormalAttack", null)[3] > 0) {
					Show("CostIndicator_GameNormalAttackAdditional");
					ChangeText("CostIndicatorText_GameNormalAttackAdditional", ReadCost("Player", "NormalAttack", null)[3]);
					/* if(Subsystem.Display.ColorBlindMode == true) {
						AddText("CostIndicatorText_GameNormalAttackAdditional", "<span class=\"SmallerText\">任</span>");
					} */
					switch(true) {
						case ReadCost("Player", "NormalAttack", null)[3] < ReadOriginalCost("Player", "NormalAttack", null)[3]:
							AddText("CostIndicatorText_GameNormalAttackAdditional", ReadText("Resource_CostDecreasedIcon"));
							break;
						case ReadCost("Player", "NormalAttack", null)[3] > ReadOriginalCost("Player", "NormalAttack", null)[3]:
							AddText("CostIndicatorText_GameNormalAttackAdditional", ReadText("Resource_CostIncreasedIcon"));
							break;
						default:
							break;
					}
				} else {
					Fade("CostIndicator_GameNormalAttackAdditional");
				}

				// Elemental skill
				Show("Image_GameElementalSkill");
				ChangeImage("Image_GameElementalSkill", Casket.Card[CardNumber].ElementalSkill.Image);
				if(IsSelectedDiceMatchingCost("Player", "ElementalSkill", null) == true) {
					AddClass("Button_GameElementalSkill", "Active");
				} else {
					RemoveClass("Button_GameElementalSkill", "Active");
				}
				ChangeElementColor("CostIndicator_GameElementalSkill", ReadCost("Player", "ElementalSkill", null)[2]);
				ChangeText("CostIndicatorText_GameElementalSkill", ReadCost("Player", "ElementalSkill", null)[1]);
				if(Subsystem.Display.ColorBlindMode == true) {
					AddText("CostIndicatorText_GameElementalSkill", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Player", "ElementalSkill", null)[2]) + "</span>");
				}
				switch(true) {
					case ReadCost("Player", "ElementalSkill", null)[1] < ReadOriginalCost("Player", "ElementalSkill", null)[1]:
						AddText("CostIndicatorText_GameElementalSkill", ReadText("Resource_CostDecreasedIcon"));
						break;
					case ReadCost("Player", "ElementalSkill", null)[1] > ReadOriginalCost("Player", "ElementalSkill", null)[1]:
						AddText("CostIndicatorText_GameElementalSkill", ReadText("Resource_CostIncreasedIcon"));
						break;
					default:
						break;
				}

				// Secondary elemental skill
				if(Casket.Card[CardNumber].CharacterCardProperties.HasSecondaryElementalSkill == true) {
					Show("Ctrl_GameSecondaryElementalSkill");
					ChangeImage("Image_GameSecondaryElementalSkill", Casket.Card[CardNumber].SecondaryElementalSkill.Image);
					if(IsSelectedDiceMatchingCost("Player", "SecondaryElementalSkill", null) == true) {
						AddClass("Button_GameSecondaryElementalSkill", "Active");
					} else {
						RemoveClass("Button_GameSecondaryElementalSkill", "Active");
					}
					ChangeElementColor("CostIndicator_GameSecondaryElementalSkill", ReadCost("Player", "SecondaryElementalSkill", null)[2]);
					ChangeText("CostIndicatorText_GameSecondaryElementalSkill", ReadCost("Player", "SecondaryElementalSkill", null)[1]);
					if(Subsystem.Display.ColorBlindMode == true) {
						AddText("CostIndicatorText_GameSecondaryElementalSkill", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Player", "SecondaryElementalSkill", null)[2]) + "</span>");
					}
					switch(true) {
						case ReadCost("Player", "SecondaryElementalSkill", null)[1] < ReadOriginalCost("Player", "SecondaryElementalSkill", null)[1]:
							AddText("CostIndicatorText_GameSecondaryElementalSkill", ReadText("Resource_CostDecreasedIcon"));
							break;
						case ReadCost("Player", "SecondaryElementalSkill", null)[1] > ReadOriginalCost("Player", "SecondaryElementalSkill", null)[1]:
							AddText("CostIndicatorText_GameSecondaryElementalSkill", ReadText("Resource_CostIncreasedIcon"));
							break;
						default:
							break;
					}
				} else {
					HideToCorner("Ctrl_GameSecondaryElementalSkill");
				}

				// Elemental burst
				Show("Image_GameElementalBurst");
				ChangeImage("Image_GameElementalBurst", Casket.Card[CardNumber].ElementalBurst.Image);
				if(IsSelectedDiceMatchingCost("Player", "ElementalBurst", null) == true) {
					AddClass("Button_GameElementalBurst", "Active");
				} else {
					RemoveClass("Button_GameElementalBurst", "Active");
				}
				ChangeElementColor("CostIndicator_GameElementalBurst", ReadCost("Player", "ElementalBurst", null)[2]);
				ChangeText("CostIndicatorText_GameElementalBurst", ReadCost("Player", "ElementalBurst", null)[1]);
				if(Subsystem.Display.ColorBlindMode == true) {
					AddText("CostIndicatorText_GameElementalBurst", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Player", "ElementalBurst", null)[2]) + "</span>");
				}
				switch(true) {
					case ReadCost("Player", "ElementalBurst", null)[1] < ReadOriginalCost("Player", "ElementalBurst", null)[1]:
						AddText("CostIndicatorText_GameElementalBurst", ReadText("Resource_CostDecreasedIcon"));
						break;
					case ReadCost("Player", "ElementalBurst", null)[1] > ReadOriginalCost("Player", "ElementalBurst", null)[1]:
						AddText("CostIndicatorText_GameElementalBurst", ReadText("Resource_CostIncreasedIcon"));
						break;
					default:
						break;
				}
				ChangeText("CostIndicatorText_GameElementalBurstAdditional", Casket.Card[CardNumber].CharacterCardProperties.MaxEnergy);
			} else {
				// Normal attack
				Fade("Image_GameNormalAttack");
				RemoveClass("Button_GameNormalAttack", "Active");
				ChangeElementColor("CostIndicator_GameNormalAttack", "Unknown");
				ChangeText("CostIndicatorText_GameNormalAttack", "?");
				Show("CostIndicator_GameNormalAttackAdditional");
				ChangeText("CostIndicatorText_GameNormalAttackAdditional", "?");

				// Elemental skill
				Fade("Image_GameElementalSkill");
				RemoveClass("Button_GameElementalSkill", "Active");
				ChangeElementColor("CostIndicator_GameElementalSkill", "Unknown");
				ChangeText("CostIndicatorText_GameElementalSkill", "?");

				// Secondary elemental skill
				HideToCorner("Ctrl_GameSecondaryElementalSkill");

				// Elemental burst
				Fade("Image_GameElementalBurst");
				RemoveClass("Button_GameElementalBurst", "Active");
				ChangeElementColor("CostIndicator_GameElementalBurst", "Unknown");
				ChangeText("CostIndicatorText_GameElementalBurst", "?");
				ChangeText("CostIndicatorText_GameElementalBurstAdditional", "?");
			}
			if(Game.Status.Player.Turn == "InTurn" && Game.Status.Player.ActiveCharacter > 0) {
				ChangeDisabled("Button_GameNormalAttack", false);
				ChangeDisabled("Button_GameElementalSkill", false);
				ChangeDisabled("Button_GameSecondaryElementalSkill", false);
				ChangeDisabled("Button_GameElementalBurst", false);
			} else {
				ChangeDisabled("Button_GameNormalAttack", true);
				ChangeDisabled("Button_GameElementalSkill", true);
				ChangeDisabled("Button_GameSecondaryElementalSkill", true);
				ChangeDisabled("Button_GameElementalBurst", true);
			}
		}
		function RefreshOperationPanel() {
			// Reset InPreview
			RemoveClassByClass("InPreview", "InPreview");

			// Operation panel
			Fade("OperationPanel_GameTitleScreen");
			Fade("OperationPanel_GameStartingHand");
			Fade("GameStartingHandCheckboxes");
			Fade("GameStartingHandIndependentHotkeyIndicators");
			Fade("OperationPanel_GameRollPhase");
			Fade("OperationPanel_GameSwitchCharacter");
			Fade("OperationPanel_GameUseSkill");
			Fade("OperationPanel_GamePlayActionCard");
			Fade("OperationPanel_GamePlayActionCardWithObjectSelection");
			Fade("OperationPanel_GameTuning");
			Fade("OperationPanel_GameOver");
			Fade("ScreenFilter_GameOperationPanel");
			Fade("Ctrl_GameToggleOperationPanelTransparency");
			switch(Game.Status.Operation) {
				case "Title":
					// Show operation panel
					Show("OperationPanel_GameTitleScreen");

					// Refresh operation panel content
					Show("CtrlGroup_GameStart");
					ChangeValue("Textbox_GameYourDeckName", Game.Status.Player.DeckProperties.Name);
					ChangeValue("Textbox_GameOpponentDeckName", Game.Status.Opponent.DeckProperties.Name);
					if(Casket.DeckSelection.Player > 0) {
						ChangeInert("Textbox_GameYourDeckName", false);
					} else {
						ChangeInert("Textbox_GameYourDeckName", true);
					}
					if(Casket.DeckSelection.Opponent > 0) {
						ChangeInert("Textbox_GameOpponentDeckName", false);
					} else {
						ChangeInert("Textbox_GameOpponentDeckName", true);
					}
					Fade("Label_Versus");
					Fade("CtrlGroup_GameLoading");
					ChangeProgbar("ProgbarFg_GameLoading", "Horizontal", 0);

					break;
				case "Loading":
					// Show operation panel
					Show("OperationPanel_GameTitleScreen");

					// Refresh operation panel content
					Fade("CtrlGroup_GameStart");
					ChangeValue("Textbox_GameYourDeckName", Game.Status.Player.DeckProperties.Name);
					ChangeValue("Textbox_GameOpponentDeckName", Game.Status.Opponent.DeckProperties.Name);
					ChangeInert("Textbox_GameYourDeckName", true);
					ChangeInert("Textbox_GameOpponentDeckName", true);
					Show("Label_Versus");
					Show("CtrlGroup_GameLoading");
					if(Subsystem.Display.FlashOnHighDamage == true) {
						Show("Ctrl_GameEpilepsyWarningPrompt");
					} else {
						Hide("Ctrl_GameEpilepsyWarningPrompt");
					}

					break; // Other ctrls in the loading screen are frequently refreshed in function ClockGame.
				case "Table":
					break;
				case "StartingHand":
					// Show operation panel
					Show("OperationPanel_GameStartingHand");
					if(Game.Status.Phase[2] == "Standby") {
						Show("GameStartingHandCheckboxes");
						Show("GameStartingHandIndependentHotkeyIndicators");
					}
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
					if(Game.Status.Phase[2] == "Standby") {
						Show("CtrlGroup_GameStartingHand");
					} else {
						Fade("CtrlGroup_GameStartingHand");
					}
					if(JSON.stringify(Game0.Selection.StartingHand) != "[0,false,false,false,false,false]") {
						ChangeDisabled("Button_GameSwitchStartingHand", false);
					} else {
						ChangeDisabled("Button_GameSwitchStartingHand", true);
					}
					for(let Looper = 1; Looper <= 5; Looper++) {
						ChangeChecked("Checkbox_GameStartingHand" + Looper, Game0.Selection.StartingHand[Looper]);
					}

					// Specify in-preview ctrls
					for(let Looper = 1; Looper <= 30; Looper++) {
						AddClass("Card_GamePlayerAction" + Looper, "InPreview");
					}

					break;
				case "RollPhase":
					// Show operation panel
					Show("OperationPanel_GameRollPhase");
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
						// Ctrls
						if(Game.Status.Phase[2] == "Standby") {
							Show("CtrlGroup_GameRollPhase");
						} else {
							Fade("CtrlGroup_GameRollPhase");
						}

						// Quick select
						let CorrectDiceSelectionExcludingActiveCharacterElement = 0, CorrectDiceSelectionExcludingAllCharacterElements = 0;
						for(let Looper = 1; Looper <= 8; Looper++) {
							if(Game.Status.Player.Dice[Looper].Type == "Omni") {
								if(Game0.Selection.Dice[Looper] == false) {
									CorrectDiceSelectionExcludingActiveCharacterElement++;
									CorrectDiceSelectionExcludingAllCharacterElements++;
								}
							} else {
								if(Game.Status.Player.ActiveCharacter > 0) {
									if(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Game.Status.Player.ActiveCharacter].ID)].CharacterCardProperties.ElementType) {
										// Useful dice should not be selected
										if(Game0.Selection.Dice[Looper] == false) {
											CorrectDiceSelectionExcludingActiveCharacterElement++;
										}
									} else {
										// Useless dice should be selected
										if(Game0.Selection.Dice[Looper] == true) {
											CorrectDiceSelectionExcludingActiveCharacterElement++;
										}
									}
								} else {
									AlertSystemError("The player has no active character at roll phase, in function RefreshOperationPanel.");
								}
								if(
									(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[1].ID)].CharacterCardProperties.ElementType &&
									Game.Status.Player.CharacterCard[1].HP > 0) ||
									(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[2].ID)].CharacterCardProperties.ElementType &&
									Game.Status.Player.CharacterCard[2].HP > 0) ||
									(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[3].ID)].CharacterCardProperties.ElementType &&
									Game.Status.Player.CharacterCard[3].HP > 0)
								) {
									// Useful dice should not be selected
									if(Game0.Selection.Dice[Looper] == false) {
										CorrectDiceSelectionExcludingAllCharacterElements++;
									}
								} else {
									// Useless dice should be selected
									if(Game0.Selection.Dice[Looper] == true) {
										CorrectDiceSelectionExcludingAllCharacterElements++;
									}
								}
							}
						}
						if(CorrectDiceSelectionExcludingActiveCharacterElement == 8) {
							ChangeChecked("Checkbox_GameExcludeActiveCharacterElement", true);
						} else {
							ChangeChecked("Checkbox_GameExcludeActiveCharacterElement", false);
						}
						if(CorrectDiceSelectionExcludingAllCharacterElements == 8) {
							ChangeChecked("Checkbox_GameExcludeAllCharactersElements", true);
						} else {
							ChangeChecked("Checkbox_GameExcludeAllCharactersElements", false);
						}

						// Reroll
						if(JSON.stringify(Game0.Selection.Dice) != "[0,false,false,false,false,false,false,false,false,false,false,false,false]") {
							ChangeDisabled("Button_GameReroll", false);
						} else {
							ChangeDisabled("Button_GameReroll", true);
						}

					break;
				case "SwitchCharacter":
					// Show operation panel
					Show("OperationPanel_GameSwitchCharacter");
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
					ChangeElementColor("CostIndicator_GameSwitchCharacter", ReadCost("Player", "CharacterCard", null)[2]);
					ChangeText("CostIndicatorText_GameSwitchCharacter", ReadCost("Player", "CharacterCard", null)[1]);
					if(Subsystem.Display.ColorBlindMode == true) {
						AddText("CostIndicatorText_GameSwitchCharacter", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(ReadCost("Player", "CharacterCard", null)[2]) + "</span>");
					}
					switch(true) {
						case ReadCost("Player", "CharacterCard", null)[1] < ReadOriginalCost("Player", "CharacterCard", null)[1]:
							AddText("CostIndicatorText_GameSwitchCharacter", ReadText("Resource_CostDecreasedIcon"));
							break;
						case ReadCost("Player", "CharacterCard", null)[1] > ReadOriginalCost("Player", "CharacterCard", null)[1]:
							AddText("CostIndicatorText_GameSwitchCharacter", ReadText("Resource_CostIncreasedIcon"));
							break;
						default:
							break;
					}
					ChangeText("Label_GameSwitchCharacterTarget", ReadCardNameByID(Game.Status.Player.CharacterCard[Game0.Selection.Action.Number].ID));
					if(IsSelectedDiceMatchingCost("Player", "CharacterCard", null) == true) {
						ChangeDisabled("Button_GameSwitchCharacter", false);
					} else {
						ChangeDisabled("Button_GameSwitchCharacter", true);
					}

					// Specify in-preview ctrls
					if(Game.Status.Player.ActiveCharacter > 0) {
						AddClass("Card_GamePlayerCharacter" + Game.Status.Player.ActiveCharacter, "InPreview");
					} else {
						AlertSystemError("The player has no active character when preparing to switch character.");
					}
					if(Game0.Selection.Action.Type == "CharacterCard") {
						AddClass("Card_GamePlayerCharacter" + Game0.Selection.Action.Number, "InPreview");
					} else {
						AlertSystemError("The player's action selection is not \"CharacterCard\" when preparing to switch character.");
					}
					for(let Looper = 1; Looper <= 12; Looper++) {
						AddClass("Dice_GamePlayer" + Looper, "InPreview");
					}

					break;
				case "UseSkill":
					// Show operation panel
					Show("OperationPanel_GameUseSkill");
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
					// ???

					break;
				case "PlayActionCard":
					// Show operation panel
					Show("OperationPanel_GamePlayActionCard");
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
					// ???

					break;
				case "PlayActionCardWithObjectSelection":
					// Show operation panel
					Show("OperationPanel_GamePlayActionCardWithObjectSelection");
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
					// ???

					break;
				case "Tuning":
					// Show operation panel
					Show("OperationPanel_GameTuning");
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
					// ???

					break;
				case "GameOver":
					// Show operation panel
					Show("OperationPanel_GameOver");
					Show("ScreenFilter_GameOperationPanel");
					Show("Ctrl_GameToggleOperationPanelTransparency");

					// Refresh operation panel content
					// ???

					break;
				default:
					AlertSystemError("The value of Game.Status.Operation \"" + Game.Status.Operation + "\" in function RefreshGame is invalid.");
					break;
			}
		}
		function RefreshGameCtrl() {
			if(Game0.Options.TransparentOperationPanel == true) {
				AddClass("Button_GameToggleOperationPanelTransparency", "Active");
				AddClass("ScreenFilter_GameOperationPanel", "Transparent");
				AddClassByClass("OperationPanel", "Transparent");
				AddClassByClass("OperationPanelAttribute", "Transparent");
				AddClassByClass("InStartingHand", "Transparent");
				AddClassByClass("OnRolling", "Transparent");
			} else {
				RemoveClass("Button_GameToggleOperationPanelTransparency", "Active");
				RemoveClass("ScreenFilter_GameOperationPanel", "Transparent");
				RemoveClassByClass("OperationPanel", "Transparent");
				RemoveClassByClass("OperationPanelAttribute", "Transparent");
				RemoveClassByClass("InStartingHand", "Transparent");
				RemoveClassByClass("OnRolling", "Transparent");
			}
			if(Game.Status.Operation == "Title" || Game.Status.Operation == "Loading") {
				ChangeDisabled("Button_GameRestart", true);
			} else {
				ChangeDisabled("Button_GameRestart", false);
			}
			if(Game.Status.Operation == "Title") {
				ChangeDisabled("Button_GameExit", true);
				ChangeDisabled("Fieldset_CasketDecks", false);
				ChangeDisabled("Fieldset_CasketCharacterCards", false);
				ChangeDisabled("Fieldset_CasketActionCards", false);
				ChangeDisabled("Fieldset_CasketDeckProperties", false);
				ChangeDisabled("Fieldset_CasketManagement", false);
				ChangeDisabled("Fieldset_EditorChooseACardToEdit", false);
			} else {
				ChangeDisabled("Button_GameExit", false);
				ChangeDisabled("Fieldset_CasketDecks", true);
				ChangeDisabled("Fieldset_CasketCharacterCards", true);
				ChangeDisabled("Fieldset_CasketActionCards", true);
				ChangeDisabled("Fieldset_CasketDeckProperties", true);
				ChangeDisabled("Fieldset_CasketManagement", true);
				ChangeDisabled("Fieldset_EditorChooseACardToEdit", true);
				CloseCard();
			}
		}
		function RefreshAction() {
			// ???
		}

	function RefreshInfoWindowObjectProperties(CardNumberOrBuiltinStatus, ScrollToWhereOrBuiltinStatusName) {
		Hide("Ctrl_GameInfoWindowCharacterCard");
		Hide("Ctrl_GameInfoWindowNormalAttack");
		Hide("Ctrl_GameInfoWindowElementalSkill");
		Hide("Ctrl_GameInfoWindowSecondaryElementalSkill");
		Hide("Ctrl_GameInfoWindowElementalBurst");
		Hide("Ctrl_GameInfoWindowIntroSkill");
		Hide("Ctrl_GameInfoWindowOutroSkill");
		Hide("Ctrl_GameInfoWindowPassiveSkill");
		Hide("Ctrl_GameInfoWindowAffiliatedCard");
		Hide("Ctrl_GameInfoWindowSummonsCard");
		Hide("Ctrl_GameInfoWindowTalentCard");
		Hide("Ctrl_GameInfoWindowWeaponCard");
		Hide("Ctrl_GameInfoWindowArtifactCard");
		Hide("Ctrl_GameInfoWindowSupportCard");
		Hide("Ctrl_GameInfoWindowEventCard");
		Hide("Ctrl_GameInfoWindowStatus1");
		Hide("Ctrl_GameInfoWindowStatus2");
		Hide("Ctrl_GameInfoWindowStatus3");
		Hide("Ctrl_GameInfoWindowCharacterProfile");
		Hide("Ctrl_GameInfoWindowCredits");
		Hide("Ctrl_GameInfoWindowTechInfo");
		Hide("Ctrl_GameInfoWindowBuiltinStatus");
		switch(true) {
			case CardNumberOrBuiltinStatus > 0:
				// Exclusive properties
				switch(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type) {
					case "CharacterCard":
						// Character Card
						Show("Ctrl_GameInfoWindowCharacterCard");
						ChangeImage("Image_GameInfoWindowCharacterCard", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowCharacterCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Name));
						Show("CtrlGroup_GameInfoWindowCharacterCardTags");
						ChangeText("Label_GameInfoWindowCharacterCardMaxHP", Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.MaxHP);
						ChangeText("Label_GameInfoWindowCharacterCardMaxEnergy", Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.MaxEnergy);
						ChangeText("Label_GameInfoWindowCharacterCardElementType", ConvertElementTypeToIcon(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType));
						ChangeText("Label_GameInfoWindowCharacterCardWeaponType", Translate(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.WeaponType));
						ChangeText("Label_GameInfoWindowCharacterCardCombatOrientation", Translate(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.CombatOrientation));
						ChangeText("Label_GameInfoWindowCharacterCardDescription", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Description);

						// Normal Attack
						Show("Ctrl_GameInfoWindowNormalAttack");
						ChangeImage("Image_GameInfoWindowNormalAttack", "images/NormalAttack_" + Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.WeaponType + ".png");
						ChangeText("InfoWindowSubtitle_GameInfoWindowNormalAttack", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].NormalAttack.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowNormalAttack", Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType);
						ChangeText("CostIndicatorText_GameInfoWindowNormalAttack", Casket.Card[CardNumberOrBuiltinStatus].NormalAttack.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowNormalAttack", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType) + "</span>");
						}
						if(Casket.Card[CardNumberOrBuiltinStatus].NormalAttack.Cost[2] > 0) {
							Show("CostIndicator_GameInfoWindowNormalAttackAdditional");
							ChangeText("CostIndicatorText_GameInfoWindowNormalAttackAdditional", Casket.Card[CardNumberOrBuiltinStatus].NormalAttack.Cost[2]);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GameInfoWindowNormalAttackAdditional", "<span class=\"SmallerText\">任</span>");
							}
						} else {
							HideHorizontally("CostIndicator_GameInfoWindowNormalAttackAdditional");
						}
						ChangeText("Label_GameInfoWindowNormalAttackDescription", Casket.Card[CardNumberOrBuiltinStatus].NormalAttack.Description);

						// Elemental Skill
						Show("Ctrl_GameInfoWindowElementalSkill");
						ChangeImage("Image_GameInfoWindowElementalSkill", Casket.Card[CardNumberOrBuiltinStatus].ElementalSkill.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowElementalSkill", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].ElementalSkill.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowElementalSkill", Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType);
						ChangeText("CostIndicatorText_GameInfoWindowElementalSkill", Casket.Card[CardNumberOrBuiltinStatus].ElementalSkill.Cost);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowElementalSkill", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType) + "</span>");
						}
						ChangeText("Label_GameInfoWindowElementalSkillDescription", Casket.Card[CardNumberOrBuiltinStatus].ElementalSkill.Description);

						// Secondary Elemental Skill
						if(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.HasSecondaryElementalSkill == true) {
							Show("Ctrl_GameInfoWindowSecondaryElementalSkill");
							ChangeImage("Image_GameInfoWindowSecondaryElementalSkill", Casket.Card[CardNumberOrBuiltinStatus].SecondaryElementalSkill.Image);
							ChangeText("InfoWindowSubtitle_GameInfoWindowSecondaryElementalSkill", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].SecondaryElementalSkill.Name));
							ChangeElementColor("CostIndicator_GameInfoWindowSecondaryElementalSkill", Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType);
							ChangeText("CostIndicatorText_GameInfoWindowSecondaryElementalSkill", Casket.Card[CardNumberOrBuiltinStatus].SecondaryElementalSkill.Cost);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GameInfoWindowSecondaryElementalSkill", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType) + "</span>");
							}
							ChangeText("Label_GameInfoWindowSecondaryElementalSkillDescription", Casket.Card[CardNumberOrBuiltinStatus].SecondaryElementalSkill.Description);
						}

						// Elemental Burst
						Show("Ctrl_GameInfoWindowElementalBurst");
						ChangeImage("Image_GameInfoWindowElementalBurst", Casket.Card[CardNumberOrBuiltinStatus].ElementalBurst.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowElementalBurst", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].ElementalBurst.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowElementalBurst", Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType);
						ChangeText("CostIndicatorText_GameInfoWindowElementalBurst", Casket.Card[CardNumberOrBuiltinStatus].ElementalBurst.Cost);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowElementalBurst", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.ElementType) + "</span>");
						}
						ChangeText("Label_GameInfoWindowElementalBurstDescription", Casket.Card[CardNumberOrBuiltinStatus].ElementalBurst.Description);

						// Intro Skill
						if(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.HasIntroSkill == true) {
							Show("Ctrl_GameInfoWindowIntroSkill");
							ChangeImage("Image_GameInfoWindowIntroSkill", Casket.Card[CardNumberOrBuiltinStatus].IntroSkill.Image);
							ChangeText("InfoWindowSubtitle_GameInfoWindowIntroSkill", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].IntroSkill.Name));
							ChangeText("Label_GameInfoWindowIntroSkillDescription", Casket.Card[CardNumberOrBuiltinStatus].IntroSkill.Description);
						}

						// Outro Skill
						if(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.HasOutroSkill == true) {
							Show("Ctrl_GameInfoWindowOutroSkill");
							ChangeImage("Image_GameInfoWindowOutroSkill", Casket.Card[CardNumberOrBuiltinStatus].OutroSkill.Image);
							ChangeText("InfoWindowSubtitle_GameInfoWindowOutroSkill", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].OutroSkill.Name));
							ChangeText("Label_GameInfoWindowOutroSkillDescription", Casket.Card[CardNumberOrBuiltinStatus].OutroSkill.Description);
						}

						// Passive Skill
						if(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.HasPassiveSkill == true) {
							Show("Ctrl_GameInfoWindowPassiveSkill");
							ChangeImage("Image_GameInfoWindowPassiveSkill", Casket.Card[CardNumberOrBuiltinStatus].PassiveSkill.Image);
							ChangeText("InfoWindowSubtitle_GameInfoWindowPassiveSkill", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].PassiveSkill.Name));
							ChangeText("Label_GameInfoWindowPassiveSkillDescription", Casket.Card[CardNumberOrBuiltinStatus].PassiveSkill.Description);
						}

						// Affiliated Card
						if(Casket.Card[CardNumberOrBuiltinStatus].CharacterCardProperties.HasAffiliatedCard == true) {
							Show("Ctrl_GameInfoWindowAffiliatedCard");
							ChangeImage("Image_GameInfoWindowAffiliatedCard", Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Image);
							ChangeText("InfoWindowSubtitle_GameInfoWindowAffiliatedCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Name));
							ChangeText("Label_GameInfoWindowAffiliatedCardType", Translate(Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Type));
							switch(Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Type) {
								case "SummonsCard":
									HideHorizontally("CostIndicator_GameInfoWindowAffiliatedCard");
									Show("Ctrl_GameInfoWindowAffiliatedCardDuration");
									ChangeText("Label_GameInfoWindowAffiliatedCardDuration", Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Duration.Quantity + Translate(Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Duration.Type));
									break;
								case "EventCard":
									Show("CostIndicator_GameInfoWindowAffiliatedCard");
									ChangeElementColor("CostIndicator_GameInfoWindowAffiliatedCard", Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Cost[2]);
									ChangeText("CostIndicatorText_GameInfoWindowAffiliatedCard", Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Cost[1]);
									if(Subsystem.Display.ColorBlindMode == true) {
										AddText("CostIndicatorText_GameInfoWindowAffiliatedCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Cost[2]) + "</span>");
									}
									HideHorizontally("Ctrl_GameInfoWindowAffiliatedCardDuration");
									break;
								default:
									AlertSystemError("The value of Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Type \"" + Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Type + "\" in function RefreshInfoWindowObjectProperties is invalid.");
									break;
							}
							ChangeText("Label_GameInfoWindowAffiliatedCardDescription", Casket.Card[CardNumberOrBuiltinStatus].AffiliatedCard.Description);
						}

						// Character Profile
						Show("Ctrl_GameInfoWindowCharacterProfile");
						ChangeText("Label_GameInfoWindowCharacterProfileFrom", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].CharacterProfile.From));
						ChangeLanguage("Label_GameInfoWindowCharacterProfileVA", Casket.Card[CardNumberOrBuiltinStatus].CharacterProfile.Language);
						ChangeText("Label_GameInfoWindowCharacterProfileVA", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].CharacterProfile.VA));
						ChangeText("Label_GameInfoWindowCharacterProfileGender", Translate(Casket.Card[CardNumberOrBuiltinStatus].CharacterProfile.Gender));
						ChangeText("Label_GameInfoWindowCharacterProfileBirthday", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].CharacterProfile.Birthday));

						break;
					case "SummonsCard":
						Show("Ctrl_GameInfoWindowSummonsCard");
						ChangeImage("Image_GameInfoWindowSummonsCard", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowSummonsCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Name));
						ChangeText("Label_GameInfoWindowSummonsCardDuration", Casket.Card[CardNumberOrBuiltinStatus].SummonsCardProperties.Duration.Quantity + Translate(Casket.Card[CardNumberOrBuiltinStatus].SummonsCardProperties.Duration.Type));
						ChangeText("Label_GameInfoWindowSummonsCardDescription", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Description);
						break;
					case "TalentCard":
						Show("Ctrl_GameInfoWindowTalentCard");
						ChangeImage("Image_GameInfoWindowTalentCard", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowTalentCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowTalentCard", Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowTalentCard", Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowTalentCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.Cost[2]) + "</span>");
						}
						if(Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.Cost[3] > 0) {
							Show("CostIndicator_GameInfoWindowTalentCardAdditional");
							ChangeText("CostIndicatorText_GameInfoWindowTalentCardAdditional", Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.Cost[3]);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GameInfoWindowTalentCardAdditional", "<span class=\"SmallerText\">任</span>");
							}
						} else {
							HideHorizontally("CostIndicator_GameInfoWindowTalentCardAdditional");
						}
						if(ReadCardNameByID(Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.OrientedCharacterCardID) != null) {
							ChangeText("Label_GameInfoWindowTalentCardOrientedCharacterCardName", ReadCardNameByID(Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.OrientedCharacterCardID));
						} else {
							ChangeText("Label_GameInfoWindowTalentCardOrientedCharacterCardName", "(找不到对应角色)");
						}
						ChangeText("Label_GameInfoWindowTalentCardSkillType", Translate(Casket.Card[CardNumberOrBuiltinStatus].TalentCardProperties.SkillType));
						ChangeText("Label_GameInfoWindowTalentCardDescription", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Description);
						break;
					case "WeaponCard":
						Show("Ctrl_GameInfoWindowWeaponCard");
						ChangeImage("Image_GameInfoWindowWeaponCard", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowWeaponCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowWeaponCard", Casket.Card[CardNumberOrBuiltinStatus].WeaponCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowWeaponCard", Casket.Card[CardNumberOrBuiltinStatus].WeaponCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowWeaponCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].WeaponCardProperties.Cost[2]) + "</span>");
						}
						ChangeText("Label_GameInfoWindowWeaponCardWeaponType", Translate(Casket.Card[CardNumberOrBuiltinStatus].WeaponCardProperties.WeaponType));
						ChangeText("Label_GameInfoWindowWeaponCardDescription", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Description);
						break;
					case "ArtifactCard":
						Show("Ctrl_GameInfoWindowArtifactCard");
						ChangeImage("Image_GameInfoWindowArtifactCard", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowArtifactCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowArtifactCard", Casket.Card[CardNumberOrBuiltinStatus].ArtifactCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowArtifactCard", Casket.Card[CardNumberOrBuiltinStatus].ArtifactCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowArtifactCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].ArtifactCardProperties.Cost[2]) + "</span>");
						}
						ChangeText("Label_GameInfoWindowArtifactCardDescription", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Description);
						break;
					case "SupportCard":
						Show("Ctrl_GameInfoWindowSupportCard");
						ChangeImage("Image_GameInfoWindowSupportCard", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowSupportCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowSupportCard", Casket.Card[CardNumberOrBuiltinStatus].SupportCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowSupportCard", Casket.Card[CardNumberOrBuiltinStatus].SupportCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowSupportCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].SupportCardProperties.Cost[2]) + "</span>");
						}
						ChangeText("Label_GameInfoWindowSupportCardDuration", Casket.Card[CardNumberOrBuiltinStatus].SupportCardProperties.Duration.Quantity + Translate(Casket.Card[CardNumberOrBuiltinStatus].SupportCardProperties.Duration.Type));
						ChangeText("Label_GameInfoWindowSupportCardDescription", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Description);
						break;
					case "EventCard":
						Show("Ctrl_GameInfoWindowEventCard");
						ChangeImage("Image_GameInfoWindowEventCard", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowEventCard", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowEventCard", Casket.Card[CardNumberOrBuiltinStatus].EventCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowEventCard", Casket.Card[CardNumberOrBuiltinStatus].EventCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowEventCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumberOrBuiltinStatus].EventCardProperties.Cost[2]) + "</span>");
						}
						ChangeText("Label_GameInfoWindowEventCardDescription", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Description);
						break;
					default:
						AlertSystemError("The value of Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type \"" + Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type + "\" in function RefreshInfoWindowObjectProperties is invalid.");
						break;
				}

				// Status
				if(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.StatusQuantity >= 1) {
					Show("Ctrl_GameInfoWindowStatus1");
					ChangeImage("Image_GameInfoWindowStatus1", Casket.Card[CardNumberOrBuiltinStatus].Status[1].Image);
					ChangeText("InfoWindowSubtitle_GameInfoWindowStatus1", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].Status[1].Name));
					ChangeText("Label_GameInfoWindowStatus1Type", Translate(Casket.Card[CardNumberOrBuiltinStatus].Status[1].Type));
					ChangeText("Label_GameInfoWindowStatus1Duration", Casket.Card[CardNumberOrBuiltinStatus].Status[1].Duration.Quantity + Translate(Casket.Card[CardNumberOrBuiltinStatus].Status[1].Duration.Type));
					ChangeText("Label_GameInfoWindowStatus1Description", Casket.Card[CardNumberOrBuiltinStatus].Status[1].Description);
				}
				if(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.StatusQuantity >= 2) {
					Show("Ctrl_GameInfoWindowStatus2");
					ChangeImage("Image_GameInfoWindowStatus2", Casket.Card[CardNumberOrBuiltinStatus].Status[2].Image);
					ChangeText("InfoWindowSubtitle_GameInfoWindowStatus2", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].Status[2].Name));
					ChangeText("Label_GameInfoWindowStatus2Type", Translate(Casket.Card[CardNumberOrBuiltinStatus].Status[2].Type));
					ChangeText("Label_GameInfoWindowStatus2Duration", Casket.Card[CardNumberOrBuiltinStatus].Status[2].Duration.Quantity + Translate(Casket.Card[CardNumberOrBuiltinStatus].Status[2].Duration.Type));
					ChangeText("Label_GameInfoWindowStatus2Description", Casket.Card[CardNumberOrBuiltinStatus].Status[2].Description);
				}
				if(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.StatusQuantity >= 3) {
					Show("Ctrl_GameInfoWindowStatus3");
					ChangeImage("Image_GameInfoWindowStatus3", Casket.Card[CardNumberOrBuiltinStatus].Status[3].Image);
					ChangeText("InfoWindowSubtitle_GameInfoWindowStatus3", ConvertEmptyName(Casket.Card[CardNumberOrBuiltinStatus].Status[3].Name));
					ChangeText("Label_GameInfoWindowStatus3Type", Translate(Casket.Card[CardNumberOrBuiltinStatus].Status[3].Type));
					ChangeText("Label_GameInfoWindowStatus3Duration", Casket.Card[CardNumberOrBuiltinStatus].Status[3].Duration.Quantity + Translate(Casket.Card[CardNumberOrBuiltinStatus].Status[3].Duration.Type));
					ChangeText("Label_GameInfoWindowStatus3Description", Casket.Card[CardNumberOrBuiltinStatus].Status[3].Description);
				}

				// Credits
				Show("Ctrl_GameInfoWindowCredits");
				ChangeText("Label_GameInfoWindowCreditsAuthor", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].Credits.Author));
				ChangeText("Label_GameInfoWindowCreditsContact", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].Credits.Contact));
				ChangeText("Label_GameInfoWindowCreditsCardSource", Translate(Casket.Card[CardNumberOrBuiltinStatus].Credits.CardSource));
				ChangeText("Label_GameInfoWindowCreditsImageSource", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].Credits.ImageSource));
				if(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type == "CharacterCard") {
					Show("Paragraph_GameInfoWindowCreditsVoiceoverSource");
					ChangeText("Label_GameInfoWindowCreditsVoiceoverSource", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].Credits.VoiceoverSource));
				} else {
					Hide("Paragraph_GameInfoWindowCreditsVoiceoverSource");
				}

				// Tech Info
				Show("Ctrl_GameInfoWindowTechInfo");
				ChangeText("Label_GameInfoWindowTechInfoID", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.ID);
				ChangeText("Label_GameInfoWindowTechInfoKeywords", ConvertEmptyData(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Keywords));
				ChangeText("Label_GameInfoWindowTechInfoVersion", Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Version.toFixed(2));

				// Scroll and expand
				ShowInfoWindow();
				switch(ScrollToWhereOrBuiltinStatusName) {
					case "BasicProperties":
						switch(Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type) {
							case "CharacterCard":
							case "SummonsCard":
							case "TalentCard":
							case "WeaponCard":
							case "ArtifactCard":
							case "SupportCard":
							case "EventCard":
								ScrollIntoView("Ctrl_GameInfoWindow" + Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type);
								Show("CtrlGroup_GameInfoWindow" + Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type);
								break;
							default:
								AlertSystemError("The value of Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type \"" + Casket.Card[CardNumberOrBuiltinStatus].BasicProperties.Type + "\" in function RefreshInfoWindowObjectProperties is invalid.");
								break;
						}
						break;
					case "NormalAttack":
					case "ElementalSkill":
					case "SecondaryElementalSkill":
					case "ElementalBurst":
					case "AffiliatedCard":
					case "Status1":
					case "Status2":
					case "Status3":
						ScrollIntoView("Ctrl_GameInfoWindow" + ScrollToWhereOrBuiltinStatusName);
						Show("CtrlGroup_GameInfoWindow" + ScrollToWhereOrBuiltinStatusName);
						break;
					default:
						AlertSystemError("The value of ScrollToWhereOrBuiltinStatusName \"" + ScrollToWhereOrBuiltinStatusName + "\" in function RefreshInfoWindowObjectProperties is invalid.");
						break;
				}

				break;
			case CardNumberOrBuiltinStatus == 0:
				// Character Card
				Show("Ctrl_GameInfoWindowCharacterCard");
				ChangeImage("Image_GameInfoWindowCharacterCard", Casket0.BuiltinCard.UnknownCard.BasicProperties.Image);
				ChangeText("InfoWindowSubtitle_GameInfoWindowCharacterCard", ConvertEmptyName(Casket0.BuiltinCard.UnknownCard.BasicProperties.Name));
				Hide("CtrlGroup_GameInfoWindowCharacterCardTags");
				ChangeText("Label_GameInfoWindowCharacterCardDescription", Casket0.BuiltinCard.UnknownCard.BasicProperties.Description);

				// Tech Info
				Show("Ctrl_GameInfoWindowTechInfo");
				ChangeText("Label_GameInfoWindowTechInfoID", Casket0.BuiltinCard.UnknownCard.BasicProperties.ID);
				ChangeText("Label_GameInfoWindowTechInfoKeywords", ConvertEmptyData(Casket0.BuiltinCard.UnknownCard.BasicProperties.Keywords));
				ChangeText("Label_GameInfoWindowTechInfoVersion", Casket0.BuiltinCard.UnknownCard.BasicProperties.Version.toFixed(2));

				// Scroll and expand
				ScrollIntoView("Ctrl_GameInfoWindowCharacterCard");
				Show("CtrlGroup_GameInfoWindowCharacterCard");

				break;
			case CardNumberOrBuiltinStatus == "BuiltinStatus":
				// Built-in Status
				Show("Ctrl_GameInfoWindowBuiltinStatus");
				ChangeImage("Image_GameInfoWindowBuiltinStatus", Casket0.BuiltinStatus[ScrollToWhereOrBuiltinStatusName].Image);
				ChangeText("InfoWindowSubtitle_GameInfoWindowBuiltinStatus", Casket0.BuiltinStatus[ScrollToWhereOrBuiltinStatusName].Name);
				ChangeText("Label_GameInfoWindowBuiltinStatusType", Translate(Casket0.BuiltinStatus[ScrollToWhereOrBuiltinStatusName].Type));
				ChangeText("Label_GameInfoWindowBuiltinStatusDuration", Casket0.BuiltinStatus[ScrollToWhereOrBuiltinStatusName].Duration.Quantity + Translate(Casket0.BuiltinStatus[ScrollToWhereOrBuiltinStatusName].Duration.Type));
				ChangeText("Label_GameInfoWindowBuiltinStatusDescription", Casket0.BuiltinStatus[ScrollToWhereOrBuiltinStatusName].Description);

				// Scroll and expand
				ScrollIntoView("Ctrl_GameInfoWindowBuiltinStatus");
				Show("CtrlGroup_GameInfoWindowBuiltinStatus");

				break;
			default:
				AlertSystemError("The value of CardNumberOrBuiltinStatus \"" + CardNumberOrBuiltinStatus + "\" in function RefreshInfoWindowObjectProperties is invalid.");
				break;
		}
	}
	function RefreshInfoWindowInGameCharacterProperties(PlayerOrOpponentOrHide, Number) {
		switch(PlayerOrOpponentOrHide) {
			case "Player":
			case "Opponent":
				// Show the section
				Show("CtrlGroup_GameInfoWindowInGameCharacterProperties");

				// Character equipment and status
				if(Number > 0) {
					if(ReadCardNumberByID(ReadTalentCardID(PlayerOrOpponentOrHide, Number)) > 0) {
						Show("Ctrl_GameInfoWindowEquippedTalentCard");
						let CardNumber = ReadCardNumberByID(ReadTalentCardID(PlayerOrOpponentOrHide, Number));
						ChangeImage("Image_GameInfoWindowEquippedTalentCard", Casket.Card[CardNumber].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowEquippedTalentCard", ConvertEmptyName(Casket.Card[CardNumber].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowEquippedTalentCard", Casket.Card[CardNumber].TalentCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowEquippedTalentCard", Casket.Card[CardNumber].TalentCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowEquippedTalentCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumber].TalentCardProperties.Cost[2]) + "</span>");
						}
						if(Casket.Card[CardNumber].TalentCardProperties.Cost[3] > 0) {
							Show("CostIndicator_GameInfoWindowEquippedTalentCardAdditional");
							ChangeText("CostIndicatorText_GameInfoWindowEquippedTalentCardAdditional", Casket.Card[CardNumber].TalentCardProperties.Cost[3]);
							if(Subsystem.Display.ColorBlindMode == true) {
								AddText("CostIndicatorText_GameInfoWindowEquippedTalentCardAdditional", "<span class=\"SmallerText\">任</span>");
							}
						} else {
							HideHorizontally("CostIndicator_GameInfoWindowEquippedTalentCardAdditional");
						}
						if(ReadCardNameByID(Casket.Card[CardNumber].TalentCardProperties.OrientedCharacterCardID) != null) {
							ChangeText("Label_GameInfoWindowEquippedTalentCardOrientedCharacterCardName", ReadCardNameByID(Casket.Card[CardNumber].TalentCardProperties.OrientedCharacterCardID));
						} else {
							ChangeText("Label_GameInfoWindowEquippedTalentCardOrientedCharacterCardName", "(找不到对应角色)");
						}
						ChangeText("Label_GameInfoWindowEquippedTalentCardSkillType", Translate(Casket.Card[CardNumber].TalentCardProperties.SkillType));
						ChangeText("Label_GameInfoWindowEquippedTalentCardDescription", Casket.Card[CardNumber].BasicProperties.Description);
					} else {
						Hide("Ctrl_GameInfoWindowEquippedTalentCard");
					}
					if(ReadCardNumberByID(ReadWeaponCardID(PlayerOrOpponentOrHide, Number)) > 0) {
						Show("Ctrl_GameInfoWindowEquippedWeaponCard");
						let CardNumber = ReadCardNumberByID(ReadWeaponCardID(PlayerOrOpponentOrHide, Number));
						ChangeImage("Image_GameInfoWindowEquippedWeaponCard", Casket.Card[CardNumber].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowEquippedWeaponCard", ConvertEmptyName(Casket.Card[CardNumber].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowEquippedWeaponCard", Casket.Card[CardNumber].WeaponCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowEquippedWeaponCard", Casket.Card[CardNumber].WeaponCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowEquippedWeaponCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumber].WeaponCardProperties.Cost[2]) + "</span>");
						}
						ChangeText("Label_GameInfoWindowEquippedWeaponCardWeaponType", Translate(Casket.Card[CardNumber].WeaponCardProperties.WeaponType));
						ChangeText("Label_GameInfoWindowEquippedWeaponCardDescription", Casket.Card[CardNumber].BasicProperties.Description);
					} else {
						Hide("Ctrl_GameInfoWindowEquippedWeaponCard");
					}
					if(ReadCardNumberByID(ReadArtifactCardID(PlayerOrOpponentOrHide, Number)) > 0) {
						Show("Ctrl_GameInfoWindowEquippedArtifactCard");
						let CardNumber = ReadCardNumberByID(ReadArtifactCardID(PlayerOrOpponentOrHide, Number));
						ChangeImage("Image_GameInfoWindowEquippedArtifactCard", Casket.Card[CardNumber].BasicProperties.Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowEquippedArtifactCard", ConvertEmptyName(Casket.Card[CardNumber].BasicProperties.Name));
						ChangeElementColor("CostIndicator_GameInfoWindowEquippedArtifactCard", Casket.Card[CardNumber].ArtifactCardProperties.Cost[2]);
						ChangeText("CostIndicatorText_GameInfoWindowEquippedArtifactCard", Casket.Card[CardNumber].ArtifactCardProperties.Cost[1]);
						if(Subsystem.Display.ColorBlindMode == true) {
							AddText("CostIndicatorText_GameInfoWindowEquippedArtifactCard", "<span class=\"SmallerText\">" + ConvertElementTypeToAbbr(Casket.Card[CardNumber].ArtifactCardProperties.Cost[2]) + "</span>");
						}
						ChangeText("Label_GameInfoWindowEquippedArtifactCardDescription", Casket.Card[CardNumber].BasicProperties.Description);
					} else {
						Hide("Ctrl_GameInfoWindowEquippedArtifactCard");
					}
					let BringForward = 0;
					for(let Looper = 1; Looper <= 4; Looper++) {
						if(ReadCardNumberByID(Game.Status[PlayerOrOpponentOrHide].CharacterCard[Number].Status[Looper].CardID) > 0) {
							Show("Ctrl_GameInfoWindowCharacterStatus" + (Looper - BringForward));
							let CardNumber = ReadCardNumberByID(Game.Status[PlayerOrOpponentOrHide].CharacterCard[Number].Status[Looper].CardID),
							StatusNumber = Game.Status[PlayerOrOpponentOrHide].CharacterCard[Number].Status[Looper].StatusNumber;
							ChangeImage("Image_GameInfoWindowCharacterStatus" + (Looper - BringForward), Casket.Card[CardNumber].Status[StatusNumber].Image);
							ChangeText("InfoWindowSubtitle_GameInfoWindowCharacterStatus" + (Looper - BringForward), ConvertEmptyName(Casket.Card[CardNumber].Status[StatusNumber].Name));
							ChangeText("Label_GameInfoWindowCharacterStatus" + (Looper - BringForward) + "Type", Translate(Casket.Card[CardNumber].Status[StatusNumber].Type));
							ChangeText("Label_GameInfoWindowCharacterStatus" + (Looper - BringForward) + "Duration", Casket.Card[CardNumber].Status[StatusNumber].Duration.Quantity + Translate(Casket.Card[CardNumber].Status[StatusNumber].Duration.Type));
							ChangeText("Label_GameInfoWindowCharacterStatus" + (Looper - BringForward) + "Description", Casket.Card[CardNumber].Status[StatusNumber].Description);
						} else {
							Hide("Ctrl_GameInfoWindowCharacterStatus" + (Looper - BringForward));
							BringForward++;
						}
					}
					for(let Looper = 5 - BringForward; Looper <= 4; Looper++) {
						Hide("Ctrl_GameInfoWindowCharacterStatus" + Looper);
					}
				} else { // Viewing party status only, when no character is active.
					Hide("Ctrl_GameInfoWindowEquippedTalentCard");
					Hide("Ctrl_GameInfoWindowEquippedWeaponCard");
					Hide("Ctrl_GameInfoWindowEquippedArtifactCard");
					for(let Looper = 1; Looper <= 4; Looper++) {
						Hide("Ctrl_GameInfoWindowCharacterStatus" + Looper);
					}
				}

				// Party Status
				let BringForward = 0;
				for(let Looper = 1; Looper <= 4; Looper++) {
					if(ReadCardNumberByID(Game.Status[PlayerOrOpponentOrHide].PartyStatus[Looper].CardID) > 0) {
						Show("Ctrl_GameInfoWindowPartyStatus" + (Looper - BringForward));
						let CardNumber = ReadCardNumberByID(Game.Status[PlayerOrOpponentOrHide].PartyStatus[Looper].CardID),
						StatusNumber = Game.Status[PlayerOrOpponentOrHide].PartyStatus[Looper].StatusNumber;
						ChangeImage("Image_GameInfoWindowPartyStatus" + (Looper - BringForward), Casket.Card[CardNumber].Status[StatusNumber].Image);
						ChangeText("InfoWindowSubtitle_GameInfoWindowPartyStatus" + (Looper - BringForward), ConvertEmptyName(Casket.Card[CardNumber].Status[StatusNumber].Name));
						ChangeText("Label_GameInfoWindowPartyStatus" + (Looper - BringForward) + "Type", Translate(Casket.Card[CardNumber].Status[StatusNumber].Type));
						ChangeText("Label_GameInfoWindowPartyStatus" + (Looper - BringForward) + "Duration", Casket.Card[CardNumber].Status[StatusNumber].Duration.Quantity + Translate(Casket.Card[CardNumber].Status[StatusNumber].Duration.Type));
						ChangeText("Label_GameInfoWindowPartyStatus" + (Looper - BringForward) + "Description", Casket.Card[CardNumber].Status[StatusNumber].Description);
					} else {
						Hide("Ctrl_GameInfoWindowPartyStatus" + (Looper - BringForward));
						BringForward++;
					}
				}
				for(let Looper = 5 - BringForward; Looper <= 4; Looper++) {
					Hide("Ctrl_GameInfoWindowPartyStatus" + Looper);
				}

				break;
			case "Hide":
				Hide("CtrlGroup_GameInfoWindowInGameCharacterProperties");
				break;
			default:
				AlertSystemError("The value of PlayerOrOpponentOrHide \"" + PlayerOrOpponentOrHide + "\" in function RefreshInfoWindowInGameCharacterProperties is invalid.");
				break;
		}
	}

// Cmds
	// Game
		// Ctrl
		function ToggleOperationPanelTransparency(Value) {
			switch(Value) {
				case "True":
					Game0.Options.TransparentOperationPanel = true;
					break;
				case "False":
					Game0.Options.TransparentOperationPanel = false;
					break;
				case "Toggle":
					if(Game0.Options.TransparentOperationPanel == false) {
						Game0.Options.TransparentOperationPanel = true;
					} else {
						Game0.Options.TransparentOperationPanel = false;
					}
					break;
				default:
					AlertSystemError("The value of Value \"" + Value + "\" in function ToggleOperationPanelTransparency is invalid.");
					break;
			}
			RefreshGameCtrl();
		}
		function ConfirmRestartGame() {
			ShowDialog("Game_ConfirmRestartGame",
				"Question",
				"您确认要重新开始本次对局？",
				"", "", "重新开始", "取消");
		}
		function ConfirmExitGame() {
			ShowDialog("Game_ConfirmExitGame",
				"Question",
				"您确认要退出对局？",
				"", "", "退出", "取消");
		}

		// Cards
		function HoverCard(PlayerOrOpponent, CardType, Number) {
			// Name on card
			if(Subsystem.Display.NameOnCard == "ShowOnHover" || Subsystem.Display.NameOnCard == "AlwaysShow") {
				ShowNameOnCard(PlayerOrOpponent, CardType, Number);
			}

			// Info window
			if(Subsystem.Display.InfoWindow.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow.InfoWindow == "AlwaysShow") {
				RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status[PlayerOrOpponent][CardType][Number].ID), "BasicProperties");
				if(CardType == "CharacterCard") {
					RefreshInfoWindowInGameCharacterProperties(PlayerOrOpponent, Number);
				} else {
					RefreshInfoWindowInGameCharacterProperties("Hide", null);
				}
				ShowInfoWindow();
			}
		}
		function ClickCard(PlayerOrOpponent, CardType, Number) {
			// Operation
			if(Game.Status.Phase[2] == "Standby") {
				switch(PlayerOrOpponent) {
					case "Player":
						switch(CardType) {
							case "CharacterCard":
								switch(Game.Status.Operation) {
									case "Table":
									case "UseSkill":
									case "PlayActionCard":
										switch(true) {
											// Select initial character
											case Game.Status.Round == -1 && Game.Status.Phase[1] == "InitialCharacter":
												Game.Status.Player.ActiveCharacter = Number;
												OpponentAct();
												setTimeout(function() {
													ChangeRound(1);
													Speak("Player", Number, "BecomingActive");
												}, 0);
												break;

											// Select another character when an active character has fallen
											case Game.Status.Round > 0 && Game.Status.Player.ActiveCharacter == 0:
												// ???
												break;

											// Prepare to switch character
											default:
												if(Number != Game.Status.Player.ActiveCharacter) {
													Game0.Selection.Action = {
														Type: "CharacterCard", Number: Number
													};
													AutoSelectDice("Player", "CharacterCard", Number);
													PlayAudio("Audio_Sound", "audio/SelectCard.mp3");
													RefreshGame();
												}
												break;
										}
										// ???
										break;
									case "SwitchCharacter":
										// ???
										break;
									case "PlayActionCardWithObjectSelection":
										// ???
										break;
									default:
										ShowToast("无效操作");
										PlayAudio("Audio_Sound", "audio/Invalid.mp3");
										break;
								}
								break;
							case "SummonsCard":
								switch(Game.Status.Operation) {
									case "Table":
										// ???
										break;
									case "PlayActionCardWithObjectSelection":
										// ???
										break;
									default:
										ShowToast("无效操作");
										PlayAudio("Audio_Sound", "audio/Invalid.mp3");
										break;
								}
								break;
							case "ActionCard":
								switch(Game.Status.Operation) {
									case "Table":
									case "Tuning":
										// ???
										break;
									case "StartingHand":
										if(Number >= 1 && Number <= 5) {
											if(Game0.Selection.StartingHand[Number] == false) {
												Game0.Selection.StartingHand[Number] = true;
											} else {
												Game0.Selection.StartingHand[Number] = false;
											}
											PlayAudio("Audio_Sound", "audio/Click.mp3");
											RefreshOperationPanel();
										} else {
											AlertSystemError("An action card out of starting hand was clicked when in operation Starting Hand.");
										}
										break;
									case "PlayActionCard":
										// ???
										break;
									case "PlayActionCardWithObjectSelection":
										// ???
										break;
									default:
										ShowToast("无效操作");
										PlayAudio("Audio_Sound", "audio/Invalid.mp3");
										break;
								}
								break;
							default:
								AlertSystemError("The value of CardType \"" + CardType + "\" in function ClickCard is invalid.");
								break;
						}
						break;
					case "Opponent":
						switch(Game.Status.Operation) {
							case "Table":
								Game0.Selection.DiscardEnemyObject = {
									Type: CardType, Number: Number
								};
								RefreshActionSelection();
								break;
							case "PlayActionCardWithObjectSelection":
								// ???
								break;
							default:
								ShowToast("无效操作");
								PlayAudio("Audio_Sound", "audio/Invalid.mp3");
								break;
						}
						break;
					default:
						AlertSystemError("The value of PlayerOrOpponent \"" + PlayerOrOpponent + "\" in function ClickCard is invalid.");
						break;
				}
			} else {
				if(Game.Status.Phase[2] != "") {
					ShowToast("请稍候");
				}
			}

			// Name on card
			if(Subsystem.Display.NameOnCard == "ShowOnHover" || Subsystem.Display.NameOnCard == "AlwaysShow") {
				ShowNameOnCard(PlayerOrOpponent, CardType, Number);
			}

			// Info window
			if(Subsystem.Display.InfoWindow.InfoWindow == "ShowOnClick" || Subsystem.Display.InfoWindow.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow.InfoWindow == "AlwaysShow") {
				RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status[PlayerOrOpponent][CardType][Number].ID), "BasicProperties");
				if(CardType == "CharacterCard") {
					RefreshInfoWindowInGameCharacterProperties(PlayerOrOpponent, Number);
				} else {
					RefreshInfoWindowInGameCharacterProperties("Hide", null);
				}
				ShowInfoWindow();
			}
		}
		function HoverStatus(PlayerOrOpponent, StatusType, CharacterSequence, StatusSequence) {
			if(Subsystem.Display.InfoWindow.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow.InfoWindow == "AlwaysShow") {
				switch(StatusType) {
					case "CharacterStatus":
						if(ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].CardID) > 0) {
							RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].CardID), "Status" + Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].StatusNumber);
						} else {
							AlertSystemError("There is a status from an unknown card \"" + Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].CardID + "\".");
						}
						RefreshInfoWindowInGameCharacterProperties(PlayerOrOpponent, CharacterSequence);
						break;
					case "PartyStatus":
						if(ReadCardNumberByID(Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].CardID) > 0) {
							RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].CardID), "Status" + Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].StatusNumber);
						} else {
							AlertSystemError("There is a status from an unknown card \"" + Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].CardID + "\".");
						}
						RefreshInfoWindowInGameCharacterProperties(PlayerOrOpponent, Game.Status[PlayerOrOpponent].ActiveCharacter);
						break;
					default:
						AlertSystemError("The value of StatusType \"" + StatusType + "\" in function HoverStatus is invalid.");
						break;
				}
				ShowInfoWindow();
			}
		}
		function ClickStatus(PlayerOrOpponent, StatusType, CharacterSequence, StatusSequence) {
			if(Subsystem.Display.InfoWindow.InfoWindow == "ShowOnClick" || Subsystem.Display.InfoWindow.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow.InfoWindow == "AlwaysShow") {
				switch(StatusType) {
					case "CharacterStatus":
						if(ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].CardID) > 0) {
							RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].CardID), "Status" + Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].StatusNumber);
						} else {
							AlertSystemError("There is a status from an unknown card \"" + Game.Status[PlayerOrOpponent].CharacterCard[CharacterSequence].Status[StatusSequence].CardID + "\".");
						}
						RefreshInfoWindowInGameCharacterProperties(PlayerOrOpponent, CharacterSequence);
						break;
					case "PartyStatus":
						if(ReadCardNumberByID(Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].CardID) > 0) {
							RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].CardID), "Status" + Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].StatusNumber);
						} else {
							AlertSystemError("There is a status from an unknown card \"" + Game.Status[PlayerOrOpponent].PartyStatus[StatusSequence].CardID + "\".");
						}
						RefreshInfoWindowInGameCharacterProperties(PlayerOrOpponent, Game.Status[PlayerOrOpponent].ActiveCharacter);
						break;
					default:
						AlertSystemError("The value of StatusType \"" + StatusType + "\" in function ClickStatus is invalid.");
						break;
				}
				ShowInfoWindow();
			}
		}

		// Dice
		function HoverDice(PlayerOrOpponent, Number) {
			if(Interaction.IsPointerDown == true) {
				ClickDice(PlayerOrOpponent, Number);
			}
		}
		function ClickDice(PlayerOrOpponent, Number) {
			if(Game.Status.Phase[2] == "Standby") {
				switch(PlayerOrOpponent) {
					case "Player":
						if(Game0.Selection.Dice[Number] == false) {
							Game0.Selection.Dice[Number] = true;
						} else {
							Game0.Selection.Dice[Number] = false;
						}
						RefreshDice();
						switch(Game.Status.Operation) {
							case "Table":
							case "SwitchCharacter":
							// ???
								PlayAudio("Audio_Sound", "audio/TableSelectDice.mp3");
								RefreshTable();
								break;
							case "RollPhase":
								PlayAudio("Audio_Sound", "audio/RollPhaseSelectDice.mp3");
								RefreshOperationPanel();
								break;
							default:
								AlertSystemError("The value of Game.Status.Operation \"" + Game.Status.Operation + "\" in function ClickDice is invalid.");
								break;
						}
						break;
					case "Opponent":
						if(Game.Status.Operation == "Table") {
							Game0.Selection.DiscardEnemyObject = {
								Type: "Dice", Number: Number
							};
							RefreshActionSelection();
						} else {
							ShowToast("无效操作");
							PlayAudio("Audio_Sound", "audio/Invalid.mp3");
						}
						break;
					default:
						AlertSystemError("The value of PlayerOrOpponent \"" + PlayerOrOpponent + "\" in function ClickDice is invalid.");
						break;
				}
			} else {
				if(Game.Status.Phase[2] != "") {
					ShowToast("请稍候");
				}
			}
		}

		// Table
		function EndAction() {
			// ???
		}
		function HoverSkill(SkillType) {
			if(Game.Status.Player.ActiveCharacter > 0 &&
			(Subsystem.Display.InfoWindow.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow.InfoWindow == "AlwaysShow")) {
				RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status.Player.CharacterCard[Game.Status.Player.ActiveCharacter].ID), SkillType);
				RefreshInfoWindowInGameCharacterProperties("Player", Game.Status.Player.ActiveCharacter);
				ShowInfoWindow();
			}
		}
		function ClickSkill(SkillType) {
			// Operation
			// ???

			// Info window
			if(Game.Status.Player.ActiveCharacter > 0 &&
			(Subsystem.Display.InfoWindow.InfoWindow == "ShowOnClick" || Subsystem.Display.InfoWindow.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow.InfoWindow == "AlwaysShow")) {
				RefreshInfoWindowObjectProperties(ReadCardNumberByID(Game.Status.Player.CharacterCard[Game.Status.Player.ActiveCharacter].ID), SkillType);
				RefreshInfoWindowInGameCharacterProperties("Player", Game.Status.Player.ActiveCharacter);
				ShowInfoWindow();
			}
		}

		// Operations
			// Cancel operation (clear action and dice selection)
			function CancelOperation() {
				switch(Game.Status.Operation) {
					case "SwitchCharacter":
					case "UseSkill":
					case "PlayActionCard":
					case "PlayActionCardWithObjectSelection":
					case "Tuning":
						Game0.Selection.Action = {
							Type: "", Number: 0
						};
						Game0.Selection.Dice = [0, false, false, false, false, false, false, false, false, false, false, false, false];
						RefreshGame();
						break;
					default:
						break;
				}
			}

			// Title screen
			function StartGame() {
				ExitGame();
				Game.Status.Operation = "Loading";
				Game0.Load = {
					ClockTime: 0, StartTime: Date.now(),
					Progress: 0,
					IsPaused: false
				};
				ScrollIntoView("Game");
				ChangeAnim("Label_Versus", "none");
				ChangeScale("Label_Versus", 3);
				ChangeText("Label_GameLoadingPrompt", "正在载入...");
				PlayAudio("Audio_Sound", "audio/Start.mp3");
				setTimeout(function() {
					ChangeAnim("Label_Versus", "");
					RefreshGame();
					ChangeScale("Label_Versus", "");
				}, 20);
			}
			function SetPlayerDeckName() {
				Casket.Deck[Casket.DeckSelection.Player].Properties.Name = ReadValue("Textbox_GameYourDeckName");
				RefreshGame();
			}
			function SetOpponentDeckName() {
				Casket.Deck[Casket.DeckSelection.Opponent].Properties.Name = ReadValue("Textbox_GameOpponentDeckName");
				RefreshGame();
			}

			// Starting hand
			function SwitchStartingHand() {
				Game.Status.Phase[2] = "Working1";
				PlayAudio("Audio_Sound", "audio/SwitchStartingHand.mp3");
				RefreshGame();
			}
			function SkipStartingHand() {
				Game.Status.Phase[2] = "Working1";
				ResetGameSelection();
				PlayAudio("Audio_Sound", "audio/Click.mp3");
				RefreshGame();
			}

			// Roll phase
			function SetExcludeActiveCharacterElement() {
				if(IsChecked("Checkbox_GameExcludeActiveCharacterElement") == true) {
					for(let Looper = 1; Looper <= 8; Looper++) {
						if(Game.Status.Player.Dice[Looper].Type == "Omni") {
							Game0.Selection.Dice[Looper] = false;
						} else {
							if(Game.Status.Player.ActiveCharacter > 0) {
								if(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[Game.Status.Player.ActiveCharacter].ID)].CharacterCardProperties.ElementType) {
									Game0.Selection.Dice[Looper] = false;
								} else {
									Game0.Selection.Dice[Looper] = true;
								}
							} else {
								AlertSystemError("The player has no active character at roll phase, in function ExcludeActiveCharacterElement.");
							}
						}
					}
				} else {
					Game0.Selection.Dice = [0, false, false, false, false, false, false, false, false, false, false, false, false];
				}
				PlayAudio("Audio_Sound", "audio/Click.mp3");
				RefreshDice();
				RefreshOperationPanel();
			}
			function SetExcludeAllCharactersElements() {
				if(IsChecked("Checkbox_GameExcludeAllCharactersElements") == true) {
					for(let Looper = 1; Looper <= 8; Looper++) {
						if(Game.Status.Player.Dice[Looper].Type == "Omni") {
							Game0.Selection.Dice[Looper] = false;
						} else {
							if(
								(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[1].ID)].CharacterCardProperties.ElementType &&
								Game.Status.Player.CharacterCard[1].HP > 0) ||
								(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[2].ID)].CharacterCardProperties.ElementType &&
								Game.Status.Player.CharacterCard[2].HP > 0) ||
								(Game.Status.Player.Dice[Looper].Type == Casket.Card[ReadCardNumberByID(Game.Status.Player.CharacterCard[3].ID)].CharacterCardProperties.ElementType &&
								Game.Status.Player.CharacterCard[3].HP > 0)
							) {
								Game0.Selection.Dice[Looper] = false;
							} else {
								Game0.Selection.Dice[Looper] = true;
							}
						}
					}
				} else {
					Game0.Selection.Dice = [0, false, false, false, false, false, false, false, false, false, false, false, false];
				}
				PlayAudio("Audio_Sound", "audio/Click.mp3");
				RefreshDice();
				RefreshOperationPanel();
			}
			function Reroll() {
				Game.Status.Phase[2] = "Working1";
				PlayAudio("Audio_Sound", "audio/RollDice.mp3");
				RefreshGame();
			}
			function SkipReroll() {
				Game.Status.Phase[2] = "Working1";
				ResetGameSelection();
				PlayAudio("Audio_Sound", "audio/Click.mp3");
				RefreshGame();
			}

			// ???

		// Info window
		function ForceHideInfoWindow() {
			setTimeout(HideInfoWindow, 40); // Because the close button is inside the window, clicking the close button also triggers ShowInfoWindow. So a delay should be set here.
			if(Subsystem.Display.InfoWindow.InfoWindow == "AlwaysShow") {
				Subsystem.Display.InfoWindow.InfoWindow = "ShowOnHover";
				RefreshSubsystem();
			}
		}
		function ToggleInfoWindowCollapse(Name) {
			if(IsClassContained("CtrlGroup_GameInfoWindow" + Name, "Hidden") == true) {
				Show("CtrlGroup_GameInfoWindow" + Name);
			} else {
				Hide("CtrlGroup_GameInfoWindow" + Name);
			}
		}

// Features
	// Game
		// Name on cards
		function ShowNameOnCard(PlayerOrOpponent, CardType, Number) {
			switch(Subsystem.Display.NameOnCard) {
				case "ShowOnHover":
					Show("Label_Game" + PlayerOrOpponent + CardType.replaceAll("Card", "") + Number);
					clearTimeout(Automation.FadeNameOnCards);
					Automation.FadeNameOnCards = setTimeout(FadeNameOnCards, System.Display.Anim + 15000);
					break;
				case "AlwaysShow":
					ShowByClass("NameOnCard");
					clearTimeout(Automation.FadeNameOnCards);
					break;
				default:
					AlertSystemError("The value of Subsystem.Display.NameOnCard \"" + Subsystem.Display.NameOnCard + "\" in function ShowNameOnCard is invalid.");
					break;
			}
		}
		function FadeNameOnCards() {
			if(Subsystem.Display.NameOnCard != "AlwaysShow") {
				FadeByClass("NameOnCard");
			}
			if(Interaction.DoNotHide.length <= 1) {
				clearTimeout(Automation.FadeNameOnCards);
			}
		}

		// Speak
		function Speak(PlayerOrOpponent, CharacterNumber, SpokenLineType) {
			if(Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterNumber].ID)].SpokenLine[SpokenLineType][1] != "" ||
			Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterNumber].ID)].SpokenLine[SpokenLineType][2] != "" ||
			Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterNumber].ID)].SpokenLine[SpokenLineType][3] != "") {
				let LotteryNumber = 0;
				do {
					LotteryNumber = Randomize(1, 3);
				} while(Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterNumber].ID)].SpokenLine[SpokenLineType][LotteryNumber] == "");
				if(Subsystem.Display.ShowSpokenLines == true && SpokenLineType != "Fallen") {
					ChangeText("Label_GameSpokenLine" + PlayerOrOpponent, Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterNumber].ID)].SpokenLine[SpokenLineType][LotteryNumber]);
					Show("SpokenLine_Game" + PlayerOrOpponent);
					clearTimeout(Automation.FadeSpokenLine[PlayerOrOpponent]);
					Automation.FadeSpokenLine[PlayerOrOpponent] = setTimeout(function() {
						FadeSpokenLine(PlayerOrOpponent);
					}, System.Display.Anim + 2000);
				}
				PlayAudio("Audio_Voice" + PlayerOrOpponent, Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[CharacterNumber].ID)].Voiceover[SpokenLineType][LotteryNumber]);
			}
		}
		function FadeSpokenLine(PlayerOrOpponent) {
			Fade("SpokenLine_Game" + PlayerOrOpponent);
			clearTimeout(Automation.FadeSpokenLine[PlayerOrOpponent]);
		}

		// Info window
		function ShowInfoWindow() {
			switch(Subsystem.Display.InfoWindow.InfoWindow) {
				case "ShowOnClick":
				case "ShowOnHover":
					Show("Window_Game");
					clearTimeout(Automation.HideInfoWindow);
					Automation.HideInfoWindow = setTimeout(HideInfoWindow, System.Display.Anim + 15000);
					break;
				case "AlwaysShow":
					Show("Window_Game");
					clearTimeout(Automation.HideInfoWindow);
					break;
				default:
					AlertSystemError("The value of Subsystem.Display.InfoWindow.InfoWindow \"" + Subsystem.Display.InfoWindow.InfoWindow + "\" in function ShowInfoWindow is invalid.");
					break;
			}
		}
		function HideInfoWindow() {
			if(Subsystem.Display.InfoWindow.InfoWindow != "AlwaysShow") {
				HideHorizontally("Window_Game");
			}
			if(Interaction.DoNotHide.length <= 1) {
				clearTimeout(Automation.HideInfoWindow);
			}
		}

		// Load
		function LoadDeck(PlayerOrOpponent) {
			switch(PlayerOrOpponent) {
				case "Player":
					if(Casket.DeckSelection.Player > 0) {
						Game.Status.Player.DeckProperties = structuredClone(Casket.Deck[Casket.DeckSelection.Player].Properties);
						for(let Looper = 1; Looper <= 3; Looper++) {
							if(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper] != undefined) {
								Game.Status.Player.CharacterCard[Looper].ID = Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper];
							} else {
								Game.Status.Player.CharacterCard[Looper].ID = "";
							}
						}
						for(let Looper = 1; Looper <= 30; Looper++) {
							if(Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection[Looper] != undefined) {
								Game.Status.Player.ActionCard[Looper].ID = Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection[Looper];
							} else {
								Game.Status.Player.ActionCard[Looper].ID = "";
							}
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							if(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper] != undefined &&
							Casket.Card[ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper])].CharacterCardProperties.HasAffiliatedCard == true &&
							Casket.Card[ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper])].AffiliatedCard.Type == "EventCard") {
								Game.Status.Player.ActionCard[30 + Looper].ID = Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper];
							} else {
								Game.Status.Player.ActionCard[30 + Looper].ID = "";
							}
						}
					} else {
						Game.Status.Player.DeckProperties = structuredClone(Casket0.BuiltinDeck.EmptyDeck.Properties);
						switch(Casket.DeckSelection.Player) {
							case -2:
								Game.Status.Player.DeckProperties.Name = "(生成临时牌组)";
								break;
							case -1:
								Game.Status.Player.DeckProperties.Name = "(随机选择牌组)";
								break;
							default:
								AlertSystemError("The value of Casket.DeckSelection.Player \"" + Casket.DeckSelection.Player + "\" in function LoadDeck is invalid.");
								break;
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							Game.Status.Player.CharacterCard[Looper].ID = "";
						}
						for(let Looper = 1; Looper <= 33; Looper++) {
							Game.Status.Player.ActionCard[Looper].ID = "";
						}
					}
					break;
				case "Opponent":
					if(Casket.DeckSelection.Opponent > 0) {
						Game.Status.Opponent.DeckProperties = structuredClone(Casket.Deck[Casket.DeckSelection.Opponent].Properties);
						for(let Looper = 1; Looper <= 3; Looper++) {
							if(Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection[Looper] != undefined) {
								Game.Status.Opponent.CharacterCard[Looper].ID = Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection[Looper];
							} else {
								Game.Status.Opponent.CharacterCard[Looper].ID = "";
							}
						}
						for(let Looper = 1; Looper <= 30; Looper++) {
							if(Casket.Deck[Casket.DeckSelection.Opponent].ActionCardSelection[Looper] != undefined) {
								Game.Status.Opponent.ActionCard[Looper].ID = Casket.Deck[Casket.DeckSelection.Opponent].ActionCardSelection[Looper];
							} else {
								Game.Status.Opponent.ActionCard[Looper].ID = "";
							}
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							if(Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection[Looper] != undefined &&
							Casket.Card[ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection[Looper])].CharacterCardProperties.HasAffiliatedCard == true &&
							Casket.Card[ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection[Looper])].AffiliatedCard.Type == "EventCard") {
								Game.Status.Opponent.ActionCard[30 + Looper].ID = Casket.Deck[Casket.DeckSelection.Opponent].CharacterCardSelection[Looper];
							} else {
								Game.Status.Opponent.ActionCard[30 + Looper].ID = "";
							}
						}
					} else {
						Game.Status.Opponent.DeckProperties = structuredClone(Casket0.BuiltinDeck.EmptyDeck.Properties);
						switch(Casket.DeckSelection.Opponent) {
							case -2:
								Game.Status.Opponent.DeckProperties.Name = "(生成临时牌组)";
								break;
							case -1:
								Game.Status.Opponent.DeckProperties.Name = "(随机选择牌组)";
								break;
							default:
								AlertSystemError("The value of Casket.DeckSelection.Opponent \"" + Casket.DeckSelection.Opponent + "\" in function LoadDeck is invalid.");
								break;
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							Game.Status.Opponent.CharacterCard[Looper].ID = "";
						}
						for(let Looper = 1; Looper <= 33; Looper++) {
							Game.Status.Opponent.ActionCard[Looper].ID = "";
						}
					}
					break;
				default:
					AlertSystemError("The value of PlayerOrOpponent \"" + PlayerOrOpponent + "\" in function LoadDeck is invalid.");
					break;
			}
		}
		function GenerateTemporaryDeck(PlayerOrOpponent) {
			// Initialization
			let CharacterCard = [0], ActionCard = [0], LotteryNumber = 0;

			// Acquire character card list and action card list
			for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
				if(Casket.Card[Looper].BasicProperties.Type == "CharacterCard") {
					CharacterCard[CharacterCard.length] = Casket.Card[Looper].BasicProperties.ID;
				} else {
					ActionCard[ActionCard.length] = Casket.Card[Looper].BasicProperties.ID;
				}
			}

			// Check integrity
			if(CharacterCard.length < 4) {
				AlertSystemError("There are less than 3 character cards in the casket when trying to generate temporary deck. The casket checker may be faulty.");
			}
			if(ActionCard.length < 31) {
				AlertSystemError("There are less than 30 action cards in the casket when trying to generate temporary deck. The casket checker may be faulty.");
			}

			// Deck properties
			Game.Status[PlayerOrOpponent].DeckProperties = structuredClone(Casket0.BuiltinDeck.EmptyDeck.Properties);
			Game.Status[PlayerOrOpponent].DeckProperties.Name = "(临时牌组)";

			// Character cards
			for(let Looper = 1; Looper <= 3; Looper++) {
				LotteryNumber = Randomize(1, CharacterCard.length - 1);
				Game.Status[PlayerOrOpponent].CharacterCard[Looper].ID = CharacterCard[LotteryNumber];
				CharacterCard.splice(LotteryNumber, 1);
			}

			// Action cards
			for(let Looper = 1; Looper <= 30; Looper++) {
				LotteryNumber = Randomize(1, ActionCard.length - 1);
				Game.Status[PlayerOrOpponent].ActionCard[Looper].ID = ActionCard[LotteryNumber];
				ActionCard.splice(LotteryNumber, 1);
			}
		}
		function RandomlySelectDeck(PlayerOrOpponent) {
			if(Casket.Deck.length > 1) {
				let LotteryNumber = Randomize(1, Casket.Deck.length - 1);
				Game.Status[PlayerOrOpponent].DeckProperties = structuredClone(Casket.Deck[LotteryNumber].Properties);
				for(let Looper = 1; Looper <= 3; Looper++) {
					if(Casket.Deck[LotteryNumber].CharacterCardSelection[Looper] != undefined) {
						Game.Status[PlayerOrOpponent].CharacterCard[Looper].ID = Casket.Deck[LotteryNumber].CharacterCardSelection[Looper];
					} else {
						Game.Status[PlayerOrOpponent].CharacterCard[Looper].ID = "";
					}
				}
				for(let Looper = 1; Looper <= 30; Looper++) {
					if(Casket.Deck[LotteryNumber].ActionCardSelection[Looper] != undefined) {
						Game.Status[PlayerOrOpponent].ActionCard[Looper].ID = Casket.Deck[LotteryNumber].ActionCardSelection[Looper];
					} else {
						Game.Status[PlayerOrOpponent].ActionCard[Looper].ID = "";
					}
				}
				for(let Looper = 1; Looper <= 3; Looper++) {
					if(Casket.Deck[LotteryNumber].CharacterCardSelection[Looper] != undefined &&
					Casket.Card[ReadCardNumberByID(Casket.Deck[LotteryNumber].CharacterCardSelection[Looper])].CharacterCardProperties.HasAffiliatedCard == true &&
					Casket.Card[ReadCardNumberByID(Casket.Deck[LotteryNumber].CharacterCardSelection[Looper])].AffiliatedCard.Type == "EventCard") {
						Game.Status[PlayerOrOpponent].ActionCard[30 + Looper].ID = Casket.Deck[LotteryNumber].CharacterCardSelection[Looper];
					} else {
						Game.Status[PlayerOrOpponent].ActionCard[30 + Looper].ID = "";
					}
				}
			} else {
				AlertSystemError("There are no decks in the casket when trying to randomly select deck. The casket checker may be faulty.");
			}
		}
		function CheckCardValidity(CardNumber) {
			if(CardNumber == 0) {
				return "Unknown";
			}
			if(Casket.Card[CardNumber].Credits == undefined) {
				return "\"Credits\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
			}
			switch(Casket.Card[CardNumber].BasicProperties.Type) {
				case "CharacterCard":
					if(Casket.Card[CardNumber].CharacterCardProperties == undefined) {
						return "\"CharacterCardProperties\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].NormalAttack == undefined) {
						return "\"NormalAttack\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].ElementalSkill == undefined) {
						return "\"ElementalSkill\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].NormalAttack == undefined) {
						return "\"NormalAttack\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].CharacterCardProperties.HasSecondaryElementalSkill == true && Casket.Card[CardNumber].SecondaryElementalSkill == undefined) {
						return "\"SecondaryElementalSkill\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].ElementalBurst == undefined) {
						return "\"ElementalBurst\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].CharacterCardProperties.HasIntroSkill == true && Casket.Card[CardNumber].IntroSkill == undefined) {
						return "\"IntroSkill\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].CharacterCardProperties.HasOutroSkill == true && Casket.Card[CardNumber].OutroSkill == undefined) {
						return "\"OutroSkill\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].CharacterCardProperties.HasPassiveSkill == true && Casket.Card[CardNumber].PassiveSkill == undefined) {
						return "\"PassiveSkill\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].CharacterCardProperties.HasAffiliatedCard == true && Casket.Card[CardNumber].AffiliatedCard == undefined) {
						return "\"AffiliatedCard\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].CharacterProfile == undefined) {
						return "\"CharacterProfile\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].SpokenLine == undefined) {
						return "\"SpokenLine\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					if(Casket.Card[CardNumber].Voiceover == undefined) {
						return "\"Voiceover\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					break;
				case "TalentCard":
					if(Casket.Card[CardNumber].TalentCardProperties == undefined) {
						return "\"TalentCardProperties\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					break;
				case "WeaponCard":
					if(Casket.Card[CardNumber].WeaponCardProperties == undefined) {
						return "\"WeaponCardProperties\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					break;
				case "ArtifactCard":
					if(Casket.Card[CardNumber].ArtifactCardProperties == undefined) {
						return "\"ArtifactCardProperties\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					break;
				case "SupportCard":
					if(Casket.Card[CardNumber].SupportCardProperties == undefined) {
						return "\"SupportCardProperties\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					break;
				case "EventCard":
					if(Casket.Card[CardNumber].EventCardProperties == undefined) {
						return "\"EventCardProperties\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
					}
					break;
				default:
					AlertSystemError("The value of Casket.Card[CardNumber].BasicProperties.Type \"" + Casket.Card[CardNumber].BasicProperties.Type + "\" in function CheckCardValidity is invalid.");
					break;
			}
			for(let Looper = 1; Looper <= 3; Looper++) {
				if(Looper <= Casket.Card[CardNumber].BasicProperties.StatusQuantity && Casket.Card[CardNumber].Status[Looper] == undefined) {
					return "\"Status[" + Looper + "]\" is undefined in card #" + CardNumber + " \"" + Casket.Card[CardNumber].BasicProperties.ID + "\".";
				}
			}
			return "Valid";
		}
		function IsCardApplicable(PlayerOrOpponent, CardNumber) { // For talent cards and weapon cards.
			switch(Casket.Card[CardNumber].BasicProperties.Type) {
				case "TalentCard":
					for(let Looper = 1; Looper <= 3; Looper++) {
						if(Casket.Card[CardNumber].TalentCardProperties.OrientedCharacterCardID == Game.Status[PlayerOrOpponent].CharacterCard[Looper].ID) {
							return true;
						}
					}
					return false;
				case "WeaponCard":
					for(let Looper = 1; Looper <= 3; Looper++) {
						if(Casket.Card[CardNumber].WeaponCardProperties.WeaponType == Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Looper].ID)].CharacterCardProperties.WeaponType) {
							return true;
						}
					}
					return false;
				default:
					return true;
			}
		}
		function ResetPreloadImages() {
			for(let Looper = 1; Looper <= 120; Looper++) {
				ChangeImage("Image_Preload" + Looper, "");
			}
		}
		function ResetPreloadAudio() {
			for(let Looper = 1; Looper <= 45; Looper++) {
				LoadAudio("Audio_Preload" + Looper, "../audio/Beep.mp3");
			}
		}

		// Reset
		function ResetGameStatus() {
			Game.Status = {
				Operation: "Title",
				Round: 0,
				Phase: [0, "", ""],
				First: "Player",
				Player: {
					DeckProperties: {
						Name: "", Description: "", BgImage: "", BackImage: "", ImageSource: ""
					},
					CharacterCard: [
						0,
						{
							ID: "",
							HP: 0, PreviousHP: 0, Energy: 0,
							Element: [0, "", "", ""], Reaction: "",
							Status: [
								0,
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0}
							]
						},
						{
							ID: "",
							HP: 0, PreviousHP: 0, Energy: 0,
							Element: [0, "", "", ""], Reaction: "",
							Status: [
								0,
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0}
							]
						},
						{
							ID: "",
							HP: 0, PreviousHP: 0, Energy: 0,
							Element: [0, "", "", ""], Reaction: "",
							Status: [
								0,
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0}
							]
						}
					],
					ActiveCharacter: 0,
					PartyStatus: [
						0,
						{CardID: "", StatusNumber: 0, Duration: 0},
						{CardID: "", StatusNumber: 0, Duration: 0},
						{CardID: "", StatusNumber: 0, Duration: 0},
						{CardID: "", StatusNumber: 0, Duration: 0}
					],
					SummonsCard: [
						0,
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0}
					],
					ActionCard: [
						0,
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"}
					],
					Dice: [
						0,
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1}
					],
					RerollChance: 0,
					Turn: "Standby",
					ActionUsed: {
						CharacterCard: 0,
						NormalAttack: 0, ElementalSkill: 0, ElementalBurst: 0,
						TalentCard: 0, WeaponCard: 0, ArtifactCard: 0, SupportCard: 0, EventCard: 0,
						DrawCard: 0
					},
					CostAdjustment: [0],
					Critical: {
						RatePercentage: 5, Damage: 10
					}
				},
				Opponent: {
					DeckProperties: {
						Name: "", Description: "", BgImage: "", BackImage: "", ImageSource: ""
					},
					CharacterCard: [
						0,
						{
							ID: "",
							HP: 0, PreviousHP: 0, Energy: 0,
							Element: [0, "", "", ""], Reaction: "",
							Status: [
								0,
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0}
							]
						},
						{
							ID: "",
							HP: 0, PreviousHP: 0, Energy: 0,
							Element: [0, "", "", ""], Reaction: "",
							Status: [
								0,
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0}
							]
						},
						{
							ID: "",
							HP: 0, PreviousHP: 0, Energy: 0,
							Element: [0, "", "", ""], Reaction: "",
							Status: [
								0,
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0},
								{CardID: "", StatusNumber: 0, Duration: 0}
							]
						}
					],
					ActiveCharacter: 0,
					PartyStatus: [
						0,
						{CardID: "", StatusNumber: 0, Duration: 0},
						{CardID: "", StatusNumber: 0, Duration: 0},
						{CardID: "", StatusNumber: 0, Duration: 0},
						{CardID: "", StatusNumber: 0, Duration: 0}
					],
					SummonsCard: [
						0,
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0}
					],
					ActionCard: [
						0,
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"},
						{ID: "", Position: "OffTable"}
					],
					Dice: [
						0,
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1},
						{Type: "Unknown", Position: "OffTable", Sequence: 1}
					],
					RerollChance: 0,
					Turn: "Standby",
					ActionUsed: {
						CharacterCard: 0,
						NormalAttack: 0, ElementalSkill: 0, ElementalBurst: 0,
						TalentCard: 0, WeaponCard: 0, ArtifactCard: 0, SupportCard: 0, EventCard: 0,
						DrawCard: 0
					},
					CostAdjustment: [0],
					Critical: {
						RatePercentage: 5, Damage: 10
					}
				},
				Action: {
					IsCombatAction: false,
					Queue: [0],
					CardPlayed: ""
				},
				Master: {
					PlayerOrOpponent: "Player", CardNumber: 0
				}
			};
		}
		function ResetGameAction() {
			Game.Status.Action = {
				IsCombatAction: false,
				Queue: [0],
				CardPlayed: ""
			};
		}
		function ResetGameSelection() {
			Game0.Selection = {
				Action: {
					Type: "", Number: 0
				},
				RecommendedAction: {
					Type: "", Number: 0
				},
				StartingHand: [0, false, false, false, false, false],
				CardInHand: 0,
				Dice: [0, false, false, false, false, false, false, false, false, false, false, false, false],
				DiscardEnemyObject: {
					Type: "", Number: 0
				}
			};
		}
		function ExitGame() {
			ResetGameStatus();
			ResetGameSelection();
			RefreshGame();
		}

		// Round, phase and turn
		function ChangeRound(RoundNumber) {
			Game.Status.Round = RoundNumber;
			ResetGameAction();
			if(RoundNumber > 0) {
				switch(Game.Status.First) {
					case "Player":
						ShowToast("第" + RoundNumber + "轮 - 您先行动");
						break;
					case "Opponent":
						ShowToast("第" + RoundNumber + "轮 - 对手先行动");
						break;
					default:
						AlertSystemError("The value of Game.Status.First \"" + Game.Status.First + "\" in function ChangeRound is invalid.");
						break;
				}
				PlayAudio("Audio_Sound", "audio/NewRound.mp3");
			}
			ChangePhase1("Initialization");
		}
		function ChangePhase1(Phase1) {
			Game.Status.Phase[1] = Phase1;
			Game.Status.Player.Turn = "Standby";
			Game.Status.Opponent.Turn = "Standby";
			switch(Phase1) {
				case "Initialization":
					Game.Status.Phase[2] = "Initialization";
					break;
				case "StartingHand":
					Game.Status.Phase[2] = "Beginning";
					PlayAudio("Audio_Sound", "audio/DrawCard.mp3");
					break;
				case "InitialCharacter":
					Game.Status.Phase[2] = "Standby";
					ShowToast("请选择初始角色");
					PlayAudio("Audio_Sound", "audio/NewPhase.mp3");
					break;
				case "RollPhase":
					Game.Status.Phase[2] = "Initialization";
					ShowToast("掷骰阶段");
					PlayAudio("Audio_Sound", "audio/NewPhase.mp3");
					break;
				case "ActionPhase":
					Game.Status.Phase[2] = "Initialization";
					ShowToast("行动阶段");
					PlayAudio("Audio_Sound", "audio/NewPhase.mp3");
					break;
				case "EndPhase":
					Game.Status.Phase[2] = "Initialization";
					ShowToast("结束阶段");
					PlayAudio("Audio_Sound", "audio/NewPhase.mp3");
					break;
				default:
					AlertSystemError("The value of Phase1 \"" + Phase1 + "\" in function ChangePhase1 is invalid.");
					break;
			}
			RefreshGame();
		}
		function ChangeTurn() {
			if(Game.Status.Phase[1] == "ActionPhase") {
				switch(Game.Status.Phase[2]) {
					case "Beginning":
						switch(Game.Status.First) {
							case "Player":
								Game.Status.Player.Turn = "InTurn";
								Game.Status.Opponent.Turn = "Standby";
								Game.Status.Phase[2] = "BeforeStandby";
								ShowToast("请您行动");
								PlayAudio("Audio_Sound", "audio/Turn.mp3");
								break;
							case "Opponent":
								Game.Status.Player.Turn = "Standby";
								Game.Status.Opponent.Turn = "InTurn";
								Game.Status.Phase[2] = "BeforeStandby";
								ShowToast("对手行动");
								PlayAudio("Audio_Sound", "audio/Turn.mp3");
								break;
							default:
								AlertSystemError("The value of Game.Status.First \"" + Game.Status.First + "\" in function ChangeTurn is invalid.");
								break;
						}
						break;
					case "AfterCombatAction":
						// ???
						break;
					case "Standby":
						// ???
						break;
					default:
						AlertSystemError("The value of Game.Status.Phase[2] \"" + Game.Status.Phase[2] + "\" in function ChangeTurn is invalid.");
						break;
				}
				RefreshGame();
			} else {
				AlertSystemError("The value of Game.Status.Phase[1] \"" + Game.Status.Phase[1] + "\" in function ChangeTurn is invalid.");
			}
		}

		// Roll phase
		function RollDice() {
			if(Game0.RollDice.IsRolling == true) {
				// Automation
				clearTimeout(Automation.RollDice);
				Automation.RollDice = setTimeout(RollDice, 120);

				// Main
				switch(JSON.stringify(Game.Status.Phase)) {
					case "[0,\"RollPhase\",\"Beginning\"]":
						if(Game0.RollDice.Progress < 8) {
							Game.Status.Player.Dice[Game0.RollDice.Progress + 1].Type = ConvertNumberToElementType(Randomize(10, 17));
							Game0.RollDice.Progress++;
							RefreshDice();
						} else {
							Game0.RollDice.IsRolling = false;
							Game.Status.Player.RerollChance = 1;
							Scan(); // Execute reroll chance buffs if exist. Reroll chance buffs should specify the game phase as "RollPhase Beginning".
							if(Game.Status.Player.RerollChance > 0) {
								Game.Status.Phase[2] = "BeforeStandby";
							} else {
								Game.Status.Phase[2] = "Working2";
							}
							RefreshGame();
						}
						break;
					case "[0,\"RollPhase\",\"Working1\"]":
						while(Game0.Selection.Dice[Game0.RollDice.Progress + 1] == false) {
							Game0.RollDice.Progress++;
						}
						if(Game0.RollDice.Progress < 8) {
							Game.Status.Player.Dice[Game0.RollDice.Progress + 1].Type = ConvertNumberToElementType(Randomize(10, 17));
							Game0.RollDice.Progress++;
							RefreshDice();
						} else {
							Game0.RollDice.IsRolling = false;
							Game.Status.Player.RerollChance--;
							if(Game.Status.Player.RerollChance > 0) {
								Game.Status.Phase[2] = "BeforeStandby";
							} else {
								Game.Status.Phase[2] = "Working2";
							}
							RefreshGame();
						}
						break;
					default:
						AlertSystemError("The value of Game.Status.Phase \"" + JSON.stringify(Game.Status.Phase) + "\" in function RollDice is invalid.");
						break;
				}
			}
		}

		// Action phase
		function Scan() {
			// ???
		}
		function ReadOriginalCost(PlayerOrOpponent, ActionType, ActionCardNumber) {
			switch(ActionType) {
				case "CharacterCard":
					return [0, 1, "Unaligned"];
				case "NormalAttack":
					if(Game.Status[PlayerOrOpponent].ActiveCharacter > 0 &&
					Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID)].BasicProperties.Type == "CharacterCard") {
						let CardNumber = ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID);
						return [0, Casket.Card[CardNumber].NormalAttack.Cost[1], Casket.Card[CardNumber].CharacterCardProperties.ElementType, Casket.Card[CardNumber].NormalAttack.Cost[2]];
					} else {
						return [0, "?", "Unknown", "?"];
					}
				case "ElementalSkill":
					if(Game.Status[PlayerOrOpponent].ActiveCharacter > 0 &&
					Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID)].BasicProperties.Type == "CharacterCard") {
						let CardNumber = ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID);
						return [0, Casket.Card[CardNumber].ElementalSkill.Cost, Casket.Card[CardNumber].CharacterCardProperties.ElementType];
					} else {
						return [0, "?", "Unknown"];
					}
				case "SecondaryElementalSkill":
					if(Game.Status[PlayerOrOpponent].ActiveCharacter > 0 &&
					Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID)].BasicProperties.Type == "CharacterCard") {
						let CardNumber = ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID);
						return [0, Casket.Card[CardNumber].SecondaryElementalSkill.Cost, Casket.Card[CardNumber].CharacterCardProperties.ElementType];
					} else {
						return [0, "?", "Unknown"];
					}
				case "ElementalBurst":
					if(Game.Status[PlayerOrOpponent].ActiveCharacter > 0 &&
					Casket.Card[ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID)].BasicProperties.Type == "CharacterCard") {
						let CardNumber = ReadCardNumberByID(Game.Status[PlayerOrOpponent].CharacterCard[Game.Status[PlayerOrOpponent].ActiveCharacter].ID);
						return [0, Casket.Card[CardNumber].ElementalBurst.Cost, Casket.Card[CardNumber].CharacterCardProperties.ElementType];
					} else {
						return [0, "?", "Unknown"];
					}
				case "TalentCard":
					if(Casket.Card[ActionCardNumber].BasicProperties.Type == "TalentCard") {
						return [0, Casket.Card[ActionCardNumber].TalentCardProperties.Cost[1], Casket.Card[ActionCardNumber].TalentCardProperties.Cost[2], Casket.Card[ActionCardNumber].TalentCardProperties.Cost[3]];
					} else {
						AlertSystemError("Parameter mismatch in function ReadOriginalCost. Card #" + ActionCardNumber + " is not a talent card.");
					}
					break;
				case "WeaponCard":
					if(Casket.Card[ActionCardNumber].BasicProperties.Type == "WeaponCard") {
						return [0, Casket.Card[ActionCardNumber].WeaponCardProperties.Cost[1], Casket.Card[ActionCardNumber].WeaponCardProperties.Cost[2]];
					} else {
						AlertSystemError("Parameter mismatch in function ReadOriginalCost. Card #" + ActionCardNumber + " is not a weapon card.");
					}
					break;
				case "ArtifactCard":
					if(Casket.Card[ActionCardNumber].BasicProperties.Type == "ArtifactCard") {
						return [0, Casket.Card[ActionCardNumber].ArtifactCardProperties.Cost[1], Casket.Card[ActionCardNumber].ArtifactCardProperties.Cost[2]];
					} else {
						AlertSystemError("Parameter mismatch in function ReadOriginalCost. Card #" + ActionCardNumber + " is not an artifact card.");
					}
					break;
				case "SupportCard":
					if(Casket.Card[ActionCardNumber].BasicProperties.Type == "SupportCard") {
						return [0, Casket.Card[ActionCardNumber].SupportCardProperties.Cost[1], Casket.Card[ActionCardNumber].SupportCardProperties.Cost[2]];
					} else {
						AlertSystemError("Parameter mismatch in function ReadOriginalCost. Card #" + ActionCardNumber + " is not a support card.");
					}
					break;
				case "EventCard":
					switch(Casket.Card[ActionCardNumber].BasicProperties.Type) {
						case "EventCard":
							return [0, Casket.Card[ActionCardNumber].EventCardProperties.Cost[1], Casket.Card[ActionCardNumber].EventCardProperties.Cost[2]];
						case "CharacterCard":
							if(Casket.Card[ActionCardNumber].CharacterCardProperties.HasAffiliatedCard == true && Casket.Card[ActionCardNumber].AffiliatedCard.Type == "EventCard") {
								return [0, Casket.Card[ActionCardNumber].AffiliatedCard.Cost[1], Casket.Card[ActionCardNumber].AffiliatedCard.Cost[2]];
							} else {
								AlertSystemError("Player's action card #" + ActionCardNumber + " \"" + Casket.Card[ActionCardNumber].BasicProperties.ID + "\" is invalid. It is a character card ID, but the specified character card does not have an affiliated card of event card type.");
							}
							break;
						default:
							AlertSystemError("Parameter mismatch in function ReadOriginalCost. Card #" + ActionCardNumber + " is not an event card.");
							break;
					}
					break;
				default:
					AlertSystemError("The value of ActionType \"" + ActionType + "\" in function ReadOriginalCost is invalid.");
					break;
			}
		}
		function ReadCost(PlayerOrOpponent, ActionType, ActionCardNumber) {
			let Cost = ReadOriginalCost(PlayerOrOpponent, ActionType, ActionCardNumber);
			if(Cost[2] == "Unknown") {
				return Cost;
			}
			for(let Looper = 1; Looper < Game.Status[PlayerOrOpponent].CostAdjustment.length; Looper++) {
				if(Game.Status[PlayerOrOpponent].CostAdjustment[Looper].ActionType == ActionType) {
					switch(Game.Status[PlayerOrOpponent].CostAdjustment[Looper].ElementType) {
						case "Any":
							if(Cost[3] != undefined) {
								switch(Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator) {
									case "Plus":
										Cost[3] += Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										break;
									case "Subtract":
										Cost[3] -= Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										if(Cost[3] < 0) {
											Cost[1] += Cost[3];
											if(Cost[1] < 0) {
												Cost[1] = 0;
											}
											Cost[3] = 0;
										}
										break;
									default:
										AlertSystemError("The value of Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator \"" + Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator + "\" in function ReadCost is invalid.");
										break;
								}
							} else {
								switch(Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator) {
									case "Plus":
										Cost[1] += Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										break;
									case "Subtract":
										Cost[1] -= Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										if(Cost[1] < 0) {
											Cost[1] = 0;
										}
										break;
									default:
										AlertSystemError("The value of Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator \"" + Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator + "\" in function ReadCost is invalid.");
										break;
								}
							}
							break;
						case "Unaligned":
							if(Cost[3] != undefined && Cost[2] != "Unaligned") {
								switch(Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator) {
									case "Plus":
										Cost[3] += Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										break;
									case "Subtract":
										Cost[3] -= Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										if(Cost[3] < 0) {
											Cost[3] = 0;
										}
										break;
									default:
										AlertSystemError("The value of Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator \"" + Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator + "\" in function ReadCost is invalid.");
										break;
								}
							} else {
								if(Cost[2] == "Unaligned") {
									switch(Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator) {
										case "Plus":
											Cost[1] += Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
											break;
										case "Subtract":
											Cost[1] -= Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
											if(Cost[1] < 0) {
												Cost[1] = 0;
											}
											break;
										default:
											AlertSystemError("The value of Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator \"" + Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator + "\" in function ReadCost is invalid.");
											break;
									}
								}
							}
							break;
						case "Pyro":
						case "Hydro":
						case "Anemo":
						case "Electro":
						case "Dendro":
						case "Cryo":
						case "Geo":
							if(Cost[2] == Game.Status[PlayerOrOpponent].CostAdjustment[Looper].ElementType) {
								switch(Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator) {
									case "Plus":
										Cost[1] += Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										break;
									case "Subtract":
										Cost[1] -= Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Quantity;
										if(Cost[1] < 0) {
											Cost[1] = 0;
										}
										break;
									default:
										AlertSystemError("The value of Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator \"" + Game.Status[PlayerOrOpponent].CostAdjustment[Looper].Operator + "\" in function ReadCost is invalid.");
										break;
								}
							}
							break;
						default:
							AlertSystemError("The value of Game.Status[PlayerOrOpponent].CostAdjustment[Looper].ElementType \"" + Game.Status[PlayerOrOpponent].CostAdjustment[Looper].ElementType + "\" in function ReadCost is invalid.");
							break;
					}
				}
			}
			return Cost;
		}
		function IsDiceAdequate(PlayerOrOpponent, ActionType, ActionCardNumber) {
			// Initialization
			let Cost = ReadCost(PlayerOrOpponent, ActionType, ActionCardNumber),
			Dice = {
				Total: 0,
				Omni: 0, Pyro: 0, Hydro: 0, Anemo: 0, Electro: 0, Dendro: 0, Cryo: 0, Geo: 0
			};
			if(Cost[3] == undefined) {
				Cost[3] = 0;
			}

			// Count dice
			for(let Looper = 1; Looper <= 12; Looper++) {
				if(Game.Status[PlayerOrOpponent].Dice[Looper].Position == "OnTable") {
					Dice.Total++;
					Dice[Game.Status[PlayerOrOpponent].Dice[Looper].Type]++;
				}
			}

			// Check if adequate
			if(Dice.Total >= Cost[1] + Cost[3]) {
				switch(Cost[2]) {
					case "Matching":
						switch(true) {
							case Dice.Omni + Dice.Pyro >= Cost[1]:
							case Dice.Omni + Dice.Hydro >= Cost[1]:
							case Dice.Omni + Dice.Anemo >= Cost[1]:
							case Dice.Omni + Dice.Electro >= Cost[1]:
							case Dice.Omni + Dice.Dendro >= Cost[1]:
							case Dice.Omni + Dice.Cryo >= Cost[1]:
							case Dice.Omni + Dice.Geo >= Cost[1]:
								return true;
							default:
								return false;
						}
					case "Unaligned":
						return true;
					case "Pyro":
					case "Hydro":
					case "Anemo":
					case "Electro":
					case "Dendro":
					case "Cryo":
					case "Geo":
						return Dice.Omni + Dice[Cost[2]] >= Cost[1];
					default:
						AlertSystemError("The value of Cost[2] \"" + Cost[2] + "\" in function IsDiceAdequate is invalid.");
						break;
				}
			} else {
				return false;
			}
		}
		function AutoSelectDice(PlayerOrOpponent, ActionType, ActionCardNumber) {
			if(IsDiceAdequate(PlayerOrOpponent, ActionType, ActionCardNumber) == true) {
				let Cost = ReadCost(PlayerOrOpponent, ActionType, ActionCardNumber);
				// ???
			} else {
				ShowToast("骰子不足");
			}
		}
		function IsSelectedDiceMatchingCost(PlayerOrOpponent, ActionType, ActionCardNumber) {
			// Initialization
			let Cost = ReadCost(PlayerOrOpponent, ActionType, ActionCardNumber),
			Dice = {
				Total: 0,
				Omni: 0, Pyro: 0, Hydro: 0, Anemo: 0, Electro: 0, Dendro: 0, Cryo: 0, Geo: 0
			};
			if(Cost[3] == undefined) {
				Cost[3] = 0;
			}

			// Count selected dice
			for(let Looper = 1; Looper <= 12; Looper++) {
				if(Game.Status[PlayerOrOpponent].Dice[Looper].Position == "OnTable" && Game0.Selection.Dice[Looper] == true) {
					Dice.Total++;
					Dice[Game.Status[PlayerOrOpponent].Dice[Looper].Type]++;
				}
			}

			// Check if matching
			if(Dice.Total == Cost[1] + Cost[3]) {
				switch(Cost[2]) {
					case "Matching":
						switch(true) {
							case Dice.Omni + Dice.Pyro >= Cost[1]:
							case Dice.Omni + Dice.Hydro >= Cost[1]:
							case Dice.Omni + Dice.Anemo >= Cost[1]:
							case Dice.Omni + Dice.Electro >= Cost[1]:
							case Dice.Omni + Dice.Dendro >= Cost[1]:
							case Dice.Omni + Dice.Cryo >= Cost[1]:
							case Dice.Omni + Dice.Geo >= Cost[1]:
								return true;
							default:
								return false;
						}
					case "Unaligned":
						return true;
					case "Pyro":
					case "Hydro":
					case "Anemo":
					case "Electro":
					case "Dendro":
					case "Cryo":
					case "Geo":
						return Dice.Omni + Dice[Cost[2]] >= Cost[1];
					default:
						AlertSystemError("The value of Cost[2] \"" + Cost[2] + "\" in function IsDiceAdequate is invalid.");
						break;
				}
			} else {
				return false;
			}
		}
		function ShowSkillIndicator(CardNumber, SkillType) {
			if(Casket.Card[CardNumber].BasicProperties.Type == "CharacterCard") {
				// Phase 1
				ChangeImage("Image_GameSkillIndicator", Casket.Card[CardNumber].BasicProperties.Image);
				ChangeText("Label_GameSkillIndicatorType", Translate(SkillType));
				ChangeText("Label_GameSkillIndicatorName", Casket.Card[CardNumber][SkillType].Name);
				ChangeAnim("ScreenFilter_GameSkillIndicator", "none");
				ChangeAnim("Ctrl_GameSkillIndicatorImage", "none");
				ChangeAnim("Ctrl_GameSkillIndicatorType", "none");
				ChangeAnim("Ctrl_GameSkillIndicatorName", "none");
				Fade("ScreenFilter_GameSkillIndicator");
				Fade("Ctrl_GameSkillIndicatorImage");
				Fade("Ctrl_GameSkillIndicatorType");
				Fade("Ctrl_GameSkillIndicatorName");
				ChangeScale("Ctrl_GameSkillIndicatorImage", 3);
				ChangeRight("Ctrl_GameSkillIndicatorType", "calc(50% - 225px)");
				ChangeLeft("Ctrl_GameSkillIndicatorName", "calc(50% - 220px)");
				PlayAudio("Audio_Sound", "audio/SkillIndicator.mp3");

				// Phase 2
				if(System.Display.Anim > 0) {
					setTimeout(function() {
						ChangeAnim("ScreenFilter_GameSkillIndicator", "500ms");
						ChangeAnim("Ctrl_GameSkillIndicatorImage", "500ms");
						ChangeAnim("Ctrl_GameSkillIndicatorType", "500ms");
						ChangeAnim("Ctrl_GameSkillIndicatorName", "500ms");
						Show("ScreenFilter_GameSkillIndicator");
						Show("Ctrl_GameSkillIndicatorImage");
						Show("Ctrl_GameSkillIndicatorType");
						Show("Ctrl_GameSkillIndicatorName");
						ChangeScale("Ctrl_GameSkillIndicatorImage", "");
						ChangeRight("Ctrl_GameSkillIndicatorType", "");
						ChangeLeft("Ctrl_GameSkillIndicatorName", "");
					}, 20);
				} else {
					setTimeout(function() {
						ChangeAnim("ScreenFilter_GameSkillIndicator", "none");
						ChangeAnim("Ctrl_GameSkillIndicatorImage", "none");
						ChangeAnim("Ctrl_GameSkillIndicatorType", "none");
						ChangeAnim("Ctrl_GameSkillIndicatorName", "none");
						Show("ScreenFilter_GameSkillIndicator");
						Show("Ctrl_GameSkillIndicatorImage");
						Show("Ctrl_GameSkillIndicatorType");
						Show("Ctrl_GameSkillIndicatorName");
						ChangeScale("Ctrl_GameSkillIndicatorImage", "");
						ChangeRight("Ctrl_GameSkillIndicatorType", "");
						ChangeLeft("Ctrl_GameSkillIndicatorName", "");
					}, 20);
				}

				// Phase 3
				if(System.Display.Anim > 0) {
					setTimeout(function() {
						ChangeAnim("ScreenFilter_GameSkillIndicator", "");
						ChangeAnim("Ctrl_GameSkillIndicatorImage", "");
						ChangeAnim("Ctrl_GameSkillIndicatorType", System.Display.Anim * 3 + "ms");
						ChangeAnim("Ctrl_GameSkillIndicatorName", System.Display.Anim * 3 + "ms");
						Fade("ScreenFilter_GameSkillIndicator");
						Fade("Ctrl_GameSkillIndicatorImage");
						Fade("Ctrl_GameSkillIndicatorType");
						Fade("Ctrl_GameSkillIndicatorName");
						ChangeScale("Ctrl_GameSkillIndicatorImage", 0.5);
						ChangeRight("Ctrl_GameSkillIndicatorType", "calc(50% + 175px)");
						ChangeLeft("Ctrl_GameSkillIndicatorName", "calc(50% + 180px)");
					}, 790);
				} else {
					setTimeout(function() {
						ChangeAnim("ScreenFilter_GameSkillIndicator", "");
						ChangeAnim("Ctrl_GameSkillIndicatorImage", "");
						ChangeAnim("Ctrl_GameSkillIndicatorType", "none");
						ChangeAnim("Ctrl_GameSkillIndicatorName", "none");
						Fade("ScreenFilter_GameSkillIndicator");
						Fade("Ctrl_GameSkillIndicatorImage");
						Fade("Ctrl_GameSkillIndicatorType");
						Fade("Ctrl_GameSkillIndicatorName");
						ChangeScale("Ctrl_GameSkillIndicatorImage", 0.5);
						ChangeRight("Ctrl_GameSkillIndicatorType", "calc(50% + 175px)");
						ChangeLeft("Ctrl_GameSkillIndicatorName", "calc(50% + 180px)");
					}, 1040);
				}
			} else {
				AlertSystemError("Function ShowSkillIndicator received a card which is not a character card.");
			}
		}
		function FlashOnHighDamage() {
			// ???
		}

		// End phase
		// ???
