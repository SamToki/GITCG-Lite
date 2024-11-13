// For SamToki.github.io/GITCGLite
// Released under GNU GPL v3 open source license.
// (C) 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CacheName = "GITCGLite_v0.40";

// Listeners
	// Service worker (https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/#step-5---add-a-service-worker)
	self.addEventListener("install", Event => {
		Event.waitUntil((async() => {
			const CacheContent = await caches.open(CacheName);
			CacheContent.addAll([
				"index.html",
				"icons/favicon.ico",
				"../styles/common.css",
				"../styles/common_Dark.css",
				"../styles/common_Genshin.css",
				"../styles/common_HighContrast.css",
				"styles/style.css",
				"styles/style_Dark.css",
				"styles/style_Genshin.css",
				"styles/style_HighContrast.css",
				"../scripts/common.js",
				"../scripts/common_UserDataRepairer.js",
				"scripts/script_BuiltinCasket.js",
				"scripts/script_Game.js",
				"scripts/script_GameFunctions.js",
				"scripts/script_GameAI.js",
				"scripts/script_Casket.js",
				"scripts/script_Editor.js",
				"scripts/script.js",
				"manifests/manifest.json",
				"../cursors/BTRAhoge.cur",
				"../cursors/Genshin.cur",
				"../cursors/GenshinFurina.cur",
				"../cursors/GenshinNahida.cur",
				"images/Icon.png",
				"images/Icon_Large.png",
				"images/Icon_Maskable.png",
				"images/Preview.jpg",
				"images/Background.jpg",
				"images/UnknownCard.jpg",
				"images/UnknownSkillOrStatus.png",
				"images/CardBack.jpg",
				"images/NormalAttack_Sword.png",
				"images/NormalAttack_Claymore.png",
				"images/NormalAttack_Polearm.png",
				"images/NormalAttack_Catalyst.png",
				"images/NormalAttack_Bow.png",
				"../audio/Beep.mp3",
				"audio/Attack.mp3",
				"audio/Buff.mp3",
				"audio/CardDisappear.mp3",
				"audio/Click.mp3",
				"audio/Counter.mp3",
				"audio/CreateDice.mp3",
				"audio/Defeat.mp3",
				"audio/DrawCard.mp3",
				"audio/Fallen.mp3",
				"audio/Heal.mp3",
				"audio/Invalid.mp3",
				"audio/NewPhase.mp3",
				"audio/NewRound.mp3",
				"audio/PlayCard1.mp3",
				"audio/PlayCard2.mp3",
				"audio/PreviewVoiceVolume.mp3",
				"audio/RechargeComplete.mp3",
				"audio/RollDice.mp3",
				"audio/RollPhaseSelectDice.mp3",
				"audio/SelectCard.mp3",
				"audio/SelectSkill.mp3",
				"audio/SkillIndicator.mp3",
				"audio/Start.mp3",
				"audio/SwitchCharacter.mp3",
				"audio/SwitchStartingHand.mp3",
				"audio/TableSelectDice.mp3",
				"audio/Tuning.mp3",
				"audio/Turn.mp3",
				"audio/Victory.mp3",
				"docs/假名征服者 快速入门.pdf",
				"docs/假名征服者 说明文档.pdf"
			]);
		})());
	});
	self.addEventListener("fetch", Event => {
		Event.respondWith((async() => {
			const CacheContent = await caches.open(CacheName);
			const CachedResponse = await CacheContent.match(Event.request);
			if(CachedResponse) {
				return CachedResponse;
			} else {
				const FetchResponse = await fetch(Event.request);
				CacheContent.put(Event.request, FetchResponse.clone());
				return FetchResponse;
			}
		})());
	});
