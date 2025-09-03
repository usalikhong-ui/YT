// database.js

export const LOCALIZATION_MAP = {
    stats: {
        hp: '生命', mp: '法力', atk: '攻擊', def: '防禦',
        spi: '靈力', hit: '命中', eva: '閃避',
        critRate: '暴擊率', critDamage: '暴傷', speed: '速度'
    },
    ui: {
        confirm: '確認', cancel: '取消', back: '返回',
        equipped: '已裝備', learn: '學習', upgrade: '升級'
    }
};

export const DATABASE = {
    classes: {
        swordsman: { name: "劍客", description: "戰場中的戰士，有優秀的防禦與物理攻擊能力。", stats: { hp: 90, mp: 35, atk: 16, def: 13, spi: 5, hit: 10, eva: 8, critRate: 5, critDamage: 150, speed: 10 }, story: "你是舊帝國破碎軍團的繼承者，背負著先祖失落的榮耀。", skills: { slash: 1 }, icon: `<svg class="class-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.71,6.29,17.71,2.29a1,1,0,0,0-1.42,0L3.29,15.29a1,1,0,0,0,0,1.42l4,4a1,1,0,0,0,1.42,0L21.71,7.71A1,1,0,0,0,21.71,6.29ZM6.41,18.83l-1-1L15.59,7.71l1,1ZM8,14H4V11a1,1,0,0,0-2,0v4a1,1,0,0,0,1,1H7a1,1,0,0,0,0-2Zm12.17-9.17-1,1L9.41,5.17l1-1,8.76,8.76Z"/></svg>` },
        monk: { name: "修士", description: "天生的靈力者，能夠巧妙使用魔法來攻擊或附魔。", stats: { hp: 70, mp: 85, atk: 9, def: 9, spi: 19, hit: 12, eva: 10, critRate: 5, critDamage: 150, speed: 12 }, story: "你來自一個古老的修道院，尋求修復世界創傷、對抗混沌顯化的方法。", skills: { spiritualPalm: 1 }, icon: `<svg class="class-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11,4a8,8,0,0,0-8,8,8,8,0,0,0,8,8,7.91,7.91,0,0,0,3.34-.73l.25,1.5a1,1,0,0,0,1,.87,1,1,0,0,0,1-.87l-.25-1.5A7.91,7.91,0,0,0,20,12a8,8,0,0,0-8-8Zm0,14a6,6,0,0,1-6-6,6,6,0,0,1,6-6,6,6,0,0,1,6,6,6,6,0,0,1-6,6Zm-3-6a3,3,0,1,1,3,3A3,3,0,0,1,8,12Zm3,1a1,1,0,1,0-1-1A1,1,0,0,0,11,13Z"/></svg>` },
        orc: { name: "獸人", description: "超級人類，有超越人類的姿態，但對魔法抵抗力較低。", stats: { hp: 130, mp: 25, atk: 19, def: 16, spi: 3, hit: 8, eva: 5, critRate: 5, critDamage: 150, speed: 8 }, story: "你生於文明邊緣的洪荒部落，決心用原始的力量對抗扭曲的現實。", skills: { savageCleave: 1 }, icon: `<svg class="class-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.89,14.28l-3.32,2.43a1,1,0,0,1-1.18,0L14,14.49V4.09a1,1,0,0,0-1-1,1,1,0,0,0-1,1v5.3L10.2,7.74a1,1,0,0,0-1.2,0L2,14.34V20a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V15.71A1,1,0,0,0,21.89,14.28ZM12.59,9.45,14,10.63v1.89l-1.41-1.04Zm-3,0,1.41,1.18v1.89L9.59,11.37ZM4,18.43v-3l4.79-3.52,1.21.9V18H4Zm7,0V13.7l.59.43.59-.43V18H11Zm7,0h-5V12.81l1.21-.9L19,15.43v3Z"/></svg>` },
        necromancer: { name: "死靈", description: "沒有實體，但對魔法有超高抵抗，能利用法術傷害敵人並汲取生命。", stats: { hp: 60, mp: 110, atk: 6, def: 6, spi: 26, hit: 11, eva: 15, critRate: 5, critDamage: 150, speed: 15 }, story: "世人誤解你為邪惡，但你只是個探求生命與死亡「迴響」的學者。", skills: { boneSpear: 1 }, icon: `<svg class="class-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,0,0,2,12a10,10,0,0,0,10,10,10,10,0,0,0,10-10A10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-8-8,8,8,0,0,1,8-8,8,8,0,0,1,8,8,8,8,0,0,1-8,8Zm-2.5-5.5A1.5,1.5,0,1,0,8,13,1.5,1.5,0,0,0,9.5,14.5Zm5,0A1.5,1.5,0,1,0,16,13,1.5,1.5,0,0,0,14.5,14.5ZM12,6a1,1,0,0,0-1,1v3.13a2,2,0,0,0,4,0V7a1,1,0,0,0-1-1H12Z"/></svg>` }
    },
    monsters: {
        // [修改] 平衡新手怪物強度與經驗值
        slime: { id: 'slime', name: "史萊姆", level: 1, stats: { hp: 25, mp: 0, atk: 8, def: 8, spi: 2, hit: 5, eva: 3, speed: 7, critRate: 0, critDamage: 100 }, exp: 20, dropsId: 'L001', skills: []},
        goblin: { id: 'goblin', name: "哥布林", level: 2, stats: { hp: 45, mp: 5, atk: 12, def: 10, spi: 5, hit: 7, eva: 8, speed: 12, critRate: 5, critDamage: 120 }, exp: 35, dropsId: 'L002', skills: ['goblinRush']},
        forestSpider: { id: 'forestSpider', name: '森林蜘蛛', level: 3, stats: { hp: 50, mp: 0, atk: 18, def: 8, spi: 0, hit: 10, eva: 12, speed: 18, critRate: 5, critDamage: 120 }, exp: 45, dropsId: 'L003', skills: ['poisonBite']},
        wildBoar: { id: 'wildBoar', name: "野豬", level: 3, stats: { hp: 100, mp: 0, atk: 22, def: 15, spi: 0, hit: 6, eva: 5, speed: 10, critRate: 5, critDamage: 130 }, exp: 50, dropsId: 'L004', skills: ['tuskGore']},
        wolf: { id: 'wolf', name: '野狼', level: 4, stats: { hp: 80, mp: 0, atk: 28, def: 12, spi: 3, hit: 12, eva: 15, speed: 20, critRate: 10, critDamage: 130 }, exp: 65, dropsId: 'L005', skills: ['furiousBite']},
        goblinWarrior: { id: 'goblinWarrior', name: '哥布林戰士', level: 5, stats: { hp: 120, mp: 10, atk: 30, def: 18, spi: 8, hit: 9, eva: 8, speed: 12, critRate: 8, critDamage: 130 }, exp: 75, dropsId: 'L006', skills: ['goblinRush']},
        orcGrunt: { id: 'orcGrunt', name: '獸人步兵', level: 6, stats: { hp: 160, mp: 0, atk: 38, def: 22, spi: 5, hit: 8, eva: 5, speed: 10, critRate: 5, critDamage: 140 }, exp: 95, dropsId: 'L007', skills: []},
        hobgoblin: { id: 'hobgoblin', name: '大哥布林', level: 7, stats: { hp: 200, mp: 20, atk: 42, def: 25, spi: 10, hit: 10, eva: 10, speed: 14, critRate: 10, critDamage: 140 }, exp: 120, dropsId: 'L008', skills: ['hobgoblinSmash']},
        orcShaman: { id: 'orcShaman', name: '獸人薩滿', level: 8, stats: { hp: 150, mp: 60, atk: 28, def: 18, spi: 35, hit: 12, eva: 12, speed: 15, critRate: 5, critDamage: 120 }, exp: 150, dropsId: 'L009', skills: ['shamanCurse', 'minorHeal']},
        skeleton: { id: 'skeleton', name: '骷髏兵', level: 8, stats: { hp: 220, mp: 0, atk: 48, def: 30, spi: 0, hit: 11, eva: 8, speed: 13, critRate: 5, critDamage: 120 }, exp: 170, dropsId: 'L010', skills: [] },
        wraith: { id: 'wraith', name: '怨靈', level: 9, stats: { hp: 180, mp: 80, atk: 38, def: 25, spi: 45, hit: 15, eva: 20, speed: 22, critRate: 5, critDamage: 120 }, exp: 210, dropsId: 'L011', skills: ['shadowBlast'] },
        direWolf: { id: 'direWolf', name: '恐狼', level: 10, stats: { hp: 250, mp: 0, atk: 58, def: 28, spi: 5, hit: 14, eva: 18, speed: 25, critRate: 15, critDamage: 140 }, exp: 240, dropsId: 'L012', skills: ['furiousBite'] },
        golem: { id: 'golem', name: '石巨人', level: 12, stats: { hp: 320, mp: 0, atk: 65, def: 50, spi: 0, hit: 10, eva: 2, speed: 8, critRate: 0, critDamage: 150 }, exp: 300, dropsId: 'L013', skills: ['earthSlam']},
        harpy: { id: 'harpy', name: '鷹身女妖', level: 13, stats: { hp: 240, mp: 40, atk: 55, def: 25, spi: 30, hit: 18, eva: 25, speed: 30, critRate: 10, critDamage: 130 }, exp: 350, dropsId: 'L014', skills: ['wingSlash']},
        ogre: { id: 'ogre', name: '食人魔', level: 15, stats: { hp: 450, mp: 0, atk: 80, def: 40, spi: 10, hit: 9, eva: 6, speed: 12, critRate: 10, critDamage: 160 }, exp: 420, dropsId: 'L015', skills: ['ogreClub']},
        lizardman: { id: 'lizardman', name: '蜥蜴人', level: 16, stats: { hp: 350, mp: 20, atk: 70, def: 35, spi: 20, hit: 15, eva: 15, speed: 20, critRate: 10, critDamage: 140 }, exp: 480, dropsId: 'L016', skills: []},
        manticore: { id: 'manticore', name: '獅蠍', level: 18, stats: { hp: 480, mp: 50, atk: 85, def: 40, spi: 30, hit: 16, eva: 20, speed: 28, critRate: 15, critDamage: 150 }, exp: 580, dropsId: 'L017', skills: ['poisonSting', 'wingSlash']},
        troll: { id: 'troll', name: '巨魔', level: 20, stats: { hp: 650, mp: 0, atk: 95, def: 50, spi: 5, hit: 12, eva: 10, speed: 15, critRate: 5, critDamage: 150 }, exp: 750, dropsId: 'L018', skills: ['trollRegen']},
        minotaur: { id: 'minotaur', name: '牛頭人', level: 22, stats: { hp: 750, mp: 30, atk: 115, def: 60, spi: 15, hit: 14, eva: 12, speed: 18, critRate: 10, critDamage: 170 }, exp: 900, dropsId: 'L019', skills: ['charge']},
        wyvern: { id: 'wyvern', name: '雙足飛龍', level: 25, stats: { hp: 850, mp: 100, atk: 125, def: 55, spi: 50, hit: 18, eva: 22, speed: 35, critRate: 10, critDamage: 150 }, exp: 1200, dropsId: 'L020', skills: ['fireBreath']},
        elemental: { id: 'elemental', name: '元素體', level: 26, stats: { hp: 550, mp: 200, atk: 85, def: 50, spi: 100, hit: 20, eva: 20, speed: 25, critRate: 5, critDamage: 150 }, exp: 1300, dropsId: 'L021', skills: ['elementalBlast']},
        basilisk: { id: 'basilisk', name: '石化蜥蜴', level: 28, stats: { hp: 700, mp: 80, atk: 105, def: 70, spi: 40, hit: 15, eva: 15, speed: 20, critRate: 5, critDamage: 150 }, exp: 1500, dropsId: 'L022', skills: ['petrifyingGaze']},
        chimera: { id: 'chimera', name: '奇美拉', level: 30, stats: { hp: 1100, mp: 150, atk: 135, def: 65, spi: 60, hit: 17, eva: 18, speed: 32, critRate: 15, critDamage: 160 }, exp: 1900, dropsId: 'L023', skills: ['fireBreath', 'poisonBite']},
        dullahan: { id: 'dullahan', name: '無頭騎士', level: 32, stats: { hp: 950, mp: 100, atk: 145, def: 80, spi: 50, hit: 22, eva: 20, speed: 38, critRate: 15, critDamage: 160 }, exp: 2300, dropsId: 'L024', skills: ['charge']},
        behemoth: { id: 'behemoth', name: '貝西摩斯', level: 35, stats: { hp: 1600, mp: 50, atk: 165, def: 100, spi: 20, hit: 15, eva: 10, speed: 20, critRate: 5, critDamage: 180 }, exp: 3200, dropsId: 'L025', skills: ['earthSlam']},
        roc: { id: 'roc', name: '大鵬鳥', level: 36, stats: { hp: 1300, mp: 120, atk: 145, def: 70, spi: 60, hit: 25, eva: 30, speed: 45, critRate: 10, critDamage: 150 }, exp: 3700, dropsId: 'L026', skills: ['wingSlash']},
        hydra: { id: 'hydra', name: '九頭蛇', level: 38, stats: { hp: 1900, mp: 200, atk: 155, def: 80, spi: 70, hit: 18, eva: 15, speed: 25, critRate: 10, critDamage: 160 }, exp: 4500, dropsId: 'L027', skills: ['multiBite', 'trollRegen']},
        lich: { id: 'lich', name: '巫妖', level: 40, stats: { hp: 1600, mp: 500, atk: 105, def: 90, spi: 180, hit: 20, eva: 25, speed: 30, critRate: 10, critDamage: 150 }, exp: 5300, dropsId: 'L028', skills: ['shadowBlast', 'lifeDrain']},
        ironGolem: { id: 'ironGolem', name: '鋼鐵魔像', level: 42, stats: { hp: 2600, mp: 0, atk: 185, def: 150, spi: 10, hit: 16, eva: 5, speed: 15, critRate: 0, critDamage: 180 }, exp: 6100, dropsId: 'L029', skills: ['earthSlam']},
        abyssWatcher: { id: 'abyssWatcher', name: '深淵監視者', level: 44, stats: { hp: 2100, mp: 200, atk: 205, def: 100, spi: 100, hit: 28, eva: 35, speed: 50, critRate: 20, critDamage: 170 }, exp: 7200, dropsId: 'L030', skills: ['charge']},
        cerberus: { id: 'cerberus', name: '地獄三頭犬', level: 45, stats: { hp: 2300, mp: 150, atk: 195, def: 90, spi: 80, hit: 24, eva: 28, speed: 42, critRate: 15, critDamage: 160 }, exp: 8000, dropsId: 'L031', skills: ['multiBite', 'fireBreath']},
        ancientDragon: { id: 'ancientDragon', name: '遠古巨龍', level: 50, stats: { hp: 5500, mp: 800, atk: 260, def: 180, spi: 150, hit: 30, eva: 20, speed: 40, critRate: 10, critDamage: 200 }, exp: 16000, dropsId: 'L032', skills: ['fireBreath', 'earthSlam']},
        hauntedArmor: { id: 'hauntedArmor', name: "被詛咒的盔甲", level: 11, stats: { hp: 280, mp: 0, atk: 55, def: 40, spi: 10, hit: 12, eva: 10, speed: 12, critRate: 5, critDamage: 120 }, exp: 260, dropsId: 'L010', skills: [] },
        gargoyle: { id: 'gargoyle', name: "石像鬼", level: 14, stats: { hp: 310, mp: 30, atk: 60, def: 60, spi: 20, hit: 13, eva: 15, speed: 25, critRate: 5, critDamage: 130 }, exp: 380, dropsId: 'L013', skills: [] },
        banshee: { id: 'banshee', name: "報喪女妖", level: 17, stats: { hp: 280, mp: 100, atk: 45, def: 30, spi: 70, hit: 18, eva: 22, speed: 28, critRate: 5, critDamage: 130 }, exp: 530, dropsId: 'L011', skills: ['shadowBlast'] },
        cockatrice: { id: 'cockatrice', name: "雞蛇", level: 19, stats: { hp: 380, mp: 50, atk: 75, def: 45, spi: 30, hit: 16, eva: 25, speed: 30, critRate: 10, critDamage: 140 }, exp: 660, dropsId: 'L022', skills: ['petrifyingGaze'] },
        zombie: { id: 'zombie', name: "殭屍", level: 5, stats: { hp: 180, mp: 0, atk: 32, def: 15, spi: 0, hit: 5, eva: 1, speed: 5, critRate: 0, critDamage: 100 }, exp: 85, dropsId: 'L010', skills: [] },
        giantBat: { id: 'giantBat', name: "巨型蝙蝠", level: 6, stats: { hp: 130, mp: 0, atk: 40, def: 15, spi: 5, hit: 15, eva: 20, speed: 28, critRate: 5, critDamage: 120 }, exp: 105, dropsId: 'L005', skills: [] },
        sandworm: { id: 'sandworm', name: "沙蟲", level: 21, stats: { hp: 700, mp: 0, atk: 100, def: 70, spi: 10, hit: 12, eva: 8, speed: 16, critRate: 5, critDamage: 150 }, exp: 820, dropsId: 'L013', skills: [] },
        griffin: { id: 'griffin', name: "獅鷲", level: 23, stats: { hp: 800, mp: 80, atk: 120, def: 60, spi: 40, hit: 20, eva: 25, speed: 40, critRate: 15, critDamage: 150 }, exp: 1000, dropsId: 'L014', skills: ['wingSlash'] },
        cyclops: { id: 'cyclops', name: "獨眼巨人", level: 27, stats: { hp: 1000, mp: 0, atk: 130, def: 75, spi: 10, hit: 13, eva: 10, speed: 19, critRate: 10, critDamage: 170 }, exp: 1400, dropsId: 'L015', skills: ['ogreClub'] },
        kraken: { id: 'kraken', name: "挪威海怪", level: 48, stats: { hp: 3800, mp: 300, atk: 230, def: 120, spi: 90, hit: 20, eva: 15, speed: 30, critRate: 10, critDamage: 180 }, exp: 11000, dropsId: 'L032', skills: ['ogreClub'] },
        deathKnight: { id: 'deathKnight', name: "死亡騎士", level: 46, stats: { hp: 2900, mp: 250, atk: 215, def: 140, spi: 110, hit: 26, eva: 22, speed: 40, critRate: 15, critDamage: 170 }, exp: 9000, dropsId: 'L030', skills: ['charge', 'lifeDrain'] },
        shadowStalker: { id: 'shadowStalker', name: "暗影潛行者", level: 33, stats: { hp: 1100, mp: 150, atk: 155, def: 80, spi: 80, hit: 30, eva: 40, speed: 55, critRate: 25, critDamage: 180 }, exp: 2700, dropsId: 'L024', skills: [] },
        treant: { id: 'treant', name: "樹人", level: 24, stats: { hp: 900, mp: 100, atk: 105, def: 90, spi: 50, hit: 14, eva: 5, speed: 10, critRate: 5, critDamage: 150 }, exp: 1100, dropsId: 'L004', skills: ['trollRegen'] },
        mimic: { id: 'mimic', name: "寶箱怪", level: 10, stats: { hp: 220, mp: 0, atk: 65, def: 30, spi: 20, hit: 20, eva: 10, speed: 15, critRate: 5, critDamage: 150 }, exp: 230, dropsId: 'L002', skills: [] },
        imp: { id: 'imp', name: "小惡魔", level: 7, stats: { hp: 120, mp: 50, atk: 30, def: 15, spi: 40, hit: 16, eva: 18, speed: 24, critRate: 5, critDamage: 120 }, exp: 135, dropsId: 'L009', skills: ['minorHeal'] },
        yeti: { id: 'yeti', name: "雪怪", level: 34, stats: { hp: 1400, mp: 60, atk: 160, def: 95, spi: 30, hit: 14, eva: 12, speed: 22, critRate: 10, critDamage: 170 }, exp: 3000, dropsId: 'L025', skills: ['ogreClub'] },
    },
    items: {
        healingEgg: { id: 'healingEgg', name: '補血蛋', type: 'consumable', effect: { type: 'heal_hp', value: 50 }, description: '恢復50點生命值。', value: 10, sellValue: 5, stock: 10 },
        manaTea: { id: 'manaTea', name: '魔力奶茶', type: 'consumable', effect: { type: 'heal_mp', value: 30 }, description: '恢復30點法力值。', value: 15, sellValue: 7, stock: 5 },
        stoneSkinPotion: { id: 'stoneSkinPotion', name: '石膚藥水', type: 'consumable', effect: { id: 'stoneSkin', name: '石膚', type: 'buff', stat: 'def', value: 10, turns: 3}, description: '3回合內提升防禦力(Def+10)。', value: 30, sellValue: 15, stock: 3, combatOnly: true},
        swiftnessPotion: { id: 'swiftnessPotion', name: '疾風藥劑', type: 'consumable', effect: { id: 'swiftness', name: '疾風', type: 'buff', stat: 'eva', value: 10, turns: 3}, description: '3回合內提升閃避(Eva+10)。', value: 30, sellValue: 15, stock: 3, combatOnly: true},
        giantsElixir: { id: 'giantsElixir', name: '巨力藥劑', type: 'consumable', effect: { id: 'giantsStrength', name: '巨力', type: 'buff', stat: 'atk', value: 10, turns: 3}, description: '3回合內提升攻擊力(Atk+10)。', value: 50, sellValue: 25, stock: 2, combatOnly: true},
        antidote: { id: 'antidote', name: '解毒劑', type: 'consumable', effect: { type: 'cure', ailment: 'poison'}, description: '解除中毒狀態。', value: 25, sellValue: 12, stock: 5},
        smokeBomb: { id: 'smokeBomb', name: '煙霧彈', type: 'consumable', effect: { type: 'escape'}, description: '保證從非頭目戰中逃脫。', value: 40, sellValue: 20, stock: 1, combatOnly: true},
        
        // --- 武器 (39) ---
        // 劍客
        smallSword: { id: 'smallSword', name: '小劍', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 3, hit: 2 }, description: '一把普通的單手劍。', value: 20 },
        fineLongsword: { id: 'fineLongsword', name: '精良的長劍', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 8, hit: 4 }, description: '由軍團工匠打造的長劍。', value: 80 },
        legionCommanderSword: { id: 'legionCommanderSword', name: '帝國軍團長劍', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 15, def: 5, hit: 6 }, description: '隊長的佩劍，象徵著榮耀。', value: 200, rarity: 'epic'},
        gladius: { id: 'gladius', name: '羅馬短劍', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 12, speed: 2 }, description: '輕巧而致命的短劍。', value: 150 },
        zweihander: { id: 'zweihander', name: '雙手巨劍', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 25, speed: -5, critDamage: 10 }, description: '需要雙手才能揮舞的巨大劍刃。', value: 350 },
        runicBlade: { id: 'runicBlade', name: '符文之刃', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 18, spi: 5, mp: 20 }, description: '刻有魔法符文的劍。', value: 500, rarity: 'epic' },
        flamberge: { id: 'flamberge', name: '焰形劍', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 22, critRate: 5 }, description: '波浪形的劍刃能造成可怕的傷口。', value: 650 },
        katana: { id: 'katana', name: '武士刀', type: 'weapon', slot: 'weapon', class: ['swordsman'], stats: { atk: 20, speed: 5, critRate: 3 }, description: '東方國度的神秘兵器。', value: 700 },
        // 修士
        monksGloves: { id: 'monksGloves', name: '修行者拳套', type: 'weapon', slot: 'weapon', class: ['monk'], stats: { atk: 2, spi: 4, hit: 3 }, description: '纏繞著信念的布手套。', value: 25 },
        acolyteBeads: { id: 'acolyteBeads', name: '見習修士的念珠', type: 'weapon', slot: 'weapon', class: ['monk'], stats: { spi: 8, mp: 15, hit: 5 }, description: '注入了禱文的木製念珠。', value: 90 },
        ironFist: { id: 'ironFist', name: '鐵拳套', type: 'weapon', slot: 'weapon', class: ['monk'], stats: { atk: 10, def: 5 }, description: '能輕易擊碎骨頭的鐵製拳套。', value: 180 },
        spiritChakram: { id: 'spiritChakram', name: '靈環', type: 'weapon', slot: 'weapon', class: ['monk'], stats: { spi: 15, speed: 5 }, description: '灌注了靈魂能量的環刃。', value: 400 },
        dragonClaws: { id: 'dragonClaws', name: '龍爪', type: 'weapon', slot: 'weapon', class: ['monk'], stats: { atk: 15, spi: 10, critRate: 5 }, description: '模仿龍爪製成的拳套。', value: 750, rarity: 'epic' },
        staffOfWisdom: { id: 'staffOfWisdom', name: '智慧之杖', type: 'weapon', slot: 'weapon', class: ['monk'], stats: { spi: 20, mp: 50 }, description: '據說能增強持有者的智慧。', value: 800 },
        // 獸人
        orcishAxe: { id: 'orcishAxe', name: '獸人手斧', type: 'weapon', slot: 'weapon', class: ['orc'], stats: { atk: 5, hit: 1 }, description: '粗製但致命的武器。', value: 30 },
        boneCrusher: { id: 'boneCrusher', name: '獸人碎骨棒', type: 'weapon', slot: 'weapon', class: ['orc'], stats: { atk: 12, hp: 20 }, description: '沾滿不知名生物體液的巨大棍棒。', value: 150 },
        greatAxe: { id: 'greatAxe', name: '巨斧', type: 'weapon', slot: 'weapon', class: ['orc'], stats: { atk: 28, def: -5 }, description: '犧牲防禦換取極致破壞力。', value: 450 },
        skullMasher: { id: 'skullMasher', name: '碎顱者', type: 'weapon', slot: 'weapon', class: ['orc'], stats: { atk: 20, critDamage: 20 }, description: '頂部鑲嵌著一顆巨大頭骨的釘頭錘。', value: 600 },
        berserkerClaws: { id: 'berserkerClaws', name: '狂戰士之爪', type: 'weapon', slot: 'weapon', class: ['orc'], stats: { atk: 18, speed: 8, eva: -5 }, description: '讓使用者陷入瘋狂的利爪。', value: 720, rarity: 'epic' },
        // 死靈
        boneWand: { id: 'boneWand', name: '骸骨魔棒', type: 'weapon', slot: 'weapon', class: ['necromancer'], stats: { spi: 6, hit: 4 }, description: '散發著微弱的靈魂能量。', value: 40 },
        specterWand: { id: 'specterWand', name: '怨靈法杖', type: 'weapon', slot: 'weapon', class: ['necromancer'], stats: { spi: 10, mp: 20, hit: 7 }, description: '頂端的水晶封印著一個不安的靈魂。', value: 120 },
        ritualDagger: { id: 'ritualDagger', name: '儀式匕首', type: 'weapon', slot: 'weapon', class: ['necromancer'], stats: { spi: 12, critRate: 3 }, description: '用於黑暗儀式的匕首。', value: 250 },
        lichStaff: { id: 'lichStaff', name: '巫妖之杖', type: 'weapon', slot: 'weapon', class: ['necromancer'], stats: { spi: 25, mp: 40 }, description: '蘊含著巫妖強大魔力的法杖。', value: 850, rarity: 'epic' },
        soulScythe: { id: 'soulScythe', name: '噬魂之鐮', type: 'weapon', slot: 'weapon', class: ['necromancer'], stats: { spi: 22, hp: -30 }, description: '能收割靈魂，但也會反噬持有者。', value: 900 },
        // 通用
        dagger: { id: 'dagger', name: '匕首', type: 'weapon', slot: 'weapon', stats: { atk: 8, speed: 5 }, description: '適合快速攻擊的武器。', value: 90 },
        shortBow: { id: 'shortBow', name: '短弓', type: 'weapon', slot: 'weapon', stats: { atk: 10, hit: 5 }, description: '遠程攻擊的入門武器。', value: 120 },
        ironSpear: { id: 'ironSpear', name: '鐵矛', type: 'weapon', slot: 'weapon', stats: { atk: 14, def: 3 }, description: '攻守兼備的長柄武器。', value: 220 },
        magicTome: { id: 'magicTome', name: '魔法書', type: 'weapon', slot: 'weapon', stats: { spi: 10, mp: 10 }, description: '記載著基礎魔法的書籍。', value: 200 },
        crystalBall: { id: 'crystalBall', name: '水晶球', type: 'weapon', slot: 'weapon', stats: { spi: 18, eva: 5 }, description: '能預見敵人動向的水晶球。', value: 550 },
        holyMace: { id: 'holyMace', name: '聖鎚', type: 'weapon', slot: 'weapon', stats: { atk: 15, spi: 10 }, description: '灌注了神聖力量的鎚子，對不死生物特效。', value: 680 },
        
        // --- 護甲 (36) ---
        // 護甲
        leatherArmor: { id: 'leatherArmor', name: '皮甲', type: 'armor', slot: 'armor', stats: { def: 5, eva: 2 }, description: '基本的皮革護甲。', value: 25 },
        chainmail: { id: 'chainmail', name: '鎖子甲', type: 'armor', slot: 'armor', stats: { def: 12 }, description: '能有效抵禦劈砍的金屬甲。', value: 100 },
        mageRobe: { id: 'mageRobe', name: '法師長袍', type: 'armor', slot: 'armor', stats: { def: 3, spi: 8 }, description: '繡有符文的布袍。', value: 70 },
        plateArmor: { id: 'plateArmor', name: '板甲', type: 'armor', slot: 'armor', stats: { def: 20, speed: -5 }, description: '提供絕佳防護的重型盔甲。', value: 300 },
        shadowCloak: { id: 'shadowCloak', name: '暗影斗篷', type: 'armor', slot: 'armor', stats: { def: 8, eva: 10 }, description: '能融入陰影的魔法斗篷。', value: 450, rarity: 'epic'},
        holyRobe: { id: 'holyRobe', name: '神聖長袍', type: 'armor', slot: 'armor', stats: { def: 7, spi: 15 }, description: '受到神明祝福的長袍。', value: 520 },
        barbarianFur: { id: 'barbarianFur', name: '野蠻人毛皮', type: 'armor', slot: 'armor', stats: { def: 10, hp: 30 }, description: '由巨獸毛皮製成的護甲。', value: 380 },
        assassinGarb: { id: 'assassinGarb', name: '刺客信條', type: 'armor', slot: 'armor', stats: { def: 10, speed: 5, critRate: 3 }, description: '適合潛行與突襲的輕甲。', value: 600 },
        // 配件
        courageBadge: { id: 'courageBadge', name: '勇氣徽章', type: 'accessory', slot: 'accessory', stats: { atk: 3 }, description: '一枚小小的徽章，能激發潛力。', value: 50 },
        guardianRing: { id: 'guardianRing', name: '守護者之戒', type: 'accessory', slot: 'accessory', stats: { def: 3 }, description: '鑲嵌著守護石的戒指。', value: 50 },
        eagleEyeRing: { id: 'eagleEyeRing', name: '鷹眼指環', type: 'accessory', slot: 'accessory', stats: { hit: 5 }, description: '能讓你看得更清楚。', value: 50 },
        swiftBoots: { id: 'swiftBoots', name: '疾行之靴', type: 'accessory', slot: 'accessory', stats: { speed: 8 }, description: '穿上後能健步如飛。', value: 120 },
        amuletOfPower: { id: 'amuletOfPower', name: '力量護符', type: 'accessory', slot: 'accessory', stats: { atk: 5, spi: 5 }, description: '同時增強物理與魔法力量。', value: 200 },
        ringOfVitality: { id: 'ringOfVitality', name: '活力戒指', type: 'accessory', slot: 'accessory', stats: { hp: 50 }, description: '能增強佩戴者的生命力。', value: 180 },
        criticalLens: { id: 'criticalLens', name: '暴擊透鏡', type: 'accessory', slot: 'accessory', stats: { critRate: 7 }, description: '能幫助你看穿敵人的弱點。', value: 300, rarity: 'epic' },
        amuletOfResistance: { id: 'amuletOfResistance', name: '抗性護符', type: 'accessory', slot: 'accessory', stats: { def: 4, spi: 4 }, description: '提升對物理與魔法的抗性。', value: 250 },
        
        // --- 技能書 (10) ---
        skillBookWhirlwind: { id: 'skillBookWhirlwind', name: '技能書:旋風斬', type: 'skillbook', skillId: 'whirlwind', class: ['swordsman'], description: '記載著旋風斬的卷軸。', value: 1000 },
        skillBookLifeBalance: { id: 'skillBookLifeBalance', name: '技能書:生死平衡', type: 'skillbook', skillId: 'lifeBalance', class: ['monk'], description: '闡述生死平衡之道的經文。', value: 1200 },
        skillBookFrenzy: { id: 'skillBookFrenzy', name: '技能書:狂暴', type: 'skillbook', skillId: 'frenzy', class: ['orc'], description: '能激發內心狂怒的圖騰。', value: 1100 },
        skillBookLifeDrain: { id: 'skillBookLifeDrain', name: '技能書:生命汲取', type: 'skillbook', skillId: 'lifeDrain', class: ['necromancer'], description: '記載著禁忌吸血魔法的書頁。', value: 1500 },
        skillBookBladeStorm: { id: 'skillBookBladeStorm', name: '秘傳書:劍刃風暴', type: 'skillbook', skillId: 'bladeStorm', class: ['swordsman'], levelReq: 20, description: '劍聖的終極奧義。', value: 5000, rarity: 'epic' },
        skillBookEnlightenment: { id: 'skillBookEnlightenment', name: '佛經:頓悟', type: 'skillbook', skillId: 'enlightenment', class: ['monk'], levelReq: 25, description: '蘊含著天地至理的古老經文。', value: 8000, rarity: 'epic' },
        skillBookRampage: { id: 'skillBookRampage', name: '圖騰:暴走', type: 'skillbook', skillId: 'rampage', class: ['orc'], levelReq: 22, description: '繪有遠古巨獸的狂暴圖騰。', value: 6500, rarity: 'epic' },
        skillBookDeathPact: { id: 'skillBookDeathPact', name: '魔典:死亡契約', type: 'skillbook', skillId: 'deathPact', class: ['necromancer'], levelReq: 24, description: '與死亡簽訂契約的禁忌之書。', value: 7500, rarity: 'epic' },
        skillBookTaunt: { id: 'skillBookTaunt', name: '戰吼之書:嘲諷', type: 'skillbook', skillId: 'taunt', class: ['orc'], description: '教你如何用言語激怒敵人。', value: 800 },
        skillBookCurse: { id: 'skillBookCurse', name: '詛咒之書', type: 'skillbook', skillId: 'curse', class: ['necromancer'], description: '一本充滿惡毒詛咒的書。', value: 1300 },
        
        // --- 材料 ---
        brokenFabric: { id: 'brokenFabric', name: '破損的布料', type: 'material', description: '從敵人身上剝下的破布。', value: 2 },
        legionBadge: { id: 'legionBadge', name: '軍團徽章', type: 'material', description: '第五軍團的徽章。', value: 5 },
    },
    dropTables: {
        L001: [ { itemId: 'brokenFabric', chance: 0.5, quantity: [1, 2] }, { itemId: 'healingEgg', chance: 0.3, quantity: [1, 1] }, { itemId: 'gold', chance: 1, quantity: [5, 10], isMoney: true }],
        L002: [ { itemId: 'brokenFabric', chance: 0.6, quantity: [1, 3] }, { itemId: 'smallSword', chance: 0.1, quantity: [1, 1], class: ['swordsman'] }, { itemId: 'monksGloves', chance: 0.1, quantity: [1, 1], class: ['monk']}, { itemId: 'gold', chance: 1, quantity: [12, 22], isMoney: true }],
        L003: [ { itemId: 'brokenFabric', chance: 0.7, quantity: [1, 2] }, { itemId: 'healingEgg', chance: 0.3, quantity: [1, 1] }, { itemId: 'swiftnessPotion', chance: 0.1, quantity: [1, 1]}, { itemId: 'gold', chance: 1, quantity: [10, 18], isMoney: true }],
        L004: [ { itemId: 'orcishAxe', chance: 0.1, quantity: [1,1], class: ['orc'] }, { itemId: 'leatherArmor', chance: 0.05, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [15, 25], isMoney: true }],
        L005: [ { itemId: 'healingEgg', chance: 0.4, quantity: [1,2]}, { itemId: 'courageBadge', chance: 0.05, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [18, 30], isMoney: true }],
        L006: [ { itemId: 'fineLongsword', chance: 0.1, quantity: [1, 1], class: ['swordsman']}, { itemId: 'orcishAxe', chance: 0.1, quantity: [1, 1], class: ['orc']}, { itemId: 'leatherArmor', chance: 0.15, quantity: [1, 1]}, { itemId: 'gold', chance: 1, quantity: [20, 35], isMoney: true }],
        L007: [ { itemId: 'fineLongsword', chance: 0.2, quantity: [1, 1], class: ['swordsman']}, { itemId: 'orcishAxe', chance: 0.2, quantity: [1, 1], class: ['orc']}, { itemId: 'chainmail', chance: 0.1, quantity: [1, 1]}, { itemId: 'giantsElixir', chance: 0.05, quantity: [1, 1]}, { itemId: 'gold', chance: 1, quantity: [25, 40], isMoney: true }],
        L008: [ { itemId: 'legionBadge', chance: 0.5, quantity: [1,1]}, { itemId: 'fineLongsword', chance: 0.15, quantity: [1, 1], class: ['swordsman']}, { itemId: 'acolyteBeads', chance: 0.1, quantity: [1, 1], class: ['monk']}, { itemId: 'gold', chance: 1, quantity: [30, 50], isMoney: true }],
        L009: [ { itemId: 'mageRobe', chance: 0.15, quantity: [1, 1]}, { itemId: 'acolyteBeads', chance: 0.1, quantity: [1, 1], class: ['monk']}, { itemId: 'boneWand', chance: 0.1, quantity: [1, 1], class: ['necromancer']}, { itemId: 'manaTea', chance: 0.3, quantity: [1, 2]}, { itemId: 'gold', chance: 1, quantity: [35, 60], isMoney: true}],
        L010: [ { itemId: 'brokenFabric', chance: 0.5, quantity: [1, 3] }, { itemId: 'boneWand', chance: 0.1, quantity: [1, 1], class: ['necromancer']}, { itemId: 'chainmail', chance: 0.1, quantity: [1, 1]}, { itemId: 'gold', chance: 1, quantity: [40, 70], isMoney: true}],
        L011: [ { itemId: 'manaTea', chance: 0.5, quantity: [1, 2] }, { itemId: 'specterWand', chance: 0.1, quantity: [1, 1], class: ['necromancer']}, { itemId: 'mageRobe', chance: 0.1, quantity: [1, 1]}, { itemId: 'gold', chance: 1, quantity: [50, 80], isMoney: true}],
        L012: [ { itemId: 'orcishAxe', chance: 0.2, quantity: [1, 1], class: ['orc']}, { itemId: 'fineLongsword', chance: 0.2, quantity: [1, 1], class: ['swordsman']}, { itemId: 'courageBadge', chance: 0.1, quantity: [1, 1]}, { itemId: 'gold', chance: 1, quantity: [60, 100], isMoney: true}],
        L013: [{ itemId: 'guardianRing', chance: 0.1, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [100, 150], isMoney: true}],
        L014: [{ itemId: 'swiftBoots', chance: 0.1, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [120, 180], isMoney: true}],
        L015: [{ itemId: 'giantsElixir', chance: 0.2, quantity: [1,1]}, { itemId: 'plateArmor', chance: 0.05, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [150, 220], isMoney: true}],
        L016: [{ itemId: 'amuletOfResistance', chance: 0.1, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [180, 250], isMoney: true}],
        L017: [{ itemId: 'ritualDagger', chance: 0.08, quantity: [1,1], class: ['necromancer']}, { itemId: 'assassinGarb', chance: 0.05, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [220, 300], isMoney: true}],
        L018: [{ itemId: 'ringOfVitality', chance: 0.15, quantity: [1,1]}, { itemId: 'skillBookTaunt', chance: 0.02, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [280, 400], isMoney: true}],
        L019: [{ itemId: 'greatAxe', chance: 0.1, quantity: [1,1], class: ['orc']}, { itemId: 'plateArmor', chance: 0.1, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [350, 500], isMoney: true}],
        L020: [{ itemId: 'flamberge', chance: 0.07, quantity: [1,1], class: ['swordsman']}, { itemId: 'holyRobe', chance: 0.07, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [450, 600], isMoney: true}],
        L021: [{ itemId: 'magicTome', chance: 0.1, quantity: [1,1]}, { itemId: 'amuletOfPower', chance: 0.1, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [500, 700], isMoney: true}],
        L022: [{ itemId: 'stoneSkinPotion', chance: 0.3, quantity: [1,2]}, { itemId: 'guardianRing', chance: 0.1, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [550, 750], isMoney: true}],
        L023: [{ itemId: 'criticalLens', chance: 0.05, quantity: [1,1]}, { itemId: 'skillBookCurse', chance: 0.03, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [650, 900], isMoney: true}],
        L024: [{ itemId: 'katana', chance: 0.08, quantity: [1,1], class: ['swordsman']}, { itemId: 'shadowCloak', chance: 0.08, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [800, 1100], isMoney: true}],
        L025: [{ itemId: 'berserkerClaws', chance: 0.07, quantity: [1,1], class: ['orc']}, { itemId: 'skillBookRampage', chance: 0.02, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [1000, 1500], isMoney: true}],
        L026: [{ itemId: 'spiritChakram', chance: 0.08, quantity: [1,1], class: ['monk']}, { itemId: 'swiftBoots', chance: 0.15, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [1200, 1800], isMoney: true}],
        L027: [{ itemId: 'dragonClaws', chance: 0.06, quantity: [1,1], class: ['monk']}, { itemId: 'ringOfVitality', chance: 0.2, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [1500, 2200], isMoney: true}],
        L028: [{ itemId: 'lichStaff', chance: 0.05, quantity: [1,1], class: ['necromancer']}, { itemId: 'skillBookDeathPact', chance: 0.01, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [1800, 2800], isMoney: true}],
        L029: [{ itemId: 'zweihander', chance: 0.07, quantity: [1,1], class: ['swordsman']}, { itemId: 'plateArmor', chance: 0.15, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [2200, 3200], isMoney: true}],
        L030: [{ itemId: 'runicBlade', chance: 0.06, quantity: [1,1], class: ['swordsman']}, { itemId: 'skillBookBladeStorm', chance: 0.01, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [2800, 4000], isMoney: true}],
        L031: [{ itemId: 'soulScythe', chance: 0.05, quantity: [1,1], class: ['necromancer']}, { itemId: 'holyMace', chance: 0.08, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [3500, 5000], isMoney: true}],
        L032: [{ itemId: 'staffOfWisdom', chance: 0.05, quantity: [1,1], class: ['monk']}, { itemId: 'skillBookEnlightenment', chance: 0.01, quantity: [1,1]}, { itemId: 'gold', chance: 1, quantity: [10000, 20000], isMoney: true}],
    },
    skills: {
        // [修正] 優化技能說明，增加目標類型標示
        // --- 劍客 (10) ---
        slash: { name: '斬擊', class:'swordsman', type: 'physical', targetType: 'single', maxLevel: 5, levelReq: 1, levels: [
            { mpCost: 5, damageMultiplier: 1.5, description: '[單體] 對單一敵人造成<span class="text-yellow-400">150%</span>攻擊力的物理傷害。' },
            { mpCost: 6, damageMultiplier: 1.7, description: '[單體] 對單一敵人造成<span class="text-yellow-400">170%</span>攻擊力的物理傷害。' },
            { mpCost: 7, damageMultiplier: 1.9, description: '[單體] 對單一敵人造成<span class="text-yellow-400">190%</span>攻擊力的物理傷害。' },
            { mpCost: 8, damageMultiplier: 2.1, description: '[單體] 對單一敵人造成<span class="text-yellow-400">210%</span>攻擊力的物理傷害。' },
            { mpCost: 9, damageMultiplier: 2.3, description: '[單體] 對單一敵人造成<span class="text-yellow-400">230%</span>攻擊力的物理傷害。' },
        ]},
        whirlwind: { name: '旋風斬', class:'swordsman', type: 'physical', targetType: 'all', maxLevel: 3, levelReq: 3, prerequisite: { skillId: 'slash', level: 2 }, levels: [
            { mpCost: 15, damageMultiplier: 1.1, description: '[範圍] 揮舞武器，對所有敵人造成<span class="text-yellow-400">110%</span>攻擊力的物理傷害。' },
            { mpCost: 17, damageMultiplier: 1.2, description: '[範圍] 更強力的旋風斬，對所有敵人造成<span class="text-yellow-400">120%</span>攻擊力的物理傷害。' },
            { mpCost: 19, damageMultiplier: 1.3, description: '[範圍] 毀滅性的旋風斬，對所有敵人造成<span class="text-yellow-400">130%</span>攻擊力的物理傷害。' },
        ]},
        powerStrike: { name: '強力打擊', class:'swordsman', type: 'physical', targetType: 'single', maxLevel: 2, levelReq: 5, prerequisite: { skillId: 'slash', level: 3 }, levels: [
            { mpCost: 10, damageMultiplier: 2.2, description: '[單體] 蓄力一擊，造成<span class="text-yellow-400">220%</span>攻擊力的巨大傷害。' },
            { mpCost: 12, damageMultiplier: 2.5, description: '[單體] 全力蓄力，造成<span class="text-yellow-400">250%</span>攻擊力的毀滅性傷害。' },
        ]},
        shieldBash: { name: '盾牌猛擊', class:'swordsman', type: 'physical', targetType: 'single', maxLevel: 1, levelReq: 8, prerequisite: { skillId: 'whirlwind', level: 2 }, levels: [
            { mpCost: 12, damageMultiplier: 1.2, description: '[單體] 用盾牌猛擊敵人，造成<span class="text-yellow-400">120%</span>攻擊力的物理傷害，並有機率使其<span class="text-orange-400">昏迷</span>。' },
        ]},
        charge: { name: '衝鋒', class:'swordsman', type: 'physical', targetType: 'single', maxLevel: 1, levelReq: 12, prerequisite: { skillId: 'powerStrike', level: 2 }, levels: [
            { mpCost: 15, damageMultiplier: 1.8, description: '[單體] 向目標衝鋒，造成<span class="text-yellow-400">180%</span>攻擊力的物理傷害，並<span class="text-orange-400">延後其行動</span>。' },
        ]},
        defensiveStance: { name: '防禦姿態', class:'swordsman', type: 'buff', targetType: 'self', maxLevel: 1, levelReq: 6, levels: [{ mpCost: 10, effect: { id: 'defensiveStance', name: '防禦姿態', stat: 'def', value: 20, turns: 3}, description: '[增益] 進入防禦姿態，提升<span class="text-green-400">20</span>點防禦力，持續3回合。'}] },
        battleCry: { name: '戰吼', class:'swordsman', type: 'buff', targetType: 'self', maxLevel: 1, levelReq: 10, levels: [{ mpCost: 18, effect: { id: 'battleCry', name: '戰吼', stat: 'atk', value: 15, turns: 3}, description: '[增益] 發出怒吼，提升<span class="text-green-400">15</span>點攻擊力，持續3回合。'}] },
        ironWill: { name: '鋼鐵意志', class:'swordsman', type: 'passive', levelReq: 15, levels: [{ description: '[被動] 生命值低於<span class="text-red-400">30%</span>時，防禦力大幅提升。'}] },
        lastStand: { name: '背水一戰', class:'swordsman', type: 'utility', targetType: 'self', maxLevel: 1, levelReq: 20, prerequisite: { skillId: 'ironWill', level: 1 }, levels: [{ mpCost: 30, description: '[輔助] 消耗大量法力，下一次攻擊必定<span class="text-red-500">暴擊</span>。'}] },
        bladeStorm: { name: '劍刃風暴', class:'swordsman', type: 'physical', targetType: 'all', maxLevel: 1, levelReq: 25, prerequisite: { skillId: 'whirlwind', level: 3 }, levels: [{ mpCost: 50, damageMultiplier: 2.0, description: '[範圍] 化身為劍刃的風暴，對所有敵人造成毀滅性的<span class="text-yellow-400">200%</span>物理傷害。'}] },
        
        // --- 修士 ---
        spiritualPalm: { name: '靈氣掌', class:'monk', type: 'magical', targetType: 'single', maxLevel: 1, levelReq: 1, levels: [
            { mpCost: 8, damageMultiplier: 1.8, description: '[單體] 匯聚靈力於掌心，對敵人造成<span class="text-purple-400">180%</span>靈力的靈力傷害。' },
        ]},
        chiWave: { name: '真氣波', class:'monk', type: 'magical', targetType: 'all', maxLevel: 3, levelReq: 3, prerequisite: { skillId: 'spiritualPalm', level: 1 }, levels: [
            { mpCost: 20, damageMultiplier: 0.9, description: '[範圍] 釋放真氣衝擊波，對所有敵人造成<span class="text-purple-400">90%</span>靈力的靈力傷害。' },
            { mpCost: 22, damageMultiplier: 1.0, description: '[範圍] 更強的真氣波，造成<span class="text-purple-400">100%</span>靈力的靈力傷害。' },
            { mpCost: 24, damageMultiplier: 1.1, description: '[範圍] 極致的真氣波，造成<span class="text-purple-400">110%</span>靈力的靈力傷害。' },
        ]},
        lifeBalance: { name: '生死平衡', class:'monk', type: 'heal_attack', targetType: 'self', maxLevel: 2, levelReq: 5, prerequisite: { skillId: 'chiWave', level: 2 }, levels: [
            { mpCost: 18, healRatio: 0.5, attackRatio: 0.7, description: '[治療/範圍] 治療自身<span class="text-green-400">50%靈力</span>的生命，並對所有敵人造成<span class="text-purple-400">70%治療量</span>的靈力傷害。' },
            { mpCost: 20, healRatio: 0.6, attackRatio: 0.8, description: '[治療/範圍] 治療自身<span class="text-green-400">60%靈力</span>的生命，並對所有敵人造成<span class="text-purple-400">80%治療量</span>的靈力傷害。' },
        ]},
        serenity: { name: '心如止水', class:'monk', type: 'buff', targetType: 'self', maxLevel: 1, levelReq: 8, levels: [{ mpCost: 22, effect: {id: 'serenity', name: '心如止水', stat: 'spi', value: 15, turns: 3}, description: '[增益] 進入冥想狀態，大幅提升<span class="text-green-400">15</span>點靈力，持續3回合。'}] },
        divineStrike: { name: '神聖打擊', class:'monk', type: 'magical', targetType: 'single', maxLevel: 1, levelReq: 10, prerequisite: { skillId: 'serenity', level: 1 }, levels: [
            { mpCost: 25, damageMultiplier: 2.5, description: '[單體] 灌注神聖力量的一擊，造成<span class="text-purple-400">250%</span>靈力傷害，對不死生物有奇效。' },
        ]},
        guardianSpirit: { name: '守護靈', class:'monk', type: 'buff', targetType: 'self', maxLevel: 1, levelReq: 7, levels: [{ mpCost: 15, effect: {id: 'guardianSpirit', name: '守護靈', stat: 'def', value: 15, turns: 3}, description: '[增益] 召喚守護靈，提升<span class="text-green-400">15</span>點防禦，持續3回合。'}]},
        innerPeace: { name: '心靜如水', class:'monk', type: 'heal', targetType: 'self', maxLevel: 1, levelReq: 13, levels: [{ mpCost: 20, description: '[治療] 平靜心靈，恢復<span class="text-blue-400">30%</span>最大法力值。'}]},
        karmaBlade: { name: '業報之刃', class:'monk', type: 'magical', targetType: 'single', maxLevel: 1, levelReq: 18, levels: [{ mpCost: 28, description: '[單體] 將<span class="text-red-400">已損失的生命值</span>轉化為力量攻擊敵人。'}]},
        thousandPalms: { name: '千手神通', class:'monk', type: 'magical', targetType: 'random', maxLevel: 1, levelReq: 22, prerequisite: { skillId: 'karmaBlade', level: 1 }, levels: [{ mpCost: 40, damageMultiplier: 0.8, hits: 5, description: '[隨機] 以肉眼無法捕捉的速度<span class="text-yellow-400">隨機攻擊5次</span>，每次造成80%靈力傷害。'}]},
        enlightenment: { name: '頓悟', class:'monk', type: 'passive', levelReq: 28, levels: [{ description: '[被動] 戰鬥中，有機率恢復消耗的法力。'}]},

        // --- 獸人 ---
        savageCleave: { name: '野蠻劈砍', class:'orc', type: 'physical', targetType: 'single', maxLevel: 2, levelReq: 1, levels: [
            { mpCost: 6, damageMultiplier: 1.6, description: '[單體] 充滿原始怒意的劈砍，造成<span class="text-yellow-400">160%</span>攻擊力的傷害。' },
            { mpCost: 8, damageMultiplier: 2.0, description: '[單體] 更為狂暴的劈砍，造成<span class="text-yellow-400">200%</span>攻擊力的傷害。' },
        ]},
        earthStomp: { name: '大地踐踏', class:'orc', type: 'physical', targetType: 'all', maxLevel: 2, levelReq: 3, prerequisite: { skillId: 'savageCleave', level: 2 }, levels: [
            { mpCost: 18, damageMultiplier: 1.0, description: '[範圍] 猛擊地面，對所有敵人造成<span class="text-yellow-400">100%</span>攻擊力的傷害。' },
            { mpCost: 22, damageMultiplier: 1.2, description: '[範圍] 足以震裂大地的猛擊，造成<span class="text-yellow-400">120%</span>攻擊力的傷害。' },
        ]},
        frenzy: { name: '狂暴', class:'orc', type: 'buff', targetType: 'self', maxLevel: 1, levelReq: 5, prerequisite: { skillId: 'savageCleave', level: 1 }, levels: [
            { hpCost: 0.1, effect: {id: 'frenzy', name: '狂暴', stat: 'atk', value: 20, turns: 3}, description: '[增益] 犧牲<span class="text-red-400">10%</span>生命，換取<span class="text-green-400">20</span>點攻擊力，持續3回合。' },
        ]},
        brutalCharge: { name: '殘暴衝鋒', class:'orc', type: 'physical', targetType: 'single', maxLevel: 1, levelReq: 8, prerequisite: { skillId: 'frenzy', level: 1 }, levels: [{ mpCost: 20, damageMultiplier: 1.8, description: '[單體] 勢不可擋的衝鋒，造成<span class="text-yellow-400">180%</span>攻擊力的傷害並有機率<span class="text-orange-400">擊暈</span>敵人。'}] },
        bloodlust: { name: '嗜血渴望', class:'orc', type: 'passive', levelReq: 10, levels: [{ description: '[被動] 攻擊時，有機會<span class="text-green-400">吸取生命</span>。'}]},
        taunt: { name: '嘲諷', class:'orc', type: 'debuff', targetType: 'single', maxLevel: 1, levelReq: 4, levels: [{ mpCost: 10, description: '[減益] <span class="text-orange-400">激怒</span>一個敵人，使其強制攻擊你。'}] },
        stoneSkin: { name: '石膚', class:'orc', type: 'buff', targetType: 'self', maxLevel: 1, levelReq: 7, levels: [{ mpCost: 12, effect: {id: 'stoneSkinOrc', name: '石膚', stat: 'def', value: 25, turns: 3}, description: '[增益] 讓皮膚像石頭一樣堅硬，提升<span class="text-green-400">25</span>點防禦，持續3回合。'}]},
        overwhelm: { name: '壓制', class:'orc', type: 'physical', targetType: 'single', maxLevel: 1, levelReq: 14, prerequisite: { skillId: 'bloodlust', level: 1 }, levels: [{ mpCost: 25, damageMultiplier: 2.5, description: '[單體] 對生命值低於<span class="text-red-400">50%</span>的敵人造成<span class="text-yellow-400">250%</span>的巨大傷害。'}]},
        unbreakable: { name: '不倒', class:'orc', type: 'utility', targetType: 'self', maxLevel: 1, levelReq: 19, levels: [{ mpCost: 40, description: '[輔助] 短時間內，無論如何都<span class="text-green-400">不會倒下</span>。'}]},
        rampage: { name: '暴走', class:'orc', type: 'passive', levelReq: 26, levels: [{ description: '[被動] 擊敗敵人時會進入<span class="text-red-500">暴走</span>狀態，攻擊力提升。'}]},
        
        // --- 死靈 ---
        boneSpear: { name: '骸骨之矛', class:'necromancer', type: 'magical', targetType: 'single', maxLevel: 2, levelReq: 1, levels: [
            { mpCost: 10, damageMultiplier: 1.8, description: '[單體] 用死者骨骼化成的長矛穿刺敵人，造成<span class="text-purple-400">180%</span>靈力的傷害。' },
            { mpCost: 12, damageMultiplier: 2.2, description: '[單體] 更鋒利，更致命的骸骨之矛，造成<span class="text-purple-400">220%</span>靈力的傷害。' },
        ]},
        boneNova: { name: '骸骨新星', class:'necromancer', type: 'magical', targetType: 'all', maxLevel: 2, levelReq: 3, prerequisite: { skillId: 'boneSpear', level: 2 }, levels: [
            { mpCost: 25, damageMultiplier: 1.3, description: '[範圍] 引爆骸骨碎片，對所有敵人造成<span class="text-purple-400">130%</span>靈力的傷害。' },
            { mpCost: 30, damageMultiplier: 1.5, description: '[範圍] 更大範圍的骸骨爆炸，造成<span class="text-purple-400">150%</span>靈力的傷害。' },
        ]},
        lifeDrain: { name: '生命汲取', class:'necromancer', type: 'magical_drain', targetType: 'single', maxLevel: 1, levelReq: 5, prerequisite: { skillId: 'boneSpear', level: 1 }, levels: [
            { mpCost: 18, damageMultiplier: 1.5, drainRatio: 0.5, description: '[單體] 吸取敵人的生命力來治療自己，造成<span class="text-purple-400">150%</span>靈力傷害並恢復<span class="text-green-400">一半</span>傷害的生命。' },
        ]},
        curse: { name: '詛咒', class:'necromancer', type: 'debuff', targetType: 'single', maxLevel: 1, levelReq: 8, levels: [{ mpCost: 15, effect: {id: 'curse', name: '詛咒', stat: 'def', value: -15, turns: 3}, description: '[減益] <span class="text-orange-400">削弱</span>敵人的防禦，持續3回合。'}] },
        shadowStep: { name: '暗影步伐', class:'necromancer', type: 'utility', levelReq: 10, prerequisite: { skillId: 'curse', level: 1 }, levels: [{ mpCost: 12, description: '[輔助] 融入陰影，提升下一次攻擊的<span class="text-red-500">暴擊</span>機會。'}]},
        summonSkeleton: { name: '召喚骷髏', class:'necromancer', type: 'summon', targetType: 'self', maxLevel: 1, levelReq: 4, levels: [{ mpCost: 20, description: '[輔助] 從地下召喚骷髏為你作戰。(暫未實現)'}]},
        corpseExplosion: { name: '屍爆', class:'necromancer', type: 'magical', targetType: 'all', maxLevel: 1, levelReq: 11, prerequisite: { skillId: 'boneNova', level: 2 }, levels: [{ mpCost: 22, description: '[範圍] 引爆屍體，對敵人造成範圍傷害。(暫未實現)'}]},
        soulSiphon: { name: '靈魂虹吸', class:'necromancer', type: 'magical_drain', targetType: 'single', maxLevel: 1, levelReq: 16, levels: [{ mpCost: 25, description: '[單體] <span class="text-blue-400">吸取</span>敵人的法力。'}]},
        fear: { name: '恐懼', class:'necromancer', type: 'debuff', targetType: 'single', maxLevel: 1, levelReq: 21, levels: [{ mpCost: 30, description: '[減益] 讓敵人陷入<span class="text-orange-400">恐懼</span>而無法行動。'}]},
        deathPact: { name: '死亡契約', class:'necromancer', type: 'passive', levelReq: 27, levels: [{ description: '[被動] 死亡時，釋放最後的力量<span class="text-red-500">反噬</span>所有敵人。'}]},

        // [修改] 怪物技能平衡與效果實作
        goblinRush: { name: '哥布林猛衝', type: 'physical', targetType: 'single', damageMultiplier: 1.1 },
        poisonBite: { name: '毒咬', type: 'physical', targetType: 'single', damageMultiplier: 1.0, effect: {id: 'poison', name: '中毒', type: 'dot', stat: 'hp', value: -5, turns: 3} },
        tuskGore: { name: '獠牙穿刺', type: 'physical', targetType: 'single', damageMultiplier: 1.5 },
        furiousBite: { name: '狂怒撕咬', type: 'physical', targetType: 'single', damageMultiplier: 1.2 },
        hobgoblinSmash: { name: '大哥布林重擊', type: 'physical', targetType: 'single', damageMultiplier: 1.6 },
        shamanCurse: { name: '薩滿詛咒', type: 'debuff', targetType: 'single', effect: { id: 'shamanCurse', name: '薩滿詛咒', stat: 'atk', value: -10, turns: 2} },
        minorHeal: { name: '次級治療', type: 'heal', targetType: 'self', healMultiplier: 1.5 },
        shadowBlast: { name: '暗影爆破', type: 'magical', targetType: 'all', damageMultiplier: 1.0 },
        earthSlam: { name: '大地猛擊', type: 'physical', targetType: 'all', damageMultiplier: 1.2 },
        wingSlash: { name: '翼斬', type: 'physical', targetType: 'single', damageMultiplier: 1.4 },
        ogreClub: { name: '食人魔巨棒', type: 'physical', targetType: 'single', damageMultiplier: 1.8 },
        poisonSting: { name: '毒刺', type: 'physical', targetType: 'single', damageMultiplier: 1.3, effect: {id: 'poison', name: '中毒', type: 'dot', stat: 'hp', value: -10, turns: 3} },
        trollRegen: { name: '巨魔再生', type: 'passive' },
        charge: { name: '衝鋒', type: 'physical', targetType: 'single', damageMultiplier: 1.7 },
        fireBreath: { name: '火焰吐息', type: 'magical', targetType: 'all', damageMultiplier: 1.5 },
        petrifyingGaze: { name: '石化凝視', type: 'debuff', targetType: 'single', effect: { id: 'petrify', name: '石化', type: 'stun', turns: 1 } },
        multiBite: { name: '多重撕咬', type: 'physical', targetType: 'random', hits: 3, damageMultiplier: 0.8 },
        elementalBlast: { name: '元素爆發', type: 'magical', targetType: 'all', damageMultiplier: 1.3 }
    },
    locations: {
        oakwood: { name: "橡木鎮", description: "一個被森林環繞的寧靜小鎮，但最近似乎不太平靜。" },
        whisperingWoods: { name: "低語森林", description: "新手冒險者的試煉場，充滿了哥布林與野生動物。", monsters: ['slime', 'goblin', 'forestSpider'], levelRange: [1, 3], requiredLevel: 1, storyReq: 'main01' },
        boarPlains: { name: "野豬平原", description: "開闊的平原，是野豬和狼群的家園。", monsters: ['wildBoar', 'wolf', 'zombie'], levelRange: [3, 5], requiredLevel: 3, storyReq: 'main03' },
        goblinCamp: { name: "哥布林營地", description: "哥布林們聚集的營地，由更強大的戰士守衛著。", monsters: ['goblin', 'goblinWarrior', 'hobgoblin', 'giantBat'], levelRange: [4, 7], requiredLevel: 5, storyReq: 'main03' },
        orcOutpost: { name: "獸人前哨", description: "獸人部落的前線哨站，瀰漫著戰爭的氣息。", monsters: ['orcGrunt', 'orcShaman', 'imp'], levelRange: [7, 10], requiredLevel: 8, storyReq: 'main04' },
        hauntedCemetery: { name: '荒廢墓園', description: "不安的靈魂在此徘徊，生者勿近的詛咒之地。", monsters: ['skeleton', 'wraith', 'hauntedArmor', 'mimic'], levelRange: [10, 14], requiredLevel: 11, storyReq: 'main05' },
        dragonPeak: { name: '巨龍之巔', description: "傳說的頂峰，只有最強大的英雄才敢挑戰遠古巨龍。", monsters: ['ancientDragon'], levelRange: [50, 50], requiredLevel: 45, storyReq: 'main06' },
    },
    npcs: {
        elder: { name: "村長", type: "quest" },
        blacksmith: { name: "鐵匠", type: "quest" }
    },
    quests: {
        main01: { id: 'main01', title: "森林裡的麻煩", npc: "elder", objective: { type: 'kill', target: 'goblin', current: 0, total: 5 }, reward: { exp: 150, items: [{ itemId: 'healingEgg', quantity: 5 }], gold: 50, skillPoints: 1 }, levelReq: 1, onComplete: (p) => { p.storyProgress = 'main02'; } },
        main02: { id: 'main02', title: "第一次裝備", npc: "blacksmith", objective: { type: 'equip', target: 'any', current: 0, total: 1 }, reward: { exp: 50, items: [{ itemId: 'courageBadge', quantity: 1 }], gold: 20 }, levelReq: 1, onComplete: (p) => { p.storyProgress = 'main03'; } },
        main03: { id: 'main03', title: "等級的考驗", npc: "elder", objective: { type: 'level', target: 'any', current: 0, total: 5 }, reward: { exp: 200, items: [{ itemId: 'giantsElixir', quantity: 3 }], gold: 100 }, levelReq: 3, onComplete: (p) => { p.storyProgress = 'main04'; } },
        main04: { id: 'main04', title: "深入獸人領地", npc: "elder", objective: { type: 'kill', target: 'orcGrunt', current: 0, total: 8 }, reward: { exp: 500, items: [{ itemId: 'plateArmor', quantity: 1 }], gold: 250 }, levelReq: 8, onComplete: (p) => { p.storyProgress = 'main05'; } },
        main05: { id: 'main05', title: "亡靈的呢喃", npc: "elder", objective: { type: 'kill', target: 'wraith', current: 0, total: 3 }, reward: { exp: 800, items: [{ itemId: 'skillBookLifeDrain', quantity: 1 }], gold: 500 }, levelReq: 11, onComplete: (p) => { p.storyProgress = 'main06'; } },
        main06: { id: 'main06', title: "最終的挑戰", npc: "elder", objective: { type: 'level', target: 'any', current: 0, total: 15 }, reward: { exp: 1500, gold: 1000, skillPoints: 3 }, levelReq: 13, onComplete: (p) => {} },
    },
    storyline: {
        main01: { title: '第一章：低語的先兆', description: '調查橡木鎮水源污染的源頭。' },
        main02: { title: '第二章：磨練自我', description: '學會利用裝備來強化自己。' },
        main03: { title: '第三章：實力證明', description: '透過實戰來證明自己的實力。' },
        main04: { title: '第四章：部落的威脅', description: '擊退入侵的獸人步兵。' },
        main05: { title: '第五章：安撫亡魂', description: '淨化墓園中的怨靈。' },
        main06: { title: '第六章：迎接挑戰', description: '為更艱鉅的挑戰做好準備。' },
    },
    shop: {
        items: ['healingEgg', 'manaTea', 'stoneSkinPotion', 'swiftnessPotion', 'giantsElixir', 'antidote', 'smokeBomb', 'smallSword', 'leatherArmor', 'courageBadge']
    }
};

DATABASE.codex = {
    monsters: Object.keys(DATABASE.monsters),
    items: Object.values(DATABASE.items).filter(i => ['consumable', 'material', 'skillbook'].includes(i.type)).map(i => i.id),
    weapons: Object.values(DATABASE.items).filter(i => i.type === 'weapon').map(i => i.id),
    armors: Object.values(DATABASE.items).filter(i => ['armor', 'accessory'].includes(i.type)).map(i => i.id),
};