// script.js
import { DATABASE, LOCALIZATION_MAP } from './database.js';

const game = {
    state: { player: null, currentScreen: 'start-screen', isRunning: false, codex: {monsters: [], items: [], weapons: [], armors: []}, canRest: true },

    init() {
        this.ui.showScreen('start-screen');
        this.addEventListeners();
        this.audio.init();
        
        // [修改] 檢查是否存在本機存檔，若無則禁用讀取按鈕
        const loadGameBtn = document.getElementById('load-game-btn');
        if (!localStorage.getItem('勇闖天下-savegame')) {
            loadGameBtn.disabled = true;
            loadGameBtn.title = '沒有找到存檔';
        } else {
            loadGameBtn.disabled = false;
            loadGameBtn.title = '';
        }
    },
    
    addEventListeners() {
        const gameWindow = document.getElementById('game-window');
        
        gameWindow.addEventListener('click', (e) => {
            const target = e.target;
            
            if(target.closest('button')) this.audio.playSound('click');

            const actionButton = target.closest('[data-action]');
            const codexTabButton = target.closest('.codex-tab-button');
            const npcButton = target.closest('.npc-talk-btn');

            // 主選單
            if (target.closest('#start-game-btn')) this.ui.showScreen('char-select-screen');
            if (target.closest('#load-game-btn')) this.saveLoad.load();
            if (target.closest('#show-author-btn')) this.ui.showAuthorModal();
            if (target.closest('#confirm-char-btn')) this.ui.showNameInputModal();
            if (target.closest('.char-card')) {
                document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
                target.closest('.char-card').classList.add('selected');
                document.getElementById('confirm-char-btn').classList.remove('hidden');
            }
            if(target.closest('#continue-to-game-btn')) this.ui.showScreen('hub-screen');

            // Hub
            if(npcButton) this.ui.showNPCDialogue(npcButton.dataset.npcId);
            if(target.closest('#go-adventure-btn')) this.actions.adventure();
            if(target.closest('#rest-btn')) this.actions.rest();
            if(target.closest('#go-shop-btn')) this.actions.shop();
            if(target.closest('#show-codex-btn')) this.ui.showCodexModal();
            if(target.closest('#save-btn')) this.saveLoad.save();
            if(target.closest('#load-btn')) this.saveLoad.showLoadConfirmationModal();
            if(target.closest('#return-to-start-btn')) this.ui.showReturnToStartConfirmation();
            if(target.closest('#gm-mode-btn')) this.ui.showGMPasswordModal();

            // 戰鬥
            if (actionButton && this.state.currentScreen === 'combat-screen') {
                const action = actionButton.dataset.action;
                switch(action) {
                    case 'attack': this.combat.playerAction('attack'); break;
                    case 'skills': this.ui.showSkillTreeModal(true); break;
                    case 'inventory': this.ui.showInventoryModal(true); break;
                    case 'run': this.combat.playerAction('run'); break;
                }
            }

            // 商店
            if (target.closest('#shop-close-btn')) this.ui.showScreen('hub-screen');
            const buyButton = target.closest('#shop-items-container button[data-action="buy"]');
            if (buyButton) {
                const itemId = buyButton.dataset.itemId;
                const itemData = DATABASE.items[itemId];
                if (game.state.player.gold >= itemData.value) {
                    game.state.player.gold -= itemData.value;
                    game.player.addItem(itemId, 1);
                    this.ui.showModal({ title: '購買成功', body: `<p>你購買了 ${itemData.name}。</p>`, buttons: [{ text: '好的', fn: () => this.ui.closeModal() }] });
                    this.ui.updateHubUI();
                } else {
                    this.ui.showModal({ title: '金錢不足', body: '<p>你沒有足夠的金錢購買此物品。</p>', buttons: [{ text: '好的', fn: () => this.ui.closeModal() }] });
                }
            }
            
            // 圖冊
            if (target.closest('#codex-close-btn')) this.ui.closeCodexModal();
            if (codexTabButton) {
                document.querySelectorAll('.codex-tab-button').forEach(b => b.classList.remove('active'));
                codexTabButton.classList.add('active');
                this.ui.renderCodex(codexTabButton.dataset.tab);
            }
        });
    },

    startNewGame(playerName) {
        const selectedClass = document.querySelector('.char-card.selected')?.dataset.class;
        if (!selectedClass) return;
        const classData = DATABASE.classes[selectedClass];
        this.state.player = {
            name: playerName, class: selectedClass, className: classData.name, level: 1, exp: 0,
            expToNext: 80,
            baseStats: { ...classData.stats },
            stats: { ...classData.stats }, maxStats: { ...classData.stats },
            skillPoints: 0,
            attributePoints: 0,
            gold: 100,
            inventory: [{itemId: 'healingEgg', quantity: 3, seen: true}],
            equipment: { weapon: null, armor: null, accessory: null },
            skills: { ...classData.skills },
            quests: {},
            completedQuests: [], // [新增] 追蹤已完成的任務
            storyProgress: 'main01',
            activeEffects: []
        };
        const startingWeapon = Object.values(DATABASE.items).find(item => item.type === 'weapon' && item.class?.includes(selectedClass) && (item.stats.atk < 5 || item.stats.spi < 7));
        if(startingWeapon) this.state.player.inventory.push({itemId: startingWeapon.id, quantity: 1, seen: true});

        this.player.recalculateStats();
        this.state.player.stats.hp = this.state.player.maxStats.hp;
        this.state.player.stats.mp = this.state.player.maxStats.mp;
        
        this.ui.showStoryScreen(selectedClass);
        this.state.codex = {monsters: [], items: [], weapons: [], armors: []};
        this.state.player.inventory.forEach(i => this.player.addCodexEntryForItem(i.itemId));
    },

    actions: {
        adventure() { game.ui.showWorldMap();
        },
        rest() {
            if (!game.state.player) return;
            if (!game.state.canRest) {
                 game.ui.showModal({ title: '無法休息', body: '<p>你需要先去冒險一次才能再次休息。</p>', buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }] });
                return;
            }
            const p = game.state.player;
            const hpHeal = Math.floor(p.maxStats.hp * 0.3);
            const mpHeal = Math.floor(p.maxStats.mp * 0.3);
            p.stats.hp = Math.min(p.maxStats.hp, p.stats.hp + hpHeal);
            p.stats.mp = Math.min(p.maxStats.mp, p.stats.mp + mpHeal);
            game.state.canRest = false;
            game.ui.updateHubUI();
            game.ui.showModal({ title: '休息完畢', body: `<p>你恢復了 ${hpHeal} 生命和 ${mpHeal} 法力。</p>`, buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }] });
        },
        shop() {
            game.ui.showScreen('shop-screen');
        },
    },

    player: {
        addExp(amount) {
            if (!game.state.player || amount <= 0) return;
            const p = game.state.player;
            p.exp += amount;
            let leveledUp = false;
            while (p.exp >= p.expToNext) { this.levelUp(); leveledUp = true;
            }
            if (leveledUp) {
                setTimeout(() => {
                    game.ui.showModal({ title: '等級提升！', body: `<p>你升到了 ${p.level} 級！你的能力已完全恢復並獲得了提升！</p>`, buttons: [{text: '太棒了！', fn: () => game.ui.closeModal()}] });
                }, 500);
            }
        },
        levelUp() {
            const p = game.state.player;
            p.exp -= p.expToNext;
            p.level++;
            p.expToNext = Math.floor(80 * Math.pow(p.level, 1.4));
            
            p.skillPoints += 1;
            p.attributePoints += 3;
            const growth = {
                swordsman: { hp: 12, mp: 4, atk: 3, def: 2, spi: 1, hit: 1, eva: 0.5, speed: 0.5 },
                monk: { hp: 8, mp: 10, atk: 1, def: 1.5, spi: 3, hit: 1, eva: 1, speed: 1 },
                orc: { hp: 15, mp: 3, atk: 3, def: 3, spi: 0.5, hit: 0.5, eva: 0.2, speed: 0.3 },
                necromancer: { hp: 6, mp: 12, atk: 0.5, def: 1, spi: 4, hit: 1.2, eva: 1.5, speed: 1.2 },
            };
            const classGrowth = growth[p.class];
            for(const stat in classGrowth) {
                p.baseStats[stat] += classGrowth[stat];
            }
            
            this.recalculateStats();
            p.stats.hp = p.maxStats.hp; p.stats.mp = p.maxStats.mp;
            game.quests.advance('level', 'any');
            game.audio.playSound('levelUp');
        },
        recalculateStats() {
            const p = game.state.player;
            if(!p) return;
            p.maxStats = { ...p.baseStats };
            
            // 裝備加成
            for(const slot in p.equipment) {
                if (p.equipment[slot]) {
                    const item = DATABASE.items[p.equipment[slot]];
                    if (item.stats) {
                        for(const stat in item.stats) { 
                            p.maxStats[stat] += item.stats[stat];
                        }
                    }
                }
            }

            // 狀態效果 (Buff/Debuff) 加成
            const statBuffs = {};
            p.activeEffects.forEach(effect => {
                if (effect.stat && effect.value) {
                    statBuffs[effect.stat] = (statBuffs[effect.stat] || 0) + effect.value;
                }
            });
            for (const stat in statBuffs) {
                p.maxStats[stat] += statBuffs[stat];
            }

            // 衍生屬性計算
            p.maxStats.mp = p.maxStats.mp + Math.floor(p.maxStats.spi * 1.5);
            for(const stat in p.maxStats) {
                p.maxStats[stat] = Math.round(p.maxStats[stat]);
            }

            p.stats.hp = Math.min(p.stats.hp, p.maxStats.hp);
            p.stats.mp = Math.min(p.stats.mp, p.maxStats.mp);
        },
        addItem(itemId, quantity) {
            const p = game.state.player;
            const existingItem = p.inventory.find(i => i.itemId === itemId);
            if (existingItem) { 
                existingItem.quantity += quantity;
                existingItem.seen = false;
            } 
            else { p.inventory.push({ itemId, quantity, seen: false });
            }
            this.addCodexEntryForItem(itemId);
            game.ui.updateHubUI();
        },
        addCodexEntryForItem(itemId, type) {
            const itemData = DATABASE.items[itemId];
            if(type === 'monsters' && game.state.codex.monsters && !game.state.codex.monsters.includes(itemId)) {
                game.state.codex.monsters.push(itemId);
                return;
            }
            if (!itemData) return;
            let itemType;
            if (itemData.type === 'weapon') itemType = 'weapons';
            else if (['armor', 'accessory'].includes(itemData.type)) itemType = 'armors';
            else itemType = 'items';
            if (game.state.codex[itemType] && !game.state.codex[itemType].includes(itemId)) {
                game.state.codex[itemType].push(itemId);
            }
        },
        useItem(itemId, isCombat) {
            const p = game.state.player;
            const itemStack = p.inventory.find(i => i.itemId === itemId);
            if (!itemStack) return false;
            const itemData = DATABASE.items[itemId];
            
            let effectApplied = false;
            if (itemData.type === 'skillbook') {
                if (isCombat) { game.ui.showModal({ title: '無法使用', body: '<p>戰鬥中無法學習技能。</p>', buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }]});
                    return false; }
                if (p.skills[itemData.skillId] && p.skills[itemData.skillId] >= DATABASE.skills[itemData.skillId].maxLevel) {
                    game.ui.showModal({ title: '無法使用', body: '<p>你已學會此技能的最高等級。</p>', buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }]});
                    return false;
                }
                p.skills[itemData.skillId] = (p.skills[itemData.skillId] || 0) + 1;
                game.ui.showModal({ title: '學習成功', body: `<p>你學會了 ${DATABASE.skills[itemData.skillId].name}！</p>`, buttons: [{ text: '好的', fn: () => game.ui.closeModal() }]});
                effectApplied = true;
            } else if (itemData.type === 'consumable') {
                if (itemData.combatOnly && !isCombat) {
                    game.ui.showModal({title: '無法使用', body: '<p>此道具只能在戰鬥中使用。</p>', buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }]});
                    return false;
                }
                const effect = itemData.effect;
                switch(effect.type) {
                    case 'heal_hp': 
                        p.stats.hp = Math.min(p.maxStats.hp, p.stats.hp + effect.value);
                        if (isCombat) {
                            game.audio.playSound('heal');
                            game.vfx.play('heal', document.getElementById('unit-display-player'));
                            game.ui.showCombatLogMessage(`${p.name} 恢復了 ${effect.value} 點生命。`, 'text-green-400');
                        }
                        break;
                    case 'heal_mp': 
                        p.stats.mp = Math.min(p.maxStats.mp, p.stats.mp + effect.value);
                         if (isCombat) game.ui.showCombatLogMessage(`${p.name} 恢復了 ${effect.value} 點法力。`, 'text-blue-400');
                        break;
                    case 'buff':
                        if (isCombat) {
                           game.combat.applyEffect(p, { ...effect });
                           game.ui.showCombatLogMessage(`${p.name} 的 ${LOCALIZATION_MAP.stats[effect.stat]} 提升了！`, 'text-yellow-400');
                        }
                        break;
                    case 'escape':
                        if (isCombat) game.combat.playerAction('run', true);
                        break;
                    case 'cure':
                        break;
                }
                effectApplied = true;
            } else {
                 return false;
            }
            if(effectApplied){
                itemStack.quantity--;
                if (itemStack.quantity <= 0) { p.inventory = p.inventory.filter(i => i.itemId !== itemId);
                }
                game.ui.updateHubUI();
            }
            return effectApplied;
        },
        equipItem(itemId) {
            const p = game.state.player;
            const itemData = DATABASE.items[itemId];
            if (!itemData || !['weapon', 'armor', 'accessory'].includes(itemData.type)) return;
            const canEquip = !itemData.class || itemData.class.includes(p.class);
            if (!canEquip) { game.ui.showModal({title: "無法裝備", body: "<p>你的職業無法使用此物品。</p>", buttons: [{text: '關閉', fn: () => game.ui.closeModal()}]}); return false;
            }
            const itemStack = p.inventory.find(i => i.itemId === itemId);
            if (!itemStack) return false;
            
            if (p.equipment[itemData.slot]) { this.unequipItem(itemData.slot); }
            p.equipment[itemData.slot] = itemId;
            itemStack.quantity--;
            if (itemStack.quantity <= 0) { p.inventory = p.inventory.filter(i => i.itemId !== itemId);
            }
            this.recalculateStats();
            game.audio.playSound('equip');
            game.quests.advance('equip', 'any');
            this.addCodexEntryForItem(itemId);
            game.ui.updateHubUI();
            return true;
        },
        unequipItem(slot) {
            const p = game.state.player;
            const itemId = p.equipment[slot];
            if (itemId) { 
                this.addItem(itemId, 1); 
                p.equipment[slot] = null; 
                this.recalculateStats();
                game.audio.playSound('equip');
            }
            game.ui.updateHubUI();
            return true;
        }
    },

    quests: {
        accept(questId) {
            const p = game.state.player;
            if (p.quests[questId]) return;
            
            const questData = DATABASE.quests[questId];
            if (p.level < questData.levelReq) {
                 game.ui.showModal({ title: '時機未到', body: `<p>你的等級不足以接受此任務。</p>`, buttons: [{ text: '好的', fn: () => game.ui.closeModal() }]});
                return;
            }
            
            p.quests[questId] = { ...questData.objective };
            if (questData.objective.type === 'level') {
                p.quests[questId].current = p.level;
            } else {
                 p.quests[questId].current = 0;
            }
             p.quests[questId].status = 'active';

            game.ui.updateHubUI();
            game.ui.showModal({ title: '新任務', body: `<p>你接受了任務: ${questData.title}</p>`, buttons: [{text: '好的', fn: () => game.ui.closeModal()}]});
        },
        advance(type, target) {
            const p = game.state.player;
            for (const questId in p.quests) {
                const quest = p.quests[questId];
                if (quest.status !== 'active') continue;

                if (quest.type === type && (quest.target === target || quest.target === 'any')) {
                    if (quest.type === 'level') {
                        quest.current = p.level;
                    } else {
                        if (quest.current < quest.total) {
                           quest.current++;
                        }
                    }
                   if (quest.current >= quest.total) {
                       quest.status = 'completed';
                       game.ui.showModal({ title: '任務目標達成！', body: `<p>你完成了任務目標: ${DATABASE.quests[questId].title}！回去找NPC回報吧。</p>`, buttons: [{text: '好的', fn: () => game.ui.closeModal()}]});
                   }
                   game.ui.updateHubUI();
               }
            }
        },
        isComplete(questId) {
            const questState = game.state.player.quests[questId];
            return questState && questState.status === 'completed';
        },
        giveReward(questId) {
            const p = game.state.player;
            const questData = DATABASE.quests[questId];
            if (!questData) return;
            let rewardHTML = '';
            if (questData.reward.exp) { 
                game.player.addExp(questData.reward.exp);
                rewardHTML += `<p>經驗值: ${questData.reward.exp}</p>`;
            }
            if (questData.reward.items) { 
                questData.reward.items.forEach(item => {
                    game.player.addItem(item.itemId, item.quantity); 
                    rewardHTML += `<p>${DATABASE.items[item.itemId].name} x${item.quantity}</p>`;
                });
            }
            if (questData.reward.gold) { 
                p.gold += questData.reward.gold;
                rewardHTML += `<p>金錢: ${questData.reward.gold}</p>`;
            }
            if (questData.reward.skillPoints) {
                p.skillPoints += questData.reward.skillPoints;
                rewardHTML += `<p>技能點: ${questData.reward.skillPoints}</p>`;
            }
            
            if (questData.onComplete) { questData.onComplete(p);
            }
            delete p.quests[questId];
            p.completedQuests.push(questId);
            game.ui.showModal({
                title: '任務完成！',
                body: `<p>你完成了任務 "${questData.title}"！</p><hr class="my-2 border-gray-600"><p>獲得獎勵：</p>${rewardHTML}`,
                buttons: [{ text: '好的', fn: () => { game.ui.closeModal(); game.ui.updateHubUI(); } }]
            });
        }
    },

    combat: {
        state: { enemies: [], defeatedEnemiesInCombat: [], turnOrder: [], turnIndex: 0, actionInProgress: false },
        
        startEncounter(locationId) {
            const location = DATABASE.locations[locationId];
            const playerLevel = game.state.player.level;
            const possibleMonsters = location.monsters.map(id => DATABASE.monsters[id]).filter(m => playerLevel >= m.level - 3 && playerLevel <= m.level + 5);
            if (possibleMonsters.length === 0) { game.ui.showModal({title: '空無一人', body: '<p>這片區域暫時沒有合適的敵人。</p>', buttons: [{text: '返回', fn: () => game.ui.closeModal()}]}); return;
            }

            const multiEncounterChance = 0.4 + (playerLevel * 0.02);
            let monsterCount = 1;
            if (Math.random() < multiEncounterChance) {
                monsterCount = Math.random() < 0.7 ? 2 : 3;
            }
            
            const activeKillQuest = Object.values(game.state.player.quests).find(q => q.status === 'active' && q.type === 'kill');
            const encounterGroup = [];
            for (let i = 0; i < monsterCount; i++) {
                 let selectedMonsterId;
                 if (activeKillQuest && location.monsters.includes(activeKillQuest.target) && Math.random() < 0.5) {
                     selectedMonsterId = activeKillQuest.target;
                 } else {
                     if (possibleMonsters.length > 0) {
                        selectedMonsterId = possibleMonsters[Math.floor(Math.random() * possibleMonsters.length)].id;
                     } else { // Fallback if filter is too strict
                        selectedMonsterId = location.monsters[Math.floor(Math.random() * location.monsters.length)];
                     }
                 }
                encounterGroup.push(selectedMonsterId);
            }

            if(encounterGroup.length === 0) { game.ui.showModal({title: '空無一人', body: '<p>這片區域暫時沒有敵人。</p>', buttons: [{text: '返回', fn: () => game.ui.closeModal()}]});
                return; }

            const firstMonster = DATABASE.monsters[encounterGroup[0]];
            game.ui.showModal({
                title: '遭遇敵人！', body: `<p>一群 ${firstMonster.name} 擋住了你的去路！</p>`,
                buttons: [{ text: '戰鬥！', fn: () => { 
                    game.ui.closeModal(); 
                    game.combat.start(encounterGroup);
                }}]
            });
        },

        start(enemyIds) {
            if (game.state.isRunning) return;
            game.state.isRunning = true;
            game.audio.playMusic('combat');

            game.state.player.isPlayer = true;
            this.state.enemies = enemyIds.map((id, index) => {
                const template = JSON.parse(JSON.stringify(DATABASE.monsters[id]));
                game.player.addCodexEntryForItem(id, 'monsters');
                return { ...template, stats: { ...template.stats }, maxStats: { ...template.stats }, id: `${id}-${index}`, progress: 0, isPlayer: false, activeEffects: [] };
            });
            
            game.state.player.activeEffects = [];
            this.state.defeatedEnemiesInCombat = [];
            this.state.actionInProgress = false;
            
            const playerUnit = { id: 'player', isPlayer: true, unit: game.state.player, progress: 0 };
            const enemyUnits = this.state.enemies.map(e => ({ id: e.id, isPlayer: false, unit: e, progress: 0 }));
            this.state.turnOrder = [playerUnit, ...enemyUnits];
            if (this.state.enemies.length > 0) {
                game.ui.state.playerTarget = this.state.enemies[0].id;
            }

            game.ui.showScreen('combat-screen');
            game.ui.renderCombatants();
            game.ui.showCombatLogMessage('戰鬥開始！', 'text-green-400');
            this.nextTurn();
        },
        
        nextTurn() {
            if (this.state.enemies.length === 0 || game.state.player.stats.hp <= 0) {
                this.end(this.state.enemies.length === 0);
                return;
            }
        
            let nextCombatant = null;
            while (!nextCombatant) {
                this.state.turnOrder.forEach(c => {
                    if (c.unit.stats.hp > 0) {
                        c.progress += c.unit.maxStats.speed;
                    }
                });
        
                this.state.turnOrder.sort((a, b) => b.progress - a.progress);
                if (this.state.turnOrder[0].progress >= 100) {
                    nextCombatant = this.state.turnOrder[0];
                    nextCombatant.progress -= 100;
                }
            }
        
            if (nextCombatant.isPlayer) {
                this.state.actionInProgress = false;
                this.toggleActionButtons(true);
                game.ui.showCombatLogMessage('你的回合。', 'text-cyan-400');
            } else {
                this.toggleActionButtons(false);
                setTimeout(() => this.enemyAction(nextCombatant.unit), 800);
            }
        },

        playerAction(action, option) {
            if (this.state.actionInProgress) return;
            this.state.actionInProgress = true;
            this.toggleActionButtons(false);

            let turnUsed = false;
            let target = this.state.enemies.find(e => e.id === game.ui.state.playerTarget);
            if (!target && this.state.enemies.length > 0) {
                game.ui.state.playerTarget = this.state.enemies[0].id;
                target = this.state.enemies[0];
            }
            
            switch(action) {
                case 'attack': 
                    if(target) { this.executeAttack(game.state.player, target);
                        turnUsed = true; } 
                    break;
                case 'skill':
                    if (this.executeSkill(game.state.player, option, target)) turnUsed = true;
                    break;
                case 'item':
                    if (game.player.useItem(option, true)) { 
                        turnUsed = true;
                    }
                    break;
                case 'run':
                    if (option === true) {
                        game.ui.showCombatLogMessage('你使用了煙霧彈，成功逃跑了！');
                        this.end(false, true); return;
                    }
                    const playerSpeed = game.state.player.maxStats.speed;
                    const avgEnemySpeed = this.state.enemies.reduce((sum, e) => sum + e.stats.speed, 0) / this.state.enemies.length;
                    const fleeChance = 0.5 + (playerSpeed - avgEnemySpeed) * 0.02;
                    if (Math.random() < fleeChance) { 
                        game.ui.showCombatLogMessage('你成功逃跑了！');
                        this.end(false, true); return;
                    } else { 
                        game.ui.showCombatLogMessage('逃跑失敗！');
                        turnUsed = true;
                    }
                    break;
            }

            if (!turnUsed) { 
                this.state.actionInProgress = false;
                this.toggleActionButtons(true); return; 
            }

            setTimeout(() => this.processTurnEnd(), 1000);
        },
        enemyAction(enemy) {
            game.ui.showCombatLogMessage(`${enemy.name} 的回合。`, 'text-yellow-400');
            const target = game.state.player;
            const usableSkills = enemy.skills.filter(id => {
                const skill = DATABASE.skills[id];
                if (!skill) return false;
                const cost = skill.levels ? skill.levels[0].mpCost : 0;
                return !cost || cost <= enemy.stats.mp;
            });
            if (usableSkills.length > 0 && Math.random() < 0.4) {
                const skillId = usableSkills[Math.floor(Math.random() * usableSkills.length)];
                this.executeSkill(enemy, skillId, target);
            } else {
                this.executeAttack(enemy, target);
            }
            setTimeout(() => this.processTurnEnd(), 1000);
        },
        processTurnEnd() {
            const allCombatants = [game.state.player, ...this.state.enemies];
            allCombatants.forEach(unit => {
                if (unit.stats.hp > 0 && unit.activeEffects.length > 0) {
                    unit.activeEffects.forEach(effect => {
                        if (effect.type === 'dot') {
                            const dotDamage = Math.max(1, effect.value);
                            unit.stats.hp = Math.max(0, unit.stats.hp - dotDamage);
                            game.ui.showCombatLogMessage(`${unit.name} 因 ${effect.name} 效果受到了 ${dotDamage} 點傷害。`, 'text-orange-400');
                        }
                        effect.turns--;
                    });
                    unit.activeEffects = unit.activeEffects.filter(effect => effect.turns > 0);
                    if (unit.isPlayer) game.player.recalculateStats();
                }
            });

            const defeatedThisTurn = this.state.enemies.filter(e => e.stats.hp <= 0 && !this.state.defeatedEnemiesInCombat.find(d => d.id === e.id));
            defeatedThisTurn.forEach(e => this.state.defeatedEnemiesInCombat.push(e));
            this.state.enemies = this.state.enemies.filter(e => e.stats.hp > 0);
            
            this.state.turnOrder = this.state.turnOrder.filter(c => c.unit.stats.hp > 0);
            if (this.state.enemies.length > 0) {
                if (!this.state.enemies.find(e => e.id === game.ui.state.playerTarget)) {
                    game.ui.state.playerTarget = this.state.enemies[0].id;
                }
            } else {
                game.ui.state.playerTarget = null;
            }
            
            game.ui.renderCombatants();
            if (this.state.enemies.length === 0 || game.state.player.stats.hp <= 0) { 
                this.end(this.state.enemies.length === 0);
            } else { 
                this.nextTurn();
            }
        },
        toggleActionButtons(enabled) { document.querySelectorAll('#combat-action-area button').forEach(btn => btn.disabled = !enabled);
        },
        executeAttack(attacker, defender, multiplier = 1.0, isSkill = false, isMagical = false) {
            const hitRate = 80 + (attacker.maxStats.hit * 1.5) - (defender.maxStats.eva * 1.0);
            const finalHitChance = Math.max(10, Math.min(95, hitRate));

            if (Math.random() * 100 > finalHitChance) {
                game.ui.showCombatLogMessage(`${attacker.name} 的攻擊被 ${defender.name} 閃避了！`, 'text-gray-400');
                return 0;
            }
            
            let damage;
            
            if (!isSkill) {
                if (attacker.class === 'necromancer') {
                    damage = Math.round(attacker.maxStats.atk * 0.2 + attacker.maxStats.spi * 0.7);
                    isMagical = true;
                } else if (attacker.class === 'monk') {
                    damage = Math.round(attacker.maxStats.atk * 0.5 + attacker.maxStats.spi * 0.6);
                    isMagical = true;
                }
            }

            if (damage === undefined) {
                const attackStat = isMagical ? attacker.maxStats.spi : attacker.maxStats.atk;
                const defenseStat = isMagical ? defender.maxStats.spi : defender.maxStats.def;
                damage = Math.round(attackStat * (attackStat / (attackStat + defenseStat)));
            }
            
            damage = Math.max(1, Math.round(damage * multiplier));
            return this.applyDamage(attacker, defender, damage, isMagical);
        },
        executeSkill(attacker, skillId, target) {
            const skillData = DATABASE.skills[skillId];
            if (!skillData) { return false; }
            
            const currentLevel = attacker.isPlayer ? (attacker.skills?.[skillId] || 1) : 1;
            const skillInfo = skillData.levels?.[currentLevel - 1] || skillData;
            const mpCost = skillInfo.mpCost || 0;
            const hpCostPercent = skillInfo.hpCost || 0;
            const hpCost = Math.round(attacker.maxStats.hp * hpCostPercent);

            if (attacker.stats.mp < mpCost || attacker.stats.hp <= hpCost) {
                if (attacker.isPlayer) game.ui.showCombatLogMessage('資源不足！', 'text-red-500');
                return false;
            }
            
            attacker.stats.mp -= mpCost;
            attacker.stats.hp -= hpCost;
            
            const attackerName = attacker.isPlayer ? attacker.name : attacker.name;
            game.ui.showCombatLogMessage(`${attackerName} 使用了 ${skillData.name}！`, 'text-yellow-400');

            let targets = [];
            if (skillData.targetType === 'single') {
                targets = target ? [target] : [];
            } else if (skillData.targetType === 'all') {
                targets = attacker.isPlayer ? [...this.state.enemies.filter(e => e.stats.hp > 0)] : [game.state.player];
                targets = targets.filter(t => t.isPlayer !== attacker.isPlayer);
            } else if (skillData.targetType === 'random') {
                const hits = skillInfo.hits || 1;
                const potentialTargets = attacker.isPlayer ? this.state.enemies.filter(e => e.stats.hp > 0) : [game.state.player];
                if (potentialTargets.length > 0) {
                    for (let i = 0; i < hits; i++) {
                        targets.push(potentialTargets[Math.floor(Math.random() * potentialTargets.length)]);
                    }
                }
            } else if (skillData.targetType === 'self') {
                targets = [attacker];
            }
            
            const isMagical = skillData.type.includes('magical');
            const effect = skillInfo.effect || skillData.effect;

            if (skillData.type.includes('physical') || skillData.type.includes('magical')) {
                const damageMultiplier = skillInfo.damageMultiplier ?? 1.0;
                targets.forEach(t => {
                    this.executeAttack(attacker, t, damageMultiplier, true, isMagical);
                    if (effect) this.applyEffect(t, { ...effect });
                });
            } else if (skillData.type === 'magical_drain') {
                const damageMultiplier = skillInfo.damageMultiplier ?? 1.0;
                const drainRatio = skillInfo.drainRatio ?? 0.5;
                targets.forEach(t => {
                    const damageDealt = this.executeAttack(attacker, t, damageMultiplier, true, true);
                    if (damageDealt > 0) {
                        const healAmount = Math.round(damageDealt * drainRatio);
                        attacker.stats.hp = Math.min(attacker.maxStats.hp, attacker.stats.hp + healAmount);
                        game.ui.showCombatLogMessage(`${attackerName} 吸取了 ${t.name} ${healAmount} 點生命。`, 'text-green-400');
                        game.vfx.play('heal', document.getElementById(`unit-display-${attacker.id || 'player'}`));
                    }
                });
            } else if (skillData.type === 'heal_attack') {
                const healAmount = Math.round(attacker.maxStats.spi * (skillInfo.healRatio || 0.5));
                attacker.stats.hp = Math.min(attacker.maxStats.hp, attacker.stats.hp + healAmount);
                game.ui.showCombatLogMessage(`${attackerName} 恢復了 ${healAmount} 點生命！`, 'text-green-400');
                game.vfx.play('heal', document.getElementById(`unit-display-${attacker.id || 'player'}`));
                const damage = Math.round(healAmount * (skillInfo.attackRatio || 0.5));
                const enemyTargets = attacker.isPlayer ? this.state.enemies.filter(e => e.stats.hp > 0) : [game.state.player];
                enemyTargets.forEach(t => this.applyDamage(attacker, t, damage, true));
            } else if (skillData.type === 'buff' || skillData.type === 'debuff') {
                targets.forEach(t => {
                    if (effect) this.applyEffect(t, { ...effect });
                });
                game.ui.showCombatLogMessage(`${targets.map(t => t.name).join(', ')}受到了 ${skillData.name} 的影響！`, 'text-yellow-400');
            }
            
            return true;
        },
        applyEffect(target, effect) {
            const existingEffectIndex = target.activeEffects.findIndex(e => e.id === effect.id);
            if (existingEffectIndex > -1) {
                target.activeEffects[existingEffectIndex] = effect;
            } else {
                target.activeEffects.push(effect);
            }
            if (target.isPlayer) {
                game.player.recalculateStats();
            }
        },
        applyDamage(attacker, defender, damage, isMagical) {
            if (isNaN(damage)) {
                console.error("NaN damage detected. Attacker:", attacker, "Defender:", defender);
                damage = 1;
            }
            const oldHp = defender.stats.hp;
            const isCrit = (attacker.maxStats.critRate || 0) > Math.random() * 100;
            if (isCrit) {
                damage = Math.round(damage * (attacker.maxStats.critDamage / 100));
            }

            defender.stats.hp = Math.max(0, defender.stats.hp - damage);
            const attackerName = attacker.isPlayer ? attacker.name : attacker.name;
            const defenderName = defender.isPlayer ? defender.name : defender.name;
            
            game.audio.playSound('hit');
            game.vfx.play('slash', document.getElementById(`unit-display-${defender.id || 'player'}`));
            
            if (isCrit) game.ui.showCombatLogMessage(`💥 暴擊！ ${attackerName} 對 ${defenderName} 造成了 ${damage} 點傷害。`, 'text-red-500 font-bold');
            else game.ui.showCombatLogMessage(`${attackerName} 對 ${defenderName} 造成了 ${damage} 點傷害。`, isMagical ? 'text-purple-400' : 'text-red-400');

            game.ui.updateUnitHP(defender, oldHp);
            if (defender.stats.hp <= 0) game.ui.showCombatLogMessage(`${defenderName} 被擊敗了！`, 'text-gray-400');
            return damage;
        },
        end(win, fled = false) {
            this.state.actionInProgress = false;
            this.toggleActionButtons(false); // [修復] 戰鬥結束後禁用按鈕
            game.state.isRunning = false;
            game.state.canRest = true;
            game.state.player.activeEffects = [];
            game.player.recalculateStats();

            game.audio.playMusic('hub');

            if (fled) { setTimeout(() => game.ui.showScreen('hub-screen'), 1500); return;
            }
            if (win) {
                game.audio.playSound('win');
                let totalExp = 0;
                let loot = {};
                
                this.state.defeatedEnemiesInCombat.forEach(enemy => {
                    const originalEnemy = DATABASE.monsters[enemy.id.split('-')[0]];
                    totalExp += originalEnemy.exp;
                    game.quests.advance('kill', originalEnemy.id);
                    
                    const dropTable = DATABASE.dropTables[originalEnemy.dropsId] || [];
                    dropTable.forEach(drop => {
                        if (drop.class && !drop.class.includes(game.state.player.class)) return;
                        if (Math.random() < drop.chance) {
                            const quantity = Math.floor(Math.random() * (drop.quantity[1] - drop.quantity[0] + 1)) + drop.quantity[0];
                            if(drop.isMoney) {
                                game.state.player.gold += quantity;
                                loot['gold'] = (loot['gold'] || 0) + quantity;
                            } else {
                                game.player.addItem(drop.itemId, quantity);
                                loot[drop.itemId] = (loot[drop.itemId] || 0) + quantity;
                                game.quests.advance('collect', drop.itemId);
                            }
                        }
                    });
                });

                if (this.state.defeatedEnemiesInCombat.length > 1) {
                    totalExp = Math.floor(totalExp * 1.5);
                }
                
                game.player.addExp(totalExp);
                let lootHTML = Object.keys(loot).map(itemId => {
                    if (itemId === 'gold') return `<p>金錢: ${loot[itemId]}</p>`;
                    return `<p>${DATABASE.items[itemId].name} x${loot[itemId]}</p>`;
                }).join('') || '<p>沒有獲得任何物品。</p>';

                game.ui.showModal({
                    title: '<span class="text-green-400">戰鬥勝利！</span>', body: `<p class="text-yellow-400">獲得經驗值: ${totalExp}</p><hr class="my-2 border-gray-600"> ${lootHTML}`,
                    buttons: [{ text: '繼續', fn: () => { game.ui.closeModal(); game.ui.showScreen('hub-screen'); } }]
                });
                
                setTimeout(() => {
                    if (game.state.currentScreen === 'combat-screen') {
                        game.ui.closeModal();
                        game.ui.showScreen('hub-screen');
                    }
                }, 4000);

            } else { 
                game.audio.playSound('lose');
                game.ui.showModal({ 
                    title: '你被擊敗了...', 
                    body: '<p>你的冒險到此為止。</p>', 
                    buttons: [
                        { text: '讀取存檔', fn: () => { game.ui.closeModal(); game.saveLoad.load(); } },
                        { text: '回到主選單', fn: () => window.location.reload(), class: 'bg-red-600 hover:bg-red-700 text-white' }
                    ]
                });
            }
        }
    },

    vfx: {
        play(effect, targetElement) {
            if (!targetElement) return;
            const rect = targetElement.getBoundingClientRect();
            const container = document.getElementById('vfx-container');
            const containerRect = container.getBoundingClientRect();
            const vfxEl = document.createElement('div');
            if (effect === 'slash') { vfxEl.className = 'vfx-slash'; } 
            else if (effect === 'heal') { vfxEl.className = 'vfx-heal';
            }
            
            vfxEl.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
            vfxEl.style.top = `${rect.top - containerRect.top + rect.height / 2}px`;
            
            container.appendChild(vfxEl);
            setTimeout(() => vfxEl.remove(), 1000);
        }
    },

    ui: {
        state: { playerTarget: null },
        showScreen(screenId) {
            document.querySelectorAll('.game-window > div:not(#modal-container)').forEach(div => div.classList.add('hidden'));
            document.getElementById(screenId)?.classList.remove('hidden');
            game.state.currentScreen = screenId;
            if (screenId === 'char-select-screen') this.renderCharSelect();
            if (screenId === 'hub-screen') { 
                document.getElementById('game-container').classList.add('bg-hub');
                document.getElementById('game-container').classList.remove('bg-combat');
                this.renderHub(); 
                game.audio.playMusic('hub');
            }
            if (screenId === 'shop-screen') { 
                this.renderShop();
            }
            if (screenId === 'combat-screen') {
                document.getElementById('game-container').classList.remove('bg-hub');
                document.getElementById('game-container').classList.add('bg-combat');
                game.audio.playMusic('combat');
            }
            if(screenId === 'start-screen'){
                game.audio.stopMusic();
            }
        },
        renderHub() {
            this.updateHubUI();
            const hubContent = document.getElementById('hub-main-content');
            
            let npcButtons = '';
            for(const npcId in DATABASE.npcs) {
                const npc = DATABASE.npcs[npcId];
                npcButtons += `<button data-npc-id="${npcId}" class="npc-talk-btn menu-button w-full py-3">與${npc.name}對話</button>`;
            }

            hubContent.innerHTML = `
                <h2 class="text-3xl md:text-4xl font-bold mb-4">橡木鎮</h2>
                <p class="text-gray-400 mb-8 text-center">${DATABASE.locations.oakwood.description}</p>
                <div class="grid grid-cols-1 gap-4 w-full max-w-sm">
                    ${npcButtons}
                    <button id="go-adventure-btn" class="menu-button w-full py-3">離開村莊</button>
                    <button id="rest-btn" class="menu-button w-full py-3">休息</button>
                    <button id="go-shop-btn" class="menu-button w-full py-3">進入商店</button>
                    <button id="show-codex-btn" class="menu-button w-full py-3">冒險圖冊</button>
                    <button id="save-btn" class="menu-button w-full py-3">儲存進度</button>
                    <button id="load-btn" class="menu-button w-full py-3">讀取進度</button>
                    <button id="return-to-start-btn" class="menu-button w-full py-3 bg-red-800/50 hover:bg-red-700/80">回到主選單</button>
                </div>
                <p id="gm-mode-btn" class="text-gray-600 text-xs mt-auto cursor-pointer">VER.1.5 (修正版)</p>
            `;
        },
        renderShop() {
            const container = document.getElementById('shop-items-container');
            container.innerHTML = '';
            DATABASE.shop.items.forEach(itemId => {
                const itemData = DATABASE.items[itemId];
                const itemCard = document.createElement('div');
                itemCard.className = `p-2 rounded-lg bg-black bg-opacity-20 flex flex-col justify-between items-center text-center text-sm ${itemData.rarity === 'epic' ? 'border-2 border-purple-500 shadow-lg shadow-purple-500/50' : 'border border-gray-600'}`;
                
                itemCard.innerHTML = `
                    <h3 class="font-bold">${itemData.name}</h3>
                    <p class="text-xs text-gray-400 mt-1">${itemData.description}</p>
                    <p class="text-yellow-400 font-bold mt-auto">${itemData.value} 金</p>
                    <button data-item-id="${itemId}" data-action="buy" class="menu-button mt-2 px-2 py-1">購買</button>
                `;
                container.appendChild(itemCard);
            });
        },
        showReturnToStartConfirmation() {
            this.showModal({
                title: '確定返回主選單？',
                body: '<p class="text-gray-400">所有未儲存的進度將會遺失。</p>',
                buttons: [
                    { text: '取消', fn: () => this.closeModal() },
                    { text: '確定', fn: () => { this.closeModal(); window.location.reload(); }, class: 'bg-red-600 hover:bg-red-700 text-white' }
                ]
            });
        },
        showWorldMap() {
            let locationsHTML = '';
            const storyIndex = Object.keys(DATABASE.storyline).indexOf(game.state.player.storyProgress);

            for (const locId in DATABASE.locations) {
                const loc = DATABASE.locations[locId];
                if (locId === 'oakwood') continue;
                
                const locStoryIndex = Object.keys(DATABASE.storyline).indexOf(loc.storyReq || 'main01');
                const isDisabled = storyIndex < locStoryIndex;
                const buttonClasses = `menu-button w-full text-left p-4 rounded-lg flex items-center justify-between ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;
                const levelText = isDisabled ? `<span class="text-sm text-red-400"> (故事未解鎖)</span>` : `<span class="text-sm text-gray-400">(Lv.${loc.levelRange[0]}+)</span>`;
                
                locationsHTML += `<button data-loc-id="${locId}" class="${buttonClasses}" ${isDisabled ? 'disabled' : ''}>
                    <div><h4 class="font-bold text-lg">${loc.name} ${levelText}</h4><p class="text-sm text-gray-400">${loc.description || ''}</p></div>
                </button>`;
            }
            this.showModal({
                title: '世界地圖', body: `<p>選擇你要前往的目的地。</p><div class="mt-4 space-y-2">${locationsHTML}</div>`,
                buttons: [{ text: '返回城鎮', fn: () => this.closeModal()}]
            });
            document.querySelectorAll('#modal-container button[data-loc-id]').forEach(btn => {
                btn.addEventListener('click', (e) => { 
                    const locId = e.currentTarget.dataset.locId;
                    this.closeModal();
                    setTimeout(() => game.combat.startEncounter(locId), 300);
                });
            });
        },
        showNPCDialogue(npcId) {
            const p = game.state.player;
            const npc = DATABASE.npcs[npcId];
            if (!npc) return;

            let dialogueKey = 'default';
            let buttons = [];

            const completableQuestId = Object.keys(p.quests).find(id => 
                DATABASE.quests[id].npc === npcId && p.quests[id].status === 'completed'
            );

            if (completableQuestId) {
                dialogueKey = 'questComplete';
                buttons.push({ text: "這是我的榮幸", fn: () => { game.quests.giveReward(completableQuestId); } });
            } else {
                const activeQuestId = Object.keys(p.quests).find(id => 
                    DATABASE.quests[id].npc === npcId && p.quests[id].status === 'active'
                );
                if (activeQuestId) {
                    dialogueKey = 'questInProgress';
                    buttons.push({ text: "我會盡快", fn: () => this.closeModal() });
                } else {
                    const nextQuestId = Object.keys(DATABASE.quests).find(id => 
                        DATABASE.quests[id].npc === npcId && 
                        !p.quests[id] && 
                        !p.completedQuests.includes(id) &&
                        p.storyProgress === id
                    );

                    if (nextQuestId) {
                        const questData = DATABASE.quests[nextQuestId];
                        if (p.level >= questData.levelReq) {
                            dialogueKey = 'start';
                            const targetName = DATABASE.monsters[questData.objective.target]?.name || '目標';
                            buttons.push({ text: "我該怎麼做？", fn: () => {
                                this.showModal({ 
                                    title: npc.name, 
                                    body: `<p>請你去擊敗 ${questData.objective.total} 隻 ${targetName}。</p>`, 
                                    buttons: [{ text: "交給我吧", fn: () => { game.quests.accept(nextQuestId); this.closeModal(); }}]
                                });
                            }});
                            buttons.push({text: "我再考慮一下", fn: () => this.closeModal()});
                        } else {
                            dialogueKey = 'levelTooLow';
                            buttons.push({text: "我明白了", fn: () => this.closeModal()});
                        }
                    } else {
                         dialogueKey = 'postQuest';
                         buttons.push({ text: "再會", fn: () => this.closeModal() });
                    }
                }
            }

            const dialogues = {
                elder: {
                    start: "年輕的旅人，歡迎來到橡木鎮。但恐怕這裡已不再安全...我們需要你的幫助。",
                    questInProgress: "調查有進展了嗎？森林裡很危險，千萬要小心。",
                    questComplete: "你回來了！真是太感謝你了！這點報酬請務必收下。",
                    postQuest: "多虧了你，鎮子周圍安全多了。但我們仍需找出這一切混亂的根源。",
                    levelTooLow: "你似乎還不夠強大，先在鎮子附近歷練一番，等準備好了再來吧。"
                },
                blacksmith: {
                    start: "嘿，年輕人！想打造點什麼嗎？哦？你是來完成任務的？",
                    questInProgress: "還沒裝備上像樣的東西嗎？快去背包裡找找！",
                    questComplete: "嗯，不錯，人要衣裝，佛要金裝，冒險者當然需要好裝備！這是給你的獎勵！",
                    postQuest: "隨時歡迎回來，我這裡總有好東西。",
                    levelTooLow: "你的等級還不夠，我沒什麼能教你的。"
                }
            };

            const defaultDialogue = {
                elder: dialogues.elder.postQuest,
                blacksmith: dialogues.blacksmith.postQuest,
            }

            const bodyText = dialogues[npcId]?.[dialogueKey] || defaultDialogue[npcId];
            this.showModal({ title: npc.name, body: `<p>${bodyText}</p>`, buttons });
        },
        showNameInputModal() {
            this.showModal({
                title: "為你的冒險者命名",
                body: `<input id="player-name-input" type="text" class="text-input w-full p-2 rounded" placeholder="輸入名字..." maxlength="12">`,
                buttons: [{text: "確定", fn: () => {
                    const name = document.getElementById('player-name-input').value.trim();
                    if (name) { this.closeModal(); game.startNewGame(name); }
                }}]
            });
        },
        showGMPasswordModal() {
            this.showModal({
                title: "GM 面板",
                body: `<input id="gm-password-input" type="password" class="text-input w-full p-2 rounded" placeholder="請輸入密碼...">`,
                buttons: [{ text: '確定', fn: () => {
                    if (document.getElementById('gm-password-input').value === '67712393') {
                        this.closeModal();
                        this.applyGM();
                    } else {
                        this.closeModal();
                    }
                }}]
            });
        },
        applyGM() {
            const p = game.state.player;
            if (!p) return;
            const levelTarget = 50;
            if (p.level >= levelTarget) {
                this.showModal({ title: 'GM指令', body: '<p>你已經達到或超過50級。</p>', buttons: [{ text: '好的', fn: () => this.closeModal() }] });
                return;
            }
            const levelsToGain = levelTarget - p.level;
            for (let i = 0; i < levelsToGain; i++) {
                game.player.levelUp();
            }
            p.level = levelTarget;
            game.player.recalculateStats();
            this.updateHubUI();
            this.showModal({ title: 'GM指令', body: `<p>你已成功提升至 ${levelTarget} 級！</p>`, buttons: [{ text: '好的', fn: () => this.closeModal() }] });
        },
        renderCharSelect() {
            const container = document.getElementById('char-cards-container');
            container.innerHTML = '';
            document.getElementById('confirm-char-btn').classList.add('hidden'); 

            for (const classId in DATABASE.classes) {
                const classData = DATABASE.classes[classId];
                const card = document.createElement('div');
                card.className = 'char-card p-4 rounded-lg slide-in cursor-pointer';
                card.dataset.class = classId;
                card.innerHTML = `
                    <div class="card-header">
                        <h3 class="text-2xl font-bold mb-2">${classData.icon}${classData.name}</h3>
                        <p class="text-gray-400 mb-2">${classData.description}</p>
                    </div>
                    <div class="stats-container mt-2">
                        <div class="text-sm font-mono grid grid-cols-2 gap-x-4 gap-y-1 pt-2 border-t border-gray-700">
                            <span>攻擊: ${classData.stats.atk}</span><span>防禦: ${classData.stats.def}</span>
                            <span>生命: ${classData.stats.hp}</span><span>靈力: ${classData.stats.spi}</span>
                            <span>速度: ${classData.stats.speed}</span><span>暴擊: ${classData.stats.critRate}%</span>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            }
        },
        showStoryScreen(classId) {
            const classData = DATABASE.classes[classId];
            document.getElementById('story-title').innerText = `啟程 - ${classData.name}`;
            document.getElementById('story-text').innerText = classData.story;
            this.showScreen('story-screen');
        },
        updateHubUI() {
            if (!game.state.player) return;
            game.player.recalculateStats();
            const p = game.state.player;
            const container = document.getElementById('player-and-quest-status-container');

            const classIcon = DATABASE.classes[p.class].icon;
            const expPercent = p.expToNext > 0 ? (p.exp / p.expToNext) * 100 : 0;
            const storyData = DATABASE.storyline[p.storyProgress] || {title: '旅程繼續', description: '繼續你的冒險吧！'};
            
            const storyKeys = Object.keys(DATABASE.storyline);
            const currentStoryIndex = storyKeys.indexOf(p.storyProgress);
            const storyProgressionHTML = storyKeys.map((key, index) => {
                const isCompleted = index < currentStoryIndex;
                const isActive = index === currentStoryIndex;
                let color = 'text-gray-600';
                if (isCompleted) color = 'text-blue-400';
                if (isActive) color = 'text-green-400';
                return `<span class="${color}">${index + 1}</span>`;
            }).join(' - ');
            
            let questHTML = '';
            for (const questId in p.quests) {
                const quest = p.quests[questId];
                const questData = DATABASE.quests[questId];
                let objectiveText = '';
                if (quest.status === 'active') {
                    if (quest.type === 'kill') {
                        const monsterName = DATABASE.monsters[quest.target]?.name || quest.target;
                        objectiveText = `擊敗 ${monsterName} (${quest.current}/${quest.total})`;
                    } else if (quest.type === 'equip') {
                        objectiveText = `裝備一件任意裝備 (${quest.current}/${quest.total})`;
                    } else if (quest.type === 'level') {
                        objectiveText = `提升等級 (${p.level}/${quest.total})`;
                    } else {
                        objectiveText = `${quest.target} (${quest.current}/${quest.total})`;
                    }
                    questHTML += `<div class="mt-2"><p class="font-bold text-green-400">${questData.title}</p><p class="text-sm text-gray-400">- ${objectiveText}</p></div>`;
                } else if (quest.status === 'completed') {
                    questHTML += `<div class="mt-2"><p class="font-bold text-yellow-400">${questData.title} (完成)</p><p class="text-sm text-gray-400">- 前往 ${DATABASE.npcs[questData.npc]?.name || ''} 回報</p></div>`;
                }
            }

            container.innerHTML = `
                <div class="scrollable-content">
                    <h3 class="text-xl font-bold mb-2">主線進度</h3>
                    <div class="text-lg font-bold text-center mb-4">${storyProgressionHTML}</div>
                    <div id="hub-story-progress" class="mb-6"><p class="font-bold">${storyData.title}</p><p class="text-sm text-gray-400">${storyData.description}</p></div>
                    
                    <h3 class="text-xl font-bold mb-4">玩家狀態</h3>
                    <div id="hub-player-stats">
                        <p class="text-xl font-bold flex items-center">${classIcon} ${p.name} <span class="text-base text-gray-400 ml-2">Lv.${p.level}</span></p>
                        <div class="mt-4 space-y-2 text-sm">
                            <p>生命: ${p.stats.hp}/${p.maxStats.hp}</p>
                            <div class="hp-bar-container h-2 bg-black/50"><div class="hp-bar-fill" style="width:${p.stats.hp/p.maxStats.hp*100}%"></div></div>
                            <p>法力: ${p.stats.mp}/${p.maxStats.mp}</p>
                            <div class="hp-bar-container h-2 bg-black/50"><div class="mp-bar-fill" style="width:${p.stats.mp > 0 ? (p.stats.mp/p.maxStats.mp*100) : 0}%"></div></div>
                            <p>經驗: ${p.exp}/${p.expToNext}</p>
                            <div class="hp-bar-container h-2 bg-black/50"><div class="exp-bar-fill" style="width:${expPercent}%"></div></div>
                            <hr class="border-gray-600 my-4">
                            <div class="grid grid-cols-2 gap-x-4 gap-y-1">
                                <span>${LOCALIZATION_MAP.stats.atk}: ${p.maxStats.atk}</span><span>${LOCALIZATION_MAP.stats.def}: ${p.maxStats.def}</span>
                                <span>${LOCALIZATION_MAP.stats.spi}: ${p.maxStats.spi}</span><span>${LOCALIZATION_MAP.stats.speed}: ${p.maxStats.speed}</span>
                                <span>${LOCALIZATION_MAP.stats.hit}: ${p.maxStats.hit}</span><span>${LOCALIZATION_MAP.stats.eva}: ${p.maxStats.eva}</span>
                                <span>${LOCALIZATION_MAP.stats.critRate}: ${p.maxStats.critRate}%</span><span>${LOCALIZATION_MAP.stats.critDamage}: ${p.maxStats.critDamage}%</span>
                            </div>
                            <p class="text-yellow-400 font-bold mt-2">金錢: ${p.gold}</p>
                            <div class="flex flex-wrap gap-2 mt-4">
                                <button id="assign-points-btn" class="menu-button text-sm px-2 py-1 ${p.attributePoints > 0 ? '' : 'opacity-50'}">屬性點(${p.attributePoints})</button>
                                <button id="skills-btn" class="menu-button text-sm px-2 py-1 ${p.skillPoints > 0 ? '' : 'opacity-50'}">技能(${p.skillPoints})</button>
                                <div class="relative"><button id="inventory-btn" class="menu-button text-sm px-2 py-1">道具</button></div>
                            </div>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mt-6 mb-4">任務日誌</h3>
                    <div id="hub-quest-log" class="overflow-y-auto">${questHTML || '<p class="text-gray-500">沒有進行中的任務。</p>'}</div>
                </div>`;
            
            document.getElementById('assign-points-btn')?.addEventListener('click', () => this.showAssignPointsModal());
            document.getElementById('inventory-btn')?.addEventListener('click', () => this.showInventoryModal(false));
            document.getElementById('skills-btn')?.addEventListener('click', () => this.showSkillTreeModal(false));
        },
        renderCombatants() {
            const player = game.state.player;
            const playerArea = document.getElementById('combat-player-area');
            playerArea.innerHTML = `
                <div id="unit-display-player" class="combat-unit p-2 rounded-lg bg-black bg-opacity-20 flex-grow w-full">
                    <p class="font-bold text-sm md:text-base flex items-center justify-center">${DATABASE.classes[player.class].icon}${player.name} <span class="text-xs text-gray-400 ml-1">Lv.${player.level}</span></p>
                    <div class="hp-bar-container mt-1 h-4 bg-black/50"><div id="hp-damage-player" class="hp-bar-damage"></div><div id="hp-fill-player" class="hp-bar-fill"></div></div>
                    <p class="text-xs text-center font-mono">${player.stats.hp}/${player.maxStats.hp}</p>
                    <div class="hp-bar-container mt-1 h-2 bg-black/50"><div class="mp-bar-fill" style="width: ${(player.maxStats.mp > 0 ? player.stats.mp/player.maxStats.mp*100 : 0)}%"></div></div>
                    <p class="text-xs text-center font-mono">${player.stats.mp}/${player.maxStats.mp}</p>
                </div>
                <div class="mt-2 p-2 rounded bg-black/50 text-xs text-center w-full">
                    <div class="grid grid-cols-2 gap-x-2 gap-y-1">
                        <span>${LOCALIZATION_MAP.stats.atk}: ${player.maxStats.atk}</span><span>${LOCALIZATION_MAP.stats.def}: ${player.maxStats.def}</span>
                        <span>${LOCALIZATION_MAP.stats.speed}: ${player.maxStats.speed}</span><span>${LOCALIZATION_MAP.stats.hit}: ${player.maxStats.hit}</span>
                        <span>${LOCALIZATION_MAP.stats.eva}: ${player.maxStats.eva}</span><span>${LOCALIZATION_MAP.stats.critRate}: ${player.maxStats.critRate}%</span>
                    </div>
                </div>
            `;
            this.updateUnitHP(player, player.stats.hp);
            
            const enemyArea = document.getElementById('combat-enemy-area'); enemyArea.innerHTML = '';
            game.combat.state.enemies.forEach(enemy => {
                const enemyDiv = document.createElement('div');
                enemyDiv.innerHTML = this.getUnitHTML(enemy);
                enemyDiv.querySelector('.combat-unit').addEventListener('click', () => {
                    if (!game.combat.state.actionInProgress) { 
                        game.ui.state.playerTarget = enemy.id; this.renderCombatants();
                    }
                });
                enemyArea.appendChild(enemyDiv);
            });
        },
        getUnitHTML(unit) {
            const hpPercent = unit.maxStats.hp > 0 ? (unit.stats.hp / unit.maxStats.hp) * 100 : 0;
            const targetedClass = this.state.playerTarget === unit.id ? 'targeted' : '';
            return `
                <div id="unit-display-${unit.id}" class="combat-unit p-2 rounded-lg ${targetedClass}">
                    <p class="font-bold text-sm md:text-base">${unit.name} <span class="text-xs text-gray-400 ml-1">Lv.${unit.level}</span></p>
                    <div class="hp-bar-container mt-1 h-4 bg-black/50">
                        <div id="hp-damage-${unit.id}" class="hp-bar-damage" style="width: ${hpPercent}%"></div>
                        <div id="hp-fill-${unit.id}" class="hp-bar-fill" style="width: ${hpPercent}%"></div>
                    </div>
                    <p class="text-xs text-center font-mono">${unit.stats.hp}/${unit.maxStats.hp}</p>
                </div>`;
        },
        updateUnitHP(unit, oldHp) {
            const id = unit.id || 'player';
            if(!unit.isPlayer) this.triggerHitEffect(`unit-display-${id}`);
            const oldPercent = (oldHp / unit.maxStats.hp) * 100;
            const newPercent = (unit.stats.hp / unit.maxStats.hp) * 100;
            const damageBar = document.getElementById(`hp-damage-${id}`);
            const fillBar = document.getElementById(`hp-fill-${id}`);
            if(damageBar) damageBar.style.width = `${oldPercent}%`;
            if(fillBar) fillBar.style.width = `${newPercent}%`;
            setTimeout(() => { if(damageBar) damageBar.style.width = `${newPercent}%`; }, 400);
        },
        showCombatLogMessage(message, colorClass = 'text-white') {
            const logBox = document.getElementById('combat-log-box');
            const p = document.createElement('p'); p.className = `${colorClass} slide-in`; p.innerHTML = `> ${message}`;
            logBox.prepend(p); if (logBox.children.length > 20) { logBox.lastChild.remove();
            }
        },
        showModal({ title, body, buttons }) {
            let buttonsHTML = buttons.map((btn, index) => `<button data-btn-index="${index}" class="menu-button px-6 py-2 rounded-lg ${btn.class || ''}">${btn.text}</button>`).join('');
            const contentHTML = `<h3 class="text-2xl font-bold mb-4">${title}</h3><div class="modal-body text-gray-300 modal-scrollable">${body}</div><div class="flex justify-end gap-4 mt-6">${buttonsHTML}</div>`;
            const container = document.getElementById('modal-container');
            container.innerHTML = `<div class="modal-backdrop fade-in"><div class="modal-content slide-in">${contentHTML}</div></div>`;
            container.classList.remove('hidden');
            container.querySelectorAll('button[data-btn-index]').forEach((button, index) => {
                button.addEventListener('click', () => buttons[index].fn());
            });
        },
        closeModal() { document.getElementById('modal-container').classList.add('hidden');
        },
        showAuthorModal() { this.showModal({ title: '作者', body: '<p>陳力航</p><p class="text-gray-400 mt-1">一位擁有大俠夢的人</p>', buttons: [{ text: '返回', fn: () => this.closeModal() }]});
        },
        showInventoryModal(isCombat) {
            if (isCombat) {
                const items = game.state.player.inventory.filter(i => DATABASE.items[i.itemId].type === 'consumable');
                let itemsHTML = items.map(itemStack => {
                    const itemData = DATABASE.items[itemStack.itemId];
                    return `<div class="flex justify-between items-center p-2 bg-black bg-opacity-20 rounded mb-2"><div><p class="font-bold">${itemData.name} x${itemStack.quantity}</p><p class="text-sm text-gray-400">${itemData.description}</p></div><button data-item-id="${itemStack.itemId}" class="menu-button px-4 py-1">使用</button></div>`;
                }).join('') || '<p class="text-gray-400">沒有可用的道具。</p>';
                this.showModal({ 
                    title: '選擇道具', body: `<div class="max-h-64 overflow-y-auto">${itemsHTML}</div>`, 
                    buttons: [{ text: '關閉', fn: () => this.closeModal() }]
                });
                document.querySelectorAll('#modal-container button[data-item-id]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.closeModal();
                        game.combat.playerAction('item', e.currentTarget.dataset.itemId);
                    });
                });
                return;
            }

            const p = game.state.player;
            p.inventory.forEach(i => i.seen = true);
            const render = (tab) => {
                let itemsHTML = '';
                if (tab === 'items') {
                     const items = p.inventory.filter(i => ['consumable', 'material', 'skillbook'].includes(DATABASE.items[i.itemId].type));
                     itemsHTML = items.map(itemStack => {
                         const itemData = DATABASE.items[itemStack.itemId];
                         const buttonHTML = ['consumable', 'skillbook'].includes(itemData.type) ? `<button data-action-type="use" data-item-id="${itemStack.itemId}" class="menu-button px-4 py-1">使用</button>` : '';
                         return `<div class="flex justify-between items-center p-2 bg-black bg-opacity-20 rounded mb-2"><div><p class="font-bold">${itemData.name} x${itemStack.quantity}</p><p class="text-sm text-gray-400">${itemData.description}</p></div>${buttonHTML}</div>`;
                     }).join('') || '<p class="text-gray-400">沒有道具。</p>';
                } else if (tab === 'equipment') {
                    const equipmentInBag = p.inventory.filter(i => ['weapon', 'armor', 'accessory'].includes(DATABASE.items[i.itemId].type));
                    itemsHTML = '';
                    for(const slot in p.equipment) {
                        const itemId = p.equipment[slot];
                        if(itemId) {
                            const itemData = DATABASE.items[itemId];
                            const statsHTML = itemData.stats ? `<p class="text-xs text-cyan-400">${Object.entries(itemData.stats).map(([s,v]) => `${LOCALIZATION_MAP.stats[s] || s.toUpperCase()}: ${v}`).join(', ')}</p>` : '';
                            itemsHTML += `<div class="flex justify-between items-center p-2 bg-green-900/30 rounded mb-2"><div><p class="font-bold text-green-400">[已裝備] ${itemData.name}</p>${statsHTML}</div><button data-action-type="unequip" data-slot="${slot}" class="menu-button px-4 py-1">拆除</button></div>`;
                        }
                    }
                    if (equipmentInBag.length > 0) itemsHTML += '<hr class="border-gray-600 my-4">';
                    itemsHTML += equipmentInBag.map(itemStack => {
                        const itemData = DATABASE.items[itemStack.itemId];
                        const statsHTML = itemData.stats ? `<p class="text-xs text-cyan-400">${Object.entries(itemData.stats).map(([s,v]) => `${LOCALIZATION_MAP.stats[s] || s.toUpperCase()}: ${v}`).join(', ')}</p>` : '';
                        return `<div class="flex justify-between items-center p-2 bg-black/20 rounded mb-2"><div><p class="font-bold">${itemData.name} x${itemStack.quantity}</p>${statsHTML}</div><button data-action-type="equip" data-item-id="${itemStack.itemId}" class="menu-button px-4 py-1">裝備</button></div>`;
                    }).join('');
                    if (itemsHTML === '') itemsHTML = '<p class="text-gray-400">沒有可裝備的物品。</p>';
                }
                this.showModal({ 
                    title: '道具背包', body: `<div class="flex border-b-2 border-gray-700 mb-4"><button data-tab="items" class="tab-button flex-1 py-2 ${tab === 'items' ? 'active' : ''}">道具</button><button data-tab="equipment" class="tab-button flex-1 py-2 ${tab === 'equipment' ? 'active' : ''}">裝備</button></div><div id="inventory-content" class="modal-scrollable">${itemsHTML}</div>`, 
                    buttons: [{ text: '關閉', fn: () => this.closeModal() }]
                });
                document.querySelectorAll('.tab-button').forEach(btn => btn.addEventListener('click', (e) => render(e.target.dataset.tab)));
                document.querySelectorAll('#inventory-content button').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const { actionType, itemId, slot } = e.currentTarget.dataset;
                        if (actionType === 'use' && game.player.useItem(itemId, false)) render(tab);
                        else if (actionType === 'equip' && game.player.equipItem(itemId)) render(tab);
                        else if (actionType === 'unequip' && game.player.unequipItem(slot)) render(tab);
                    });
                });
            };
            render('equipment');
        },
        showSkillTreeModal(isCombat) {
            const p = game.state.player;
            const classSkills = Object.entries(DATABASE.skills).filter(([id, data]) => data.class === p.class);
            const skillsHTML = classSkills.map(([skillId, skillData]) => {
                const currentLevel = p.skills[skillId] || 0;
                const isMaxLevel = currentLevel >= skillData.maxLevel;
                const levelText = currentLevel > 0 ? ` <span class="text-yellow-400">Lv.${currentLevel}${isMaxLevel ? ' (MAX)' : ''}</span>` : '';
                const skillInfo = skillData.levels[Math.min(currentLevel, skillData.maxLevel) - 1] || skillData.levels[0];
                const prerequisite = skillData.prerequisite;
                const preReqText = prerequisite ? ` (前置: ${DATABASE.skills[prerequisite.skillId].name} Lv.${prerequisite.level})` : '';
                const levelReqText = ` (需要等級: ${skillData.levelReq})`;
                const description = skillInfo.description + (prerequisite ? preReqText : '') + (currentLevel === 0 ? levelReqText : '');


                let buttonHTML = '';
                if (isCombat) {
                    if (currentLevel > 0) buttonHTML = `<button data-skill-id="${skillId}" class="menu-button px-4 py-1">使用</button>`;
                } else {
                    if (currentLevel === 0 && p.skillPoints > 0 && p.level >= skillData.levelReq && (!prerequisite || (p.skills[prerequisite.skillId] >= prerequisite.level))) {
                        buttonHTML = `<button data-action="learn" data-skill-id="${skillId}" class="menu-button px-4 py-1 bg-green-700">學習</button>`;
                    } else if (currentLevel > 0 && !isMaxLevel && p.skillPoints > 0) {
                        buttonHTML = `<button data-action="upgrade" data-skill-id="${skillId}" class="menu-button px-4 py-1">升級</button>`;
                    }
                }
                return `<div class="p-3 bg-black/20 rounded mb-2 ${p.level < skillData.levelReq ? 'opacity-50' : ''}"><div class="flex justify-between items-start"><div><p class="font-bold">${skillData.name}${levelText}</p><p class="text-sm text-gray-400">${description}</p></div><div class="flex-shrink-0 ml-2">${buttonHTML}</div></div></div>`;
            }).join('');
            
            this.showModal({ 
                title: isCombat ? '選擇技能' : '技能', 
                body: `<p class="mb-4 text-lg">剩餘技能點: <span class="font-bold text-yellow-400">${p.skillPoints}</span></p><div class="modal-scrollable">${skillsHTML}</div>`, 
                buttons: [{ text: '關閉', fn: () => this.closeModal() }] 
            });
            document.querySelectorAll('#modal-container button[data-skill-id]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const skillId = e.currentTarget.dataset.skillId;
                    const action = e.currentTarget.dataset.action;
                    if (isCombat) { this.closeModal(); game.combat.playerAction('skill', skillId); }
                    else if (action === 'learn') { p.skills[skillId] = 1; p.skillPoints--; this.showSkillTreeModal(false); }
                    else if (action === 'upgrade') { p.skills[skillId]++; p.skillPoints--; this.showSkillTreeModal(false); }
                });
            });
        },
        showAssignPointsModal() {
            const p = game.state.player;
            const stats = ['atk', 'def', 'spi', 'hit', 'eva', 'speed'];
            let tempPoints = p.attributePoints;
            let tempChanges = {};
            const render = () => {
                const statsHTML = stats.map(stat => `
                    <div class="flex justify-between items-center mb-2">
                        <span class="capitalize font-bold">${LOCALIZATION_MAP.stats[stat]}: ${p.baseStats[stat] + (tempChanges[stat] || 0)}</span>
                        <div>
                         <button data-stat="${stat}" data-change="-1" class="minus-stat-btn menu-button w-8 h-8 ${!tempChanges[stat] || tempChanges[stat] <= 0 ? 'opacity-50' : ''}">-</button>
                         <button data-stat="${stat}" data-change="1" class="plus-stat-btn menu-button w-8 h-8 ${tempPoints <= 0 ? 'opacity-50' : ''}">+</button>
                        </div>
                    </div>`).join('');
                this.showModal({
                    title: '分配屬性點',
                    body: `<p class="mb-4">剩餘點數: <span id="points-left">${tempPoints}</span></p>
                           <div class="mb-4"><label for="add-points-input">一次增加：</label><input type="number" id="add-points-input" class="text-input w-20 p-1 rounded" value="1" min="1"></div>
                           <div class="space-y-2">${statsHTML}</div>`,
                    buttons: [
                        { text: '取消', fn: () => { this.closeModal(); this.updateHubUI(); }},
                        { text: '確定', fn: () => { 
                            for (const stat in tempChanges) p.baseStats[stat] += tempChanges[stat];
                            p.attributePoints = tempPoints;
                            game.player.recalculateStats(); this.closeModal(); this.updateHubUI();
                        }}
                    ]
                });
                document.querySelectorAll('.plus-stat-btn, .minus-stat-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const stat = e.currentTarget.dataset.stat;
                        const changeDirection = parseInt(e.currentTarget.dataset.change);
                        const amount = parseInt(document.getElementById('add-points-input').value) || 1;
                        
                        if (changeDirection > 0 && tempPoints >= amount) {
                            tempPoints -= amount;
                            tempChanges[stat] = (tempChanges[stat] || 0) + amount;
                        } else if (changeDirection < 0 && (tempChanges[stat] || 0) >= amount) {
                            tempPoints += amount;
                            tempChanges[stat] -= amount;
                        }
                        render();
                    });
                });
            }
            render();
        },
        showCodexModal() {
            document.getElementById('codex-modal').classList.remove('hidden');
            const defaultTab = document.querySelector('.codex-tab-button[data-tab="monsters"]');
            document.querySelectorAll('.codex-tab-button').forEach(b => b.classList.remove('active'));
            if(defaultTab) defaultTab.classList.add('active');
            this.renderCodex('monsters');
        },
        renderCodex(tab) {
            const contentEl = document.getElementById('codex-content');
            const allEntries = DATABASE.codex[tab] || [];
            const knownEntries = game.state.codex[tab] || [];
            
            if (allEntries.length === 0) {
                contentEl.innerHTML = `<p class="text-center text-gray-400">目前沒有任何記錄。</p>`;
                return;
            }

            const contentHTML = allEntries.map(id => {
                const data = tab === 'monsters' ? DATABASE.monsters[id] : DATABASE.items[id];
                const found = knownEntries.includes(id);
                const title = found ? data.name : '???';
                const description = found ? (tab === 'monsters' ? `Lv.${data.level}` : data.description) : '尚未發現';
                return `<div class="p-2 rounded-lg bg-black/20 border border-gray-600 ${!found ? 'grayscale opacity-50' : ''}"><h4 class="font-bold">${title}</h4><p class="text-xs text-gray-400">${description}</p></div>`;
            }).join('');

            contentEl.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 gap-2">${contentHTML}</div>`;
        },
        closeCodexModal() {
            document.getElementById('codex-modal').classList.add('hidden');
        },
        triggerHitEffect(elementId) {
            const el = document.getElementById(elementId);
            if (el) { 
                el.classList.remove('hit-effect');
                void el.offsetWidth;
                el.classList.add('hit-effect');
            }
        }
    },

    saveLoad: {
        save() {
            if (!game.state.player) { 
                game.ui.showModal({ title: '存檔失敗', body: '<p>沒有遊戲進度可以儲存。</p>', buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }]});
                return; 
            }
            try {
                const saveState = JSON.parse(JSON.stringify(game.state));
                delete saveState.currentScreen;
                localStorage.setItem('勇闖天下-savegame', JSON.stringify(saveState));
                game.ui.showModal({ title: '<span class="text-green-400">儲存成功！</span>', body: '<p>你的進度已安全保存在此瀏覽器中。</p>', buttons: [{ text: '好的', fn: () => game.ui.closeModal() }]});
                document.getElementById('load-game-btn').disabled = false;
            } catch (e) { 
                console.error("Save failed:", e); 
                game.ui.showModal({ title: '<span class="text-red-500">存檔失敗</span>', body: `<p>發生未知錯誤，無法儲存進度。</p><p>${e.message}</p>`, buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }]});
            }
        },
        showLoadConfirmationModal() {
            game.ui.showModal({
                title: '確定讀取？', body: '<p class="text-gray-400">確定要讀取本機存檔嗎？目前的遊戲進度將會被覆蓋。</p>', 
                buttons: [{ text: '取消', fn: () => game.ui.closeModal() }, { text: '確定', fn: () => {game.ui.closeModal(); game.saveLoad.load();}, class: 'bg-red-600 hover:bg-red-700 text-white' }]
            });
        },
        load() {
            const savedData = localStorage.getItem('勇闖天下-savegame');
            if (!savedData) {
                game.ui.showModal({ title: '找不到存檔', body: '<p>此瀏覽器沒有找到你的遊戲存檔。</p>', buttons: [{ text: '返回', fn: () => game.ui.closeModal() }]});
                return;
            }
            try {
                const loadedState = JSON.parse(savedData);
                loadedState.isRunning = false;
                loadedState.currentScreen = 'hub-screen';
                if (!loadedState.player.completedQuests) {
                    loadedState.player.completedQuests = [];
                }
                game.state = loadedState;
                game.ui.showScreen('hub-screen');
            } catch(e) { 
                console.error("Load failed:", e);
                game.ui.showModal({ title: '<span class="text-red-500">讀取失敗</span>', body: `<p>存檔檔案已損毀，無法讀取。</p><p>${e.message}</p>`, buttons: [{ text: '關閉', fn: () => game.ui.closeModal() }]});
            }
        }
    },
    
    // [修改] 音效系統重構為 Tone.js
    audio: {
        isInitialized: false, sounds: {}, music: {},
        init() {
            document.body.addEventListener('click', async () => {
                if (!this.isInitialized) {
                    await Tone.start(); this.setup(); this.isInitialized = true; this.playMusic('hub');
                }
            }, { once: true });
        },
        setup() {
            this.sounds.click = new Tone.MembraneSynth({ pitchDecay: 0.01, octaves: 2, envelope: { attack: 0.001, decay: 0.1, sustain: 0 } }).toDestination();
            this.sounds.attack = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 } }).toDestination();
            this.sounds.hit = new Tone.MembraneSynth({ pitchDecay: 0.01, octaves: 2, envelope: { attack: 0.001, decay: 0.2, sustain: 0 } }).toDestination();
            this.sounds.skill = new Tone.PluckSynth({ attackNoise: 0.5, dampening: 4000, resonance: 0.7 }).toDestination();
            this.sounds.levelUp = new Tone.FatOscillator("Ab3", "sawtooth", 40).toDestination();
            this.sounds.heal = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.5 } }).toDestination();
            this.sounds.equip = new Tone.MetalSynth({ frequency: 150, envelope: { attack: 0.001, decay: 0.1, release: 0.01 }, harmonicity: 3.1, modulationIndex: 16, resonance: 4000, octaves: 0.5 }).toDestination();
            this.sounds.win = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.1, decay: 0.5, sustain: 0, release: 0.1 } }).toDestination();
            this.sounds.lose = new Tone.Synth({ oscillator: { type: 'fatsawtooth' }, envelope: { attack: 0.2, decay: 0.8, sustain: 0, release: 0.2 } }).toDestination();
            
            this.music = {};

            const hubSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'triangle' } }).toDestination();
            hubSynth.volume.value = -12;
            const hubMelody = ["G4", "B4", "D5", "B4", "C5", "A4", "G4", "A4", "E4", "G4", "C5", "G4", "F#4", "G4", "A4", "G4"];
            this.music.hub = new Tone.Sequence((time, note) => {
                if(note) hubSynth.triggerAttackRelease(note, "8n", time);
            }, hubMelody, "8n");

            const combatSynth = new Tone.MonoSynth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.01, decay: 0.3, release: 0.2 }, filterEnvelope: { attack: 0.01, decay: 0.1, sustain: 0, baseFrequency: 200, octaves: 3 } }).toDestination();
            combatSynth.volume.value = -10;
            this.music.combat = new Tone.Sequence((time, note) => {
                if(note) combatSynth.triggerAttackRelease(note, '8n', time);
            }, ['C3', null, 'C#3', 'D3', 'C3', null, 'C#3', 'D3', 'G2', null, 'G#2', 'A2', 'G2', null, 'G#2', 'A2'], '16n');
            
            Tone.Transport.bpm.value = 130;
        },
        playSound(sound) {
            if (!this.isInitialized) return;
            switch(sound) {
                case 'click': this.sounds.click.triggerAttackRelease('C2', '8n'); break;
                case 'attack': this.sounds.attack.triggerAttackRelease('C5', '8n'); break;
                case 'hit': this.sounds.hit.triggerAttackRelease('C3', '8n'); break;
                case 'skill': this.sounds.skill.triggerAttackRelease('G4', '8n'); break;
                case 'levelUp': this.sounds.levelUp.triggerAttackRelease('C4', '0.5'); break;
                case 'heal': this.sounds.heal.triggerAttackRelease('A4', '4n'); break;
                case 'equip': this.sounds.equip.triggerAttackRelease('C5', '32n'); break;
                case 'win':
                    this.sounds.win.triggerAttackRelease('C5', '8n', Tone.now());
                    this.sounds.win.triggerAttackRelease('E5', '8n', Tone.now() + 0.2);
                    this.sounds.win.triggerAttackRelease('G5', '4n', Tone.now() + 0.4);
                    break;
                case 'lose': this.sounds.lose.triggerAttackRelease('C3', '1'); break;
            }
        },
        playMusic(track) {
            if (!this.isInitialized) return;
            Tone.Transport.stop();
            Tone.Transport.cancel();
            
            if (this.music[track]) { 
                this.music[track].start(0);
                Tone.Transport.start();
            }
        },
        stopMusic() {
            if (!this.isInitialized) return;
            Tone.Transport.stop();
            Tone.Transport.cancel();
        }
    }
};

window.addEventListener('DOMContentLoaded', () => { game.init(); });