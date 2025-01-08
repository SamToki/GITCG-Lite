// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// © 2024 SAM TOKI STUDIO

// Reminders
	// About card ID
		// Reserved IDs:
		// "NewCharacterCard", "NewActionCard",
		// "UnknownCard", "EmptyCharacterCard", "EmptyActionCard", "EmptyComplementCard", ??? more...,
		// "???".
		// Duplicate IDs are prohibited.

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CurrentVersion = 0.45;
		var Game0 = {
			Options: {
				TransparentOperationPanel: false
			},
			Load: {
				StartTime: 0,
				Progress: 0, // Full is 622.
				IsPaused: false
			},
			Stats: {
				Player: {
					HPDisplay: [0, 0, 0, 0]
				},
				Opponent: {
					HPDisplay: [0, 0, 0, 0]
				}
			},
			Selection: {
				Action: {
					Type: "", Number: 0
				},
				RecommendedAction: {
					Type: "", Number: 0
				},
					// Type: CharacterCard, SummonsCard, ActionCard, Tuning,
					//       NormalAttack, ElementalSkill, SecondaryElementalSkill, ElementalBurst,
					//       EndAction.
				StartingHand: [0, false, false, false, false, false],
				CardInHand: 0,
				Dice: [0, false, false, false, false, false, false, false, false, false, false, false, false],
				DiscardEnemyObject: {
					Type: "", Number: 0
				}
					// Type: CharacterCard, SummonsCard, ActionCard, Dice.
			},
			RollDice: {
				IsRolling: false,
				Progress: 0
			},
			Preview: {
				Player: {
					Element: [0, "", "", ""],
					Reaction: [0, "", "", ""],
					Damage: [
						0,
						{Type: "", Amount: 0},
						{Type: "", Amount: 0},
						{Type: "", Amount: 0}
					],
					SummonsCard: [0]
				},
				Opponent: {
					Element: [0, "", "", ""],
					Reaction: [0, "", "", ""],
					Damage: [
						0,
						{Type: "", Amount: 0},
						{Type: "", Amount: 0},
						{Type: "", Amount: 0}
					],
					SummonsCard: [0]
				}
			}
		},
		Editor = {
			CardNumber: 0
		};
		Interaction.Deletion = 0;
		Automation.ClockGame = null;
		Automation.RollDice = null;
		Automation.RefreshAction = null;
		Automation.FlashOnHighDamage = null;
		Automation.RecommendAction = null;
		Automation.FadeNameOnCards = null;
		Automation.FadeSpokenLine = {
			Player: null, Opponent: null
		};
		Automation.HideInfoWindow = null;

		// Saved
		var Subsystem = {
			Display: {
				NameOnCard: "ShowOnHover", HPCautionThreshold: 40,
				InfoWindow: "ShowOnHover", ShowInfoWindowWhenOpponentActs: true, AlsoShowInfoWindowInCasket: true,
				ColorBlindMode: false,
				SkillIndicator: "ShowOnElementalBurstOnly", ShowSpokenLines: true,
				FlashOnHighDamage: false
			},
			Audio: {
				SoundVolume: 100, VoiceVolume: 40
			},
			Dev: {
				Cheat: false
			}
		},
		Game = {
			SavedGames: [0],
			Options: {
				LetOpponentActFirstAtBeginning: false,
				ShowOpponentDiceContent: true,
				ShowRecommendedActionAfterIdlingFor30Sec: true,
				MakeOpponentActSlowly: false
			},
			Status: {
				Operation: "Title",
					// Title, Loading, Table,
					// StartingHand, RollPhase, SwitchCharacter, UseSkill, PlayActionCard, PlayActionCardWithObjectSelection, Tuning, GameOver.
				Round: 0,
					// 0: Title or Loading.
					// -1: Initialization.
				Phase: [0, "", ""],
					// 1: Initialization,
					//    StartingHand, InitialCharacter,
					//    RollPhase, ActionPhase, EndPhase.
					// 2: Initialization,
					//    Beginning, BeforeStandby, Standby, Working (Sequence?),
					//    BeforeCombatAction, CombatAction, AfterCombatAction.
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
						{ID: "", Sequence: 1, Duration: 0}, // And more properties such as counter...
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0},
						{ID: "", Sequence: 1, Duration: 0}
					],
					ActionCard: [
						0,
						{ID: "", Position: "OffTable"}, // And more properties such as sequence, duration, counter...
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
						// InTurn, Standby, EndedAction.
					ActionUsed: { // Stats within the round. Reset at round beginning.
						CharacterCard: 0,
						NormalAttack: 0, ElementalSkill: 0, ElementalBurst: 0,
						TalentCard: 0, WeaponCard: 0, ArtifactCard: 0, SupportCard: 0, EventCard: 0,
						DrawCard: 0
					},
					CostAdjustment: [
						0
						// {ActionType, ElementType, Operator, Quantity}
						// ActionType: CharacterCard,
						//             NormalAttack, ElementalSkill, SecondaryElementalSkill, ElementalBurst,
						//             TalentCard, WeaponCard, ArtifactCard, SupportCard, EventCard.
					],
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
					CostAdjustment: [
						0
					],
					Critical: {
						RatePercentage: 5, Damage: 10
					}
				},
				Action: {
					IsCombatAction: false,
					Queue: [
						0
						/* {
							Master: {
								PlayerOrOpponent: "Player", CardNumber: 0
							},
							Type: [0, "", ""],
								// 1: CharacterCard,
								//    EnemyCharacterCard,
								//    NormalAttack,
								//    ElementalSkill,
								//    ElementalBurst,
								//    PlayCard.
								// 2: NormalAttack, ChargedAttack, PlungingAttack,
								//    ElementalSkill, SecondaryElementalSkill,
								//    TalentCard, WeaponCard, ArtifactCard, SupportCard, EventCard.
							Infusion: "",
							Execution: [
								0
								// [0, Manipulation, Value1, Value2, ...]
								// e.g. #1 Damage, Enemy, Active, Electro, 40.
								//      #2 Damage, Enemy, Standby, Piercing, 30.
								//      #3 Heal, Self, Active, 20.
								//      #4 SwitchCharacter, Self, Next.
							]
						} */
					],
					CardPlayed: ""
				},
				Master: {
					PlayerOrOpponent: "Player", CardNumber: 0
				}
			},
			InitialStatus: {}
		};
		// Built-in casket initialization is in "script_BuiltinCasket.js".

	// Load
	window.onload = Load();
	function Load() {
		// User data
		if(localStorage.System != undefined) {
			System = JSON.parse(localStorage.getItem("System"));
		}
		switch(System.I18n.Language) {
			case "Auto":
				/* navigator.language ... */
				break;
			case "en-US":
				/* ChangeCursorOverall("wait");
				window.location.replace("index_" + System.I18n.Language + ".html"); */
				ShowDialog("System_LanguageUnsupported",
					"Caution",
					"<span lang=\"en-US\">Sorry, this webpage currently does not support English (US).</span>",
					"", "", "", "<span lang=\"en-US\">OK</span>");
				break;
			case "ja-JP":
				ShowDialog("System_LanguageUnsupported",
					"Caution",
					"<span lang=\"ja-JP\">すみません。このページは日本語にまだサポートしていません。</span>",
					"", "", "", "<span lang=\"ja-JP\">OK</span>");
				break;
			case "zh-CN":
				break;
			case "zh-TW":
				ShowDialog("System_LanguageUnsupported",
					"Caution",
					"<span lang=\"zh-TW\">抱歉，本網頁暫不支援繁體中文。</span>",
					"", "", "", "<span lang=\"zh-TW\">確定</span>");
				break;
			default:
				AlertSystemError("The value of System.I18n.Language \"" + System.I18n.Language + "\" in function Load is invalid.");
				break;
		}
		if(System.Version.GITCGLite != undefined) {
			if(Math.trunc(CurrentVersion) - Math.trunc(System.Version.GITCGLite) >= 1) {
				ShowDialog("System_MajorUpdateDetected",
					"Info",
					"检测到大版本更新。若您继续使用旧版本的用户数据，则有可能发生兼容性问题。敬请留意。",
					"", "", "", "确定");
				System.Version.GITCGLite = CurrentVersion;
			}
		} else {
			System.Version.GITCGLite = CurrentVersion;
		}
		if(localStorage.GITCGLite_Subsystem != undefined) {
			Subsystem = JSON.parse(localStorage.getItem("GITCGLite_Subsystem"));
		}
		if(localStorage.GITCGLite_Game != undefined) {
			Game = JSON.parse(localStorage.getItem("GITCGLite_Game"));
			if(Game.Status.Operation == "Loading") {
				Game.Status.Operation = "Title";
			}
		}
		if(localStorage.GITCGLite_Casket != undefined) {
			Casket = JSON.parse(localStorage.getItem("GITCGLite_Casket"));
		}

		// Refresh
		ChangeValue("Textbox_CasketDecksFilter", "");
		ChangeValue("Textbox_CasketCharacterCardsFilter", "");
		ChangeValue("Textbox_CasketActionCardsFilter", "");
		ChangeValue("Textbox_CasketImport", "");
		ChangeValue("Textbox_EditorOpen", "");
		RefreshSystem();
		RefreshSubsystem();
		RefreshGame();
		RefreshCasket();
		RefreshEditor();

		// PWA
		navigator.serviceWorker.register("script_ServiceWorker.js").then(function(ServiceWorkerRegistration) {
			// Detect update (https://stackoverflow.com/a/41896649)
			ServiceWorkerRegistration.addEventListener("updatefound", function() {
				const ServiceWorkerInstallation = ServiceWorkerRegistration.installing;
				ServiceWorkerInstallation.addEventListener("statechange", function() {
					if(ServiceWorkerInstallation.state == "installed" && navigator.serviceWorker.controller != null) {
						Show("Label_HelpPWANewVersionReady");
						ShowDialog("System_PWANewVersionReady",
							"Info",
							"新版本已就绪，将在下次启动时生效。",
							"", "", "", "确定");
					}
				});
			});

			// Read service worker status (https://github.com/GoogleChrome/samples/blob/gh-pages/service-worker/registration-events/index.html)
			switch(true) {
				case ServiceWorkerRegistration.installing != null:
					ChangeText("Label_SettingsPWAServiceWorkerRegistration", "等待生效");
					break;
				case ServiceWorkerRegistration.waiting != null:
					ChangeText("Label_SettingsPWAServiceWorkerRegistration", "等待更新");
					Show("Label_HelpPWANewVersionReady");
					ShowDialog("System_PWANewVersionReady",
						"Info",
						"新版本已就绪，将在下次启动时生效。",
						"", "", "", "确定");
					break;
				case ServiceWorkerRegistration.active != null:
					ChangeText("Label_SettingsPWAServiceWorkerRegistration", "已生效");
					break;
				default:
					break;
			}
			if(navigator.serviceWorker.controller != null) {
				ChangeText("Label_SettingsPWAServiceWorkerController", "已生效");
			} else {
				ChangeText("Label_SettingsPWAServiceWorkerController", "未生效");
			}
		});

		// Ready
		setTimeout(HideToast, 0);
	}

// Simplifications
	// Read
		// Class
		function ReadSequence(ID) {
			for(let Looper = 1; Looper <= 12; Looper++) {
				if(IsClassContained(ID, "Sequence" + Looper) == true) {
					return Looper;
				}
			}
			AlertSystemError("Function ReadSequence received an element \"" + ID + "\" with an invalid sequence.");
		}

	// Write
		// Class
		function ChangeActionCardType(ID, Value) {
			if(IsClassContained(ID, "Card") == true && IsClassContained(ID, "Action") == true) {
				RemoveClass(ID, "Talent");
				RemoveClass(ID, "Weapon");
				RemoveClass(ID, "Artifact");
				RemoveClass(ID, "Support");
				RemoveClass(ID, "Event");
				AddClass(ID, Value);
			} else {
				AlertSystemError("Function ChangeActionCardType received an element \"" + ID + "\" without class Card and Action.");
			}
		}
		function ChangeCardPosition(ID, Value) {
			if(IsClassContained(ID, "Card") == true) {
				RemoveClass(ID, "OnTitleScreen");
				RemoveClass(ID, "OffTable");
				RemoveClass(ID, "InStartingHand");
				RemoveClass(ID, "InHand");
				RemoveClass(ID, "InAnnouncement");
				RemoveClass(ID, "OnTable");
				RemoveClass(ID, "Discarded");
				AddClass(ID, Value);
				if(Value != "OffTable" && Value != "Discarded") {
					ChangeInert(ID, false);
				} else {
					ChangeInert(ID, true);
				}
			} else {
				AlertSystemError("Function ChangeCardPosition received an element \"" + ID + "\" without class Card.");
			}
		}
		function ChangeDicePosition(ID, Value) {
			if(IsClassContained(ID, "Dice") == true) {
				RemoveClass(ID, "OffTable");
				RemoveClass(ID, "OnRolling");
				RemoveClass(ID, "OnTable");
				AddClass(ID, Value);
				if(Value != "OffTable") {
					ChangeInert(ID, false);
				} else {
					ChangeInert(ID, true);
				}
			} else {
				AlertSystemError("Function ChangeDicePosition received an element \"" + ID + "\" without class Dice.");
			}
		}
		function ChangeSequence(ID, Value) {
			if(Value >= 1 && Value <= 12) {
				for(let Looper = 1; Looper <= 12; Looper++) {
					RemoveClass(ID, "Sequence" + Looper);
				}
				AddClass(ID, "Sequence" + Value);
			} else {
				AlertSystemError("The value of Value \"" + Value + "\" in function ChangeSequence is invalid.");
			}
		}
		function ChangeElement(ID, Value) {
			RemoveClass(ID, "Unknown");
			RemoveClass(ID, "Matching");
			RemoveClass(ID, "Unaligned");
			RemoveClass(ID, "Omni");
			RemoveClass(ID, "Physical");
			RemoveClass(ID, "Pyro");
			RemoveClass(ID, "Hydro");
			RemoveClass(ID, "Anemo");
			RemoveClass(ID, "Electro");
			RemoveClass(ID, "Dendro");
			RemoveClass(ID, "Cryo");
			RemoveClass(ID, "Geo");
			RemoveClass(ID, "Heal");
			AddClass(ID, Value);
		}

// Refresh
	// Webpage
	function RefreshWebpage() {
		ShowDialog("System_RefreshingWebpage",
			"Info",
			"正在刷新网页...",
			"", "", "", "确定");
		ChangeCursorOverall("wait");
		window.location.reload();
	}

	// System
	function RefreshSystem() {
		// Topbar
		if(IsMobileLayout() == false) {
			HideHorizontally("Button_Nav");
			ChangeInert("DropctrlGroup_Nav", false);
		} else {
			Show("Button_Nav");
			ChangeInert("DropctrlGroup_Nav", true);
		}

		// Fullscreen
		if(IsFullscreen() == false) {
			Show("Topbar");
			Show("Ctrl_GameConfigureDeck");
			ChangeText("Button_GameToggleFullscreen", "全屏");
			Show("Dropctrl_GameSavedGames");
		} else {
			Hide("Topbar");
			Hide("Ctrl_GameConfigureDeck");
			ChangeText("Button_GameToggleFullscreen", "退出全屏");
			Hide("Dropctrl_GameSavedGames");
		}

		// Settings
			// Display
			if(window.matchMedia("(prefers-contrast: more)").matches == false) {
				ChangeDisabled("Combobox_SettingsTheme", false);
			} else {
				System.Display.Theme = "HighContrast";
				ChangeDisabled("Combobox_SettingsTheme", true);
			}
			ChangeValue("Combobox_SettingsTheme", System.Display.Theme);
			switch(System.Display.Theme) {
				case "Auto":
					ChangeLink("ThemeVariant_Common", "../styles/common_Dark.css");
					ChangeMediaCondition("ThemeVariant_Common", "(prefers-color-scheme: dark)");
					ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", "(prefers-color-scheme: dark)");
					break;
				case "Light":
					ChangeLink("ThemeVariant_Common", "");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "Dark":
					ChangeLink("ThemeVariant_Common", "../styles/common_Dark.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "Genshin":
					ChangeLink("ThemeVariant_Common", "../styles/common_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "HighContrast":
					ChangeLink("ThemeVariant_Common", "../styles/common_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				default:
					AlertSystemError("The value of System.Display.Theme \"" + System.Display.Theme + "\" in function RefreshSystem is invalid.");
					break;
			}
			if(System.Display.Theme != "HighContrast") {
				ChangeDisabled("Checkbox_SettingsColorBlindMode", false);
			} else { // Force color blind mode on high contrast theme.
				Subsystem.Display.ColorBlindMode = true;
				ChangeDisabled("Checkbox_SettingsColorBlindMode", true);
				RefreshSubsystem();
				RefreshGame();
			}
			ChangeValue("Combobox_SettingsCursor", System.Display.Cursor);
			switch(System.Display.Cursor) {
				case "Default":
					ChangeCursorOverall("");
					break;
				case "BTRAhoge":
				case "Genshin":
				case "GenshinFurina":
				case "GenshinNahida":
					ChangeCursorOverall("url(../cursors/" + System.Display.Cursor + ".cur), auto");
					break;
				default:
					AlertSystemError("The value of System.Display.Cursor \"" + System.Display.Cursor + "\" in function RefreshSystem is invalid.");
					break;
			}
			ChangeChecked("Checkbox_SettingsBlurBgImage", System.Display.BlurBgImage);
			if(System.Display.BlurBgImage == true) {
				AddClass("BgImage", "Blur");
			} else {
				RemoveClass("BgImage", "Blur");
			}
			ChangeValue("Combobox_SettingsHotkeyIndicators", System.Display.HotkeyIndicators);
			switch(System.Display.HotkeyIndicators) {
				case "Disabled":
					FadeHotkeyIndicators();
					break;
				case "ShowOnWrongKeyPress":
				case "ShowOnAnyKeyPress":
					break;
				case "AlwaysShow":
					ShowHotkeyIndicators();
					break;
				default:
					AlertSystemError("The value of System.Display.HotkeyIndicators \"" + System.Display.HotkeyIndicators + "\" in function RefreshSystem is invalid.");
					break;
			}
			if(window.matchMedia("(prefers-reduced-motion: reduce)").matches == false) {
				ChangeDisabled("Combobox_SettingsAnim", false);
			} else {
				System.Display.Anim = 0;
				ChangeDisabled("Combobox_SettingsAnim", true);
			}
			ChangeValue("Combobox_SettingsAnim", System.Display.Anim);
			ChangeAnimOverall(System.Display.Anim);

			// Audio
			ChangeChecked("Checkbox_SettingsPlayAudio", System.Audio.PlayAudio);
			if(System.Audio.PlayAudio == true) {
				Show("Ctrl_SettingsSoundVolume");
				Show("Ctrl_SettingsVoiceVolume");
				ChangeValue("Slider_SettingsSoundVolume", Subsystem.Audio.SoundVolume);
				if(Subsystem.Audio.SoundVolume > 0) {
					ChangeText("Label_SettingsSoundVolume", Subsystem.Audio.SoundVolume + "%");
				} else {
					ChangeText("Label_SettingsSoundVolume", "禁用");
				}
				ChangeVolume("Audio_Sound", Subsystem.Audio.SoundVolume);
				ChangeValue("Slider_SettingsVoiceVolume", Subsystem.Audio.VoiceVolume);
				if(Subsystem.Audio.VoiceVolume > 0) {
					ChangeText("Label_SettingsVoiceVolume", Subsystem.Audio.VoiceVolume + "%");
				} else {
					ChangeText("Label_SettingsVoiceVolume", "禁用");
				}
				ChangeVolume("Audio_VoicePlayer", Subsystem.Audio.VoiceVolume);
				ChangeVolume("Audio_VoiceOpponent", Subsystem.Audio.VoiceVolume);
			} else {
				StopAllAudio();
				Hide("Ctrl_SettingsSoundVolume");
				Hide("Ctrl_SettingsVoiceVolume");
			}

			// PWA
			if(window.matchMedia("(display-mode: standalone)").matches == true) {
				ChangeText("Label_SettingsPWAStandaloneDisplay", "是");
			} else {
				ChangeText("Label_SettingsPWAStandaloneDisplay", "否");
			}

			// Dev
			ChangeChecked("Checkbox_SettingsTryToOptimizePerformance", System.Dev.TryToOptimizePerformance);
			if(System.Dev.TryToOptimizePerformance == true) {
				AddClass("Html", "TryToOptimizePerformance");
			} else {
				RemoveClass("Html", "TryToOptimizePerformance");
			}
			ChangeChecked("Checkbox_SettingsShowDebugOutlines", System.Dev.ShowDebugOutlines);
			if(System.Dev.ShowDebugOutlines == true) {
				AddClass("Html", "ShowDebugOutlines");
			} else {
				RemoveClass("Html", "ShowDebugOutlines");
			}
			ChangeChecked("Checkbox_SettingsUseJapaneseGlyph", System.Dev.UseJapaneseGlyph);
			if(System.Dev.UseJapaneseGlyph == true) {
				ChangeLanguage("Html", "ja-JP");
			} else {
				ChangeLanguage("Html", "zh-CN");
			}
			ChangeValue("Textbox_SettingsFont", System.Dev.Font);
			ChangeFont("Html", System.Dev.Font);

			// User data
			ChangeValue("Textbox_SettingsUserDataImport", "");

		// Save user data
		localStorage.setItem("System", JSON.stringify(System));
	}
	function RefreshSubsystem() {
		// Settings
			// Display
			ChangeValue("Combobox_SettingsNameOnCard", Subsystem.Display.NameOnCard);
			switch(Subsystem.Display.NameOnCard) {
				case "Disabled":
				case "ShowOnHover":
					FadeNameOnCards();
					break;
				case "AlwaysShow":
					ShowNameOnCard(null, null, null); // Parameters not needed.
					break;
				default:
					AlertSystemError("The value of Subsystem.Display.NameOnCard \"" + Subsystem.Display.NameOnCard + "\" in function RefreshSubsystem is invalid.");
					break;
			}
			ChangeValue("Textbox_SettingsHPCautionThreshold", Subsystem.Display.HPCautionThreshold);
			ChangeValue("Combobox_SettingsInfoWindow", Subsystem.Display.InfoWindow);
			switch(Subsystem.Display.InfoWindow) {
				case "Disabled":
					HideInfoWindow();
					Hide("Ctrl_SettingsShowInfoWindowWhenOpponentActs");
					Hide("Ctrl_SettingsAlsoShowInfoWindowInCasket");
					break;
				case "ShowOnClick":
				case "ShowOnHover":
					Show("Ctrl_SettingsShowInfoWindowWhenOpponentActs");
					Show("Ctrl_SettingsAlsoShowInfoWindowInCasket");
					ChangeChecked("Checkbox_SettingsShowInfoWindowWhenOpponentActs", Subsystem.Display.ShowInfoWindowWhenOpponentActs);
					ChangeChecked("Checkbox_SettingsAlsoShowInfoWindowInCasket", Subsystem.Display.AlsoShowInfoWindowInCasket);
					break;
				case "AlwaysShow":
					ShowInfoWindow();
					Show("Ctrl_SettingsShowInfoWindowWhenOpponentActs");
					Show("Ctrl_SettingsAlsoShowInfoWindowInCasket");
					ChangeChecked("Checkbox_SettingsShowInfoWindowWhenOpponentActs", Subsystem.Display.ShowInfoWindowWhenOpponentActs);
					ChangeChecked("Checkbox_SettingsAlsoShowInfoWindowInCasket", Subsystem.Display.AlsoShowInfoWindowInCasket);
					break;
				default:
					AlertSystemError("The value of Subsystem.Display.InfoWindow \"" + Subsystem.Display.InfoWindow + "\" in function RefreshSubsystem is invalid.");
					break;
			}
			ChangeChecked("Checkbox_SettingsColorBlindMode", Subsystem.Display.ColorBlindMode);
			ChangeValue("Combobox_SettingsSkillIndicator", Subsystem.Display.SkillIndicator);
			ChangeChecked("Checkbox_SettingsShowSpokenLines", Subsystem.Display.ShowSpokenLines);
			if(Subsystem.Display.ShowSpokenLines == false) {
				FadeByClass("SpokenLine");
			}
			ChangeChecked("Checkbox_SettingsFlashOnHighDamage", Subsystem.Display.FlashOnHighDamage);

			// Audio
			if(System.Audio.PlayAudio == true) {
				ChangeValue("Slider_SettingsSoundVolume", Subsystem.Audio.SoundVolume);
				if(Subsystem.Audio.SoundVolume > 0) {
					ChangeText("Label_SettingsSoundVolume", Subsystem.Audio.SoundVolume + "%");
				} else {
					ChangeText("Label_SettingsSoundVolume", "禁用");
				}
				ChangeVolume("Audio_Sound", Subsystem.Audio.SoundVolume);
				ChangeValue("Slider_SettingsVoiceVolume", Subsystem.Audio.VoiceVolume);
				if(Subsystem.Audio.VoiceVolume > 0) {
					ChangeText("Label_SettingsVoiceVolume", Subsystem.Audio.VoiceVolume + "%");
				} else {
					ChangeText("Label_SettingsVoiceVolume", "禁用");
				}
				ChangeVolume("Audio_VoicePlayer", Subsystem.Audio.VoiceVolume);
				ChangeVolume("Audio_VoiceOpponent", Subsystem.Audio.VoiceVolume);
			}

			// Dev
			ChangeChecked("Checkbox_SettingsCheat", Subsystem.Dev.Cheat);
			if(Subsystem.Dev.Cheat == true) {
				AddClass("Html", "Cheat");
			} else {
				RemoveClass("Html", "Cheat");
			}

		// Save user data
		localStorage.setItem("GITCGLite_Subsystem", JSON.stringify(Subsystem));
	}

// Cmds
	// Settings
		// Saved Games
		function ImportSavedGame() {
			if(ReadValue("Textbox_SettingsImportSavedGame") != "") {
				if(ReadValue("Textbox_SettingsImportSavedGame").startsWith("{\"Name\":") == true) {
					Game.SavedGames[Game.SavedGames.length] = JSON.parse(ReadValue("Textbox_SettingsImportSavedGame"));
					ShowDialog("Game_SavedGameImported",
						"Question",
						"已导入存档。是否立即载入该存档？",
						"", "", "载入", "不要载入");
				} else {
					ShowDialog("System_JSONStringInvalid",
						"Error",
						"您键入的 JSON 字符串不合法。",
						"", "", "", "确定");
				}
				RefreshGame();
			}
		}
		function LoadSavedGame() {
			if(ReadValue("Combobox_SettingsSelectSavedGame") > 0) {
				Game.Status = Game.SavedGames[ReadValue("Combobox_SettingsSelectSavedGame")].Data;
				ScrollIntoView("Game");
				RefreshGame();
			} else {
				AlertSystemError("No saved game was selected when trying to load a saved game.");
			}
		}
		function ExportSavedGame() {
			if(ReadValue("Combobox_SettingsSelectSavedGame") > 0) {
				navigator.clipboard.writeText(JSON.stringify(Game.SavedGames[ReadValue("Combobox_SettingsSelectSavedGame")]));
				ShowDialog("Game_SavedGameExported",
					"Info",
					"已导出存档至剪贴板。",
					"", "", "", "确定");
			} else {
				AlertSystemError("No saved game was selected when trying to export a saved game.");
			}
		}
		function ConfirmDeleteSavedGame() {
			if(ReadValue("Combobox_SettingsSelectSavedGame") > 0) {
				ShowDialog("Game_ConfirmDeleteSavedGame",
					"Caution",
					"您确认要删除存档「" + Game.SavedGames[ReadValue("Combobox_SettingsSelectSavedGame")].Name + "」？",
					"", "", "删除", "取消");
			} else {
				AlertSystemError("No saved game was selected when trying to delete a saved game.");
			}
		}
		function SaveCurrentGame() {
			Game.SavedGames[Game.SavedGames.length] = {
				Name: ConvertEmptyName(Game.Status.Player.DeckProperties.Name) + " vs. " + ConvertEmptyName(Game.Status.Opponent.DeckProperties.Name) + " (" + new Date(Date.now()).toLocaleString(ReadLanguage("Html")) + ")",
				Data: structuredClone(Game.Status)
			};
			ShowToast("已保存");
			RefreshGame();
		}

		// Game
		function SetLetOpponentActFirstAtBeginning() {
			Game.Options.LetOpponentActFirstAtBeginning = IsChecked("Checkbox_SettingsLetOpponentActFirstAtBeginning");
			RefreshGame();
		}
		function SetShowOpponentDiceContent() {
			Game.Options.ShowOpponentDiceContent = IsChecked("Checkbox_SettingsShowOpponentDiceContent");
			RefreshGame();
		}
		function SetShowRecommendedActionAfterIdlingFor30Sec() {
			Game.Options.ShowRecommendedActionAfterIdlingFor30Sec = IsChecked("Checkbox_SettingsShowRecommendedActionAfterIdlingFor30Sec");
			RefreshGame();
		}
		function SetMakeOpponentActSlowly() {
			Game.Options.MakeOpponentActSlowly = IsChecked("Checkbox_SettingsMakeOpponentActSlowly");
			RefreshGame();
		}

		// Display
		function SetNameOnCard() {
			Subsystem.Display.NameOnCard = ReadValue("Combobox_SettingsNameOnCard");
			RefreshSubsystem();
		}
		function SetHPCautionThreshold() {
			Subsystem.Display.HPCautionThreshold = Math.trunc(ReadValue("Textbox_SettingsHPCautionThreshold"));
			if(Subsystem.Display.HPCautionThreshold < 0) {
				Subsystem.Display.HPCautionThreshold = 0;
			}
			if(Subsystem.Display.HPCautionThreshold > 60) {
				Subsystem.Display.HPCautionThreshold = 60;
			}
			RefreshSubsystem();
		}
		function SetInfoWindow() {
			Subsystem.Display.InfoWindow = ReadValue("Combobox_SettingsInfoWindow");
			RefreshSubsystem();
		}
		function SetShowInfoWindowWhenOpponentActs() {
			Subsystem.Display.ShowInfoWindowWhenOpponentActs = IsChecked("Checkbox_SettingsShowInfoWindowWhenOpponentActs");
			RefreshSubsystem();
		}
		function SetAlsoShowInfoWindowInCasket() {
			Subsystem.Display.AlsoShowInfoWindowInCasket = IsChecked("Checkbox_SettingsAlsoShowInfoWindowInCasket");
			RefreshSubsystem();
		}
		function SetColorBlindMode() {
			Subsystem.Display.ColorBlindMode = IsChecked("Checkbox_SettingsColorBlindMode");
			RefreshSubsystem();
			RefreshGame();
		}
		function SetSkillIndicator() {
			Subsystem.Display.SkillIndicator = ReadValue("Combobox_SettingsSkillIndicator");
			RefreshSubsystem();
		}
		function SetShowSpokenLines() {
			Subsystem.Display.ShowSpokenLines = IsChecked("Checkbox_SettingsShowSpokenLines");
			RefreshSubsystem();
		}
		function SetFlashOnHighDamage() {
			Subsystem.Display.FlashOnHighDamage = IsChecked("Checkbox_SettingsFlashOnHighDamage");
			RefreshSubsystem();
		}

		// Audio
		function SetSoundVolume() {
			Subsystem.Audio.SoundVolume = ReadValue("Slider_SettingsSoundVolume");
			RefreshSubsystem();
		}
		function PreviewSoundVolume() {
			PlayAudio("Audio_Sound", "../audio/Beep.mp3");
		}
		function SetVoiceVolume() {
			Subsystem.Audio.VoiceVolume = ReadValue("Slider_SettingsVoiceVolume");
			RefreshSubsystem();
		}
		function PreviewVoiceVolume() {
			PlayAudio("Audio_VoicePlayer", "audio/PreviewVoiceVolume.mp3");
		}

		// Misc
		function ResetAllDontShowAgainDialogs() {
			System.DontShowAgain = [0];
			RefreshSystem();
			ShowToast("已重置");
		}

		// Dev
		function SetCheat() {
			Subsystem.Dev.Cheat = IsChecked("Checkbox_SettingsCheat");
			if(Subsystem.Dev.Cheat == true) {
				ShowToast("You will have order.");
			}
			RefreshSubsystem();
			RefreshGame();
		}

		// User data
		function ImportUserData() {
			if(ReadValue("Textbox_SettingsUserDataImport") != "") {
				if(ReadValue("Textbox_SettingsUserDataImport").startsWith("{\"System\":{\"Display\":{\"Theme\":") == true) {
					let Objects = JSON.parse(ReadValue("Textbox_SettingsUserDataImport"));
					Object.keys(Objects).forEach(function(ObjectName) {
						localStorage.setItem(ObjectName, JSON.stringify(Objects[ObjectName]));
					});
					RefreshWebpage();
				} else {
					ShowDialog("System_JSONStringInvalid",
						"Error",
						"您键入的 JSON 字符串不合法。",
						"", "", "", "确定");
					RefreshSystem();
				}
			}
		}
		function ExportUserData() {
			navigator.clipboard.writeText("{" +
				"\"System\":" + JSON.stringify(System) + "," +
				"\"GITCGLite_Subsystem\":" + JSON.stringify(Subsystem) + "," +
				"\"GITCGLite_Game\":" + JSON.stringify(Game) + "," +
				"\"GITCGLite_Casket\":" + JSON.stringify(Casket) +
				"}");
			ShowDialog("System_UserDataExported",
				"Info",
				"已导出本网页的用户数据至剪贴板。",
				"", "", "", "确定");
		}
		function ConfirmClearUserData() {
			ShowDialog("System_ConfirmClearUserData",
				"Caution",
				"您确认要清空用户数据？",
				"", "", "清空", "取消");
		}

	// Dialog
	function AnswerDialog(Selector) {
		let DialogEvent = Interaction.Dialog[Interaction.Dialog.length - 1].Event;
		ShowDialog("Previous");
		switch(DialogEvent) {
			case "System_LanguageUnsupported":
			case "System_MajorUpdateDetected":
			case "System_PWANewVersionReady":
			case "System_RefreshingWebpage":
			case "System_JSONStringInvalid":
			case "System_UserDataExported":
			case "Game_LoadingError":
			// ??? more...
			case "Game_GameFunctionError":
			case "Game_SavedGameExported":
			case "Game_WishComplete":
			case "Casket_UnrecognizableCardDetected":
			case "Casket_ObjectsImported":
			case "Casket_ImportFailed":
			case "Casket_DeckLibraryExported":
			case "Casket_CardLibraryExported":
			case "Casket_CasketExported":
			case "Editor_CardNotFound":
			case "Editor_CardIDInvalid":
				switch(Selector) {
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "System_ConfirmGoToTutorial":
				switch(Selector) {
					case 2:
						ScrollIntoView("Item_HelpTutorial");
						ShowIAmHere("Item_HelpTutorial");
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "System_ConfirmClearUserData":
				switch(Selector) {
					case 2:
						localStorage.clear();
						RefreshWebpage();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "System_Error":
				switch(Selector) {
					case 2:
						ScrollIntoView("Item_SettingsUserData");
						ShowIAmHere("Item_SettingsUserData");
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Game_LoadingPaused":
				switch(Selector) {
					case 2:
						if(IsChecked("Checkbox_DialogCheckboxOption") == true) {
							System.DontShowAgain[System.DontShowAgain.length] = "GITCGLite_Game_LoadingPaused";
							RefreshSystem();
						}
						Game0.Load.IsPaused = false;
						Game0.Load.Progress += 2;
						break;
					case 3:
						ExitGame();
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Game_WindowLayoutImproper":
				switch(Selector) {
					case 3:
						if(IsChecked("Checkbox_DialogCheckboxOption") == true) {
							System.DontShowAgain[System.DontShowAgain.length] = "GITCGLite_Game_WindowLayoutImproper";
							RefreshSystem();
						}
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Game_ConfirmRestartGame":
				switch(Selector) {
					case 2:
						if(JSON.stringify(Game.InitialStatus).startsWith("{\"Operation\":") == true) {
							Game.Status = structuredClone(Game.InitialStatus);
							RefreshGame();
						} else {
							AlertSystemError("The value of Game.InitialStatus \"" + JSON.stringify(Game.InitialStatus) + "\" in function AnswerDialog is unexpectedly empty or corrupted.");
						}
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Game_ConfirmExitGame":
				switch(Selector) {
					case 2:
						ExitGame();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Game_ConfirmKnockDownOpponentCharacterCard":
				// ???
				break;
			case "Game_ConfirmDiscardOpponentSummonsCard":
				// ???
				break;
			case "Game_ConfirmDiscardOpponentActionCard":
				// ???
				break;
			case "Game_SavedGameImported":
				switch(Selector) {
					case 2:
						Game.Status = Game.SavedGames[Game.SavedGames.length - 1].Data;
						RefreshGame();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Game_ConfirmDeleteSavedGame":
				switch(Selector) {
					case 2:
						if(ReadValue("Combobox_SettingsSelectSavedGame") > 0) {
							Game.SavedGames.splice(ReadValue("Combobox_SettingsSelectSavedGame"), 1);
							RefreshGame();
						} else {
							AlertSystemError("No saved game was selected when trying to delete a saved game.");
						}
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Casket_DeckExported":
			case "Casket_CardExported":
				switch(Selector) {
					case 3:
						if(IsChecked("Checkbox_DialogCheckboxOption") == true) {
							System.DontShowAgain[System.DontShowAgain.length] = "GITCGLite_Casket_DeckExported";
							System.DontShowAgain[System.DontShowAgain.length] = "GITCGLite_Casket_CardExported";
							RefreshSystem();
						}
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Casket_ConfirmDeleteDeck":
				switch(Selector) {
					case 2:
						if(Casket.DeckSelection.Player >= Interaction.Deletion && Casket.DeckSelection.Player > 1) {
							Casket.DeckSelection.Player--;
						}
						if(Casket.DeckSelection.Opponent >= Interaction.Deletion && Casket.DeckSelection.Opponent > 1) {
							Casket.DeckSelection.Opponent--;
						}
						Casket.Deck.splice(Interaction.Deletion, 1);
						Interaction.Deletion = 0;
						RefreshGame();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Casket_ConfirmDeleteCard":
				switch(Selector) {
					case 2:
						if(Casket.DeckSelection.Player > 0) {
							for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection.length; Looper++) {
								if(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper] == Casket.Card[Interaction.Deletion].BasicProperties.ID) {
									Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection.splice(Looper, 1);
									break;
								}
							}
							for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection.length; Looper++) {
								if(Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection[Looper] == Casket.Card[Interaction.Deletion].BasicProperties.ID) {
									Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection.splice(Looper, 1);
									break;
								}
							}
						}
						if(Editor.CardNumber == Interaction.Deletion) {
							CloseCard();
						}
						Casket.Card.splice(Interaction.Deletion, 1);
						Interaction.Deletion = 0;
						RefreshGame();
						RefreshEditor();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Casket_ConfirmDeleteSelectedCharacterCards":
				switch(Selector) {
					case 2:
						for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection.length; Looper++) {
							if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper]) == Editor.CardNumber) {
								CloseCard();
							}
							if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper]) > 0) {
								Casket.Card.splice(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper]), 1);
							} else {
								AlertSystemError("Encountered unexpected card ID \"" + Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection[Looper] + "\" when batch deleting character cards.");
							}
						}
						Casket.Deck[Casket.DeckSelection.Player].CharacterCardSelection = [0];
						RefreshGame();
						RefreshEditor();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Casket_ConfirmDeleteSelectedActionCards":
				switch(Selector) {
					case 2:
						for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection.length; Looper++) {
							if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection[Looper]) == Editor.CardNumber) {
								CloseCard();
							}
							if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection[Looper]) > 0) {
								Casket.Card.splice(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection[Looper]), 1);
							} else {
								AlertSystemError("Encountered unexpected card ID \"" + Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection[Looper] + "\" when batch deleting action cards.");
							}
						}
						Casket.Deck[Casket.DeckSelection.Player].ActionCardSelection = [0];
						RefreshGame();
						RefreshEditor();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "Casket_ConfirmResetCasket":
				switch(Selector) {
					case 2:
						localStorage.removeItem("GITCGLite_Casket");
						RefreshWebpage();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			default:
				AlertSystemError("The value of DialogEvent \"" + DialogEvent + "\" in function AnswerDialog is invalid.");
				break;
		}
	}

// Listeners
	// On click (mouse left button, Enter key or Space key)
	document.addEventListener("click", function() {
		setTimeout(function() {
			FadeNameOnCards();
			HideInfoWindow();
		}, 0);
	});

	// On keyboard
	document.addEventListener("keydown", function(Hotkey) {
		if(Hotkey.key == "Escape") {
			HideInfoWindow();
			if(Interaction.Dialog.length <= 1) {
				CancelOperation();
			}
		}
		if(Hotkey.key == "F1") {
			ShowDialog("System_ConfirmGoToTutorial",
				"Question",
				"您按下了 F1 键。是否前往教程？",
				"", "", "前往", "取消");
			if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
				ShowHotkeyIndicators();
			}
		}
		if(document.activeElement.tagName.toLowerCase() != "input" && document.activeElement.tagName.toLowerCase() != "textarea") { // Prevent hotkey activation when inputing text etc.
			switch(Hotkey.key.toUpperCase()) {
				case "1":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "2":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "3":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "4":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "5":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "6":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "7":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "W":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "S":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "A":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "D":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "Q":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "E":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "R":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "F":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "T":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "Y":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "U":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "I":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "G":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "H":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "J":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "K":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "V":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "B":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "N":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "M":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "P":
					// ???
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				case "*":
					// Undocumented easter egg: Wish simulator
					let Pity = 0, Pity2 = 0, Is5050Won = false, CharacterName = "",
					Threshold = 0, LotteryNumber = 0;
					for(Pity = 1; Pity <= 90; Pity++) {
						// Calculate drop probability
						if(Pity <= 73) {
							Threshold = 60;
						} else {
							Threshold = 60 + (Pity - 73) / 17 * 9940;
						}

						// Roll
						LotteryNumber = Randomize(1, 10000);
						if(LotteryNumber <= Threshold) {
							LotteryNumber = Randomize(1, 2);
							if(LotteryNumber == 1) {
								// When miHoYo will listen to our feedback and actually improve Genshin Impact
								Is5050Won = true;
								ShowDialog("Game_WishComplete",
									"Info",
									"您于第" + Pity + "发抽中了限定五星角色。",
									"", "", "", "确定");
							} else {
								// When miHoYo will simply suck my ass
								Is5050Won = false;
								LotteryNumber = Randomize(1, 7);
								switch(LotteryNumber) {
									case 1:
										CharacterName = "刻晴";
										break;
									case 2:
										CharacterName = "迪卢克";
										break;
									case 3:
										CharacterName = "七七";
										break;
									case 4:
										CharacterName = "莫娜";
										break;
									case 5:
										CharacterName = "琴";
										break;
									case 6:
										CharacterName = "迪希雅";
										break;
									case 7:
										CharacterName = "提纳里";
										break;
									default:
										AlertSystemError("The value of LotteryNumber \"" + LotteryNumber + "\" in \"wish simulator\" is invalid.");
										break;
								}
							}
							break;
						}
					}
					if(Is5050Won == false) {
						for(Pity2 = 1; Pity2 <= 90; Pity2++) {
							// Calculate drop probability
							if(Pity2 <= 73) {
								Threshold = 60;
							} else {
								Threshold = 60 + (Pity2 - 73) / 17 * 9940;
							}

							// Roll
							LotteryNumber = Randomize(1, 10000);
							if(LotteryNumber <= Threshold) {
								ShowDialog("Game_WishComplete",
									"Info",
									"您于第" + Pity + "发抽中了「" + CharacterName + "」，然后于第" + Pity2 + "发抽中了限定五星角色。合计" + (Pity + Pity2) + "发。",
									"", "", "", "确定");
								break;
							}
						}
					}
					if(System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
				default:
					if((System.Display.HotkeyIndicators == "ShowOnWrongKeyPress" && IsWrongKeyNegligible(Hotkey.key) == false && Hotkey.key != "F1") ||
					System.Display.HotkeyIndicators == "ShowOnAnyKeyPress" || System.Display.HotkeyIndicators == "AlwaysShow") {
						ShowHotkeyIndicators();
					}
					break;
			}
		}
	});

	// On resizing window
	window.addEventListener("resize", RefreshCardsInHand);

// Features
	// Converters
	function ConvertEmptyName(Value) {
		if(Value != "") {
			return Value;
		} else {
			return "(未命名)";
		}
	}
	function ConvertEmptyData(Value) {
		if(Value != "") {
			return Value;
		} else {
			return "N/A";
		}
	}
	function ConvertCardTypeToNumber(CardType) {
		switch(CardType) {
			case "CharacterCard":
				return 1;
			case "SummonsCard":
				return 2;
			case "TalentCard":
				return 3;
			case "WeaponCard":
				return 4;
			case "ArtifactCard":
				return 5;
			case "SupportCard":
				return 6;
			case "EventCard":
				return 7;
			default:
				AlertSystemError("The value of CardType \"" + CardType + "\" in function ConvertCardTypeToNumber is invalid.");
				break;
		}
	}
	function ConvertElementTypeToNumber(ElementType) {
		switch(ElementType) {
			case "Unknown":
				return 1;
			case "Matching":
				return 2;
			case "Unaligned":
				return 3;
			case "Omni":
				return 4;
			case "Physical":
				return 5;
			case "Pyro":
				return 11;
			case "Hydro":
				return 12;
			case "Anemo":
				return 13;
			case "Electro":
				return 14;
			case "Dendro":
				return 15;
			case "Cryo":
				return 16;
			case "Geo":
				return 17;
			default:
				AlertSystemError("The value of ElementType \"" + ElementType + "\" in function ConvertElementTypeToNumber is invalid.");
				break;
		}
	}
	function ConvertElementTypeToAbbr(ElementType) {
		switch(ElementType) {
			case "Matching":
				return "同";
			case "Unaligned":
				return "任";
			// case "Omni":
			// 	return "万";
			// case "Physical":
			// 	return "物";
			case "Pyro":
				return "火";
			case "Hydro":
				return "水";
			case "Anemo":
				return "风";
			case "Electro":
				return "雷";
			case "Dendro":
				return "草";
			case "Cryo":
				return "冰";
			case "Geo":
				return "岩";
			default:
				AlertSystemError("The value of ElementType \"" + ElementType + "\" in function ConvertElementTypeToAbbr is invalid.");
				break;
		}
	}
	function ConvertElementTypeToIcon(ElementType) {
		if(ElementType != "Unknown") {
			return ReadText("Resource_" + ElementType + "Icon");
		} else {
			return "?";
		}
	}
	function ConvertNumberToElementType(Number) {
		switch(Number) {
			case 10:
				return "Omni";
			case 11:
				return "Pyro";
			case 12:
				return "Hydro";
			case 13:
				return "Anemo";
			case 14:
				return "Electro";
			case 15:
				return "Dendro";
			case 16:
				return "Cryo";
			case 17:
				return "Geo";
			default:
				AlertSystemError("The value of Number \"" + Number + "\" in function ConvertNumberToElementType is invalid.");
				break;
		}
	}
	function Translate(Value) {
		switch(Value) {
			case "CharacterCard":
				return "角色牌";
			case "SummonsCard":
				return "召唤物牌";
			case "TalentCard":
				return "天赋牌";
			case "WeaponCard":
				return "武器牌";
			case "ArtifactCard":
				return "圣遗物牌";
			case "SupportCard":
				return "支援牌";
			case "EventCard":
				return "事件牌";
			// case "Matching":
			// 	return "相同";
			// case "Unaligned":
			// 	return "任意";
			// case "Omni":
			// 	return "万能";
			// case "Physical":
			// 	return "物理";
			case "Pyro":
				return "火";
			case "Hydro":
				return "水";
			case "Anemo":
				return "风";
			case "Electro":
				return "雷";
			case "Dendro":
				return "草";
			case "Cryo":
				return "冰";
			case "Geo":
				return "岩";
			case "Vaporize":
				return "蒸发";
			case "Melt":
				return "融化";
			case "Overloaded":
				return "过载";
			case "Charged":
				return "触电";
			case "Superconduct":
				return "超导";
			case "Frozen":
				return "冻结";
			case "Burning":
				return "燃烧";
			case "Bloom":
				return "开花";
			case "Quicken":
				return "激化";
			case "Swirl":
				return "扩散";
			case "Crystallize":
				return "结晶";
			case "Sword":
				return "单手剑";
			case "Claymore":
				return "双手剑";
			case "Polearm":
				return "长柄武器";
			case "Catalyst":
				return "法器";
			case "Bow":
				return "弓";
			case "Main":
				return "主力";
			case "Support":
				return "辅助";
			case "NormalAttack":
				return "普通攻击";
			case "ElementalSkill":
				return "元素战技";
			case "SecondaryElementalSkill":
				return "第二元素战技";
			case "ElementalBurst":
				return "元素爆发";
			case "IntroSkill":
				return "进场技能";
			case "OutroSkill":
				return "退场技能";
			case "PassiveSkill":
				return "被动技能";
			case "Usages":
				return "次";
			case "Rounds":
				return "轮";
			case "CharacterStatus":
				return "角色状态";
			case "PartyStatus":
				return "队伍状态";
			case "Female":
				return "女";
			case "Male":
				return "男";
			case "Other":
				return "其他";
			case "Unknown":
				return "未知";
			case "GenshinOfficial":
				return "原神官方";
			case "Fanmade":
				return "二创";
			case "Original":
				return "原创";
			default:
				AlertSystemError("The value of Value \"" + Value + "\" in function Translate is invalid.");
				break;
		}
	}

// Error handling
function AlertSystemError(Message) {
	console.error("● 系统错误\n" +
		Message);
	ShowDialog("System_Error",
		"Error",
		"抱歉，发生了系统错误。您可尝试清空用户数据来修复错误，或向我提供反馈。<br />" +
		"<br />" +
		"错误信息：" + Message,
		"", "", "了解更多", "关闭");
}
function AlertGameFunctionError(Message) {
	console.error("● 游戏函数错误\n" +
		Message + "\n" +
		"\n" +
		"[Additional Info]\n" +
		"Operation: \"" + Game.Status.Operation + "\"\n" +
		"Phase: \"" + Game.Status.Phase[1] + " " + Game.Status.Phase[2] + "\"\n" +
		"Active characters: \"" + Game.Status.Player.CharacterCard[Game.Status.Player.ActiveCharacter].ID + "\", \"" + Game.Status.Opponent.CharacterCard[Game.Status.Opponent.ActiveCharacter].ID + "\"\n" +
		"Turn statuses: \"" + Game.Status.Player.Turn + "\", \"" + Game.Status.Opponent.Turn + "\"\n" +
		"Action queue: \"" + JSON.stringify(Game.Status.Action.Queue) + "\"\n" +
		"Master: \"" + JSON.stringify(Game.Status.Master) + "\"");
	ShowDialog("Game_GameFunctionError",
		"Error",
		"抱歉，发生了游戏函数错误。这可能是由于某张卡牌有 bug。若为卡牌问题，请向卡牌作者提供反馈。<br />" +
		"<br />" +
		"错误信息：" + Message + "<br />" +
		"您可在浏览器控制台查看更详细的错误信息。",
		"", "", "", "确定");
}
