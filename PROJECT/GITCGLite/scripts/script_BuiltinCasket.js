// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// (C) 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const Casket0 = {
			BuiltinDeck: {
				EmptyDeck: {
					Properties: {
						Name: "",
						Description: "",
						BgImage: "",
						CardBackImage: "",
						ImageSource: ""
					},
					CharacterCardSelection: [0],
					ActionCardSelection: [0]
				}
			},
			BuiltinCard: {
				UnknownCard: {
					BasicProperties: {
						ID: "UnknownCard",
						Name: "未知卡牌",
						Image: "images/UnknownCard.jpg",
						Description: "若您选择了「生成临时牌组」或「随机选择牌组」，则开始对局时将随机指定一张卡牌来替代本卡牌。若非上述情况，您的牌盒可能有问题，请检查之。",
						Keywords: "",
						Version: 1.00
					}
				},
				EmptyCharacterCard: {
					BasicProperties: {
						ID: "NewCharacterCard",
						Name: "",
						Image: "",
						Type: "CharacterCard",
						StatusQuantity: 0,
						Description: "",
						Keywords: "",
						Version: 1.00
					},
					Credits: {
						Author: "",
						Contact: "",
						CardSource: "GenshinOfficial",
						ImageSource: "",
						VoiceoverSource: ""
					},
					CharacterCardProperties: {
						MaxHP: 100,
						MaxEnergy: 3,
						ElementType: "Pyro",
						WeaponType: "Sword",
						CombatOrientation: "Main",
						HasSecondaryElementalSkill: false,
						HasIntroSkill: false,
						HasOutroSkill: false,
						HasPassiveSkill: false,
						HasAffiliatedCard: false
					},
					NormalAttack: {
						Name: "",
						Cost: [0, 1, 2],
						Description: "",
						Execution: "",
						ChargedAttackExecution: "",
						PlungingAttackExecution: ""
					},
					ElementalSkill: {
						Name: "",
						Image: "",
						Cost: 3,
						Description: "",
						Execution: ""
					},
					ElementalBurst: {
						Name: "",
						Image: "",
						Cost: 4,
						Description: "",
						Execution: ""
					},
					CharacterProfile: {
						From: "",
						VA: "",
						Language: "ja-JP",
						Gender: "Unknown",
						Birthday: ""
					},
					SpokenLine: {
						BecomingActive: [
							0,
							"",
							"",
							""
						],
						ElementalSkill: [
							0,
							"",
							"",
							""
						],
						ElementalBurst: [
							0,
							"",
							"",
							""
						],
						HeavyHitTaken: [
							0,
							"",
							"",
							""
						],
						Fallen: [
							0,
							"",
							"",
							""
						]
					},
					Voiceover: {
						BecomingActive: [
							0,
							"",
							"",
							""
						],
						ElementalSkill: [
							0,
							"",
							"",
							""
						],
						ElementalBurst: [
							0,
							"",
							"",
							""
						],
						HeavyHitTaken: [
							0,
							"",
							"",
							""
						],
						Fallen: [
							0,
							"",
							"",
							""
						]
					}
				},
				EmptyActionCard: {
					BasicProperties: {
						ID: "NewActionCard",
						Name: "",
						Image: "",
						Type: "TalentCard",
						StatusQuantity: 0,
						Description: "",
						Keywords: "",
						Version: 1.00
					},
					Credits: {
						Author: "",
						Contact: "",
						CardSource: "GenshinOfficial",
						ImageSource: ""
					},
					TalentCardProperties: {
						Cost: [0, 3, "Matching", 0],
						OrientedCharacterCardID: "",
						SkillType: "ElementalSkill"
					}
				},
				EmptyComplementCard: {
					SecondaryElementalSkill: {
						Name: "",
						Image: "",
						Cost: 5,
						Description: "",
						Execution: ""
					},
					IntroSkill: {
						Name: "",
						Image: "",
						Description: "",
						Execution: ""
					},
					OutroSkill: {
						Name: "",
						Image: "",
						Description: "",
						Execution: ""
					},
					PassiveSkill: {
						Name: "",
						Image: "",
						Description: "",
						Trigger: "",
						Execution: ""
					},
					AffiliatedCard: {
						Name: "",
						Image: "",
						Type: "SummonsCard",
						Duration: [0, 3, "Usages"],
						Description: "",
						Requirement: "",
						Execution: ""
					},
					WeaponCardProperties: {
						Cost: [0, 3, "Matching"],
						WeaponType: "Sword",
						Execution: ""
					},
					ArtifactCardProperties: {
						Cost: [0, 2, "Matching"],
						Execution: ""
					},
					SupportCardProperties: {
						Cost: [0, 2, "Matching"],
						Duration: [0, 3, "Usages"],
						HasCounter: false,
						Requirement: "",
						Execution: ""
					},
					EventCardProperties: {
						Cost: [0, 2, "Matching"],
						AffectedObject: "None",
						Requirement: "",
						Execution: ""
					},
					Status: [
						0,
						{
							Name: "",
							Image: "",
							Type: "CharacterStatus",
							Duration: [0, 3, "Usages"],
							Description: "",
							Execution: ""
						}
					],
				}
				// ??? 草元素反应召唤物之类
			},
			BuiltinStatus: {
				// ??? Frozen, Satiety, ...
			}
		};

		// Saved
		var Casket = {
			DeckSelection: [0, 1, 2], // -2 for "generate temporary deck", -1 for "randomly select deck".
			Deck: [
				"DeckLibrary",
				{ // Built-in deck 1
					Properties: {
						Name: "内置牌组1",
						Description: "内置牌组。侧重利用触电反应与扩散反应同时给对手所有角色造成伤害。",
						BgImage: "",
						CardBackImage: "",
						ImageSource: ""
					},
					CharacterCardSelection: [
						0,
						"Keqing", "Xingqiu", "Venti"
					],
					ActionCardSelection: [
						0,
						"ThunderingPenance", "TheScentRemained", "EmbraceOfWinds", "SacrificialSword", "FavoniusSword", "SacrificialBow",
						"ThunderSummonersCrown", "WineStainedTricorne", "ViridescentVenerersDiadem", "OrnateKabuto", "JadeChamber", "DawnWinery",
						"LiyueHarborWharf", "FavoniusCathedral", "WangshuInn", "Katheryne", "Katheryne(Copy)", "IronTongueTian",
						"RedFeatherFan", "NRE", "NRE(Copy)", "TheBestestTravelCompanion", "Starsigns", "JueyunGuoba",
						"LotusFlowerCrisp", "MondstadtHashBrown", "MondstadtHashBrown(Copy)", "MushroomPizza", "MushroomPizza(Copy)", "MatsutakeMeatRolls"
					]
				},
				{ // Built-in deck 2
					Properties: {
						Name: "内置牌组2",
						Description: "内置牌组。侧重利用蒸发反应与草元素相关反应给对手前台角色造成高额伤害。",
						BgImage: "",
						CardBackImage: "",
						ImageSource: ""
					},
					CharacterCardSelection: [
						0,
						"HuTao", "Xingqiu", "Nahida"
					],
					ActionCardSelection: [
						0,
						"SanguineRouge", "TheScentRemained", "TheSeedOfStoredKnowledge", "SkywardSpine", "FavoniusSword", "SacrificialFragments",
						"WitchsScorchingHat", "WineStainedTricorne", "LaurelCoronet", "OrnateKabuto", "JadeChamber", "DawnWinery",
						"LiyueHarborWharf", "FavoniusCathedral", "WangshuInn", "Katheryne", "Katheryne(Copy)", "IronTongueTian",
						"RedFeatherFan", "NRE", "NRE(Copy)", "TheBestestTravelCompanion", "Starsigns", "SendOff",
						"JueyunGuoba", "LotusFlowerCrisp", "MondstadtHashBrown", "MondstadtHashBrown(Copy)", "MushroomPizza", "MatsutakeMeatRolls"
					]
				}
				/* { // Built-in deck 3
					Properties: {
						Name: "内置牌组3",
						Description: "内置牌组。侧重利用冻结反应与奶妈角色来提升防御力。",
						BgImage: "",
						CardBackImage: "",
						ImageSource: ""
					},
					CharacterCardSelection: [
						0,
						"KamisatoAyaka", "Fischl", "Barbara"
					],
					ActionCardSelection: [
						0,
						"KantenSenmyouBlessing", "StellarPredator", "GloriousSeason", "FavoniusSword", "SacrificialBow", "SacrificialFragments",
						"BrokenRimesEcho", "ThunderSummonersCrown", "WineStainedTricorne", "LuckyDogsSilverCirclet", "JadeChamber", "DawnWinery",
						"LiyueHarborWharf", "FavoniusCathedral", "WangshuInn", "Katheryne", "Katheryne(Copy)", "IronTongueTian",
						"RedFeatherFan", "NRE", "NRE(Copy)", "TheBestestTravelCompanion", "Starsigns", "JueyunGuoba",
						"LotusFlowerCrisp", "LotusFlowerCrisp(Copy)", "MondstadtHashBrown", "MondstadtHashBrown(Copy)", "MushroomPizza", "MushroomPizza(Copy)"
					]
				} */
			],
			Card: [
				"CardLibrary",

				// Character cards
				{ // Keqing
					BasicProperties: {
						ID: "Keqing",
						Name: "刻晴",
						Image: "https://patchwiki.biligame.com/images/ys/c/c1/a9gswxupshxu71rq6mvsxe3pjmimfmv.png",
						Type: "CharacterCard",
						StatusQuantity: 1,
						Description: "<i>霆霓快雨·刻晴：她能构筑出许多从未设想过的牌组，拿下许多难以想象的胜利。</i>",
						Keywords: "璃月, 璃月七星, 紫发, 粉瞳, 猫耳, 黑丝, 屁斜剑法",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki",
						VoiceoverSource: "Genshin Impact Wiki"
					},
					CharacterCardProperties: {
						MaxHP: 100,
						MaxEnergy: 3,
						ElementType: "Electro",
						WeaponType: "Sword",
						CombatOrientation: "Main",
						HasSecondaryElementalSkill: false,
						HasIntroSkill: false,
						HasOutroSkill: false,
						HasPassiveSkill: false,
						HasAffiliatedCard: true
					},
					NormalAttack: {
						Name: "云来剑法",
						Cost: [0, 1, 2],
						Description: "造成20点物理伤害。",
						Execution: "Damage(\"Enemy\", \"Active\", \"Physical\", 20);",
						ChargedAttackExecution: "",
						PlungingAttackExecution: ""
					},
					ElementalSkill: {
						Name: "星斗归位",
						Image: "https://patchwiki.biligame.com/images/ys/5/58/8ajyn7zzhal0dopp6vi3lnryq12gq28.png",
						Cost: 3,
						Description:
							"造成30点雷元素伤害。若手牌中没有附属卡牌「雷楔」，生成之。若有，则弃置之，并给自己施加「雷元素附魔」状态。若有装备天赋牌，「雷元素附魔」状态的可用轮数+1。<br />\n" +
							"<i>「人像是蛾子，总奔着名叫神仙的火光而去。但是我这光是自己点的。」</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Electro\", 30);\n" +
							"if(IsCardInHandByID(\"LightningStiletto\") == false) {\n" +
							"	GetAffiliatedCard();\n" +
							"} else {\n" +
							"	DiscardCardByID(\"Self\", \"LightningStiletto\");\n" +
							"	AddStatus(\"Self\", \"Active\", \"Keqing\", 1);\n" +
							"	if(ReadTalentCardID(\"Master\", null) != null) {\n" +
							"		AdjustStatusDuration(\"Self\", \"Active\", \"Keqing\", 1, \"Plus\", 1);\n" +
							"	}\n" +
							"}"
					},
					ElementalBurst: {
						Name: "天街巡游",
						Image: "https://patchwiki.biligame.com/images/ys/a/a0/hl9rfd4cwbif4a7gw3zmep0cdsgn6mu.png",
						Cost: 4,
						Description:
							"造成40点雷元素伤害。给敌方后台角色造成30点穿透伤害。<br />\n" +
							"<i>刻晴自己剑术中最为迅捷的一招，可将诸星斩落。</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Electro\", 40);\n" +
							"Damage(\"Enemy\", \"Standby\", \"Piercing\", 30);"
					},
					AffiliatedCard: {
						Name: "雷楔",
						Image: "https://patchwiki.biligame.com/images/ys/d/d8/2apoy7etoysp2ukpcdvevgggp35wwh0.png",
						Type: "EventCard",
						Cost: [0, 3, "Electro"],
						AffectedObject: "None",
						Description:
							"要求刻晴可用。<br />\n" +
							"将刻晴切换至前台。造成30点雷元素伤害。给自己施加「雷元素附魔」状态。若有装备天赋牌，「雷元素附魔」状态的可用轮数+1。最后结束本次行动。",
						Requirement: "return IsCharacterAvailableByID(\"Self\", \"Keqing\");",
						Execution:
							"SwitchCharacterByID(\"Self\", \"Keqing\");\n" +
							"Damage(\"Enemy\", \"Active\", \"Electro\", 30);\n" +
							"AddStatus(\"Self\", \"Active\", \"Keqing\", 1);\n" +
							"if(ReadTalentCardID(\"Master\", null) != null) {\n" +
							"	AdjustStatusDuration(\"Self\", \"Active\", \"Keqing\", 1, \"Plus\", 1);\n" +
							"}\n" +
							"EndAction();"
					},
					Status: [
						0,
						{
							Name: "雷元素附魔",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/7/7f/Icon_TCG_Electro.png",
							Type: "CharacterStatus",
							Duration: [0, 2, "Rounds"],
							Description: "刻晴战斗行动前：给自己施加雷元素附魔，造成的伤害均转变为雷元素伤害。刻晴战斗行动中，且有装备天赋牌：雷元素伤害增加10点。",
							Execution:
								"if(IsInTurn() && IsCharacterActiveByID(\"Self\", \"Keqing\")) {\n" +
								"	if(ReadPhase() == \"BeforeCombatAction\") {\n" +
								"		ApplyInfusion(\"Electro\");\n" +
								"		ConsumeUsage();\n" +
								"	}\n" +
								"	if(ReadPhase() == \"CombatAction\" && ReadTalentCardID(\"Master\", null) != null) {\n" +
								"		AdjustDamage(\"Electro\", \"Plus\", 10);\n" +
								"		ConsumeUsage();\n" +
								"	}\n" +
								"}"
						}
					],
					CharacterProfile: {
						From: "原神",
						VA: "喜多村英梨",
						Language: "ja-JP",
						Gender: "Female",
						Birthday: "11/20"
					},
					SpokenLine: {
						BecomingActive: [
							0,
							"行こう、時間は有限よ。",
							"急を要する案件？",
							"速戦即決！"
						],
						ElementalSkill: [
							0,
							"行けっ！",
							"迅影の如く！",
							"瞬くまに。"
						],
						ElementalBurst: [
							0,
							"逃さない！",
							"我が剣よ、影に従え！",
							"剣光よ、世の乱れを斬り尽くせ！"
						],
						HeavyHitTaken: [
							0,
							"たまたまよ…",
							"ん！",
							"痛い！"
						],
						Fallen: [
							0,
							"勝機を…間違えたわ。",
							"く…悔しい…",
							"期待に…応えられなかった。"
						]
					},
					Voiceover: {
						BecomingActive: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/e/e3/VO_JA_Keqing_Joining_Party_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/f/fd/VO_JA_Keqing_Joining_Party_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/2/29/VO_JA_Keqing_Joining_Party_03.ogg"
						],
						ElementalSkill: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/5/59/VO_JA_Keqing_Elemental_Skill_1_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/8/8c/VO_JA_Keqing_Elemental_Skill_1_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/d/d1/VO_JA_Keqing_Elemental_Skill_1_03.ogg"
						],
						ElementalBurst: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/a/ad/VO_JA_Keqing_Elemental_Burst_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/d/dc/VO_JA_Keqing_Elemental_Burst_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/a/a7/VO_JA_Keqing_Elemental_Burst_03.ogg"
						],
						HeavyHitTaken: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/2/28/VO_JA_Keqing_Heavy_Hit_Taken_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/d/d6/VO_JA_Keqing_Heavy_Hit_Taken_03.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/3/3a/VO_JA_Keqing_Heavy_Hit_Taken_04.ogg"
						],
						Fallen: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/d/d7/VO_JA_Keqing_Fallen_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/9/9e/VO_JA_Keqing_Fallen_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/6/6a/VO_JA_Keqing_Fallen_03.ogg"
						]
					}
				},
				{ // Xingqiu
					BasicProperties: {
						ID: "Xingqiu",
						Name: "行秋",
						Image: "https://patchwiki.biligame.com/images/ys/c/c1/mwgym1jd436edjnhs1t0lu4k1m82y19.png",
						Type: "CharacterCard",
						StatusQuantity: 2,
						Description: "<i>古华飞云·行秋：「怎么最近小说里的主角，都是些私塾里的学生…」</i>",
						Keywords: "防御, 璃月, 古华派, 蓝发, 黄瞳, 可爱的男孩子, 书呆子",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki",
						VoiceoverSource: "Genshin Impact Wiki"
					},
					CharacterCardProperties: {
						MaxHP: 100,
						MaxEnergy: 2,
						ElementType: "Hydro",
						WeaponType: "Sword",
						CombatOrientation: "Support",
						HasSecondaryElementalSkill: false,
						HasIntroSkill: false,
						HasOutroSkill: false,
						HasPassiveSkill: false,
						HasAffiliatedCard: false
					},
					NormalAttack: {
						Name: "古华剑法",
						Cost: [0, 1, 2],
						Description: "造成20点物理伤害。",
						Execution: "Damage(\"Enemy\", \"Active\", \"Physical\", 20);",
						ChargedAttackExecution: "",
						PlungingAttackExecution: ""
					},
					ElementalSkill: {
						Name: "画雨笼山",
						Image: "https://patchwiki.biligame.com/images/ys/9/9f/n2lo8l7ov8w0bx2jwh5qcvmmflm8wbs.png",
						Cost: 3,
						Description:
							"造成20点水元素伤害。给自己施加水元素附着，并给队伍施加「雨帘剑」状态。若有装备天赋牌，「雨帘剑」状态的可用次数+1。<br />\n" +
							"<i>「蛟龙易斩，雨线难画。」</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Hydro\", 20);\n" +
							"AddElementApplication(\"Self\", \"Active\", \"Hydro\");\n" +
							"AddStatus(\"Self\", \"Active\", \"Xingqiu\", 1);\n" +
							"if(ReadTalentCardID(\"Master\", null) != null) {\n" +
							"	AdjustStatusDuration(\"Self\", \"Active\", \"Xingqiu\", 1, \"Plus\", 1);\n" +
							"}"
					},
					ElementalBurst: {
						Name: "裁雨留虹",
						Image: "https://patchwiki.biligame.com/images/ys/f/fb/rj85t7tm68l6y8yyuvryh2hagcz1g3b.png",
						Cost: 3,
						Description:
							"造成10点水元素伤害。给自己施加水元素附着，并给队伍施加「虹剑势」状态。<br />\n" +
							"<i>「裁雨法」不传绝学，古华镇派秘诀之一。</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Hydro\", 10);\n" +
							"AddElementApplication(\"Self\", \"Active\", \"Hydro\");\n" +
							"AddStatus(\"Self\", \"Active\", \"Xingqiu\", 2);"
					},
					Status: [
						0,
						{
							Name: "雨帘剑",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/c/c4/Icon_TCG_Shield.png",
							Type: "PartyStatus",
							Duration: [0, 2, "Usages"],
							Description: "受到30以上的伤害时，或受到20以上的伤害且行秋有装备天赋牌时：抵消10点伤害。",
							Execution:
								"if(ReadPhase() == \"CombatAction\" && IsInTurn() == false &&\n" +
								"(ReadDamage() >= 30 || (ReadDamage() >= 20 && ReadTalentCardID(\"Master\", null) != null))) {\n" +
								"	AdjustDamage(\"Any\", \"Subtract\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						},
						{
							Name: "虹剑势",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/e/e7/Rainbow_Bladework_Buff_Icon.png",
							Type: "PartyStatus",
							Duration: [0, 3, "Usages"],
							Description: "普通攻击后：造成10点水元素伤害。",
							Execution:
								"if(ReadPhase() == \"AfterCombatAction\" && IsInTurn() && ReadActionType() == \"NormalAttack\") {\n" +
								"	Damage(\"Enemy\", \"Active\", \"Hydro\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					],
					CharacterProfile: {
						From: "原神",
						VA: "皆川純子",
						Language: "ja-JP",
						Gender: "Male",
						Birthday: "10/09"
					},
					SpokenLine: {
						BecomingActive: [
							0,
							"雨垂れ石をも穿つ。",
							"我が義侠心は傑物にも恥じない。",
							"勧善懲悪、仁義を通すよ。"
						],
						ElementalSkill: [
							0,
							"雨、描きがたし！",
							"裁！",
							"この剣は分かるかい？"
						],
						ElementalBurst: [
							0,
							"古華奥義！",
							"詩よ、錦となれ！",
							"裁雨留虹！"
						],
						HeavyHitTaken: [
							0,
							"油断した。",
							"まずい…",
							"あっ！"
						],
						Fallen: [
							0,
							"勉強に…なった…",
							"灯火はいつか散る…わかってるんだ。",
							"しまった…"
						]
					},
					Voiceover: {
						BecomingActive: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/c/c8/VO_JA_Xingqiu_Joining_Party_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/7/79/VO_JA_Xingqiu_Joining_Party_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/d/d3/VO_JA_Xingqiu_Joining_Party_03.ogg"
						],
						ElementalSkill: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/b/bc/VO_JA_Xingqiu_Elemental_Skill_1_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/7/79/VO_JA_Xingqiu_Elemental_Skill_1_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/b/bd/VO_JA_Xingqiu_Elemental_Skill_1_03.ogg"
						],
						ElementalBurst: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/1/12/VO_JA_Xingqiu_Elemental_Burst_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/1/15/VO_JA_Xingqiu_Elemental_Burst_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/b/b5/VO_JA_Xingqiu_Elemental_Burst_03.ogg"
						],
						HeavyHitTaken: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/a/aa/VO_JA_Xingqiu_Heavy_Hit_Taken_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/5/59/VO_JA_Xingqiu_Heavy_Hit_Taken_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/a/ae/VO_JA_Xingqiu_Heavy_Hit_Taken_06.ogg"
						],
						Fallen: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/1/10/VO_JA_Xingqiu_Fallen_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/a/aa/VO_JA_Xingqiu_Fallen_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/4/49/VO_JA_Xingqiu_Fallen_03.ogg"
						]
					}
				},
				{ // Venti
					BasicProperties: {
						ID: "Venti",
						Name: "温迪",
						Image: "https://patchwiki.biligame.com/images/ys/b/b0/6r84nthw2bxsoxq9x1cqmn9ig83hcme.png",
						Type: "CharacterCard",
						StatusQuantity: 1,
						Description: "<i>风色诗人·温迪：「四季轮转，四风从不止息。当然啦，功劳也不是它们的，主要是我的。要是没有吟游诗人，谁去把这些传唱？」</i>",
						Keywords: "蒙德, 七神, 尘世七执政, 黑发, 绿瞳, 白丝, 可爱的男孩子, 风神, 吟游诗人, 吟遊野郎",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki",
						VoiceoverSource: "Genshin Impact Wiki"
					},
					CharacterCardProperties: {
						MaxHP: 100,
						MaxEnergy: 2,
						ElementType: "Anemo",
						WeaponType: "Bow",
						CombatOrientation: "Support",
						HasSecondaryElementalSkill: false,
						HasIntroSkill: false,
						HasOutroSkill: false,
						HasPassiveSkill: false,
						HasAffiliatedCard: true
					},
					NormalAttack: {
						Name: "神代射术",
						Cost: [0, 1, 2],
						Description: "造成20点物理伤害。",
						Execution: "Damage(\"Enemy\", \"Active\", \"Physical\", 20);",
						ChargedAttackExecution: "",
						PlungingAttackExecution: ""
					},
					ElementalSkill: {
						Name: "高天之歌",
						Image: "https://patchwiki.biligame.com/images/ys/f/fe/hhb16pe3sq5duv4cu299atxbi78k7ae.png",
						Cost: 3,
						Description:
							"造成20点风元素伤害。给队伍施加「风域」状态。<br />\n" +
							"<i>在人与神还同行于大地的时代，无数的歌曲传遍四方的天空。这是早已被遗忘的曲调。</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Anemo\", 20);\n" +
							"AddStatus(\"Self\", \"Active\", \"Venti\", 1);"
					},
					ElementalBurst: {
						Name: "风神之诗",
						Image: "https://patchwiki.biligame.com/images/ys/c/cf/iv3keguj9pqi3blf8j9xk10olca914v.png",
						Cost: 3,
						Description:
							"造成20点风元素伤害。生成附属卡牌「暴风之眼」。<br />\n" +
							"<i>称颂风之神的诗篇有许多已经佚失。其中这一首描述的是他与风的力量。</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Anemo\", 20);\n" +
							"GetAffiliatedCard();"
					},
					AffiliatedCard: {
						Name: "暴风之眼",
						Image: "https://static.wikia.nocookie.net/gensin-impact/images/c/cf/Stormeye_Summon.png",
						Type: "SummonsCard",
						Duration: [0, 2, "Usages"],
						HasCounter: false,
						Description: "在结束阶段：造成20点风元素伤害。使敌方切换至离我方前台角色最近的角色。",
						Execution:
							"if(ReadPhase() == \"EndPhase\") {\n" +
							"	Damage(\"Enemy\", \"Active\", \"Anemo\", 20);\n" +
							"	SwitchCharacter(\"Enemy\", ReadActiveCharacterNumber(\"Self\"));\n" +
							"	ConsumeUsage();\n" +
							"}"
					},
					Status: [
						0,
						{
							Name: "风域",
							Image: "https://patchwiki.biligame.com/images/ys/f/fe/hhb16pe3sq5duv4cu299atxbi78k7ae.png",
							Type: "PartyStatus",
							Duration: [0, 2, "Usages"],
							Description: "轮到我方时：切换角色少花费1个骰子。若温迪有装备天赋牌，普通攻击少花费1个任意骰子。",
							Execution:
								"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn()) {\n" +
								"	AdjustCost(\"CharacterCard\", \"Any\", \"Subtract\", 1);\n" +
								"	if(ReadTalentCardID(\"Master\", null) != null) {\n" +
								"		AdjustCost(\"NormalAttack\", \"Unaligned\", \"Subtract\", 1);\n" +
								"	}\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					],
					CharacterProfile: {
						From: "原神",
						VA: "村瀬歩",
						Language: "ja-JP",
						Gender: "Male",
						Birthday: "06/16"
					},
					SpokenLine: {
						BecomingActive: [
							0,
							"音階調整お～わり！",
							"待たせちゃった？",
							"ウォーミングアップしよっか。"
						],
						ElementalSkill: [
							0,
							"ここだよ～",
							"足下に気をつけて～",
							"一緒に遊ぼうよ～"
						],
						ElementalBurst: [
							0,
							"逃げようなんて思わないでよね？",
							"風だ！",
							""
						],
						HeavyHitTaken: [
							0,
							"アチャ～",
							"あれっ？",
							"痛っ！"
						],
						Fallen: [
							0,
							"少し寝よう…",
							"ありゃ、弦が切れちゃった…",
							"バタンキュ～"
						]
					},
					Voiceover: {
						BecomingActive: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/1/1a/VO_JA_Venti_Joining_Party_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/c/cc/VO_JA_Venti_Joining_Party_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/4/48/VO_JA_Venti_Joining_Party_03.ogg"
						],
						ElementalSkill: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/7/71/VO_JA_Venti_Elemental_Skill_1_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/6/6f/VO_JA_Venti_Elemental_Skill_1_03.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/2/2e/VO_JA_Venti_Elemental_Skill_1_04.ogg"
						],
						ElementalBurst: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/5/55/VO_JA_Venti_Elemental_Burst_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/b/b8/VO_JA_Venti_Elemental_Burst_02.ogg",
							""
						],
						HeavyHitTaken: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/3/33/VO_JA_Venti_Light_Hit_Taken_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/4/49/VO_JA_Venti_Light_Hit_Taken_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/d/dc/VO_JA_Venti_Light_Hit_Taken_03.ogg"
						],
						Fallen: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/e/e0/VO_JA_Venti_Fallen_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/8/8d/VO_JA_Venti_Fallen_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/e/eb/VO_JA_Venti_Fallen_03.ogg"
						]
					}
				},
				{ // HuTao
					BasicProperties: {
						ID: "HuTao",
						Name: "胡桃",
						Image: "https://patchwiki.biligame.com/images/ys/e/ef/f0jyabgn03y4leifq24m1ltdkmyz3uq.png",
						Type: "CharacterCard",
						StatusQuantity: 2,
						Description: "<i>雪霁梅香·胡桃：「送走，全送走。」</i>",
						Keywords: "璃月, 往生堂, 棕发, 红瞳, 古灵精怪, 小幽灵, 鬼, Explosion",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI",
						VoiceoverSource: "Genshin Impact Wiki"
					},
					CharacterCardProperties: {
						MaxHP: 100,
						MaxEnergy: 3,
						ElementType: "Pyro",
						WeaponType: "Polearm",
						CombatOrientation: "Main",
						HasSecondaryElementalSkill: false,
						HasIntroSkill: false,
						HasOutroSkill: false,
						HasPassiveSkill: false,
						HasAffiliatedCard: false
					},
					NormalAttack: {
						Name: "往生秘传枪法",
						Cost: [0, 1, 2],
						Description: "造成20点物理伤害。若有装备天赋牌且血量小等于60，火元素伤害增加10点。",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Physical\", 20);\n" +
							"if(ReadTalentCardID(\"Master\", null) != null && ReadHP(\"Self\", \"Active\") <= 60) {\n" +
							"	AdjustDamage(\"Pyro\", \"Plus\", 10);\n" +
							"}",
						ChargedAttackExecution: "",
						PlungingAttackExecution: ""
					},
					ElementalSkill: {
						Name: "蝶引来生",
						Image: "https://patchwiki.biligame.com/images/ys/f/f3/0g43qqxknh3k0v6j7b6q4u6jl5hfbee.png",
						Cost: 2,
						Description:
							"给自己施加「彼岸蝶舞」状态。<br />\n" +
							"<i>胡桃所习得的秘传枪法，其口诀第一句是: 「枪开黄泉路，蝶引来世桥。」</i>",
						Execution: "AddStatus(\"Self\", \"Active\", \"HuTao\", 1);"
					},
					ElementalBurst: {
						Name: "安神秘法",
						Image: "https://patchwiki.biligame.com/images/ys/b/b0/cpmmff7d7wctcaepp47ix06vprvpsrs.png",
						Cost: 3,
						Description:
							"若血量大于60：造成40点火元素伤害。给自己治疗20点血量。若血量小等于60：造成50点火元素伤害。给自己治疗30点血量。若有装备天赋牌，且血量小等于60：火元素伤害增加10点。<br />\n" +
							"<i>已经离开人世之物如果还在活蹦乱跳，就会让往生堂十分焦虑。火葬是最能让胡桃安定心神的手段，而她越焦虑，火力就越大。</i>",
						Execution:
							"if(ReadHP(\"Self\", \"Active\") > 60) {\n" +
							"	Damage(\"Enemy\", \"Active\", \"Pyro\", 40);\n" +
							"	Heal(\"Self\", \"Active\", 20);\n" +
							"} else {\n" +
							"	Damage(\"Enemy\", \"Active\", \"Pyro\", 50);\n" +
							"	Heal(\"Self\", \"Active\", 30);\n" +
							"}\n" +
							"if(ReadTalentCardID(\"Master\", null) != null && ReadHP(\"Self\", \"Active\") <= 60) {\n" +
							"	AdjustDamage(\"Pyro\", \"Plus\", 10);\n" +
							"}"
					},
					Status: [
						0,
						{
							Name: "彼岸蝶舞",
							Image: "https://patchwiki.biligame.com/images/ys/f/f3/0g43qqxknh3k0v6j7b6q4u6jl5hfbee.png",
							Type: "CharacterStatus",
							Duration: [0, 2, "Rounds"],
							Description: "胡桃战斗行动前：给自己施加火元素附魔，造成的伤害均转变为火元素伤害。胡桃战斗行动中：火元素伤害增加10点。若使用重击，给敌方前台角色施加「血梅香」状态。",
							Execution:
								"if(IsInTurn() && IsCharacterActiveByID(\"Self\", \"HuTao\")) {\n" +
								"	if(ReadPhase() == \"BeforeCombatAction\") {\n" +
								"		ApplyInfusion(\"Pyro\");\n" +
								"		ConsumeUsage();\n" +
								"	}\n" +
								"	if(ReadPhase() == \"CombatAction\") {\n" +
								"		AdjustDamage(\"Pyro\", \"Plus\", 10);\n" +
								"		if(ReadActionSubtype() == \"ChargedAttack\") {\n" +
								"			AddStatus(\"Enemy\", \"Active\", \"HuTao\", 2);\n" +
								"		}\n" +
								"		ConsumeUsage();\n" +
								"	}\n" +
								"}"
						},
						{
							Name: "血梅香",
							Image: "",
							Type: "CharacterStatus",
							Duration: [0, 1, "Usages"],
							Description: "在结束阶段：给自己造成10点火元素伤害。",
							Execution:
								"if(ReadPhase() == \"EndPhase\") {\n" +
								"	Damage(\"Master\", \"\", \"Pyro\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					],
					CharacterProfile: {
						From: "原神",
						VA: "高橋李依",
						Language: "ja-JP",
						Gender: "Female",
						Birthday: "07/15"
					},
					SpokenLine: {
						BecomingActive: [
							0,
							"あっ、やっと私の出番？～",
							"見る目ある！",
							"全員、あの世行き～"
						],
						ElementalSkill: [
							0,
							"喝！",
							"起！",
							"散！"
						],
						ElementalBurst: [
							0,
							"いってらっしゃい！",
							"さよなら～",
							"燎原の蝶！"
						],
						HeavyHitTaken: [
							0,
							"なにっ！",
							"いたい。",
							"はあっ？！"
						],
						Fallen: [
							0,
							"私の…番？",
							"うらむわ。",
							"うわぁ——"
						]
					},
					Voiceover: {
						BecomingActive: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/c/c9/VO_JA_Hu_Tao_Joining_Party_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/2/25/VO_JA_Hu_Tao_Joining_Party_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/8/8d/VO_JA_Hu_Tao_Joining_Party_03.ogg"
						],
						ElementalSkill: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/6/65/VO_JA_Hu_Tao_Elemental_Skill_1_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/3/35/VO_JA_Hu_Tao_Elemental_Skill_1_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/b/bd/VO_JA_Hu_Tao_Elemental_Skill_1_03.ogg"
						],
						ElementalBurst: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/3/39/VO_JA_Hu_Tao_Elemental_Burst_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/e/e9/VO_JA_Hu_Tao_Elemental_Burst_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/e/e7/VO_JA_Hu_Tao_Elemental_Burst_03.ogg"
						],
						HeavyHitTaken: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/a/ad/VO_JA_Hu_Tao_Heavy_Hit_Taken_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/7/77/VO_JA_Hu_Tao_Heavy_Hit_Taken_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/d/d8/VO_JA_Hu_Tao_Heavy_Hit_Taken_04.ogg"
						],
						Fallen: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/6/63/VO_JA_Hu_Tao_Fallen_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/6/6f/VO_JA_Hu_Tao_Fallen_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/1/1a/VO_JA_Hu_Tao_Fallen_03.ogg"
						]
					}
				},
				{ // Nahida
					BasicProperties: {
						ID: "Nahida",
						Name: "纳西妲",
						Image: "https://patchwiki.biligame.com/images/ys/4/4b/mvr0llvvbd892rf01qy6sfmqgo64twg.png",
						Type: "CharacterCard",
						StatusQuantity: 2,
						Description: "<i>白草净华·纳西妲：白草净华，幽宫启蛰。</i>",
						Keywords: "须弥, 七神, 尘世七执政, 白发, 绿瞳, 萝莉, 草神, 小吉祥草王, 萝卜, 羽毛球",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki",
						VoiceoverSource: "Genshin Impact Wiki"
					},
					CharacterCardProperties: {
						MaxHP: 100,
						MaxEnergy: 2,
						ElementType: "Dendro",
						WeaponType: "Catalyst",
						CombatOrientation: "Support",
						HasSecondaryElementalSkill: true,
						HasIntroSkill: false,
						HasOutroSkill: false,
						HasPassiveSkill: false,
						HasAffiliatedCard: false
					},
					NormalAttack: {
						Name: "行相",
						Cost: [0, 1, 2],
						Description: "造成10点草元素伤害。",
						Execution: "Damage(\"Enemy\", \"Active\", \"Dendro\", 10);",
						ChargedAttackExecution: "",
						PlungingAttackExecution: ""
					},
					ElementalSkill: {
						Name: "所闻遍计",
						Image: "https://patchwiki.biligame.com/images/ys/8/8b/hfb5j6xnze5j5e5tmixhieq59y78fwn.png",
						Cost: 3,
						Description:
							"造成20点草元素伤害。若敌方前台角色没有「蕴种印」状态，给其施加之。若有，则给敌方所有角色施加之。<br />\n" +
							"<i>草木之神既已于空藏中照见诸法实相，乃可究尽三际因缘起灭之机。</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Dendro\", 20);\n" +
							"if(IsStatusPresent(\"Enemy\", \"Active\", \"Nahida\", 1) == false) {\n" +
							"	AddStatus(\"Enemy\", \"Active\", \"Nahida\", 1);\n" +
							"} else {\n" +
							"	AddStatus(\"Enemy\", \"All\", \"Nahida\", 1);\n" +
							"}"
					},
					SecondaryElementalSkill: {
						Name: "所闻遍计·真如",
						Image: "https://patchwiki.biligame.com/images/ys/6/64/qq68p4qre9yxfhxkn97q9quvgo3qbum.png",
						Cost: 5,
						Description:
							"造成30点草元素伤害。给敌方所有角色施加「蕴种印」状态。<br />\n" +
							"<i>草木之神既已于空藏中照见诸法实相，乃可究尽三际因缘起灭之机。</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Dendro\", 30);\n" +
							"AddStatus(\"Enemy\", \"All\", \"Nahida\", 1);"
					},
					ElementalBurst: {
						Name: "心景幻成",
						Image: "https://patchwiki.biligame.com/images/ys/b/b2/hiqeufp1d8c37jqo8maxpkvjuiu32lq.png",
						Cost: 3,
						Description:
							"造成40点草元素伤害。给队伍施加「摩耶之殿」状态。若有装备天赋牌且队伍具有雷元素角色，敌方所有角色「蕴种印」状态的可用次数+1。若有装备天赋牌且队伍具有水元素角色，「摩耶之殿」状态的可用轮数+1。<br />\n" +
							"<i>在智慧之神的眼中，或许森罗万象也不过是颠倒幻成的摩耶之梦。</i>",
						Execution:
							"Damage(\"Enemy\", \"Active\", \"Dendro\", 40);\n" +
							"AddStatus(\"Self\", \"Active\", \"Nahida\", 2);\n" +
							"if(ReadTalentCardID(\"Master\", null) != null) {\n" +
							"	let Value = false;\n" +
							"	for(let Looper = 1; Looper <= 3; Looper++) {\n" +
							"		if(ReadElementType(\"Self\", Looper) == \"Electro\") {\n" +
							"			Value = true;\n" +
							"			break;\n" +
							"		}\n" +
							"	}\n" +
							"	if(Value) {\n" +
							"		AdjustStatusDuration(\"Enemy\", \"All\", \"Nahida\", 1, \"Plus\", 1);\n" +
							"	}\n" +
							"	Value = false;\n" +
							"	for(let Looper = 1; Looper <= 3; Looper++) {\n" +
							"		if(ReadElementType(\"Self\", Looper) == \"Hydro\") {\n" +
							"			Value = true;\n" +
							"			break;\n" +
							"		}\n" +
							"	}\n" +
							"	if(Value) {\n" +
							"		AdjustStatusDuration(\"Self\", \"Active\", \"Nahida\", 2, \"Plus\", 1);\n" +
							"	}\n" +
							"}"
					},
					Status: [
						0,
						{
							Name: "蕴种印",
							Image: "https://patchwiki.biligame.com/images/ys/8/8b/hfb5j6xnze5j5e5tmixhieq59y78fwn.png",
							Type: "CharacterStatus",
							Duration: [0, 2, "Usages"],
							Description: "自己受到元素反应后：给我方所有具有「蕴种印」的角色造成10点穿透伤害。若敌方纳西妲可用，其有装备天赋牌，且敌方具有「摩耶之殿」状态，敌方队伍具有火元素角色，则改为草元素伤害。",
							Execution:
								"if(IsReactionTriggered(\"Master\", \"\", \"Any\")) {\n" +
								"	for(let Looper = 1; Looper <= 3; Looper++) {\n" +
								"		if(IsStatusPresent(\"Self\", Looper, \"Nahida\", 1) == true) {\n" +
								"			let Value = false;\n" +
								"			for(let Looper2 = 1; Looper2 <= 3; Looper2++) {\n" +
								"				if(ReadElementType(\"Enemy\", Looper2) == \"Pyro\") {\n" +
								"					Value = true;\n" +
								"					break;\n" +
								"				}\n" +
								"			}\n" +
								"			if(IsCharacterAvailableByID(\"Enemy\", \"Nahida\") && ReadTalentCardByID(\"Enemy\", \"Nahida\") != null && IsStatusPresent(\"Enemy\", \"Active\", \"Nahida\", 2) && Value) {\n" +
								"				Damage(\"Self\", Looper, \"Dendro\", 10);\n" +
								"			} else {\n" +
								"				Damage(\"Self\", Looper, \"Piercing\", 10);\n" +
								"			}\n" +
								"		}\n" +
								"	}\n" +
								"	ConsumeUsage();\n" +
								"}"
						},
						{
							Name: "摩耶之殿",
							Image: "https://patchwiki.biligame.com/images/ys/b/b2/hiqeufp1d8c37jqo8maxpkvjuiu32lq.png",
							Type: "PartyStatus",
							Duration: [0, 2, "Rounds"],
							Description: "战斗行动中，敌方任意角色受到元素反应时：伤害增加10点。",
							Execution:
								"if(ReadPhase() == \"CombatAction\" && IsReactionTriggered(\"Enemy\", \"All\", \"Any\")) {\n" +
								"	AdjustDamage(\"Any\", \"Plus\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					],
					CharacterProfile: {
						From: "原神",
						VA: "田村ゆかり",
						Language: "ja-JP",
						Gender: "Female",
						Birthday: "10/27"
					},
					SpokenLine: {
						BecomingActive: [
							0,
							"ずいぶん待ってたのよ。",
							"まだ行ったことのない場所がたくさんあるの。",
							"また見識を広められそうね。"
						],
						ElementalSkill: [
							0,
							"蔓延りなさい。",
							"痛くしちゃうかも。",
							"ぜんぶ丸見えね。"
						],
						ElementalBurst: [
							0,
							"私のおうちにいらっしゃい。",
							"知識を、あなたにも。",
							"これこそが知恵の殿堂⸺"
						],
						HeavyHitTaken: [
							0,
							"痛いっ！",
							"めまいが…",
							"やあ！"
						],
						Fallen: [
							0,
							"命は…いつか尽きるもの…",
							"枯れしぼむ刻…",
							"私には…分からない…"
						]
					},
					Voiceover: {
						BecomingActive: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/4/4d/VO_JA_Nahida_Joining_Party_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/1/17/VO_JA_Nahida_Joining_Party_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/4/46/VO_JA_Nahida_Joining_Party_03.ogg"
						],
						ElementalSkill: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/b/b3/VO_JA_Nahida_Elemental_Skill_1_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/f/f5/VO_JA_Nahida_Elemental_Skill_1_03.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/a/a2/VO_JA_Nahida_Elemental_Skill_1_06.ogg"
						],
						ElementalBurst: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/f/f7/VO_JA_Nahida_Elemental_Burst_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/7/71/VO_JA_Nahida_Elemental_Burst_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/6/60/VO_JA_Nahida_Elemental_Burst_03.ogg"
						],
						HeavyHitTaken: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/0/00/VO_JA_Nahida_Heavy_Hit_Taken_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/3/31/VO_JA_Nahida_Heavy_Hit_Taken_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/e/e8/VO_JA_Nahida_Heavy_Hit_Taken_03.ogg"
						],
						Fallen: [
							0,
							"https://static.wikia.nocookie.net/gensin-impact/images/0/0a/VO_JA_Nahida_Fallen_01.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/f/f4/VO_JA_Nahida_Fallen_02.ogg",
							"https://static.wikia.nocookie.net/gensin-impact/images/e/e3/VO_JA_Nahida_Fallen_03.ogg"
						]
					}
				},

				// Talent cards
				{ // ThunderingPenance
					BasicProperties: {
						ID: "ThunderingPenance",
						Name: "抵天雷罚",
						Image: "https://patchwiki.biligame.com/images/ys/8/8f/tcfkfyh5zqcpkc8s00p5r5z55p4xg11.png",
						Type: "TalentCard",
						StatusQuantity: 0,
						Description:
							"刻晴生成的「雷元素附魔」状态的可用轮数+1。该状态额外将雷元素伤害增加10点。<br />\n" +
							"<i>刻晴·抵天雷罚：只要你没有真正作弊，这就只是一张卡牌而已。</i>",
						Keywords: "增伤",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					TalentCardProperties: {
						Cost: [0, 3, "Electro", 0],
						OrientedCharacterCardID: "Keqing",
						SkillType: "ElementalSkill"
					}
				},
				{ // TheScentRemained
					BasicProperties: {
						ID: "TheScentRemained",
						Name: "重帘留香",
						Image: "https://patchwiki.biligame.com/images/ys/d/d8/psa1mm61llx36czshfzfkblsuz2vutq.png",
						Type: "TalentCard",
						StatusQuantity: 0,
						Description:
							"行秋生成的「雨帘剑」状态的可用次数+1。我方受到20以上的伤害时即可触发该状态。<br />\n" +
							"<i>行秋·重帘留香：他的运笔方法一直让人印象深刻。</i>",
						Keywords: "防御",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					TalentCardProperties: {
						Cost: [0, 3, "Hydro", 0],
						OrientedCharacterCardID: "Xingqiu",
						SkillType: "ElementalSkill"
					}
				},
				{ // EmbraceOfWinds
					BasicProperties: {
						ID: "EmbraceOfWinds",
						Name: "绪风之拥",
						Image: "https://patchwiki.biligame.com/images/ys/4/45/n4tiskk8zpm1jtbvucuyeqv0i3dc9mn.png",
						Type: "TalentCard",
						StatusQuantity: 0,
						Description:
							"「风域」状态触发后，普通攻击少花费1个任意骰子。<br />\n" +
							"<i>温迪·绪风之拥：「小心脚下。」</i>",
						Keywords: "节省",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					TalentCardProperties: {
						Cost: [0, 3, "Anemo", 0],
						OrientedCharacterCardID: "Venti",
						SkillType: "ElementalSkill"
					}
				},
				{ // SanguineRouge
					BasicProperties: {
						ID: "SanguineRouge",
						Name: "血之灶火",
						Image: "https://patchwiki.biligame.com/images/ys/3/34/imx3qd3ycfj8y8gklamg066qabzv7lq.png",
						Type: "TalentCard",
						StatusQuantity: 0,
						Description:
							"胡桃战斗行动中，若血量小等于60，其造成的火元素伤害增加10点。<br />\n" +
							"<i>胡桃·血之灶火：在处理一些特定事物时，胡堂主所需要的火力还得再大些。</i>",
						Keywords: "增伤",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					TalentCardProperties: {
						Cost: [0, 2, "Pyro", 0],
						OrientedCharacterCardID: "HuTao",
						SkillType: "ElementalSkill"
					}
				},
				{ // TheSeedOfStoredKnowledge
					BasicProperties: {
						ID: "TheSeedOfStoredKnowledge",
						Name: "心识蕴藏之种",
						Image: "https://patchwiki.biligame.com/images/ys/1/18/ttbqu86ugtcpw5c8qo05ypl7y47xxeg.png",
						Type: "TalentCard",
						StatusQuantity: 0,
						Description:
							"敌方「蕴种印」状态触发时，若队伍具有「摩耶之殿」状态，且队伍具有火元素角色，则改为草元素伤害。纳西妲使用元素爆发时，若队伍具有雷元素角色，敌方所有角色「蕴种印」状态的可用次数+1；而若队伍具有水元素角色，「摩耶之殿」状态的可用轮数+1。<br />\n" +
							"<i>纳西妲·心识蕴藏之种：「知识，与你分享。」</i>",
						Keywords: "增伤",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					TalentCardProperties: {
						Cost: [0, 3, "Dendro", 0],
						OrientedCharacterCardID: "Nahida",
						SkillType: "ElementalBurst"
					}
				},

				// Weapon cards
				{ // SacrificialSword
					BasicProperties: {
						ID: "SacrificialSword",
						Name: "祭礼剑",
						Image: "https://patchwiki.biligame.com/images/ys/e/ed/rhqp0iimgfrhbirbmebpau2wge69e6e.png",
						Type: "WeaponCard",
						StatusQuantity: 0,
						Description:
							"战斗行动中：增加10点伤害。使用元素战技后：生成1个前台角色元素的骰子。<br />\n" +
							"<i>气定神闲·祭礼剑：经历漫长岁月的道具用剑，在时间之风中变得如钢铁般锋利。</i>",
						Keywords: "增伤, 骰子",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					WeaponCardProperties: {
						Cost: [0, 3, "Matching"],
						WeaponType: "Sword",
						Execution:
							"if(ReadPhase() == \"CombatAction\" && IsInTurn()) {\n" +
							"	AdjustDamage(\"Any\", \"Plus\", 10);\n" +
							"}\n" +
							"if(ReadPhase() == \"AfterCombatAction\" && IsInTurn() && ReadActionType() == \"ElementalSkill\") {\n" +
							"	AddDice(\"Self\", ReadElementType(\"Self\", \"Active\"), 1);\n" +
							"}"
					}
				},
				{ // FavoniusSword
					BasicProperties: {
						ID: "FavoniusSword",
						Name: "西风剑",
						Image: "https://patchwiki.biligame.com/images/ys/e/e9/hlmn9pon3w2plsem1vnijehtdkz74qs.png",
						Type: "WeaponCard",
						StatusQuantity: 0,
						Description:
							"战斗行动中：增加10点伤害。使用元素战技后：额外补充1点能量。<br />\n" +
							"<i>顺风而行·西风剑：「传说那获授幼狼之名的骑士能将细雨斩落，剑锋卷起的风便足以将蔷薇摧折；无人抵达过他昔日的境界，但骑士当初许诺守护的誓言，却依然传承到了今天。」</i>",
						Keywords: "增伤, 充能",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					WeaponCardProperties: {
						Cost: [0, 3, "Matching"],
						WeaponType: "Sword",
						Execution:
							"if(ReadPhase() == \"CombatAction\" && IsInTurn()) {\n" +
							"	AdjustDamage(\"Any\", \"Plus\", 10);\n" +
							"}\n" +
							"if(ReadPhase() == \"AfterCombatAction\" && IsInTurn() && ReadActionType() == \"ElementalSkill\") {\n" +
							"	RechargeEnergy(\"Self\", \"Active\", 1);\n" +
							"}"
					}
				},
				{ // SacrificialBow
					BasicProperties: {
						ID: "SacrificialBow",
						Name: "祭礼弓",
						Image: "https://patchwiki.biligame.com/images/ys/b/bc/hzosu3c6jjjnrx0jvn01q0cadg7it3p.png",
						Type: "WeaponCard",
						StatusQuantity: 0,
						Description:
							"战斗行动中：增加10点伤害。使用元素战技后：生成1个前台角色元素的骰子。<br />\n" +
							"<i>气定神闲·祭礼弓：经历漫长岁月的猎弓，上面的仪式性装饰依然清晰可见。</i>",
						Keywords: "增伤, 骰子",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					WeaponCardProperties: {
						Cost: [0, 3, "Matching"],
						WeaponType: "Bow",
						Execution:
							"if(ReadPhase() == \"CombatAction\" && IsInTurn()) {\n" +
							"	AdjustDamage(\"Any\", \"Plus\", 10);\n" +
							"}\n" +
							"if(ReadPhase() == \"AfterCombatAction\" && IsInTurn() && ReadActionType() == \"ElementalSkill\") {\n" +
							"	AddDice(\"Self\", ReadElementType(\"Self\", \"Active\"), 1);\n" +
							"}"
					}
				},
				{ // SkywardSpine
					BasicProperties: {
						ID: "SkywardSpine",
						Name: "天空之脊",
						Image: "https://patchwiki.biligame.com/images/ys/1/1c/efvwwrrjf7oqp1g0e0nvvm5d2md1gmh.png",
						Type: "WeaponCard",
						StatusQuantity: 0,
						Description:
							"战斗行动中：增加10点伤害。若使用普通攻击，且本轮尚未使用过普通攻击，再增加10点伤害。<br />\n" +
							"<i>斫贯黑翼·天空之脊：支撑高天之脊。坚硬不移的意志，支撑着风之龙与恶秽的仇敌誓死厮杀。</i>",
						Keywords: "增伤",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					WeaponCardProperties: {
						Cost: [0, 3, "Matching"],
						WeaponType: "Polearm",
						Execution:
							"if(ReadPhase() == \"CombatAction\" && IsInTurn()) {\n" +
							"	AdjustDamage(\"Any\", \"Plus\", 10);\n" +
							"	if(ReadActionType() == \"NormalAttack\" && ReadActionUsed(\"NormalAttack\") == 0) {\n" +
							"		AdjustDamage(\"Any\", \"Plus\", 10);\n" +
							"	}\n" +
							"}"
					}
				},
				{ // SacrificialFragments
					BasicProperties: {
						ID: "SacrificialFragments",
						Name: "祭礼残章",
						Image: "https://patchwiki.biligame.com/images/ys/8/83/4qb8wwdoak49myq4pygysp96m4q3w38.png",
						Type: "WeaponCard",
						StatusQuantity: 0,
						Description:
							"战斗行动中：增加10点伤害。使用元素战技后：生成1个前台角色元素的骰子。<br />\n" +
							"<i>气定神闲·祭礼残章：经历漫长岁月的歌谱残章，其上记载的颂词已经无法辨认。</i>",
						Keywords: "增伤, 骰子",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					WeaponCardProperties: {
						Cost: [0, 3, "Matching"],
						WeaponType: "Catalyst",
						Execution:
							"if(ReadPhase() == \"CombatAction\" && IsInTurn()) {\n" +
							"	AdjustDamage(\"Any\", \"Plus\", 10);\n" +
							"}\n" +
							"if(ReadPhase() == \"AfterCombatAction\" && IsInTurn() && ReadActionType() == \"ElementalSkill\") {\n" +
							"	AddDice(\"Self\", ReadElementType(\"Self\", \"Active\"), 1);\n" +
							"}"
					}
				},

				// Artifact cards
				{ // ThunderSummonersCrown
					BasicProperties: {
						ID: "ThunderSummonersCrown",
						Name: "唤雷的头冠",
						Image: "https://patchwiki.biligame.com/images/ys/f/f2/3kqwwmgv0mc9b6twoga4akt2fl3qkfg.png",
						Type: "ArtifactCard",
						StatusQuantity: 0,
						Description:
							"若本轮尚未使用过技能且尚未打出过天赋牌：所有技能与天赋牌少花费1个雷骰子。<br />\n" +
							"<i>紫电骤雨·唤雷的头冠：「直至清澈的歌声穿透低鸣的雷雨、撕裂空中的阴霭，将小小的光传给那高天的鸟儿。」</i>",
						Keywords: "雷, 节省",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					ArtifactCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Execution:
							"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn() &&\n" +
							"ReadActionUsed(\"NormalAttack\") + ReadActionUsed(\"ElementalSkill\") + ReadActionUsed(\"ElementalBurst\") + ReadActionUsed(\"TalentCard\") == 0) {\n" +
							"	AdjustCost(\"NormalAttack\", \"Electro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalSkill\", \"Electro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalBurst\", \"Electro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"TalentCard\", \"Electro\", \"Subtract\", 1);\n" +
							"}"
					}
				},
				{ // WineStainedTricorne
					BasicProperties: {
						ID: "WineStainedTricorne",
						Name: "酒渍船帽",
						Image: "https://patchwiki.biligame.com/images/ys/d/de/p9oa9xa86ye9w8bm75ezy7t7vlepu2o.png",
						Type: "ArtifactCard",
						StatusQuantity: 0,
						Description:
							"若本轮尚未使用过技能且尚未打出过天赋牌：所有技能与天赋牌少花费1个水骰子。<br />\n" +
							"<i>沉渊旧梦·酒渍船帽：「酒渍的船帽被暴风扬入高空，逐浪乘波而去。而那注定失去故乡之人，进行着无望无求的纷争。」</i>",
						Keywords: "水, 节省",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					ArtifactCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Execution:
							"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn() &&\n" +
							"ReadActionUsed(\"NormalAttack\") + ReadActionUsed(\"ElementalSkill\") + ReadActionUsed(\"ElementalBurst\") + ReadActionUsed(\"TalentCard\") == 0) {\n" +
							"	AdjustCost(\"NormalAttack\", \"Hydro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalSkill\", \"Hydro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalBurst\", \"Hydro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"TalentCard\", \"Hydro\", \"Subtract\", 1);\n" +
							"}"
					}
				},
				{ // ViridescentVenerersDiadem
					BasicProperties: {
						ID: "ViridescentVenerersDiadem",
						Name: "翠绿的猎人之冠",
						Image: "https://patchwiki.biligame.com/images/ys/c/c6/0tdxuzfmp46pjnzh6e529osvw0wwuul.png",
						Type: "ArtifactCard",
						StatusQuantity: 0,
						Description:
							"若本轮尚未使用过技能且尚未打出过天赋牌：所有技能与天赋牌少花费1个风骰子。<br />\n" +
							"<i>青翠之风·翠绿的猎人之冠：「无人能为最杰出的猎人加冕，因为高于她的只有地与天。」</i>",
						Keywords: "风, 节省",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					ArtifactCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Execution:
							"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn() &&\n" +
							"ReadActionUsed(\"NormalAttack\") + ReadActionUsed(\"ElementalSkill\") + ReadActionUsed(\"ElementalBurst\") + ReadActionUsed(\"TalentCard\") == 0) {\n" +
							"	AdjustCost(\"NormalAttack\", \"Anemo\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalSkill\", \"Anemo\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalBurst\", \"Anemo\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"TalentCard\", \"Anemo\", \"Subtract\", 1);\n" +
							"}"
					}
				},
				{ // OrnateKabuto
					BasicProperties: {
						ID: "OrnateKabuto",
						Name: "华饰之兜",
						Image: "https://patchwiki.biligame.com/images/ys/1/13/rbuar3xraah88tn30akgf7s13drg8ex.png",
						Type: "ArtifactCard",
						StatusQuantity: 0,
						Description: "使用元素爆发后：给自己补充1点能量。",
						Keywords: "充能",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					ArtifactCardProperties: {
						Cost: [0, 1, "Matching"],
						Execution:
							"if(ReadPhase() == \"AfterCombatAction\" && IsInTurn() && ReadActionType() == \"ElementalBurst\") {\n" +
							"	RechargeEnergy(\"Master\", \"\", 1);\n" +
							"}"
					}
				},
				{ // WitchsScorchingHat
					BasicProperties: {
						ID: "WitchsScorchingHat",
						Name: "焦灼的魔女帽",
						Image: "https://patchwiki.biligame.com/images/ys/0/0c/8l1oguykgruquo563g3x5o40yc7exnw.png",
						Type: "ArtifactCard",
						StatusQuantity: 0,
						Description:
							"若本轮尚未使用过技能且尚未打出过天赋牌：所有技能与天赋牌少花费1个火骰子。<br />\n" +
							"<i>烬行哀歌·焦灼的魔女帽：「…狂舞的灰烬啊，回答我，为何夺去我所爱的一切？」</i>",
						Keywords: "火, 节省",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					ArtifactCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Execution:
							"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn() &&\n" +
							"ReadActionUsed(\"NormalAttack\") + ReadActionUsed(\"ElementalSkill\") + ReadActionUsed(\"ElementalBurst\") + ReadActionUsed(\"TalentCard\") == 0) {\n" +
							"	AdjustCost(\"NormalAttack\", \"Pyro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalSkill\", \"Pyro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalBurst\", \"Pyro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"TalentCard\", \"Pyro\", \"Subtract\", 1);\n" +
							"}"
					}
				},
				{ // LaurelCoronet
					BasicProperties: {
						ID: "LaurelCoronet",
						Name: "月桂的宝冠",
						Image: "https://patchwiki.biligame.com/images/ys/6/67/mfr04lgwagmyzhta3poan8wc3odbzh6.png",
						Type: "ArtifactCard",
						StatusQuantity: 0,
						Description:
							"若本轮尚未使用过技能且尚未打出过天赋牌：所有技能与天赋牌少花费1个草骰子。<br />\n" +
							"<i>唤雨之纹·月桂的宝冠：「万物生灭皆有定期，其循环往复不停。」</i>",
						Keywords: "草, 节省",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					ArtifactCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Execution:
							"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn() &&\n" +
							"ReadActionUsed(\"NormalAttack\") + ReadActionUsed(\"ElementalSkill\") + ReadActionUsed(\"ElementalBurst\") + ReadActionUsed(\"TalentCard\") == 0) {\n" +
							"	AdjustCost(\"NormalAttack\", \"Dendro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalSkill\", \"Dendro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"ElementalBurst\", \"Dendro\", \"Subtract\", 1);\n" +
							"	AdjustCost(\"TalentCard\", \"Dendro\", \"Subtract\", 1);\n" +
							"}"
					}
				},

				// Support cards
				{ // JadeChamber
					BasicProperties: {
						ID: "JadeChamber",
						Name: "群玉阁",
						Image: "https://patchwiki.biligame.com/images/ys/0/0a/6x8h2dpe0q06yvhlcws5cox470yrzol.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"掷骰后，若前台角色元素的骰子小于2个：转换其他骰子直至该元素骰子有2个。行动阶段起始时，若手牌小等于3张：生成1个万能骰子。弃置此牌。<br />\n" +
							"<i>高阁入云坐看星：「据说其中有千种珍宝，琳琅满目。」</i>",
						Keywords: "场地, 骰子",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 0, "Matching"],
						Duration: [0, 9, "Rounds"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"RollPhase BeforeStandby\" && ReadDiceQuantity(\"Self\", ReadElementType(\"Self\", \"Active\")) < 2) {\n" +
							"	ConvertDice(\"Self\", ReadElementType(\"Self\", \"Active\"), 2 - ReadDiceQuantity(\"Self\", ReadElementType(\"Self\", \"Active\")));\n" +
							"	ConsumeUsage();\n" +
							"}\n" +
							"if(ReadPhase() == \"ActionPhase Beginning\" && ReadHandQuantity(\"Self\") <= 3) {\n" +
							"	AddDice(\"Self\", \"Omni\", 1);\n" +
							"	ConsumeUsage();\n" +
							"	DiscardCardByID(\"Self\", \"JadeChamber\");\n" +
							"}"
					}
				},
				{ // DawnWinery
					BasicProperties: {
						ID: "DawnWinery",
						Name: "晨曦酒庄",
						Image: "https://patchwiki.biligame.com/images/ys/5/57/2ljm8vcbzh1ggn2pgl992xhdcsiy709.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"若本轮尚未切换过角色：切换角色少花费1个骰子。<br />\n" +
							"<i>曙光初照的庄园：「最好的永远是明年酿造出的酒。」</i>",
						Keywords: "场地, 切换角色, 节省",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Matching"],
						Duration: [0, 9, "Rounds"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn() && ReadActionUsed(\"CharacterCard\") == 0) {\n" +
							"	AdjustCost(\"CharacterCard\", \"Any\", \"Subtract\", 1);\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},
				{ // LiyueHarborWharf
					BasicProperties: {
						ID: "LiyueHarborWharf",
						Name: "璃月港口",
						Image: "https://patchwiki.biligame.com/images/ys/9/9a/dgrljtiauz2pb2bfyajyqmf77xojvzi.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"在结束阶段：抓2张牌。<br />\n" +
							"<i>千帆络绎之城：「风雨犹祝，山海同欢，是承天地之佑。」</i>",
						Keywords: "场地, 抓牌",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Matching"],
						Duration: [0, 2, "Usages"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"EndPhase\") {\n" +
							"	DrawCard(2);\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},
				{ // FavoniusCathedral
					BasicProperties: {
						ID: "FavoniusCathedral",
						Name: "西风大教堂",
						Image: "https://patchwiki.biligame.com/images/ys/9/98/sicc61o43rgjhmaif2sed83afi986g4.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"在结束阶段，若前台角色血量未满：给前台角色治疗20点血量。<br />\n" +
							"<i>虔心之人聚于此：「若向风真诚倾诉，那话语总有一日能吹拂至神明的耳畔。」</i>",
						Keywords: "场地, 治疗",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Matching"],
						Duration: [0, 2, "Usages"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"EndPhase\" && ReadHP(\"Self\", \"Active\") < ReadMaxHP(\"Self\", \"Active\")) {\n" +
							"	Heal(\"Self\", \"Active\", 20);\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},
				{ // WangshuInn
					BasicProperties: {
						ID: "WangshuInn",
						Name: "望舒客栈",
						Image: "https://patchwiki.biligame.com/images/ys/2/2a/sbjk2mxz7gngu107jmlod9wu1oxlwcs.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"在结束阶段，若任一后台角色可用且血量未满：给一名可用且血量最低的后台角色治疗20点血量。<br />\n" +
							"<i>荻花远眺之高车：「坊间有传说道，纵然贵为仙人者，偶尔也会在此沐浴清冷的月光…」</i>",
						Keywords: "场地, 治疗",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Matching"],
						Duration: [0, 2, "Usages"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"EndPhase\") {\n" +
							"	if(ReadActiveCharacterNumber() == 1 && (IsHPFull(\"Self\", 2) && IsHPFull(\"Self\", 3)) == false) {\n" +
							"		if(IsCharacterAvailable(\"Self\", 2) && ReadHP(\"Self\", 2) <= ReadHP(\"Self\", 3)) {\n" +
							"			Heal(\"Self\", 2, 20);\n" +
							"			ConsumeUsage();\n" +
							"		}\n" +
							"		if(IsCharacterAvailable(\"Self\", 3) && ReadHP(\"Self\", 3) < ReadHP(\"Self\", 2)) {\n" +
							"			Heal(\"Self\", 3, 20);\n" +
							"			ConsumeUsage();\n" +
							"		}\n" +
							"	}\n" +
							"	if(ReadActiveCharacterNumber() == 2 && (IsHPFull(\"Self\", 1) && IsHPFull(\"Self\", 3)) == false) {\n" +
							"		if(IsCharacterAvailable(\"Self\", 1) && ReadHP(\"Self\", 1) <= ReadHP(\"Self\", 3)) {\n" +
							"			Heal(\"Self\", 1, 20);\n" +
							"			ConsumeUsage();\n" +
							"		}\n" +
							"		if(IsCharacterAvailable(\"Self\", 3) && ReadHP(\"Self\", 3) < ReadHP(\"Self\", 1)) {\n" +
							"			Heal(\"Self\", 3, 20);\n" +
							"			ConsumeUsage();\n" +
							"		}\n" +
							"	}\n" +
							"	if(ReadActiveCharacterNumber() == 3 && (IsHPFull(\"Self\", 1) && IsHPFull(\"Self\", 2)) == false) {\n" +
							"		if(IsCharacterAvailable(\"Self\", 1) && ReadHP(\"Self\", 1) <= ReadHP(\"Self\", 2)) {\n" +
							"			Heal(\"Self\", 1, 20);\n" +
							"			ConsumeUsage();\n" +
							"		}\n" +
							"		if(IsCharacterAvailable(\"Self\", 2) && ReadHP(\"Self\", 2) < ReadHP(\"Self\", 1)) {\n" +
							"			Heal(\"Self\", 2, 20);\n" +
							"			ConsumeUsage();\n" +
							"		}\n" +
							"	}\n" +
							"}"
					}
				},
				{ // Katheryne
					BasicProperties: {
						ID: "Katheryne",
						Name: "凯瑟琳",
						Image: "https://patchwiki.biligame.com/images/ys/2/2a/i2hef3q17rpztvnpoxq15mrmybm9x49.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"切换角色时，若本轮尚未切换过角色：视为快速行动。<br />\n" +
							"<i>协会招待员·凯瑟琳：「向着星辰与深渊！欢迎来到冒险家协会。」</i>",
						Keywords: "伙伴, 切换角色, 快速行动",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 1, "Matching"],
						Duration: [0, 9, "Rounds"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"CombatAction\" && IsInTurn() && ReadActionType() == \"CharacterCard\" && ReadActionUsed(\"CharacterCard\") == 0) {\n" +
							"	TreatAsFastAction();\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},
				{ // Katheryne(Copy)
					BasicProperties: {
						ID: "Katheryne(Copy)",
						Name: "凯瑟琳",
						Image: "https://patchwiki.biligame.com/images/ys/2/2a/i2hef3q17rpztvnpoxq15mrmybm9x49.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"切换角色时，若本轮尚未切换过角色：视为快速行动。<br />\n" +
							"<i>协会招待员·凯瑟琳：「向着星辰与深渊！欢迎来到冒险家协会。」</i>",
						Keywords: "伙伴, 切换角色, 快速行动",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 1, "Matching"],
						Duration: [0, 9, "Rounds"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"CombatAction\" && IsInTurn() && ReadActionType() == \"CharacterCard\" && ReadActionUsed(\"CharacterCard\") == 0) {\n" +
							"	TreatAsFastAction();\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},
				{ // IronTongueTian
					BasicProperties: {
						ID: "IronTongueTian",
						Name: "田铁嘴",
						Image: "https://patchwiki.biligame.com/images/ys/1/18/bd6u76qgpzfrxc008arzy7iaob5r9tf.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"在结束阶段：从前台角色开始向右过场，若当前角色可用且能量未满，给当前角色补充1点能量并结束过场，否则继续过场。例如若2号角色是前台角色且能量已满，1号与3号角色能量均未满，则只给3号角色补充能量。<br />\n" +
							"<i>书接上回·田铁嘴：「我来给您掰扯掰扯这个道理，您来听听原汁原味的评书！」</i>",
						Keywords: "伙伴, 充能",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Duration: [0, 2, "Usages"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"EndPhase\") {\n" +
							"	let CurrentCharacter = ReadActiveCharacterNumber();\n" +
							"	for(let Looper = 1; Looper <= 3; Looper++) {\n" +
							"		if(IsCharacterAvailable(\"Self\", CurrentCharacter) && IsEnergyFull(\"Self\", CurrentCharacter) == false) {\n" +
							"			RechargeEnergy(\"Self\", CurrentCharacter, 1);\n" +
							"			ConsumeUsage();\n" +
							"			return;\n" +
							"		}\n" +
							"		CurrentCharacter++;\n" +
							"		if(CurrentCharacter > 3) {\n" +
							"			CurrentCharacter = 1;\n" +
							"		}\n" +
							"	}\n" +
							"}"
					}
				},
				{ // RedFeatherFan
					BasicProperties: {
						ID: "RedFeatherFan",
						Name: "红羽团扇",
						Image: "https://patchwiki.biligame.com/images/ys/5/55/2cin6jrvueqg6dzicu0kucxix3bt22a.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"若本轮切换过角色1次：切换角色少花费1个骰子。切换角色时，若本轮切换过角色1次：视为快速行动。<br />\n" +
							"<i>莫名风来·红羽团扇：据说在天狗手中，这把团扇可以发挥各种各样的力量。在一般人手中，它只有着「让身体稍微变得轻盈一点」程度的能力。但即使是这种程度的能力，也足够一般人运用了。</i>",
						Keywords: "道具, 切换角色, 节省, 快速行动",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Matching"],
						Duration: [0, 9, "Rounds"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"ActionPhase BeforeStandby\" && IsInTurn() && ReadActionUsed(\"CharacterCard\") == 1) {\n" +
							"	AdjustCost(\"CharacterCard\", \"Any\", \"Subtract\", 1);\n" +
							"	ConsumeUsage();\n" +
							"}\n" +
							"if(ReadPhase() == \"CombatAction\" && IsInTurn() && ReadActionType() == \"CharacterCard\" && ReadActionUsed(\"CharacterCard\") == 1) {\n" +
							"	TreatAsFastAction();\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},
				{ // NRE
					BasicProperties: {
						ID: "NRE",
						Name: "便携营养袋",
						Image: "https://patchwiki.biligame.com/images/ys/7/74/ncqn0ulqwex355mork7j3iv6mh3ihjs.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"此卡牌出牌时：抓1张「料理」卡牌。出牌时，若为「料理」卡牌，且本轮尚未抓过牌：抓1张「料理」卡牌。<br />\n" +
							"<i>应急摄入·便携料理：「及时补充营养，以便剧烈运动。」</i>",
						Keywords: "道具",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Duration: [0, 9, "Rounds"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"ActionPhase Working\" && IsInTurn() && ReadActionType() == \"PlayCard\" && IsCardPlayedByID(\"NRE\")) {\n" +
							"	DrawCardByKeyword(\"料理\", 1);\n" +
							"	ConsumeUsage();\n" +
							"}\n" +
							"if(ReadPhase() == \"ActionPhase Working\" && IsInTurn() && ReadActionType() == \"PlayCard\" && IsCardPlayedByKeyword(\"料理\")) {\n" +
							"	DrawCardByKeyword(\"料理\", 1);\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},
				{ // NRE(Copy)
					BasicProperties: {
						ID: "NRE(Copy)",
						Name: "便携营养袋",
						Image: "https://patchwiki.biligame.com/images/ys/7/74/ncqn0ulqwex355mork7j3iv6mh3ihjs.png",
						Type: "SupportCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"此卡牌出牌时：抓1张「料理」卡牌。出牌时，若为「料理」卡牌，且本轮尚未抓过牌：抓1张「料理」卡牌。<br />\n" +
							"<i>应急摄入·便携料理：「及时补充营养，以便剧烈运动。」</i>",
						Keywords: "道具",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					SupportCardProperties: {
						Cost: [0, 2, "Unaligned"],
						Duration: [0, 9, "Rounds"],
						HasCounter: false,
						Requirement: "",
						Execution:
							"if(ReadPhase() == \"ActionPhase Working\" && IsInTurn() && ReadActionType() == \"PlayCard\" && IsCardPlayedByID(\"NRE\")) {\n" +
							"	DrawCardByKeyword(\"料理\", 1);\n" +
							"	ConsumeUsage();\n" +
							"}\n" +
							"if(ReadPhase() == \"ActionPhase Working\" && IsInTurn() && ReadActionType() == \"PlayCard\" && IsCardPlayedByKeyword(\"料理\")) {\n" +
							"	DrawCardByKeyword(\"料理\", 1);\n" +
							"	ConsumeUsage();\n" +
							"}"
					}
				},

				// Event cards
				{ // TheBestestTravelCompanion
					BasicProperties: {
						ID: "TheBestestTravelCompanion",
						Name: "最好的伙伴！",
						Image: "https://patchwiki.biligame.com/images/ys/3/31/qs88vt79a91in3oi0d5wqx23w5q4ca6.png",
						Type: "EventCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"生成2个万能骰子。<br />\n" +
							"<i>最好的伙伴！：「你是万千星辰中的一颗，于我而言却是整个世界。」</i>",
						Keywords: "骰子",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					EventCardProperties: {
						Cost: [0, 2, "Unaligned"],
						AffectedObject: "None",
						Requirement: "",
						Execution: "AddDice(\"Self\", \"Omni\", 2);"
					}
				},
				{ // Starsigns
					BasicProperties: {
						ID: "Starsigns",
						Name: "星天之兆",
						Image: "https://patchwiki.biligame.com/images/ys/6/6c/s5qj42emq02or7ky8d7fbhq29ji1vs8.png",
						Type: "EventCard",
						StatusQuantity: 0,
						Description:
							"无出牌条件。<br />\n" +
							"给前台角色补充1点能量。<br />\n" +
							"<i>命星轨迹：「此乃命运，无可违逆。」</i>",
						Keywords: "充能",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					EventCardProperties: {
						Cost: [0, 2, "Unaligned"],
						AffectedObject: "None",
						Requirement: "",
						Execution: "RechargeEnergy(\"Self\", \"Active\", 1);"
					}
				},
				{ // SendOff
					BasicProperties: {
						ID: "SendOff",
						Name: "送你一程",
						Image: "https://patchwiki.biligame.com/images/ys/6/6a/joh02z64r6cakdknq4hqvizqjexl7id.png",
						Type: "EventCard",
						StatusQuantity: 0,
						Description:
							"选择敌方的一张召唤物牌。<br />\n" +
							"使作用对象的可用数-2。<br />\n" +
							"<i>送你一程：「一波送走～往生堂服务品质保证，包您满意！」</i>",
						Keywords: "消灭",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					EventCardProperties: {
						Cost: [0, 2, "Matching"],
						AffectedObject: "EnemySummonsCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"AdjustCardDurationByID(\"Enemy\", ReadCardIDBySelection(\"Enemy\", \"Summons\", AffectedObject[3]), \"Subtract\", 2);"
					}
				},
				{ // JueyunGuoba
					BasicProperties: {
						ID: "JueyunGuoba",
						Name: "绝云锅巴",
						Image: "https://patchwiki.biligame.com/images/ys/0/01/jawideb446oo56q18uco8pgeasxcdm6.png",
						Type: "EventCard",
						StatusQuantity: 1,
						Description:
							"选择我方的一张不具有「饱食」状态的角色牌。<br />\n" +
							"给作用对象施加「绝云锅巴」与「饱食」状态。<br />\n" +
							"<i>绝云锅巴：香香脆脆的绝云锅巴，锅巴吃了都赞不绝口。</i>",
						Keywords: "料理, 增伤",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki"
					},
					EventCardProperties: {
						Cost: [0, 2, "Matching"],
						AffectedObject: "SelfCharacterCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"AddStatus(\"Self\", AffectedObject[3], \"JueyunGuoba\", 1);\n" +
							"AddBuiltinStatus(\"Self\", AffectedObject[3], \"Satiety\");"
					},
					Status: [
						0,
						{
							Name: "绝云锅巴",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/e/ec/Genius_Invokation_TCG_Food.png",
							Type: "CharacterStatus",
							Duration: [0, 1, "Usages"],
							Description: "普通攻击时：增加10点伤害。",
							Execution:
								"if(ReadPhase() == \"CombatAction\" && IsInTurn() && ReadActionType() == \"NormalAttack\") {\n" +
								"	AdjustDamage(\"Any\", \"Plus\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					]
				},
				{ // LotusFlowerCrisp
					BasicProperties: {
						ID: "LotusFlowerCrisp",
						Name: "莲花酥",
						Image: "https://patchwiki.biligame.com/images/ys/a/aa/g863l7o8uza67qzk2b12fap7ly45y47.png",
						Type: "EventCard",
						StatusQuantity: 1,
						Description:
							"选择我方的一张不具有「饱食」状态的角色牌。<br />\n" +
							"给作用对象施加「莲花酥」与「饱食」状态。<br />\n" +
							"<i>莲花酥：面团做成的花骨朵儿，放入宛若湖面一般的油锅中，花瓣便一层一层地绽放开来，真是赏心悦目。</i>",
						Keywords: "料理, 防御",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki"
					},
					EventCardProperties: {
						Cost: [0, 1, "Matching"],
						AffectedObject: "SelfCharacterCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"AddStatus(\"Self\", AffectedObject[3], \"LotusFlowerCrisp\", 1);\n" +
							"AddBuiltinStatus(\"Self\", AffectedObject[3], \"Satiety\");"
					},
					Status: [
						0,
						{
							Name: "莲花酥",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/e/ec/Genius_Invokation_TCG_Food.png",
							Type: "CharacterStatus",
							Duration: [0, 1, "Usages"],
							Description: "受到伤害时：抵消30点伤害。",
							Execution:
								"if(ReadPhase() == \"CombatAction\" && IsInTurn() == false && ReadDamage() > 0) {\n" +
								"	AdjustDamage(\"Any\", \"Subtract\", 30);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					]
				},
				{ // MondstadtHashBrown
					BasicProperties: {
						ID: "MondstadtHashBrown",
						Name: "蒙德土豆饼",
						Image: "https://patchwiki.biligame.com/images/ys/3/32/ox48zjrb7n79sve0z6sibryi60uug4y.png",
						Type: "EventCard",
						StatusQuantity: 0,
						Description:
							"选择我方的一张不具有「饱食」状态的角色牌。<br />\n" +
							"给作用对象治疗20点血量。并施加「饱食」状态。<br />\n" +
							"<i>蒙德土豆饼：香甜的口感，验证了某位提瓦特知名美食家的名言——能被冠以当地地名的菜肴，绝对不会难吃。</i>",
						Keywords: "料理, 治疗",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					EventCardProperties: {
						Cost: [0, 1, "Matching"],
						AffectedObject: "SelfCharacterCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"Heal(\"Self\", AffectedObject[3], 20);\n" +
							"AddBuiltinStatus(\"Self\", AffectedObject[3], \"Satiety\");"
					}
				},
				{ // MondstadtHashBrown(Copy)
					BasicProperties: {
						ID: "MondstadtHashBrown(Copy)",
						Name: "蒙德土豆饼",
						Image: "https://patchwiki.biligame.com/images/ys/3/32/ox48zjrb7n79sve0z6sibryi60uug4y.png",
						Type: "EventCard",
						StatusQuantity: 0,
						Description:
							"选择我方的一张不具有「饱食」状态的角色牌。<br />\n" +
							"给作用对象治疗20点血量。并施加「饱食」状态。<br />\n" +
							"<i>蒙德土豆饼：香甜的口感，验证了某位提瓦特知名美食家的名言——能被冠以当地地名的菜肴，绝对不会难吃。</i>",
						Keywords: "料理, 治疗",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI"
					},
					EventCardProperties: {
						Cost: [0, 1, "Matching"],
						AffectedObject: "SelfCharacterCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"Heal(\"Self\", AffectedObject[3], 20);\n" +
							"AddBuiltinStatus(\"Self\", AffectedObject[3], \"Satiety\");"
					}
				},
				{ // MushroomPizza
					BasicProperties: {
						ID: "MushroomPizza",
						Name: "烤蘑菇披萨",
						Image: "https://patchwiki.biligame.com/images/ys/a/a0/ip75smx88tp8mpo1ehy3ehgym9hwbz2.png",
						Type: "EventCard",
						StatusQuantity: 1,
						Description:
							"选择我方的一张不具有「饱食」状态的角色牌。<br />\n" +
							"给作用对象治疗10点血量。并施加「烤蘑菇披萨」与「饱食」状态。<br />\n" +
							"<i>烤蘑菇披萨：据说有学者曾通过精密计算，研究出披萨的「最公平切法」，但由于太麻烦，根本没有人使用…</i>",
						Keywords: "料理, 治疗",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki"
					},
					EventCardProperties: {
						Cost: [0, 1, "Matching"],
						AffectedObject: "SelfCharacterCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"Heal(\"Self\", AffectedObject[3], 10);\n" +
							"AddStatus(\"Self\", AffectedObject[3], \"MushroomPizza\", 1);\n" +
							"AddBuiltinStatus(\"Self\", AffectedObject[3], \"Satiety\");"
					},
					Status: [
						0,
						{
							Name: "烤蘑菇披萨",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/e/ec/Genius_Invokation_TCG_Food.png",
							Type: "CharacterStatus",
							Duration: [0, 2, "Rounds"],
							Description: "在结束阶段：给自己治疗10点血量。",
							Execution:
								"if(ReadPhase() == \"EndPhase\") {\n" +
								"	Heal(\"Master\", \"\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					]
				},
				{ // MushroomPizza(Copy)
					BasicProperties: {
						ID: "MushroomPizza(Copy)",
						Name: "烤蘑菇披萨",
						Image: "https://patchwiki.biligame.com/images/ys/a/a0/ip75smx88tp8mpo1ehy3ehgym9hwbz2.png",
						Type: "EventCard",
						StatusQuantity: 1,
						Description:
							"选择我方的一张不具有「饱食」状态的角色牌。<br />\n" +
							"给作用对象治疗10点血量。并施加「烤蘑菇披萨」与「饱食」状态。<br />\n" +
							"<i>烤蘑菇披萨：据说有学者曾通过精密计算，研究出披萨的「最公平切法」，但由于太麻烦，根本没有人使用…</i>",
						Keywords: "料理, 治疗",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki"
					},
					EventCardProperties: {
						Cost: [0, 1, "Matching"],
						AffectedObject: "SelfCharacterCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"Heal(\"Self\", AffectedObject[3], 10);\n" +
							"AddStatus(\"Self\", AffectedObject[3], \"MushroomPizza\", 1);\n" +
							"AddBuiltinStatus(\"Self\", AffectedObject[3], \"Satiety\");"
					},
					Status: [
						0,
						{
							Name: "烤蘑菇披萨",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/e/ec/Genius_Invokation_TCG_Food.png",
							Type: "CharacterStatus",
							Duration: [0, 2, "Rounds"],
							Description: "在结束阶段：给自己治疗10点血量。",
							Execution:
								"if(ReadPhase() == \"EndPhase\") {\n" +
								"	Heal(\"Master\", \"\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					]
				},
				{ // MatsutakeMeatRolls
					BasicProperties: {
						ID: "MatsutakeMeatRolls",
						Name: "松茸酿肉卷",
						Image: "https://patchwiki.biligame.com/images/ys/6/65/kv8ibdqu6xksgd7egwfo6q6nyetg14p.png",
						Type: "EventCard",
						StatusQuantity: 1,
						Description:
							"选择我方的一张不具有「饱食」状态的角色牌。<br />\n" +
							"给作用对象治疗20点血量。并施加「松茸酿肉卷」与「饱食」状态。<br />\n" +
							"<i>松茸酿肉卷：肉泥裹上松茸细火慢煎，使松茸内吸满了香浓的肉汁，令人垂涎欲滴。</i>",
						Keywords: "料理, 治疗",
						Version: 1.00
					},
					Credits: {
						Author: "Sam Toki",
						Contact: "https://SamToki.github.io",
						CardSource: "GenshinOfficial",
						ImageSource: "原神WIKI, Genshin Impact Wiki"
					},
					EventCardProperties: {
						Cost: [0, 2, "Matching"],
						AffectedObject: "SelfCharacterCard",
						Requirement: "",
						Execution:
							"let AffectedObject = ReadActionSelection();\n" +
							"Heal(\"Self\", AffectedObject[3], 20);\n" +
							"AddStatus(\"Self\", AffectedObject[3], \"MatsutakeMeatRolls\", 1);\n" +
							"AddBuiltinStatus(\"Self\", AffectedObject[3], \"Satiety\");"
					},
					Status: [
						0,
						{
							Name: "松茸酿肉卷",
							Image: "https://static.wikia.nocookie.net/gensin-impact/images/e/ec/Genius_Invokation_TCG_Food.png",
							Type: "CharacterStatus",
							Duration: [0, 3, "Rounds"],
							Description: "在结束阶段：给自己治疗10点血量。",
							Execution:
								"if(ReadPhase() == \"EndPhase\") {\n" +
								"	Heal(\"Master\", \"\", 10);\n" +
								"	ConsumeUsage();\n" +
								"}"
						}
					]
				}
			]
		};
