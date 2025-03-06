// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// © 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

// Refresh
	// Editor
	function RefreshEditor() {
		// Card ID list
		ChangeText("Datalist_CardIDList", "");
		for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
			AddText("Datalist_CardIDList", "<option value=\"" + Casket.Card[Looper].BasicProperties.ID + "\">");
		}

		// Identify card and show properties
		Editor.CardNumber = 0;
		ChangeText("Label_EditorCardNumber", "");
		if(ReadValue("Textbox_EditorOpen") != "") {
			Editor.CardNumber = ReadCardNumberByID(ReadValue("Textbox_EditorOpen"));
			if(Editor.CardNumber > 0) {
				// Choose a Card to Edit
				ChangeText("Label_EditorCardNumber", "#" + Editor.CardNumber);
				ChangeDisabled("Button_EditorDuplicate", false);
				ChangeDisabled("Button_EditorExport", false);
				ChangeDisabled("Button_EditorDelete", false);
				ChangeDisabled("Button_EditorClose", false);

				// Basic Properties
				Show("Item_EditorBasicProperties");
				ChangeValue("Textbox_EditorBasicPropertiesID", Casket.Card[Editor.CardNumber].BasicProperties.ID);
				ChangeValue("Textbox_EditorBasicPropertiesName", Casket.Card[Editor.CardNumber].BasicProperties.Name);
				ChangeValue("Textbox_EditorBasicPropertiesImage", Casket.Card[Editor.CardNumber].BasicProperties.Image);
				ChangeImage("Image_EditorBasicProperties", Casket.Card[Editor.CardNumber].BasicProperties.Image);
				ChangeValue("Combobox_EditorBasicPropertiesType", Casket.Card[Editor.CardNumber].BasicProperties.Type);
				ChangeValue("Textbox_EditorBasicPropertiesStatusQuantity", Casket.Card[Editor.CardNumber].BasicProperties.StatusQuantity);
				ChangeValue("Textbox_EditorBasicPropertiesKeywords", Casket.Card[Editor.CardNumber].BasicProperties.Keywords);
				ChangeValue("Textbox_EditorBasicPropertiesDescription", Casket.Card[Editor.CardNumber].BasicProperties.Description);
				ChangeValue("Textbox_EditorBasicPropertiesVersion", Casket.Card[Editor.CardNumber].BasicProperties.Version.toFixed(2));

				// Credits
				Show("Item_EditorCredits");
				ChangeValue("Textbox_EditorCreditsAuthor", Casket.Card[Editor.CardNumber].Credits.Author);
				ChangeValue("Textbox_EditorCreditsContact", Casket.Card[Editor.CardNumber].Credits.Contact);
				ChangeValue("Combobox_EditorCreditsCardSource", Casket.Card[Editor.CardNumber].Credits.CardSource);
				ChangeValue("Textbox_EditorCreditsImageSource", Casket.Card[Editor.CardNumber].Credits.ImageSource);
				if(Casket.Card[Editor.CardNumber].BasicProperties.Type == "CharacterCard") {
					if(Casket.Card[Editor.CardNumber].Credits.VoiceoverSource == undefined) {
						Casket.Card[Editor.CardNumber].Credits.VoiceoverSource = "";
					}
					Show("Ctrl_EditorCreditsVoiceoverSource");
					ChangeValue("Textbox_EditorCreditsVoiceoverSource", Casket.Card[Editor.CardNumber].Credits.VoiceoverSource);
				} else {
					Hide("Ctrl_EditorCreditsVoiceoverSource");
					delete Casket.Card[Editor.CardNumber].Credits.VoiceoverSource;
				}

				// Exclusive properties
				HideToCorner("Item_EditorCharacterCardProperties");
				HideToCorner("Item_EditorNormalAttack");
				HideToCorner("Item_EditorElementalSkill");
				HideToCorner("Item_EditorSecondaryElementalSkill");
				HideToCorner("Item_EditorElementalBurst");
				HideToCorner("Item_EditorIntroSkill");
				HideToCorner("Item_EditorOutroSkill");
				HideToCorner("Item_EditorPassiveSkill");
				HideToCorner("Item_EditorAffiliatedCard");
				HideToCorner("Item_EditorTalentCardProperties");
				HideToCorner("Item_EditorWeaponCardProperties");
				HideToCorner("Item_EditorArtifactCardProperties");
				HideToCorner("Item_EditorSupportCardProperties");
				HideToCorner("Item_EditorEventCardProperties");
				HideToCorner("Item_EditorCharacterProfile");
				HideToCorner("Item_EditorSpokenLine");
				HideToCorner("Item_EditorVoiceover");
				switch(Casket.Card[Editor.CardNumber].BasicProperties.Type) {
					case "CharacterCard":
						// Delete other exclusive properties
						delete Casket.Card[Editor.CardNumber].TalentCardProperties;
						delete Casket.Card[Editor.CardNumber].WeaponCardProperties;
						delete Casket.Card[Editor.CardNumber].ArtifactCardProperties;
						delete Casket.Card[Editor.CardNumber].SupportCardProperties;
						delete Casket.Card[Editor.CardNumber].EventCardProperties;

						// Character Card Properties
						if(Casket.Card[Editor.CardNumber].CharacterCardProperties == undefined) {
							Casket.Card[Editor.CardNumber].CharacterCardProperties = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard.CharacterCardProperties);
						}
						Show("Item_EditorCharacterCardProperties");
						ChangeValue("Textbox_EditorCharacterCardPropertiesMaxHP", Casket.Card[Editor.CardNumber].CharacterCardProperties.MaxHP);
						ChangeValue("Textbox_EditorCharacterCardPropertiesMaxEnergy", Casket.Card[Editor.CardNumber].CharacterCardProperties.MaxEnergy);
						ChangeValue("Combobox_EditorCharacterCardPropertiesElementType", Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType);
						ChangeValue("Combobox_EditorCharacterCardPropertiesWeaponType", Casket.Card[Editor.CardNumber].CharacterCardProperties.WeaponType);
						ChangeValue("Combobox_EditorCharacterCardPropertiesCombatOrientation", Casket.Card[Editor.CardNumber].CharacterCardProperties.CombatOrientation);
						ChangeChecked("Checkbox_EditorCharacterCardPropertiesHasSecondaryElementalSkill", Casket.Card[Editor.CardNumber].CharacterCardProperties.HasSecondaryElementalSkill);
						ChangeChecked("Checkbox_EditorCharacterCardPropertiesHasIntroSkill", Casket.Card[Editor.CardNumber].CharacterCardProperties.HasIntroSkill);
						ChangeChecked("Checkbox_EditorCharacterCardPropertiesHasOutroSkill", Casket.Card[Editor.CardNumber].CharacterCardProperties.HasOutroSkill);
						ChangeChecked("Checkbox_EditorCharacterCardPropertiesHasPassiveSkill", Casket.Card[Editor.CardNumber].CharacterCardProperties.HasPassiveSkill);
						ChangeChecked("Checkbox_EditorCharacterCardPropertiesHasAffiliatedCard", Casket.Card[Editor.CardNumber].CharacterCardProperties.HasAffiliatedCard);

						// Normal Attack
						if(Casket.Card[Editor.CardNumber].NormalAttack == undefined) {
							Casket.Card[Editor.CardNumber].NormalAttack = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard.NormalAttack);
						}
						Show("Item_EditorNormalAttack");
						ChangeValue("Textbox_EditorNormalAttackName", Casket.Card[Editor.CardNumber].NormalAttack.Name);
						ChangeValue("Textbox_EditorNormalAttackCostQuantity", Casket.Card[Editor.CardNumber].NormalAttack.Cost[1]);
						switch(Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType) {
							case "Pyro":
								ChangeText("Label_EditorNormalAttackCostType", "火 +");
								break;
							case "Hydro":
								ChangeText("Label_EditorNormalAttackCostType", "水 +");
								break;
							case "Anemo":
								ChangeText("Label_EditorNormalAttackCostType", "风 +");
								break;
							case "Electro":
								ChangeText("Label_EditorNormalAttackCostType", "雷 +");
								break;
							case "Dendro":
								ChangeText("Label_EditorNormalAttackCostType", "草 +");
								break;
							case "Cryo":
								ChangeText("Label_EditorNormalAttackCostType", "冰 +");
								break;
							case "Geo":
								ChangeText("Label_EditorNormalAttackCostType", "岩 +");
								break;
							default:
								AlertSystemError("The value of Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType \"" + Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType + "\" in function RefreshEditor is invalid. The card ID is \"" + Casket.Card[Editor.CardNumber].BasicProperties.ID + "\".");
								break;
						}
						ChangeValue("Textbox_EditorNormalAttackCostUnaligned", Casket.Card[Editor.CardNumber].NormalAttack.Cost[2]);
						ChangeValue("Textbox_EditorNormalAttackDescription", Casket.Card[Editor.CardNumber].NormalAttack.Description);
						ChangeValue("Textbox_EditorNormalAttackExecution", Casket.Card[Editor.CardNumber].NormalAttack.Execution);
						ChangeValue("Textbox_EditorNormalAttackChangedAttackExecution", Casket.Card[Editor.CardNumber].NormalAttack.ChargedAttackExecution);
						ChangeValue("Textbox_EditorNormalAttackPlungingAttackExecution", Casket.Card[Editor.CardNumber].NormalAttack.PlungingAttackExecution);

						// Elemental Skill
						if(Casket.Card[Editor.CardNumber].ElementalSkill == undefined) {
							Casket.Card[Editor.CardNumber].ElementalSkill = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard.ElementalSkill);
						}
						Show("Item_EditorElementalSkill");
						ChangeValue("Textbox_EditorElementalSkillName", Casket.Card[Editor.CardNumber].ElementalSkill.Name);
						ChangeValue("Textbox_EditorElementalSkillImage", Casket.Card[Editor.CardNumber].ElementalSkill.Image);
						ChangeImage("Image_EditorElementalSkill", Casket.Card[Editor.CardNumber].ElementalSkill.Image);
						ChangeValue("Textbox_EditorElementalSkillCostQuantity", Casket.Card[Editor.CardNumber].ElementalSkill.Cost);
						switch(Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType) {
							case "Pyro":
								ChangeText("Label_EditorElementalSkillCostType", "火");
								break;
							case "Hydro":
								ChangeText("Label_EditorElementalSkillCostType", "水");
								break;
							case "Anemo":
								ChangeText("Label_EditorElementalSkillCostType", "风");
								break;
							case "Electro":
								ChangeText("Label_EditorElementalSkillCostType", "雷");
								break;
							case "Dendro":
								ChangeText("Label_EditorElementalSkillCostType", "草");
								break;
							case "Cryo":
								ChangeText("Label_EditorElementalSkillCostType", "冰");
								break;
							case "Geo":
								ChangeText("Label_EditorElementalSkillCostType", "岩");
								break;
							default:
								AlertSystemError("The value of Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType \"" + Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType + "\" in function RefreshEditor is invalid. The card ID is \"" + Casket.Card[Editor.CardNumber].BasicProperties.ID + "\".");
								break;
						}
						ChangeValue("Textbox_EditorElementalSkillDescription", Casket.Card[Editor.CardNumber].ElementalSkill.Description);
						ChangeValue("Textbox_EditorElementalSkillExecution", Casket.Card[Editor.CardNumber].ElementalSkill.Execution);

						// Secondary Elemental Skill
						if(Casket.Card[Editor.CardNumber].CharacterCardProperties.HasSecondaryElementalSkill == true) {
							if(Casket.Card[Editor.CardNumber].SecondaryElementalSkill == undefined) {
								Casket.Card[Editor.CardNumber].SecondaryElementalSkill = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.SecondaryElementalSkill);
							}
							Show("Item_EditorSecondaryElementalSkill");
							ChangeValue("Textbox_EditorSecondaryElementalSkillName", Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Name);
							ChangeValue("Textbox_EditorSecondaryElementalSkillImage", Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Image);
							ChangeImage("Image_EditorSecondaryElementalSkill", Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Image);
							ChangeValue("Textbox_EditorSecondaryElementalSkillCostQuantity", Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Cost);
							switch(Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType) {
								case "Pyro":
									ChangeText("Label_EditorSecondaryElementalSkillCostType", "火");
									break;
								case "Hydro":
									ChangeText("Label_EditorSecondaryElementalSkillCostType", "水");
									break;
								case "Anemo":
									ChangeText("Label_EditorSecondaryElementalSkillCostType", "风");
									break;
								case "Electro":
									ChangeText("Label_EditorSecondaryElementalSkillCostType", "雷");
									break;
								case "Dendro":
									ChangeText("Label_EditorSecondaryElementalSkillCostType", "草");
									break;
								case "Cryo":
									ChangeText("Label_EditorSecondaryElementalSkillCostType", "冰");
									break;
								case "Geo":
									ChangeText("Label_EditorSecondaryElementalSkillCostType", "岩");
									break;
								default:
									AlertSystemError("The value of Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType \"" + Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType + "\" in function RefreshEditor is invalid. The card ID is \"" + Casket.Card[Editor.CardNumber].BasicProperties.ID + "\".");
									break;
							}
							ChangeValue("Textbox_EditorSecondaryElementalSkillDescription", Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Description);
							ChangeValue("Textbox_EditorSecondaryElementalSkillExecution", Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Execution);
						} else {
							delete Casket.Card[Editor.CardNumber].SecondaryElementalSkill;
						}

						// Elemental Burst
						if(Casket.Card[Editor.CardNumber].ElementalBurst == undefined) {
							Casket.Card[Editor.CardNumber].ElementalBurst = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard.ElementalBurst);
						}
						Show("Item_EditorElementalBurst");
						ChangeValue("Textbox_EditorElementalBurstName", Casket.Card[Editor.CardNumber].ElementalBurst.Name);
						ChangeValue("Textbox_EditorElementalBurstImage", Casket.Card[Editor.CardNumber].ElementalBurst.Image);
						ChangeImage("Image_EditorElementalBurst", Casket.Card[Editor.CardNumber].ElementalBurst.Image);
						ChangeValue("Textbox_EditorElementalBurstCostQuantity", Casket.Card[Editor.CardNumber].ElementalBurst.Cost);
						switch(Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType) {
							case "Pyro":
								ChangeText("Label_EditorElementalBurstCostType", "火");
								break;
							case "Hydro":
								ChangeText("Label_EditorElementalBurstCostType", "水");
								break;
							case "Anemo":
								ChangeText("Label_EditorElementalBurstCostType", "风");
								break;
							case "Electro":
								ChangeText("Label_EditorElementalBurstCostType", "雷");
								break;
							case "Dendro":
								ChangeText("Label_EditorElementalBurstCostType", "草");
								break;
							case "Cryo":
								ChangeText("Label_EditorElementalBurstCostType", "冰");
								break;
							case "Geo":
								ChangeText("Label_EditorElementalBurstCostType", "岩");
								break;
							default:
								AlertSystemError("The value of Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType \"" + Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType + "\" in function RefreshEditor is invalid. The card ID is \"" + Casket.Card[Editor.CardNumber].BasicProperties.ID + "\".");
								break;
						}
						ChangeValue("Textbox_EditorElementalBurstDescription", Casket.Card[Editor.CardNumber].ElementalBurst.Description);
						ChangeValue("Textbox_EditorElementalBurstExecution", Casket.Card[Editor.CardNumber].ElementalBurst.Execution);

						// Intro Skill
						if(Casket.Card[Editor.CardNumber].CharacterCardProperties.HasIntroSkill == true) {
							if(Casket.Card[Editor.CardNumber].IntroSkill == undefined) {
								Casket.Card[Editor.CardNumber].IntroSkill = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.IntroSkill);
							}
							Show("Item_EditorIntroSkill");
							ChangeValue("Textbox_EditorIntroSkillName", Casket.Card[Editor.CardNumber].IntroSkill.Name);
							ChangeValue("Textbox_EditorIntroSkillImage", Casket.Card[Editor.CardNumber].IntroSkill.Image);
							ChangeImage("Image_EditorIntroSkill", Casket.Card[Editor.CardNumber].IntroSkill.Image);
							ChangeValue("Textbox_EditorIntroSkillDescription", Casket.Card[Editor.CardNumber].IntroSkill.Description);
							ChangeValue("Textbox_EditorIntroSkillExecution", Casket.Card[Editor.CardNumber].IntroSkill.Execution);
						} else {
							delete Casket.Card[Editor.CardNumber].IntroSkill;
						}

						// Outro Skill
						if(Casket.Card[Editor.CardNumber].CharacterCardProperties.HasOutroSkill == true) {
							if(Casket.Card[Editor.CardNumber].OutroSkill == undefined) {
								Casket.Card[Editor.CardNumber].OutroSkill = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.OutroSkill);
							}
							Show("Item_EditorOutroSkill");
							ChangeValue("Textbox_EditorOutroSkillName", Casket.Card[Editor.CardNumber].OutroSkill.Name);
							ChangeValue("Textbox_EditorOutroSkillImage", Casket.Card[Editor.CardNumber].OutroSkill.Image);
							ChangeImage("Image_EditorOutroSkill", Casket.Card[Editor.CardNumber].OutroSkill.Image);
							ChangeValue("Textbox_EditorOutroSkillDescription", Casket.Card[Editor.CardNumber].OutroSkill.Description);
							ChangeValue("Textbox_EditorOutroSkillExecution", Casket.Card[Editor.CardNumber].OutroSkill.Execution);
						} else {
							delete Casket.Card[Editor.CardNumber].OutroSkill;
						}

						// Passive Skill
						if(Casket.Card[Editor.CardNumber].CharacterCardProperties.HasPassiveSkill == true) {
							if(Casket.Card[Editor.CardNumber].PassiveSkill == undefined) {
								Casket.Card[Editor.CardNumber].PassiveSkill = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.PassiveSkill);
							}
							Show("Item_EditorPassiveSkill");
							ChangeValue("Textbox_EditorPassiveSkillName", Casket.Card[Editor.CardNumber].PassiveSkill.Name);
							ChangeValue("Textbox_EditorPassiveSkillImage", Casket.Card[Editor.CardNumber].PassiveSkill.Image);
							ChangeImage("Image_EditorPassiveSkill", Casket.Card[Editor.CardNumber].PassiveSkill.Image);
							ChangeValue("Textbox_EditorPassiveSkillDescription", Casket.Card[Editor.CardNumber].PassiveSkill.Description);
							ChangeValue("Textbox_EditorPassiveSkillTrigger", Casket.Card[Editor.CardNumber].PassiveSkill.Trigger);
							ChangeValue("Textbox_EditorPassiveSkillExecution", Casket.Card[Editor.CardNumber].PassiveSkill.Execution);
						} else {
							delete Casket.Card[Editor.CardNumber].PassiveSkill;
						}

						// Affiliated Card
						if(Casket.Card[Editor.CardNumber].CharacterCardProperties.HasAffiliatedCard == true) {
							if(Casket.Card[Editor.CardNumber].AffiliatedCard == undefined) {
								Casket.Card[Editor.CardNumber].AffiliatedCard = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.AffiliatedCard);
							}
							Show("Item_EditorAffiliatedCard");
							ChangeValue("Textbox_EditorAffiliatedCardName", Casket.Card[Editor.CardNumber].AffiliatedCard.Name);
							ChangeValue("Textbox_EditorAffiliatedCardImage", Casket.Card[Editor.CardNumber].AffiliatedCard.Image);
							ChangeImage("Image_EditorAffiliatedCardImage", Casket.Card[Editor.CardNumber].AffiliatedCard.Image);
							ChangeValue("Combobox_EditorAffiliatedCardType", Casket.Card[Editor.CardNumber].AffiliatedCard.Type);
							switch(Casket.Card[Editor.CardNumber].AffiliatedCard.Type) {
								case "SummonsCard":
									Hide("Ctrl_EditorAffiliatedCardCost");
									Hide("Ctrl_EditorAffiliatedCardAffectedObject");
									Hide("Ctrl_EditorAffiliatedCardRequirement");
									delete Casket.Card[Editor.CardNumber].AffiliatedCard.Cost;
									delete Casket.Card[Editor.CardNumber].AffiliatedCard.AffectedObject;
									delete Casket.Card[Editor.CardNumber].AffiliatedCard.Requirement;
									if(Casket.Card[Editor.CardNumber].AffiliatedCard.Duration == undefined) {
										Casket.Card[Editor.CardNumber].AffiliatedCard.Duration = {
											Quantity: 3, Type: "Usages"
										};
									}
									Show("Ctrl_EditorAffiliatedCardDuration");
									ChangeValue("Textbox_EditorAffiliatedCardDurationQuantity", Casket.Card[Editor.CardNumber].AffiliatedCard.Duration.Quantity);
									ChangeValue("Combobox_EditorAffiliatedCardDurationType", Casket.Card[Editor.CardNumber].AffiliatedCard.Duration.Type);
									if(Casket.Card[Editor.CardNumber].AffiliatedCard.HasCounter == undefined) {
										Casket.Card[Editor.CardNumber].AffiliatedCard.HasCounter = false;
									}
									Show("Ctrl_EditorAffiliatedCardHasCounter");
									ChangeChecked("Checkbox_EditorAffiliatedCardHasCounter", Casket.Card[Editor.CardNumber].AffiliatedCard.HasCounter);
									break;
								case "EventCard":
									Hide("Ctrl_EditorAffiliatedCardDuration");
									Hide("Ctrl_EditorAffiliatedCardHasCounter");
									delete Casket.Card[Editor.CardNumber].AffiliatedCard.Duration;
									delete Casket.Card[Editor.CardNumber].AffiliatedCard.HasCounter;
									if(Casket.Card[Editor.CardNumber].AffiliatedCard.Cost == undefined) {
										Casket.Card[Editor.CardNumber].AffiliatedCard.Cost = [0, 2, "Matching"];
									}
									Show("Ctrl_EditorAffiliatedCardCost");
									ChangeValue("Textbox_EditorAffiliatedCardCostQuantity", Casket.Card[Editor.CardNumber].AffiliatedCard.Cost[1]);
									ChangeValue("Combobox_EditorAffiliatedCardCostType", Casket.Card[Editor.CardNumber].AffiliatedCard.Cost[2]);
									if(Casket.Card[Editor.CardNumber].AffiliatedCard.AffectedObject == undefined) {
										Casket.Card[Editor.CardNumber].AffiliatedCard.AffectedObject = "None";
									}
									Show("Ctrl_EditorAffiliatedCardAffectedObject");
									ChangeValue("Combobox_EditorAffiliatedCardAffectedObject", Casket.Card[Editor.CardNumber].AffiliatedCard.AffectedObject);
									if(Casket.Card[Editor.CardNumber].AffiliatedCard.Requirement == undefined) {
										Casket.Card[Editor.CardNumber].AffiliatedCard.Requirement = "";
									}
									Show("Ctrl_EditorAffiliatedCardRequirement");
									ChangeValue("Textbox_EditorAffiliatedCardRequirement", Casket.Card[Editor.CardNumber].AffiliatedCard.Requirement);
									break;
								default:
									AlertSystemError("The value of Casket.Card[Editor.CardNumber].AffiliatedCard.Type \"" + Casket.Card[Editor.CardNumber].AffiliatedCard.Type + "\" in function RefreshEditor is invalid.");
									break;
							}
							ChangeValue("Textbox_EditorAffiliatedCardDescription", Casket.Card[Editor.CardNumber].AffiliatedCard.Description);
							ChangeValue("Textbox_EditorAffiliatedCardExecution", Casket.Card[Editor.CardNumber].AffiliatedCard.Execution);
						} else {
							delete Casket.Card[Editor.CardNumber].AffiliatedCard;
						}

						// Character Profile
						if(Casket.Card[Editor.CardNumber].CharacterProfile == undefined) {
							Casket.Card[Editor.CardNumber].CharacterProfile = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard.CharacterProfile);
						}
						Show("Item_EditorCharacterProfile");
						ChangeValue("Textbox_EditorCharacterProfileFrom", Casket.Card[Editor.CardNumber].CharacterProfile.From);
						ChangeLanguage("Textbox_EditorCharacterProfileVA", Casket.Card[Editor.CardNumber].CharacterProfile.Language);
						ChangeValue("Textbox_EditorCharacterProfileVA", Casket.Card[Editor.CardNumber].CharacterProfile.VA);
						ChangeValue("Textbox_EditorCharacterProfileLanguage", Casket.Card[Editor.CardNumber].CharacterProfile.Language);
						ChangeValue("Combobox_EditorCharacterProfileGender", Casket.Card[Editor.CardNumber].CharacterProfile.Gender);
						ChangeValue("Textbox_EditorCharacterProfileBirthday", Casket.Card[Editor.CardNumber].CharacterProfile.Birthday);

						// Spoken Lines
						if(Casket.Card[Editor.CardNumber].SpokenLine == undefined) {
							Casket.Card[Editor.CardNumber].SpokenLine = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard.SpokenLine);
						}
						Show("Item_EditorSpokenLine");
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorSpokenLineBecomingActive" + Looper, Casket.Card[Editor.CardNumber].SpokenLine.BecomingActive[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorSpokenLineElementalSkill" + Looper, Casket.Card[Editor.CardNumber].SpokenLine.ElementalSkill[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorSpokenLineElementalBurst" + Looper, Casket.Card[Editor.CardNumber].SpokenLine.ElementalBurst[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorSpokenLineHeavyHitTaken" + Looper, Casket.Card[Editor.CardNumber].SpokenLine.HeavyHitTaken[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorSpokenLineFallen" + Looper, Casket.Card[Editor.CardNumber].SpokenLine.Fallen[Looper]);
						}

						// Voiceovers
						if(Casket.Card[Editor.CardNumber].Voiceover == undefined) {
							Casket.Card[Editor.CardNumber].Voiceover = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard.Voiceover);
						}
						Show("Item_EditorVoiceover");
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorVoiceoverBecomingActive" + Looper, Casket.Card[Editor.CardNumber].Voiceover.BecomingActive[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorVoiceoverElementalSkill" + Looper, Casket.Card[Editor.CardNumber].Voiceover.ElementalSkill[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorVoiceoverElementalBurst" + Looper, Casket.Card[Editor.CardNumber].Voiceover.ElementalBurst[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorVoiceoverHeavyHitTaken" + Looper, Casket.Card[Editor.CardNumber].Voiceover.HeavyHitTaken[Looper]);
						}
						for(let Looper = 1; Looper <= 3; Looper++) {
							ChangeValue("Textbox_EditorVoiceoverFallen" + Looper, Casket.Card[Editor.CardNumber].Voiceover.Fallen[Looper]);
						}
						break;
					case "TalentCard":
						// Delete other exclusive properties
						delete Casket.Card[Editor.CardNumber].CharacterCardProperties;
						delete Casket.Card[Editor.CardNumber].NormalAttack;
						delete Casket.Card[Editor.CardNumber].ElementalSkill;
						delete Casket.Card[Editor.CardNumber].SecondaryElementalSkill;
						delete Casket.Card[Editor.CardNumber].ElementalBurst;
						delete Casket.Card[Editor.CardNumber].IntroSkill;
						delete Casket.Card[Editor.CardNumber].OutroSkill;
						delete Casket.Card[Editor.CardNumber].PassiveSkill;
						delete Casket.Card[Editor.CardNumber].AffiliatedCard;
						delete Casket.Card[Editor.CardNumber].WeaponCardProperties;
						delete Casket.Card[Editor.CardNumber].ArtifactCardProperties;
						delete Casket.Card[Editor.CardNumber].SupportCardProperties;
						delete Casket.Card[Editor.CardNumber].EventCardProperties;
						delete Casket.Card[Editor.CardNumber].CharacterProfile;
						delete Casket.Card[Editor.CardNumber].SpokenLine;
						delete Casket.Card[Editor.CardNumber].Voiceover;

						// Talent Card Properties
						if(Casket.Card[Editor.CardNumber].TalentCardProperties == undefined) {
							Casket.Card[Editor.CardNumber].TalentCardProperties = structuredClone(Casket0.BuiltinCard.EmptyActionCard.TalentCardProperties);
						}
						Show("Item_EditorTalentCardProperties");
						ChangeValue("Textbox_EditorTalentCardPropertiesCostQuantity", Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[1]);
						ChangeValue("Combobox_EditorTalentCardPropertiesCostType", Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[2]);
						if(Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[2] != "Unaligned") {
							Show("Label_EditorTalentCardPropertiesCost1");
							Show("Textbox_EditorTalentCardPropertiesCostUnaligned");
							Show("Label_EditorTalentCardPropertiesCost2");
							ChangeValue("Textbox_EditorTalentCardPropertiesCostUnaligned", Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[3]);
						} else {
							HideHorizontally("Label_EditorTalentCardPropertiesCost1");
							HideHorizontally("Textbox_EditorTalentCardPropertiesCostUnaligned");
							HideHorizontally("Label_EditorTalentCardPropertiesCost2");
						}
						ChangeValue("Textbox_EditorTalentCardPropertiesOrientedCharacterCardID", Casket.Card[Editor.CardNumber].TalentCardProperties.OrientedCharacterCardID);
						ChangeValue("Combobox_EditorTalentCardPropertiesSkillType", Casket.Card[Editor.CardNumber].TalentCardProperties.SkillType);
						break;
					case "WeaponCard":
						// Delete other exclusive properties
						delete Casket.Card[Editor.CardNumber].CharacterCardProperties;
						delete Casket.Card[Editor.CardNumber].NormalAttack;
						delete Casket.Card[Editor.CardNumber].ElementalSkill;
						delete Casket.Card[Editor.CardNumber].SecondaryElementalSkill;
						delete Casket.Card[Editor.CardNumber].ElementalBurst;
						delete Casket.Card[Editor.CardNumber].IntroSkill;
						delete Casket.Card[Editor.CardNumber].OutroSkill;
						delete Casket.Card[Editor.CardNumber].PassiveSkill;
						delete Casket.Card[Editor.CardNumber].AffiliatedCard;
						delete Casket.Card[Editor.CardNumber].TalentCardProperties;
						delete Casket.Card[Editor.CardNumber].ArtifactCardProperties;
						delete Casket.Card[Editor.CardNumber].SupportCardProperties;
						delete Casket.Card[Editor.CardNumber].EventCardProperties;
						delete Casket.Card[Editor.CardNumber].CharacterProfile;
						delete Casket.Card[Editor.CardNumber].SpokenLine;
						delete Casket.Card[Editor.CardNumber].Voiceover;

						// Weapon Card Properties
						if(Casket.Card[Editor.CardNumber].WeaponCardProperties == undefined) {
							Casket.Card[Editor.CardNumber].WeaponCardProperties = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.WeaponCardProperties);
						}
						Show("Item_EditorWeaponCardProperties");
						ChangeValue("Textbox_EditorWeaponCardPropertiesCostQuantity", Casket.Card[Editor.CardNumber].WeaponCardProperties.Cost[1]);
						ChangeValue("Combobox_EditorWeaponCardPropertiesCostType", Casket.Card[Editor.CardNumber].WeaponCardProperties.Cost[2]);
						ChangeValue("Combobox_EditorWeaponCardPropertiesWeaponType", Casket.Card[Editor.CardNumber].WeaponCardProperties.WeaponType);
						ChangeValue("Textbox_EditorWeaponCardPropertiesExecution", Casket.Card[Editor.CardNumber].WeaponCardProperties.Execution);
						break;
					case "ArtifactCard":
						// Delete other exclusive properties
						delete Casket.Card[Editor.CardNumber].CharacterCardProperties;
						delete Casket.Card[Editor.CardNumber].NormalAttack;
						delete Casket.Card[Editor.CardNumber].ElementalSkill;
						delete Casket.Card[Editor.CardNumber].SecondaryElementalSkill;
						delete Casket.Card[Editor.CardNumber].ElementalBurst;
						delete Casket.Card[Editor.CardNumber].IntroSkill;
						delete Casket.Card[Editor.CardNumber].OutroSkill;
						delete Casket.Card[Editor.CardNumber].PassiveSkill;
						delete Casket.Card[Editor.CardNumber].AffiliatedCard;
						delete Casket.Card[Editor.CardNumber].TalentCardProperties;
						delete Casket.Card[Editor.CardNumber].WeaponCardProperties;
						delete Casket.Card[Editor.CardNumber].SupportCardProperties;
						delete Casket.Card[Editor.CardNumber].EventCardProperties;
						delete Casket.Card[Editor.CardNumber].CharacterProfile;
						delete Casket.Card[Editor.CardNumber].SpokenLine;
						delete Casket.Card[Editor.CardNumber].Voiceover;

						// Artifact Card Properties
						if(Casket.Card[Editor.CardNumber].ArtifactCardProperties == undefined) {
							Casket.Card[Editor.CardNumber].ArtifactCardProperties = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.ArtifactCardProperties);
						}
						Show("Item_EditorArtifactCardProperties");
						ChangeValue("Textbox_EditorArtifactCardPropertiesCostQuantity", Casket.Card[Editor.CardNumber].ArtifactCardProperties.Cost[1]);
						ChangeValue("Combobox_EditorArtifactCardPropertiesCostType", Casket.Card[Editor.CardNumber].ArtifactCardProperties.Cost[2]);
						ChangeValue("Textbox_EditorArtifactCardPropertiesExecution", Casket.Card[Editor.CardNumber].ArtifactCardProperties.Execution);
						break;
					case "SupportCard":
						// Delete other exclusive properties
						delete Casket.Card[Editor.CardNumber].CharacterCardProperties;
						delete Casket.Card[Editor.CardNumber].NormalAttack;
						delete Casket.Card[Editor.CardNumber].ElementalSkill;
						delete Casket.Card[Editor.CardNumber].SecondaryElementalSkill;
						delete Casket.Card[Editor.CardNumber].ElementalBurst;
						delete Casket.Card[Editor.CardNumber].IntroSkill;
						delete Casket.Card[Editor.CardNumber].OutroSkill;
						delete Casket.Card[Editor.CardNumber].PassiveSkill;
						delete Casket.Card[Editor.CardNumber].AffiliatedCard;
						delete Casket.Card[Editor.CardNumber].TalentCardProperties;
						delete Casket.Card[Editor.CardNumber].WeaponCardProperties;
						delete Casket.Card[Editor.CardNumber].ArtifactCardProperties;
						delete Casket.Card[Editor.CardNumber].EventCardProperties;
						delete Casket.Card[Editor.CardNumber].CharacterProfile;
						delete Casket.Card[Editor.CardNumber].SpokenLine;
						delete Casket.Card[Editor.CardNumber].Voiceover;

						// Support Card Properties
						if(Casket.Card[Editor.CardNumber].SupportCardProperties == undefined) {
							Casket.Card[Editor.CardNumber].SupportCardProperties = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.SupportCardProperties);
						}
						Show("Item_EditorSupportCardProperties");
						ChangeValue("Textbox_EditorSupportCardPropertiesCostQuantity", Casket.Card[Editor.CardNumber].SupportCardProperties.Cost[1]);
						ChangeValue("Combobox_EditorSupportCardPropertiesCostType", Casket.Card[Editor.CardNumber].SupportCardProperties.Cost[2]);
						ChangeValue("Textbox_EditorSupportCardPropertiesDurationQuantity", Casket.Card[Editor.CardNumber].SupportCardProperties.Duration.Quantity);
						ChangeValue("Combobox_EditorSupportCardPropertiesDurationType", Casket.Card[Editor.CardNumber].SupportCardProperties.Duration.Type);
						ChangeChecked("Checkbox_EditorSupportCardPropertiesHasCounter", Casket.Card[Editor.CardNumber].SupportCardProperties.HasCounter);
						ChangeValue("Textbox_EditorSupportCardPropertiesRequirement", Casket.Card[Editor.CardNumber].SupportCardProperties.Requirement);
						ChangeValue("Textbox_EditorSupportCardPropertiesExecution", Casket.Card[Editor.CardNumber].SupportCardProperties.Execution);
						break;
					case "EventCard":
						// Delete other exclusive properties
						delete Casket.Card[Editor.CardNumber].CharacterCardProperties;
						delete Casket.Card[Editor.CardNumber].NormalAttack;
						delete Casket.Card[Editor.CardNumber].ElementalSkill;
						delete Casket.Card[Editor.CardNumber].SecondaryElementalSkill;
						delete Casket.Card[Editor.CardNumber].ElementalBurst;
						delete Casket.Card[Editor.CardNumber].IntroSkill;
						delete Casket.Card[Editor.CardNumber].OutroSkill;
						delete Casket.Card[Editor.CardNumber].PassiveSkill;
						delete Casket.Card[Editor.CardNumber].AffiliatedCard;
						delete Casket.Card[Editor.CardNumber].TalentCardProperties;
						delete Casket.Card[Editor.CardNumber].WeaponCardProperties;
						delete Casket.Card[Editor.CardNumber].ArtifactCardProperties;
						delete Casket.Card[Editor.CardNumber].SupportCardProperties;
						delete Casket.Card[Editor.CardNumber].CharacterProfile;
						delete Casket.Card[Editor.CardNumber].SpokenLine;
						delete Casket.Card[Editor.CardNumber].Voiceover;

						// Event Card Properties
						if(Casket.Card[Editor.CardNumber].EventCardProperties == undefined) {
							Casket.Card[Editor.CardNumber].EventCardProperties = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.EventCardProperties);
						}
						Show("Item_EditorEventCardProperties");
						ChangeValue("Textbox_EditorEventCardPropertiesCostQuantity", Casket.Card[Editor.CardNumber].EventCardProperties.Cost[1]);
						ChangeValue("Combobox_EditorEventCardPropertiesCostType", Casket.Card[Editor.CardNumber].EventCardProperties.Cost[2]);
						ChangeValue("Combobox_EditorEventCardPropertiesAffectedObject", Casket.Card[Editor.CardNumber].EventCardProperties.AffectedObject);
						ChangeValue("Textbox_EditorEventCardPropertiesRequirement", Casket.Card[Editor.CardNumber].EventCardProperties.Requirement);
						ChangeValue("Textbox_EditorEventCardPropertiesExecution", Casket.Card[Editor.CardNumber].EventCardProperties.Execution);
						break;
					default:
						AlertSystemError("The value of Casket.Card[Editor.CardNumber].BasicProperties.Type \"" + Casket.Card[Editor.CardNumber].BasicProperties.Type + "\" in function RefreshEditor is invalid. The card ID is \"" + Casket.Card[Editor.CardNumber].BasicProperties.ID + "\".");
						break;
				}

				// Status
				if(Casket.Card[Editor.CardNumber].BasicProperties.StatusQuantity >= 1) {
					if(Casket.Card[Editor.CardNumber].Status == undefined) {
						Casket.Card[Editor.CardNumber].Status = [
							0,
							structuredClone(Casket0.BuiltinCard.EmptyComplementCard.Status[1])
						];
					}
					Show("Item_EditorStatus1");
					ChangeValue("Textbox_EditorStatus1Name", Casket.Card[Editor.CardNumber].Status[1].Name);
					ChangeValue("Textbox_EditorStatus1Image", Casket.Card[Editor.CardNumber].Status[1].Image);
					ChangeImage("Image_EditorStatus1Image", Casket.Card[Editor.CardNumber].Status[1].Image);
					ChangeValue("Combobox_EditorStatus1Type", Casket.Card[Editor.CardNumber].Status[1].Type);
					ChangeValue("Textbox_EditorStatus1DurationQuantity", Casket.Card[Editor.CardNumber].Status[1].Duration.Quantity);
					ChangeValue("Combobox_EditorStatus1DurationType", Casket.Card[Editor.CardNumber].Status[1].Duration.Type);
					ChangeValue("Textbox_EditorStatus1Description", Casket.Card[Editor.CardNumber].Status[1].Description);
					ChangeValue("Textbox_EditorStatus1Execution", Casket.Card[Editor.CardNumber].Status[1].Execution);
				} else {
					HideToCorner("Item_EditorStatus1");
					delete Casket.Card[Editor.CardNumber].Status;
				}
				if(Casket.Card[Editor.CardNumber].BasicProperties.StatusQuantity >= 2) {
					if(Casket.Card[Editor.CardNumber].Status[2] == undefined) {
						Casket.Card[Editor.CardNumber].Status[2] = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.Status[1]);
					}
					Show("Item_EditorStatus2");
					ChangeValue("Textbox_EditorStatus2Name", Casket.Card[Editor.CardNumber].Status[2].Name);
					ChangeValue("Textbox_EditorStatus2Image", Casket.Card[Editor.CardNumber].Status[2].Image);
					ChangeImage("Image_EditorStatus2Image", Casket.Card[Editor.CardNumber].Status[2].Image);
					ChangeValue("Combobox_EditorStatus2Type", Casket.Card[Editor.CardNumber].Status[2].Type);
					ChangeValue("Textbox_EditorStatus2DurationQuantity", Casket.Card[Editor.CardNumber].Status[2].Duration.Quantity);
					ChangeValue("Combobox_EditorStatus2DurationType", Casket.Card[Editor.CardNumber].Status[2].Duration.Type);
					ChangeValue("Textbox_EditorStatus2Description", Casket.Card[Editor.CardNumber].Status[2].Description);
					ChangeValue("Textbox_EditorStatus2Execution", Casket.Card[Editor.CardNumber].Status[2].Execution);
				} else {
					HideToCorner("Item_EditorStatus2");
					if(Casket.Card[Editor.CardNumber].Status != undefined) {
						Casket.Card[Editor.CardNumber].Status.splice(3, 1);
						Casket.Card[Editor.CardNumber].Status.splice(2, 1);
					}
				}
				if(Casket.Card[Editor.CardNumber].BasicProperties.StatusQuantity >= 3) {
					if(Casket.Card[Editor.CardNumber].Status[3] == undefined) {
						Casket.Card[Editor.CardNumber].Status[3] = structuredClone(Casket0.BuiltinCard.EmptyComplementCard.Status[1]);
					}
					Show("Item_EditorStatus3");
					ChangeValue("Textbox_EditorStatus3Name", Casket.Card[Editor.CardNumber].Status[3].Name);
					ChangeValue("Textbox_EditorStatus3Image", Casket.Card[Editor.CardNumber].Status[3].Image);
					ChangeImage("Image_EditorStatus3Image", Casket.Card[Editor.CardNumber].Status[3].Image);
					ChangeValue("Combobox_EditorStatus3Type", Casket.Card[Editor.CardNumber].Status[3].Type);
					ChangeValue("Textbox_EditorStatus3DurationQuantity", Casket.Card[Editor.CardNumber].Status[3].Duration.Quantity);
					ChangeValue("Combobox_EditorStatus3DurationType", Casket.Card[Editor.CardNumber].Status[3].Duration.Type);
					ChangeValue("Textbox_EditorStatus3Description", Casket.Card[Editor.CardNumber].Status[3].Description);
					ChangeValue("Textbox_EditorStatus3Execution", Casket.Card[Editor.CardNumber].Status[3].Execution);
				} else {
					HideToCorner("Item_EditorStatus3");
					if(Casket.Card[Editor.CardNumber].Status != undefined) {
						Casket.Card[Editor.CardNumber].Status.splice(3, 1);
					}
				}
			} else {
				ShowDialog("Editor_CardNotFound",
					"Error",
					"找不到 ID 为「" + ReadValue("Textbox_EditorOpen") + "」的卡牌。",
					"", "", "", "确定");
				ChangeValue("Textbox_EditorOpen", "");
				ChangeDisabled("Button_EditorDuplicate", true);
				ChangeDisabled("Button_EditorExport", true);
				ChangeDisabled("Button_EditorDelete", true);
				ChangeDisabled("Button_EditorClose", true);
				HideToCorner("Item_EditorBasicProperties");
				HideToCorner("Item_EditorCredits");
				HideToCorner("Item_EditorCharacterCardProperties");
				HideToCorner("Item_EditorNormalAttack");
				HideToCorner("Item_EditorElementalSkill");
				HideToCorner("Item_EditorSecondaryElementalSkill");
				HideToCorner("Item_EditorElementalBurst");
				HideToCorner("Item_EditorIntroSkill");
				HideToCorner("Item_EditorOutroSkill");
				HideToCorner("Item_EditorPassiveSkill");
				HideToCorner("Item_EditorAffiliatedCard");
				HideToCorner("Item_EditorTalentCardProperties");
				HideToCorner("Item_EditorWeaponCardProperties");
				HideToCorner("Item_EditorArtifactCardProperties");
				HideToCorner("Item_EditorSupportCardProperties");
				HideToCorner("Item_EditorEventCardProperties");
				HideToCorner("Item_EditorStatus1");
				HideToCorner("Item_EditorStatus2");
				HideToCorner("Item_EditorStatus3");
				HideToCorner("Item_EditorCharacterProfile");
				HideToCorner("Item_EditorSpokenLine");
				HideToCorner("Item_EditorVoiceover");
			}
		} else {
			ChangeDisabled("Button_EditorDuplicate", true);
			ChangeDisabled("Button_EditorExport", true);
			ChangeDisabled("Button_EditorDelete", true);
			ChangeDisabled("Button_EditorClose", true);
			HideToCorner("Item_EditorBasicProperties");
			HideToCorner("Item_EditorCredits");
			HideToCorner("Item_EditorCharacterCardProperties");
			HideToCorner("Item_EditorNormalAttack");
			HideToCorner("Item_EditorElementalSkill");
			HideToCorner("Item_EditorSecondaryElementalSkill");
			HideToCorner("Item_EditorElementalBurst");
			HideToCorner("Item_EditorIntroSkill");
			HideToCorner("Item_EditorOutroSkill");
			HideToCorner("Item_EditorPassiveSkill");
			HideToCorner("Item_EditorAffiliatedCard");
			HideToCorner("Item_EditorTalentCardProperties");
			HideToCorner("Item_EditorWeaponCardProperties");
			HideToCorner("Item_EditorArtifactCardProperties");
			HideToCorner("Item_EditorSupportCardProperties");
			HideToCorner("Item_EditorEventCardProperties");
			HideToCorner("Item_EditorStatus1");
			HideToCorner("Item_EditorStatus2");
			HideToCorner("Item_EditorStatus3");
			HideToCorner("Item_EditorCharacterProfile");
			HideToCorner("Item_EditorSpokenLine");
			HideToCorner("Item_EditorVoiceover");
		}
	}

// Cmds
	// Editor
		// Choose a Card to Edit
		function DuplicateAndEditCard(CardNumber) {
			DuplicateCard(CardNumber);
			ChangeValue("Textbox_EditorOpen", Casket.Card[CardNumber + 1].BasicProperties.ID);
			RefreshEditor();
		}
		function CloseCard() {
			ChangeValue("Textbox_EditorOpen", "");
			RefreshEditor();
		}

		// Basic Properties
		function SetBasicPropertiesID() {
			switch(ReadValue("Textbox_EditorBasicPropertiesID")) {
				case "":
					ShowDialog("Editor_CardIDInvalid",
						"Error",
						"卡牌 ID 不能为空。",
						"", "", "", "确定");
					break;
				case "NewCharacterCard":
				case "NewActionCard":
				case "UnknownCard":
				case "EmptyCharacterCard":
				case "EmptyActionCard":
				case "EmptyComplementCard":
				// ???
				case "???":
					ShowDialog("Editor_CardIDInvalid",
						"Error",
						"「" + ReadValue("Textbox_EditorBasicPropertiesID") + "」是保留 ID，无法设定为新 ID。",
						"", "", "", "确定");
					break;
				default:
					if(ReadCardNumberByID(ReadValue("Textbox_EditorBasicPropertiesID")) == 0) {
						Casket.Card[Editor.CardNumber].BasicProperties.ID = ReadValue("Textbox_EditorBasicPropertiesID");
						ChangeValue("Textbox_EditorOpen", Casket.Card[Editor.CardNumber].BasicProperties.ID);
					} else {
						ShowDialog("Editor_CardIDInvalid",
							"Error",
							"该 ID 已被卡牌「" + ReadCardNameByID(ReadValue("Textbox_EditorBasicPropertiesID")) + "」占用，无法设定为新 ID。",
							"", "", "", "确定");
					}
					break;
			}
			RefreshEditor();
			RefreshGame();
		}
		function SetBasicPropertiesName() {
			Casket.Card[Editor.CardNumber].BasicProperties.Name = ReadValue("Textbox_EditorBasicPropertiesName");
			RefreshEditor();
			RefreshGame();
		}
		function SetBasicPropertiesImage() {
			Casket.Card[Editor.CardNumber].BasicProperties.Image = ReadValue("Textbox_EditorBasicPropertiesImage");
			RefreshEditor();
			RefreshGame();
		}
		function SetBasicPropertiesType() {
			Casket.Card[Editor.CardNumber].BasicProperties.Type = ReadValue("Combobox_EditorBasicPropertiesType");
			RefreshEditor();
			RefreshGame();
		}
		function SetBasicPropertiesStatusQuantity() {
			Casket.Card[Editor.CardNumber].BasicProperties.StatusQuantity = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorBasicPropertiesStatusQuantity")), 0, 3);
			RefreshEditor();
		}
		function SetBasicPropertiesKeywords() {
			Casket.Card[Editor.CardNumber].BasicProperties.Keywords = ReadValue("Textbox_EditorBasicPropertiesKeywords");
			RefreshEditor();
		}
		function SetBasicPropertiesDescription() {
			Casket.Card[Editor.CardNumber].BasicProperties.Description = ReadValue("Textbox_EditorBasicPropertiesDescription");
			RefreshEditor();
		}
		function SetBasicPropertiesVersion() {
			Casket.Card[Editor.CardNumber].BasicProperties.Version = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorBasicPropertiesVersion") * 100) / 100, 0, Infinity);
			RefreshEditor();
		}

		// Credits
		function SetCreditsAuthor() {
			Casket.Card[Editor.CardNumber].Credits.Author = ReadValue("Textbox_EditorCreditsAuthor");
			RefreshEditor();
		}
		function SetCreditsContact() {
			Casket.Card[Editor.CardNumber].Credits.Contact = ReadValue("Textbox_EditorCreditsContact");
			RefreshEditor();
		}
		function SetCreditsCardSource() {
			Casket.Card[Editor.CardNumber].Credits.CardSource = ReadValue("Combobox_EditorCreditsCardSource");
			RefreshEditor();
		}
		function SetCreditsImageSource() {
			Casket.Card[Editor.CardNumber].Credits.ImageSource = ReadValue("Textbox_EditorCreditsImageSource");
			RefreshEditor();
		}
		function SetCreditsVoiceoverSource() {
			Casket.Card[Editor.CardNumber].Credits.VoiceoverSource = ReadValue("Textbox_EditorCreditsVoiceoverSource");
			RefreshEditor();
		}

		// Character Card Properties
		function SetCharacterCardPropertiesMaxHP() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.MaxHP = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorCharacterCardPropertiesMaxHP")), 10, 300);
			RefreshEditor();
		}
		function SetCharacterCardPropertiesMaxEnergy() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.MaxEnergy = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorCharacterCardPropertiesMaxEnergy")), 1, 5);
			RefreshEditor();
		}
		function SetCharacterCardPropertiesElementType() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.ElementType = ReadValue("Combobox_EditorCharacterCardPropertiesElementType");
			RefreshEditor();
			RefreshCasket();
		}
		function SetCharacterCardPropertiesWeaponType() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.WeaponType = ReadValue("Combobox_EditorCharacterCardPropertiesWeaponType");
			RefreshEditor();
		}
		function SetCharacterCardPropertiesCombatOrientation() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.CombatOrientation = ReadValue("Combobox_EditorCharacterCardPropertiesCombatOrientation");
			RefreshEditor();
		}
		function SetCharacterCardPropertiesHasSecondaryElementalSkill() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.HasSecondaryElementalSkill = IsChecked("Checkbox_EditorCharacterCardPropertiesHasSecondaryElementalSkill");
			RefreshEditor();
		}
		function SetCharacterCardPropertiesHasIntroSkill() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.HasIntroSkill = IsChecked("Checkbox_EditorCharacterCardPropertiesHasIntroSkill");
			RefreshEditor();
		}
		function SetCharacterCardPropertiesHasOutroSkill() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.HasOutroSkill = IsChecked("Checkbox_EditorCharacterCardPropertiesHasOutroSkill");
			RefreshEditor();
		}
		function SetCharacterCardPropertiesHasPassiveSkill() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.HasPassiveSkill = IsChecked("Checkbox_EditorCharacterCardPropertiesHasPassiveSkill");
			RefreshEditor();
		}
		function SetCharacterCardPropertiesHasAffiliatedCard() {
			Casket.Card[Editor.CardNumber].CharacterCardProperties.HasAffiliatedCard = IsChecked("Checkbox_EditorCharacterCardPropertiesHasAffiliatedCard");
			RefreshEditor();
		}

		// Normal Attack
		function SetNormalAttackName() {
			Casket.Card[Editor.CardNumber].NormalAttack.Name = ReadValue("Textbox_EditorNormalAttackName");
			RefreshEditor();
		}
		function SetNormalAttackCostQuantity() {
			Casket.Card[Editor.CardNumber].NormalAttack.Cost[1] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorNormalAttackCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetNormalAttackCostUnaligned() {
			Casket.Card[Editor.CardNumber].NormalAttack.Cost[2] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorNormalAttackCostUnaligned")), 0, 8);
			RefreshEditor();
		}
		function SetNormalAttackDescription() {
			Casket.Card[Editor.CardNumber].NormalAttack.Description = ReadValue("Textbox_EditorNormalAttackDescription");
			RefreshEditor();
		}
		function SetNormalAttackExecution() {
			Casket.Card[Editor.CardNumber].NormalAttack.Execution = ReadValue("Textbox_EditorNormalAttackExecution");
			RefreshEditor();
		}
		function SetNormalAttackChangedAttackExecution() {
			Casket.Card[Editor.CardNumber].NormalAttack.ChangedAttackExecution = ReadValue("Textbox_EditorNormalAttackChangedAttackExecution");
			RefreshEditor();
		}
		function SetNormalAttackPlungingAttackExecution() {
			Casket.Card[Editor.CardNumber].NormalAttack.PlungingAttackExecution = ReadValue("Textbox_EditorNormalAttackPlungingAttackExecution");
			RefreshEditor();
		}

		// Elemental Skill
		function SetElementalSkillName() {
			Casket.Card[Editor.CardNumber].ElementalSkill.Name = ReadValue("Textbox_EditorElementalSkillName");
			RefreshEditor();
		}
		function SetElementalSkillImage() {
			Casket.Card[Editor.CardNumber].ElementalSkill.Image = ReadValue("Textbox_EditorElementalSkillImage");
			RefreshEditor();
		}
		function SetElementalSkillCostQuantity() {
			Casket.Card[Editor.CardNumber].ElementalSkill.Cost = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorElementalSkillCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetElementalSkillDescription() {
			Casket.Card[Editor.CardNumber].ElementalSkill.Description = ReadValue("Textbox_EditorElementalSkillDescription");
			RefreshEditor();
		}
		function SetElementalSkillExecution() {
			Casket.Card[Editor.CardNumber].ElementalSkill.Execution = ReadValue("Textbox_EditorElementalSkillExecution");
			RefreshEditor();
		}

		// Secondary Elemental Skill
		function SetSecondaryElementalSkillName() {
			Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Name = ReadValue("Textbox_EditorSecondaryElementalSkillName");
			RefreshEditor();
		}
		function SetSecondaryElementalSkillImage() {
			Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Image = ReadValue("Textbox_EditorSecondaryElementalSkillImage");
			RefreshEditor();
		}
		function SetSecondaryElementalSkillCostQuantity() {
			Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Cost = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorSecondaryElementalSkillCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetSecondaryElementalSkillDescription() {
			Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Description = ReadValue("Textbox_EditorSecondaryElementalSkillDescription");
			RefreshEditor();
		}
		function SetSecondaryElementalSkillExecution() {
			Casket.Card[Editor.CardNumber].SecondaryElementalSkill.Execution = ReadValue("Textbox_EditorSecondaryElementalSkillExecution");
			RefreshEditor();
		}

		// Elemental Burst
		function SetElementalBurstName() {
			Casket.Card[Editor.CardNumber].ElementalBurst.Name = ReadValue("Textbox_EditorElementalBurstName");
			RefreshEditor();
		}
		function SetElementalBurstImage() {
			Casket.Card[Editor.CardNumber].ElementalBurst.Image = ReadValue("Textbox_EditorElementalBurstImage");
			RefreshEditor();
		}
		function SetElementalBurstCostQuantity() {
			Casket.Card[Editor.CardNumber].ElementalBurst.Cost = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorElementalBurstCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetElementalBurstDescription() {
			Casket.Card[Editor.CardNumber].ElementalBurst.Description = ReadValue("Textbox_EditorElementalBurstDescription");
			RefreshEditor();
		}
		function SetElementalBurstExecution() {
			Casket.Card[Editor.CardNumber].ElementalBurst.Execution = ReadValue("Textbox_EditorElementalBurstExecution");
			RefreshEditor();
		}

		// Intro Skill
		function SetIntroSkillName() {
			Casket.Card[Editor.CardNumber].IntroSkill.Name = ReadValue("Textbox_EditorIntroSkillName");
			RefreshEditor();
		}
		function SetIntroSkillImage() {
			Casket.Card[Editor.CardNumber].IntroSkill.Image = ReadValue("Textbox_EditorIntroSkillImage");
			RefreshEditor();
		}
		function SetIntroSkillDescription() {
			Casket.Card[Editor.CardNumber].IntroSkill.Description = ReadValue("Textbox_EditorIntroSkillDescription");
			RefreshEditor();
		}
		function SetIntroSkillExecution() {
			Casket.Card[Editor.CardNumber].IntroSkill.Execution = ReadValue("Textbox_EditorIntroSkillExecution");
			RefreshEditor();
		}

		// Outro Skill
		function SetOutroSkillName() {
			Casket.Card[Editor.CardNumber].OutroSkill.Name = ReadValue("Textbox_EditorOutroSkillName");
			RefreshEditor();
		}
		function SetOutroSkillImage() {
			Casket.Card[Editor.CardNumber].OutroSkill.Image = ReadValue("Textbox_EditorOutroSkillImage");
			RefreshEditor();
		}
		function SetOutroSkillDescription() {
			Casket.Card[Editor.CardNumber].OutroSkill.Description = ReadValue("Textbox_EditorOutroSkillDescription");
			RefreshEditor();
		}
		function SetOutroSkillExecution() {
			Casket.Card[Editor.CardNumber].OutroSkill.Execution = ReadValue("Textbox_EditorOutroSkillExecution");
			RefreshEditor();
		}

		// Passive Skill
		function SetPassiveSkillName() {
			Casket.Card[Editor.CardNumber].PassiveSkill.Name = ReadValue("Textbox_EditorPassiveSkillName");
			RefreshEditor();
		}
		function SetPassiveSkillImage() {
			Casket.Card[Editor.CardNumber].PassiveSkill.Image = ReadValue("Textbox_EditorPassiveSkillImage");
			RefreshEditor();
		}
		function SetPassiveSkillDescription() {
			Casket.Card[Editor.CardNumber].PassiveSkill.Description = ReadValue("Textbox_EditorPassiveSkillDescription");
			RefreshEditor();
		}
		function SetPassiveSkillTrigger() {
			Casket.Card[Editor.CardNumber].PassiveSkill.Trigger = ReadValue("Textbox_EditorPassiveSkillTrigger");
			RefreshEditor();
		}
		function SetPassiveSkillExecution() {
			Casket.Card[Editor.CardNumber].PassiveSkill.Execution = ReadValue("Textbox_EditorPassiveSkillExecution");
			RefreshEditor();
		}

		// Affiliated Card
		function SetAffiliatedCardName() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Name = ReadValue("Textbox_EditorAffiliatedCardName");
			RefreshEditor();
		}
		function SetAffiliatedCardImage() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Image = ReadValue("Textbox_EditorAffiliatedCardImage");
			RefreshEditor();
		}
		function SetAffiliatedCardType() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Type = ReadValue("Combobox_EditorAffiliatedCardType");
			RefreshEditor();
		}
		function SetAffiliatedCardCostQuantity() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Cost[1] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorAffiliatedCardCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetAffiliatedCardCostType() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Cost[2] = ReadValue("Combobox_EditorAffiliatedCardCostType");
			RefreshEditor();
		}
		function SetAffiliatedCardAffectedObject() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.AffectedObject = ReadValue("Combobox_EditorAffiliatedCardAffectedObject");
			RefreshEditor();
		}
		function SetAffiliatedCardDurationQuantity() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Duration.Quantity = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorAffiliatedCardDurationQuantity")), 1, 9);
			RefreshEditor();
		}
		function SetAffiliatedCardDurationType() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Duration.Type = ReadValue("Combobox_EditorAffiliatedCardDurationType");
			RefreshEditor();
		}
		function SetAffiliatedCardHasCounter() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.HasCounter = IsChecked("Checkbox_EditorAffiliatedCardHasCounter");
			RefreshEditor();
		}
		function SetAffiliatedCardDescription() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Description = ReadValue("Textbox_EditorAffiliatedCardDescription");
			RefreshEditor();
		}
		function SetAffiliatedCardRequirement() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Requirement = ReadValue("Textbox_EditorAffiliatedCardRequirement");
			RefreshEditor();
		}
		function SetAffiliatedCardExecution() {
			Casket.Card[Editor.CardNumber].AffiliatedCard.Execution = ReadValue("Textbox_EditorAffiliatedCardExecution");
			RefreshEditor();
		}

		// Talent Card Properties
		function SetTalentCardPropertiesCostQuantity() {
			Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[1] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorTalentCardPropertiesCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetTalentCardPropertiesCostType() {
			Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[2] = ReadValue("Combobox_EditorTalentCardPropertiesCostType");
			if(Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[2] == "Unaligned") {
				Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[3] = 0;
			}
			RefreshEditor();
		}
		function SetTalentCardPropertiesCostUnaligned() {
			Casket.Card[Editor.CardNumber].TalentCardProperties.Cost[3] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorTalentCardPropertiesCostUnaligned")), 0, 8);
			RefreshEditor();
		}
		function SetTalentCardPropertiesOrientedCharacterCardID() {
			Casket.Card[Editor.CardNumber].TalentCardProperties.OrientedCharacterCardID = ReadValue("Textbox_EditorTalentCardPropertiesOrientedCharacterCardID");
			RefreshEditor();
		}
		function SetTalentCardPropertiesSkillType() {
			Casket.Card[Editor.CardNumber].TalentCardProperties.SkillType = ReadValue("Combobox_EditorTalentCardPropertiesSkillType");
			RefreshEditor();
		}

		// Weapon Card Properties
		function SetWeaponCardPropertiesCostQuantity() {
			Casket.Card[Editor.CardNumber].WeaponCardProperties.Cost[1] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorWeaponCardPropertiesCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetWeaponCardPropertiesCostType() {
			Casket.Card[Editor.CardNumber].WeaponCardProperties.Cost[2] = ReadValue("Combobox_EditorWeaponCardPropertiesCostType");
			RefreshEditor();
		}
		function SetWeaponCardPropertiesWeaponType() {
			Casket.Card[Editor.CardNumber].WeaponCardProperties.WeaponType = ReadValue("Combobox_EditorWeaponCardPropertiesWeaponType");
			RefreshEditor();
		}
		function SetWeaponCardPropertiesExecution() {
			Casket.Card[Editor.CardNumber].WeaponCardProperties.Execution = ReadValue("Textbox_EditorWeaponCardPropertiesExecution");
			RefreshEditor();
		}

		// Artifact Card Properties
		function SetArtifactCardPropertiesCostQuantity() {
			Casket.Card[Editor.CardNumber].ArtifactCardProperties.Cost[1] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorArtifactCardPropertiesCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetArtifactCardPropertiesCostType() {
			Casket.Card[Editor.CardNumber].ArtifactCardProperties.Cost[2] = ReadValue("Combobox_EditorArtifactCardPropertiesCostType");
			RefreshEditor();
		}
		function SetArtifactCardPropertiesExecution() {
			Casket.Card[Editor.CardNumber].ArtifactCardProperties.Execution = ReadValue("Textbox_EditorArtifactCardPropertiesExecution");
			RefreshEditor();
		}

		// Support Card Properties
		function SetSupportCardPropertiesCostQuantity() {
			Casket.Card[Editor.CardNumber].SupportCardProperties.Cost[1] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorSupportCardPropertiesCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetSupportCardPropertiesCostType() {
			Casket.Card[Editor.CardNumber].SupportCardProperties.Cost[2] = ReadValue("Combobox_EditorSupportCardPropertiesCostType");
			RefreshEditor();
		}
		function SetSupportCardPropertiesDurationQuantity() {
			Casket.Card[Editor.CardNumber].SupportCardProperties.Duration.Quantity = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorSupportCardPropertiesDurationQuantity")), 1, 9);
			RefreshEditor();
		}
		function SetSupportCardPropertiesDurationType() {
			Casket.Card[Editor.CardNumber].SupportCardProperties.Duration.Type = ReadValue("Combobox_EditorSupportCardPropertiesDurationType");
			RefreshEditor();
		}
		function SetSupportCardPropertiesHasCounter() {
			Casket.Card[Editor.CardNumber].SupportCardProperties.HasCounter = IsChecked("Checkbox_EditorSupportCardPropertiesHasCounter");
			RefreshEditor();
		}
		function SetSupportCardPropertiesRequirement() {
			Casket.Card[Editor.CardNumber].SupportCardProperties.Requirement = ReadValue("Textbox_EditorSupportCardPropertiesRequirement");
			RefreshEditor();
		}
		function SetSupportCardPropertiesExecution() {
			Casket.Card[Editor.CardNumber].SupportCardProperties.Execution = ReadValue("Textbox_EditorSupportCardPropertiesExecution");
			RefreshEditor();
		}

		// Event Card Properties
		function SetEventCardPropertiesCostQuantity() {
			Casket.Card[Editor.CardNumber].EventCardProperties.Cost[1] = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorEventCardPropertiesCostQuantity")), 0, 8);
			RefreshEditor();
		}
		function SetEventCardPropertiesCostType() {
			Casket.Card[Editor.CardNumber].EventCardProperties.Cost[2] = ReadValue("Combobox_EditorEventCardPropertiesCostType");
			RefreshEditor();
		}
		function SetEventCardPropertiesAffectedObject() {
			Casket.Card[Editor.CardNumber].EventCardProperties.AffectedObject = ReadValue("Combobox_EditorEventCardPropertiesAffectedObject");
			RefreshEditor();
		}
		function SetEventCardPropertiesRequirement() {
			Casket.Card[Editor.CardNumber].EventCardProperties.Requirement = ReadValue("Textbox_EditorEventCardPropertiesRequirement");
			RefreshEditor();
		}
		function SetEventCardPropertiesExecution() {
			Casket.Card[Editor.CardNumber].EventCardProperties.Execution = ReadValue("Textbox_EditorEventCardPropertiesExecution");
			RefreshEditor();
		}

		// Status
		function SetStatusName(StatusNumber) {
			Casket.Card[Editor.CardNumber].Status[StatusNumber].Name = ReadValue("Textbox_EditorStatus" + StatusNumber + "Name");
			RefreshEditor();
		}
		function SetStatusImage(StatusNumber) {
			Casket.Card[Editor.CardNumber].Status[StatusNumber].Image = ReadValue("Textbox_EditorStatus" + StatusNumber + "Image");
			RefreshEditor();
		}
		function SetStatusType(StatusNumber) {
			Casket.Card[Editor.CardNumber].Status[StatusNumber].Type = ReadValue("Combobox_EditorStatus" + StatusNumber + "Type");
			RefreshEditor();
		}
		function SetStatusDurationQuantity(StatusNumber) {
			Casket.Card[Editor.CardNumber].Status[StatusNumber].Duration.Quantity = CheckRangeAndCorrect(Math.trunc(ReadValue("Textbox_EditorStatus" + StatusNumber + "DurationQuantity")), 1, 9);
			RefreshEditor();
		}
		function SetStatusDurationType(StatusNumber) {
			Casket.Card[Editor.CardNumber].Status[StatusNumber].Duration.Type = ReadValue("Combobox_EditorStatus" + StatusNumber + "DurationType");
			RefreshEditor();
		}
		function SetStatusDescription(StatusNumber) {
			Casket.Card[Editor.CardNumber].Status[StatusNumber].Description = ReadValue("Textbox_EditorStatus" + StatusNumber + "Description");
			RefreshEditor();
		}
		function SetStatusExecution(StatusNumber) {
			Casket.Card[Editor.CardNumber].Status[StatusNumber].Execution = ReadValue("Textbox_EditorStatus" + StatusNumber + "Execution");
			RefreshEditor();
		}

		// Character Profile
		function SetCharacterProfileFrom() {
			Casket.Card[Editor.CardNumber].CharacterProfile.From = ReadValue("Textbox_EditorCharacterProfileFrom");
			RefreshEditor();
		}
		function SetCharacterProfileVA() {
			Casket.Card[Editor.CardNumber].CharacterProfile.VA = ReadValue("Textbox_EditorCharacterProfileVA");
			RefreshEditor();
		}
		function SetCharacterProfileLanguage() {
			Casket.Card[Editor.CardNumber].CharacterProfile.Language = ReadValue("Textbox_EditorCharacterProfileLanguage");
			RefreshEditor();
		}
		function SetCharacterProfileGender() {
			Casket.Card[Editor.CardNumber].CharacterProfile.Gender = ReadValue("Combobox_EditorCharacterProfileGender");
			RefreshEditor();
		}
		function SetCharacterProfileBirthday() {
			Casket.Card[Editor.CardNumber].CharacterProfile.Birthday = ReadValue("Textbox_EditorCharacterProfileBirthday");
			RefreshEditor();
		}

		// Spoken Lines
		function SetSpokenLineBecomingActive(Number) {
			Casket.Card[Editor.CardNumber].SpokenLine.BecomingActive[Number] = ReadValue("Textbox_EditorSpokenLineBecomingActive" + Number);
			RefreshEditor();
		}
		function SetSpokenLineElementalSkill(Number) {
			Casket.Card[Editor.CardNumber].SpokenLine.ElementalSkill[Number] = ReadValue("Textbox_EditorSpokenLineElementalSkill" + Number);
			RefreshEditor();
		}
		function SetSpokenLineElementalBurst(Number) {
			Casket.Card[Editor.CardNumber].SpokenLine.ElementalBurst[Number] = ReadValue("Textbox_EditorSpokenLineElementalBurst" + Number);
			RefreshEditor();
		}
		function SetSpokenLineHeavyHitTaken(Number) {
			Casket.Card[Editor.CardNumber].SpokenLine.HeavyHitTaken[Number] = ReadValue("Textbox_EditorSpokenLineHeavyHitTaken" + Number);
			RefreshEditor();
		}
		function SetSpokenLineFallen(Number) {
			Casket.Card[Editor.CardNumber].SpokenLine.Fallen[Number] = ReadValue("Textbox_EditorSpokenLineFallen" + Number);
			RefreshEditor();
		}

		// Voiceovers
		function SetVoiceoverBecomingActive(Number) {
			Casket.Card[Editor.CardNumber].Voiceover.BecomingActive[Number] = ReadValue("Textbox_EditorVoiceoverBecomingActive" + Number);
			RefreshEditor();
		}
		function SetVoiceoverElementalSkill(Number) {
			Casket.Card[Editor.CardNumber].Voiceover.ElementalSkill[Number] = ReadValue("Textbox_EditorVoiceoverElementalSkill" + Number);
			RefreshEditor();
		}
		function SetVoiceoverElementalBurst(Number) {
			Casket.Card[Editor.CardNumber].Voiceover.ElementalBurst[Number] = ReadValue("Textbox_EditorVoiceoverElementalBurst" + Number);
			RefreshEditor();
		}
		function SetVoiceoverHeavyHitTaken(Number) {
			Casket.Card[Editor.CardNumber].Voiceover.HeavyHitTaken[Number] = ReadValue("Textbox_EditorVoiceoverHeavyHitTaken" + Number);
			RefreshEditor();
		}
		function SetVoiceoverFallen(Number) {
			Casket.Card[Editor.CardNumber].Voiceover.Fallen[Number] = ReadValue("Textbox_EditorVoiceoverFallen" + Number);
			RefreshEditor();
		}
