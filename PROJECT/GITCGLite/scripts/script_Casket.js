// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// © 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

// Refresh
	// Casket
	function RefreshCasket() {
		// Lists
		let CharacterImage = [0, "", "", ""];
			// Decks
				// First options
				ChangeText("CtrlGroup_CasketDecksList",
					"<li class=\"Ctrl\">" +
					"	<label id=\"Label_CasketGenerateTemporaryDeck\" for=\"Radiobtn_CasketGenerateTemporaryDeckPlayer\">" +
					"		<input class=\"Radiobtn\" id=\"Radiobtn_CasketGenerateTemporaryDeckPlayer\" type=\"radio\" checked=\"false\" onchange=\"SetPlayerDeckGenerateTemporaryDeck()\" />" +
					"		<input class=\"Radiobtn\" id=\"Radiobtn_CasketGenerateTemporaryDeckOpponent\" type=\"radio\" checked=\"false\" onchange=\"SetOpponentDeckGenerateTemporaryDeck()\" />" +
					"		<span>(生成临时牌组)</span>" +
					"	</label>" +
					"</li>" +
					"<li class=\"Ctrl\">" +
					"	<label id=\"Label_CasketRandomlySelectDeck\" for=\"Radiobtn_CasketRandomlySelectDeckPlayer\">" +
					"		<input class=\"Radiobtn\" id=\"Radiobtn_CasketRandomlySelectDeckPlayer\" type=\"radio\" checked=\"true\" onchange=\"SetPlayerDeckRandomlySelectDeck()\" />" +
					"		<input class=\"Radiobtn\" id=\"Radiobtn_CasketRandomlySelectDeckOpponent\" type=\"radio\" checked=\"true\" onchange=\"SetOpponentDeckRandomlySelectDeck()\" />" +
					"		<span>(随机选择牌组)</span>" +
					"	</label>" +
					"</li>");

				// Check empty deck library
				if(Casket.Deck.length > 1) {
					ChangeDisabled("Radiobtn_CasketRandomlySelectDeckPlayer", false);
					ChangeDisabled("Radiobtn_CasketRandomlySelectDeckOpponent", false);
				} else { // It is impossible to randomly select deck when there are no decks.
					ChangeDisabled("Radiobtn_CasketRandomlySelectDeckPlayer", true);
					ChangeDisabled("Radiobtn_CasketRandomlySelectDeckOpponent", true);
					Casket.DeckSelection = [0, -2, -2];
				}

				// Check and fix current decks if corrupted
				if(Casket.DeckSelection[2] > 0) {
					let IsUnrecognizableCardDetected = false;
					for(let Looper = Casket.Deck[Casket.DeckSelection[2]].CharacterCardSelection.length - 1; Looper >= 1; Looper--) { // Using reverse order when deleting multiple items in array.
						if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection[2]].CharacterCardSelection[Looper]) == 0) {
							IsUnrecognizableCardDetected = true;
							Casket.Deck[Casket.DeckSelection[2]].CharacterCardSelection.splice(Looper, 1);
						}
					}
					for(let Looper = Casket.Deck[Casket.DeckSelection[2]].ActionCardSelection.length - 1; Looper >= 1; Looper--) {
						if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection[2]].ActionCardSelection[Looper]) == 0) {
							IsUnrecognizableCardDetected = true;
							Casket.Deck[Casket.DeckSelection[2]].ActionCardSelection.splice(Looper, 1);
						}
					}
					if(IsUnrecognizableCardDetected == true) {
						ShowDialog("Casket_UnrecognizableCardDetected",
							"Caution",
							"对手牌组含有无法识别的卡牌。导入牌组前，请确保其包含的卡牌均已在您的牌盒里。",
							"", "", "", "确定");
					}
				}
				if(Casket.DeckSelection[1] > 0) {
					let IsUnrecognizableCardDetected = false;
					for(let Looper = Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length - 1; Looper >= 1; Looper--) {
						if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Looper]) == 0) {
							IsUnrecognizableCardDetected = true;
							Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.splice(Looper, 1);
						}
					}
					for(let Looper = Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length - 1; Looper >= 1; Looper--) {
						if(ReadCardNumberByID(Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Looper]) == 0) {
							IsUnrecognizableCardDetected = true;
							Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.splice(Looper, 1);
						}
					}
					if(IsUnrecognizableCardDetected == true) {
						ShowDialog("Casket_UnrecognizableCardDetected",
							"Caution",
							"您的牌组含有无法识别的卡牌。导入牌组前，请确保其包含的卡牌均已在您的牌盒里。",
							"", "", "", "确定");
					}
				}

				// Generate deck list
				for(let Looper = 1; Looper < Casket.Deck.length; Looper++) {
					for(let Looper2 = 1; Looper2 <= 3; Looper2++) {
						if(Casket.Deck[Looper].CharacterCardSelection[Looper2] != undefined && ReadCardNumberByID(Casket.Deck[Looper].CharacterCardSelection[Looper2]) > 0) {
							CharacterImage[Looper2] = Casket.Card[ReadCardNumberByID(Casket.Deck[Looper].CharacterCardSelection[Looper2])].BasicProperties.Image;
						} else {
							CharacterImage[Looper2] = Casket0.BuiltinCard.UnknownCard.BasicProperties.Image;
						}
					}
					AddText("CtrlGroup_CasketDecksList",
						"<li class=\"Ctrl\" id=\"Ctrl_CasketDeck" + Looper + "\">" +
						"	<label class=\"CasketDeckLabel\" id=\"Label_CasketDeck" + Looper + "\" for=\"Radiobtn_CasketDeck" + Looper + "Player\">" +
						"		<input class=\"Radiobtn\" id=\"Radiobtn_CasketDeck" + Looper + "Player\" type=\"radio\" checked=\"false\" onchange=\"SetPlayerDeck(" + Looper + ")\" />" +
						"		<input class=\"Radiobtn\" id=\"Radiobtn_CasketDeck" + Looper + "Opponent\" type=\"radio\" checked=\"false\" onchange=\"SetOpponentDeck(" + Looper + ")\" />" +
						"		<img class=\"CardImage\" id=\"Image_CasketDeck" + Looper + "Character1\" src=\"" + CharacterImage[1] + "\" onerror=\"this.src='images/UnknownCard.jpg'\" alt=\"角色牌图像\" />" +
						"		<img class=\"CardImage\" id=\"Image_CasketDeck" + Looper + "Character2\" src=\"" + CharacterImage[2] + "\" onerror=\"this.src='images/UnknownCard.jpg'\" alt=\"角色牌图像\" />" +
						"		<img class=\"CardImage\" id=\"Image_CasketDeck" + Looper + "Character3\" src=\"" + CharacterImage[3] + "\" onerror=\"this.src='images/UnknownCard.jpg'\" alt=\"角色牌图像\" />" +
						"		<span class=\"ListItemName\">" + ConvertEmptyName(Casket.Deck[Looper].Properties.Name) + "</span>" +
						"	</label>" +
						"	<button class=\"Button ShownAsLabel ListItemDuplicate\" onclick=\"DuplicateDeck(" + Looper + ")\" title=\"生成副本\" aria-label=\"生成副本\">" +
						"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
						"			<path d=\"M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z\"/>" +
						"		</svg>" +
						"	</button>" +
						"	<button class=\"Button ShownAsLabel ListItemExport\" onclick=\"ExportDeck(" + Looper + ")\" title=\"导出\" aria-label=\"导出\">" +
						"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
						"			<path d=\"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5\"/>" +
						"			<path d=\"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z\"/>" +
						"		</svg>" +
						"	</button>" +
						"	<button class=\"Button ShownAsLabel ListItemDelete\" onclick=\"ConfirmDeleteDeck(" + Looper + ")\" title=\"删除...\" aria-label=\"删除...\">" +
						"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
						"			<path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5\"/>" +
						"		</svg>" +
						"	</button>" +
						"</li>");
				}
			
			// Cards
			ChangeText("CtrlGroup_CasketCharacterCardsList", "");
			ChangeText("CtrlGroup_CasketActionCardsList", "");
			for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
				if(Casket.Card[Looper].BasicProperties.Type == "CharacterCard") {
					AddText("CtrlGroup_CasketCharacterCardsList",
					"<li class=\"Ctrl\" id=\"Ctrl_CasketCard" + Looper + "\">" +
					"	<label class=\"CasketCardLabel\" for=\"Checkbox_CasketCard" + Looper + "\" onpointerenter=\"HoverCardInCasket(" + Looper + ")\" onclick=\"ClickCardInCasket(" + Looper + ")\">" +
					"		<input class=\"Checkbox\" id=\"Checkbox_CasketCard" + Looper + "\" type=\"checkbox\" checked=\"false\" onfocus=\"HoverCardInCasket(" + Looper + ")\" onchange=\"SetCard(" + Looper + ")\" />" +
					"		<img class=\"CardImage\" id=\"Image_CasketCard" + Looper + "\" src=\"" + Casket.Card[Looper].BasicProperties.Image + "\" onerror=\"this.src='images/UnknownCard.jpg'\" alt=\"角色牌图像\" />" +
							ConvertElementTypeToIcon(Casket.Card[Looper].CharacterCardProperties.ElementType) +
					"		<span class=\"ListItemName\">" + ConvertEmptyName(Casket.Card[Looper].BasicProperties.Name) + "</span>" +
					"	</label>" +
					"	<button class=\"Button ShownAsLabel ListItemEdit\" onclick=\"EditCard(" + Looper + ")\" title=\"编辑\" aria-label=\"编辑\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325\"/>" +
					"		</svg>" +
					"	</button>" +
					"	<button class=\"Button ShownAsLabel ListItemDuplicate\" onclick=\"DuplicateCard(" + Looper + ")\" title=\"生成副本\" aria-label=\"生成副本\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z\"/>" +
					"		</svg>" +
					"	</button>" +
					"	<button class=\"Button ShownAsLabel ListItemExport\" onclick=\"ExportCard(" + Looper + ")\" title=\"导出\" aria-label=\"导出\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5\"/>" +
					"			<path d=\"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z\"/>" +
					"		</svg>" +
					"	</button>" +
					"	<button class=\"Button ShownAsLabel ListItemDelete\" onclick=\"ConfirmDeleteCard(" + Looper + ")\" title=\"删除...\" aria-label=\"删除...\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5\"/>" +
					"		</svg>" +
					"	</button>" +
					"</li>");
				} else {
					AddText("CtrlGroup_CasketActionCardsList",
					"<li class=\"Ctrl\" id=\"Ctrl_CasketCard" + Looper + "\">" +
					"	<label class=\"CasketCardLabel\" for=\"Checkbox_CasketCard" + Looper + "\" onpointerenter=\"HoverCardInCasket(" + Looper + ")\" onclick=\"ClickCardInCasket(" + Looper + ")\">" +
					"		<input class=\"Checkbox\" id=\"Checkbox_CasketCard" + Looper + "\" type=\"checkbox\" checked=\"false\" onfocus=\"HoverCardInCasket(" + Looper + ")\" onchange=\"SetCard(" + Looper + ")\" />" +
					"		<img class=\"CardImage\" id=\"Image_CasketCard" + Looper + "\" src=\"" + Casket.Card[Looper].BasicProperties.Image + "\" onerror=\"this.src='images/UnknownCard.jpg'\" alt=\"行动牌图像\" />" +
					"		<span class=\"ListItemName\">" + ConvertEmptyName(Casket.Card[Looper].BasicProperties.Name) + "</span>" +
					"	</label>" +
					"	<button class=\"Button ShownAsLabel ListItemEdit\" onclick=\"EditCard(" + Looper + ")\" title=\"编辑\" aria-label=\"编辑\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325\"/>" +
					"		</svg>" +
					"	</button>" +
					"	<button class=\"Button ShownAsLabel ListItemDuplicate\" onclick=\"DuplicateCard(" + Looper + ")\" title=\"生成副本\" aria-label=\"生成副本\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z\"/>" +
					"		</svg>" +
					"	</button>" +
					"	<button class=\"Button ShownAsLabel ListItemExport\" onclick=\"ExportCard(" + Looper + ")\" title=\"导出\" aria-label=\"导出\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5\"/>" +
					"			<path d=\"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z\"/>" +
					"		</svg>" +
					"	</button>" +
					"	<button class=\"Button ShownAsLabel ListItemDelete\" onclick=\"ConfirmDeleteCard(" + Looper + ")\" title=\"删除...\" aria-label=\"删除...\">" +
					"		<svg class=\"Icon Smaller\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">" +
					"			<path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5\"/>" +
					"		</svg>" +
					"	</button>" +
					"</li>");
				}
			}

		// Selection
			// Decks
			if(Casket.DeckSelection[1] == -2) {
				ChangeChecked("Radiobtn_CasketGenerateTemporaryDeckPlayer", true);
			} else {
				ChangeChecked("Radiobtn_CasketGenerateTemporaryDeckPlayer", false);
			}
			if(Casket.DeckSelection[2] == -2) {
				ChangeChecked("Radiobtn_CasketGenerateTemporaryDeckOpponent", true);
			} else {
				ChangeChecked("Radiobtn_CasketGenerateTemporaryDeckOpponent", false);
			}
			if(Casket.DeckSelection[1] == -1) {
				ChangeChecked("Radiobtn_CasketRandomlySelectDeckPlayer", true);
			} else {
				ChangeChecked("Radiobtn_CasketRandomlySelectDeckPlayer", false);
			}
			if(Casket.DeckSelection[2] == -1) {
				ChangeChecked("Radiobtn_CasketRandomlySelectDeckOpponent", true);
			} else {
				ChangeChecked("Radiobtn_CasketRandomlySelectDeckOpponent", false);
			}
			for(let Looper = 1; Looper < Casket.Deck.length; Looper++) {
				if(Casket.DeckSelection[1] == Looper) {
					ChangeChecked("Radiobtn_CasketDeck" + Looper + "Player", true);
					AddClass("Label_CasketDeck" + Looper, "Active");
				} else {
					ChangeChecked("Radiobtn_CasketDeck" + Looper + "Player", false);
					RemoveClass("Label_CasketDeck" + Looper, "Active");
				}
				if(Casket.DeckSelection[2] == Looper) {
					ChangeChecked("Radiobtn_CasketDeck" + Looper + "Opponent", true);
				} else {
					ChangeChecked("Radiobtn_CasketDeck" + Looper + "Opponent", false);
				}
			}

			// Cards
			for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
				ChangeChecked("Checkbox_CasketCard" + Looper, false);
				if(Casket.DeckSelection[1] > 0) {
					ChangeDisabled("Checkbox_CasketCard" + Looper, false);
					if(Casket.Card[Looper].BasicProperties.Type == "CharacterCard") {
						for(let Looper2 = 1; Looper2 < Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length; Looper2++) {
							if(Casket.Card[Looper].BasicProperties.ID == Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Looper2]) {
								ChangeChecked("Checkbox_CasketCard" + Looper, true);
							}
						}
					} else {
						for(let Looper2 = 1; Looper2 < Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length; Looper2++) {
							if(Casket.Card[Looper].BasicProperties.ID == Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Looper2]) {
								ChangeChecked("Checkbox_CasketCard" + Looper, true);
							}
						}
					}
				} else {
					ChangeDisabled("Checkbox_CasketCard" + Looper, true);
				}
			}
			if(Casket.DeckSelection[1] > 0) {
				ChangeText("Label_CasketSelectAllCharacterCards", "已选 " + (Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length - 1));
				ChangeText("Label_CasketSelectAllActionCards", "已选 " + (Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length - 1));
			} else {
				ChangeText("Label_CasketSelectAllCharacterCards", "不可选择");
				ChangeText("Label_CasketSelectAllActionCards", "不可选择");
			}
			if(Casket.DeckSelection[1] > 0 && Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length != 4) {
				AddClass("Label_CasketSelectAllCharacterCards", "RedText");
			} else {
				RemoveClass("Label_CasketSelectAllCharacterCards", "RedText");
			}
			if(Casket.DeckSelection[1] > 0 && Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length != 31) {
				AddClass("Label_CasketSelectAllActionCards", "RedText");
			} else {
				RemoveClass("Label_CasketSelectAllActionCards", "RedText");
			}
			if(Casket.DeckSelection[1] > 0 && Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length > 1) {
				ChangeDisabled("Button_CasketCharacterCardsDelete", false);
			} else {
				ChangeDisabled("Button_CasketCharacterCardsDelete", true);
			}
			if(Casket.DeckSelection[1] > 0 && Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length > 1) {
				ChangeDisabled("Button_CasketActionCardsDelete", false);
			} else {
				ChangeDisabled("Button_CasketActionCardsDelete", true);
			}

		// Filter
		FilterCasket();

		// Deck properties
		if(Casket.DeckSelection[1] > 0) {
			Show("Item_CasketDeckProperties");
			ChangeValue("Textbox_CasketDeckPropertiesName", Casket.Deck[Casket.DeckSelection[1]].Properties.Name);
			ChangeValue("Textbox_CasketDeckPropertiesDescription", Casket.Deck[Casket.DeckSelection[1]].Properties.Description);
			ChangeValue("Textbox_CasketDeckPropertiesBgImage", Casket.Deck[Casket.DeckSelection[1]].Properties.BgImage);
			ChangeValue("Textbox_CasketDeckPropertiesCardBackImage", Casket.Deck[Casket.DeckSelection[1]].Properties.CardBackImage);
			ChangeValue("Textbox_CasketDeckPropertiesImageSource", Casket.Deck[Casket.DeckSelection[1]].Properties.ImageSource);
			if(Game.Status.Operation == "Title") {
				Game.Status.Player.DeckProperties = structuredClone(Casket.Deck[Casket.DeckSelection[1]].Properties);
			}
		} else {
			HideToCorner("Item_CasketDeckProperties");
			if(Game.Status.Operation == "Title") {
				Game.Status.Player.DeckProperties = structuredClone(Casket0.BuiltinDeck.EmptyDeck.Properties);
			}
		}
		if(Casket.DeckSelection[2] > 0) {
			if(Game.Status.Operation == "Title") {
				Game.Status.Opponent.DeckProperties = structuredClone(Casket.Deck[Casket.DeckSelection[2]].Properties);
			}
		} else {
			if(Game.Status.Operation == "Title") {
				Game.Status.Opponent.DeckProperties = structuredClone(Casket0.BuiltinDeck.EmptyDeck.Properties);
			}
		}

		// Save user data
		localStorage.setItem("GITCGLite_Casket", JSON.stringify(Casket));
	}

// Cmds
	// Casket
		// Filter
		function FilterCasket() {
			// Decks
			let Counter = 0, Counter2 = 0;
			for(let Looper = 1; Looper < Casket.Deck.length; Looper++) {
				let CharacterIDsAndNames = "";
				for(let Looper2 = 1; Looper2 <= 3; Looper2++) {
					if(Casket.Deck[Looper].CharacterCardSelection[Looper2] != undefined) {
						CharacterIDsAndNames += Casket.Deck[Looper].CharacterCardSelection[Looper2] + ", " + ReadCardNameByID(Casket.Deck[Looper].CharacterCardSelection[Looper2]) + ", ";
					}
				}
				if(Casket.Deck[Looper].Properties.Name.toLowerCase().includes(ReadValue("Textbox_CasketDecksFilter").toLowerCase()) == true ||
				Casket.Deck[Looper].Properties.Description.toLowerCase().includes(ReadValue("Textbox_CasketDecksFilter").toLowerCase()) == true ||
				CharacterIDsAndNames.toLowerCase().includes(ReadValue("Textbox_CasketDecksFilter").toLowerCase()) == true) {
					Show("Ctrl_CasketDeck" + Looper);
					Counter++;
				} else {
					Hide("Ctrl_CasketDeck" + Looper);
				}
				Counter2++;
			}
			ChangeText("Label_CasketDecksItemCount", "显示 " + Counter + "/" + Counter2);
			if(Counter > 0) {
				ChangeDisabled("Button_CasketDecksSortByName", false);
			} else {
				ChangeDisabled("Button_CasketDecksSortByName", true);
			}

			// Character cards
			Counter = 0;
			Counter2 = 0;
			let Counter3 = 0, IsAnyHiddenCardSelected = false;
			for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
				if(Casket.Card[Looper].BasicProperties.Type == "CharacterCard") {
					if(Casket.Card[Looper].BasicProperties.ID.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].BasicProperties.Name.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].BasicProperties.Keywords.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].BasicProperties.Description.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].Credits.Author.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].CharacterCardProperties.ElementType.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Translate(Casket.Card[Looper].CharacterCardProperties.ElementType).toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].CharacterCardProperties.WeaponType.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Translate(Casket.Card[Looper].CharacterCardProperties.WeaponType).toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].CharacterCardProperties.CombatOrientation.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Translate(Casket.Card[Looper].CharacterCardProperties.CombatOrientation).toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].CharacterProfile.From.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].CharacterProfile.VA.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].CharacterProfile.Gender.toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Translate(Casket.Card[Looper].CharacterProfile.Gender).toLowerCase().includes(ReadValue("Textbox_CasketCharacterCardsFilter").toLowerCase()) == true ||
					Casket.Card[Looper].CharacterProfile.Birthday.includes(ReadValue("Textbox_CasketCharacterCardsFilter")) == true) {
						Show("Ctrl_CasketCard" + Looper);
						Counter++;
						if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
							Counter3++;
						}
					} else {
						Hide("Ctrl_CasketCard" + Looper);
						if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
							IsAnyHiddenCardSelected = true;
						}
					}
					Counter2++;
				}
			}
			ChangeText("Label_CasketCharacterCardsItemCount", "显示 " + Counter + "/" + Counter2);
			if(Casket.DeckSelection[1] > 0 && Counter > 0) {
				ChangeDisabled("Checkbox_CasketSelectAllCharacterCards", false);
			} else {
				ChangeDisabled("Checkbox_CasketSelectAllCharacterCards", true);
			}
			if(Counter == Counter3 && IsAnyHiddenCardSelected == false) {
				ChangeChecked("Checkbox_CasketSelectAllCharacterCards", true);
			} else {
				ChangeChecked("Checkbox_CasketSelectAllCharacterCards", false);
			}
			if(Counter > 0) {
				ChangeDisabled("Button_CasketCharacterCardsSortByName", false);
				ChangeDisabled("Button_CasketCharacterCardsSortByElementType", false);
			} else {
				ChangeDisabled("Button_CasketCharacterCardsSortByName", true);
				ChangeDisabled("Button_CasketCharacterCardsSortByElementType", true);
			}

			// Action cards
			Counter = 0;
			Counter2 = 0;
			Counter3 = 0;
			IsAnyHiddenCardSelected = false;
			for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
				switch(Casket.Card[Looper].BasicProperties.Type) {
					case "CharacterCard":
						break;
					case "TalentCard":
						if(Casket.Card[Looper].BasicProperties.ID.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Name.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Type.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Translate(Casket.Card[Looper].BasicProperties.Type).toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Keywords.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Description.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].Credits.Author.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].TalentCardProperties.OrientedCharacterCardID.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						ReadCardNameByID(Casket.Card[Looper].TalentCardProperties.OrientedCharacterCardID).toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].TalentCardProperties.SkillType.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Translate(Casket.Card[Looper].TalentCardProperties.SkillType).toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true) {
							Show("Ctrl_CasketCard" + Looper);
							Counter++;
							if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
								Counter3++;
							}
						} else {
							Hide("Ctrl_CasketCard" + Looper);
							if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
								IsAnyHiddenCardSelected = true;
							}
						}
						Counter2++;
						break;
					case "WeaponCard":
						if(Casket.Card[Looper].BasicProperties.ID.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Name.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Type.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Translate(Casket.Card[Looper].BasicProperties.Type).toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Keywords.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Description.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].Credits.Author.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].WeaponCardProperties.WeaponType.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Translate(Casket.Card[Looper].WeaponCardProperties.WeaponType).toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true) {
							Show("Ctrl_CasketCard" + Looper);
							Counter++;
							if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
								Counter3++;
							}
						} else {
							Hide("Ctrl_CasketCard" + Looper);
							if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
								IsAnyHiddenCardSelected = true;
							}
						}
						Counter2++;
						break;
					case "ArtifactCard":
					case "SupportCard":
					case "EventCard":
						if(Casket.Card[Looper].BasicProperties.ID.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Name.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Type.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Translate(Casket.Card[Looper].BasicProperties.Type).toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Keywords.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].BasicProperties.Description.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true ||
						Casket.Card[Looper].Credits.Author.toLowerCase().includes(ReadValue("Textbox_CasketActionCardsFilter").toLowerCase()) == true) {
							Show("Ctrl_CasketCard" + Looper);
							Counter++;
							if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
								Counter3++;
							}
						} else {
							Hide("Ctrl_CasketCard" + Looper);
							if(IsChecked("Checkbox_CasketCard" + Looper) == true) {
								IsAnyHiddenCardSelected = true;
							}
						}
						Counter2++;
						break;
					default:
						AlertSystemError("The value of Casket.Card[Looper].BasicProperties.Type \"" + Casket.Card[Looper].BasicProperties.Type + "\" in function FilterCasket is invalid.");
						break;
				}
			}
			ChangeText("Label_CasketActionCardsItemCount", "显示 " + Counter + "/" + Counter2);
			if(Casket.DeckSelection[1] > 0 && Counter > 0) {
				ChangeDisabled("Checkbox_CasketSelectAllActionCards", false);
			} else {
				ChangeDisabled("Checkbox_CasketSelectAllActionCards", true);
			}
			if(Counter == Counter3 && IsAnyHiddenCardSelected == false) {
				ChangeChecked("Checkbox_CasketSelectAllActionCards", true);
			} else {
				ChangeChecked("Checkbox_CasketSelectAllActionCards", false);
			}
			if(Counter > 0) {
				ChangeDisabled("Button_CasketActionCardsSortByName", false);
				ChangeDisabled("Button_CasketActionCardsSortByType", false);
			} else {
				ChangeDisabled("Button_CasketActionCardsSortByName", true);
				ChangeDisabled("Button_CasketActionCardsSortByType", true);
			}
		}

		// Decks
		function SetPlayerDeckGenerateTemporaryDeck() {
			Casket.DeckSelection[1] = -2;
			RefreshGame();
		}
		function SetOpponentDeckGenerateTemporaryDeck() {
			Casket.DeckSelection[2] = -2;
			RefreshGame();
		}
		function SetPlayerDeckRandomlySelectDeck() {
			Casket.DeckSelection[1] = -1;
			RefreshGame();
		}
		function SetOpponentDeckRandomlySelectDeck() {
			Casket.DeckSelection[2] = -1;
			RefreshGame();
		}
		function SetPlayerDeck(DeckNumber) {
			Casket.DeckSelection[1] = DeckNumber;
			RefreshGame();
		}
		function SetOpponentDeck(DeckNumber) {
			Casket.DeckSelection[2] = DeckNumber;
			RefreshGame();
		}
		function DuplicateDeck(DeckNumber) {
			Casket.Deck.splice(DeckNumber + 1, 0, structuredClone(Casket.Deck[DeckNumber]));
			if(Casket.DeckSelection[1] > DeckNumber) {
				Casket.DeckSelection[1]++;
			}
			if(Casket.DeckSelection[2] > DeckNumber) {
				Casket.DeckSelection[2]++;
			}
			RefreshGame();
		}
		function ExportDeck(DeckNumber) {
			navigator.clipboard.writeText(JSON.stringify(Casket.Deck[DeckNumber]));
			if(System.DontShowAgain.includes("GITCGLite_Casket_DeckExported") == false) {
				ShowDialog("Casket_DeckExported",
					"Info",
					"已导出牌组「" + Casket.Deck[DeckNumber].Properties.Name + "」至剪贴板。",
					"不再弹窗提示", "", "", "确定");
			} else {
				ShowToast("已导出牌组");
			}
		}
		function ConfirmDeleteDeck(DeckNumber) {
			Interaction.Deletion = DeckNumber;
			ShowDialog("Casket_ConfirmDeleteDeck",
				"Caution",
				"您确认要删除牌组「" + ConvertEmptyName(Casket.Deck[DeckNumber].Properties.Name) + "」？",
				"", "", "删除", "取消");
		}
		function NewDeck() {
			Casket.Deck[Casket.Deck.length] = structuredClone(Casket0.BuiltinDeck.EmptyDeck);
			SetPlayerDeck(Casket.Deck.length - 1);
			RefreshGame();
		}
		function SortDecksByName() {
			for(let Looper = 1; Looper < Casket.Deck.length - 1; Looper++) {
				for(let Looper2 = 1; Looper2 < Casket.Deck.length - 1; Looper2++) {
					if(Casket.Deck[Looper2].Properties.Name > Casket.Deck[Looper2 + 1].Properties.Name) {
						let Swapper = structuredClone(Casket.Deck[Looper2]);
						Casket.Deck[Looper2] = structuredClone(Casket.Deck[Looper2 + 1]);
						Casket.Deck[Looper2 + 1] = structuredClone(Swapper);
						switch(true) {
							case Casket.DeckSelection[1] == Looper2:
								Casket.DeckSelection[1]++;
								break;
							case Casket.DeckSelection[1] == Looper2 + 1:
								Casket.DeckSelection[1]--;
								break;
						}
						switch(true) {
							case Casket.DeckSelection[2] == Looper2:
								Casket.DeckSelection[2]++;
								break;
							case Casket.DeckSelection[2] == Looper2 + 1:
								Casket.DeckSelection[2]--;
								break;
						}
					}
				}
			}
			RefreshGame();
		}

		// Cards
		function SetCard(CardNumber) {
			if(Casket.DeckSelection[1] > 0) {
				if(Casket.Card[CardNumber].BasicProperties.Type == "CharacterCard") {
					if(IsChecked("Checkbox_CasketCard" + CardNumber) == true) {
						// Add selection
						let IsCardAlreadyInDeck = false;
						for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length; Looper++) {
							if(Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Looper] == Casket.Card[CardNumber].BasicProperties.ID) {
								IsCardAlreadyInDeck = true;
								break;
							}
						}
						if(IsCardAlreadyInDeck == false) {
							Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length] = Casket.Card[CardNumber].BasicProperties.ID;
						}
					} else {
						// Remove selection
						for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length; Looper++) {
							if(Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Looper] == Casket.Card[CardNumber].BasicProperties.ID) {
								Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.splice(Looper, 1);
								break;
							}
						}
					}
				} else {
					if(IsChecked("Checkbox_CasketCard" + CardNumber) == true) {
						// Add selection
						let IsCardAlreadyInDeck = false;
						for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length; Looper++) {
							if(Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Looper] == Casket.Card[CardNumber].BasicProperties.ID) {
								IsCardAlreadyInDeck = true;
								break;
							}
						}
						if(IsCardAlreadyInDeck == false) {
							Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length] = Casket.Card[CardNumber].BasicProperties.ID;
						}
					} else {
						// Remove selection
						for(let Looper = 1; Looper < Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length; Looper++) {
							if(Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Looper] == Casket.Card[CardNumber].BasicProperties.ID) {
								Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.splice(Looper, 1);
								break;
							}
						}
					}
				}
				RefreshGame();
			} else {
				AlertSystemError("Function SetCard was called when player deck selection is not a specific deck.");
			}
		}
		function EditCard(CardNumber) {
			ChangeValue("Textbox_EditorOpen", Casket.Card[CardNumber].BasicProperties.ID);
			ScrollIntoView("Editor");
			RefreshEditor();
		}
		function DuplicateCard(CardNumber) {
			let NewCardID = Casket.Card[CardNumber].BasicProperties.ID + "(Copy)";
			while(ReadCardNumberByID(NewCardID) > 0) {
				NewCardID += "(Copy)";
			}
			Casket.Card.splice(CardNumber + 1, 0, structuredClone(Casket.Card[CardNumber]));
			Casket.Card[CardNumber + 1].BasicProperties.ID = NewCardID;
			RefreshCasket();
			RefreshEditor();
		}
		function ExportCard(CardNumber) {
			navigator.clipboard.writeText(JSON.stringify(Casket.Card[CardNumber]));
			if(System.DontShowAgain.includes("GITCGLite_Casket_CardExported") == false) {
				ShowDialog("Casket_CardExported",
					"Info",
					"已导出卡牌「" + ConvertEmptyName(Casket.Card[CardNumber].BasicProperties.Name) + "」至剪贴板。",
					"不再弹窗提示", "", "", "确定");
			} else {
				ShowToast("已导出卡牌");
			}
		}
		function ConfirmDeleteCard(CardNumber) {
			Interaction.Deletion = CardNumber;
			ShowDialog("Casket_ConfirmDeleteCard",
				"Caution",
				"您确认要删除卡牌「" + ConvertEmptyName(Casket.Card[CardNumber].BasicProperties.Name) + "」？其 ID 为：" + Casket.Card[CardNumber].BasicProperties.ID,
				"", "", "删除", "取消");
		}
		function NewCharacterCard() {
			let NewCardID = "NewCharacterCard";
			while(ReadCardNumberByID(NewCardID) > 0) {
				NewCardID += "(Copy)";
			}
			Casket.Card[Casket.Card.length] = structuredClone(Casket0.BuiltinCard.EmptyCharacterCard);
			Casket.Card[Casket.Card.length - 1].BasicProperties.ID = NewCardID;
			RefreshCasket();
			EditCard(Casket.Card.length - 1);
		}
		function SetSelectAllCharacterCards() {
			if(Casket.DeckSelection[1] > 0) {
				for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
					if(Casket.Card[Looper].BasicProperties.Type == "CharacterCard") {
						if(IsClassContained("Ctrl_CasketCard" + Looper, "Hidden") == false && IsChecked("Checkbox_CasketSelectAllCharacterCards") == true) {
							// Add selection
							let IsCardAlreadyInDeck = false;
							for(let Looper2 = 1; Looper2 < Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length; Looper2++) {
								if(Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Looper2] == Casket.Card[Looper].BasicProperties.ID) {
									IsCardAlreadyInDeck = true;
									break;
								}
							}
							if(IsCardAlreadyInDeck == false) {
								Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length] = Casket.Card[Looper].BasicProperties.ID;
							}
						} else {
							// Remove selection
							for(let Looper2 = 1; Looper2 < Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length; Looper2++) {
								if(Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection[Looper2] == Casket.Card[Looper].BasicProperties.ID) {
									Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.splice(Looper2, 1);
									break;
								}
							}
						}
					}
				}
				RefreshGame();
			} else {
				AlertSystemError("Function SelectAllCharacterCards was called when player deck selection is not a specific deck.");
			}
		}
		function ConfirmDeleteSelectedCharacterCards() {
			if(Casket.DeckSelection[1] > 0 && Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length > 1) {
				ShowDialog("Casket_ConfirmDeleteSelectedCharacterCards",
					"Caution",
					"您确认要删除当前牌组选中的所有" + (Casket.Deck[Casket.DeckSelection[1]].CharacterCardSelection.length - 1) + "张角色牌？",
					"", "", "删除", "取消");
			} else {
				AlertSystemError("Function ConfirmDeleteSelectedCharacterCards was called when no deck is selected or no character cards are selected in the current deck.");
			}
		}
		function NewActionCard() {
			let NewCardID = "NewActionCard";
			while(ReadCardNumberByID(NewCardID) > 0) {
				NewCardID += "(Copy)";
			}
			Casket.Card[Casket.Card.length] = structuredClone(Casket0.BuiltinCard.EmptyActionCard);
			Casket.Card[Casket.Card.length - 1].BasicProperties.ID = NewCardID;
			RefreshCasket();
			EditCard(Casket.Card.length - 1);
		}
		function SetSelectAllActionCards() {
			if(Casket.DeckSelection[1] > 0) {
				for(let Looper = 1; Looper < Casket.Card.length; Looper++) {
					if(Casket.Card[Looper].BasicProperties.Type != "CharacterCard") {
						if(IsClassContained("Ctrl_CasketCard" + Looper, "Hidden") == false && IsChecked("Checkbox_CasketSelectAllActionCards") == true) {
							// Add selection
							let IsCardAlreadyInDeck = false;
							for(let Looper2 = 1; Looper2 < Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length; Looper2++) {
								if(Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Looper2] == Casket.Card[Looper].BasicProperties.ID) {
									IsCardAlreadyInDeck = true;
									break;
								}
							}
							if(IsCardAlreadyInDeck == false) {
								Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length] = Casket.Card[Looper].BasicProperties.ID;
							}
						} else {
							// Remove selection
							for(let Looper2 = 1; Looper2 < Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length; Looper2++) {
								if(Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection[Looper2] == Casket.Card[Looper].BasicProperties.ID) {
									Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.splice(Looper2, 1);
									break;
								}
							}
						}
					}
				}
				RefreshGame();
			} else {
				AlertSystemError("Function SelectAllActionCards was called when player deck selection is not a specific deck.");
			}
		}
		function ConfirmDeleteSelectedActionCards() {
			if(Casket.DeckSelection[1] > 0 && Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length > 1) {
				ShowDialog("Casket_ConfirmDeleteSelectedActionCards",
					"Caution",
					"您确认要删除当前牌组选中的所有" + (Casket.Deck[Casket.DeckSelection[1]].ActionCardSelection.length - 1) + "张行动牌？",
					"", "", "删除", "取消");
			} else {
				AlertSystemError("Function ConfirmDeleteSelectedActionCards was called when no deck is selected or no action cards are selected in the current deck.");
			}
		}
		function SortCards(CardType, SortByWhat) {
			// Move character cards to front
			for(let Looper = 1; Looper < Casket.Card.length - 1; Looper++) {
				for(let Looper2 = 1; Looper2 < Casket.Card.length - 1; Looper2++) {
					if(Casket.Card[Looper2].BasicProperties.Type != "CharacterCard" && Casket.Card[Looper2 + 1].BasicProperties.Type == "CharacterCard") {
						let Swapper = structuredClone(Casket.Card[Looper2]);
						Casket.Card[Looper2] = structuredClone(Casket.Card[Looper2 + 1]);
						Casket.Card[Looper2 + 1] = structuredClone(Swapper);
					}
				}
			}

			// Sort
			switch(CardType) {
				case "CharacterCard":
					switch(SortByWhat) {
						case "Name":
							for(let Looper = 1; Looper < Casket.Card.length - 1; Looper++) {
								for(let Looper2 = 1; Looper2 < Casket.Card.length - 1; Looper2++) {
									if(Casket.Card[Looper2].BasicProperties.Type == "CharacterCard" && Casket.Card[Looper2 + 1].BasicProperties.Type == "CharacterCard" &&
									Casket.Card[Looper2].BasicProperties.Name > Casket.Card[Looper2 + 1].BasicProperties.Name) {
										let Swapper = structuredClone(Casket.Card[Looper2]);
										Casket.Card[Looper2] = structuredClone(Casket.Card[Looper2 + 1]);
										Casket.Card[Looper2 + 1] = structuredClone(Swapper);
									}
								}
							}
							break;
						case "ElementType":
							for(let Looper = 1; Looper < Casket.Card.length - 1; Looper++) {
								for(let Looper2 = 1; Looper2 < Casket.Card.length - 1; Looper2++) {
									if(Casket.Card[Looper2].BasicProperties.Type == "CharacterCard" && Casket.Card[Looper2 + 1].BasicProperties.Type == "CharacterCard") {
										if(ConvertElementTypeToNumber(Casket.Card[Looper2].CharacterCardProperties.ElementType) > ConvertElementTypeToNumber(Casket.Card[Looper2 + 1].CharacterCardProperties.ElementType)) {
											let Swapper = structuredClone(Casket.Card[Looper2]);
											Casket.Card[Looper2] = structuredClone(Casket.Card[Looper2 + 1]);
											Casket.Card[Looper2 + 1] = structuredClone(Swapper);
										}
									}
								}
							}
							break;
						default:
							AlertSystemError("The value of SortByWhat \"" + SortByWhat + "\" in function SortCards is invalid.");
							break;
					}
					break;
				case "ActionCard":
					switch(SortByWhat) {
						case "Name":
							for(let Looper = 1; Looper < Casket.Card.length - 1; Looper++) {
								for(let Looper2 = 1; Looper2 < Casket.Card.length - 1; Looper2++) {
									if(Casket.Card[Looper2].BasicProperties.Type != "CharacterCard" && Casket.Card[Looper2 + 1].BasicProperties.Type != "CharacterCard" &&
									Casket.Card[Looper2].BasicProperties.Name > Casket.Card[Looper2 + 1].BasicProperties.Name) {
										let Swapper = structuredClone(Casket.Card[Looper2]);
										Casket.Card[Looper2] = structuredClone(Casket.Card[Looper2 + 1]);
										Casket.Card[Looper2 + 1] = structuredClone(Swapper);
									}
								}
							}
							break;
						case "Type":
							for(let Looper = 1; Looper < Casket.Card.length - 1; Looper++) {
								for(let Looper2 = 1; Looper2 < Casket.Card.length - 1; Looper2++) {
									if(Casket.Card[Looper2].BasicProperties.Type != "CharacterCard" && Casket.Card[Looper2 + 1].BasicProperties.Type != "CharacterCard") {
										if(ConvertCardTypeToNumber(Casket.Card[Looper2].BasicProperties.Type) > ConvertCardTypeToNumber(Casket.Card[Looper2 + 1].BasicProperties.Type)) {
											let Swapper = structuredClone(Casket.Card[Looper2]);
											Casket.Card[Looper2] = structuredClone(Casket.Card[Looper2 + 1]);
											Casket.Card[Looper2 + 1] = structuredClone(Swapper);
										}
									}
								}
							}
							break;
						default:
							AlertSystemError("The value of SortByWhat \"" + SortByWhat + "\" in function SortCards is invalid.");
							break;
					}
					break;
				default:
					AlertSystemError("The value of CardType \"" + CardType + "\" in function SortCards is invalid.");
					break;
			}

			// Refresh
			RefreshCasket();
			RefreshEditor();
		}

		// Deck properties
		function SetDeckName() {
			Casket.Deck[Casket.DeckSelection[1]].Properties.Name = ReadValue("Textbox_CasketDeckPropertiesName");
			RefreshGame();
		}
		function SetDeckDescription() {
			Casket.Deck[Casket.DeckSelection[1]].Properties.Description = ReadValue("Textbox_CasketDeckPropertiesDescription");
			RefreshCasket();
		}
		function SetDeckBgImage() {
			Casket.Deck[Casket.DeckSelection[1]].Properties.BgImage = ReadValue("Textbox_CasketDeckPropertiesBgImage");
			RefreshGame();
		}
		function SetDeckCardBackImage() {
			Casket.Deck[Casket.DeckSelection[1]].Properties.CardBackImage = ReadValue("Textbox_CasketDeckPropertiesCardBackImage");
			RefreshGame();
		}
		function SetDeckImageSource() {
			Casket.Deck[Casket.DeckSelection[1]].Properties.ImageSource = ReadValue("Textbox_CasketDeckPropertiesImageSource");
			RefreshCasket();
		}

		// Management
		function ImportCasketObjects() {
			CloseCard();
			let Objects = ReadValue("Textbox_CasketImport").split("\n"), Counter = 0, Counter2 = 0;
			for(let Looper = 0; Looper < Objects.length; Looper++) {
				switch(true) {
					// Single deck
					case Objects[Looper].startsWith("{\"Properties\":{\"Name\":") == true:
						Casket.Deck[Casket.Deck.length] = JSON.parse(Objects[Looper]);
						Counter++;
						break;

					// Deck library
					case Objects[Looper].startsWith("[\"DeckLibrary\",{\"Properties\":{\"Name\":") == true:
						Casket.Deck = JSON.parse(Objects[Looper]);
						Counter++;
						break;

					// Single card
					case Objects[Looper].startsWith("{\"BasicProperties\":{\"ID\":") == true:
						Casket.Card[Casket.Card.length] = JSON.parse(Objects[Looper]);
						while(ReadCardNumberByID(Casket.Card[Casket.Card.length - 1].BasicProperties.ID) != Casket.Card.length - 1) {
							Casket.Card[Casket.Card.length - 1].BasicProperties.ID += "(Copy)";
						}
						Counter++;
						break;

					// Card library
					case Objects[Looper].startsWith("[\"CardLibrary\",{\"BasicProperties\":{\"ID\":") == true:
						Casket.Card = JSON.parse(Objects[Looper]);
						Counter++;
						break;
					
					// Whole casket
					case Objects[Looper].startsWith("{\"DeckSelection\":[0,") == true:
						Casket = JSON.parse(Objects[Looper]);
						Counter++;
						break;
					
					// Empty line
					case Objects[Looper] == "":
						break;
					
					// Failed to import
					default:
						Counter2++;
						break;
				}
			}
			if(Counter > 0) {
				if(Counter2 <= 0) {
					ShowDialog("Casket_ObjectsImported",
						"Info",
						"成功导入" + Counter + "个对象。",
						"", "", "", "确定");
				} else {
					ShowDialog("Casket_ObjectsImported",
						"Info",
						"成功导入" + Counter + "个对象。" + Counter2 + "个对象的 JSON 字符串不合法，无法导入。",
						"", "", "", "确定");
				}
			} else {
				if(ReadValue("Textbox_CasketImport") != "") {
					ShowDialog("Casket_ImportFailed",
						"Error",
						"您键入的 JSON 字符串不合法。",
						"", "", "", "确定");
				} else {
					ShowDialog("Casket_ImportFailed",
						"Error",
						"文本框为空。请先在文本框键入要导入的对象，然后再点击「导入」。",
						"", "", "", "确定");
				}
			}
			ChangeValue("Textbox_CasketImport", "");
			RefreshGame();
			RefreshEditor();
		}
		function ExportDeckLibrary() {
			navigator.clipboard.writeText(JSON.stringify(Casket.Deck));
			ShowDialog("Casket_DeckLibraryExported",
				"Info",
				"已导出牌组库 (" + (Casket.Deck.length - 1) + "个牌组) 至剪贴板。",
				"", "", "", "确定");
		}
		function ExportCardLibrary() {
			navigator.clipboard.writeText(JSON.stringify(Casket.Card));
			ShowDialog("Casket_CardLibraryExported",
				"Info",
				"已导出卡牌库 (" + (Casket.Card.length - 1) + "张卡牌) 至剪贴板。",
				"", "", "", "确定");
		}
		function ExportCasket() {
			navigator.clipboard.writeText(JSON.stringify(Casket));
			ShowDialog("Casket_CasketExported",
				"Info",
				"已导出牌盒 (" + (Casket.Deck.length - 1) + "个牌组与" + (Casket.Card.length - 1) + "张卡牌) 至剪贴板。",
				"", "", "", "确定");
		}
		function ConfirmResetCasket() {
			ShowDialog("Casket_ConfirmResetCasket",
				"Caution",
				"您确认要重置牌盒？",
				"", "", "重置", "取消");
		}

		// Info window
		function HoverCardInCasket(CardNumber) {
			if((Subsystem.Display.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow == "AlwaysShow") && Subsystem.Display.AlsoShowInfoWindowInCasket == true) {
				RefreshInfoWindowObjectProperties(CardNumber, "BasicProperties");
				RefreshInfoWindowInGameCharacterProperties("Hide", null);
				ShowInfoWindow();
			}
		}
		function ClickCardInCasket(CardNumber) {
			if((Subsystem.Display.InfoWindow == "ShowOnClick" || Subsystem.Display.InfoWindow == "ShowOnHover" || Subsystem.Display.InfoWindow == "AlwaysShow") && Subsystem.Display.AlsoShowInfoWindowInCasket == true) {
				RefreshInfoWindowObjectProperties(CardNumber, "BasicProperties");
				RefreshInfoWindowInGameCharacterProperties("Hide", null);
				ShowInfoWindow();
			}
		}
