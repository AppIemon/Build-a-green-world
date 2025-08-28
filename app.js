"use strict";
// Global variable declarations
const embeddedGameData = {
    assets: {
        terrains: { grass: "t-grass.png", water: "t-water.png", forest: "t-forest.png", mountain: "t-mountain.png", desert: "t-desert.png", tundra: "t-tundra.png", tropical: "t-tropical.png", swamp: "t-swamp.png", ice: "t-ice.png", volcano: "t-volcano.png", canyon: "t-canyon.png", oasis: "t-oasis.png", plateau: "t-plateau.png" },
        buildingImages: {
            apartment: "b-apartment.png",
            canyon_echo_lab: "b-canyon-echo-lab.png",
            canyon_windcatcher: "b-canyon-windcatcher.png",
            coalplant: "b-coal-plant.png",
            desert_outpost: "b-desert-outpost.png",
            ecovillage: "b-ecovillage.png",
            factory: "b-factory.png",
            farm: "b-farm.png",
            forest_reserve: "b-forest-reserve.png",
            geothermal: "b-geothermal.png",
            green_factory: "b-green-factory.png",
            greenhouse: "b-greenhouse.png",
            house: "b-house.png",
            ice_mining: "b-ice-mining.png",
            ice_thermal_plant: "b-ice-thermal.png",
            lab: "b-lab.png",
            lunar_base: "b-lunar-base.png",
            market: "b-market.png",
            mars_colony: "b-mars-colony.png",
            mountain_lodge: "b-mountain-lodge.png",
            nuclear_plant: "b-nuclear-plant.png",
            park: "b-park.png",
            recycling_center: "b-recycling-center.png",
            solar_panel: "b-solar-farm.png",
            swamp_biolab: "b-swamp-biolab.png",
            swamp_fishery: "b-swamp-fishery.png",
            tent: "b-tent.png",
            tundra_settlement: "b-tundra-settlement.png",
            university: "b-university.png",
            vertical_farm: "b-vertical-farm.png",
            volcano_forge: "b-volcano-forge.png",
            volcano_spa: "b-volcano-spa.png",
            water_treatment: "b-water-treatment.png",
            windmill: "b-wind-turbine.png",
            space_station: "b-space-station.png"
        },          
        events: { drought: "e-drought.png", flood: "e-flood.png", heatwave: "e-heatwave.png", wildfire: "e-wildfire.png", green_boom: "e-green-boom.png", migration: "e-migration.png" }
    },
    // Enhanced bonus configuration system
    bonusConfig: {
        terrainModifiers: {
            mountain: { windmill: 1.5, geothermal: 1.5, nuclear_plant: 1.5 },
            desert: { solar_panel: 1.5, greenhouse: 1.5 },
            forest: { apartment: 1.3, park: 1.3, ecovillage: 1.3 },
            tropical: { apartment: 1.3, park: 1.3, ecovillage: 1.3 },
            canyon: { factory: 1.2, market: 1.2 },
            plateau: { factory: 1.2, market: 1.2 },
            oasis: { farm: 1.4, greenhouse: 1.4, market: 1.1, apartment: 1.1 }
        },
        complexConditions: {
            "desert_water_synergy": {
                requiresTerrains: ["desert"],
                requiresBuildings: ["water_treatment"],
                appliesTo: ["greenhouse", "solar_panel"],
                bonus: { money: 0, energy: 2, carbon: 0, population: 0, food: 2 }
            },
            "mountain_energy_network": {
                requiresTerrains: ["mountain"],
                requiresBuildings: ["lab"],
                appliesTo: ["geothermal", "nuclear_plant"],
                bonus: { money: 1, energy: 3, carbon: 0, population: 0, food: 0 }
            },
            "forest_eco_harmony": {
                requiresTerrains: ["forest", "tropical"],
                requiresBuildings: ["park"],
                appliesTo: ["apartment", "ecovillage"],
                bonus: { money: 0, energy: 0, carbon: -2, population: 3, food: 0 }
            },
            "industrial_triangle": {
                requiresBuildings: ["factory", "recycling_center", "market"],
                appliesTo: ["factory"],
                bonus: { money: 4, energy: 0, carbon: -2, population: 0, food: 0 }
            }
        },
        patternBonuses: {
            "energy_chain": {
                type: "chain",
                buildings: ["windmill", "solar_panel", "geothermal"],
                minLength: 3,
                bonus: { money: 0, energy: 2, carbon: -1, population: 0, food: 0 }
            },
            "agricultural_cluster": {
                type: "triangle",
                buildings: ["farm", "water_treatment", "park"],
                bonus: { money: 0, energy: 0, carbon: -3, population: 0, food: 8 }
            },
            "urban_district": {
                type: "district",
                buildings: ["apartment", "market", "park"],
                minSize: 4,
                bonus: { money: 3, energy: 0, carbon: 0, population: 2, food: 0 }
            },
            "industrial_complex": {
                type: "district",
                buildings: ["factory", "green_factory", "recycling_center"],
                minSize: 3,
                bonus: { money: 5, energy: 0, carbon: -3, population: 0, food: 0 }
            }
        }
    },
    difficulties: {
        // ===== Very Easy Band =====
        d01_story: { name: "스토리", startResources: { money: 5000, energy: 120, carbon: 0, population: 220, food: 1400 }, turnLimit: 320, carbonLimit: 2100, multipliers: { income: 2.40, research: 1.30, cost: 0.50 } },
        d02_tourist: { name: "관광객", startResources: { money: 4600, energy: 110, carbon: 0, population: 200, food: 1250 }, turnLimit: 280, carbonLimit: 1950, multipliers: { income: 2.10, research: 1.25, cost: 0.55 } },
        d03_relaxed: { name: "휴식", startResources: { money: 4200, energy: 100, carbon: 0, population: 185, food: 1100 }, turnLimit: 250, carbonLimit: 1820, multipliers: { income: 1.90, research: 1.22, cost: 0.60 } },
        d04_easy: { name: "쉬움", startResources: { money: 3600, energy: 90, carbon: 0, population: 170, food: 950 }, turnLimit: 220, carbonLimit: 1700, multipliers: { income: 1.75, research: 1.20, cost: 0.65 } },
        d05_casual: { name: "캐주얼", startResources: { money: 3000, energy: 80, carbon: 0, population: 155, food: 850 }, turnLimit: 200, carbonLimit: 1600, multipliers: { income: 1.60, research: 1.18, cost: 0.70 } },
        // ===== Core / Mid Band =====
        d06_normal: { name: "일반", startResources: { money: 2400, energy: 70, carbon: 0, population: 140, food: 720 }, turnLimit: 180, carbonLimit: 1480, multipliers: { income: 1.45, research: 1.15, cost: 0.78 } },
        d07_brisk: { name: "경쾌", startResources: { money: 2200, energy: 64, carbon: 0, population: 130, food: 660 }, turnLimit: 170, carbonLimit: 1400, multipliers: { income: 1.35, research: 1.12, cost: 0.85 } },
        d08_hard: { name: "어려움", startResources: { money: 2000, energy: 58, carbon: 0, population: 120, food: 600 }, turnLimit: 160, carbonLimit: 1320, multipliers: { income: 1.25, research: 1.10, cost: 0.92 } },
        d09_gritty: { name: "냉혹", startResources: { money: 1800, energy: 52, carbon: 0, population: 110, food: 540 }, turnLimit: 150, carbonLimit: 1240, multipliers: { income: 1.15, research: 1.07, cost: 0.98 } },
        d10_veteran: { name: "베테랑", startResources: { money: 1600, energy: 46, carbon: 0, population: 100, food: 480 }, turnLimit: 140, carbonLimit: 1160, multipliers: { income: 1.05, research: 1.05, cost: 1.05 } },
        // ===== Hard / High-Skill Band =====
        d11_elite: { name: "엘리트", startResources: { money: 1400, energy: 40, carbon: 0, population: 92, food: 430 }, turnLimit: 132, carbonLimit: 1080, multipliers: { income: 0.98, research: 1.03, cost: 1.10 } },
        d12_nightmare: { name: "악몽", startResources: { money: 1200, energy: 36, carbon: 0, population: 84, food: 380 }, turnLimit: 126, carbonLimit: 1000, multipliers: { income: 0.94, research: 1.02, cost: 1.16 } },
        d13_hell: { name: "지옥", startResources: { money: 1000, energy: 32, carbon: 0, population: 76, food: 330 }, turnLimit: 120, carbonLimit: 920, multipliers: { income: 0.92, research: 1.00, cost: 1.22 } },
        d14_apocalypse: { name: "종말", startResources: { money: 850, energy: 28, carbon: 0, population: 60, food: 260 }, turnLimit: 108, carbonLimit: 820, multipliers: { income: 0.90, research: 0.98, cost: 1.28 } },
        d15_impossible: { name: "불가능", startResources: { money: 700, energy: 24, carbon: 0, population: 50, food: 200 }, turnLimit: 95, carbonLimit: 720, multipliers: { income: 0.88, research: 0.96, cost: 1.35 } }
    },
    buildings: {
        farm: { id: "farm", name: "농장", cost: { money: 80, energy: 1, carbon: 1, population: 0, food: 0 }, terrains: ["grass", "oasis", "plateau"], base: { money: 0, energy: 0, carbon: 0, population: 0, food: 2 }, adjacency: {
                grass: { money: 0, energy: 0, carbon: 0, population: 0, food: 1 },
                river: { money: 0, energy: 0, carbon: 0, population: 0, food: 1 },
                water_treatment: { money: 0, energy: 0, carbon: 0, population: 0, food: 1 },
                park: { money: 0, energy: 0, carbon: -1, population: 0, food: 1 },
                farm: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 }
            },
            specialAbility: {
                condition: "adjacency >= base*2",
                name: "농업 혁신",
                description: "인접한 공원과 정수장의 보너스가 2배가 됩니다",
                effect: { type: "transform", scope: "adjacent:park,water_treatment" }
            },
            requiresTech: "basic_agriculture", src: "farm" },
        greenhouse: { id: "greenhouse", name: "온실", cost: { money: 240, energy: 3, carbon: 1, population: 0, food: 0 }, terrains: ["desert", "tundra", "plateau"], base: { money: 0, energy: -2, carbon: 0, population: 0, food: 6 }, adjacency: {
                desert: { money: 0, energy: 0, carbon: 0, population: 0, food: 2 },
                water_treatment: { money: 0, energy: 0, carbon: 0, population: 0, food: 1 },
                apartment: { money: 0, energy: 0, carbon: 0, population: 0, food: 1 }
            }, requiresTech: "controlled_env", src: "greenhouse" },
        vertical_farm: { id: "vertical_farm", name: "수직 농장", cost: { money: 480, energy: 8, carbon: 1, population: 0, food: 0 }, terrains: ["tropical", "grass", "oasis"], base: { money: 0, energy: -6, carbon: 1, population: 0, food: 120 }, adjacency: {
                apartment: { money: 0, energy: 0, carbon: 0, population: 15, food: 18 },
                market: { money: 18, energy: 0, carbon: 0, population: 0, food: 0 },
                water_treatment: { money: 0, energy: 0, carbon: 0, population: 0, food: 18 }
            }, requiresTech: "urban_agri", src: "vertical_farm" },
        windmill: { id: "windmill", name: "풍력 터빈", cost: { money: 160, energy: 0, carbon: 1, population: 0, food: 0 }, terrains: ["plateau", "grass", "mountain"], base: { money: 0, energy: 3, carbon: 1, population: 0, food: 0 }, adjacency: {
                plateau: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 },
                windmill: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 },
                solar_panel: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 }
            },
            patternRules: [
                { type: "chain", buildings: ["windmill"], bonus: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 } },
                { type: "district", buildings: ["windmill"], bonus: { money: 0, energy: 2, carbon: 0, population: 0, food: 0 } }
            ],
            specialAbility: {
                condition: "adjacency >= base*2",
                name: "전력망 안정화",
                description: "같은 지역의 태양광 발전소에 +1 에너지 제공",
                effect: { type: "boost", target: "solar_panel", bonus: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 }, scope: "district" }
            },
            requiresTech: "wind_power", src: "windmill" },
        solar_panel: { id: "solar_panel", name: "태양광 발전소", cost: { money: 150, energy: 0, carbon: 1, population: 0, food: 0 }, terrains: ["desert", "plateau", "oasis"], base: { money: 0, energy: 3, carbon: 1, population: 0, food: 0 }, adjacency: {
                desert: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 },
                solar_panel: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 },
                windmill: { money: 0, energy: 1, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "solar_farming", src: "solar_panel" },
        coalplant: { id: "coalplant", name: "석탄 발전소", cost: { money: 230, energy: 0, carbon: 14, population: 0, food: 0 }, terrains: ["plateau", "grass"], base: { money: 0, energy: 10, carbon: 14, population: 0, food: 0 }, adjacency: {
                factory: { money: 3, energy: 0, carbon: 2, population: 0, food: 0 },
                park: { money: 0, energy: 0, carbon: -2, population: 0, food: 0 }
            }, requiresTech: "fossil_energy", src: "coalplant" },
        nuclear_plant: { id: "nuclear_plant", name: "원자력 발전소", cost: { money: 1200, energy: 0, carbon: 2, population: 0, food: 0 }, terrains: ["plateau"], base: { money: 0, energy: 180, carbon: 2, population: 0, food: 0 }, adjacency: {
                water_treatment: { money: 0, energy: 15, carbon: 0, population: 0, food: 0 },
                lab: { money: 0, energy: 12, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "nuclear", src: "nuclear_plant" },
        geothermal: { id: "geothermal", name: "지열 발전소", cost: { money: 290, energy: 0, carbon: 1, population: 0, food: 0 }, terrains: ["volcano", "mountain"], base: { money: 0, energy: 45, carbon: 1, population: 0, food: 0 }, adjacency: {
                mountain: { money: 0, energy: 8, carbon: 0, population: 0, food: 0 },
                apartment: { money: 5, energy: 5, carbon: 0, population: 0, food: 0 },
                market: { money: 8, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "basic_research", src: "geothermal" },
        ice_research_station: { id: "ice_research_station", name: "극지 연구소", cost: { money: 350, energy: 4, carbon: 0, population: 8, food: -3 }, terrains: ["ice", "tundra"], base: { money: 12, energy: -2, carbon: 0, population: 5, food: -2 }, adjacency: {
                ice: { money: 5, energy: 0, carbon: 0, population: 0, food: 0 },
                tundra: { money: 3, energy: 2, carbon: 0, population: 2, food: 0 },
                lab: { money: 8, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "basic_research", src: "lab" },
        swamp_facility: { id: "swamp_facility", name: "습지 정화소", cost: { money: 180, energy: 2, carbon: -3, population: 0, food: 0 }, terrains: ["swamp"], base: { money: 3, energy: -1, carbon: -5, population: 0, food: 0 }, adjacency: {
                water_treatment: { money: 2, energy: 0, carbon: -2, population: 0, food: 2 },
                park: { money: 1, energy: 0, carbon: -3, population: 1, food: 0 },
                recycling_center: { money: 2, energy: 0, carbon: -1, population: 0, food: 0 }
            }, requiresTech: "environmental_tech", src: "water_treatment" },
        canyon_observatory: { id: "canyon_observatory", name: "협곡 관측소", cost: { money: 280, energy: 3, carbon: 0, population: 6, food: -2 }, terrains: ["canyon"], base: { money: 8, energy: -1, carbon: 0, population: 4, food: -1 }, adjacency: {
                canyon: { money: 4, energy: 0, carbon: 0, population: 0, food: 0 },
                mountain: { money: 3, energy: 1, carbon: 0, population: 0, food: 0 },
                lab: { money: 5, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "space_exploration", src: "lab" },
        lab: { id: "lab", name: "연구소", cost: { money: 210, energy: 2, carbon: 0, population: 0, food: 0 }, terrains: ["plateau", "grass"], base: { money: 0, energy: -2, carbon: 0, population: 0, food: 0 }, adjacency: {
                university: { money: 5, energy: 1, carbon: 0, population: 0, food: 0 },
                nuclear_plant: { money: 0, energy: 3, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "basic_research", src: "lab" },
        university: { id: "university", name: "대학교", cost: { money: 800, energy: 5, carbon: 2, population: 15, food: -8 }, terrains: ["grass", "plateau", "tropical"], base: { money: 22, energy: -4, carbon: 0, population: 10, food: -6 }, adjacency: {
                lab: { money: 12, energy: 4, carbon: 0, population: 0, food: 0 },
                apartment: { money: 2, energy: 0, carbon: 0, population: 6, food: 0 },
                market: { money: 6, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "basic_research", src: "university" },
        tent: { id: "tent", name: "텐트", cost: { money: 20, energy: 0, carbon: 0, population: 2, food: -1 }, terrains: ["grass", "forest", "desert", "plateau"], base: { money: 0, energy: 0, carbon: 0, population: 2, food: -1 }, adjacency: {
                water_treatment: { money: 0, energy: 0, carbon: 0, population: 2, food: 1 },
                farm: { money: 1, energy: 0, carbon: 0, population: 1, food: 2 },
                park: { money: 0, energy: 0, carbon: -1, population: 1, food: 0 },
                market: { money: 1, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "basic_agriculture", src: "tent" },
        house: { id: "house", name: "단독주택", cost: { money: 120, energy: 1, carbon: 1, population: 3, food: -2 }, terrains: ["grass", "forest", "oasis"], base: { money: 2, energy: 0, carbon: 1, population: 3, food: -2 }, adjacency: {
                park: { money: 2, energy: 0, carbon: -2, population: 2, food: 0 },
                market: { money: 3, energy: 0, carbon: 0, population: 1, food: 0 },
                farm: { money: 1, energy: 0, carbon: 0, population: 1, food: 2 },
                water_treatment: { money: 0, energy: 0, carbon: 0, population: 1, food: 1 },
                lab: { money: 1, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "civic_basics", src: "house" },
        apartment: { id: "apartment", name: "아파트", cost: { money: 220, energy: 3, carbon: 2, population: 8, food: -5 }, terrains: ["grass", "tropical", "oasis"], base: { money: 2, energy: -2, carbon: 1, population: 10, food: -5 }, adjacency: {
                market: { money: 2, energy: 0, carbon: 0, population: 1, food: 0 },
                park: { money: 1, energy: 0, carbon: -2, population: 2, food: 0 },
                vertical_farm: { money: 2, energy: 0, carbon: 0, population: 2, food: 2 },
                house: { money: 1, energy: 0, carbon: 0, population: 1, food: 0 },
                water_treatment: { money: 0, energy: 0, carbon: 0, population: 1, food: 1 },
                university: { money: 1, energy: 0, carbon: 0, population: 2, food: 0 }
            },
            requiresTech: "urban_planning", src: "apartment" },
        market: { id: "market", name: "시장", cost: { money: 160, energy: 1, carbon: 1, population: 0, food: 0 }, terrains: ["grass", "oasis", "tropical"], base: { money: 4, energy: 0, carbon: 1, population: 0, food: 0 }, adjacency: {
                apartment: { money: 3, energy: 0, carbon: 0, population: 1, food: 0 },
                factory: { money: 2, energy: 0, carbon: 0, population: 0, food: 0 },
                vertical_farm: { money: 2, energy: 0, carbon: 0, population: 0, food: 0 },
                house: { money: 2, energy: 0, carbon: 0, population: 1, food: 0 },
                tent: { money: 1, energy: 0, carbon: 0, population: 1, food: 0 },
                university: { money: 3, energy: 0, carbon: 0, population: 0, food: 0 },
                lab: { money: 2, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "basic_commerce", src: "market" },
        factory: { id: "factory", name: "공장", cost: { money: 200, energy: 2, carbon: 4, population: 0, food: 0 }, terrains: ["plateau", "grass"], base: { money: 5, energy: -2, carbon: 5, population: 0, food: 0 }, adjacency: {
                recycling_center: { money: 1, energy: 0, carbon: -1, population: 0, food: 0 },
                market: { money: 1, energy: 0, carbon: 0, population: 0, food: 0 },
                coalplant: { money: 1, energy: 0, carbon: 1, population: 0, food: 0 },
                green_factory: { money: 1, energy: 0, carbon: -1, population: 0, food: 0 }
            },
            requiresTech: "industrialization", src: "factory" },
        green_factory: { id: "green_factory", name: "친환경 공장", cost: { money: 450, energy: 3, carbon: 2, population: 0, food: 0 }, terrains: ["plateau", "grass"], base: { money: 30, energy: -5, carbon: 2, population: 0, food: 0 }, adjacency: {
                recycling_center: { money: 15, energy: 0, carbon: -8, population: 0, food: 0 },
                market: { money: 12, energy: 0, carbon: 0, population: 0, food: 0 },
                factory: { money: 10, energy: 0, carbon: -5, population: 0, food: 0 }
            }, requiresTech: "green_manufacturing", src: "green_factory" },
        recycling_center: { id: "recycling_center", name: "재활용 센터", cost: { money: 240, energy: 2, carbon: -3, population: 0, food: 0 }, terrains: ["grass", "plateau"], base: { money: 60, energy: -10, carbon: -10, population: 0, food: 0 }, adjacency: {
                factory: { money: 5, energy: 0, carbon: -5, population: 0, food: 0 },
                green_factory: { money: 8, energy: 0, carbon: -8, population: 0, food: 0 },
                market: { money: 4, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "circular_economy", src: "recycling_center" },
        water_treatment: { id: "water_treatment", name: "정수 처리장", cost: { money: 210, energy: 2, carbon: 0, population: 0, food: 0 }, terrains: ["grass", "oasis", "plateau"], base: { money: 0, energy: -1, carbon: 0, population: 0, food: 8 }, adjacency: {
                river: { money: 0, energy: 0, carbon: 0, population: 0, food: 8 },
                farm: { money: 0, energy: 0, carbon: 0, population: 0, food: 5 },
                greenhouse: { money: 0, energy: 0, carbon: 0, population: 0, food: 6 }
            }, requiresTech: "water_purification", src: "water_treatment" },
        park: { id: "park", name: "공원", cost: { money: 100, energy: 0, carbon: -2, population: 1, food: 0 }, terrains: ["grass", "oasis", "forest"], base: { money: 0, energy: 0, carbon: -5, population: 3, food: 0 }, adjacency: {
                apartment: { money: 0, energy: 0, carbon: -2, population: 4, food: 0 },
                farm: { money: 0, energy: 0, carbon: -2, population: 0, food: 2 },
                market: { money: 2, energy: 0, carbon: 0, population: 0, food: 0 }
            }, requiresTech: "basic_commerce", src: "park" },
        ecovillage: { id: "ecovillage",
            name: "환경 마을",
            cost: { money: 100, energy: 0, carbon: -2, population: 1, food: 0 },
            terrains: ["grass", "oasis", "forest"],
            base: { money: 0, energy: 0, carbon: -5, population: 3, food: 0 },
            adjacency: {
                apartment: { money: 0, energy: 0, carbon: -2, population: 4, food: 0 },
                market: { money: 2, energy: 0, carbon: 0, population: 0, food: 0 },
                farm: { money: 0, energy: 0, carbon: 0, population: 0, food: 2 },
                green_factory: { money: 10, energy: 0, carbon: -5, population: 0, food: 0 }
            },
            requiresTech: "ecosystem_science", src: "ecovillage" },
        forest_reserve: {
            id: "forest_reserve",
            name: "산림 보호구역",
            cost: { money: 100, energy: 0, carbon: 0, population: 0, food: 0 },
            terrains: ["forest"],
            base: { money: 0, energy: 0, carbon: -10, population: 0, food: 0 },
            adjacency: {},
            requiresTech: "ecosystem_science", src: "forest_reserve"
        },
        /* ===== 새로운 건물들 - 지형별 최소 3개 보장 ===== */
        // Mountain 지형 추가 건물
        mountain_lodge: {
            id: "mountain_lodge", name: "산장",
            cost: { money: 120, energy: 1, carbon: 0, population: 4, food: -2 },
            terrains: ["mountain"],
            base: { money: 8, energy: 0, carbon: 0, population: 3, food: -1 },
            adjacency: {
                mountain: { money: 3, energy: 1, carbon: 0, population: 1, food: 0 },
                geothermal: { money: 2, energy: 2, carbon: 0, population: 0, food: 0 },
                park: { money: 1, energy: 0, carbon: -1, population: 2, food: 0 }
            },
            requiresTech: "civic_basics", src: "house"
        },
        // Desert 지형 추가 건물
        desert_outpost: {
            id: "desert_outpost", name: "사막 전초기지",
            cost: { money: 200, energy: 2, carbon: 1, population: 5, food: -3 },
            terrains: ["desert"],
            base: { money: 12, energy: -1, carbon: 0, population: 4, food: -2 },
            adjacency: {
                desert: { money: 4, energy: 1, carbon: 0, population: 0, food: 0 },
                solar_panel: { money: 3, energy: 2, carbon: 0, population: 0, food: 0 },
                water_treatment: { money: 2, energy: 0, carbon: 0, population: 1, food: 2 }
            },
            requiresTech: "basic_research", src: "lab"
        },
        // Tundra 지형 추가 건물  
        tundra_settlement: {
            id: "tundra_settlement", name: "툰드라 정착지",
            cost: { money: 150, energy: 3, carbon: 1, population: 6, food: -4 },
            terrains: ["tundra"],
            base: { money: 5, energy: -2, carbon: 0, population: 5, food: -3 },
            adjacency: {
                tundra: { money: 2, energy: 1, carbon: 0, population: 1, food: 0 },
                ice_research_station: { money: 3, energy: 1, carbon: 0, population: 2, food: 0 },
                greenhouse: { money: 1, energy: 0, carbon: 0, population: 0, food: 3 }
            },
            requiresTech: "urban_planning", src: "apartment"
        },
        // Swamp 지형 추가 건물들
        swamp_biolab: {
            id: "swamp_biolab", name: "습지 생명과학 연구소",
            cost: { money: 300, energy: 4, carbon: -2, population: 8, food: -1 },
            terrains: ["swamp"],
            base: { money: 18, energy: -3, carbon: -3, population: 6, food: 0 },
            adjacency: {
                swamp_facility: { money: 5, energy: 0, carbon: -2, population: 0, food: 0 },
                water_treatment: { money: 3, energy: 1, carbon: -1, population: 0, food: 1 },
                forest_reserve: { money: 4, energy: 0, carbon: -3, population: 0, food: 0 }
            },
            requiresTech: "bioengineering", src: "lab"
        },
        swamp_fishery: {
            id: "swamp_fishery", name: "습지 양식장",
            cost: { money: 180, energy: 2, carbon: 0, population: 3, food: 0 },
            terrains: ["swamp"],
            base: { money: 8, energy: -1, carbon: 0, population: 2, food: 12 },
            adjacency: {
                swamp_facility: { money: 2, energy: 0, carbon: 0, population: 0, food: 3 },
                water_treatment: { money: 1, energy: 0, carbon: 0, population: 0, food: 4 },
                market: { money: 4, energy: 0, carbon: 0, population: 0, food: 0 }
            },
            requiresTech: "controlled_env", src: "greenhouse"
        },
        // Ice 지형 추가 건물들
        ice_mining: {
            id: "ice_mining", name: "빙하 채굴소",
            cost: { money: 250, energy: 5, carbon: 2, population: 8, food: -2 },
            terrains: ["ice"],
            base: { money: 15, energy: -4, carbon: 1, population: 6, food: -1 },
            adjacency: {
                ice: { money: 5, energy: 2, carbon: 0, population: 0, food: 0 },
                ice_research_station: { money: 4, energy: 1, carbon: 0, population: 2, food: 0 },
                water_treatment: { money: 3, energy: 0, carbon: 0, population: 0, food: 3 }
            },
            requiresTech: "industrialization", src: "factory"
        },
        // Volcano 지형 추가 건물들
        volcano_forge: {
            id: "volcano_forge", name: "화산 제련소",
            cost: { money: 400, energy: 8, carbon: 5, population: 10, food: -3 },
            terrains: ["volcano"],
            base: { money: 25, energy: -6, carbon: 3, population: 8, food: -2 },
            adjacency: {
                volcano: { money: 8, energy: 3, carbon: 1, population: 0, food: 0 },
                geothermal: { money: 6, energy: 4, carbon: -1, population: 0, food: 0 },
                factory: { money: 5, energy: 0, carbon: 2, population: 0, food: 0 }
            },
            requiresTech: "green_manufacturing", src: "factory"
        },
        volcano_spa: {
            id: "volcano_spa", name: "화산 온천 리조트",
            cost: { money: 280, energy: 2, carbon: -1, population: 12, food: -4 },
            terrains: ["volcano"],
            base: { money: 20, energy: -1, carbon: -2, population: 8, food: -3 },
            adjacency: {
                volcano: { money: 6, energy: 2, carbon: -1, population: 2, food: 0 },
                geothermal: { money: 4, energy: 3, carbon: 0, population: 1, food: 0 },
                park: { money: 3, energy: 0, carbon: -2, population: 3, food: 0 }
            },
            requiresTech: "urban_planning", src: "apartment"
        },
        // Canyon 지형 추가 건물들
        canyon_windcatcher: {
            id: "canyon_windcatcher", name: "협곡 풍력 집진기",
            cost: { money: 220, energy: 0, carbon: -4, population: 0, food: 0 },
            terrains: ["canyon"],
            base: { money: 0, energy: 18, carbon: -6, population: 0, food: 0 },
            adjacency: {
                canyon: { money: 0, energy: 6, carbon: -1, population: 0, food: 0 },
                canyon_observatory: { money: 2, energy: 2, carbon: 0, population: 0, food: 0 },
                windmill: { money: 0, energy: 4, carbon: -1, population: 0, food: 0 }
            },
            requiresTech: "wind_power", src: "windmill"
        },
        canyon_echo_lab: {
            id: "canyon_echo_lab", name: "협곡 음향 연구소",
            cost: { money: 350, energy: 3, carbon: 0, population: 6, food: -2 },
            terrains: ["canyon"],
            base: { money: 22, energy: -2, carbon: 0, population: 4, food: -1 },
            adjacency: {
                canyon: { money: 7, energy: 1, carbon: 0, population: 1, food: 0 },
                canyon_observatory: { money: 8, energy: 2, carbon: 0, population: 0, food: 0 },
                university: { money: 5, energy: 1, carbon: 0, population: 2, food: 0 }
            },
            requiresTech: "basic_research", src: "lab"
        },
        // 우주 건물들
        space_station: {
            id: "space_station", name: "우주 정거장",
            cost: { money: 2000, energy: 50, carbon: 5, population: 20, food: -10 },
            terrains: ["plateau", "mountain"],
            base: { money: 0, energy: -15, carbon: 3, population: 15, food: -8 },
            adjacency: {
                lab: { money: 15, energy: 5, carbon: 0, population: 0, food: 0 },
                university: { money: 20, energy: 8, carbon: 0, population: 5, food: 0 },
                nuclear_plant: { money: 10, energy: 20, carbon: 0, population: 0, food: 0 },
                space_station: { money: 25, energy: 15, carbon: 0, population: 10, food: 0 }
            },
            specialAbility: {
                condition: "adjacency >= base*2",
                name: "우주 연구 가속",
                description: "우주 관련 기술 연구 비용 50% 할인",
                effect: { type: "boost", target: "Space", multiplier: 0.5 }
            },
            requiresTech: "artificial_intelligence", src: "space_station",
        },
        lunar_base: {
            id: "lunar_base", name: "달 기지",
            cost: { money: 8000, energy: 100, carbon: -5, population: 50, food: -25 },
            terrains: ["plateau", "mountain", "desert"],
            base: { money: 50, energy: -30, carbon: -8, population: 40, food: -20 },
            adjacency: {
                space_station: { money: 40, energy: 25, carbon: -5, population: 20, food: 0 },
                lab: { money: 30, energy: 10, carbon: 0, population: 0, food: 0 },
                nuclear_plant: { money: 20, energy: 40, carbon: 0, population: 0, food: 0 }
            },
            requiresTech: "terraforming", src: "lunar_base"
        },
        mars_colony: {
            id: "mars_colony", name: "화성 식민지",
            cost: { money: 15000, energy: 200, carbon: -10, population: 100, food: -50 },
            terrains: ["plateau", "mountain", "desert", "tundra"],
            base: { money: 100, energy: -50, carbon: -15, population: 80, food: -40 },
            adjacency: {
                lunar_base: { money: 60, energy: 30, carbon: -8, population: 30, food: 0 },
                space_station: { money: 50, energy: 20, carbon: -5, population: 25, food: 0 },
                geothermal: { money: 30, energy: 25, carbon: 0, population: 0, food: 0 }
            },
            requiresTech: "cosmic_civilization", src: "mars_colony"
        },
    },
    techs: {
        /* ===== 티어1: 기초만 남김 ===== */
        energy_basics: {
            id: "energy_basics", name: "에너지 기초",
            description: "발전 인프라의 기초를 다진다",
            cost: { money: 80, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: [], unlocks: [], category: "Energy", tier: 1
        },
        civic_basics: {
            id: "civic_basics", name: "도시 기초",
            description: "단독주택과 산장 해금",
            cost: { money: 80, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: [], unlocks: ["house", "mountain_lodge"], category: "Civic", tier: 1
        },
        industry_basics: {
            id: "industry_basics", name: "산업 기초",
            description: "산업 인프라의 기초를 다진다",
            cost: { money: 80, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: [], unlocks: [], category: "Industry", tier: 1
        },
        basic_agriculture: {
            id: "basic_agriculture", name: "기초 농업",
            description: "농장과 텐트 해금",
            cost: { money: 100, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: [], unlocks: ["farm", "tent"], category: "Agriculture", tier: 1
        },
        /* ===== 해금 분산: 티어2~5 ===== */
        /* 티어2: 도시·에너지·산업 1단계 해금 */
        basic_commerce: {
            id: "basic_commerce", name: "기초 상업",
            description: "시장과 공원 해금",
            cost: { money: 120, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["civic_basics"], unlocks: ["market", "park"], category: "Civic", tier: 2
        },
        urban_planning: {
            id: "urban_planning", name: "도시 계획",
            description: "아파트, 툰드라 정착지, 화산 온천 리조트 해금",
            cost: { money: 200, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["civic_basics"], unlocks: ["apartment", "tundra_settlement", "volcano_spa"], category: "Civic", tier: 2
        },
        basic_research: {
            id: "basic_research", name: "기초 연구",
            description: "대학교, 극지 연구소, 협곡 음향 연구소 해금",
            cost: { money: 300, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["urban_planning"], unlocks: ["university", "lab", "geothermal", "ice_research_station", "canyon_echo_lab"], category: "Civic", tier: 3
        },
        water_purification: {
            id: "water_purification", name: "정수 기술",
            description: "정수 처리장 해금",
            cost: { money: 130, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["basic_agriculture"], unlocks: ["water_treatment"], category: "Utilities", tier: 2
        },
        wind_power: {
            id: "wind_power", name: "풍력 발전",
            description: "풍력 터빈과 협곡 풍력 집진기 해금",
            cost: { money: 180, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["energy_basics"], unlocks: ["windmill", "canyon_windcatcher"], category: "Energy", tier: 2
        },
        solar_farming: {
            id: "solar_farming", name: "태양광 발전",
            description: "태양광 발전소와 사막 전초기지 해금",
            cost: { money: 180, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["energy_basics"], unlocks: ["solar_panel", "desert_outpost"], category: "Energy", tier: 2
        },
        fossil_energy: {
            id: "fossil_energy", name: "화석 에너지",
            description: "석탄 발전소 해금",
            cost: { money: 60, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["energy_basics"], unlocks: ["coalplant"], category: "Energy", tier: 2
        },
        industrialization: {
            id: "industrialization", name: "산업화",
            description: "공장과 빙하 채굴소 해금",
            cost: { money: 400, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["industry_basics"], unlocks: ["factory", "ice_mining"], category: "Industry", tier: 3
        },
        controlled_env: {
            id: "controlled_env", name: "환경 제어",
            description: "온실과 습지 양식장 해금",
            cost: { money: 350, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["basic_agriculture"], unlocks: ["greenhouse", "swamp_fishery"], category: "Agriculture", tier: 3
        },
        /* 티어3~5 에너지/산업 상위 해금 */
        urban_agri: {
            id: "urban_agri", name: "도시 농업",
            description: "수직 농장 해금",
            cost: { money: 400, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["controlled_env"], unlocks: ["vertical_farm"], category: "Agriculture", tier: 3
        },
        geothermal_engineering: {
            id: "geothermal_engineering", name: "지열 공학",
            description: "지열 발전소와 극지 온수 발전소 해금",
            cost: { money: 180, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["wind_power"], unlocks: ["geothermal", "ice_thermal_plant"], category: "Energy", tier: 3
        },
        green_manufacturing: {
            id: "green_manufacturing", name: "친환경 제조",
            description: "친환경 공장 해금",
            cost: { money: 400, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["industrialization"], unlocks: ["green_factory"], category: "Industry", tier: 3
        },
        circular_economy: {
            id: "circular_economy", name: "자원 순환",
            description: "재활용 센터 해금",
            cost: { money: 600, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["green_manufacturing"], unlocks: ["recycling_center"], category: "Industry", tier: 4
        },
        nuclear: {
            id: "nuclear", name: "원자력",
            description: "원자력 발전소 해금",
            cost: { money: 800, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["geothermal_engineering"], unlocks: ["nuclear_plant"], category: "Energy", tier: 5
        },
        /* ===== 반복 업글 → ‘마스터리’ 5단계로 축약 ===== */
        /* 농업 마스터리(티어2/3/4/6/8) */
        ag_mastery_1: {
            id: "ag_mastery_1", name: "농업 마스터리 I", description: "농업 전반 효율 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["controlled_env"], unlocks: [], category: "Agriculture", tier: 2,
            effects: [
                { type: "production_multiplier", target: "farm", multiplier: 1.3 },
                { type: "production_multiplier", target: "greenhouse", multiplier: 1.3 },
                { type: "production_multiplier", target: "vertical_farm", multiplier: 1.3 }
            ]
        },
        ag_mastery_2: {
            id: "ag_mastery_2", name: "농업 마스터리 II", description: "농업 전반 효율 대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ag_mastery_1"], unlocks: [], category: "Agriculture", tier: 3,
            effects: [
                { type: "production_multiplier", target: "farm", multiplier: 1.7 },
                { type: "production_multiplier", target: "greenhouse", multiplier: 1.7 },
                { type: "production_multiplier", target: "vertical_farm", multiplier: 1.7 }
            ]
        },
        ag_mastery_3: {
            id: "ag_mastery_3", name: "농업 마스터리 III", description: "농업 전반 효율 크게 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ag_mastery_2"], unlocks: [], category: "Agriculture", tier: 4,
            effects: [
                { type: "production_multiplier", target: "farm", multiplier: 2.3 },
                { type: "production_multiplier", target: "greenhouse", multiplier: 2.3 },
                { type: "production_multiplier", target: "vertical_farm", multiplier: 2.3 }
            ]
        },
        ag_mastery_4: {
            id: "ag_mastery_4", name: "농업 마스터리 IV", description: "농업 전반 효율 초대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ag_mastery_3"], unlocks: [], category: "Agriculture", tier: 6,
            effects: [
                { type: "production_multiplier", target: "farm", multiplier: 3.2 },
                { type: "production_multiplier", target: "greenhouse", multiplier: 3.2 },
                { type: "production_multiplier", target: "vertical_farm", multiplier: 3.2 }
            ]
        },
        ag_mastery_5: {
            id: "ag_mastery_5", name: "농업 마스터리 V", description: "농업 전반 효율 최종 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ag_mastery_4"], unlocks: [], category: "Agriculture", tier: 8,
            effects: [
                { type: "production_multiplier", target: "farm", multiplier: 4.5 },
                { type: "production_multiplier", target: "greenhouse", multiplier: 4.5 },
                { type: "production_multiplier", target: "vertical_farm", multiplier: 4.5 }
            ]
        },
        /* 재생에너지 마스터리(티어2/3/4/6/8) */
        re_mastery_1: {
            id: "re_mastery_1", name: "재생에너지 마스터리 I", description: "풍력·태양광·지열 효율 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["wind_power", "solar_farming"], unlocks: [], category: "Energy", tier: 2,
            effects: [
                { type: "production_multiplier", target: "windmill", multiplier: 1.35 },
                { type: "production_multiplier", target: "solar_panel", multiplier: 1.35 },
                { type: "production_multiplier", target: "geothermal", multiplier: 1.35 }
            ]
        },
        re_mastery_2: {
            id: "re_mastery_2", name: "재생에너지 마스터리 II", description: "재생에너지 효율 대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["re_mastery_1"], unlocks: [], category: "Energy", tier: 3,
            effects: [
                { type: "production_multiplier", target: "windmill", multiplier: 1.9 },
                { type: "production_multiplier", target: "solar_panel", multiplier: 1.9 },
                { type: "production_multiplier", target: "geothermal", multiplier: 1.9 }
            ]
        },
        re_mastery_3: {
            id: "re_mastery_3", name: "재생에너지 마스터리 III", description: "재생에너지 효율 크게 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["re_mastery_2"], unlocks: [], category: "Energy", tier: 4,
            effects: [
                { type: "production_multiplier", target: "windmill", multiplier: 2.6 },
                { type: "production_multiplier", target: "solar_panel", multiplier: 2.6 },
                { type: "production_multiplier", target: "geothermal", multiplier: 2.6 }
            ]
        },
        re_mastery_4: {
            id: "re_mastery_4", name: "재생에너지 마스터리 IV", description: "재생에너지 초대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["re_mastery_3"], unlocks: [], category: "Energy", tier: 6,
            effects: [
                { type: "production_multiplier", target: "windmill", multiplier: 3.7 },
                { type: "production_multiplier", target: "solar_panel", multiplier: 3.7 },
                { type: "production_multiplier", target: "geothermal", multiplier: 3.7 }
            ]
        },
        re_mastery_5: {
            id: "re_mastery_5", name: "재생에너지 마스터리 V", description: "재생에너지 최종 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["re_mastery_4"], unlocks: [], category: "Energy", tier: 8,
            effects: [
                { type: "production_multiplier", target: "windmill", multiplier: 5.2 },
                { type: "production_multiplier", target: "solar_panel", multiplier: 5.2 },
                { type: "production_multiplier", target: "geothermal", multiplier: 5.2 }
            ]
        },
        /* 산업 마스터리(티어2/3/4/6/8) */
        ind_mastery_1: {
            id: "ind_mastery_1", name: "산업 마스터리 I", description: "산업 전반 효율 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["industrialization"], unlocks: [], category: "Industry", tier: 2,
            effects: [
                { type: "production_multiplier", target: "factory", multiplier: 1.2 }
            ]
        },
        ind_mastery_2: {
            id: "ind_mastery_2", name: "산업 마스터리 II", description: "산업 전반 효율 대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ind_mastery_1"], unlocks: [], category: "Industry", tier: 3,
            effects: [
                { type: "production_multiplier", target: "factory", multiplier: 1.6 },
                { type: "production_multiplier", target: "green_factory", multiplier: 1.6 }
            ]
        },
        ind_mastery_3: {
            id: "ind_mastery_3", name: "산업 마스터리 III", description: "산업 전반 효율 크게 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ind_mastery_2"], unlocks: [], category: "Industry", tier: 4,
            effects: [
                { type: "production_multiplier", target: "factory", multiplier: 2.2 },
                { type: "production_multiplier", target: "green_factory", multiplier: 2.2 },
                { type: "production_multiplier", target: "recycling_center", multiplier: 2.2 }
            ]
        },
        ind_mastery_4: {
            id: "ind_mastery_4", name: "산업 마스터리 IV", description: "산업 전반 효율 초대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ind_mastery_3"], unlocks: [], category: "Industry", tier: 6,
            effects: [
                { type: "production_multiplier", target: "factory", multiplier: 2.9 },
                { type: "production_multiplier", target: "green_factory", multiplier: 2.9 },
                { type: "production_multiplier", target: "recycling_center", multiplier: 2.9 }
            ]
        },
        ind_mastery_5: {
            id: "ind_mastery_5", name: "산업 마스터리 V", description: "산업 전반 효율 최종 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ind_mastery_4"], unlocks: [], category: "Industry", tier: 8,
            effects: [
                { type: "production_multiplier", target: "factory", multiplier: 4.0 },
                { type: "production_multiplier", target: "green_factory", multiplier: 4.0 },
                { type: "production_multiplier", target: "recycling_center", multiplier: 4.0 }
            ]
        },
        /* 시민(도시) 마스터리(티어2/3/4/6/8) */
        civic_mastery_1: {
            id: "civic_mastery_1", name: "도시 마스터리 I", description: "도시 건물 효율 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["urban_planning", "water_purification", "reforestation"], unlocks: [], category: "Civic", tier: 2,
            effects: [
                { type: "production_multiplier", target: "apartment", multiplier: 1.15 },
                { type: "production_multiplier", target: "water_treatment", multiplier: 1.15 },
                { type: "production_multiplier", target: "park", multiplier: 1.15 }
            ]
        },
        civic_mastery_2: {
            id: "civic_mastery_2", name: "도시 마스터리 II", description: "도시 건물 효율 대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["civic_mastery_1"], unlocks: [], category: "Civic", tier: 3,
            effects: [
                { type: "production_multiplier", target: "apartment", multiplier: 1.45 },
                { type: "production_multiplier", target: "water_treatment", multiplier: 1.45 },
                { type: "production_multiplier", target: "park", multiplier: 1.45 }
            ]
        },
        civic_mastery_3: {
            id: "civic_mastery_3", name: "도시 마스터리 III", description: "도시 건물 효율 크게 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["civic_mastery_2"], unlocks: [], category: "Civic", tier: 4,
            effects: [
                { type: "production_multiplier", target: "apartment", multiplier: 1.9 },
                { type: "production_multiplier", target: "water_treatment", multiplier: 1.9 },
                { type: "production_multiplier", target: "park", multiplier: 1.9 },
                { type: "production_multiplier", target: "market", multiplier: 1.9 }
            ]
        },
        civic_mastery_4: {
            id: "civic_mastery_4", name: "도시 마스터리 IV", description: "도시 건물 효율 초대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["civic_mastery_3"], unlocks: [], category: "Civic", tier: 6,
            effects: [
                { type: "production_multiplier", target: "apartment", multiplier: 2.6 },
                { type: "production_multiplier", target: "water_treatment", multiplier: 2.6 },
                { type: "production_multiplier", target: "park", multiplier: 2.6 },
                { type: "production_multiplier", target: "market", multiplier: 2.6 }
            ]
        },
        civic_mastery_5: {
            id: "civic_mastery_5", name: "도시 마스터리 V", description: "도시 건물 효율 최종 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["civic_mastery_4"], unlocks: [], category: "Civic", tier: 8,
            effects: [
                { type: "production_multiplier", target: "apartment", multiplier: 3.6 },
                { type: "production_multiplier", target: "water_treatment", multiplier: 3.6 },
                { type: "production_multiplier", target: "park", multiplier: 3.6 },
                { type: "production_multiplier", target: "market", multiplier: 3.6 }
            ]
        },
        /* 연구/스마트시티 */
        smart_city: {
            id: "smart_city", name: "스마트 시티",
            description: "도시 네트워크 최적화로 시장·주거 효율이 향상된다",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["urban_planning", "basic_commerce", "water_purification"], unlocks: [], category: "Civic", tier: 4,
            effects: [
                { type: "production_multiplier", target: "market", multiplier: 1.2 },
                { type: "production_multiplier", target: "apartment", multiplier: 1.1 }
            ]
        },
        lab_mastery_1: {
            id: "lab_mastery_1", name: "연구소 마스터리 I", description: "연구소 효율 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["industrialization"], unlocks: [], category: "Utilities", tier: 4,
            effects: [{ type: "production_multiplier", target: "lab", multiplier: 1.2 }]
        },
        lab_mastery_2: {
            id: "lab_mastery_2", name: "연구소 마스터리 II", description: "연구소 효율 대폭 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["lab_mastery_1"], unlocks: [], category: "Utilities", tier: 6,
            effects: [{ type: "production_multiplier", target: "lab", multiplier: 1.6 }]
        },
        lab_mastery_3: {
            id: "lab_mastery_3", name: "연구소 마스터리 III", description: "연구소 효율 최종 상승",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["lab_mastery_2"], unlocks: [], category: "Utilities", tier: 8,
            effects: [{ type: "production_multiplier", target: "lab", multiplier: 2.1 }]
        },
        /* 원자력 특화(티어6/8/10) */
        nuclear_mastery_1: {
            id: "nuclear_mastery_1", name: "원자력 개선 I", description: "원자력 발전 최적화",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["nuclear"], unlocks: [], category: "Energy", tier: 6,
            effects: [{ type: "production_multiplier", target: "nuclear_plant", multiplier: 1.2 }]
        },
        nuclear_mastery_2: {
            id: "nuclear_mastery_2", name: "원자력 개선 II", description: "원자력 발전 고효율화",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["nuclear_mastery_1"], unlocks: [], category: "Energy", tier: 8,
            effects: [{ type: "production_multiplier", target: "nuclear_plant", multiplier: 1.5 }]
        },
        nuclear_mastery_3: {
            id: "nuclear_mastery_3", name: "원자력 개선 III", description: "원자력 발전 최대 효율",
            cost: { money: 0, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["nuclear_mastery_2"], unlocks: [], category: "Energy", tier: 10,
            effects: [{ type: "production_multiplier", target: "nuclear_plant", multiplier: 2.0 }]
        },
        /* ===== 새로운 카테고리: 환경 기술 ===== */
        ecosystem_science: {
            id: "ecosystem_science", name: "생태학",
            description: "환경 마을 해금",
            cost: { money: 80, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: [], unlocks: ["ecovillage"], category: "Environment", tier: 1
        },
        bioengineering: {
            id: "bioengineering", name: "생명공학",
            description: "산림 보호구역과 습지 생명과학 연구소 해금",
            cost: { money: 250, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["ecosystem_science", "controlled_env"], unlocks: ["forest_reserve", "swamp_biolab"], category: "Environment", tier: 3
        },
        carbon_capture: {
            id: "carbon_capture", name: "탄소 포집",
            description: "대기 중 탄소를 직접 제거하는 기술",
            cost: { money: 300, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["bioengineering", "nuclear"], unlocks: [], category: "Environment", tier: 6,
            effects: [
                { type: "global_carbon_reduction", amount: -2 },
                { type: "production_multiplier", target: "forest_reserve", multiplier: 1.5 }
            ]
        },
        climate_engineering: {
            id: "climate_engineering", name: "기후 공학",
            description: "전 지구 기후 시스템을 조절한다",
            cost: { money: 500, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["carbon_capture"], unlocks: [], category: "Environment", tier: 9,
            effects: [
                { type: "disaster_resistance", amount: 0.3 },
                { type: "global_carbon_reduction", amount: -5 }
            ]
        },
        /* ===== 컴퓨터/AI 기술 트리 (7-12티어) ===== */
        computer_basics: {
            id: "computer_basics", name: "컴퓨터 기초",
            description: "디지털 시대의 첫걸음을 내딛는다. 모든 건물 효율 +5%",
            cost: { money: 200, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["lab_mastery_1"], unlocks: [], category: "Technology", tier: 7,
            effects: [
                { type: "production_multiplier", target: "lab", multiplier: 1.2 },
                { type: "tech_cost_reduction", amount: 0.05 },
                { type: "global_production_multiplier", amount: 0.05 }
            ]
        },
        programming: {
            id: "programming", name: "프로그래밍",
            description: "소프트웨어로 세상을 바꾸는 힘을 얻는다. 모든 건물 효율 +10%",
            cost: { money: 300, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["computer_basics"], unlocks: [], category: "Technology", tier: 8,
            effects: [
                { type: "production_multiplier", target: "lab", multiplier: 1.4 },
                { type: "production_multiplier", target: "factory", multiplier: 1.2 },
                { type: "global_production_multiplier", amount: 0.10 }
            ]
        },
        data_analysis: {
            id: "data_analysis", name: "데이터 분석",
            description: "빅데이터로 패턴을 발견하고 효율성을 높인다. 모든 건물 효율 +15%",
            cost: { money: 400, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["programming"], unlocks: [], category: "Technology", tier: 9,
            effects: [
                { type: "production_multiplier", target: "lab", multiplier: 1.6 },
                { type: "adjacency_bonus_multiplier", amount: 1.1 },
                { type: "tech_cost_reduction", amount: 0.1 },
                { type: "global_production_multiplier", amount: 0.15 }
            ]
        },
        machine_learning: {
            id: "machine_learning", name: "머신 러닝",
            description: "컴퓨터가 스스로 학습하는 시대를 연다. 모든 건물 효율 +20%",
            cost: { money: 600, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["data_analysis"], unlocks: ["university"], category: "Technology", tier: 10,
            effects: [
                { type: "production_multiplier", target: "lab", multiplier: 1.8 },
                { type: "production_multiplier", target: "university", multiplier: 1.3 },
                { type: "tech_cost_reduction", amount: 0.15 },
                { type: "global_production_multiplier", amount: 0.20 }
            ]
        },
        artificial_intelligence: {
            id: "artificial_intelligence", name: "인공지능",
            description: "AI가 모든 시스템을 지능적으로 최적화한다. 모든 건물 효율 +30%",
            cost: { money: 800, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["machine_learning"], unlocks: ["space_station"], category: "Technology", tier: 11,
            effects: [
                { type: "production_multiplier", target: "university", multiplier: 1.8 },
                { type: "adjacency_bonus_multiplier", amount: 1.3 },
                { type: "tech_cost_reduction", amount: 0.2 },
                { type: "disaster_resistance", amount: 0.15 },
                { type: "global_carbon_reduction", amount: -2 },
                { type: "global_production_multiplier", amount: 0.30 }
            ]
        },
        quantum_computing: {
            id: "quantum_computing", name: "양자 컴퓨팅",
            description: "양자역학으로 컴퓨팅의 한계를 뛰어넘는다. 모든 건물 효율 +40%",
            cost: { money: 1200, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["artificial_intelligence"], unlocks: [], category: "Technology", tier: 12,
            effects: [
                { type: "production_multiplier", target: "university", multiplier: 2.5 },
                { type: "tech_cost_reduction", amount: 0.25 },
                { type: "adjacency_bonus_multiplier", amount: 1.5 },
                { type: "global_carbon_reduction", amount: -3 },
                { type: "disaster_resistance", amount: 0.2 },
                { type: "global_production_multiplier", amount: 0.40 }
            ]
        },
        /* ===== 승리를 위한 선행 기술들 (13-14티어) ===== */
        advanced_robotics: {
            id: "advanced_robotics", name: "고급 로봇공학",
            description: "AI와 로봇이 모든 작업을 자동화한다.",
            cost: { money: 2000, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["quantum_computing", "green_manufacturing"], unlocks: [], category: "Technology", tier: 13,
            effects: [
                { type: "production_multiplier", target: "factory", multiplier: 3.0 },
                { type: "production_multiplier", target: "green_factory", multiplier: 3.0 },
                { type: "global_carbon_reduction", amount: -3 }
            ]
        },
        neural_networks: {
            id: "neural_networks", name: "신경망 네트워크",
            description: "인간의 뇌를 모방한 초지능 AI를 개발한다",
            cost: { money: 2500, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["quantum_computing", "climate_engineering"], unlocks: [], category: "Technology", tier: 13,
            effects: [
                { type: "production_multiplier", target: "university", multiplier: 3.5 },
                { type: "adjacency_bonus_multiplier", amount: 1.8 },
                { type: "disaster_resistance", amount: 0.5 }
            ]
        },
        space_program: {
            id: "space_program", name: "우주 프로그램",
            description: "우주 개발의 첫걸음을 내딛는다",
            cost: { money: 1500, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["nuclear", "artificial_intelligence"], unlocks: [], category: "Space", tier: 12,
            effects: [
                { type: "global_energy_bonus", amount: 5 },
                { type: "global_money_bonus", amount: 3 }
            ]
        },
        orbital_solar: {
            id: "orbital_solar", name: "궤도 태양광",
            description: "우주에서 초대량의 태양 에너지를 수집한다",
            cost: { money: 3000, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["space_program", "advanced_robotics"], unlocks: [], category: "Space", tier: 13,
            effects: [
                { type: "production_multiplier", target: "solar_panel", multiplier: 4.0 },
                { type: "global_energy_bonus", amount: 20 }
            ]
        },
        terraforming: {
            id: "terraforming", name: "테라포밍",
            description: "행성 환경을 지구와 같이 개조하는 기술",
            cost: { money: 4000, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["neural_networks", "climate_engineering"], unlocks: ["lunar_base"], category: "Space", tier: 12,
            effects: [
                { type: "global_carbon_reduction", amount: -10 },
                { type: "disaster_resistance", amount: 0.5 },
                { type: "terrain_bonus", target: "desert", multiplier: 2.0 },
                { type: "terrain_bonus", target: "tundra", multiplier: 2.0 }
            ]
        },
        galactic_expansion: {
            id: "galactic_expansion", name: "은하 확장",
            description: "은하계 전체로 문명을 확장한다",
            cost: { money: 8000, energy: 2000, carbon: -1000, population: 500, food: 2000 },
            prereq: ["orbital_solar", "terraforming"], unlocks: ["mars_colony"], category: "Space", tier: 14,
            effects: [
                { type: "global_energy_bonus", amount: 50 },
                { type: "global_money_bonus", amount: 30 },
                { type: "global_population_bonus", amount: 100 }
            ]
        },
        cosmic_civilization: {
            id: "cosmic_civilization", name: "우주 문명",
            description: "우주 전체에 걸친 고도 문명을 건설한다. 과학 승리!",
            cost: { money: 20000, energy: 5000, carbon: -2000, population: 1000, food: 5000 },
            prereq: ["galactic_expansion"], unlocks: [], category: "Space", tier: 15,
            effects: [
                { type: "victory_condition", name: "science_victory" }
            ]
        },
        /* ===== 승리 조건 기술들 (15티어) ===== */
        singularity: {
            id: "singularity", name: "기술적 특이점",
            description: "AI가 인간의 지능을 뛰어넘어 새로운 문명을 연다. 인구 생산 효율 +100%",
            cost: { money: 50000, energy: 15000, carbon: -5000, population: 2500, food: 10000 },
            prereq: ["neural_networks", "quantum_computing", "orbital_solar", "terraforming"], unlocks: [], category: "Technology", tier: 15,
            effects: [
                { type: "production_multiplier", target: "population", multiplier: 2.0 },
                { type: "victory_condition", name: "technological_singularity" }
            ]
        },
        /* ===== 융합 기술 분기 ===== */
        bio_solar: {
            id: "bio_solar", name: "바이오 태양광",
            description: "생물학적 광합성을 모방한 발전 기술",
            cost: { money: 300, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["bioengineering", "solar_farming"], unlocks: [], category: "Energy", tier: 5,
            effects: [
                { type: "terrain_bonus", terrain: "forest", building: "solar_panel", multiplier: 1.8 },
                { type: "production_multiplier", target: "solar_panel", multiplier: 1.3 }
            ]
        },
        nano_agriculture: {
            id: "nano_agriculture", name: "나노 농업",
            description: "나노기술로 작물 성장을 가속화한다",
            cost: { money: 400, energy: 0, carbon: 0, population: 0, food: 0 },
            prereq: ["artificial_intelligence", "ag_mastery_3"], unlocks: [], category: "Agriculture", tier: 7,
            effects: [
                { type: "production_multiplier", target: "vertical_farm", multiplier: 2.2 },
                { type: "complex_condition_bonus", condition: "desert_water_synergy", multiplier: 1.5 }
            ]
        },
        /* ===== 우주 정거장 강화 기술들 ===== */
        space_optimization: {
            id: "space_optimization", name: "우주 정거장 최적화",
            description: "우주 정거장의 효율성을 대폭 개선한다",
            cost: { money: 4000, energy: 100, carbon: 0, population: 50, food: 0 },
            prereq: ["space_program"], unlocks: [], category: "Space", tier: 13,
            effects: [
                { type: "production_multiplier", target: "space_station", multiplier: 1.5 },
                { type: "production_multiplier", target: "lunar_base", multiplier: 1.3 },
                { type: "production_multiplier", target: "mars_colony", multiplier: 1.2 }
            ]
        },
        space_networking: {
            id: "space_networking", name: "우주 네트워킹",
            description: "우주 건물들 간의 연결성을 강화한다",
            cost: { money: 6000, energy: 150, carbon: 0, population: 75, food: 0 },
            prereq: ["space_optimization"], unlocks: [], category: "Space", tier: 14,
            effects: [
                { type: "adjacency_bonus_multiplier", target: "space_station", multiplier: 2.0 },
                { type: "adjacency_bonus_multiplier", target: "lunar_base", multiplier: 1.8 },
                { type: "adjacency_bonus_multiplier", target: "mars_colony", multiplier: 1.6 }
            ]
        },
        adaptive_terrain: {
            id: "adaptive_terrain", name: "지형 적응 기술",
            description: "우주 정거장을 더 다양한 지형에 건설할 수 있게 한다",
            cost: { money: 5000, energy: 120, carbon: 0, population: 60, food: 0 },
            prereq: ["space_optimization"], unlocks: [], category: "Space", tier: 14,
            effects: [
                { type: "terrain_expansion", target: "space_station", terrains: ["desert", "tundra", "ice"] },
                { type: "terrain_bonus", terrain: "ice", building: "space_station", multiplier: 1.3 },
                { type: "terrain_bonus", terrain: "tundra", building: "space_station", multiplier: 1.2 }
            ]
        }
    },
    climateEvents: [
        { id: "drought", name: "Drought", type: "disaster", severity: "S1-3", description: "Water scarcity reduces food", image: "e-drought.png", duration: 4, prediction: 5, condition: (s) => biomeShare(s, ["desert", "plateau", "oasis"]) > 0.15, probability: (s) => 0.05 + Math.min(0.25, 0.3 * biomeShare(s, ["desert", "plateau"])), intensity: (s) => clamp(1 + Math.floor(biomeShare(s, ["desert", "plateau"]) * 5), 1, 3), effects: (n) => ({ money: 0, energy: 0, carbon: 0, population: 0, food: -2 * n }) },
        { id: "flood", name: "Flood", type: "disaster", severity: "S1-3", description: "Rivers overflow", image: "e-flood.png", duration: 3, prediction: 3, condition: (s) => riverTiles(s) > 10, probability: (s) => 0.04 + Math.min(0.2, riverTiles(s) / 120), intensity: (s) => clamp(1 + Math.floor(riverTiles(s) / 50), 1, 3), effects: (n) => ({ money: -3 * n, energy: 0, carbon: 1 * n, population: -1 * n, food: -2 * n }) },
        { id: "heatwave", name: "Heatwave", type: "disaster", severity: "S1-2", description: "Energy demand spikes", image: "e-heatwave.png", duration: 2, prediction: 2, condition: (s) => biomeShare(s, ["desert", "tropical"]) > 0.25, probability: (s) => 0.05 + 0.2 * biomeShare(s, ["desert", "tropical"]), intensity: (s) => 1 + ((biomeShare(s, ["desert"]) > 0.2 ? 1 : 0)), effects: (n) => ({ money: -1 * n, energy: -3 * n, carbon: 2 * n, population: 0, food: -1 * n }) },
        { id: "wildfire", name: "Wildfire", type: "disaster", severity: "S1-3", description: "Forests burn", image: "e-wildfire.png", duration: 3, prediction: 3, condition: (s) => biomeShare(s, ["forest", "tropical"]) > 0.2, probability: (s) => 0.03 + 0.25 * biomeShare(s, ["forest"]), intensity: (s) => clamp(1 + Math.floor(biomeShare(s, ["forest"]) * 4), 1, 3), effects: (n) => ({ money: -2 * n, energy: 0, carbon: 4 * n, population: -1 * n, food: -1 * n }) },
        { id: "green_boom", name: "Green Innovation", type: "blessing", severity: "B1-2", description: "Clean energy surge", image: "e-green-boom.png", duration: 3, prediction: 2, condition: (s) => countBuildings(s, "windmill") + countBuildings(s, "solar_panel") >= 3, probability: (s) => 0.04 + 0.1 * Math.min(1, (countBuildings(s, "windmill") + countBuildings(s, "solar_panel")) / 10), intensity: (s) => 1 + ((countBuildings(s, "windmill") >= 2 && countBuildings(s, "solar_panel") >= 2) ? 1 : 0), effects: (n) => ({ money: 2 * n, energy: 4 * n, carbon: -3 * n, population: 0, food: 0 }) },
        { id: "migration", name: "Climate Migration", type: "blessing", severity: "B1-2", description: "Population inflow", image: "e-migration.png", duration: 4, prediction: 4, condition: (s) => s.resources.food >= 50 && s.resources.carbon <= s.carbonLimit * 0.5, probability: (s) => 0.02 + Math.min(0.15, s.resources.food / 400), intensity: (s) => 1 + (s.resources.food > 100 ? 1 : 0), effects: (n) => ({ money: 0, energy: 0, carbon: 1 * n, population: 2 * n, food: -3 * n }) }
    ],
    mapGeneration: {
        generateScientificMap: (radius, seed) => {
            const rand = mulberry(seed);
            const tiles = new Map();
            const center = { q: 0, r: 0 };
            const positions = inRange(center, radius);
            const noise = makeNoise(rand());
            const elev = (q, r) => noise2(noise, q * 0.06, r * 0.06);
            const moist = (q, r) => noise2(noise, q * 0.05 + 100, r * 0.05 - 100);
            const latOf = (q, r) => { const y = (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r); return clamp(0.5 - y / (radius * 2.0), -1, 1); };
            const landFromClimate = (q, r) => {
                const lat = Math.abs(latOf(q, r));
                const e = elev(q, r);
                let m = moist(q, r);
                const dryness = (lat < 0.12) ? -0.35 : (lat < 0.22) ? -0.15 : (lat < 0.42) ? +0.25 : (lat < 0.70) ? 0.00 : +0.10;
                m -= dryness;
                const temp = noise2(noise, q * 0.03 + 200, r * 0.03 + 200);
                if (lat > 0.90)
                    return "ice";
                if (lat > 0.80)
                    return e > 0.2 ? "mountain" : "tundra";
                if (e > 0.65 && temp > 0.3)
                    return "volcano";
                if (e > 0.45)
                    return "mountain";
                if (e > 0.30 && m < -0.3)
                    return "canyon";
                if (e > 0.20)
                    return "plateau";
                if (lat < 0.12 && m > 0.4)
                    return "swamp";
                if (lat < 0.12)
                    return m > -0.05 ? "tropical" : "forest";
                if (lat < 0.22 && m < -0.1 && m > -0.35)
                    return "oasis";
                if (lat < 0.22)
                    return m > 0.10 ? "tropical" : "grass";
                if (lat < 0.42)
                    return m < 0.00 ? "desert" : "grass";
                return m > 0.15 ? "forest" : "grass";
            };
            positions.forEach(pos => {
                const key = `${pos.q},${pos.r}`;
                const e = elev(pos.q, pos.r);
                const water = e < -0.12;
                const terrain = water ? "water" : landFromClimate(pos.q, pos.r);
                tiles.set(key, { q: pos.q, r: pos.r, terrain: terrain, level: 1, revealed: false, explored: false });
            });
            const clusters = [];
            const visited = new Set();
            const isEdge = (q, r) => Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r)) === radius;
            tiles.forEach((t, key) => {
                if (t.terrain !== "water" || visited.has(key))
                    return;
                const q = t.q, r = t.r;
                const queue = [[q, r]];
                const keys = [];
                let touches = false;
                visited.add(key);
                while (queue.length) {
                    const p = queue.shift();
                    const [cq, cr] = p;
                    const ck = `${cq},${cr}`;
                    keys.push(ck);
                    if (isEdge(cq, cr))
                        touches = true;
                    adjacentKeys(cq, cr).forEach(nk => {
                        if (!visited.has(nk)) {
                            const nt = tiles.get(nk);
                            if (nt && nt.terrain === "water") {
                                visited.add(nk);
                                const parts = nk.split(",");
                                const nq = Number(parts[0] ?? 0);
                                const nr = Number(parts[1] ?? 0);
                                queue.push([nq, nr]);
                            }
                        }
                    });
                }
                clusters.push({ keys, size: keys.length, touches });
            });
            clusters.sort((a, b) => b.size - a.size);
            const keep = new Set();
            const oceans = clusters.filter(c => c.touches);
            (oceans.length ? oceans : [clusters[0]].filter(Boolean)).forEach(c => c && c.keys.forEach(k => keep.add(k)));
            const lakeMax = Math.max(8, Math.floor(radius * radius * 0.01));
            let lakesLeft = 3;
            clusters.filter(c => !c.touches).forEach(c => { if (lakesLeft > 0 && c.size <= lakeMax) {
                c.keys.forEach(k => keep.add(k));
                lakesLeft--;
            } });
            tiles.forEach((t, key) => { if (t.terrain === "water" && !keep.has(key)) {
                const q = t.q, r = t.r;
                t.terrain = landFromClimate(q, r);
            } });
            carveCoasts(tiles);
            carveRivers(tiles, radius, rand);
            inRange(center, 1).forEach(p => { const t = tiles.get(`${p.q},${p.r}`); if (t) {
                t.revealed = true;
                t.explored = true;
            } });
            return tiles;
        }
    }
};
window.gameData = embeddedGameData;
let gameData;
let gameState;
let selectedBuilding = null;
let tutorialDock = null;
let tutorialIndex = 0;
// 인접 보너스 뷰어 함수들
const formatResourceValue = (value) => {
    if (value === 0)
        return "";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value}`;
};
const calculatePercentageBonus = (baseValue, bonusValue) => {
    if (baseValue === 0)
        return bonusValue > 0 ? `+${bonusValue}` : `${bonusValue}`;
    const percentage = (bonusValue / Math.abs(baseValue)) * 100;
    return percentage > 0 ? `+${percentage.toFixed(0)}%` : `${percentage.toFixed(0)}%`;
};
const showAdjacencyModal = (s) => {
    const modal = document.getElementById("adjacencyModal");
    const content = document.getElementById("adjacencyContent");
    content.innerHTML = "";
    // 모든 건물 수집 (기존 인접 보너스가 있거나 지형 보너스가 있는 건물들)
    const allBuildings = Object.values(s.buildings);
    allBuildings.forEach(building => {
        const hasTraditionalAdjacency = building.adjacency && Object.keys(building.adjacency).length > 0;
        const hasTerrainBonus = getTerrainBonusesForBuilding(building.id).length > 0;
        if (!hasTraditionalAdjacency && !hasTerrainBonus)
            return;
        const buildingDiv = document.createElement("div");
        buildingDiv.className = "bg-gray-700 p-4 rounded-lg mb-4";
        // 건물 이름과 기본 생산량
        const header = document.createElement("div");
        header.className = "flex items-center mb-3";
        header.innerHTML = `
      <div class="font-bold text-lg text-blue-300">${building.name}</div>
      <div class="ml-4 text-sm text-gray-300">
        기본: ${formatResourceValue(building.base.money)}💰 ${formatResourceValue(building.base.energy)}⚡ 
        ${formatResourceValue(building.base.carbon)}🌿 ${formatResourceValue(building.base.population)}👥 ${formatResourceValue(building.base.food)}🍎
      </div>
    `;
        buildingDiv.appendChild(header);
        // 전체 보너스 컨테이너
        const allBonusesDiv = document.createElement("div");
        allBonusesDiv.className = "space-y-4 ml-4";
        // 기존 건물 인접 보너스
        if (hasTraditionalAdjacency) {
            const traditionalSection = document.createElement("div");
            traditionalSection.innerHTML = `<h4 class="text-yellow-400 font-medium mb-2">🏠 건물 인접 보너스</h4>`;
            const bonusesDiv = document.createElement("div");
            bonusesDiv.className = "grid grid-cols-1 md:grid-cols-2 gap-2";
            Object.entries(building.adjacency).forEach(([adjacentBuildingId, bonus]) => {
                const adjacentBuilding = s.buildings[adjacentBuildingId];
                const adjacentName = adjacentBuilding ? adjacentBuilding.name : adjacentBuildingId;
                const bonusDiv = document.createElement("div");
                bonusDiv.className = "bg-gray-600 p-2 rounded text-sm";
                const bonusStrings = formatBonusStrings(bonus, building.base);
                bonusDiv.innerHTML = `
          <div class="font-medium text-yellow-300">🏠 ${adjacentName}</div>
          <div class="text-green-300">${bonusStrings.join(" ")}</div>
        `;
                bonusesDiv.appendChild(bonusDiv);
            });
            traditionalSection.appendChild(bonusesDiv);
            allBonusesDiv.appendChild(traditionalSection);
        }
        // 지형 인접 보너스
        if (hasTerrainBonus) {
            const terrainSection = document.createElement("div");
            terrainSection.innerHTML = `<h4 class="text-cyan-400 font-medium mb-2">🗺️ 지형 인접 보너스 (1칸/2칸 거리)</h4>`;
            const terrainBonusesDiv = document.createElement("div");
            terrainBonusesDiv.className = "grid grid-cols-1 md:grid-cols-2 gap-2";
            const terrainBonuses = getTerrainBonusesForBuilding(building.id);
            terrainBonuses.forEach(({ terrain, adjacentTerrain, bonus, distance }) => {
                const bonusDiv = document.createElement("div");
                bonusDiv.className = "bg-gray-600 p-2 rounded text-sm border-l-2 border-cyan-400";
                const distanceText = distance === 1 ? "1칸" : "2칸 (50% 효과)";
                const bonusStrings = formatBonusStrings(bonus, building.base);
                bonusDiv.innerHTML = `
          <div class="font-medium text-cyan-300">🗺️ ${getTerrainName(terrain)} → ${getTerrainName(adjacentTerrain)} (${distanceText})</div>
          <div class="text-green-300">${bonusStrings.join(" ")}</div>
        `;
                terrainBonusesDiv.appendChild(bonusDiv);
            });
            terrainSection.appendChild(terrainBonusesDiv);
            allBonusesDiv.appendChild(terrainSection);
        }
        buildingDiv.appendChild(allBonusesDiv);
        content.appendChild(buildingDiv);
    });
    modal.classList.remove("hidden");
};
// 보너스 문자열 포맷팅 헬퍼 함수
const formatBonusStrings = (bonus, base) => {
    const bonusStrings = [];
    if (bonus.money !== 0) {
        const percentage = calculatePercentageBonus(base.money, bonus.money);
        bonusStrings.push(`💰 ${formatResourceValue(bonus.money)} (${percentage})`);
    }
    if (bonus.energy !== 0) {
        const percentage = calculatePercentageBonus(base.energy, bonus.energy);
        bonusStrings.push(`⚡ ${formatResourceValue(bonus.energy)} (${percentage})`);
    }
    if (bonus.carbon !== 0) {
        const percentage = calculatePercentageBonus(base.carbon, bonus.carbon);
        bonusStrings.push(`🌿 ${formatResourceValue(bonus.carbon)} (${percentage})`);
    }
    if (bonus.population !== 0) {
        const percentage = calculatePercentageBonus(base.population, bonus.population);
        bonusStrings.push(`👥 ${formatResourceValue(bonus.population)} (${percentage})`);
    }
    if (bonus.food !== 0) {
        const percentage = calculatePercentageBonus(base.food, bonus.food);
        bonusStrings.push(`🍎 ${formatResourceValue(bonus.food)} (${percentage})`);
    }
    return bonusStrings;
};
// 건물의 지형 보너스 목록 가져오기
const getTerrainBonusesForBuilding = (buildingId) => {
    const bonuses = [];
    const terrains = ["grass", "mountain", "desert", "water", "forest", "tropical", "tundra", "swamp", "ice", "volcano", "canyon", "oasis", "plateau"];
    terrains.forEach(terrain => {
        terrains.forEach(adjTerrain => {
            const bonus1 = getEnhancedTerrainBonus(buildingId, terrain, adjTerrain, 1);
            if (!isEmptyProduction(bonus1)) {
                bonuses.push({ terrain, adjacentTerrain: adjTerrain, bonus: bonus1, distance: 1 });
            }
            const bonus2 = getEnhancedTerrainBonus(buildingId, terrain, adjTerrain, 2);
            if (!isEmptyProduction(bonus2)) {
                bonuses.push({ terrain, adjacentTerrain: adjTerrain, bonus: scaleProduction(bonus2, 2), distance: 2 }); // 2배로 표시 (실제 적용시엔 50%로 감소됨)
            }
        });
    });
    return bonuses;
};
// 지형 이름 번역
const getTerrainName = (terrain) => {
    const terrainNames = {
        grass: "잔디", mountain: "산", desert: "사막", water: "물",
        forest: "숲", tropical: "열대", tundra: "툰드라", swamp: "늪",
        ice: "얼음", volcano: "화산", canyon: "협곡", oasis: "오아시스", plateau: "고원"
    };
    return terrainNames[terrain] || terrain;
};
// 빈 생산량인지 확인
const isEmptyProduction = (prod) => {
    return prod.money === 0 && prod.energy === 0 && prod.carbon === 0 && prod.population === 0 && prod.food === 0;
};
// Auto mode variables
let autoMode = {
    enabled: false,
    interval: 500,
    timeoutId: null
};
// Gemini AI integration via API
let geminiActionQueue = [];
let isRequestingGemini = false;
const GEMINI_API_KEY = 'AIzaSyBDN8wmzhu2Oh1_DT7UVZ_Nti6m1VNo0Tc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
// Action tracking system for every turn
let gameActionHistory = [];
// Function declarations
const showScene = (id, reasons) => {
    document.getElementById(id)?.classList.remove("hidden");
    if (reasons) {
        const el = document.getElementById("endReason");
        if (el)
            el.innerHTML = reasons.join("<br>");
    }
    // Handle endScene video background
    if (id === "endScene") {
        const videoSource = document.getElementById("endVideoSource");
        const video = document.getElementById("endVideo");
        if (videoSource && video) {
            // Check if it's victory or defeat based on reasons
            const isVictory = reasons?.some(r => r.includes("승리") || r.includes("목표 달성"));
            const videoFile = isVictory ? "assets/video/victory.mp4" : "assets/video/defeat.mp4";
            videoSource.src = videoFile;
            video.load();
            video.play().catch(() => {
                // Fallback if video fails to play
                console.log("Video playback failed");
            });
        }
    }
};
const hideScene = (id) => {
    document.getElementById(id)?.classList.add("hidden");
};
// Opening video functions
const playOpeningVideo = (difficulty) => {
    const openingVideo = document.getElementById("openingVideo");
    const skipBtn = document.getElementById("skipOpeningBtn");
    // Show opening scene
    showScene("openingScene");
    // Setup video event listeners
    const onVideoEnd = () => {
        startGameAfterOpening(difficulty);
        cleanupOpeningVideo();
    };
    const onSkip = () => {
        openingVideo.pause();
        startGameAfterOpening(difficulty);
        cleanupOpeningVideo();
    };
    // Setup keyboard listener for space key
    const onKeyPress = (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            onSkip();
        }
    };
    // Add event listeners
    openingVideo.addEventListener('ended', onVideoEnd, { once: true });
    skipBtn.addEventListener('click', onSkip, { once: true });
    document.addEventListener('keydown', onKeyPress);
    // Store cleanup function for later use
    window.cleanupOpeningListeners = () => {
        openingVideo.removeEventListener('ended', onVideoEnd);
        skipBtn.removeEventListener('click', onSkip);
        document.removeEventListener('keydown', onKeyPress);
    };
    // Reset and play video
    openingVideo.currentTime = 0;
    openingVideo.play().catch(() => {
        console.log("Opening video playback failed, starting game directly");
        startGameAfterOpening(difficulty);
        cleanupOpeningVideo();
    });
};
const cleanupOpeningVideo = () => {
    hideScene("openingScene");
    if (window.cleanupOpeningListeners) {
        window.cleanupOpeningListeners();
        delete window.cleanupOpeningListeners;
    }
};
const startGameAfterOpening = async (difficulty) => {
    const $ = (id) => document.getElementById(id);

    // 1. gameData 보장 (외부 로드 실패시 embeddedGameData 사용)
    if (!window.gameData) {
        if (window.gameDataPreloaded) {
            window.gameData = window.gameDataPreloaded;
        } else {
            try {
                window.gameData = await fetchExternalData();
            } catch (e) {
                console.error("[startGameAfterOpening] 데이터 로드 실패", e);
                return;
            }
        }
    }

    // 2. 초기 상태 생성
    let state = initState(difficulty, window.gameData);

    // 3. 밸런스 패치(있다면) 적용
    try {
        if (typeof applyBalancePostLoad === "function") {
            const maybe = applyBalancePostLoad(state);
            if (maybe) state = maybe;
        }
    } catch (e) {
        console.warn("[applyBalancePostLoad] 에러 무시:", e);
    }

    // 4. 전역 상태 세팅
    window.gameState = state;

    // 5. 씬 전환
    hideScene("startScene");

    // 오프닝 영상이 있다면 → 끝나면 본 게임으로 전환
    const opening = $("openingScene");
    const video = $("openingVideo");
    if (opening && video) {
        opening.classList.remove("hidden");
        video.play();
        video.addEventListener(
            "ended",
            () => {
                opening.classList.add("hidden");
                update();
            },
            { once: true }
        );
    } else {
        // 오프닝 없으면 바로 시작
        update();
    }
};

const updateResources = (s) => {
    // Implementation will be defined later in the file
};
const draw = (s) => {
    // Implementation will be defined later in the file
};
// Get expanded terrains for a building based on unlocked technologies
const getExpandedTerrains = (s, buildingId) => {
    const building = s.buildings[buildingId];
    if (!building)
        return [];
    let expandedTerrains = [...building.terrains];
    // Check for terrain expansion effects from unlocked technologies
    s.unlockedTechs.forEach(techId => {
        const tech = s.techs[techId];
        if (tech?.effects) {
            tech.effects.forEach(effect => {
                if (effect.type === "terrain_expansion" && effect.target === buildingId && effect.terrains) {
                    expandedTerrains = [...expandedTerrains, ...effect.terrains];
                }
            });
        }
    });
    return [...new Set(expandedTerrains)]; // Remove duplicates
};
const placeable = (s, tile, b) => {
    const allowedTerrains = getExpandedTerrains(s, b.id);
    return !tile.building && tile.revealed && allowedTerrains.includes(tile.terrain) && isBuildingUnlocked(s, b) && canAffordEffective(s, b, 0);
};
const KO = {
    terrains: { grass: "초원", water: "바다", forest: "숲", mountain: "산", desert: "사막", tundra: "툰드라", tropical: "열대", swamp: "늪지", ice: "빙원", volcano: "화산", canyon: "협곡", oasis: "오아시스", plateau: "고원" },
    buildings: {
        farm: "농장", greenhouse: "온실", vertical_farm: "수직 농장", windmill: "풍력 터빈", solar_panel: "태양광 발전소", coalplant: "석탄 발전소", nuclear_plant: "원자력 발전소", geothermal: "지열 발전소", lab: "연구소", university: "대학", apartment: "아파트", market: "시장", factory: "공장", green_factory: "친환경 공장", water_treatment: "정수 처리장", recycling_center: "재활용 센터", park: "공원", forest_reserve: "산림 보호구역", ecovillage: "에코 빌리지", house: "주택", tent: "텐트"
    },
    techs: {
        controlled_env: "제어 환경", urban_agri: "도시 농업", nuclear: "원자력 기술", green_manufacturing: "친환경 제조",
        wind_power: "풍력", solar_farming: "태양광", geothermal_engineering: "지열 공학", smart_grid: "스마트 그리드",
        energy_efficiency: "에너지 효율화", public_transit: "대중교통", eco_housing: "친환경 주거", reforestation: "재조림",
        water_purification: "정수 기술", desalination: "해수 담수화", circular_economy: "순환 경제", carbon_capture: "탄소 포집",
        battery_storage: "전력 저장", offshore_wind: "해상 풍력", district_heating: "지역난방", waste_to_energy: "폐기물-에너지",
        fossil_energy: "화석 에너지", industrialization: "공업화", urban_planning: "도시 계획", automation: "자동화", high_density_housing: "고밀도 주거"
    },
    techDescs: {
        controlled_env: "온실 해금", urban_agri: "수직 농장 해금", nuclear: "원자력 발전소 해금", green_manufacturing: "공장 오염 감소",
        wind_power: "풍력 터빈 해금", solar_farming: "태양광 발전소 해금", geothermal_engineering: "지열 발전소 해금", smart_grid: "전력망 효율",
        energy_efficiency: "소비 효율 개선", public_transit: "교통체계 개선", eco_housing: "주거 효율 향상", reforestation: "공원 해금",
        water_purification: "정수 처리장 해금", desalination: "해수 담수화", circular_economy: "재활용 센터 해금", carbon_capture: "배출 상쇄 강화",
        battery_storage: "변동성 완화", offshore_wind: "대형 풍력", district_heating: "열공급 효율화", waste_to_energy: "폐기물 전환",
        fossil_energy: "석탄 발전소 해금", industrialization: "공장 해금 및 산업 기반", urban_planning: "아파트 해금",
        automation: "공장 자동화 및 정밀 생산", high_density_housing: "고밀도 주거 정책"
    },
    events: { drought: "가뭄", flood: "홍수", heatwave: "폭염", wildfire: "산불", green_boom: "녹색 혁신", migration: "기후 이주" },
    eventDescs: { drought: "물 부족으로 식량 생산 감소", flood: "강 범람", heatwave: "에너지 수요 급증", wildfire: "산림 화재", green_boom: "청정 에너지 호재", migration: "인구 유입" }
};
const labelBuildingName = (b) => embeddedGameData.buildings[b.id]?.name ?? b.name;
const labelBuildingById = (id, fallback) => embeddedGameData.buildings[id]?.name ?? fallback;
//const labelTechName=(id:string,fallback:string)=>(KO.techs as any)[id]??fallback;
const labelTechName = (id, fallback) => embeddedGameData.techs[id]?.name ?? fallback;
const labelTechDesc = (id, fallback) => embeddedGameData.techs[id]?.description ?? fallback;
const labelEventName = (id, fallback) => embeddedGameData.climateEvents[id]?.name ?? fallback;
const labelEventDesc = (id, fallback) => embeddedGameData.climateEvents[id]?.description ?? fallback;
const POP_WIN = 10_000_000;
const POP_GROWTH_MULT = 1.25;
const POP_FOOD_PER = 0.5;
const POP_ENERGY_PER = 0.002;
const POP_CARBON_PER = 0.01;
const HEX_DIRECTIONS = [{ q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 }, { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }];
const HEX_ROT = 0;
const ENERGY_DEFICIT_MULT = 0.55;
const BASE_COST_CUT = 0.4;
const levelMultCommon = (lvl) => {
    const level = Math.max(1, lvl);
    // Dynamic level multiplier: 1 + (level-1) * 0.5
    return 1 + (level - 1) * 0.5;
};
const levelMultLab = (lvl) => {
    const level = Math.max(1, lvl);
    // Dynamic lab multiplier: stronger scaling for research
    return 1 + (level - 1) * 0.8;
};
// Dynamic pricing constants - replaced fixed steps with formula parameters
const DEFAULT_COST_MULTIPLIER = 0.2; // x in formula: x * level ^ y
const DEFAULT_COST_EXPONENT = 2.5; // y in formula: x * level ^ y
const DEFAULT_EFFECT_MULTIPLIER = 1.1; // multiplier for effect scaling based on cost
const assignObj = (obj, updates) => ({ ...obj, ...updates });
const tileKey = (pos) => `${pos.q},${pos.r}`;
const axialToPixel = (pos, size) => [size * (3 / 2 * pos.q), size * (Math.sqrt(3) / 2 * pos.q + Math.sqrt(3) * pos.r)];
const pixelToAxial = (x, y, size) => { const q = (2 / 3 * x) / size; const r = (-1 / 3 * x + Math.sqrt(3) / 3 * y) / size; return { q: Math.round(q), r: Math.round(r) }; };
const hexDist = (a, b) => (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
const neighbors = (pos) => HEX_DIRECTIONS.map(d => ({ q: pos.q + d.q, r: pos.r + d.r }));
const inRange = (center, radius) => { const results = []; for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++)
        results.push({ q: center.q + q, r: center.r + r });
} return results; };
const addProduction = (a, b) => ({ money: a.money + b.money, energy: a.energy + b.energy, carbon: a.carbon + b.carbon, population: a.population + b.population, food: a.food + b.food });
const scaleProduction = (p, k) => ({ money: Math.floor(p.money * k), energy: Math.floor(p.energy * k), carbon: Math.floor(p.carbon * k), population: Math.floor(p.population * k), food: Math.floor(p.food * k) });
const emptyProduction = () => ({ money: 0, energy: 0, carbon: 0, population: 0, food: 0 });
const PAYABLE = ["money", "energy"];
const canAffordCost = (res, cost) => PAYABLE.every(k => (cost[k] ?? 0) <= res[k]);
const payCost = (res, cost) => PAYABLE.reduce((acc, k) => ({ ...acc, [k]: acc[k] - (cost[k] ?? 0) }), res);
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function mulberry(a) { return function () { let t = a += 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function makeNoise(seed) { return { s: seed }; }
function noise2(n, x, y) { const s = Math.sin(x * 12.9898 + y * 78.233 + n.s * 43758.5453); return (s - Math.floor(s)) * 2 - 1; }
function adjacentKeys(q, r) { return [[q + 1, r], [q + 1, r - 1], [q, r - 1], [q - 1, r], [q - 1, r + 1], [q, r + 1]].map(([aq, ar]) => `${aq},${ar}`); }
// Terrain-based production modifiers
const getTerrainModifier = (terrain, buildingId) => {
    // Use bonusConfig from embeddedGameData
    const modifiers = embeddedGameData.bonusConfig?.terrainModifiers;
    if (!modifiers)
        return 1.0;
    return modifiers[terrain]?.[buildingId] || 1.0;
};
// Pattern detection functions
const detectLinearChain = (s, pos, buildingId) => {
    const directions = HEX_DIRECTIONS;
    let maxChain = 0;
    for (let dir = 0; dir < 3; dir++) { // Only check 3 directions to avoid double counting
        const d1 = directions[dir];
        const d2 = directions[(dir + 3) % 6]; // Opposite direction
        let chain = 1; // Count current building
        // Count in positive direction
        let currentPos = { q: pos.q + d1.q, r: pos.r + d1.r };
        while (true) {
            const tile = s.tiles.get(tileKey(currentPos));
            if (!tile || tile.building !== buildingId)
                break;
            chain++;
            currentPos = { q: currentPos.q + d1.q, r: currentPos.r + d1.r };
        }
        // Count in negative direction
        currentPos = { q: pos.q + d2.q, r: pos.r + d2.r };
        while (true) {
            const tile = s.tiles.get(tileKey(currentPos));
            if (!tile || tile.building !== buildingId)
                break;
            chain++;
            currentPos = { q: currentPos.q + d2.q, r: currentPos.r + d2.r };
        }
        maxChain = Math.max(maxChain, chain);
    }
    return maxChain >= 3 ? 1.2 : 1.0; // 20% bonus for 3+ chain
};
const detectTriangleCluster = (s, pos, requiredBuildings) => {
    const adjacentPositions = neighbors(pos);
    const foundBuildings = new Set();
    for (const adjPos of adjacentPositions) {
        const tile = s.tiles.get(tileKey(adjPos));
        if (tile && tile.building && requiredBuildings.includes(tile.building)) {
            foundBuildings.add(tile.building);
        }
    }
    // Check if we have all required buildings in triangle
    return requiredBuildings.every(building => foundBuildings.has(building));
};
const detectDistrict = (s, pos, buildingId) => {
    const visited = new Set();
    const queue = [pos];
    let count = 0;
    while (queue.length > 0) {
        const current = queue.shift();
        const key = tileKey(current);
        if (visited.has(key))
            continue;
        visited.add(key);
        const tile = s.tiles.get(key);
        if (!tile || tile.building !== buildingId)
            continue;
        count++;
        // Add adjacent positions
        neighbors(current).forEach(neighbor => {
            if (!visited.has(tileKey(neighbor))) {
                queue.push(neighbor);
            }
        });
    }
    return count;
};
function carveCoasts(tiles) { tiles.forEach(t => { if (t.terrain !== "water") {
    const ns = adjacentKeys(t.q, t.r).map(k => tiles.get(k));
    if (ns.some(n => n && n.terrain === "water"))
        t.modifier = "coastal";
} }); }
function carveRivers(tiles, radius, rand) {
    const sources = [];
    tiles.forEach(t => { if (t.terrain === "mountain")
        sources.push([t.q, t.r]); });
    const count = Math.min(4, Math.max(1, Math.floor(sources.length / 20)));
    for (let i = 0; i < count; i++) {
        const s = sources[Math.floor(rand() * sources.length)] || [0, 0];
        let q = s[0], r = s[1], steps = 0;
        const visited = new Set();
        while (steps < radius * 3) {
            steps++;
            const key = `${q},${r}`;
            if (visited.has(key))
                break;
            visited.add(key);
            const t = tiles.get(key);
            if (!t)
                break;
            t.modifier = (t.modifier === "river") ? "river" : "river";
            if (t.terrain === "water")
                break;
            const ns = adjacentKeys(q, r).map(k => ({ k, t: tiles.get(k) })).filter(x => x.t);
            const height = (tt) => tt.terrain === "mountain" ? 3 : tt.terrain === "plateau" ? 2 : (tt.terrain === "grass" || tt.terrain === "forest") ? 1 : (tt.terrain === "desert" || tt.terrain === "tropical") ? 0.5 : tt.terrain === "water" ? -1 : 0;
            ns.sort((a, b) => height(b.t) - height(a.t));
            const next = ns.pop();
            if (!next || !next.t)
                break;
            q = next.t.q;
            r = next.t.r;
        }
    }
}
const shownErrors = new Set();
// Action tracking functions
const trackAction = (type, details = {}) => {
    if (!gameState)
        return;
    const action = {
        turn: gameState.turn,
        type,
        timestamp: Date.now(),
        details
    };
    gameActionHistory.push(action);
    // Keep only last 200 actions to prevent memory issues
    if (gameActionHistory.length > 200) {
        gameActionHistory = gameActionHistory.slice(-200);
    }
};
const getActionHistoryForGemini = () => {
    if (gameActionHistory.length === 0)
        return "게임 액션 기록이 없습니다.";
    let history = "=== 게임 액션 기록 ===\n";
    gameActionHistory.forEach((action, index) => {
        history += `${index + 1}. 턴 ${action.turn} - ${action.type}\n`;
        if (action.details.building)
            history += `   건물: ${action.details.building}\n`;
        if (action.details.position)
            history += `   위치: (${action.details.position.q}, ${action.details.position.r})\n`;
        if (action.details.tech)
            history += `   기술: ${action.details.tech}\n`;
        if (action.details.level)
            history += `   레벨: ${action.details.level}\n`;
        if (action.details.terrain)
            history += `   지형: ${action.details.terrain}\n`;
        history += "\n";
    });
    return history;
};
const showError = (msg) => {
    let box = document.getElementById("errorToast");
    if (!box) {
        box = document.createElement("div");
        box.id = "errorToast";
        box.className = "fixed top-4 right-4 z-50 max-w-sm";
        document.body.appendChild(box);
    }
    const item = document.createElement("div");
    item.className = "mb-2 bg-red-600 text-white text-sm rounded shadow p-3";
    item.textContent = msg;
    box.appendChild(item);
    setTimeout(() => { item.remove(); if (box && !box.hasChildNodes())
        box.remove(); }, 4000);
};
// 연구 관련 오류를 상세히 표시하는 함수
const showResearchError = (title, details) => {
    let box = document.getElementById("researchErrorToast");
    if (!box) {
        box = document.createElement("div");
        box.id = "researchErrorToast";
        box.className = "fixed top-20 right-4 z-50 max-w-md";
        document.body.appendChild(box);
    }
    const item = document.createElement("div");
    item.className = "mb-2 bg-red-700 text-white text-sm rounded-lg shadow-lg p-4 border-l-4 border-red-300";
    item.innerHTML = `
  <div class="flex items-start gap-2">
    <div class="text-red-300 text-lg">🚫</div>
    <div>
      <div class="font-bold text-red-100">${title}</div>
      <div class="mt-1 text-red-200 text-xs">${details}</div>
    </div>
  </div>
`;
    box.appendChild(item);
    setTimeout(() => { item.remove(); if (box && !box.hasChildNodes())
        box.remove(); }, 6000);
};
// AI에게 불만을 표시하는 함수
// const complainToAI=(complaint:string)=>{
// let box=document.getElementById("aiComplaintToast");
// if(!box){ 
//   box=document.createElement("div"); 
//   box.id="aiComplaintToast"; 
//   box.className="fixed bottom-4 left-4 z-50 max-w-md"; 
//   document.body.appendChild(box); 
// }
// const item=document.createElement("div");
// item.className="mb-2 bg-orange-600 text-white text-sm rounded-lg shadow-lg p-4 border-l-4 border-orange-300 animate-pulse";
// item.innerHTML=`
//   <div class="flex items-start gap-2">
//     <div class="text-orange-200 text-lg">😤</div>
//     <div>
//       <div class="font-bold text-orange-100">AI에게 한마디</div>
//       <div class="mt-1 text-orange-200 text-sm">${complaint}</div>
//     </div>
//   </div>
// `;
// box.appendChild(item);
// setTimeout(()=>{ item.remove(); if(box && !box.hasChildNodes()) box.remove(); },8000);
// };
function countBuildings(s, id) { let c = 0; s.tiles.forEach(t => { if (t.building === id)
    c++; }); return c; }
// Auto-play AI functions
const stopAutoMode = () => {
    if (autoMode.timeoutId) {
        clearTimeout(autoMode.timeoutId);
        autoMode.timeoutId = null;
    }
    autoMode.enabled = false;
    // Update UI to show auto mode is disabled
    const autoIndicator = document.getElementById('autoModeIndicator');
    if (autoIndicator) {
        autoIndicator.remove();
    }
};
const startAutoMode = () => {
    if (!gameState)
        return;
    autoMode.enabled = true;
    // Add auto mode indicator to UI
    let autoIndicator = document.getElementById('autoModeIndicator');
    if (!autoIndicator) {
        autoIndicator = document.createElement('div');
        autoIndicator.id = 'autoModeIndicator';
        autoIndicator.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        document.body.appendChild(autoIndicator);
    }
    autoIndicator.innerHTML = `
    <div class="flex items-center gap-2">
      <span>🤖 자동 모드 활성화</span>
      <span id="geminiStatus" class="text-xs text-yellow-300">Gemini AI</span>
      <span id="actionQueue" class="text-xs text-gray-300">Queue: 0</span>
      <button onclick="stopAutoMode()" class="bg-red-800 hover:bg-red-900 px-2 py-1 rounded text-xs">정지</button>
    </div>
  `;
    executeAutoAction();
};
// Update Gemini UI status
const updateGeminiStatus = () => {
    const statusEl = document.getElementById('geminiStatus');
    const queueEl = document.getElementById('actionQueue');
    if (statusEl) {
        if (isRequestingGemini) {
            statusEl.textContent = '🤖 Thinking...';
            statusEl.className = 'text-xs text-blue-300';
        }
        else if (geminiActionQueue.length > 0) {
            statusEl.textContent = '🤖 Gemini Active';
            statusEl.className = 'text-xs text-green-300';
        }
        else {
            statusEl.textContent = '🤖 Local AI';
            statusEl.className = 'text-xs text-yellow-300';
        }
    }
    if (queueEl) {
        queueEl.textContent = `Queue: ${geminiActionQueue.length}`;
    }
};
const executeAutoAction = () => {
    if (!autoMode.enabled || !gameState)
        return;
    updateGeminiStatus();
    if (document.getElementById("endScene") && !document.getElementById("endScene")?.classList.contains("hidden")) {
        console.log("Game ended, stopping auto mode");
        stopAutoMode();
        return;
    }
    const now = Date.now();
    if (window.lastUserInteraction && now - window.lastUserInteraction < 2000) {
        autoMode.timeoutId = setTimeout(executeAutoAction, autoMode.interval);
        return;
    }
    const bestAction = chooseAIAction(gameState);
    if (bestAction) {
        performAIAction(bestAction);
        console.log(`Executing ${bestAction.type}:`, bestAction);
        // Schedule next action immediately after performing one
        autoMode.timeoutId = setTimeout(executeAutoAction, autoMode.interval);
    }
    else {
        // If no action is available (e.g., waiting for Gemini), 
        // try again after a short delay to prevent a busy loop.
        autoMode.timeoutId = setTimeout(executeAutoAction, 500); // Wait 500ms before checking again
    }
};
// Comprehensive game state analysis for Gemini scoring
const analyzeGameStateForScoring = (s, gameStatus, reasons) => {
    const analysis = {
        // Basic game info
        gameResult: {
            status: gameStatus,
            reasons: reasons || [],
            finalTurn: s.turn,
            maxTurns: s.maxTurn,
            difficulty: s.difficulty
        },
        // Final resources and targets
        finalState: {
            population: s.resources.population,
            energy: s.resources.energy,
            money: s.resources.money,
            food: s.resources.food,
            carbon: s.resources.carbon,
            carbonLimit: s.carbonLimit,
            populationTarget: POP_WIN
        },
        // Progress towards victory conditions
        victoryProgress: {
            populationPercent: Math.round((s.resources.population / POP_WIN) * 100),
            carbonSafe: s.resources.carbon <= s.carbonLimit,
            energyBalance: s.resources.energy,
            foodBalance: s.resources.food
        },
        // Building analysis with enhanced bonus system
        buildings: analyzeBuildingEfficiency(s),
        // Technology progress
        technology: {
            unlockedCount: s.unlockedTechs.size,
            totalAvailable: Object.keys(s.techs).length,
            unlockedTechs: Array.from(s.unlockedTechs),
            currentResearch: s.research.current ? {
                tech: s.research.current,
                progress: s.research.progress,
                total: s.research.total
            } : null
        },
        // Strategic analysis
        strategy: analyzeGameStrategy(s),
        // Performance metrics
        performance: calculatePerformanceMetrics(s),
        // Bonus system utilization
        bonusUtilization: analyzeBonusSystemUsage(s)
    };
    return analysis;
};
// Analyze building efficiency and placement strategy
const analyzeBuildingEfficiency = (s) => {
    const buildingStats = {};
    const terrainUsage = {};
    const patternAnalysis = {
        linearChains: 0,
        triangleClusters: 0,
        districts: 0,
        specialAbilitiesActive: 0
    };
    s.tiles.forEach((tile, key) => {
        if (tile.building && tile.revealed) {
            const building = s.buildings[tile.building];
            if (!building)
                return;
            // Count building types
            if (!buildingStats[tile.building]) {
                buildingStats[tile.building] = {
                    count: 0,
                    totalLevel: 0,
                    avgLevel: 0,
                    terrains: [],
                    bonusesUsed: []
                };
            }
            const stats = buildingStats[tile.building];
            stats.count++;
            stats.totalLevel += tile.level;
            stats.avgLevel = stats.totalLevel / stats.count;
            if (!stats.terrains.includes(tile.terrain)) {
                stats.terrains.push(tile.terrain);
            }
            // Terrain usage analysis
            terrainUsage[tile.terrain] = (terrainUsage[tile.terrain] || 0) + 1;
            // Pattern analysis
            const pos = { q: tile.q, r: tile.r };
            const chainBonus = detectLinearChain(s, pos, tile.building);
            if (chainBonus > 1.0)
                patternAnalysis.linearChains++;
            if (building.patternRules) {
                building.patternRules.forEach(rule => {
                    if (rule.type === 'triangle' && detectTriangleCluster(s, pos, rule.buildings)) {
                        patternAnalysis.triangleClusters++;
                    }
                });
            }
            const districtBonus = detectDistrict(s, pos, tile.building);
            if (districtBonus > 1.0)
                patternAnalysis.districts++;
            // Check special abilities
            if (building.specialAbility) {
                const adjacencyProduction = calculateEnhancedProduction(s, tile, s.buildings[tile.building]);
                const baseProduction = scaleProduction(building.base, levelMultCommon(tile.level));
                const totalAdjacency = Math.abs(adjacencyProduction.money - baseProduction.money) +
                    Math.abs(adjacencyProduction.energy - baseProduction.energy);
                const totalBase = Math.abs(baseProduction.money) + Math.abs(baseProduction.energy);
                if (totalAdjacency >= totalBase * 2) {
                    patternAnalysis.specialAbilitiesActive++;
                }
            }
        }
    });
    return {
        buildingStats,
        terrainUsage,
        patternAnalysis,
        totalBuildings: Object.values(buildingStats).reduce((sum, stat) => sum + stat.count, 0)
    };
};
// Analyze overall game strategy
const analyzeGameStrategy = (s) => {
    const strategy = {
        focusAreas: [],
        balanceScore: 0,
        efficiencyScore: 0,
        innovationScore: 0,
        sustainabilityScore: 0
    };
    // Determine focus areas based on building distribution
    const buildingCounts = {};
    s.tiles.forEach(tile => {
        if (tile.building) {
            buildingCounts[tile.building] = (buildingCounts[tile.building] || 0) + 1;
        }
    });
    // Energy focus
    const energyBuildings = ['windmill', 'solar_panel', 'nuclear_plant', 'geothermal', 'coalplant'].reduce((sum, id) => sum + (buildingCounts[id] || 0), 0);
    // Food focus
    const foodBuildings = ['farm', 'greenhouse', 'vertical_farm'].reduce((sum, id) => sum + (buildingCounts[id] || 0), 0);
    // Population focus
    const populationBuildings = ['apartment', 'house', 'ecovillage'].reduce((sum, id) => sum + (buildingCounts[id] || 0), 0);
    // Research focus
    const researchBuildings = ['lab', 'university'].reduce((sum, id) => sum + (buildingCounts[id] || 0), 0);
    if (energyBuildings > 5)
        strategy.focusAreas.push('Energy Infrastructure');
    if (foodBuildings > 3)
        strategy.focusAreas.push('Food Security');
    if (populationBuildings > 5)
        strategy.focusAreas.push('Population Growth');
    if (researchBuildings > 2)
        strategy.focusAreas.push('Technology Development');
    if (buildingCounts['park'] > 2)
        strategy.focusAreas.push('Environmental Protection');
    // Calculate balance score (0-100)
    const resourceRatios = [
        Math.min(s.resources.energy / Math.max(1, s.resources.population * POP_ENERGY_PER), 1),
        Math.min(s.resources.food / Math.max(1, s.resources.population * POP_FOOD_PER), 1),
        s.resources.carbon <= s.carbonLimit ? 1 : s.carbonLimit / Math.max(1, s.resources.carbon)
    ];
    strategy.balanceScore = Math.round(resourceRatios.reduce((sum, ratio) => sum + ratio, 0) / resourceRatios.length * 100);
    // Innovation score based on tech unlocks and special abilities
    strategy.innovationScore = Math.min(100, Math.round((s.unlockedTechs.size / Object.keys(s.techs).length) * 100));
    // Sustainability score based on carbon management
    strategy.sustainabilityScore = s.resources.carbon <= s.carbonLimit ?
        Math.round((1 - s.resources.carbon / s.carbonLimit) * 100) : 0;
    return strategy;
};
// Calculate performance metrics
const calculatePerformanceMetrics = (s) => {
    const metrics = {
        turnEfficiency: Math.round((s.turn / s.maxTurn) * 100),
        resourceGrowthRate: 0,
        buildingDensity: 0,
        techProgressRate: 0
    };
    // Calculate building density (buildings per revealed tile)
    const revealedTiles = Array.from(s.tiles.values()).filter(t => t.revealed).length;
    const totalBuildings = Array.from(s.tiles.values()).filter(t => t.building).length;
    metrics.buildingDensity = revealedTiles > 0 ? Math.round((totalBuildings / revealedTiles) * 100) : 0;
    // Tech progress rate
    metrics.techProgressRate = Math.round((s.unlockedTechs.size / Math.max(1, s.turn)) * 100);
    return metrics;
};
// Analyze bonus system usage efficiency
const analyzeBonusSystemUsage = (s) => {
    const analysis = {
        terrainBonusesUsed: 0,
        patternBonusesActive: 0,
        complexRulesTriggered: 0,
        specialAbilitiesUnlocked: 0,
        overallEfficiency: 0
    };
    s.tiles.forEach((tile, key) => {
        if (tile.building && tile.revealed) {
            const building = s.buildings[tile.building];
            if (!building)
                return;
            const pos = { q: tile.q, r: tile.r };
            // Check terrain bonuses
            const terrainMod = getTerrainModifier(tile.terrain, tile.building);
            if (terrainMod > 1.0)
                analysis.terrainBonusesUsed++;
            // Check pattern bonuses
            const chainBonus = detectLinearChain(s, pos, tile.building);
            const districtBonus = detectDistrict(s, pos, tile.building);
            if (chainBonus > 1.0 || districtBonus > 1.0)
                analysis.patternBonusesActive++;
            // Check complex rules
            if (building.complexRules && building.complexRules.length > 0) {
                analysis.complexRulesTriggered++;
            }
            // Check special abilities
            if (building.specialAbility) {
                analysis.specialAbilitiesUnlocked++;
            }
        }
    });
    const totalBuildings = Array.from(s.tiles.values()).filter(t => t.building).length;
    analysis.overallEfficiency = totalBuildings > 0 ?
        Math.round(((analysis.terrainBonusesUsed + analysis.patternBonusesActive + analysis.complexRulesTriggered) / totalBuildings) * 100) : 0;
    return analysis;
};
// Request game scoring from Gemini AI
const requestGameScoring = async (gameAnalysis) => {
    const actionHistory = getActionHistoryForGemini();
    const scoringPrompt = `
게임 Build a Green World II 분석 및 채점 요청

당신은 게임 전문가로서 다음 게임 결과를 0-100점으로 채점해주세요.

게임 시스템 설명:
- 목표: 인구 ${POP_WIN.toLocaleString()}명 달성하면서 탄소 배출량을 제한 내로 유지
- 제약: 턴 제한 ${gameAnalysis.gameResult.maxTurns}턴, 탄소 한계 ${gameAnalysis.finalState.carbonLimit}
- 난이도: ${gameAnalysis.gameResult.difficulty}

향상된 보너스 시스템:
1. 지형 기반 보너스: 특정 지형에서 건물별 생산량 보너스 (산지 +50% 에너지, 사막 +50% 태양광 등)
2. 패턴 탐지:
   - 선형 연쇄 (3개 이상 일직선): +20% 보너스
   - 삼각형 클러스터: 특정 건물 조합으로 추가 보너스
   - 구역 보너스 (4개 이상 그룹): +10% 보너스
3. 복합 규칙: 지형 + 건물 조건부 보너스
4. 특수 능력: 인접 보너스가 기본 생산량의 2배 이상일 때 해금되는 고유 효과

채점 기준 (각 항목별 가중치):
1. 목표 달성도 (30점)
   - 인구 목표 달성률
   - 탄소 관리 성공도
   - 승리/패배 결과

2. 전략적 효율성 (25점)
   - 자원 균형 관리
   - 건물 배치 최적화
   - 턴 효율성

3. 보너스 시스템 활용 (20점)
   - 지형 보너스 활용도
   - 패턴 보너스 활성화
   - 특수 능력 해금 및 활용

4. 기술 발전 (15점)
   - 연구 진행도
   - 핵심 기술 해금
   - 혁신적 전략 사용

5. 지속가능성 (10점)
   - 환경 보호 노력
   - 장기적 성장 전략
   - 재생 에너지 활용

게임 결과 데이터:
${JSON.stringify(gameAnalysis, null, 2)}

${actionHistory}

위 데이터를 바탕으로 다음 형식으로 채점해주세요:

최종 점수: [0-100점]

세부 점수:
- 목표 달성도: [점수]/30
- 전략적 효율성: [점수]/25
- 보너스 시스템 활용: [점수]/20
- 기술 발전: [점수]/15
- 지속가능성: [점수]/10

강점:
- [주요 강점 3개]

개선점:
- [개선이 필요한 부분 3개]

전략 평가:
- [전반적인 게임 전략에 대한 평가]

추천 사항:
- [다음 게임을 위한 구체적인 조언]
`;
    try {
        const response = await fetch(GEMINI_API_URL + `?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                        parts: [{
                                text: scoringPrompt
                            }]
                    }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const geminiScore = data.candidates?.[0]?.content?.parts?.[0]?.text || '채점 결과를 받아오지 못했습니다.';
        // Display the scoring result
        displayGeminiScoring(geminiScore, gameAnalysis);
    }
    catch (error) {
        console.error('Gemini 채점 요청 실패:', error);
        displayGeminiScoring('Gemini AI 채점 서비스에 연결할 수 없습니다. 네트워크를 확인해주세요.', gameAnalysis);
    }
};
// Display Gemini scoring results
const displayGeminiScoring = (geminiResult, gameAnalysis) => {
    // Create or update scoring modal
    let scoringModal = document.getElementById('geminiScoringModal');
    if (!scoringModal) {
        scoringModal = document.createElement('div');
        scoringModal.id = 'geminiScoringModal';
        scoringModal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        scoringModal.style.display = 'none';
        document.body.appendChild(scoringModal);
    }
    scoringModal.innerHTML = `
    <div class="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-white flex items-center gap-2">
            🤖 Gemini AI 게임 채점 결과
          </h2>
          <button onclick="document.getElementById('geminiScoringModal').style.display='none'" 
                  class="text-white hover:text-gray-300 text-2xl">&times;</button>
        </div>
      </div>
      
      <div class="p-6 text-white">
        <!-- Game Summary -->
        <div class="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 class="text-lg font-semibold mb-3 text-blue-400">📊 게임 요약</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-400">결과:</span>
              <span class="ml-2 font-semibold ${gameAnalysis.gameResult.status === 'win' ? 'text-green-400' : 'text-red-400'}">
                ${gameAnalysis.gameResult.status === 'win' ? '승리' : gameAnalysis.gameResult.status === 'loss' ? '패배' : '시간 초과'}
              </span>
            </div>
            <div>
              <span class="text-gray-400">인구:</span>
              <span class="ml-2 font-semibold">${gameAnalysis.finalState.population.toLocaleString()}</span>
            </div>
            <div>
              <span class="text-gray-400">턴:</span>
              <span class="ml-2 font-semibold">${gameAnalysis.gameResult.finalTurn}/${gameAnalysis.gameResult.maxTurns}</span>
            </div>
            <div>
              <span class="text-gray-400">탄소:</span>
              <span class="ml-2 font-semibold ${gameAnalysis.finalState.carbon <= gameAnalysis.finalState.carbonLimit ? 'text-green-400' : 'text-red-400'}">
                ${gameAnalysis.finalState.carbon}/${gameAnalysis.finalState.carbonLimit}
              </span>
            </div>
          </div>
        </div>

        <!-- Gemini AI Result -->
        <div class="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 class="text-lg font-semibold mb-3 text-purple-400">🎯 AI 채점 결과</h3>
          <div class="whitespace-pre-wrap text-sm bg-gray-700 p-4 rounded border-l-4 border-purple-500">
            ${geminiResult}
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-gray-800 rounded-lg">
            <h3 class="text-lg font-semibold mb-3 text-green-400">📈 성과 지표</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>목표 달성률:</span>
                <span class="font-semibold">${gameAnalysis.victoryProgress.populationPercent}%</span>
              </div>
              <div class="flex justify-between">
                <span>전략 균형도:</span>
                <span class="font-semibold">${gameAnalysis.strategy.balanceScore}/100</span>
              </div>
              <div class="flex justify-between">
                <span>혁신 점수:</span>
                <span class="font-semibold">${gameAnalysis.strategy.innovationScore}/100</span>
              </div>
              <div class="flex justify-between">
                <span>지속가능성:</span>
                <span class="font-semibold">${gameAnalysis.strategy.sustainabilityScore}/100</span>
              </div>
            </div>
          </div>

          <div class="p-4 bg-gray-800 rounded-lg">
            <h3 class="text-lg font-semibold mb-3 text-yellow-400">🏗️ 보너스 시스템 활용</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>지형 보너스:</span>
                <span class="font-semibold">${gameAnalysis.bonusUtilization.terrainBonusesUsed}개</span>
              </div>
              <div class="flex justify-between">
                <span>패턴 보너스:</span>
                <span class="font-semibold">${gameAnalysis.bonusUtilization.patternBonusesActive}개</span>
              </div>
              <div class="flex justify-between">
                <span>특수 능력:</span>
                <span class="font-semibold">${gameAnalysis.bonusUtilization.specialAbilitiesUnlocked}개</span>
              </div>
              <div class="flex justify-between">
                <span>전체 효율성:</span>
                <span class="font-semibold">${gameAnalysis.bonusUtilization.overallEfficiency}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <button onclick="document.getElementById('geminiScoringModal').style.display='none'" 
                  class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors">
            확인
          </button>
        </div>
      </div>
    </div>
  `;
    scoringModal.style.display = 'flex';
};
// Global function to trigger Gemini scoring (called from HTML button)
const triggerGeminiScoring = () => {
    if (!gameState) {
        console.error('No game state available for scoring');
        return;
    }
    // Determine game status based on current state
    let gameStatus = 'loss';
    let reasons = [];
    // Check building diversity requirement for victory
    const buildingTypes = new Set();
    gameState.tiles.forEach(tile => {
        if (tile.building) {
            buildingTypes.add(tile.building);
        }
    });
    const requiredBuildingTypes = 8; // Minimum 8 different building types
    const hasDiversity = buildingTypes.size >= requiredBuildingTypes;
    if (gameState.resources.population >= POP_WIN && gameState.resources.carbon <= gameState.carbonLimit && hasDiversity) {
        gameStatus = 'win';
        reasons = ['인구 목표 달성', '탄소 관리 성공', `건물 다양성 달성 (${buildingTypes.size}/${requiredBuildingTypes})`];
    }
    else if (gameState.turn >= gameState.maxTurn) {
        gameStatus = 'timeout';
        reasons = ['턴 제한 도달'];
    }
    else if (gameState.resources.population <= 0) {
        gameStatus = 'loss';
        reasons = ['인구 붕괴'];
    }
    else if (gameState.resources.money < 0) {
        gameStatus = 'loss';
        reasons = ['파산'];
    }
    else if (gameState.resources.carbon > gameState.carbonLimit) {
        gameStatus = 'loss';
        reasons = ['탄소 배출 한계 초과'];
    }
    // Analyze game state for scoring
    const gameAnalysis = analyzeGameStateForScoring(gameState, gameStatus, reasons);
    // Request scoring from Gemini AI
    requestGameScoring(gameAnalysis);
};
// Make triggerGeminiScoring available globally
window.triggerGeminiScoring = triggerGeminiScoring;
// Calculate next turn production
const calculateNextTurnProduction = (s) => {
    let totalProduction = emptyProduction();
    s.tiles.forEach((tile, key) => {
        if (tile.building) {
            const building = s.buildings[tile.building];
            if (building) {
                const levelMult = levelMultCommon(tile.level);
                const production = scaleProduction(building.base, levelMult);
                totalProduction = addProduction(totalProduction, production);
                // Add adjacency bonuses
                const adjacentTiles = neighbors(tile);
                adjacentTiles.forEach(adjPos => {
                    const adjTile = s.tiles.get(tileKey(adjPos));
                    if (adjTile?.building && building.adjacency?.[adjTile.building]) {
                        const bonus = building.adjacency[adjTile.building];
                        totalProduction = addProduction(totalProduction, bonus);
                    }
                });
            }
        }
    });
    return totalProduction;
};
// Analyze resource state
const analyzeResources = (s, nextProduction) => {
    const shortages = [];
    const surpluses = [];
    const foodPerPop = s.resources.food / Math.max(s.resources.population, 1);
    const energyPerPop = s.resources.energy / Math.max(s.resources.population, 1);
    if (foodPerPop < 1.1)
        shortages.push('food');
    if (energyPerPop < 2)
        shortages.push('energy');
    if (s.resources.money < 50)
        shortages.push('money');
    if (s.resources.carbon > -10)
        shortages.push('carbon_reduction');
    if (foodPerPop > 2)
        surpluses.push('food');
    if (energyPerPop > 4)
        surpluses.push('energy');
    if (s.resources.money > 200)
        surpluses.push('money');
    let carbonTrend = 'neutral';
    if (nextProduction.carbon > 0)
        carbonTrend = 'increasing';
    else if (nextProduction.carbon < -5)
        carbonTrend = 'improving';
    return {
        foodPerPop: Math.round(foodPerPop * 100) / 100,
        energyPerPop: Math.round(energyPerPop * 100) / 100,
        carbonTrend,
        resourceShortages: shortages,
        surpluses
    };
};
// Gemini AI functions
const formatGameStateForGemini = (s) => {
    const buildings = [];
    const availableTiles = [];
    const nextProduction = calculateNextTurnProduction(s);
    const analysis = analyzeResources(s, nextProduction);
    s.tiles.forEach((tile, key) => {
        if (tile.building) {
            const building = s.buildings[tile.building];
            const levelMult = levelMultCommon(tile.level);
            const production = building ? scaleProduction(building.base, levelMult) : emptyProduction();
            // Calculate adjacency bonuses
            let adjacencyBonuses = emptyProduction();
            if (building) {
                const adjacentTiles = neighbors(tile);
                adjacentTiles.forEach(adjPos => {
                    const adjTile = s.tiles.get(tileKey(adjPos));
                    if (adjTile?.building && building.adjacency?.[adjTile.building]) {
                        const bonus = building.adjacency[adjTile.building];
                        adjacencyBonuses = addProduction(adjacencyBonuses, bonus);
                    }
                });
            }
            buildings.push({
                id: tile.building,
                position: { q: tile.q, r: tile.r },
                level: tile.level,
                terrain: tile.terrain,
                production,
                adjacencyBonuses,
                upgradeCost: building ? building.cost : null
            });
        }
        else if (tile.revealed) {
            const buildable = [];
            const terrainBonuses = [];
            Object.values(s.buildings).forEach(building => {
                if (placeable(s, tile, building)) {
                    buildable.push(building.id);
                }
            });
            // Add terrain-specific bonuses
            if (tile.terrain === 'desert')
                terrainBonuses.push('solar_panel +50%');
            if (tile.terrain === 'mountain')
                terrainBonuses.push('windmill +50%');
            if (tile.terrain === 'grass')
                terrainBonuses.push('farm +30%, apartment +30%');
            if (tile.terrain === 'forest')
                terrainBonuses.push('farm +30%');
            if (buildable.length > 0) {
                availableTiles.push({
                    position: { q: tile.q, r: tile.r },
                    terrain: tile.terrain,
                    buildable,
                    terrainBonuses
                });
            }
        }
    });
    // Calculate victory progress
    const popTarget = s.difficultyData?.populationTarget || 100;
    const energyTarget = s.difficultyData?.energyTarget || 100;
    const happinessTarget = s.difficultyData?.happinessTarget || 50;
    const victoryProgress = {
        populationPercent: Math.round((s.resources.population / popTarget) * 100),
        energyPercent: Math.round((s.resources.energy / energyTarget) * 100),
        happinessPercent: Math.round((s.resources.happiness || 0) / happinessTarget * 100),
        carbonSafe: s.resources.carbon < 0
    };
    return {
        turn: s.turn,
        resources: {
            money: s.resources.money,
            energy: s.resources.energy,
            population: s.resources.population,
            food: s.resources.food,
            carbon: s.resources.carbon,
            happiness: s.resources.happiness || 0
        },
        nextTurnProduction: {
            money: Math.round(nextProduction.money * 100) / 100,
            energy: Math.round(nextProduction.energy * 100) / 100,
            population: Math.round(nextProduction.population * 100) / 100,
            food: Math.round(nextProduction.food * 100) / 100,
            carbon: Math.round(nextProduction.carbon * 100) / 100
        },
        resourceAnalysis: analysis,
        buildings,
        availableTechs: s.availableTechs,
        currentResearch: s.research.current ? {
            tech: s.research.current,
            progress: s.research.progress,
            total: s.research.total
        } : undefined,
        availableTiles,
        difficultyTargets: {
            population: popTarget,
            energy: energyTarget,
            happiness: happinessTarget
        },
        victoryProgress
    };
};
// Call Gemini API directly
const callGeminiAPI = async (prompt) => {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                        parts: [{
                                text: prompt
                            }]
                    }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
        else {
            throw new Error('Invalid response format from Gemini API');
        }
    }
    catch (error) {
        console.error('Gemini API call failed:', error);
        throw error;
    }
};
const requestGeminiActions = async (s) => {
    if (isRequestingGemini)
        return [];
    isRequestingGemini = true;
    try {
        const gameState = formatGameStateForGemini(s);
        const prompt = `You are an expert AI playing "Build a Green World II", a turn-based environmental city builder.

!! REALLY IMPORTANT !!
Lab is required to research any tech. Lab must be built before you can research any tech. You can't research any tech without a lab.

HARD CONSTRAINTS (must obey):
- Output format: a **JSON array only**, no trailing commas, no comments.
- Each action has a "priority" integer 1–15 (15 = highest). Use each priority value at most 5 times.
- Use only valid tech IDs and building IDs that are currently available or will be unlocked by earlier listed actions.
- "position" must be a buildable hex from gameState.availableTiles or an existing building's coordinates for upgrades.
- Never spend resources you don't have on the turn the action would execute; queue research/builds in feasible order.
- **Research requires at least one Laboratory building. The more Laboratories you have, the faster research completes.**
- **Research and building production only take effect after at least one "end_turn" action. Insert "end_turn" at the correct places to advance turns and receive their results.**
- Keep Food/Pop > 1.0, Energy/Pop > 2.0 by or before the time population grows; if violated, add actions to fix first.
- If carbon is NOT safe, include at least one carbon-improvement action within the first 5 actions.
- You can win if your world gets 1 million population or research 15 tier tech.

=== CURRENT GAME STATE (Turn ${gameState.turn}) ===
RESOURCES:
- Money: ${gameState.resources.money}
- Energy: ${gameState.resources.energy} 
- Population: ${gameState.resources.population}
- Food: ${gameState.resources.food}
- Carbon: ${gameState.resources.carbon} ${gameState.victoryProgress.carbonSafe ? '✓ SAFE' : '⚠ DANGER'}
- Happiness: ${gameState.resources.happiness}

NEXT TURN PRODUCTION FORECAST:
- Money: ${gameState.nextTurnProduction.money > 0 ? '+' : ''}${gameState.nextTurnProduction.money}
- Energy: ${gameState.nextTurnProduction.energy > 0 ? '+' : ''}${gameState.nextTurnProduction.energy}
- Population: ${gameState.nextTurnProduction.population > 0 ? '+' : ''}${gameState.nextTurnProduction.population}
- Food: ${gameState.nextTurnProduction.food > 0 ? '+' : ''}${gameState.nextTurnProduction.food}
- Carbon: ${gameState.nextTurnProduction.carbon > 0 ? '+' : ''}${gameState.nextTurnProduction.carbon}

RESOURCE ANALYSIS:
- Food per Population: ${gameState.resourceAnalysis.foodPerPop} (need >1.0)
- Energy per Population: ${gameState.resourceAnalysis.energyPerPop} (need >2.0)  
- Carbon Trend: ${gameState.resourceAnalysis.carbonTrend}
- Resource Shortages: ${gameState.resourceAnalysis.resourceShortages.join(', ') || 'None'}
- Resource Surpluses: ${gameState.resourceAnalysis.surpluses.join(', ') || 'None'}

VICTORY PROGRESS:
- Population: ${gameState.victoryProgress.populationPercent}% of ${gameState.difficultyTargets.population} target
- Energy: ${gameState.victoryProgress.energyPercent}% of ${gameState.difficultyTargets.energy} target
- Happiness: ${gameState.victoryProgress.happinessPercent}% of ${gameState.difficultyTargets.happiness} target
- Carbon Safe: ${gameState.victoryProgress.carbonSafe ? 'YES' : 'NO - URGENT'}

CURRENT RESEARCH: ${gameState.currentResearch ? `${gameState.currentResearch.tech} (${gameState.currentResearch.progress}/${gameState.currentResearch.total} turns, ${Math.ceil((gameState.currentResearch.total - gameState.currentResearch.progress) / Math.max(1, Math.floor(s.resources.population / 10)))} turns remaining)` : 'None'}

AVAILABLE RESEARCH TECHNOLOGIES:
${gameState.availableTechs.map(techId => {
            const tech = s.techs[techId];
            if (!tech)
                return `- ${techId}: Unknown tech`;
            const researchSpeed = Math.max(1, Math.floor(s.resources.population / 10)); // Base research speed
            const turnsNeeded = Math.ceil((tech.baseTurns || 5) / researchSpeed);
            const cost = tech.cost || { money: 0, energy: 0, carbon: 0, population: 0, food: 0 };
            return `- ${tech.name} (ID: ${techId})
    Turns Required: ${turnsNeeded} (base: ${tech.baseTurns || 5}, research speed: ${researchSpeed}/turn)
    Cost: ${Object.entries(cost).filter(([k, v]) => v > 0).map(([k, v]) => `${k}: ${v}`).join(', ') || 'Free'}
    Category: ${tech.category || 'General'} | Tier: ${tech.tier || 1}
    Description: ${tech.description || 'No description'}
    Unlocks: ${tech.unlocks?.join(', ') || 'None'}
    Prerequisites: ${tech.prereq?.join(', ') || 'None'}`;
        }).join('\n\n')}

Game Objective: Build a sustainable green civilization while managing resources, researching technologies, and adapting to climate events. Consider:

1. RESOURCE MANAGEMENT: 
   - Maintain positive income for all resources
   - Build income-generating buildings when resources are low
   - Balance immediate needs vs long-term strategy

2. STRATEGIC PRIORITIES:
   - Energy independence (windmills, solar, nuclear)
   - Food security (farms, greenhouses, vertical farms)
   - Population growth (apartments, housing)
   - Technology advancement (research labs, libraries)
   - Environmental protection (recycling, water treatment)

3. PLACEMENT STRATEGY:
   - Consider terrain bonuses and adjacency effects
   - Build complementary buildings near each other
   - Upgrade existing buildings when beneficial
   - Explore new areas when needed

4. TECH RESEARCH:
   - Prioritize technologies that unlock key buildings
   - Research environmental techs for sustainability
   - Balance immediate benefits vs future potential

Generate exactly 10-50 strategic actions in JSON format. Each action should be:
{
  "type": "build" | "upgrade" | "research" | "end_turn",
  "building": "building_id" (for build/upgrade),
  "position": {"q": number, "r": number} (for build),
  "tech": "tech_id" (for research),
  "priority": number (1-100, higher = more important)
}

Prioritize actions that:
- Address immediate resource shortfalls
- Create synergistic building combinations
- Advance toward victory conditions
- Respond to current climate challenges

Return ONLY the JSON array of exactly 10~50 actions, no additional text.`;
        // Call Gemini API directly
        const response = await callGeminiAPI(prompt);
        console.log('Gemini Response:', response);
        // Parse JSON from response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            console.error('No JSON found in Gemini response');
            return [];
        }
        const actions = JSON.parse(jsonMatch[0]);
        // Validate and filter actions
        const validActions = actions.filter(action => action.type && typeof action.priority === 'number');
        return validActions.slice(0, 50); // Limit to 50 actions
    }
    catch (error) {
        console.error('Gemini API error:', error);
        return [];
    }
    finally {
        isRequestingGemini = false;
    }
};
const chooseAIAction = (s) => {
    // If research is in progress, ensure no new research actions are in the queue.
    if (s.research && s.research.current) {
        geminiActionQueue = geminiActionQueue.filter(a => a.type !== 'research');
    }
    // If the action queue is empty, we need to request more actions.
    if (geminiActionQueue.length === 0) {
        // If a request is not already in flight, send one.
        if (!isRequestingGemini) {
            requestGeminiActions(s).then(actions => {
                const filteredActions = (s.research && s.research.current)
                    ? actions.filter(a => a.type !== 'research')
                    : actions;
                geminiActionQueue.push(...filteredActions);
                console.log(`Loaded ${filteredActions.length} actions from Gemini`);
            });
        }
        // Return null to signify that we are waiting for the network request and should not act.
        return null;
    }
    // If we have actions, take the next one from the queue.
    return geminiActionQueue.shift() || null;
};
const evaluateBuildingPlacement = (s, tile, building) => {
    let score = 0;
    // Base production value - weight based on current needs
    const production = building.base;
    score += (production.money || 0) * (s.resources.money < 100 ? 3 : 1);
    score += (production.energy || 0) * (s.resources.energy < 50 ? 4 : 2);
    score += (production.population || 0) * 2;
    score += (production.food || 0) * (s.resources.food < s.resources.population ? 3 : 1);
    score -= (production.carbon || 0) * 4; // Negative carbon is very good
    // Terrain bonuses  
    const terrainStr = tile.terrain;
    if (building.id === 'solar_panel' && terrainStr === 'desert')
        score += 15;
    if (building.id === 'windmill' && terrainStr === 'mountain')
        score += 15;
    if (building.id === 'farm' && (terrainStr === 'plains' || terrainStr === 'forest'))
        score += 10;
    if (building.id === 'apartment' && terrainStr === 'plains')
        score += 8;
    // Adjacency bonuses
    let adjacentBonuses = emptyProduction();
    const adjacentTiles = neighbors(tile);
    adjacentTiles.forEach(adjPos => {
        const adjTile = s.tiles.get(tileKey(adjPos));
        if (adjTile && adjTile.building && building.adjacency && building.adjacency[adjTile.building]) {
            const bonus = building.adjacency[adjTile.building];
            adjacentBonuses = addProduction(adjacentBonuses, bonus);
        }
    });
    score += (adjacentBonuses.money || 0) * 2;
    score += (adjacentBonuses.energy || 0) * 3;
    score += (adjacentBonuses.population || 0) * 2;
    score += (adjacentBonuses.food || 0) * 2;
    score -= (adjacentBonuses.carbon || 0) * 4;
    // Diversity bonus - encourage different building types
    const buildingCount = countBuildings(s, building.id);
    if (buildingCount === 0)
        score += 20; // First building of this type
    else if (buildingCount < 3)
        score += 10; // Encourage diversity
    return Math.max(score, 1); // Minimum score of 1
};
const evaluateUpgrade = (s, tile, building) => {
    // Simple upgrade evaluation
    const levelMult = levelMultCommon(tile.level + 1) - levelMultCommon(tile.level);
    let score = 0;
    score += (building.base.money || 0) * levelMult * 1;
    score += (building.base.energy || 0) * levelMult * 2;
    score += (building.base.population || 0) * levelMult * 1.5;
    score += (building.base.food || 0) * levelMult * 1;
    return Math.max(1, score);
};
const performAIAction = (action) => {
    if (!gameState)
        return;
    switch (action.type) {
        case 'build':
            if (action.building && action.position) {
                const buildingDef = gameState.buildings[action.building];
                const tile = gameState.tiles.get(tileKey(action.position));
                if (!buildingDef) {
                    console.log(`AI Action FAIL: Building '${action.building}' does not exist.`);
                }
                else if (!tile) {
                    console.log(`AI Action FAIL: Tile at ${action.position[0]},${action.position[1]} does not exist.`);
                }
                else if (tile.building) {
                    console.log(`AI Action FAIL: Tile at ${action.position[0]},${action.position[1]} is already occupied by '${tile.building}'.`);
                }
                else if (buildingDef.requiresTech && !gameState.unlockedTechs.has(buildingDef.requiresTech)) {
                    console.log(`AI Action FAIL: Building '${action.building}' requires tech '${buildingDef.requiresTech}' which is not unlocked.`);
                }
                else if (placeable(gameState, tile, buildingDef)) {
                    gameState.selectedTile = action.position;
                    buildOnTile(buildingDef.id);
                }
                else {
                    console.log(`AI Action FAIL: Cannot place '${action.building}' at ${action.position[0]},${action.position[1]}.`);
                }
            }
            break;
        case 'upgrade':
            if (action.position) {
                const tile = gameState.tiles.get(tileKey(action.position));
                if (tile && tile.building) {
                    gameState.selectedTile = action.position;
                    upgradeBuilding();
                }
                else {
                    console.log(`AI Action FAIL: No building to upgrade at ${action.position[0]},${action.position[1]}.`);
                }
            }
            break;
        case 'research':
            if (action.tech) {
                const tech = gameState.techs[action.tech];
                if (!tech) {
                    console.log(`AI Action FAIL: Tech '${action.tech}' does not exist.`);
                }
                else if (gameState.research && gameState.research.current) {
                    console.log(`AI Action FAIL: Cannot start research for '${action.tech}'. Research for '${gameState.research.current}' is already in progress.`);
                }
                else if (gameState.availableTechs.includes(tech.id)) {
                    gameState = startResearch(gameState, tech.id);
                }
                else {
                    console.log(`AI Action FAIL: Cannot research '${action.tech}'.`);
                }
            }
            break;
        case 'end_turn':
            gameState = endTurn(gameState);
            geminiActionQueue = []; // Clear queue to force new request
            break;
    }
    update();
};
function totalEnergy(s) {
    let e = 0;
    s.tiles.forEach(t => {
        if (t.revealed) {
            const b = t.building && s.buildings[t.building];
            if (b) {
                e += (b.base.energy || 0) * t.level;
            }
        }
    });
    return e;
}
function biomeShare(s, arr) { let tot = 0, match = 0; s.tiles.forEach(t => { if (t.revealed) {
    tot++;
    if (arr.indexOf(t.terrain) >= 0)
        match++;
} }); return tot ? match / tot : 0; }
function riverTiles(s) { let r = 0; s.tiles.forEach(t => { if (t.modifier === "river")
    r++; }); return r; }
const loadGameData = async () => embeddedGameData;
const serializeState = (s) => JSON.stringify({
    tiles: Array.from(s.tiles.entries()),
    resources: s.resources,
    unlockedTechs: Array.from(s.unlockedTechs),
    availableTechs: s.availableTechs,
    predictions: s.predictions,
    turn: s.turn,
    maxTurn: s.maxTurn,
    difficulty: s.difficulty,
    selectedTile: s.selectedTile,
    camera: s.camera,
    activeEvents: s.activeEvents,
    carbonLimit: s.carbonLimit,
    kpi: s.kpi,
    difficultyData: s.difficultyData,
    seed: s.seed,
    research: s.research,
    actionHistory: gameActionHistory
});
const deserializeState = (json, data) => {
    const parsed = JSON.parse(json);
    // Restore action history if it exists in the save data
    if (parsed.actionHistory && Array.isArray(parsed.actionHistory)) {
        gameActionHistory = parsed.actionHistory;
    }
    return { ...parsed, tiles: new Map(parsed.tiles), unlockedTechs: new Set(parsed.unlockedTechs), buildings: data.buildings, techs: data.techs };
};
const save = (s) => localStorage.setItem("greenworld_save", serializeState(s));
const tryLoad = (data) => { const saved = localStorage.getItem("greenworld_save"); return saved ? deserializeState(saved, data) : null; };
function hexToRgba(hex, alpha) { const h = hex.replace("#", ""); const r = parseInt(h.slice(0, 2), 16); const g = parseInt(h.slice(2, 4), 16); const b = parseInt(h.slice(4, 6), 16); return `rgba(${r},${g},${b},${alpha})`; }
const SVG_PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="100%" height="100%" fill="#1f2937"/><g fill="#94a3b8" font-family="sans-serif" font-size="18"><text x="50%" y="52%" text-anchor="middle">image</text></g></svg>`);
const imageCache = {};
const pendingLoads = new Set();
const ensureImage = (url) => new Promise((resolve) => {
    const cached = imageCache[url];
    if (cached && cached.complete && cached.naturalWidth > 0)
        return resolve(cached);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onload = () => resolve(imageCache[url] = img);
    img.onerror = () => {
        if (!shownErrors.has(url)) {
            shownErrors.add(url);
            showError(`이미지 로드 실패: ${url} (/assets에서 찾을 수 없음)`);
        }
        const fb = new Image();
        fb.src = SVG_PLACEHOLDER;
        fb.onload = () => resolve(imageCache[url] = fb);
        fb.onerror = () => resolve(imageCache[url] = fb);
    };
    img.src = url;
    imageCache[url] = img;
});
let ctx;
const drawImageSafe = (url, x, y, w, h) => {
    const img = imageCache[url];
    if (img && img.complete && img.naturalWidth > 0)
        ctx.drawImage(img, x, y, w, h);
    else {
        if (!pendingLoads.has(url)) {
            pendingLoads.add(url);
            ensureImage(url).finally(() => pendingLoads.delete(url));
        }
        ctx.fillStyle = "#111827";
        ctx.fillRect(x, y, w, h);
    }
};
const toAssetsUrl = (name) => `assets/${encodeURIComponent(name).replace(/%2F/g, "/")}`;
const resolveAssetUrl = async (category, key) => {
    const srcMap = gameData?.assets?.[category] ?? {};
    const raw0 = (srcMap[key] ?? key);
    if (typeof raw0 !== "string" || !raw0)
        return SVG_PLACEHOLDER;
    const raw = raw0.startsWith("wiki:") ? raw0.slice(5) : raw0;
    if (/^https?:/i.test(raw))
        return raw;
    return toAssetsUrl(raw);
};
const resolveAssetAny = async (category, value) => {
    if (typeof value === "string") {
        const v = value.startsWith("wiki:") ? value.slice(5) : value;
        if (/^https?:/i.test(v))
            return v;
        return toAssetsUrl(v);
    }
    return SVG_PLACEHOLDER;
};
const resolveAssetUrlSync = (category, key) => {
    const srcMap = gameData?.assets?.[category] ?? {};
    const raw0 = (srcMap[key] ?? key);
    if (typeof raw0 !== "string" || !raw0)
        return SVG_PLACEHOLDER;
    const raw = raw0.startsWith("wiki:") ? raw0.slice(5) : raw0;
    if (/^https?:/i.test(raw))
        return raw;
    return toAssetsUrl(raw);
};
const resolveAssetAnySync = (category, value) => {
    if (typeof value === "string") {
        const v = value.startsWith("wiki:") ? value.slice(5) : value;
        if (/^https?:/i.test(v))
            return v;
        return toAssetsUrl(v);
    }
    return SVG_PLACEHOLDER;
};
const genTiles = (radius, seed, data) => {
    if (data.mapGeneration?.generateScientificMap)
        return data.mapGeneration.generateScientificMap(radius, seed);
    const tiles = new Map();
    // Enhanced map generation with large uniform terrain regions
    return generateEnhancedMap(radius, seed);
};
// Enhanced map generation with uniform terrain regions and reduced patterns
const generateEnhancedMap = (radius, seed) => {
    const tiles = new Map();
    const rng = new SeededRNG(seed);
    // Generate all tiles in range
    const allPositions = inRange({ q: 0, r: 0 }, radius);
    // Create large terrain regions (대초원 등)
    const terrainRegions = createTerrainRegions(allPositions, rng);
    // Fill tiles based on regions
    allPositions.forEach(pos => {
        const key = tileKey(pos);
        const terrain = getTerrainForPosition(pos, terrainRegions, rng);
        const isCenter = pos.q === 0 && pos.r === 0;
        const distance = Math.abs(pos.q) + Math.abs(pos.r) + Math.abs(pos.q + pos.r);
        tiles.set(key, {
            q: pos.q,
            r: pos.r,
            terrain,
            level: 1,
            revealed: distance <= 2, // Start with small explored area
            explored: distance <= 1 || isCenter
        });
    });
    // Add rivers and special modifiers
    addRiversAndModifiers(tiles, rng);
    return tiles;
};
// Simple seeded random number generator
class SeededRNG {
    seed;
    constructor(seed) {
        this.seed = seed;
    }
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    choice(array) {
        return array[Math.floor(this.next() * array.length)];
    }
}
// Create large uniform terrain regions
const createTerrainRegions = (positions, rng) => {
    const regions = [];
    const visited = new Set();
    // Define terrain types with their characteristics
    const terrainTypes = [
        { type: "grass", weight: 3, minSize: 8, maxSize: 15 }, // 대초원
        { type: "forest", weight: 2, minSize: 6, maxSize: 12 },
        { type: "mountain", weight: 2, minSize: 4, maxSize: 8 },
        { type: "desert", weight: 2, minSize: 6, maxSize: 12 },
        { type: "water", weight: 1, minSize: 3, maxSize: 6 },
        { type: "tundra", weight: 1, minSize: 5, maxSize: 10 },
        { type: "tropical", weight: 1, minSize: 4, maxSize: 8 },
        { type: "swamp", weight: 1, minSize: 3, maxSize: 7 },
        { type: "ice", weight: 1, minSize: 4, maxSize: 8 },
        { type: "volcano", weight: 1, minSize: 2, maxSize: 4 },
        { type: "canyon", weight: 1, minSize: 3, maxSize: 6 },
        { type: "oasis", weight: 1, minSize: 2, maxSize: 4 },
        { type: "plateau", weight: 2, minSize: 5, maxSize: 10 }
    ];
    // Create weighted terrain selection
    const weightedTerrains = [];
    terrainTypes.forEach(t => {
        for (let i = 0; i < t.weight; i++) {
            weightedTerrains.push(t.type);
        }
    });
    // Generate regions using flood fill
    positions.forEach(pos => {
        const key = tileKey(pos);
        if (visited.has(key))
            return;
        const terrainType = rng.choice(weightedTerrains);
        const terrainConfig = terrainTypes.find(t => t.type === terrainType);
        const targetSize = terrainConfig.minSize +
            Math.floor(rng.next() * (terrainConfig.maxSize - terrainConfig.minSize));
        const regionTiles = growRegion(pos, positions, visited, targetSize, rng);
        if (regionTiles.length > 0) {
            regions.push({
                terrain: terrainType,
                tiles: regionTiles,
                center: pos
            });
        }
    });
    return regions;
};
// Grow a terrain region from a starting position
const growRegion = (start, allPositions, visited, targetSize, rng) => {
    const region = [];
    const queue = [start];
    const regionVisited = new Set();
    while (queue.length > 0 && region.length < targetSize) {
        const current = queue.shift();
        const key = tileKey(current);
        if (visited.has(key) || regionVisited.has(key))
            continue;
        visited.add(key);
        regionVisited.add(key);
        region.push(current);
        // Add neighboring positions with some randomness
        const neighbors = getHexNeighbors(current);
        neighbors.forEach(neighbor => {
            const neighborKey = tileKey(neighbor);
            if (!visited.has(neighborKey) && !regionVisited.has(neighborKey) &&
                allPositions.some(p => p.q === neighbor.q && p.r === neighbor.r) &&
                rng.next() > 0.3) { // 70% chance to include neighbor
                queue.push(neighbor);
            }
        });
    }
    return region;
};
// Get hexagonal neighbors
const getHexNeighbors = (pos) => {
    return HEX_DIRECTIONS.map(dir => ({
        q: pos.q + dir.q,
        r: pos.r + dir.r
    }));
};
// Get terrain for a position based on regions
const getTerrainForPosition = (pos, regions, rng) => {
    const key = tileKey(pos);
    for (const region of regions) {
        if (region.tiles.some(tile => tileKey(tile) === key)) {
            return region.terrain;
        }
    }
    // Fallback terrain if not in any region
    return "grass";
};
// Add rivers and special modifiers
const addRiversAndModifiers = (tiles, rng) => {
    const tileArray = Array.from(tiles.values());
    // Add rivers connecting water bodies
    const waterTiles = tileArray.filter(t => t.terrain === "water");
    waterTiles.forEach(waterTile => {
        if (rng.next() > 0.7) { // 30% chance for river
            const riverPath = generateRiverPath(waterTile, tiles, rng);
            riverPath.forEach(pos => {
                const tile = tiles.get(tileKey(pos));
                if (tile && tile.terrain !== "water") {
                    tile.modifier = "river";
                }
            });
        }
    });
    // Add oasis in desert regions
    const desertTiles = tileArray.filter(t => t.terrain === "desert");
    desertTiles.forEach(desertTile => {
        if (rng.next() > 0.9) { // 10% chance for oasis
            desertTile.terrain = "oasis";
        }
    });
};
// Generate river path
const generateRiverPath = (start, tiles, rng) => {
    const path = [];
    let current = { q: start.q, r: start.r };
    const maxLength = 5 + Math.floor(rng.next() * 8);
    for (let i = 0; i < maxLength; i++) {
        path.push({ ...current });
        const neighbors = getHexNeighbors(current);
        const validNeighbors = neighbors.filter(n => {
            const tile = tiles.get(tileKey(n));
            return tile && tile.terrain !== "water" && !path.some(p => tileKey(p) === tileKey(n));
        });
        if (validNeighbors.length === 0)
            break;
        current = rng.choice(validNeighbors);
    }
    return path;
};
const isLab = (b) => b.id === "lab";
// BEFORE
// function applyBalancePostLoad(state) { ... }

// AFTER
function applyBalancePostLoad(state) {
    // If no state provided, just return null - don't try to access window.gameState
    if (!state || !state.buildings) {
      console.warn('[applyBalancePostLoad] skipped: state/buildings missing');
      return state || null;
    }
  
    // Apply balance changes here if needed
    // For now, just return the state as-is
  
    return state;
  }
  
let ctxCanvas;
let canvas;
let particles = [];
let lastFrameTime = 0;
const stars = [];
function initStars(count = 100) { stars.length = 0; for (let i = 0; i < count; i++) {
    stars.push({ x: Math.random(), y: Math.random(), phase: Math.random() * Math.PI * 2 });
} }
const drawHexagon = (center, size, color, selected = false, _p, modifier, fogLevel = 2) => {
    const s = size + 0.6;
    const angle0 = HEX_ROT;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = angle0 + i * Math.PI / 3;
        const x = center[0] + s * Math.cos(angle);
        const y = center[1] + s * Math.sin(angle);
        if (i === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
    }
    ctx.closePath();
    if (fogLevel > 1) {
        ctx.fillStyle = "rgba(5,15,25,0.9)";
        ctx.fill();
        ctx.strokeStyle = "rgba(100,100,100,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        return;
    }
    ctx.fillStyle = color;
    ctx.fill();
    if (selected) {
        // Add neon glow effect
        ctx.save();
        ctx.shadowColor = "#00FFFF";
        ctx.shadowBlur = 20;
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.stroke();
        // Add inner glow
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
    else {
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    if (modifier) {
        ctx.fillStyle = "rgba(100,100,255,0.3)";
        ctx.fill();
    }
};
function clipHex(x, y, size) {
    const s = size + 0.6;
    const angle0 = HEX_ROT;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = angle0 + i * Math.PI / 3;
        const px = x + s * Math.cos(a);
        const py = y + s * Math.sin(a);
        if (i === 0)
            ctx.moveTo(px, py);
        else
            ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.clip();
}
const toInt = (x) => Math.floor(Number(x) || 0);
const incomeScaled = (p, k) => ({ money: Math.floor(p.money * k), energy: p.energy, carbon: p.carbon, population: p.population, food: Math.floor(p.food * k) });
const effectiveCost = (s, b, currLevel) => {
    const base = b.cost;
    const placing = !currLevel || currLevel < 1;
    let levelMultiplier = 1;
    if (!placing) {
        // Apply dynamic pricing formula: x * level ^ y
        const level = Math.max(1, currLevel);
        const x = b.costMultiplier || DEFAULT_COST_MULTIPLIER;
        const y = b.costExponent || DEFAULT_COST_EXPONENT;
        levelMultiplier = x * Math.pow(level, y);
    }
    const k = s.difficultyData.multipliers.cost * BASE_COST_CUT * levelMultiplier;
    return { money: Math.ceil((base.money || 0) * k), energy: Math.ceil((base.energy || 0) * k), carbon: Math.ceil((base.carbon || 0) * k), population: 0, food: 0 };
};
const canAffordEffective = (s, b, currLevel) => { const c = effectiveCost(s, b, currLevel); return c.money <= s.resources.money && c.energy <= s.resources.energy; };
const labPower = (s) => {
    let sum = 0;
    s.tiles.forEach(t => { if (t && t.revealed && t.building === "lab") {
        sum += levelMultLab(Math.max(1, t.level ?? 0));
    } });
    return sum;
};
const researchPerTurn = (s) => {
    const base = labPower(s);
    if (base <= 0)
        return 0;
    const hasMaxLab = Array.from(s.tiles.values()).some(t => t.building === "lab" && t.level >= 10);
    const speedBoost = hasMaxLab ? 1.25 : 1;
    return base * speedBoost * s.difficultyData.multipliers.research;
};
/** 선행깊이 기반 티어 계산 */
const techDepth = (techs, id, memo = new Map()) => {
    if (memo.has(id))
        return memo.get(id);
    const t = techs[id];
    if (!t)
        return 1;
    const prereq = t.prereq || [];
    const d = prereq.length ? 1 + Math.max(...prereq.map(p => techDepth(techs, p, memo))) : 1;
    memo.set(id, d);
    return d;
};
const defaultResearchTime = (techId) => {
    const tier = techDepth(gameState?.techs ?? {}, techId);
    const n = 3.4;
    return Math.floor(Math.pow(tier, n) * 1.2);
};
const requiredTechForBuilding = (s, b) => {
    if (b.requiresTech)
        return b.requiresTech;
    for (const t of Object.values(s.techs)) {
        if (t.unlocks && t.unlocks.includes(b.id))
            return t.id;
    }
    return null;
};
const isBuildingUnlocked = (s, b) => {
    // 연구소는 모든 난이도에서 기본 해금 (튜토리얼 포함)
    if (b.id === "lab") {
        return true;
    }
    const req = requiredTechForBuilding(s, b);
    return req ? s.unlockedTechs.has(req) : true;
};
// isMaxLevel removed - buildings now have unlimited levels
const getBuildingEffectMultiplier = (s, b, level) => {
    // Effect formula: base + (cost_at_level * effectMultiplier)
    const cost = effectiveCost(s, b, level - 1); // cost to reach this level
    const costTotal = cost.money + cost.energy;
    const multiplier = b.effectMultiplier || DEFAULT_EFFECT_MULTIPLIER;
    return 1 + (costTotal * multiplier / 1000); // scale down for balance
};
const ensureTileMeta = (t) => { if (!t.meta)
    t.meta = {}; if (!t.meta.ability)
    t.meta.ability = { cooldown: 0, duration: 0, toggled: {}, once: {} }; return t; };
const getAbilityState = (t) => ensureTileMeta(t).meta.ability;
const pickDifficulty = (data, key) => {
    const map = { tutorial: "d01_tutorial", easy: "d01_story", normal: "d06_normal", hard: "d08_hard" };
    const resolvedKey = (map[key] ?? key);
    const byKey = data.difficulties?.[resolvedKey];
    const normal = data.difficulties?.["d06_normal"];
    const first = Object.values(data.difficulties ?? {})[0];
    const chosen = byKey ?? normal ?? first;
    if (!chosen)
        throw new Error("No difficulties configured in gameData.");
    return chosen;
};
const makeSeed = () => ((Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0);
const hasTech = (s, techId) => techId ? s.unlockedTechs.has(techId) : true;
const initState = (difficultyKey, data) => {
    const dif = pickDifficulty(data, difficultyKey);
    const seedInput = document.getElementById("seedInput");
    const chosenSeed = (seedInput && seedInput.value && !isNaN(Number(seedInput.value))) ? Number(seedInput.value) : makeSeed();
    try {
        localStorage.setItem("greenworld_last_seed", String(chosenSeed));
    }
    catch { }
    return {
        tiles: genTiles(50, chosenSeed, data),
        buildings: data.buildings || {},
        techs: data.techs || {},
        resources: { ...dif.startResources },
        turn: 1,
        maxTurn: dif.turnLimit,
        carbonLimit: dif.carbonLimit,
        unlockedTechs: new Set(),
        availableTechs: Object.keys(data.techs || {}),
        activeEvents: [],
        predictions: [],
        selectedTile: null,
        camera: { x: 0, y: 0, zoom: 1 },
        difficulty: difficultyKey,
        kpi: { last: { ...dif.startResources }, turnScores: [], actions: { builds: 0, upgrades: 0, reveals: 0 } },
        difficultyData: dif,
        seed: chosenSeed,
        research: { current: null, progress: 0, total: 0 }
    };
};
const canUnlock = (s, tech) => {
    if (s.unlockedTechs.has(tech.id))
        return false;
    if (tech.prereq && !tech.prereq.every(id => s.unlockedTechs.has(id)))
        return false;
    if (tech.requiresUnlocked && !tech.requiresUnlocked.every(id => s.unlockedTechs.has(id)))
        return false;
    if (tech.requiresAny && !tech.requiresAny.some(id => s.unlockedTechs.has(id)))
        return false;
    // Check if we can afford the tech cost
    if (!canAffordCost(s.resources, tech.cost))
        return false;
    // Space category technologies require at least one space station
    if (tech.category === "Space") {
        const hasSpaceStation = Array.from(s.tiles.values()).some(tile => tile.building && (tile.building === "space_station" || tile.building === "lunar_base" || tile.building === "mars_colony"));
        if (!hasSpaceStation)
            return false;
    }
    return tech.condition ? !!tech.condition(s) : true;
};
const doUnlock = (s, techId) => {
    const tech = s.techs[techId];
    if (!tech)
        return s;
    // 연구 완료 시에는 비용 체크 없이 바로 해금 (이미 연구 시작할 때 지불했음)
    if (s.unlockedTechs.has(tech.id))
        return s;
    if (tech.prereq && !tech.prereq.every(id => s.unlockedTechs.has(id)))
        return s;
    if (tech.requiresUnlocked && !tech.requiresUnlocked.every(id => s.unlockedTechs.has(id)))
        return s;
    if (tech.requiresAny && !tech.requiresAny.some(id => s.unlockedTechs.has(id)))
        return s;
    if (tech.condition && !tech.condition(s))
        return s;
    // 기술 해금
    const newUnlockedTechs = new Set([...s.unlockedTechs, techId]);
    // availableTechs 배열 업데이트 - 새로 해금 가능한 기술들 추가
    const newAvailableTechs = Object.values(s.techs).filter(t => {
        if (newUnlockedTechs.has(t.id))
            return false; // 이미 해금된 기술 제외
        // 전제 조건 체크 (비용은 제외)
        if (t.prereq && !t.prereq.every(id => newUnlockedTechs.has(id)))
            return false;
        if (t.requiresUnlocked && !t.requiresUnlocked.every(id => newUnlockedTechs.has(id)))
            return false;
        if (t.requiresAny && !t.requiresAny.some(id => newUnlockedTechs.has(id)))
            return false;
        return true;
    }).map(t => t.id);
    return assignObj(s, {
        unlockedTechs: newUnlockedTechs,
        availableTechs: newAvailableTechs
    });
};
const tryStartResearch = (s, techId) => {
    const t = s.techs[techId];
    if (!t) {
        showResearchError("알 수 없는 기술입니다.", `기술 ID '${techId}'를 찾을 수 없습니다.`);
        return s;
    }
    if (s.unlockedTechs.has(techId)) {
        showResearchError("이미 연구 완료된 기술입니다.", `'${labelTechName(techId, techId)}'은(는) 이미 연구가 완료되었습니다.`);
        return s;
    }
    // 연구소 존재 여부 확인
    if (labPower(s) <= 0) {
        showResearchError("연구소가 없습니다!", "기술을 연구하려면 연구소나 대학이 필요합니다. 먼저 연구소를 건설하세요.");
        // complainToAI("연구소도 없는데 연구를 시키려고 해? 말이 안 되잖아!");
        return s;
    }
    // 이미 진행 중인 연구가 있는지 확인
    // if(s.research.current) {
    //   const currentTechName = labelTechName(s.research.current, s.research.current);
    //   const newTechName = labelTechName(techId, techId);
    //   showResearchError("연구가 이미 진행 중입니다!", `현재 '${currentTechName}'을(를) 연구 중입니다. 새로운 연구 '${newTechName}'을(를) 시작하려면 현재 연구를 완료하거나 중단해야 합니다.`);
    //   // complainToAI(`아직 ${currentTechName} 연구가 끝나지도 않았는데 ${newTechName}를 연구하라고? 한 번에 하나씩 해야지!`);
    //   return s;
    // }
    if (!canUnlock(s, t)) {
        showResearchError("연구 조건이 맞지 않습니다.", `'${labelTechName(techId, techId)}' 연구에 필요한 선행 기술이나 조건이 충족되지 않았습니다.`);
        return s;
    }
    // 자원 부족 확인
    if (!canAffordCost(s.resources, t.cost)) {
        const costStr = Object.entries(t.cost).filter(([_, v]) => v > 0).map(([k, v]) => `${k}: ${v}`).join(', ');
        showResearchError("연구 비용이 부족합니다.", `'${labelTechName(techId, techId)}' 연구에 필요한 자원이 부족합니다. 필요: ${costStr}`);
        // complainToAI("돈도 없는데 연구를 하라고? 자원 관리를 제대로 해!");
        return s;
    }
    return startResearch(s, techId);
};
const progressResearch = (s) => {
    const r = s.research;
    if (!r.current)
        return s;
    const speed = researchPerTurn(s);
    if (speed <= 0)
        return s;
    const next = r.progress + speed;
    if (next >= r.total) {
        const id = r.current;
        let ns = doUnlock(s, id);
        ns = assignObj(ns, { research: { current: null, progress: 0, total: 0 } });
        // 즉시 승리
        if (id === "singularity") {
            showEndGame(ns, undefined, 'win');
        }
        showError(`연구 완료: ${labelTechName(id, id)}`);
        return ns;
    }
    return assignObj(s, { research: { ...r, progress: next } });
};
const startResearch = (s, techId) => {
    const t = s.techs[techId];
    if (!t) {
        showError("기술이 존재하지 않습니다.");
        return s;
    }
    if (s.unlockedTechs.has(techId)) {
        showError("이미 연구한 기술입니다.");
        return s;
    }
    if (!s.availableTechs.includes(techId)) {
        showError("전제 연구가 필요합니다.");
        return s;
    }
    if (!canAffordCost(s.resources, t.cost)) {
        showError("연구 비용이 부족합니다.");
        return s;
    }
    if (labPower(s) <= 0) {
        showError("연구소가 필요합니다.");
        return s;
    }
    const newResources = payCost(s.resources, t.cost);
    showError(`연구 시작: ${labelTechName(techId, techId)}`);
    // Track research action
    trackAction('research', {
        tech: techId,
        cost: t.cost
    });
    return assignObj(s, { resources: newResources, research: { current: techId, progress: 0, total: defaultResearchTime(techId) } });
};
// 연구 취소 함수 - 진행률에 따라 환불
const cancelResearch = (s) => {
    if (!s.research.current)
        return s;
    const currentTech = s.techs[s.research.current];
    if (!currentTech)
        return s;
    // 진행률 계산
    const progressPercent = s.research.progress / Math.max(1, s.research.total);
    // 환불률 결정 (진행률이 낮을수록 더 많이 환불)
    let refundRate = 0;
    if (progressPercent < 0.25)
        refundRate = 0.75; // 25% 미만 진행: 75% 환불
    else if (progressPercent < 0.5)
        refundRate = 0.5; // 50% 미만 진행: 50% 환불  
    else if (progressPercent < 0.75)
        refundRate = 0.25; // 75% 미만 진행: 25% 환불
    // 75% 이상 진행: 환불 없음
    // 환불 계산
    const refundResources = PAYABLE.reduce((acc, k) => ({
        ...acc,
        [k]: acc[k] + (currentTech.cost[k] ?? 0) * refundRate
    }), s.resources);
    const refundPercent = Math.floor(refundRate * 100);
    showError(`연구 취소: ${labelTechName(s.research.current, s.research.current)} (${refundPercent}% 환불)`);
    return assignObj(s, {
        resources: refundResources,
        research: { current: null, progress: 0, total: 0 }
    });
};
const abilityMaxedOnce = (state, key) => !!(state.once && state.once[key]);
const setAbilityOnce = (state, key) => { if (!state.once)
    state.once = {}; state.once[key] = true; };
const triggerFarmFertile = (s, tile) => {
    const st = getAbilityState(tile);
    if (abilityMaxedOnce(st, "fertile"))
        return s;
    const nbs = neighbors({ q: tile.q, r: tile.r }).map(p => ({ p, t: s.tiles.get(tileKey(p)) })).filter(x => x.t);
    const target = nbs.find(x => x.t && !x.t.building && !x.t.modifier);
    if (target && target.t) {
        const nt = assignObj(target.t, { modifier: "fertile" });
        const newTiles = new Map(s.tiles);
        newTiles.set(tileKey(target.p), nt);
        setAbilityOnce(st, "fertile");
        const self = assignObj(tile, { meta: { ...ensureTileMeta(tile).meta, ability: st } });
        newTiles.set(tileKey({ q: tile.q, r: tile.r }), self);
        return assignObj(s, { tiles: newTiles });
    }
    return s;
};
const triggerGeoVent = (s, tile) => {
    const st = getAbilityState(tile);
    if (abilityMaxedOnce(st, "vent"))
        return s;
    const nbs = neighbors({ q: tile.q, r: tile.r }).map(p => ({ p, t: s.tiles.get(tileKey(p)) })).filter(x => x.t);
    const target = nbs.find(x => x.t && (x.t.terrain === "mountain" || x.t.terrain === "volcano"));
    if (target && target.t) {
        const nt = assignObj(target.t, { modifier: "vent" });
        const newTiles = new Map(s.tiles);
        newTiles.set(tileKey(target.p), nt);
        setAbilityOnce(st, "vent");
        const self = assignObj(tile, { meta: { ...ensureTileMeta(tile).meta, ability: st } });
        newTiles.set(tileKey({ q: tile.q, r: tile.r }), self);
        return assignObj(s, { tiles: newTiles });
    }
    return s;
};
const triggerOasis = (s, tile) => {
    const st = getAbilityState(tile);
    if (abilityMaxedOnce(st, "oasis"))
        return s;
    const nbs = neighbors({ q: tile.q, r: tile.r }).map(p => ({ p, t: s.tiles.get(tileKey(p)) })).filter(x => x.t);
    const target = nbs.find(x => x.t && x.t.terrain === "desert");
    if (target && target.t) {
        const nt = assignObj(target.t, { terrain: "oasis" });
        const newTiles = new Map(s.tiles);
        newTiles.set(tileKey(target.p), nt);
        setAbilityOnce(st, "oasis");
        const self = assignObj(tile, { meta: { ...ensureTileMeta(tile).meta, ability: st } });
        newTiles.set(tileKey({ q: tile.q, r: tile.r }), self);
        return assignObj(s, { tiles: newTiles });
    }
    return s;
};
const baseTileProd = (s, tile, b) => ({ ...b.base });
const computeAdjacency = (s, tile, b) => {
    let bonus = emptyProduction();
    const matched = [];
    const details = [];
    neighbors({ q: tile.q, r: tile.r }).forEach(nPos => {
        const n = s.tiles.get(tileKey(nPos));
        if (!n)
            return;
        const keys = [n.terrain, n.modifier, n.building].filter(Boolean);
        keys.forEach(k => {
            const add = b.adjacency[k];
            if (add) {
                bonus = addProduction(bonus, add);
                matched.push(String(k));
                // Add detailed info for UI display
                let sourceName = k;
                if (k === n.building && s.buildings[k]) {
                    sourceName = s.buildings[k].name;
                }
                else if (k === n.terrain) {
                    sourceName = KO.terrains[k] || k;
                }
                details.push({ source: sourceName, bonus: add });
            }
        });
    });
    const types = Array.from(new Set(matched));
    const n = types.length;
    const synergy = Math.min(3.0, 1 + 0.3 * n + 0.15 * (n * (n - 1)) / 2);
    return { bonus, types, synergy, details };
};
const nearbyWithin = (s, center, radius) => inRange(center, radius).map(p => s.tiles.get(tileKey(p))).filter(Boolean);
const techTierOfBuilding = (s, b) => {
    const req = requiredTechForBuilding(s, b);
    if (!req)
        return 1;
    const t = s.techs[req];
    if (!t)
        return 1;
    const d = techDepth(s.techs, req);
    return t.tier ?? d;
};
const applyTierScaling = (s, b, p) => {
    const tier = techTierOfBuilding(s, b);
    const mult = 1 + 0.07 * (tier - 1);
    if (mult === 1)
        return p;
    const out = { ...p };
    if (out.money > 0)
        out.money = Math.floor(out.money * mult);
    if (out.energy > 0)
        out.energy = Math.floor(out.energy * mult);
    if (out.food > 0)
        out.food = Math.floor(out.food * mult);
    if (out.population > 0)
        out.population = Math.floor(out.population * mult);
    if (out.carbon < 0)
        out.carbon = Math.floor(out.carbon * mult);
    if (out.carbon > 0)
        out.carbon = Math.ceil(out.carbon / Math.max(1, Math.sqrt(mult))); // 고티어일수록 배출 효율
    return out;
};
// Enhanced multi-distance adjacency bonus calculation
const calculateEnhancedAdjacencyBonus = (s, tile, building) => {
    let totalBonus = emptyProduction();
    // Distance-based adjacency calculations
    const distance1Tiles = neighbors(tile); // 1칸 떨어진 타일
    const distance2Tiles = getDistance2Neighbors(tile); // 2칸 떨어진 타일
    // 1칸 거리 계산 (기본 인접 보너스 + 지형 매칭 보너스)
    distance1Tiles.forEach(pos => {
        const adjTile = s.tiles.get(tileKey(pos));
        if (!adjTile || !adjTile.revealed)
            return;
        // 기존 건물 인접 보너스
        if (adjTile.building && building.adjacency?.[adjTile.building]) {
            const bonus = building.adjacency[adjTile.building];
            totalBonus = addProduction(totalBonus, bonus);
        }
        // 지형 인접 보너스 (강화된 시스템)
        const terrainBonus = getEnhancedTerrainBonus(building.id, tile.terrain, adjTile.terrain, 1);
        totalBonus = addProduction(totalBonus, terrainBonus);
    });
    // 2칸 거리 계산 (감소된 효과하지만 더 많은 범위)
    distance2Tiles.forEach(pos => {
        const adjTile = s.tiles.get(tileKey(pos));
        if (!adjTile || !adjTile.revealed)
            return;
        // 지형 인접 보너스 (2칸 거리는 50% 효과)
        const terrainBonus = getEnhancedTerrainBonus(building.id, tile.terrain, adjTile.terrain, 2);
        totalBonus = addProduction(totalBonus, scaleProduction(terrainBonus, 0.5));
        // 특정 건물 조합 보너스 (2칸 거리)
        if (adjTile.building) {
            const distanceBonus = getDistance2BuildingBonus(building.id, adjTile.building);
            totalBonus = addProduction(totalBonus, distanceBonus);
        }
    });
    return totalBonus;
};
// 2칸 떨어진 이웃 타일들을 구하는 함수
const getDistance2Neighbors = (tile) => {
    const coords = [];
    const directions = [
        { q: 2, r: -1 }, { q: 1, r: -2 }, { q: -1, r: -1 },
        { q: -2, r: 1 }, { q: -1, r: 2 }, { q: 1, r: 1 },
        { q: 2, r: 0 }, { q: 0, r: -2 }, { q: -2, r: 0 },
        { q: 0, r: 2 }, { q: 1, r: -1 }, { q: -1, r: 1 }
    ];
    directions.forEach(dir => {
        coords.push({ q: tile.q + dir.q, r: tile.r + dir.r });
    });
    return coords;
};
// 강화된 지형 인접 보너스 (2-20배 증가)
const getEnhancedTerrainBonus = (buildingId, centerTerrain, adjacentTerrain, distance) => {
    const bonusMultiplier = distance === 1 ? 1.0 : 0.5;
    // 지형별 건물 특화 보너스 정의 (모든 건물 포함)
    const terrainBonuses = {
        // 잔디 지형 특화
        grass: {
            farm: {
                grass: { money: 0, energy: 0, carbon: -1, population: 0, food: 8 }, // 농업 최적화
                tropical: { money: 0, energy: 0, carbon: -2, population: 0, food: 6 }
            },
            windmill: {
                grass: { money: 0, energy: 6, carbon: -1, population: 0, food: 0 }, // 평지 바람
                plateau: { money: 0, energy: 4, carbon: 0, population: 0, food: 0 }
            },
            house: {
                grass: { money: 2, energy: 0, carbon: -1, population: 4, food: 0 }, // 전원주택
                forest: { money: 1, energy: 0, carbon: -2, population: 3, food: 1 }
            },
            apartment: {
                grass: { money: 1, energy: 0, carbon: -2, population: 8, food: 0 }, // 교외주거
                forest: { money: 3, energy: 0, carbon: -4, population: 12, food: 0 }
            }
        },
        // 산악 지형 특화
        mountain: {
            windmill: {
                mountain: { money: 0, energy: 15, carbon: -2, population: 0, food: 0 }, // 고고도 바람
                plateau: { money: 0, energy: 8, carbon: -1, population: 0, food: 0 }
            },
            geothermal: {
                mountain: { money: 0, energy: 20, carbon: -3, population: 0, food: 0 }, // 화산활동
                volcano: { money: 0, energy: 25, carbon: -4, population: 0, food: 0 }
            },
            mountain_lodge: {
                mountain: { money: 8, energy: 0, carbon: -2, population: 5, food: 0 },
                forest: { money: 5, energy: 0, carbon: -3, population: 3, food: 2 }
            },
            nuclear_plant: {
                mountain: { money: 0, energy: 12, carbon: 0, population: 0, food: 0 }, // 격리된 위치
                ice: { money: 0, energy: 8, carbon: -1, population: 0, food: 0 }
            }
        },
        // 사막 지형 특화
        desert: {
            solar_panel: {
                desert: { money: 0, energy: 18, carbon: -2, population: 0, food: 0 }, // 강한 햇빛
                oasis: { money: 0, energy: 10, carbon: -1, population: 0, food: 0 }
            },
            greenhouse: {
                desert: { money: 0, energy: 0, carbon: 0, population: 0, food: 12 }, // 온도조절
                oasis: { money: 0, energy: 0, carbon: 0, population: 0, food: 8 }
            },
            tent: {
                desert: { money: 1, energy: 0, carbon: 0, population: 3, food: 0 }, // 유목생활
                oasis: { money: 2, energy: 0, carbon: 0, population: 2, food: 2 }
            }
        },
        // 물 지형 특화
        water: {
            water_treatment: {
                water: { money: 5, energy: 0, carbon: -5, population: 8, food: 3 }, // 직접 처리
                river: { money: 8, energy: 0, carbon: -8, population: 12, food: 5 }
            }
        },
        // 숲 지형 특화
        forest: {
            apartment: {
                forest: { money: 3, energy: 0, carbon: -4, population: 12, food: 0 }, // 산림욕
                tropical: { money: 4, energy: 0, carbon: -5, population: 15, food: 2 }
            },
            forest_reserve: {
                forest: { money: 0, energy: 0, carbon: -10, population: 8, food: 4 }, // 생태보전
                tropical: { money: 0, energy: 0, carbon: -8, population: 6, food: 6 }
            },
            ecovillage: {
                forest: { money: 0, energy: 0, carbon: -8, population: 6, food: 3 }, // 자연친화
                tropical: { money: 0, energy: 0, carbon: -6, population: 4, food: 5 }
            },
            park: {
                forest: { money: 0, energy: 0, carbon: -6, population: 8, food: 0 }, // 자연공원
                grass: { money: 0, energy: 0, carbon: -4, population: 6, food: 0 }
            }
        },
        // 열대 지형 특화
        tropical: {
            vertical_farm: {
                tropical: { money: 0, energy: 0, carbon: -2, population: 0, food: 20 }, // 고온다습
                forest: { money: 0, energy: 0, carbon: -3, population: 0, food: 15 }
            },
            apartment: {
                tropical: { money: 4, energy: 0, carbon: -5, population: 15, food: 2 }, // 리조트형
                forest: { money: 3, energy: 0, carbon: -4, population: 12, food: 0 }
            }
        },
        // 툰드라 지형 특화
        tundra: {
            tundra_shelter: {
                tundra: { money: 3, energy: 2, carbon: 1, population: 8, food: 0 }, // 혹독한 환경
                ice: { money: 5, energy: 1, carbon: 0, population: 6, food: 0 }
            },
            tent: {
                tundra: { money: 0, energy: 1, carbon: 0, population: 2, food: 1 }, // 이누이트 생활
                ice: { money: 0, energy: 0, carbon: 0, population: 1, food: 2 }
            }
        },
        // 늪 지형 특화
        swamp: {
            water_treatment: {
                swamp: { money: 8, energy: 0, carbon: -12, population: 5, food: 8 }, // 자연정화
                water: { money: 5, energy: 0, carbon: -8, population: 8, food: 5 }
            }
        },
        // 얼음 지형 특화
        ice: {
            ice_mining: {
                ice: { money: 12, energy: 3, carbon: 0, population: 0, food: 0 }, // 자원채취
                tundra: { money: 8, energy: 2, carbon: 0, population: 0, food: 0 }
            },
            nuclear_plant: {
                ice: { money: 0, energy: 15, carbon: -2, population: 0, food: 0 }, // 냉각효율
                tundra: { money: 0, energy: 10, carbon: -1, population: 0, food: 0 }
            }
        },
        // 화산 지형 특화
        volcano: {
            geothermal: {
                volcano: { money: 0, energy: 25, carbon: -4, population: 0, food: 0 }, // 직접연결
                mountain: { money: 0, energy: 20, carbon: -3, population: 0, food: 0 }
            },
            volcano_forge: {
                volcano: { money: 15, energy: 5, carbon: 2, population: 0, food: 0 }, // 용암활용
                mountain: { money: 10, energy: 3, carbon: 1, population: 0, food: 0 }
            }
        },
        // 협곡 지형 특화
        canyon: {
            canyon_windcatcher: {
                canyon: { money: 0, energy: 12, carbon: -3, population: 0, food: 0 }, // 풍량집중
                mountain: { money: 0, energy: 8, carbon: -2, population: 0, food: 0 }
            },
            canyon_echo_lab: {
                canyon: { money: 15, energy: 2, carbon: 0, population: 3, food: 0 }, // 음향연구
                mountain: { money: 10, energy: 1, carbon: 0, population: 2, food: 0 }
            }
        },
        // 오아시스 지형 특화
        oasis: {
            farm: {
                oasis: { money: 0, energy: 0, carbon: -2, population: 0, food: 10 }, // 물공급
                desert: { money: 0, energy: 0, carbon: -1, population: 0, food: 6 }
            },
            greenhouse: {
                oasis: { money: 0, energy: -1, carbon: 0, population: 0, food: 15 }, // 관개농업
                desert: { money: 0, energy: 0, carbon: 0, population: 0, food: 12 }
            }
        },
        // 고원 지형 특화
        plateau: {
            solar_panel: {
                plateau: { money: 0, energy: 12, carbon: -2, population: 0, food: 0 }, // 고도효과
                desert: { money: 0, energy: 18, carbon: -3, population: 0, food: 0 }
            },
            windmill: {
                plateau: { money: 0, energy: 10, carbon: -1, population: 0, food: 0 }, // 고지대 바람
                mountain: { money: 0, energy: 15, carbon: -2, population: 0, food: 0 }
            },
            space_station: {
                plateau: { money: 10, energy: 8, carbon: 0, population: 5, food: 0 }, // 발사기지
                mountain: { money: 15, energy: 12, carbon: 0, population: 8, food: 0 }
            }
        },
        // 산업 건물들의 범용 보너스
        universal: {
            factory: {
                mountain: { money: 5, energy: 0, carbon: 1, population: 0, food: 0 }, // 채굴업
                desert: { money: 3, energy: 2, carbon: 0, population: 0, food: 0 }, // 태양열
                ice: { money: 8, energy: 0, carbon: -1, population: 0, food: 0 } // 냉각
            },
            lab: {
                mountain: { money: 8, energy: 2, carbon: 0, population: 3, food: 0 }, // 고도연구
                ice: { money: 12, energy: 3, carbon: 0, population: 2, food: 0 }, // 극한연구
                desert: { money: 6, energy: 1, carbon: 0, population: 1, food: 0 } // 건조환경
            },
            university: {
                forest: { money: 5, energy: 0, carbon: -2, population: 8, food: 0 }, // 캠퍼스
                grass: { money: 3, energy: 0, carbon: -1, population: 6, food: 0 }, // 교외캠퍼스
                mountain: { money: 8, energy: 2, carbon: 0, population: 5, food: 0 } // 연구소
            },
            market: {
                grass: { money: 8, energy: 0, carbon: 0, population: 3, food: 0 }, // 접근성
                oasis: { money: 12, energy: 0, carbon: 0, population: 5, food: 0 }, // 교역거점
                water: { money: 10, energy: 0, carbon: 0, population: 4, food: 0 } // 항구
            },
            recycling_center: {
                forest: { money: 3, energy: 0, carbon: -8, population: 2, food: 0 }, // 친환경
                swamp: { money: 5, energy: 0, carbon: -12, population: 3, food: 0 }, // 자연분해
                ice: { money: 8, energy: 2, carbon: -6, population: 1, food: 0 } // 저온보관
            }
        }
    };
    // 먼저 해당 지형의 특화 보너스 확인
    let buildingBonuses = terrainBonuses[centerTerrain]?.[buildingId];
    // 특화 보너스가 없으면 범용 보너스 확인
    if (!buildingBonuses) {
        buildingBonuses = terrainBonuses.universal?.[buildingId];
    }
    if (!buildingBonuses)
        return emptyProduction();
    const bonus = buildingBonuses[adjacentTerrain];
    if (!bonus)
        return emptyProduction();
    return scaleProduction(bonus, bonusMultiplier);
};
// 2칸 거리 건물 조합 보너스
const getDistance2BuildingBonus = (buildingId, adjacentBuildingId) => {
    const distance2Bonuses = {
        // 농업 건물들의 2칸 거리 시너지
        farm: {
            water_treatment: { money: 0, energy: 0, carbon: 0, population: 0, food: 3 },
            market: { money: 5, energy: 0, carbon: 0, population: 0, food: 0 }
        },
        // 에너지 건물들의 2칸 거리 시너지
        windmill: {
            factory: { money: 0, energy: 2, carbon: 0, population: 0, food: 0 },
            apartment: { money: 0, energy: 1, carbon: 0, population: 2, food: 0 }
        },
        // 산업 건물들의 2칸 거리 시너지
        factory: {
            market: { money: 8, energy: 0, carbon: 0, population: 0, food: 0 },
            recycling_center: { money: 5, energy: 0, carbon: -3, population: 0, food: 0 }
        }
    };
    return distance2Bonuses[buildingId]?.[adjacentBuildingId] || emptyProduction();
};
// Enhanced production calculation with terrain modifiers, pattern bonuses, and special abilities
const calculateEnhancedProduction = (s, tile, building) => {
    // 1. Apply terrain modifier to base production
    const terrainMod = getTerrainModifier(tile.terrain, building.id);
    let baseProduction = scaleProduction(building.base, terrainMod);
    // 2. Calculate enhanced multi-distance adjacency bonuses
    const enhancedBonus = calculateEnhancedAdjacencyBonus(s, tile, building);
    let totalBonus = { ...enhancedBonus };
    // 3. Apply complex rules from bonusConfig
    const complexConditions = embeddedGameData.bonusConfig?.complexConditions;
    if (complexConditions) {
        Object.values(complexConditions).forEach(condition => {
            if (!condition.appliesTo.includes(building.id))
                return;
            let conditionMet = true;
            // Check terrain requirements
            if (condition.requiresTerrains && !condition.requiresTerrains.includes(tile.terrain)) {
                conditionMet = false;
            }
            // Check building requirements
            if (condition.requiresBuildings) {
                const adjacentBuildings = neighbors({ q: tile.q, r: tile.r })
                    .map(pos => s.tiles.get(tileKey(pos)))
                    .filter(t => t && t.building)
                    .map(t => t.building);
                if (!condition.requiresBuildings.some(req => adjacentBuildings.includes(req))) {
                    conditionMet = false;
                }
            }
            if (conditionMet) {
                totalBonus = addProduction(totalBonus, condition.bonus);
            }
        });
    }
    // 4. Apply pattern rules from bonusConfig
    const patternBonuses = embeddedGameData.bonusConfig?.patternBonuses;
    if (patternBonuses) {
        Object.values(patternBonuses).forEach(pattern => {
            if (!pattern.buildings.includes(building.id))
                return;
            let patternBonus = emptyProduction();
            switch (pattern.type) {
                case "chain":
                    if (pattern.buildings.includes(building.id)) {
                        const chainMultiplier = detectLinearChain(s, { q: tile.q, r: tile.r }, building.id);
                        if (chainMultiplier > 1.0) {
                            patternBonus = pattern.bonus;
                        }
                    }
                    break;
                case "triangle":
                    if (detectTriangleCluster(s, { q: tile.q, r: tile.r }, pattern.buildings)) {
                        patternBonus = pattern.bonus;
                    }
                    break;
                case "district":
                    if (pattern.buildings.includes(building.id)) {
                        const districtMultiplier = detectDistrict(s, { q: tile.q, r: tile.r }, building.id);
                        if (districtMultiplier > 1.0) {
                            patternBonus = pattern.bonus;
                        }
                    }
                    break;
            }
            totalBonus = addProduction(totalBonus, patternBonus);
        });
    }
    return addProduction(baseProduction, totalBonus);
};
// Check if special ability should be unlocked
const checkSpecialAbility = (s, tile, building, currentProduction) => {
    if (!building.specialAbility)
        return false;
    const baseTotal = (building.base.money || 0) + Math.abs(building.base.energy || 0) + Math.abs(building.base.carbon || 0) + Math.abs(building.base.population || 0) + Math.abs(building.base.food || 0);
    const adjBonus = computeAdjacency(s, tile, building).bonus;
    const adjTotal = Math.abs(adjBonus.money || 0) + Math.abs(adjBonus.energy || 0) + Math.abs(adjBonus.carbon || 0) + Math.abs(adjBonus.population || 0) + Math.abs(adjBonus.food || 0);
    return adjTotal >= baseTotal * 2;
};
// Apply special ability effects
const applySpecialAbility = (s, tile, building, production) => {
    if (!building.specialAbility || !checkSpecialAbility(s, tile, building, production)) {
        return production;
    }
    const ability = building.specialAbility;
    let result = { ...production };
    switch (ability.effect.type) {
        case "boost":
            if (ability.effect.bonus) {
                result = addProduction(result, ability.effect.bonus);
            }
            if (ability.effect.multiplier) {
                result = scaleProduction(result, ability.effect.multiplier);
            }
            break;
        case "transform":
            // For transform abilities, apply building-specific logic
            if (building.id === "farm" && ability.effect.scope) {
                // Farm special: double adjacent park/water_treatment bonuses
                const adjacentBonuses = neighbors({ q: tile.q, r: tile.r })
                    .map(pos => s.tiles.get(tileKey(pos)))
                    .filter(t => t && t.building && (t.building === "park" || t.building === "water_treatment"))
                    .length;
                if (adjacentBonuses > 0) {
                    result.food += adjacentBonuses * 2; // Additional bonus
                }
            }
            break;
    }
    return result;
};
const tileProductionRaw = (s, tile) => {
    if (!tile.building)
        return emptyProduction();
    const b = s.buildings[tile.building];
    if (!b)
        return emptyProduction();
    // Use enhanced production calculation
    let p = calculateEnhancedProduction(s, tile, b);
    const st = getAbilityState(tile);
    // Apply special abilities if unlocked
    p = applySpecialAbility(s, tile, b, p);
    if (b.id === "greenhouse" && tile.level >= 5)
        p = addProduction(p, { money: 0, energy: 0, carbon: 0, population: 0, food: 4 });
    if (b.id === "vertical_farm" && tile.level >= 5 && st.toggled && st.toggled["vf_night"]) {
        p = scaleProduction(p, 1.6);
        p.energy -= 3;
    }
    if (b.id === "windmill" && tile.level >= 5) {
        if (s.resources.energy < 0)
            p = scaleProduction(p, 1.5);
        if ((st.duration || 0) > 0)
            p = scaleProduction(p, 1.5);
    }
    if (b.id === "coalplant" && tile.level >= 2) {
        if (st.toggled && st.toggled["coal_scrubber"]) {
            p.energy -= 4;
            p.carbon -= 6;
        }
        if ((st.duration || 0) > 0 && st.stamp === s.turn) {
            p.energy += 10;
            p.carbon += 10;
        }
    }
    if (b.id === "nuclear_plant" && tile.level >= 3) {
        if ((st.duration || 0) > 0)
            p = scaleProduction(p, 1.4);
    }
    if (b.id === "factory" && tile.level >= 5) {
        const over = st.toggled && st.toggled["f_over"];
        const eco = st.toggled && st.toggled["f_eco"];
        const prec = st.toggled && st.toggled["f_prec"];
        if (over) {
            p = scaleProduction(p, 1.6);
            p.energy -= 2;
            p.carbon += 8;
        }
        if (eco) {
            p = scaleProduction(p, 0.75);
            p.carbon -= 2;
            p.energy += 1;
        }
        if (prec) {
            p = scaleProduction(p, 1.25);
            p.carbon -= 1;
        }
        if (hasTech(s, "automation"))
            p = scaleProduction(p, 1.1);
    }
    if (b.id === "green_factory" && tile.level >= 5) {
        const rcAdj = neighbors({ q: tile.q, r: tile.r }).map(n => s.tiles.get(tileKey(n))).filter(tn => tn && tn.building === "recycling_center").length;
        if (rcAdj > 0) {
            p.money += 2 * rcAdj;
            p.carbon -= 1 * rcAdj;
        }
    }
    if (b.id === "apartment" && tile.level >= 5) {
        if (st.chosen === "smart") {
            p.energy += 1;
            p.money += 2;
            p.carbon += 1;
        }
        if (st.chosen === "public") {
            p.population += 4;
            p.money -= 3;
        }
        if (hasTech(s, "high_density_housing"))
            p.population += 2;
    }
    const adj = computeAdjacency(s, tile, b);
    const lvlMul = isLab(b) ? levelMultLab(tile.level || 0) : levelMultCommon(tile.level || 0);
    p = scaleProduction(p, lvlMul || 1);
    if (adj.synergy !== 1)
        p = scaleProduction(p, adj.synergy);
    // Apply dynamic effect scaling based on level and cost
    const effectMultiplier = getBuildingEffectMultiplier(s, b, tile.level);
    p = scaleProduction(p, effectMultiplier);
    const auraAdd = auraAddFromNeighbors(s, tile, b);
    p = addProduction(p, auraAdd.add);
    if (auraAdd.mul !== 1)
        p = scaleProduction(p, auraAdd.mul);
    if (auraAdd.mul2 !== 1) {
        p.money = Math.floor(p.money * auraAdd.mul2);
        p.food = Math.floor(p.food * auraAdd.mul2);
    }
    if (auraAdd.energyAdd)
        p.energy += auraAdd.energyAdd;
    if (auraAdd.carbonScale !== 1)
        p.carbon = Math.floor(p.carbon * auraAdd.carbonScale);
    p = applyTierScaling(s, b, p);
    // Apply tech effects to base production
    p = applyTechEffects(s, p, b.id);
    return p;
};
const applyTechEffects = (s, production, buildingId, isAdjacency = false) => {
    let result = { ...production };
    s.unlockedTechs.forEach(techId => {
        const tech = s.techs[techId];
        if (!tech || !tech.effects)
            return;
        tech.effects.forEach(effect => {
            if (effect.type === "production_multiplier") {
                if (!effect.target || effect.target === buildingId) {
                    const mult = effect.multiplier || 1;
                    result.money = Math.floor(result.money * mult);
                    result.energy = Math.floor(result.energy * mult);
                    result.population = Math.floor(result.population * mult);
                    result.food = Math.floor(result.food * mult);
                }
                else if (effect.target === "population") {
                    result.population = Math.floor(result.population * effect.multiplier);
                }
            }
            if (effect.type === "adjacency_bonus" && isAdjacency) {
                if (!effect.target || effect.target === buildingId) {
                    const mult = effect.multiplier || 1;
                    result.money = Math.floor(result.money * mult);
                    result.energy = Math.floor(result.energy * mult);
                    result.carbon = Math.floor(result.carbon * mult);
                    result.population = Math.floor(result.population * mult);
                    result.food = Math.floor(result.food * mult);
                }
            }
            if (effect.type === "building_bonus" && effect.bonus) {
                if (!effect.target || effect.target === buildingId) {
                    result = addProduction(result, effect.bonus);
                }
            }
        });
    });
    return result;
};
const auraAddFromNeighbors = (s, tile, b) => {
    let add = emptyProduction();
    let mul = 1;
    let mul2 = 1;
    let energyAdd = 0;
    let carbonScale = 1;
    neighbors({ q: tile.q, r: tile.r }).forEach(nPos => {
        const t2 = s.tiles.get(tileKey(nPos));
        if (!t2 || !t2.building)
            return;
        const b2 = s.buildings[t2.building];
        if (!b2)
            return;
        const st2 = getAbilityState(t2);
        if (t2.level >= 5) { // Legacy maxLevel behavior
            if (b2.id === "farm") {
                if (b.id === "farm")
                    add.food += 3;
                if (b.id === "greenhouse")
                    add.food += 2;
            }
            if (b2.id === "vertical_farm") {
                if (b.id === "apartment")
                    energyAdd += 1;
                if (b.id === "market")
                    add.money += 3;
            }
            if (b2.id === "windmill" && b.id === "windmill")
                add.energy += 2;
            if (b2.id === "nuclear_plant" && (b.id === "water_treatment" || b.id === "recycling_center"))
                energyAdd += 1;
            if (b2.id === "water_treatment" && b.id === "greenhouse")
                add.food += 2;
        }
        if (b2.id === "green_factory" && t2.level >= 5 && (st2.duration || 0) > 0) {
            const dist = hexDist({ q: tile.q, r: tile.r }, { q: t2.q, r: t2.r });
            if (dist <= 2 && (b.id === "factory" || b.id === "green_factory"))
                carbonScale = Math.min(carbonScale, 0.5);
        }
    });
    const labs2 = nearbyWithin(s, { q: tile.q, r: tile.r }, 2).filter(tn => tn.building === "lab" && tn.level >= 10).length;
    if (labs2 > 0 && b.id !== "lab")
        mul *= 1.1;
    const geos2 = nearbyWithin(s, { q: tile.q, r: tile.r }, 2).filter(tn => tn.building === "geothermal" && tn.level >= 2).length;
    if (geos2 > 0 && b.id === "apartment") {
        energyAdd += geos2 * 1;
        add.money += geos2 * 1;
    }
    if (geos2 > 0 && b.id === "market") {
        add.money += geos2 * 2;
    }
    // Apply tech effects to adjacency bonuses
    add = applyTechEffects(s, add, b.id, true);
    return { add, mul, mul2, energyAdd, carbonScale };
};
const tileProduction = (s, tile) => tileProductionRaw(s, tile);
const computeTurnProduction = (s) => {
    let total = emptyProduction();
    s.tiles.forEach(t => {
        if (!t.revealed)
            return;
        const prod = tileProduction(s, t);
        const immune = (t.building === "nuclear_plant" && t.level >= 3);
        const scaled = (s.resources.energy < 0 && !immune) ? scaleProduction(prod, ENERGY_DEFICIT_MULT) : prod;
        total = addProduction(total, scaled);
    });
    return incomeScaled(total, s.difficultyData.multipliers.income);
};
const createParticle = (x, y, color) => ({ x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4 - 2, life: 60, maxLife: 60, color, size: Math.random() * 3 + 1 });
const placeOrUpgrade = (s, pos, buildingId) => {
    const tile = s.tiles.get(tileKey(pos));
    const building = s.buildings[buildingId];
    if (!tile || !building)
        return s;
    if (tile.building === buildingId) { // No level limit
        const c = effectiveCost(s, building, tile.level);
        if (!canAffordEffective(s, building, tile.level))
            return s;
        const newTile = assignObj(ensureTileMeta(tile), { level: tile.level + 1 });
        const newTiles = new Map(s.tiles);
        newTiles.set(tileKey(pos), newTile);
        for (let i = 0; i < 10; i++)
            particles.push(createParticle(pos.q * 35 + canvas.width / 2 + (Math.random() - 0.5) * 30, pos.r * 35 + canvas.height / 2 + (Math.random() - 0.5) * 30, "#4ade80"));
        let ns = assignObj(s, { tiles: newTiles, resources: { ...s.resources, money: s.resources.money - c.money, energy: s.resources.energy - c.energy }, kpi: { ...s.kpi, actions: { ...s.kpi.actions, upgrades: s.kpi.actions.upgrades + 1 } } });
        const t2 = ns.tiles.get(tileKey(pos));
        if ((t2.building === "farm" && t2.level >= 5) || (t2.building === "geothermal" && t2.level >= 2)) {
            if (t2.building === "farm")
                ns = triggerFarmFertile(ns, t2);
            if (t2.building === "geothermal")
                ns = triggerGeoVent(ns, t2);
        }
        // Track upgrade action
        trackAction('upgrade', {
            building: buildingId,
            position: pos,
            level: newTile.level,
            cost: c,
            terrain: tile.terrain
        });
        return ns;
    }
    const allowedTerrains = getExpandedTerrains(s, building.id);
    if (!canAffordEffective(s, building, 0) || !tile.revealed || tile.building || !allowedTerrains.includes(tile.terrain))
        return s;
    const c0 = effectiveCost(s, building, 0);
    const newTile = assignObj(ensureTileMeta(tile), { building: buildingId });
    const newTiles = new Map(s.tiles);
    newTiles.set(tileKey(pos), newTile);
    for (let i = 0; i < 15; i++)
        particles.push(createParticle(pos.q * 35 + canvas.width / 2 + (Math.random() - 0.5) * 40, pos.r * 35 + canvas.height / 2 + (Math.random() - 0.5) * 40, "#fbbf24"));
    let ns = assignObj(s, { tiles: newTiles, resources: { ...s.resources, money: s.resources.money - c0.money, energy: s.resources.energy - c0.energy }, kpi: { ...s.kpi, actions: { ...s.kpi.actions, builds: s.kpi.actions.builds + 1 } } });
    ns = revealAround(ns, pos, 2);
    // Track build action
    trackAction('build', {
        building: buildingId,
        position: pos,
        level: 1,
        cost: c0,
        terrain: tile.terrain
    });
    return ns;
};
const revealAround = (s, center, radius) => {
    const newTiles = new Map(s.tiles);
    let newly = 0;
    inRange(center, radius).forEach(pos => {
        const t = newTiles.get(tileKey(pos));
        if (!t)
            return;
        const wasRevealed = t.revealed;
        newTiles.set(tileKey(pos), assignObj(t, { explored: true, revealed: true }));
        if (!wasRevealed)
            newly++;
    });
    const base = assignObj(s, { tiles: newTiles });
    // Track reveal action if tiles were revealed
    if (newly > 0) {
        trackAction('reveal', {
            position: center,
            level: newly,
            terrain: s.tiles.get(tileKey(center))?.terrain
        });
    }
    return newly > 0 ? assignObj(base, { kpi: { ...s.kpi, actions: { ...s.kpi.actions, reveals: s.kpi.actions.reveals + newly } } }) : base;
};
const hasResearchLab = (s) => Array.from(s.tiles.values()).some(t => t.building === "lab" || t.building === "university");
const processClimateEvents = (s, data) => {
    let ns = { ...s };
    ns.activeEvents = (ns.activeEvents || []).map(e => ({ ...e, turnsLeft: e.turnsLeft - 1 })).filter(e => e.turnsLeft > 0);
    ns.predictions = (ns.predictions || []).map(p => { const next = (p.predictedTurns ?? 0) - 1; return next > 0 ? { ...p, predictedTurns: next } : null; }).filter(Boolean);
    const parks = countBuildings(ns, "park");
    (data.climateEvents || []).forEach(tpl => {
        if (tpl.condition(ns) && !ns.activeEvents.some(e => e.id === tpl.id)) {
            let prob = tpl.probability(ns);
            if (tpl.id === "wildfire" && parks > 0)
                prob = Math.max(0, prob - Math.min(0.15, parks * 0.01));
            const will = Math.random() < Math.min(0.95, prob);
            const intensityBase = tpl.intensity(ns);
            let intensity = intensityBase;
            if (tpl.id === "wildfire" && parks > 0)
                intensity = Math.max(1, intensity - 1);
            if (will) {
                const active = { id: tpl.id, name: tpl.name, type: tpl.type, severity: tpl.severity, description: tpl.description, image: tpl.image, intensity, duration: tpl.duration, effects: tpl.effects, prediction: tpl.prediction, turnsLeft: tpl.duration };
                ns.activeEvents = [...ns.activeEvents, active];
                createEventEffect(tpl.type, intensity);
            }
            else if (tpl.prediction > 0 && hasResearchLab(ns) && Math.random() < 0.3 && !ns.predictions.some(p => p.id === tpl.id)) {
                const pred = { id: tpl.id, name: tpl.name, type: tpl.type, severity: tpl.severity, description: tpl.description, image: tpl.image, intensity: intensityBase, duration: tpl.duration, effects: tpl.effects, prediction: tpl.prediction, turnsLeft: tpl.duration, predictedTurns: tpl.prediction };
                ns.predictions = [...ns.predictions, pred];
            }
        }
    });
    ns.activeEvents.forEach(e => { ns.resources = addProduction(ns.resources, e.effects(e.intensity)); });
    return ns;
};
const POP_MONEY_LOG_K = 11;
const countMaxed = (s, id) => Array.from(s.tiles.values()).filter(t => t.building === id && t.level >= getTraditionalMaxLevel(id)).length;
const getTraditionalMaxLevel = (id) => {
    return Infinity;
};
const countById = (s, id) => Array.from(s.tiles.values()).filter(t => t.building === id).length;
const processPopulation = (s) => {
    const turnProd = computeTurnProduction(s);
    let r = addProduction(s.resources, turnProd);
    const pop = Math.max(0, r.population);
    const foodNeed = Math.floor(pop * POP_FOOD_PER);
    const energyUse = Math.floor(pop * POP_ENERGY_PER);
    const carbonAdd = Math.floor(pop * POP_CARBON_PER);
    r.energy -= energyUse;
    r.carbon += carbonAdd;
    // Energy deficit handling - if energy goes negative, set to 0 and deduct money
    if (r.energy < 0) {
        const energyDeficit = Math.abs(r.energy);
        const moneyDeduction = energyDeficit * 2; // 2 money per energy deficit
        r.energy = 0;
        r.money -= moneyDeduction;
    }
    const netFood = r.food - foodNeed;
    const hasMarketShield = Array.from(s.tiles.values()).some(t => t.building === "market" && t.level >= 5);
    let newPop = pop;
    if (netFood < 0) {
        const shortageRatio = Math.min(3, Math.abs(netFood) / Math.max(1, foodNeed));
        let decay = 0.15 + 0.35 * shortageRatio + 0.25 * shortageRatio * shortageRatio;
        if (hasMarketShield) {
            decay *= 0.7;
            r.money -= 5;
        }
        decay = Math.min(0.95, decay);
        newPop = Math.floor(pop * (1 - decay));
        r.food = 0;
    }
    else {
        r.food = netFood;
        const foodNeedNow = Math.max(1, foodNeed);
        const surplusRatio = Math.max(0, Math.min(2, netFood / foodNeedNow));
        const growthRateBase = 0.06 + 0.11 * Math.sqrt(surplusRatio);
        let desired = Math.floor(pop * (1 + growthRateBase));
        newPop = Math.max(0, desired);
        const popIncome = Math.floor(POP_MONEY_LOG_K * Math.log10(newPop + 1));
        r.money += popIncome;
    }
    r.population = Math.max(0, newPop);
    return assignObj(s, { resources: r });
};
const computeGrade = (s) => {
    const popScore = Math.min(100, s.resources.population * 2);
    const baseCarbon = Math.max(0, 100 - Math.floor((s.resources.carbon / s.carbonLimit) * 100));
    const negCarbonBonus = s.resources.carbon < 0 ? Math.min(20, Math.floor((-s.resources.carbon / s.carbonLimit) * 100)) : 0;
    const carbonScore = baseCarbon + negCarbonBonus;
    const moneyScore = Math.min(100, Math.floor(s.resources.money / 10));
    const buildingScore = Math.min(100, Array.from(s.tiles.values()).filter(t => t.building).length * 2);
    const total = Math.round(popScore * 0.35 + carbonScore * 0.35 + moneyScore * 0.15 + buildingScore * 0.15);
    const grade = total >= 95 ? "SSS" : total >= 90 ? "SS" : total >= 80 ? "S" : total >= 70 ? "A" : total >= 60 ? "B" : total >= 50 ? "C" : "D";
    return { total, grade };
};
const showEndGame = (s, reasons, status) => {
    const gs = s || gameState;
    const isWin = status === 'win' || (gs.resources.population >= POP_WIN && gs.resources.carbon <= gs.carbonLimit);
    let html = "";
    if (isWin) {
        html += `승리! (${gs.resources.population.toLocaleString()} / ${POP_WIN.toLocaleString()})<br>`;
    }
    else if (status === 'timeout') {
        html += `시간 종료<br>`;
    }
    else if (status === 'loss') {
        html += `패배...<br>`;
    }
    html += `인구: ${gs.resources.population} / 탄소: ${gs.resources.carbon} / 돈: ${gs.resources.money}`;
    // Add Gemini AI scoring button
    html += `<br><br><button onclick="triggerGeminiScoring()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mt-4 transition-colors">🤖 Gemini AI 채점받기</button>`;
    document.getElementById("finalScore").innerHTML = html;
    showScene("endScene", reasons);
    // Automatically trigger Gemini scoring after a short delay
    setTimeout(() => {
        triggerGeminiScoring();
    }, 2000);
};
const endTurn = (s) => {
    let ns = assignObj(s, { turn: s.turn + 1 });
    // Track end turn action
    trackAction('end_turn', {
        turn: ns.turn,
        population: ns.resources.population,
        energy: ns.resources.energy,
        carbon: ns.resources.carbon
    });
    ns.tiles.forEach(t => { if (!t.meta || !t.meta.ability)
        return; const ab = t.meta.ability; if (ab.cooldown && ab.cooldown > 0)
        ab.cooldown--; if (ab.duration && ab.duration > 0)
        ab.duration--; });
    if (ns.turn % 4 === 0) {
        const hasRC = Array.from(ns.tiles.values()).some(t => t.building === "recycling_center" && t.level >= 5);
        if (hasRC)
            ns.resources = addProduction(ns.resources, { money: 2, energy: 4, carbon: -6, population: 0, food: 0 });
    }
    ns = processPopulation(ns);
    if (gameData)
        ns = processClimateEvents(ns, gameData);
    ns = progressResearch(ns);
    if (ns.resources.population >= POP_WIN && ns.resources.carbon <= ns.carbonLimit) {
        showEndGame(ns, undefined, 'win');
        return ns;
    }
    if (ns.resources.population <= 0) {
        showEndGame(ns, ['인구 붕괴'], 'loss');
        return ns;
    }
    if (ns.resources.money < 0) {
        showEndGame(ns, ['파산'], 'loss');
        return ns;
    }
    if (ns.turn > ns.maxTurn) {
        showEndGame(ns, ['턴 제한 도달'], 'timeout');
        return ns;
    }
    return ns;
};
const updateParticles = () => {
    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;
        return p.life > 0;
    });
};
const renderParticles = () => {
    particles.forEach(p => {
        const alpha = p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
};
function drawTerrainAndBuilding(s, tile, x, y, size) {
    if (!tile.revealed)
        return;
    ctx.save();
    clipHex(x, y, size);
    const tUrl = resolveAssetUrlSync("terrains", tile.terrain);
    drawImageSafe(tUrl, x - size, y - size, size * 2, size * 2);
    if (tile.building) {
        const b = s.buildings[tile.building];
        if (b) {
            const raw = (gameData?.assets?.buildingImages?.[b.id]) ?? b.id;
            const bUrl = resolveAssetAnySync("buildings", raw);
            drawImageSafe(bUrl, x - size * 0.65, y - size * 1.0, size * 1.3, size * 1.3);
        }
    }
    ctx.restore();
    if (tile.building) {
        ctx.fillStyle = "#000000aa";
        ctx.fillRect(x - 14, y + 8, 28, 12);
        ctx.fillStyle = "#fff";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Lv.${tile.level}`, x, y + 14);
    }
}
const renderBoard = (s) => {
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1e3a8a");
    gradient.addColorStop(1, "#065f46");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.003;
    stars.forEach(st => { const x = Math.floor(st.x * canvas.width); const y = Math.floor(st.y * canvas.height); const twinkle = Math.sin(t + st.phase) * 0.5 + 0.5; ctx.fillStyle = `rgba(255,255,255,${0.15 + twinkle * 0.6})`; ctx.fillRect(x, y, 1, 1); });
    ctx.save();
    const tx = Math.round(canvas.width / 2 + s.camera.x);
    const ty = Math.round(canvas.height / 2 + s.camera.y);
    ctx.translate(tx, ty);
    ctx.scale(s.camera.zoom, s.camera.zoom);
    const hexSize = 50;
    s.tiles.forEach(tile => {
        const [x, y] = axialToPixel({ q: tile.q, r: tile.r }, hexSize);
        const traditionalSelected = !!(s.selectedTile && s.selectedTile.q === tile.q && s.selectedTile.r === tile.r);
        const multiSelected = selectedTiles.has(tileKey({ q: tile.q, r: tile.r }));
        const selected = traditionalSelected || multiSelected;
        const canSee = !!tile.revealed;
        if (!canSee)
            drawHexagon([x, y], hexSize, "#0b0f19", selected, undefined, undefined, 2);
        else {
            const baseColor = multiSelected ? "#2563eb" : "#1f2937"; // Blue for multi-selected tiles
            drawHexagon([x, y], hexSize, baseColor, selected, undefined, tile.modifier, 0);
            drawTerrainAndBuilding(s, tile, x, y, hexSize);
        }
    });
    ctx.restore();
    updateParticles();
    renderParticles();
};
const animateNumber = (el, newValue, oldValue) => {
    const duration = 500, start = Date.now(), diff = newValue - oldValue;
    const update = () => {
        const elapsed = Date.now() - start, progress = Math.min(elapsed / duration, 1), ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(oldValue + diff * ease);
        el.textContent = formatNumber(current);
        el.style.transform = `scale(${1 + Math.sin(progress * Math.PI) * 0.1})`;
        if (progress < 1)
            requestAnimationFrame(update);
        else
            el.style.transform = "scale(1)";
    };
    requestAnimationFrame(update);
};
const fetchExternalData = async () => loadGameData();
const updateHUD = async (s) => {
    ["money", "energy", "carbon", "population", "food"].forEach(res => {
        const el = document.getElementById(res)?.querySelector("span");
        if (!el)
            return;
        const oldVal = parseInt(el.textContent || "0", 10);
        const newVal = s.resources[res];
        if (oldVal !== newVal)
            animateNumber(el, newVal, oldVal);
        if (s.unlockedTechs.has("singularity"))
            showEndGame(s, ['기술 승리'], 'win');
    });
    document.getElementById("turn").textContent = s.turn.toString();
    document.getElementById("maxTurn").textContent = s.maxTurn.toString();
    const carbonBar = document.getElementById("carbonBar");
    if (carbonBar) {
        const percentage = Math.min((s.resources.carbon / s.carbonLimit) * 100, 100);
        carbonBar.setAttribute("style", `width:${percentage}%;`);
        carbonBar.className = `h-2 rounded-full transition-all ${percentage > 80 ? "bg-red-500" : percentage > 60 ? "bg-yellow-500" : "bg-green-500"}`;
    }
    const eventsContainer = document.getElementById("activeEvents");
    if (eventsContainer && s.activeEvents) {
        const eventsHtml = await Promise.all(s.activeEvents.map(async (e) => {
            const img = await resolveAssetAny("events", e.image);
            return `<div class="text-xs p-2 ${e.type === "disaster" ? "bg-red-800" : "bg-green-700"} rounded mb-1 flex gap-2">

    <img src="${img}" class="w-8 h-8 object-cover rounded" />

    <div>

      <strong>${e.name}</strong> (${e.turnsLeft}턴) 강도: ${e.intensity || 1}<br><span class="text-xs">${e.description}</span>

    </div>

  </div>`;
        }));
        eventsContainer.innerHTML = eventsHtml.join("");
    }
    let predictionsContainer = document.getElementById("predictions");
    if (!predictionsContainer) {
        const hud = document.getElementById("hud");
        if (hud) {
            predictionsContainer = document.createElement("div");
            predictionsContainer.id = "predictions";
            hud.appendChild(predictionsContainer);
        }
    }
    if (predictionsContainer) {
        if (s.predictions && s.predictions.length > 0) {
            const predsHtml = await Promise.all(s.predictions.map(async (p) => {
                const img = await resolveAssetAny("events", p.image);
                const eta = p.predictedTurns ?? "?";
                return `<div class="text-xs mb-1 flex items-center gap-2">

      <img src="${img}" class="w-6 h-6 rounded object-cover" />

      <span>⚠️ ${p.name} (${eta}턴 후)</span>

    </div>`;
            }));
            predictionsContainer.innerHTML = `<div class="bg-yellow-800 p-2 rounded mb-2"><h4 class="font-bold text-sm mb-2">📡 기상 예보</h4>${predsHtml.join("")}</div>`;
        }
        else {
            predictionsContainer.innerHTML = "";
        }
    }
    let rbox = document.getElementById("researchBox");
    if (!rbox) {
        rbox = document.createElement("div");
        rbox.id = "researchBox";
        rbox.className = "bg-indigo-800 p-2 rounded mb-2 text-xs";
        document.getElementById("hud")?.appendChild(rbox);
    }
    if (s.research.current) {
        const t = s.techs[s.research.current];
        const pct = Math.floor((s.research.progress / Math.max(1, s.research.total)) * 100);
        // 환불률 계산
        const progressPercent = s.research.progress / Math.max(1, s.research.total);
        let refundRate = 0;
        if (progressPercent < 0.25)
            refundRate = 0.75;
        else if (progressPercent < 0.5)
            refundRate = 0.5;
        else if (progressPercent < 0.75)
            refundRate = 0.25;
        const refundPercent = Math.floor(refundRate * 100);
        rbox.innerHTML = `<div class="mb-1">🧪 연구: <b>${t?.name || s.research.current}</b></div><div class="w-full h-2 bg-black/30 rounded overflow-hidden mb-1"><div style="width:${pct}%;" class="h-2 bg-yellow-400"></div></div><div>연구소: ${labPower(s)} / 턴당:${researchPerTurn(s).toFixed(1)}</div><button onclick="cancelCurrentResearch()" class="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded">연구 취소 (${refundPercent}% 환불)</button>`;
    }
    else {
        rbox.innerHTML = `<div>🧪 대기 중: 연구 선택 없음</div>`;
    }
    updateTutorialDock(s);
};
/** 빌딩 팔레트: 해금 즉시 반영 */
const updateBuildingPalette = async (s) => {
    const list = document.getElementById("buildingList");
    list.innerHTML = "";
    const all = Object.values(s.buildings).filter(b => isBuildingUnlocked(s, b)).sort((a, b) => a.name.localeCompare(b.name));
    for (const b of all) {
        const btn = document.createElement("button");
        const iconRaw = (gameData?.assets?.buildingImages?.[b.id]) ?? b.id;
        const iconUrl = await resolveAssetAny("buildings", iconRaw);
        const ec = effectiveCost(s, b, 0);
        const affordable = canAffordEffective(s, b, 0);
        const isSelected = selectedBuilding?.id === b.id;
        btn.className = `p-2 rounded text-xs transition-all duration-200 transform hover:scale-105 ${affordable ? "bg-green-700 hover:bg-green-600" : "bg-gray-700 hover:bg-gray-600"} ${isSelected ? "ring-2 ring-yellow-400" : ""}`;
        btn.innerHTML = `<div class="mb-1 flex items-center justify-center"><img src="${iconUrl}" alt="${b.name}" class="w-7 h-7 object-cover rounded" loading="lazy" /></div><div class="text-[10px] leading-3 mb-1 text-center">${b.name}</div><div class="text-[10px] text-gray-300 text-center">💰${formatNumber(ec.money)} ⚡${formatNumber(ec.energy)}</div>`;
        btn.onclick = () => {
            selectedBuilding = selectedBuilding?.id === b.id ? null : b;
            updateSelectedBuildingDisplay(s);
            update();
        };
        list.appendChild(btn);
    }
    updateSelectedBuildingDisplay(s);
};
const updateSelectedBuildingDisplay = async (s) => {
    const palette = document.getElementById("palette");
    let indicator = document.getElementById("selectedBuildingIndicator");
    if (!indicator) {
        indicator = document.createElement("div");
        indicator.id = "selectedBuildingIndicator";
        indicator.className = "mt-2 p-2 bg-yellow-700 bg-opacity-50 rounded border border-yellow-400";
        palette?.appendChild(indicator);
    }
    if (selectedBuilding && s.buildings[selectedBuilding.id]) {
        const building = s.buildings[selectedBuilding.id];
        const iconRaw = (gameData?.assets?.buildingImages?.[building.id]) ?? building.id;
        const iconUrl = await resolveAssetAny("buildings", iconRaw);
        indicator.innerHTML = `<div class="text-xs text-yellow-200 mb-1">선택된 건물:</div><div class="flex items-center gap-2"><img src="${iconUrl}" class="w-5 h-5 rounded" /><span class="text-sm font-bold text-yellow-100">${building.name}</span></div>`;
        indicator.classList.remove("hidden");
    }
    else {
        indicator.classList.add("hidden");
    }
};
const formatAdjList = (arr) => arr.map(t => `<code>${t}</code>`).join(", ");
// 숫자를 1.7K, 5.2M 형식으로 축약 표시
const formatNumber = (num) => {
    const abs = Math.abs(num);
    const units = [
        { value: 1e12, suffix: "T" }, // 조 단위
        { value: 1e9, suffix: "B" }, // 억 단위 (Billion)
        { value: 1e6, suffix: "M" }, // 백만 단위
        { value: 1e3, suffix: "K" }, // 천 단위
    ];
    for (const { value, suffix } of units) {
        if (abs >= value) {
            return (num / value).toFixed(1).replace(/\.0$/, "") + suffix;
        }
    }
    return num.toString();
};
let currentTechCategory = "all";
const getTierColor = (tier) => {
    const colors = ["#64748b", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#dc2626", "#7c3aed", "#059669", "#d97706", "#000000"];
    return colors[Math.max(0, Math.min(tier - 1, colors.length - 1))] || "#64748b";
};
const getTierName = (tier) => {
    const names = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
    return names[Math.max(0, Math.min(tier - 1, names.length - 1))] || "I";
};
const updateTechTree = (s) => {
    const tree = document.getElementById("techTree");
    tree.innerHTML = "";
    // Setup tab functionality
    const tabs = document.querySelectorAll(".tech-tab");
    tabs.forEach(tab => {
        tab.classList.remove("border-blue-400", "text-blue-400");
        if (tab.getAttribute("data-category") === currentTechCategory) {
            tab.classList.add("border-blue-400", "text-blue-400");
        }
        tab.onclick = () => {
            currentTechCategory = tab.getAttribute("data-category") || "all";
            updateTechTree(s);
        };
    });
    const techs = Object.values(s.techs);
    let filteredTechs = currentTechCategory === "all" ? techs : techs.filter(t => t.category === currentTechCategory);
    // Group by tier for better display
    const byTier = {};
    filteredTechs.forEach(t => {
        const tier = t.tier || 1;
        (byTier[tier] || (byTier[tier] = [])).push(t);
    });
    Object.keys(byTier).sort((a, b) => Number(a) - Number(b)).forEach(tierStr => {
        const tier = Number(tierStr);
        const tierTechs = byTier[tier];
        const tierSection = document.createElement("div");
        tierSection.className = "mb-4";
        const tierHeader = document.createElement("div");
        tierHeader.className = "flex items-center mb-2";
        tierHeader.innerHTML = `<div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3" style="background-color: ${getTierColor(tier)}">${getTierName(tier)}</div><span class="font-bold">티어 ${tier}</span>`;
        tierSection.appendChild(tierHeader);
        const techGrid = document.createElement("div");
        techGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3";
        tierTechs?.sort((a, b) => a.name.localeCompare(b.name)).forEach(tech => {
            const owned = s.unlockedTechs.has(tech.id);
            const ready = canUnlock(s, tech);
            const isCurr = s.research.current === tech.id;
            const pct = isCurr ? Math.floor((s.research.progress / Math.max(1, s.research.total)) * 100) : 0;
            const card = document.createElement("div");
            const tierColor = getTierColor(tech.tier || 1);
            card.className = `p-3 rounded-lg border-l-4 transition-all cursor-pointer`;
            card.style.borderLeftColor = tierColor;
            if (owned) {
                card.className += ` bg-green-800 hover:bg-green-700`;
            }
            else if (isCurr) {
                card.className += ` bg-indigo-700 hover:bg-indigo-600`;
            }
            else if (ready) {
                card.className += ` bg-blue-700 hover:bg-blue-600`;
            }
            else {
                card.className += ` bg-gray-700 hover:bg-gray-600`;
            }
            let content = `<div class="flex items-center justify-between mb-2">`;
            content += `<h4 class="font-bold text-sm">${tech.name}</h4>`;
            content += `<span class="px-2 py-1 rounded text-xs font-bold text-white" style="background-color: ${tierColor}">${getTierName(tech.tier || 1)}</span>`;
            content += `</div>`;
            content += `<p class="text-xs opacity-90 mb-2">${tech.description}</p>`;
            // 기술 비용 표시
            if (tech.cost) {
                const costParts = [];
                if (tech.cost.money && tech.cost.money > 0)
                    costParts.push(`💰 ${formatNumber(tech.cost.money)}`);
                if (tech.cost.energy && tech.cost.energy > 0)
                    costParts.push(`⚡ ${formatNumber(tech.cost.energy)}`);
                if (tech.cost.carbon && tech.cost.carbon > 0)
                    costParts.push(`🌱 ${formatNumber(tech.cost.carbon)}`);
                if (tech.cost.population && tech.cost.population > 0)
                    costParts.push(`👥 ${formatNumber(tech.cost.population)}`);
                if (tech.cost.food && tech.cost.food > 0)
                    costParts.push(`🍞 ${formatNumber(tech.cost.food)}`);
                if (costParts.length > 0)
                    content += `<div class="text-xs opacity-80 mb-1">비용: ${costParts.join(", ")}</div>`;
            }
            // 선행 기술을 한국어 이름으로 표시
            if (tech.prereq?.length) {
                const prereqNames = tech.prereq.map(p => {
                    const techObj = embeddedGameData.techs[p];
                    return techObj?.name || p;
                });
                content += `<div class="text-xs opacity-70 mb-1">📋 선행: ${prereqNames.join(", ")}</div>`;
            }
            // 해금 건물을 한국어 이름으로 표시
            if (tech.unlocks?.length) {
                const unlockNames = tech.unlocks.map(bid => {
                    const buildingObj = embeddedGameData.buildings[bid];
                    return buildingObj?.name || bid;
                });
                content += `<div class="text-xs opacity-90 mb-1">🔓 해금: ${unlockNames.join(", ")}</div>`;
            }
            if (owned)
                content += `<div class="text-xs mt-2 font-bold">✅ 완료</div>`;
            else if (isCurr)
                content += `<div class="text-xs mt-2">⏳ 진행중: ${pct}%</div>`;
            else if (ready)
                content += `<div class="text-xs mt-2">🔬 연구 시작 가능</div>`;
            card.innerHTML = content;
            if (!owned && !isCurr && ready) {
                card.onclick = () => {
                    gameState = tryStartResearch(s, tech.id);
                    update();
                };
            }
            techGrid.appendChild(card);
        });
        tierSection.appendChild(techGrid);
        tree.appendChild(tierSection);
    });
};
const selectedAbilityLabel = (t) => {
    const st = getAbilityState(t);
    if (!t.building)
        return "";
    if (t.building === "apartment")
        return st.chosen === "smart" ? "스마트홈" : st.chosen === "public" ? "공공임대" : "선택 없음";
    return "";
};
const abilityActivate = (s, tile, ability) => {
    const key = tileKey({ q: tile.q, r: tile.r });
    const t = s.tiles.get(key);
    if (!t)
        return s;
    const st = getAbilityState(t);
    const now = s.turn;
    if (ability === "greenhouse_ventilation") {
        if ((st.cooldown || 0) > 0)
            return s;
        st.duration = 3;
        st.cooldown = 6;
        st.stamp = now;
    }
    else if (ability === "wind_pitch") {
        if ((st.cooldown || 0) > 0)
            return s;
        st.duration = 2;
        st.cooldown = 5;
        st.stamp = now;
    }
    else if (ability === "solar_clean") {
        if ((st.cooldown || 0) > 0)
            return s;
        st.duration = 1;
        st.cooldown = 8;
        st.stamp = now;
    }
    else if (ability === "coal_peak") {
        if ((st.cooldown || 0) > 0)
            return s;
        st.duration = 1;
        st.cooldown = 6;
        st.stamp = now;
    }
    else if (ability === "nuclear_follow") {
        if ((st.cooldown || 0) > 0)
            return s;
        st.duration = 3;
        st.cooldown = 8;
        st.stamp = now;
    }
    else if (ability === "gfactory_lcp") {
        if ((st.cooldown || 0) > 0)
            return s;
        st.duration = 3;
        st.cooldown = 8;
        st.stamp = now;
    }
    else if (ability === "market_logistics") {
        if ((st.cooldown || 0) > 0)
            return s;
        const spend = Math.min(10, Math.max(0, s.resources.food));
        if (spend <= 0) {
            showError("식량이 부족합니다.");
            return s;
        }
        const nsr = addProduction(s.resources, { money: spend, energy: 0, carbon: 0, population: 0, food: -spend });
        st.cooldown = 5;
        st.stamp = now;
        const nt = assignObj(t, { meta: { ...ensureTileMeta(t).meta, ability: st } });
        const tiles = new Map(s.tiles);
        tiles.set(key, nt);
        return assignObj(s, { tiles, resources: nsr });
    }
    else if (ability === "wt_oasis") {
        const sn = triggerOasis(s, t);
        return sn;
    }
    else if (ability === "wt_flood") {
        if ((st.cooldown || 0) > 0)
            return s;
        st.duration = 4;
        st.cooldown = 10;
        st.stamp = now;
    }
    else if (ability === "rc_wte") { }
    const nt = assignObj(t, { meta: { ...ensureTileMeta(t).meta, ability: st } });
    const tiles = new Map(s.tiles);
    tiles.set(key, nt);
    return assignObj(s, { tiles });
};
const abilityToggle = (s, tile, key) => {
    const tk = tileKey({ q: tile.q, r: tile.r });
    const t = s.tiles.get(tk);
    if (!t)
        return s;
    const st = getAbilityState(t);
    if (!st.toggled)
        st.toggled = {};
    st.toggled[key] = !st.toggled[key];
    if (t.building === "factory") {
        if (key === "f_over" && st.toggled["f_over"])
            st.toggled["f_eco"] = false;
        if (key === "f_eco" && st.toggled["f_eco"])
            st.toggled["f_over"] = false;
    }
    const nt = assignObj(t, { meta: { ...ensureTileMeta(t).meta, ability: st } });
    const tiles = new Map(s.tiles);
    tiles.set(tk, nt);
    return assignObj(s, { tiles });
};
const abilityChoose = (s, tile, choice) => {
    const tk = tileKey({ q: tile.q, r: tile.r });
    const t = s.tiles.get(tk);
    if (!t)
        return s;
    const st = getAbilityState(t);
    if (!st.chosen)
        st.chosen = choice;
    const nt = assignObj(t, { meta: { ...ensureTileMeta(t).meta, ability: st } });
    const tiles = new Map(s.tiles);
    tiles.set(tk, nt);
    return assignObj(s, { tiles });
};
const updateTileInfo = async (s) => {
    const panel = document.getElementById("tileDetails");
    const infoWrap = document.getElementById("tileInfo");
    if (!panel || !s.selectedTile) {
        infoWrap?.classList.add("hidden");
        return;
    }
    const tile = s.tiles.get(tileKey(s.selectedTile));
    if (!tile || !tile.revealed) {
        infoWrap?.classList.add("hidden");
        return;
    }
    infoWrap?.classList.remove("hidden");
    const tImg = await resolveAssetUrl("terrains", tile.terrain);
    const building = tile.building ? s.buildings[tile.building] : null;
    const bImgUrl = building ? await resolveAssetAny("buildings", (gameData?.assets?.buildingImages?.[building.id]) ?? building.id) : null;
    const available = Object.values(s.buildings).filter(b => {
        const allowedTerrains = getExpandedTerrains(s, b.id);
        return isBuildingUnlocked(s, b) && allowedTerrains.includes(tile.terrain) && !tile.building;
    });
    const availableHtml = await Promise.all(available.map(async (b) => {
        const iconUrl = await resolveAssetAny("buildings", (gameData?.assets?.buildingImages?.[b.id]) ?? b.id);
        const ec = effectiveCost(s, b, 0);
        const affordable = canAffordEffective(s, b, 0);
        return `<button class="w-full p-2 mb-1 rounded text-xs transition-all transform hover:scale-105 ${affordable ? "bg-green-700 hover:bg-green-600" : "bg-gray-700 cursor-not-allowed"}" onclick="buildOnTile('${b.id}')" ${!affordable ? "disabled" : ""}><div class="flex items-center gap-2"><img src="${iconUrl}" class="w-5 h-5 rounded" /><div class="flex-1 text-left"><div class="font-bold">${b.name}</div><div class="text-xs opacity-75">💰${formatNumber(ec.money)} ⚡${formatNumber(ec.energy)}</div></div></div></button>`;
    }));
    let productionHtml = "";
    let upgradeBlock = "";
    let abilityBlock = "";
    if (building) {
        const p = tileProduction(s, tile);
        const adjInfo = computeAdjacency(s, tile, building);
        productionHtml = `<div class="text-xs mb-2"><div class="font-bold mb-1">생산량:</div><div class="grid grid-cols-2 gap-1">${p.money ? `<div class="${p.money > 0 ? 'text-green-400' : 'text-red-400'}">💰 ${formatNumber(p.money)}</div>` : ""}${p.energy ? `<div class="${p.energy > 0 ? 'text-blue-400' : 'text-red-400'}">⚡ ${formatNumber(p.energy)}</div>` : ""}${p.carbon ? `<div class="${p.carbon > 0 ? 'text-red-400' : 'text-green-400'}">🌍 ${formatNumber(p.carbon)}</div>` : ""}${p.population ? `<div class="text-yellow-400">👥 ${formatNumber(p.population)}</div>` : ""}${p.food ? `<div class="${p.food > 0 ? 'text-green-400' : 'text-red-400'}">🍎 ${formatNumber(p.food)}</div>` : ""}</div></div>`;
        // Enhanced adjacency bonus display
        const generateDetailedAdjacencyInfo = (s, tile, building) => {
            let html = '';
            // 1. Terrain modifier bonus
            const terrainMod = getTerrainModifier(tile.terrain, building.id);
            if (terrainMod !== 1.0) {
                const bonus = Math.round((terrainMod - 1) * 100);
                html += `<div class="flex justify-between text-xs mb-1"><span class="text-blue-300">🌍 지형 보너스 (${KO.terrains[tile.terrain]})</span><span class="text-green-400">+${bonus}%</span></div>`;
            }
            // 2. Traditional adjacency bonuses
            const adjResult = computeAdjacency(s, tile, building);
            if (adjResult.types.length > 0) {
                html += `<div class="text-xs mb-1 text-yellow-300">🔗 인접 건물 보너스:</div>`;
                adjResult.types.forEach(type => {
                    const bonus = building.adjacency[type];
                    if (bonus) {
                        const baseProduction = building.base;
                        const bonusText = Object.entries(bonus)
                            .filter(([_, val]) => val !== 0)
                            .map(([res, val]) => {
                            const icon = res === 'money' ? '💰' : res === 'energy' ? '⚡' : res === 'carbon' ? '🌍' : res === 'population' ? '👥' : '🍎';
                            const numVal = val;
                            const baseVal = baseProduction[res] || 0;
                            // Convert to percentage if we have a meaningful base value
                            if (Math.abs(baseVal) > 0.1) {
                                const percentage = Math.round((numVal / Math.abs(baseVal)) * 100);
                                const prefix = percentage > 0 ? '+' : '';
                                return `${icon}${prefix}${percentage}%`;
                            }
                            else {
                                // Fall back to absolute values for resources with no base production
                                const prefix = numVal > 0 ? '+' : '';
                                return `${icon}${prefix}${formatNumber(numVal)}`;
                            }
                        })
                            .join(' ');
                        html += `<div class="flex justify-between text-xs ml-2"><span>${type}</span><span class="text-green-400">${bonusText}</span></div>`;
                    }
                });
            }
            // 3. Complex rules bonuses from bonusConfig
            const complexConditions = embeddedGameData.bonusConfig?.complexConditions;
            if (complexConditions) {
                Object.entries(complexConditions).forEach(([conditionKey, condition]) => {
                    const typedCondition = condition;
                    if (!typedCondition.appliesTo.includes(building.id))
                        return;
                    let conditionMet = true;
                    let conditionText = '';
                    if (typedCondition.requiresTerrains && !typedCondition.requiresTerrains.includes(tile.terrain)) {
                        conditionMet = false;
                    }
                    if (typedCondition.requiresBuildings) {
                        const adjacentBuildings = neighbors({ q: tile.q, r: tile.r })
                            .map(pos => s.tiles.get(tileKey(pos)))
                            .filter(t => t && t.building)
                            .map(t => t.building);
                        if (!typedCondition.requiresBuildings.some(req => adjacentBuildings.includes(req))) {
                            conditionMet = false;
                        }
                        conditionText = typedCondition.requiresBuildings.map(b => labelBuildingById(b, b)).join('+');
                    }
                    const bonusText = Object.entries(typedCondition.bonus)
                        .filter(([_, val]) => val !== 0)
                        .map(([res, val]) => {
                        const icon = res === 'money' ? '💰' : res === 'energy' ? '⚡' : res === 'carbon' ? '🌍' : res === 'population' ? '👥' : '🍎';
                        const numVal = Number(val);
                        const baseVal = building.base[res] || 0;
                        // Convert to percentage if we have a meaningful base value
                        if (Math.abs(baseVal) > 0.1) {
                            const percentage = Math.round((numVal / Math.abs(baseVal)) * 100);
                            const prefix = percentage > 0 ? '+' : '';
                            return `${icon}${prefix}${percentage}%`;
                        }
                        else {
                            // Fall back to absolute values for resources with no base production
                            const prefix = numVal > 0 ? '+' : '';
                            return `${icon}${prefix}${formatNumber(numVal)}`;
                        }
                    })
                        .join(' ');
                    if (conditionMet) {
                        html += `<div class="flex justify-between text-xs mb-1 text-purple-300"><span>🎯 ${conditionKey} (${conditionText})</span><span class="text-green-400">${bonusText}</span></div>`;
                    }
                    else {
                        html += `<div class="flex justify-between text-xs mb-1 text-gray-500"><span>🎯 ${conditionKey} (${conditionText})</span><span class="text-gray-400">${bonusText}</span></div>`;
                    }
                });
            }
            // 4. Pattern bonuses from bonusConfig
            const patternBonuses = embeddedGameData.bonusConfig?.patternBonuses;
            if (patternBonuses) {
                Object.entries(patternBonuses).forEach(([patternKey, pattern]) => {
                    const typedPattern = pattern;
                    if (!typedPattern.buildings.includes(building.id))
                        return;
                    let active = false;
                    let patternName = patternKey;
                    switch (typedPattern.type) {
                        case 'chain':
                            const chainMult = detectLinearChain(s, { q: tile.q, r: tile.r }, building.id);
                            active = chainMult > 1.0;
                            patternName = '⛓️ 직선 배치';
                            break;
                        case 'triangle':
                            active = detectTriangleCluster(s, { q: tile.q, r: tile.r }, typedPattern.buildings);
                            patternName = '🔺 삼각 클러스터';
                            break;
                        case 'district':
                            const districtMult = detectDistrict(s, { q: tile.q, r: tile.r }, building.id);
                            active = districtMult > 1.0;
                            patternName = '🏢 지구 형성';
                            break;
                    }
                    const bonusText = Object.entries(typedPattern.bonus)
                        .filter(([_, val]) => val !== 0)
                        .map(([res, val]) => {
                        const icon = res === 'money' ? '💰' : res === 'energy' ? '⚡' : res === 'carbon' ? '🌍' : res === 'population' ? '👥' : '🍎';
                        const numVal = Number(val);
                        const baseVal = building.base[res] || 0;
                        // Convert to percentage if we have a meaningful base value
                        if (Math.abs(baseVal) > 0.1) {
                            const percentage = Math.round((numVal / Math.abs(baseVal)) * 100);
                            const prefix = percentage > 0 ? '+' : '';
                            return `${icon}${prefix}${percentage}%`;
                        }
                        else {
                            // Fall back to absolute values for resources with no base production
                            const prefix = numVal > 0 ? '+' : '';
                            return `${icon}${prefix}${formatNumber(numVal)}`;
                        }
                    })
                        .join(' ');
                    if (active) {
                        html += `<div class="flex justify-between text-xs mb-1 text-cyan-300"><span>${patternName}</span><span class="text-green-400">${bonusText}</span></div>`;
                    }
                    else {
                        html += `<div class="flex justify-between text-xs mb-1 text-gray-500"><span>${patternName}</span><span class="text-gray-400">${bonusText}</span></div>`;
                    }
                });
            }
            // 5. Special ability status
            if (building.specialAbility) {
                const unlocked = checkSpecialAbility(s, tile, building, tileProduction(s, tile));
                if (unlocked) {
                    html += `<div class="text-xs mb-1 p-2 bg-yellow-900 bg-opacity-30 rounded border border-yellow-600"><div class="text-yellow-300 font-bold">✨ ${building.specialAbility.name}</div><div class="text-yellow-200 text-xs mt-1">${building.specialAbility.description}</div></div>`;
                }
                else {
                    html += `<div class="text-xs mb-1 p-2 bg-gray-900 bg-opacity-30 rounded border border-gray-600"><div class="text-gray-400 font-bold">🔒 ${building.specialAbility.name}</div><div class="text-gray-500 text-xs mt-1">인접 보너스 >= 기본 생산량 x2 필요</div></div>`;
                }
            }
            return html || `<div class="text-xs mb-2 text-gray-400">인접 보너스 없음</div>`;
        };
        const adjHtml = generateDetailedAdjacencyInfo(s, tile, building);
        productionHtml += adjHtml;
        // Always allow upgrade - no max level
        const ecUp = effectiveCost(s, building, tile.level);
        // Calculate production at next level for comparison
        const currentProd = tileProduction(s, tile);
        const nextLevelProd = calculateEnhancedProduction(s, tile, building);
        // Generate upgrade preview info
        const generateUpgradePreview = () => {
            let preview = '';
            const improvements = [];
            // Compare each resource
            Object.entries(nextLevelProd).forEach(([resource, nextValue]) => {
                const currentValue = currentProd[resource] || 0;
                const diff = nextValue - currentValue;
                if (Math.abs(diff) > 0.01) {
                    const icon = resource === 'money' ? '💰' : resource === 'energy' ? '⚡' : resource === 'carbon' ? '🌍' : resource === 'population' ? '👥' : '🍎';
                    const sign = diff > 0 ? '+' : '';
                    const color = diff > 0 ? 'text-green-400' : 'text-red-400';
                    improvements.push(`<span class="${color}">${icon}${sign}${formatNumber(diff)}</span>`);
                }
            });
            if (improvements.length > 0) {
                preview = `<div class="text-xs mb-1 p-1 bg-blue-900 bg-opacity-30 rounded border border-blue-500">
        <div class="text-blue-300 font-bold">레벨 ${tile.level + 1} 예상 개선:</div>
        <div class="mt-1">${improvements.join(' ')}</div>
      </div>`;
            }
            return preview;
        };
        upgradeBlock = generateUpgradePreview() + `<button class="w-full bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs transition-colors mb-2" onclick="upgradeBuilding()">업그레이드 (레벨 ${tile.level} → ${tile.level + 1}) 💰${formatNumber(ecUp.money)} ⚡${formatNumber(ecUp.energy)}</button>`;
    }
    else {
        upgradeBlock = `<div class="text-xs text-red-400 mb-2">자원 부족</div>`;
        const st = getAbilityState(tile);
        let acts = [];
        if (building.id === "greenhouse")
            acts.push(`<button class="w-full bg-emerald-700 hover:bg-emerald-600 px-2 py-1 rounded text-xs mb-1" onclick="activateAbility('greenhouse_ventilation')">환기 강화 ${st.cooldown && st.cooldown > 0 ? `(쿨:${st.cooldown})` : ""}</button>`);
        if (building.id === "vertical_farm")
            acts.push(`<button class="w-full bg-yellow-700 hover:bg-yellow-600 px-2 py-1 rounded text-xs mb-1" onclick="toggleAbility('vf_night')">야간조 ${st.toggled && st.toggled["vf_night"] ? "ON" : "OFF"}</button>`);
        if (building.id === "windmill")
            acts.push(`<button class="w-full bg-sky-700 hover:bg-sky-600 px-2 py-1 rounded text-xs mb-1" onclick="activateAbility('wind_pitch')">피치 제어 ${st.cooldown && st.cooldown > 0 ? `(쿨:${st.cooldown})` : ""}</button>`);
        if (building.id === "solar_panel")
            acts.push(`<button class="w-full bg-amber-700 hover:bg-amber-600 px-2 py-1 rounded text-xs mb-1" onclick="activateAbility('solar_clean')">세척 ${st.cooldown && st.cooldown > 0 ? `(쿨:${st.cooldown})` : ""}</button>`);
        if (building.id === "coalplant")
            acts.push(`<button class="w-full bg-stone-700 hover:bg-stone-600 px-2 py-1 rounded text-xs mb-1" onclick="toggleAbility('coal_scrubber')">스크러버 ${st.toggled && st.toggled["coal_scrubber"] ? "ON" : "OFF"}</button><button class="w-full bg-orange-700 hover:bg-orange-600 px-2 py-1 rounded text-xs mb-1" onclick="activateAbility('coal_peak')">피크부하 ${st.cooldown && st.cooldown > 0 ? `(쿨:${st.cooldown})` : ""}</button>`);
        if (building.id === "nuclear_plant")
            acts.push(`<button class="w-full bg-indigo-700 hover:bg-indigo-600 px-2 py-1 rounded text-xs mb-1" onclick="activateAbility('nuclear_follow')">부하추종 ${st.cooldown && st.cooldown > 0 ? `(쿨:${st.cooldown})` : ""}</button>`);
        if (building.id === "apartment") {
            if (!st.chosen)
                acts.push(`<div class="grid grid-cols-2 gap-1 mb-1"><button class="bg-cyan-700 hover:bg-cyan-600 px-2 py-1 rounded text-xs" onclick="chooseAbility('smart')">스마트홈</button><button class="bg-teal-700 hover:bg-teal-600 px-2 py-1 rounded text-xs" onclick="chooseAbility('public')">공공임대</button></div>`);
            else
                acts.push(`<div class="text-xs mb-1">선택: ${selectedAbilityLabel(tile)}</div>`);
        }
        if (building.id === "market")
            acts.push(`<button class="w-full bg-yellow-800 hover:bg-yellow-700 px-2 py-1 rounded text-xs mb-1" onclick="activateAbility('market_logistics')">물류허브 ${st.cooldown && st.cooldown > 0 ? `(쿨:${st.cooldown})` : ""}</button>`);
        if (building.id === "factory")
            acts.push(`<div class="grid grid-cols-3 gap-1"><button class="bg-red-700 hover:bg-red-600 px-2 py-1 rounded text-xs" onclick="toggleAbility('f_over')">오버드 ${st.toggled && st.toggled["f_over"] ? "ON" : "OFF"}</button><button class="bg-green-700 hover:bg-green-600 px-2 py-1 rounded text-xs" onclick="toggleAbility('f_eco')">에코 ${st.toggled && st.toggled["f_eco"] ? "ON" : "OFF"}</button><button class="bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded text-xs" onclick="toggleAbility('f_prec')">정밀 ${st.toggled && st.toggled["f_prec"] ? "ON" : "OFF"}</button></div>`);
        if (building.id === "green_factory")
            acts.push(`<button class="w-full bg-lime-700 hover:bg-lime-600 px-2 py-1 rounded text-xs mb-1" onclick="activateAbility('gfactory_lcp')">저탄소 조달 ${st.cooldown && st.cooldown > 0 ? `(쿨:${st.cooldown})` : ""}</button>`);
        if (building.id === "water_treatment")
            acts.push(`<div class="grid grid-cols-2 gap-1 mb-1"><button class="bg-cyan-700 hover:bg-cyan-600 px-2 py-1 rounded text-xs" onclick="activateAbility('wt_oasis')">오아시스</button><button class="bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded text-xs" onclick="activateAbility('wt_flood')">치수</button></div>`);
        abilityBlock = acts.length ? `<div class="mt-2">${acts.join("")}</div>` : "";
    }
    panel.innerHTML = `
<div class="flex items-center gap-2 mb-2">
  <img src="${tImg}" class="w-10 h-10 rounded object-cover" alt="${tile.terrain}" />
  <div>
    <div class="font-bold">
      ${KO.terrains[tile.terrain]?.name ?? tile.terrain}
      ${tile.modifier ? `(${tile.modifier})` : ""}
    </div>
    <div class="text-xs text-gray-300">좌표: (${tile.q}, ${tile.r})</div>
  </div>
</div>
${building
        ? `<div class="flex items-center gap-2 mb-2 p-2 bg-blue-800 rounded">
      ${bImgUrl ? `<img src="${bImgUrl}" class="w-5 h-5 rounded" />` : ""}
      <div>
        <div class="font-bold">${building.name}</div>
        <div class="text-xs">레벨 ${tile.level}</div>
      </div>
    </div>` +
            `${productionHtml}${upgradeBlock}${abilityBlock}`
        : `<div class="text-xs text-gray-400 mb-2">건물 없음</div>
     ${available.length > 0
            ? `<div class="mb-2">
            <div class="font-bold text-xs mb-2">건설 가능:</div>
            <div class="max-h-32 overflow-y-auto">${availableHtml.join("")}</div>
          </div>`
            : ""}`}`;
};
// === 모달 유틸 ===
const openModal = (el) => {
    if (!el) return;
    el.classList.remove('hidden');
    el.style.display = 'flex'; // ★ display도 풀기
  };
  const closeModal = (el) => {
    if (!el) return;
    el.classList.add('hidden');
    el.style.display = 'none'; // ★ 다시 닫기
  };
  const showAdjacency = () => {
    const m = document.getElementById('adjacencyModal');
    // 필요하면 내용 채우기: document.getElementById('adjacencyContent').innerHTML = '...';
    openModal(m);
  };

  
  // 기술 모달
  const showTech = () => {
    const m = document.getElementById('techModal');
    openModal(m);
    if (gameState) updateTechTree(gameState);
  };
  const hideTech = () => closeModal(document.getElementById('techModal'));

  document.getElementById('techBtn').addEventListener('click', showTech);
  document.getElementById('techCloseX').addEventListener('click', hideTech);
  
  document.getElementById('adjacencyBtn').addEventListener('click', showAdjacency);
  document.getElementById('adjacencyClose').addEventListener('click', () => closeModal(document.getElementById('adjacencyModal')));
  
  // 바깥 영역 클릭으로 닫기 (선택)
  ['techModal','adjacencyModal'].forEach(id => {
    const modal = document.getElementById(id);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
  
  // ESC로 닫기 (선택)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(document.getElementById('techModal'));
      closeModal(document.getElementById('adjacencyModal'));
    }
  });  
  // 인접 보너스 모달
  
  
  document.getElementById('techBtn').addEventListener('click', showTech);
  document.getElementById('techCloseX').addEventListener('click', hideTech);
  
  document.getElementById('adjacencyBtn').addEventListener('click', showAdjacency);
  document.getElementById('adjacencyClose').addEventListener('click', () => closeModal(document.getElementById('adjacencyModal')));
  
  // 바깥 영역 클릭으로 닫기 (선택)
  ['techModal','adjacencyModal'].forEach(id => {
    const modal = document.getElementById(id);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
  
  // ESC로 닫기 (선택)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(document.getElementById('techModal'));
      closeModal(document.getElementById('adjacencyModal'));
    }
  });

  const HEX_SIZE = (window.HEX_SIZE ?? 50);

  function getCanvasLogicalPoint(e) {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      cx: (e.clientX - rect.left) * scaleX,
      cy: (e.clientY - rect.top ) * scaleY
    };
  }
  function canvasToGame(cx, cy) {
    const cam = gameState.camera || { x:0, y:0, zoom:1 };
    return {
      x: (cx - canvas.width/2  - cam.x) / cam.zoom,
      y: (cy - canvas.height/2 - cam.y) / cam.zoom
    };
  }
  function placeTooltipInUi(hoverInfo, mouseX, mouseY) {
    const ui = document.getElementById('ui');
    if (!ui) return;
    const rect   = ui.getBoundingClientRect();
    const sx     = rect.width  / LOGICAL_W;
    const sy     = rect.height / LOGICAL_H;
    const ux     = (mouseX - rect.left) / (sx || 1);
    const uy     = (mouseY - rect.top ) / (sy || 1);
    hoverInfo.style.left = `${ux + 10}px`;
    hoverInfo.style.top  = `${uy - 10}px`;
  }
  
//   // --- 여길 기존 함수들과 교체 --- 
//   const handleCanvasClick = (e) => {
//     if (!gameState) return;
//     const { cx, cy } = getCanvasLogicalPoint(e);
//     const { x, y }   = canvasToGame(cx, cy);
//     const pos        = pixelToAxial(x, y, HEX_SIZE);
//     const tile       = gameState.tiles.get(tileKey(pos));
//     if (!tile || (!tile.revealed && !tile.explored)) return;
  
//     if (tile.revealed) {
//       const k = tileKey(pos);
//       if (selectedTiles.has(k) && selectedTiles.size > 0 && selectedBuilding) {
//         executeMultiAction();
//         return;
//       }
//       toggleTileSelection(pos, e.ctrlKey);
//       gameState = assignObj(gameState, { selectedTile: pos });
  
//       if (!e.ctrlKey && selectedBuilding && gameState.buildings[selectedBuilding.id] && selectedTiles.size <= 1) {
//         gameState = placeOrUpgrade(gameState, pos, selectedBuilding.id);
//       }
//     } else if (tile.explored) {
//       gameState = assignObj(gameState, { selectedTile: pos });
//     }
//     update();
//   };
  
//   const handleCanvasHover = (e) => {
//     if (!gameState) return;
//     const { cx, cy } = getCanvasLogicalPoint(e);
//     const { x, y }   = canvasToGame(cx, cy);
//     const pos        = pixelToAxial(x, y, HEX_SIZE);
//     const tile       = gameState.tiles.get(tileKey(pos));
//     const hoverInfo  = document.getElementById("tileHoverInfo");
//     if (!hoverInfo) return;
  
//     if (tile && tile.revealed) {
//       showTileHover(tile, e.clientX, e.clientY);
//     } else {
//       hoverInfo.classList.add("hidden");
//     }
//   };
  
//   const handleCanvasMouseMove = (e) => {
//     if (!gameState) return;
//     const { cx, cy } = getCanvasLogicalPoint(e);
//     const { x, y }   = canvasToGame(cx, cy);
//     const pos        = pixelToAxial(x, y, HEX_SIZE);
//     const tile       = gameState.tiles.get(tileKey(pos));
//     const hoverInfo  = document.getElementById("tileHoverInfo");
//     if (!hoverInfo) return;
  
//     if (tile && tile.revealed) {
//       showTileHover(tile, e.clientX, e.clientY);
//     } else {
//       hoverInfo.classList.add("hidden");
//     }
//   };
  
//   const showTileHover = async (tile, mouseX, mouseY) => {
//     const hoverInfo    = document.getElementById("tileHoverInfo");
//     const hoverContent = document.getElementById("hoverContent");
//     if (!hoverInfo || !hoverContent || !gameState) return;
  
//     let content = `<div class="font-bold">${KO.terrains[tile.terrain] ?? tile.terrain}</div>`;
//     if (tile.modifier) content += `<div class="text-xs opacity-75">${tile.modifier}</div>`;
  
//     if (tile.building) {
//       const building = gameState.buildings[tile.building];
//       if (building) {
//         content += `<div class="mt-2 p-2 bg-blue-900 rounded">`;
//         content += `<div class="font-bold">${building.name} Lv.${tile.level}</div>`;
//         const prod = tileProduction(gameState, tile);
//         if (prod.money)  content += `<div class="text-xs">💰 ${prod.money}</div>`;
//         if (prod.energy) content += `<div class="text-xs">⚡ ${prod.energy}</div>`;
//         if (prod.food)   content += `<div class="text-xs">🍎 ${prod.food}</div>`;
//         if (prod.carbon) content += `<div class="text-xs">🌍 ${prod.carbon}</div>`;
  
//         const adjResult = computeAdjacency(gameState, tile, building);
//         if (adjResult.details && adjResult.details.length > 0) {
//           content += `<div class="mt-1 text-xs text-blue-300">인접 보너스:</div>`;
//           adjResult.details.forEach(detail => {
//             let bonusText = '';
//             if (detail.bonus.money)  bonusText += `💰${detail.bonus.money} `;
//             if (detail.bonus.energy) bonusText += `⚡${detail.bonus.energy} `;
//             if (detail.bonus.food)   bonusText += `🍎${detail.bonus.food} `;
//             if (detail.bonus.carbon) bonusText += `🌍${detail.bonus.carbon} `;
//             content += `<div class="text-xs ml-2">• ${detail.source}: ${bonusText}</div>`;
//           });
//         }
//         content += `</div>`;
  
//         if (tile.level >= 5) {
//           const st = getAbilityState(tile);
//           content += `<div class="mt-2 space-y-1">`;
//           if (building.id === "apartment") {
//             if (!st.chosen) {
//               content += `<div class="text-xs text-yellow-300 mb-1">⚠️ 선택 필요:</div>`;
//               content += `<div class="grid grid-cols-2 gap-1"><button class="bg-cyan-700 hover:bg-cyan-600 px-2 py-1 rounded text-xs" onclick="chooseAbility('smart')">스마트홈</button><button class="bg-teal-700 hover:bg-teal-600 px-2 py-1 rounded text-xs" onclick="chooseAbility('public')">공공임대</button></div>`;
//             } else {
//               content += `<div class="text-xs text-green-300">✓ 선택 완료: ${selectedAbilityLabel(tile)}</div>`;
//             }
//           }
//           if (building.id === "farm")
//             content += `<button onclick="activateAbility('farm_fertilize')" class="w-full px-2 py-1 bg-green-600 rounded text-xs">비료</button>`;
//           if (building.id === "windmill")
//             content += `<button onclick="activateAbility('wind_boost')" class="w-full px-2 py-1 bg-blue-600 rounded text-xs">부스트</button>`;
//           content += `</div>`;
//         }
//       }
//     }
//     if (tile.village) {
//       content += `<div class="mt-2 p-2 bg-yellow-800 rounded"><div class="text-xs">🏘️ 미지의 마을</div></div>`;
//     }
  
//     hoverContent.innerHTML = content;
//     placeTooltipInUi(hoverInfo, mouseX, mouseY);   // ★ #ui 스케일 보정해서 배치
//     hoverInfo.classList.remove("hidden");
//   };

const generateVillageReward = (s) => {
    const rand = Math.random();
    if (rand < 0.4) {
        const amount = { money: 50 + Math.floor(Math.random() * 100), energy: 0, carbon: 0, population: Math.floor(Math.random() * 5), food: 20 + Math.floor(Math.random() * 50) };
        return { type: "resources", amount, message: "자원과 인구를 얻었습니다!" };
    }
    else if (rand < 0.7) {
        const pop = 3 + Math.floor(Math.random() * 7);
        const amount = { money: 0, energy: 0, carbon: 0, population: pop, food: 0 };
        return { type: "population", amount, message: `${pop}명이 합류했습니다!` };
    }
    else {
        return { type: "tech_progress", amount: 50 + Math.floor(Math.random() * 100), message: "연구가 진전되었습니다!" };
    }
};
const renderLoop = () => {
    const now = Date.now();
    if (now - lastFrameTime > 16) {
        if (gameState)
            renderBoard(gameState);
        lastFrameTime = now;
    }
    requestAnimationFrame(renderLoop);
};
const updateProductionSummary = () => {
    if (!gameState)
        return;
    // Calculate total production from all buildings
    let totalProduction = emptyProduction();
    const adjacencyBonuses = [];
    const activeBonusTypes = new Set();
    gameState.tiles.forEach(tile => {
        if (tile.building && tile.revealed) {
            const building = gameState.buildings[tile.building];
            if (building) {
                const production = calculateEnhancedProduction(gameState, tile, building);
                totalProduction = addProduction(totalProduction, production);
                // Get adjacency details
                const adjacencyResult = computeAdjacency(gameState, tile, building);
                if (adjacencyResult.details) {
                    adjacencyResult.details.forEach(detail => {
                        const existingBonus = adjacencyBonuses.find(b => b.source === detail.source);
                        if (existingBonus) {
                            existingBonus.bonus = addProduction(existingBonus.bonus, detail.bonus);
                        }
                        else {
                            adjacencyBonuses.push({
                                source: detail.source,
                                bonus: detail.bonus,
                                isActive: true
                            });
                        }
                        activeBonusTypes.add(detail.source);
                    });
                }
            }
        }
    });
    // Update total production display
    const totalMoney = document.getElementById("totalMoney");
    const totalEnergy = document.getElementById("totalEnergy");
    const totalCarbon = document.getElementById("totalCarbon");
    const totalPopulation = document.getElementById("totalPopulation");
    const totalFood = document.getElementById("totalFood");
    if (totalMoney)
        totalMoney.textContent = Math.floor(totalProduction.money).toString();
    if (totalEnergy)
        totalEnergy.textContent = Math.floor(totalProduction.energy).toString();
    if (totalCarbon)
        totalCarbon.textContent = Math.floor(totalProduction.carbon).toString();
    if (totalPopulation)
        totalPopulation.textContent = Math.floor(totalProduction.population).toString();
    if (totalFood)
        totalFood.textContent = Math.floor(totalProduction.food).toString();
    // Update adjacency bonus list
    const adjacencyList = document.getElementById("adjacencyList");
    if (adjacencyList) {
        adjacencyList.innerHTML = "";
        if (adjacencyBonuses.length === 0) {
            adjacencyList.innerHTML = '<div class="text-gray-400">인접 보너스 없음</div>';
        }
        else {
            adjacencyBonuses.forEach(bonus => {
                const bonusEl = document.createElement("div");
                bonusEl.className = bonus.isActive ? "text-green-400 font-bold" : "text-gray-400";
                const bonusText = [];
                if (bonus.bonus.money !== 0)
                    bonusText.push(`💰${bonus.bonus.money > 0 ? '+' : ''}${bonus.bonus.money}`);
                if (bonus.bonus.energy !== 0)
                    bonusText.push(`⚡${bonus.bonus.energy > 0 ? '+' : ''}${bonus.bonus.energy}`);
                if (bonus.bonus.carbon !== 0)
                    bonusText.push(`🌍${bonus.bonus.carbon > 0 ? '+' : ''}${bonus.bonus.carbon}`);
                if (bonus.bonus.population !== 0)
                    bonusText.push(`👥${bonus.bonus.population > 0 ? '+' : ''}${bonus.bonus.population}`);
                if (bonus.bonus.food !== 0)
                    bonusText.push(`🍎${bonus.bonus.food > 0 ? '+' : ''}${bonus.bonus.food}`);
                bonusEl.innerHTML = `${bonus.source}: ${bonusText.join(' ')}`;
                adjacencyList.appendChild(bonusEl);
            });
        }
    }
};
const update = async () => {
    if (!gameState) {
        console.warn("gameState 없음");
        gameState = window.gameState;
    }
    await updateHUD(gameState);
    await updateBuildingPalette(gameState);
    const list = document.getElementById("buildingList");
    if (list && list.children.length === 0) {
        list.innerHTML += `<button class="p-2 rounded text-xs transition-all duration-200 transform hover:scale-105 bg-green-700 hover:bg-green-600 "><div class="mb-1 flex items-center justify-center"><img src="assets/b-lab.png" alt="연구소" class="w-7 h-7 object-cover rounded" loading="lazy"></div><div class="text-[10px] leading-3 mb-1 text-center">연구소</div><div class="text-[10px] text-gray-300 text-center">💰103 ⚡1</div></button>`;
    }
    updateProductionSummary();
    // 기술 패널이 열려 있으면 함께 갱신
    if (!document.getElementById("techModal").classList.contains("hidden"))
        updateTechTree(gameState);
    if (gameState.resources.population >= POP_WIN)
        showEndGame(gameState, ['인구 목표 달성'], 'win');
};
const upgradeBuilding = () => {
    if (!gameState || !gameState.selectedTile)
        return;
    const pos = gameState.selectedTile;
    const tile = gameState.tiles.get(tileKey(pos));
    if (!tile || !tile.building)
        return;
    gameState = placeOrUpgrade(gameState, pos, tile.building);
    update();
};
// Bulk operations
const bulkUpgradeBuildings = (buildingType, maxSpend) => {
    if (!gameState)
        return;
    let totalSpent = 0;
    let upgradedCount = 0;
    const upgradableTiles = Array.from(gameState.tiles.values())
        .filter(t => t.building === buildingType && t.revealed)
        .sort((a, b) => a.level - b.level); // Upgrade lower levels first
    for (const tile of upgradableTiles) {
        const building = gameState.buildings[buildingType];
        if (!building)
            continue;
        const cost = effectiveCost(gameState, building, tile.level);
        const totalCost = cost.money + cost.energy;
        if (totalSpent + totalCost > maxSpend)
            break;
        if (!canAffordEffective(gameState, building, tile.level))
            continue;
        gameState = placeOrUpgrade(gameState, { q: tile.q, r: tile.r }, buildingType);
        totalSpent += totalCost;
        upgradedCount++;
    }
    if (upgradedCount > 0) {
        showError(`${upgradedCount}개 ${gameState.buildings[buildingType]?.name} 업그레이드 완료`);
        update();
    }
};
const bulkPlaceBuildings = (buildingType, maxCount) => {
    if (!gameState)
        return;
    const building = gameState.buildings[buildingType];
    if (!building)
        return;
    let placedCount = 0;
    const allowedTerrains = getExpandedTerrains(gameState, building.id);
    const availableTiles = Array.from(gameState.tiles.values())
        .filter(t => !t.building && t.revealed && allowedTerrains.includes(t.terrain))
        .slice(0, maxCount);
    for (const tile of availableTiles) {
        if (placedCount >= maxCount)
            break;
        if (!canAffordEffective(gameState, building, 0))
            break;
        gameState = placeOrUpgrade(gameState, { q: tile.q, r: tile.r }, buildingType);
        placedCount++;
    }
    if (placedCount > 0) {
        showError(`${buildingType} ${placedCount}개 건설됨`);
        update();
    }
};
// Bulk operations modal functions
const showBulkModal = () => {
    const modal = document.getElementById('bulkModal');
    const select = document.getElementById('bulkBuildingType');
    // Populate building options
    select.innerHTML = '';
    if (gameState) {
        Object.values(gameState.buildings).forEach(b => {
            if (isBuildingUnlocked(gameState, b)) {
                const option = document.createElement('option');
                option.value = b.id;
                option.textContent = b.name;
                select.appendChild(option);
            }
        });
    }
    modal.classList.remove('hidden');
};
const hideBulkModal = () => {
    document.getElementById('bulkModal').classList.add('hidden');
};
const executeBulkUpgrade = () => {
    const buildingType = document.getElementById('bulkBuildingType').value;
    const budget = parseInt(document.getElementById('bulkBudget').value) || 1000;
    bulkUpgradeBuildings(buildingType, budget);
    hideBulkModal();
};
const executeBulkPlace = () => {
    const buildingType = document.getElementById('bulkBuildingType').value;
    const count = parseInt(document.getElementById('bulkCount').value) || 5;
    bulkPlaceBuildings(buildingType, count);
    hideBulkModal();
};
const buildOnTile = (buildingId) => {
    const tile = gameState.tiles.get(tileKey(gameState.selectedTile));
    const b = gameState.buildings[buildingId];
    if (tile && b && placeable(gameState, tile, b)) {
        gameState = placeOrUpgrade(gameState, gameState.selectedTile, buildingId);
        update();
    }
};
// 연구 취소 함수 - 글로벌 호출용
const cancelCurrentResearch = () => {
    if (gameState) {
        gameState = cancelResearch(gameState);
        update();
    }
};
const activateAbility = (id) => {
    if (!gameState || !gameState.selectedTile)
        return;
    const t = gameState.tiles.get(tileKey(gameState.selectedTile));
    if (!t || !t.building)
        return;
    gameState = abilityActivate(gameState, t, id);
    update();
};
const toggleAbility = (key) => {
    if (!gameState || !gameState.selectedTile)
        return;
    const t = gameState.tiles.get(tileKey(gameState.selectedTile));
    if (!t || !t.building)
        return;
    gameState = abilityToggle(gameState, t, key);
    update();
};
const chooseAbility = (choice) => {
    if (!gameState || !gameState.selectedTile)
        return;
    const t = gameState.tiles.get(tileKey(gameState.selectedTile));
    if (!t || !t.building)
        return;
    if (t.building !== "apartment")
        return;
    const st = getAbilityState(t);
    if (st.chosen)
        return;
    gameState = abilityChoose(gameState, t, choice === "smart" ? "smart" : "public");
    update();
};
window.upgradeBuilding = upgradeBuilding;
window.buildOnTile = buildOnTile;
window.bulkUpgradeBuildings = bulkUpgradeBuildings;
window.bulkPlaceBuildings = bulkPlaceBuildings;
window.showBulkModal = showBulkModal;
window.hideBulkModal = hideBulkModal;
window.executeBulkUpgrade = executeBulkUpgrade;
window.executeBulkPlace = executeBulkPlace;
window.activateAbility = activateAbility;
window.toggleAbility = toggleAbility;
window.chooseAbility = chooseAbility;
const createEventEffect = (type, intensity) => {
    if (!canvas || !ctx)
        return;
    const colors = { disaster: ['#ff4444', '#ff6666', '#ff8888', '#ffaaaa'], blessing: ['#44ff44', '#66ff66', '#88ff88', '#aaffaa'] };
    const eventColors = colors[type] || colors.disaster;
    const particleCount = Math.min(50 + intensity * 20, 200);
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 2 + Math.random() * 8, size = 3 + Math.random() * 5;
        const c = eventColors[Math.floor(Math.random() * eventColors.length)];
        particles.push({ x: canvas.width / 2, y: canvas.height / 2, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 60 + Math.random() * 120, maxLife: 180, color: c, size });
    }
    const shakeIntensity = Math.min(intensity * 3, 15);
    let shakeFrames = 30;
    const originalTransform = ctx.getTransform();
    const shakeEffect = () => {
        if (shakeFrames <= 0) {
            ctx.setTransform(originalTransform);
            return;
        }
        const offsetX = (Math.random() - 0.5) * shakeIntensity * (shakeFrames / 30);
        const offsetY = (Math.random() - 0.5) * shakeIntensity * (shakeFrames / 30);
        ctx.setTransform(1, 0, 0, 1, offsetX, offsetY);
        shakeFrames--;
        setTimeout(shakeEffect, 16);
    };
    if (type === "disaster" && intensity >= 2)
        shakeEffect();
};
// Tutorial step conditions for automatic progression
const checkTutorialProgress = (s) => {
    const buildingCount = Array.from(s.tiles.values()).filter(t => t.building).length;
    const population = s.resources.population;
    const researchCount = Object.values(s.research).filter(r => r).length;
    const labCount = Array.from(s.tiles.values()).filter(t => {
        return t.building === 'lab';
    }).length;
    const farmCount = Array.from(s.tiles.values()).filter(t => {
        return t.building === 'farm';
    }).length;
    const houseCount = Array.from(s.tiles.values()).filter(t => {
        return t.building === 'house' || t.building === 'apartment';
    }).length;
    const marketCount = Array.from(s.tiles.values()).filter(t => {
        return t.building === 'market';
    }).length;
    const energyBuildings = Array.from(s.tiles.values()).filter(t => {
        return t.building === 'windmill' || t.building === 'solar_panel' || t.building === 'geothermal';
    }).length;
    const hasUpgradedBuilding = Array.from(s.tiles.values()).some(t => {
        return t.building && t.level > 1;
    });
    // Victory achieved (step 19)
    if (population >= 1000000)
        return 19;
    // Final push phase (step 18)
    if (population >= 500000)
        return 18;
    // Large scale expansion (step 17)
    if (population >= 100000)
        return 17;
    // Building evolution (step 16)
    if (hasUpgradedBuilding && buildingCount >= 15)
        return 16;
    // Advanced buildings (step 15)
    if (researchCount >= 8)
        return 15;
    // Climate events (step 14)
    if (buildingCount >= 12)
        return 14;
    // Special abilities (step 13)
    if (researchCount >= 6)
        return 13;
    // Green tech (step 12)
    if (researchCount >= 4)
        return 12;
    // Pattern bonus (step 11)
    if (buildingCount >= 10)
        return 11;
    // Terrain strategy (step 10)
    if (energyBuildings >= 2)
        return 10;
    // Upgrade (step 9)
    if (hasUpgradedBuilding)
        return 9;
    // Turn management (step 8)
    if (marketCount >= 1 && houseCount >= 1)
        return 8;
    // Market (step 7)
    if (houseCount >= 1)
        return 7;
    // Housing (step 6)
    if (farmCount >= 1)
        return 6;
    // Adjacency intro (step 5)
    if (buildingCount >= 3)
        return 5;
    // Farm building (step 4)
    if (energyBuildings >= 1)
        return 4;
    // Resource basics (step 3) → 연구 완료 여부
    if (researchCount >= 1)
        return 3;
    // Energy building unlock (step 2) → 연구소 지음
    if (labCount >= 1)
        return 2;
    // Research lab (step 1)  
    if (buildingCount >= 1)
        return 1;
    // Welcome (step 0)
    return 0;
};
const tutorialSteps = [
    { key: "welcome", title: "🌍 푸른 세상 만들기", body: "환영합니다! 당신은 지구를 구할 도시 건설가입니다.<br><br>🎯 <strong>미션</strong>: 인구 1,000,000명 달성하기<br>⚠️ <strong>제한</strong>: 탄소 배출량을 한계 내로 유지<br><br>🌟 <strong>게임 기본</strong>:<br>• 왼쪽 상단: 자원 현황<br>• 오른쪽 상단: 건물 팔레트<br>• 하단 좌측: 게임 컨트롤<br><br>📍 <strong>첫 목표</strong>: 연구소 건설하기" },
    { key: "build_lab", title: "🔬 1단계: 연구소 건설", body: "연구소는 모든 기술 개발의 출발점입니다!<br><br>📋 <strong>건설 방법</strong>:<br>1. 오른쪽 팔레트에서 '연구소' 선택<br>2. 초록색 육각형 타일 클릭<br>3. 연구소 건설 완료!<br><br>💡 <strong>연구소 효과</strong>:<br>• 기술 연구 가능<br>• 기후 이벤트 예측<br>• 연구 속도 증가<br><br>🎯 <strong>다음</strong>: 첫 번째 기술 연구하기" },
    { key: "first_research", title: "🧪 2단계: 첫 기술 연구", body: "이제 첫 번째 기술을 연구해보세요!<br><br>📚 <strong>연구 방법</strong>:<br>1. 파란색 '기술' 버튼 클릭<br>2. 에너지 카테고리 선택<br>3. '풍력' 기술 연구 시작<br><br>⏰ <strong>연구 시간</strong>: 몇 턴 소요<br>🔓 <strong>해금</strong>: 풍력터빈 건물<br><br>🎯 <strong>다음</strong>: 에너지 생산 건물 건설" },
    { key: "energy_building", title: "⚡ 3단계: 풍력터빈 건설", body: "연구 완료 후 풍력터빈을 건설하세요!<br><br>🏔️ <strong>위치 선택</strong>:<br>• 산 지형에서 +50% 에너지<br>• 바람이 잘 통하는 곳<br><br>⚡ <strong>에너지 중요성</strong>:<br>• 부족시 모든 생산량 55% 감소<br>• 고급 건물 운영 필수<br><br>🎯 <strong>다음</strong>: 자원 관리 배우기" },
    { key: "resource_basics", title: "📊 4단계: 자원 관리 기초", body: "5가지 핵심 자원을 관리하세요:<br><br>💰 <strong>돈</strong>: 건물 건설 비용<br>⚡ <strong>에너지</strong>: 건물 운영 필수<br>👥 <strong>인구</strong>: 승리 조건 (100만명)<br>🍎 <strong>식량</strong>: 인구 증가 필수<br>🌍 <strong>탄소</strong>: 낮을수록 좋음<br><br>🎯 <strong>다음</strong>: 농장 건설하기" },
    { key: "build_farm", title: "🌾 5단계: 농장 건설", body: "식량 생산을 위해 농장을 건설하세요!<br><br>🌱 <strong>농장 효과</strong>:<br>• 식량 생산<br>• 인구 증가 지원<br><br>🏞️ <strong>지형 보너스</strong>:<br>• 초원: 표준 생산<br>• 강 근처: 추가 보너스<br><br>🎯 <strong>다음</strong>: 인접 보너스 배우기" },
    { key: "adjacency_intro", title: "🔗 6단계: 인접 보너스 발견", body: "건물들이 인접할 때 특별한 보너스가 발생합니다!<br><br>🎯 <strong>농장 인접 보너스</strong>:<br>• 농장 + 공원 → 식량 +1, 탄소 -1<br>• 농장 + 정수장 → 식량 +2<br><br>📍 <strong>실습</strong>:<br>농장 옆에 다른 건물 배치해보기<br><br>🎯 <strong>다음</strong>: 주거 건물 건설" },
    { key: "housing", title: "🏠 7단계: 주거 건물 건설", body: "인구 증가를 위해 주거 건물을 지으세요!<br><br>🏡 <strong>주거 건물 종류</strong>:<br>• 집: 기본 주거<br>• 아파트: 고밀도 주거 (연구 필요)<br><br>👥 <strong>인구 효과</strong>:<br>• 매 턴 인구 증가<br>• 식량 소비: 인구 × 0.15<br><br>🎯 <strong>다음</strong>: 경제 건물 건설" },
    { key: "market", title: "💰 8단계: 시장 건설", body: "경제 발전을 위해 시장을 건설하세요!<br><br>🏪 <strong>시장 효과</strong>:<br>• 돈 생산<br>• 주거 건물과 시너지<br><br>💡 <strong>인접 보너스</strong>:<br>• 시장 + 아파트 → 인구 +2<br>• 시장 + 공장 → 돈 +2<br><br>🎯 <strong>다음</strong>: 턴 종료와 자동 성장" },
    { key: "turn_management", title: "⏰ 9단계: 턴 관리", body: "턴을 종료하여 도시가 성장하는 것을 보세요!<br><br>🔄 <strong>턴 종료 시</strong>:<br>• 자원 생산<br>• 인구 증가<br>• 연구 진행<br>• 기후 이벤트 발생 가능<br><br>📊 <strong>확인사항</strong>:<br>• 자원 수지 균형<br>• 탄소 배출량<br><br>🎯 <strong>다음</strong>: 건물 업그레이드" },
    { key: "upgrade", title: "⬆️ 10단계: 건물 업그레이드", body: "기존 건물을 클릭하여 업그레이드하세요!<br><br>📈 <strong>업그레이드 효과</strong>:<br>• 생산량 증가<br>• 효율성 향상<br><br>💰 <strong>비용</strong>:<br>• 레벨에 따라 증가<br>• 투자 대비 수익 고려<br><br>🎯 <strong>다음</strong>: 지형별 전략" },
    { key: "terrain_strategy", title: "🗺️ 11단계: 지형별 건물 전략", body: "각 지형에 맞는 최적의 건물을 배치하세요!<br><br>🏔️ <strong>산</strong>: 풍력터빈, 지열발전<br>🏜️ <strong>사막</strong>: 태양광, 온실<br>🌊 <strong>바다</strong>: 정수장<br>🌲 <strong>숲</strong>: 주거 건물 (+30%)<br><br>🎯 <strong>다음</strong>: 패턴 보너스" },
    { key: "pattern_bonus", title: "🎯 12단계: 패턴 보너스", body: "건물을 특정 패턴으로 배치하면 추가 보너스!<br><br>📏 <strong>선형 체인</strong>: 3개 이상 일직선 (+20%)<br>🔺 <strong>삼각형</strong>: 3개 건물 삼각형 배치<br>🏘️ <strong>지구</strong>: 4개 이상 같은 건물 그룹<br><br>🎯 <strong>다음</strong>: 환경 기술 연구" },
    { key: "green_tech", title: "🌱 13단계: 환경 기술", body: "친환경 기술을 연구하세요!<br><br>🔬 <strong>추천 기술</strong>:<br>• 태양광: 청정 에너지<br>• 재조림: 탄소 흡수<br>• 순환경제: 재활용 시설<br><br>🌍 <strong>탄소 관리</strong>:<br>• 한계 초과 시 패배<br>• 친환경 건물로 감소<br><br>🎯 <strong>다음</strong>: 특수 능력 해금" },
    { key: "climate_events", title: "🌦️ 14단계: 기후 이벤트", body: "무작위로 발생하는 기후 이벤트에 대비하세요!<br><br>⚠️ <strong>이벤트 종류</strong>:<br>• 가뭄: 식량 생산 감소<br>• 홍수: 건물 피해<br>• 폭염: 에너지 수요 증가<br><br>🔮 <strong>예측</strong>: 연구소가 있으면 미리 알 수 있음<br><br>🎯 <strong>다음</strong>: 고급 건물" },
    { key: "advanced_buildings", title: "🏭 15단계: 고급 건물", body: "기술 연구로 해금되는 고급 건물들!<br><br>🏭 <strong>산업 건물</strong>:<br>• 공장: 대량 돈 생산<br>• 친환경 공장: 탄소 감소<br><br>🏢 <strong>유틸리티</strong>:<br>• 재활용센터: 탄소 감소<br>• 정수처리장: 식량 보너스<br><br>🎯 <strong>다음</strong>: 대규모 확장" },
    { key: "scaling", title: "📈 16단계: 대규모 확장", body: "이제 본격적인 도시 확장을 시작하세요!<br><br>🏗️ <strong>확장 전략</strong>:<br>• 여러 지구 개발<br>• 전문화된 구역 설정<br>• 효율적인 자원 순환<br><br>⚡ <strong>인프라</strong>:<br>• 충분한 에너지 확보<br>• 교통망 고려<br><br>🎯 <strong>다음</strong>: 최종 목표 달성" },
    { key: "final_push", title: "🚀 17단계: 최종 목표 달성", body: "백만 인구 달성을 위한 마지막 스퍼트!<br><br>🎯 <strong>전략</strong>:<br>• 대량 주거 건설<br>• 식량 공급 확보<br>• 에너지 안정성<br>• 탄소 배출 관리<br><br>📊 <strong>모니터링</strong>:<br>• 턴 제한 확인<br>• 자원 균형<br><br>🎯 <strong>다음</strong>: 승리!" },
    { key: "victory", title: "🏆 18단계: 승리 달성!", body: "축하합니다! 100만 인구 달성!<br><br>🎉 <strong>성공 요인</strong>:<br>• 체계적인 도시 계획<br>• 효율적인 자원 관리<br>• 친환경 기술 활용<br>• 전략적 건물 배치<br><br>🌟 <strong>당신은 진정한 지구의 영웅입니다!</strong><br><br>더 높은 난이도에 도전해보세요!" }
];
// Check if tutorial is completed
const isTutorialCompleted = (s) => {
    if (!s)
        return false;
    // Tutorial is completed when:
    // 1. Player has reached the victory step (step 20, tutorialIndex 19)
    // 2. Or player has achieved victory condition (1 million population)
    // 3. And is in tutorial mode
    const isInTutorialMode = s.difficulty === "tutorial" || s.difficulty === "d01_story" || s.difficultyData.name === "튜토리얼";
    const hasReachedFinalStep = tutorialIndex >= tutorialSteps.length - 1;
    const hasAchievedVictory = s.resources.population >= 1000000;
    return isInTutorialMode && (hasReachedFinalStep || hasAchievedVictory);
};
// Get next difficulty level after completing tutorial
const getNextDifficulty = (currentDifficulty) => {
    // Difficulty progression: tutorial -> easy -> normal -> hard
    switch (currentDifficulty) {
        case "tutorial":
        case "d01_story":
            return "easy";
        case "easy":
            return "hard";
        case "hard":
            return "hard"; // Stay at hardest difficulty
        default:
            return "easy"; // Default fallback
    }
};
function drawTutorialDock() {
    if (!tutorialDock) {
        // Create tutorial dock element if it doesn't exist
        tutorialDock = document.createElement("div");
        tutorialDock.id = "tutorialDock";
        tutorialDock.className = "fixed bottom-4 right-4 z-40 bg-gray-900/95 text-white rounded-xl border border-gray-700 w-80 max-h-96 overflow-hidden";
        document.body.appendChild(tutorialDock);
    }
    const step = tutorialSteps[Math.min(tutorialIndex, tutorialSteps.length - 1)];
    const diffLabel = gameState ? (gameState.difficultyData.name || "") : "";
    const tag = gameState && gameState.difficulty === "tutorial" || gameState?.difficultyData.name === "튜토리얼" ? `<span class="ml-2 px-2 py-0.5 text-[10px] rounded bg-emerald-700">난이도: 튜토리얼</span>` : `<span class="ml-2 px-2 py-0.5 text-[10px] rounded bg-sky-700">난이도: ${diffLabel}</span>`;
    tutorialDock.innerHTML = `

<div class="p-3 border-b border-gray-700 flex items-center justify-between">

  <h3 class="text-sm font-bold flex items-center">

    <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>

    튜토리얼 ${tag}

  </h3>

  <div class="flex items-center gap-1">

    <button id="dockMinBtn" class="text-gray-400 hover:text-white text-lg leading-none">−</button>

    <button id="dockClose" class="text-gray-400 hover:text-white text-lg leading-none">×</button>

  </div>

</div>

<div class="p-3">

  <h4 class="font-semibold mb-2 text-emerald-400">${step.title}</h4>

  <div class="text-xs text-gray-200 mb-3 leading-relaxed">${step.body}</div>

  <div class="flex items-center justify-between mt-3">
    <button id="prevTutorialBtn" class="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors ${tutorialIndex <= 0 ? 'opacity-50 cursor-not-allowed' : ''}">← 이전</button>
    <div class="text-[11px] bg-gray-700 px-2 py-1 rounded">${Math.min(tutorialIndex + 1, tutorialSteps.length)}/${tutorialSteps.length}</div>
    <button id="nextTutorialBtn" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded transition-colors">다음 →</button>
  </div>

  ${isTutorialCompleted(gameState) ? `
  <div class="mt-4 pt-3 border-t border-gray-600">
    <button id="nextGameBtn" class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
      🎉 다음 단계로 이동
    </button>
    <div class="text-[10px] text-gray-400 text-center mt-1">더 높은 난이도에 도전하세요!</div>
  </div>
  ` : ''}
`;
    // Removed previous/next buttons - tutorial now auto-progresses
    if (document.getElementById("dockClose")) {
        document.getElementById("dockClose").onclick = () => { tutorialDock?.classList.add("hidden"); };
    }
    if (document.getElementById("dockMinBtn")) {
        document.getElementById("dockMinBtn").onclick = () => {
            const body = document.getElementById("dockBody");
            if (body) {
                if (body.classList.contains("hidden"))
                    body.classList.remove("hidden");
                else
                    body.classList.add("hidden");
            }
        };
    }
    // Handle tutorial navigation buttons
    if (document.getElementById("prevTutorialBtn")) {
        document.getElementById("prevTutorialBtn").onclick = () => {
            if (tutorialIndex > 0) {
                tutorialIndex--;
                drawTutorialDock();
            }
        };
    }
    if (document.getElementById("nextTutorialBtn")) {
        document.getElementById("nextTutorialBtn").onclick = () => {
            const currentProgress = gameState ? checkTutorialProgress(gameState) : 0;
            const maxAllowed = Math.max(currentProgress, tutorialIndex + 1);
            if (tutorialIndex < Math.min(maxAllowed, tutorialSteps.length - 1)) {
                tutorialIndex++;
                drawTutorialDock();
            }
        };
    }
    // Handle next game button click
    if (document.getElementById("nextGameBtn")) {
        document.getElementById("nextGameBtn").onclick = () => {
            // Start new game with next difficulty level
            const nextDifficulty = getNextDifficulty(gameState?.difficulty || "tutorial");
            startNewGame(nextDifficulty);
            // Hide tutorial dock
            if (tutorialDock)
                tutorialDock.classList.add("hidden");
            // Reset tutorial index for potential future tutorial runs
            tutorialIndex = 0;
        };
    }
}
function updateTutorialDock(s) {
    // 튜토리얼은 최저 난이도(d01_story/tutorial)에서만 표시
    if (s.difficulty !== "tutorial" && s.difficulty !== "d01_story" && s.difficultyData.name !== "튜토리얼") {
        if (tutorialDock)
            tutorialDock.classList.add("hidden");
        return;
    }
    // Check tutorial progress for manual navigation buttons
    const currentProgress = checkTutorialProgress(s);
    // Allow manual navigation within completed steps
    if (currentProgress > tutorialIndex) {
        // User can advance to any completed step
    }
    if (!tutorialDock) {
        drawTutorialDock();
    }
    else {
        drawTutorialDock();
    }
}
function highlightAdjacencyHint(s) {
    const hexSize = 50;
    let bestKey;
    let bestScore = 0;
    s.tiles.forEach((t, k) => {
        if (!t.revealed || !t.building)
            return;
        const b = s.buildings[t.building];
        const score = computeAdjacency(s, t, b).synergy;
        if (score > bestScore) {
            bestScore = score;
            bestKey = k;
        }
    });
    if (!bestKey)
        return;
    const t = s.tiles.get(bestKey);
    const [x, y] = axialToPixel({ q: t.q, r: t.r }, hexSize);
    for (let i = 0; i < 40; i++)
        particles.push(createParticle(x + canvas.width / 2 + (Math.random() - 0.5) * 60, y + canvas.height / 2 + (Math.random() - 0.5) * 60, "#22d3ee"));
}
const showTechBtn = () => { document.getElementById("techModal").classList.remove("hidden"); };
const setupSeedUI = () => {
    try {
        const parent = document.getElementById("startScene") || document.body;
        let seedInput = document.getElementById("seedInput");
        if (!seedInput) {
            const row = document.createElement("div");
            row.id = "seedRow";
            row.className = "mt-2 flex items-center gap-2 text-sm";
            row.innerHTML = `<label for="seedInput" class="opacity-80">시드</label><input id="seedInput" type="number" inputmode="numeric" class="bg-gray-800 border border-gray-600 rounded px-2 py-1 w-40" placeholder="랜덤" /><button id="seedRandomBtn" class="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">🎲 랜덤</button><button id="seedCopyBtn" class="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">복사</button>`;
            parent.appendChild(row);
            seedInput = row.querySelector("#seedInput");
        }
        const mkSeed = () => ((Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0);
        const lastSeedStr = localStorage.getItem("greenworld_last_seed");
        const restored = lastSeedStr !== null && !isNaN(Number(lastSeedStr)) ? Number(lastSeedStr) : mkSeed();
        seedInput.value = String(restored);
        try {
            localStorage.setItem("greenworld_last_seed", String(restored));
        }
        catch { }
        seedInput.addEventListener("change", () => {
            const n = Math.floor(Number(seedInput.value) || 0);
            const v = Math.max(0, Math.min(2147483647, n));
            seedInput.value = String(v);
            try {
                localStorage.setItem("greenworld_last_seed", String(v));
            }
            catch { }
        });
        const randomBtn = document.getElementById("seedRandomBtn");
        if (randomBtn)
            randomBtn.addEventListener("click", () => {
                const nv = mkSeed();
                seedInput.value = String(nv);
                try {
                    localStorage.setItem("greenworld_last_seed", String(nv));
                }
                catch { }
                if (typeof showError === "function")
                    showError(`새 시드: ${nv}`);
            });
        const copyBtn = document.getElementById("seedCopyBtn");
        if (copyBtn)
            copyBtn.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(seedInput.value);
                    if (typeof showError === "function")
                        showError("시드 복사됨");
                }
                catch { }
            });
    }
    catch { }
};
function ensureTutorialStartPanel() {
    let dock = document.getElementById("tutorialStartDock");
    if (!dock)
        return;
    dock = document.createElement("div");
    dock.id = "tutorialStartDock";
    dock.className = "fixed bottom-4 right-4 z-40 bg-gray-900/95 text-white rounded-xl border border-gray-700 p-3 w-72";
    dock.innerHTML = `

<div class="text-sm font-bold mb-2">가이드</div>

<div class="text-xs opacity-80">튜토리얼은 게임 중에도 계속 표시됩니다. 단축키 T로 토글.</div>

<div class="mt-2 grid grid-cols-2 gap-2">

  <button id="startTutorialBtn" class="px-2 py-1 rounded bg-emerald-700 text-xs">튜토리얼 모드 시작</button>

  <button id="toggleDockBtn" class="px-2 py-1 rounded bg-gray-700 text-xs">튜토리얼 열기</button>

</div>

`;
    document.body.appendChild(dock);
    document.getElementById("startTutorialBtn").onclick = () => {
        startNewGame("tutorial");
        if (!tutorialDock)
            drawTutorialDock();
    };
    document.getElementById("toggleDockBtn").onclick = () => {
        if (!tutorialDock)
            drawTutorialDock();
        else
            tutorialDock.classList.toggle("hidden");
    };
}
const startNewGame = async (difficulty) => { 
    // 1. 데이터 준비
    if (!gameData) {
      console.error("gameData가 아직 로드되지 않았습니다.");
      return;
    }
  
    // 2. 초기 상태 생성
    let state = initState(difficulty, gameData);
  
    // 3. 밸런스 패치 (빌딩/규칙 값 조정)
    if (typeof applyBalancePostLoad === "function") {
      state = applyBalancePostLoad(state) || state;
    }
  
    // 4. 전역 반영
    window.gameState = state;
  
    // 5. 시작 화면 숨기기
    hideScene("startScene");
  
    // 6. 오프닝 영상 등 연출 처리
    const openingScene = document.getElementById("openingScene");
    if (openingScene) {
      openingScene.classList.remove("hidden");
      const openingVideo = document.getElementById("openingVideo");
      if (openingVideo) {
        openingVideo.play().catch(()=>{});
        openingVideo.addEventListener("ended", () => {
          openingScene.classList.add("hidden");
        }, { once: true });
      }
    }
  
    // 7. UI 갱신
    update();
  };
  
// Multi-tile selection system
let selectedTiles = new Set();
const toggleTileSelection = (pos, ctrlKey) => {
    const key = tileKey(pos);
    if (ctrlKey) {
        // Multi-select mode: add/remove tiles
        if (selectedTiles.has(key)) {
            selectedTiles.delete(key);
        }
        else {
            selectedTiles.add(key);
        }
    }
    else {
        // Single select mode: clear and select one
        selectedTiles.clear();
        selectedTiles.add(key);
    }
};
// Function to find all buildable tiles for selected building
const findBuildableTiles = () => {
    if (!gameState || !selectedBuilding)
        return [];
    const buildableTiles = [];
    const building = gameState.buildings[selectedBuilding.id];
    if (!building)
        return [];
    gameState.tiles.forEach((tile) => {
        // Only consider explored tiles that don't have buildings
        if (tile.explored && !tile.building && placeable(gameState, tile, building)) {
            buildableTiles.push({ q: tile.q, r: tile.r });
        }
    });
    return buildableTiles;
};
// Function to select all buildable tiles and existing buildings of the selected type
const selectAllBuildableTiles = () => {
    if (!gameState || !selectedBuilding) {
        showError("먼저 건물을 선택하세요");
        return;
    }
    const buildableTiles = findBuildableTiles();
    const existingTiles = [];
    // Find existing buildings of the same type
    gameState.tiles.forEach((tile, key) => {
        if (tile.building === selectedBuilding.id && tile.revealed) {
            const [q, r] = key.split(',').map(Number);
            existingTiles.push({ q, r });
        }
    });
    const allTiles = [...buildableTiles, ...existingTiles];
    if (allTiles.length === 0) {
        showError("선택 가능한 타일이 없습니다");
        return;
    }
    // Clear existing selection and add all tiles
    selectedTiles.clear();
    allTiles.forEach(pos => {
        selectedTiles.add(tileKey(pos));
    });
    // Update display
    draw(gameState);
    showError(`${allTiles.length}개의 타일이 선택되었습니다 (건설 가능: ${buildableTiles.length}, 기존 건물: ${existingTiles.length})`);
};
const executeMultiAction = () => {
    if (!gameState || !selectedBuilding || selectedTiles.size === 0) {
        showError("건물과 타일을 먼저 선택하세요");
        return;
    }
    let actionCount = 0;
    const selectedPositions = Array.from(selectedTiles).map(key => {
        const [q, r] = key.split(',').map(Number);
        return { q, r };
    });
    for (const pos of selectedPositions) {
        const tile = gameState.tiles.get(tileKey(pos));
        if (!tile)
            continue;
        // Try upgrade if building exists and matches selected type
        if (tile.building === selectedBuilding.id && canAffordEffective(gameState, selectedBuilding, tile.level)) {
            gameState = placeOrUpgrade(gameState, pos, selectedBuilding.id);
            actionCount++;
        }
        // Try build if tile is empty and suitable
        else if (placeable(gameState, tile, selectedBuilding)) {
            gameState = placeOrUpgrade(gameState, pos, selectedBuilding.id);
            actionCount++;
        }
    }
    if (actionCount > 0) {
        update();
    }
};
const init = async () => {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    // Default UI scaling: render #ui at 70% of fit-to-viewport size and center it
    const applyUiScale = () => {
        const ui = document.getElementById('ui');
        if (!ui)
            return;
        const LOGICAL_W = 1920, LOGICAL_H = 1080;
        const BASE = 1 // 100%
        const vw = window.innerWidth, vh = window.innerHeight;
        const fit = Math.min(vw / LOGICAL_W, vh / LOGICAL_H);
        const scale = fit * BASE;
        const dx = Math.max(0, (vw - LOGICAL_W * scale) / 2);
        const dy = Math.max(0, (vh - LOGICAL_H * scale) / 2);
        ui.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    };
    window.addEventListener('resize', applyUiScale);
    window.addEventListener('orientationchange', applyUiScale);
    applyUiScale();
    // Block native swipe/scroll gestures only on the canvas area
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
    initStars(120);
    setupSeedUI();
    ensureTutorialStartPanel();
    gameData = await fetchExternalData();
    applyBalancePostLoad(gameData);
    renderLoop();
    canvas.addEventListener("click", (e) => {
        // Track user interaction for auto mode
        window.lastUserInteraction = Date.now();
        handleCanvasClick(e);
    });
    let isDragging = false;
    let last = { x: 0, y: 0 };
    canvas.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
            isDragging = true;
            last = { x: e.clientX, y: e.clientY };
        }
    });
    canvas.addEventListener("mousemove", (e) => {
        if (isDragging && gameState) {
            // Disable camera panning to keep center fixed
            last = { x: e.clientX, y: e.clientY };
        }
        else {
            handleCanvasHover(e);
        }
    });
    canvas.addEventListener("mouseup", () => { isDragging = false; });
    canvas.addEventListener("wheel", (e) => {
        if (!gameState)
            return;
        const { camera } = gameState;
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.max(0.3, Math.min(2, camera.zoom * zoomFactor));
        // Keep camera centered: do not translate on zoom
        camera.zoom = newZoom;
        camera.x = 0;
        camera.y = 0;
        e.preventDefault();
    }, { passive: false });
    document.getElementById("techBtn").addEventListener("click", () => {
        showTech();
    });
    document.getElementById("adjacencyBtn").addEventListener("click", () => {
        showAdjacencyModal(gameState);
    });
    document.getElementById("adjacencyCloseX")?.addEventListener("click", () => {
        document.getElementById("adjacencyModal").classList.add("hidden");
    });
    document.getElementById("techCloseX")?.addEventListener("click", () => {
        hideTech();
    });
    document.getElementById("endTurnBtn").addEventListener("click", () => {
        window.lastUserInteraction = Date.now();
        if (gameState) {
            gameState = endTurn(gameState);
            update();
        }
    });
    document.getElementById("saveBtn").addEventListener("click", () => {
        if (gameState)
            save(gameState);
    });
    document.getElementById("loadBtn").addEventListener("click", () => {
        if (gameData) {
            const loaded = tryLoad(gameData);
            if (loaded) {
                gameState = loaded;
                hideScene("startScene");
                update();
            }
        }
    });
    document.getElementById("newGameBtn").addEventListener("click", () => {
        const difficulty = document.getElementById("difficultySelect").value;
        playOpeningVideo(difficulty);
    });
    document.getElementById("continueBtn").addEventListener("click", () => {
        if (gameData) {
            const loaded = tryLoad(gameData);
            if (loaded) {
                gameState = loaded;
                hideScene("startScene");
                update();
            }
        }
    });
    // document.getElementById("autoNormalBtn")!.addEventListener("click", () => {
    //   const difficulty = (document.getElementById("difficultySelect") as HTMLSelectElement).value as Difficulty;
    //   startNewGame(difficulty);
    //   setTimeout(() => startAutoMode(), 1000);
    // });
    // 녹화 시스템 UI 이벤트 핸들러
    // Make stopAutoMode available globally
    window.stopAutoMode = stopAutoMode;
    document.getElementById("restartBtn").addEventListener("click", () => { window.location.reload(); });
    document.addEventListener("keydown", (e) => {
        if (e.key === "c" || e.key === "C") {
            document.getElementById("console").classList.toggle("hidden");
        }
        if (e.key === "t" || e.key === "T") {
            if (!tutorialDock)
                drawTutorialDock();
            else
                tutorialDock.classList.toggle("hidden");
        }
        // Ctrl + Shift + A: Select all buildable tiles
        if (e.ctrlKey && e.shiftKey && (e.key === "a" || e.key === "A")) {
            e.preventDefault();
            selectAllBuildableTiles();
        }
        // E key: Evolve building at selected tile
        if (e.key === "e" || e.key === "E") {
            if (gameState && gameState.selectedTile) {
                const tile = gameState.tiles.get(tileKey(gameState.selectedTile));
            }
        }
    });
};
function screenToGameCoords(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
  
    // 1. 화면 좌표 → 캔버스 좌표
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
  
    // 2. 카메라 보정
    const cam = gameState.camera;
    const gameX = (x - cam.x) / cam.zoom;
    const gameY = (y - cam.y) / cam.zoom;
  
    return { x: gameX, y: gameY };
  }
  
// ★ 클릭
const handleCanvasClick = (e) => {
    if (!gameState) return;
    const canvas = document.getElementById("gameCanvas")
    const rect = canvas.getBoundingClientRect();
    // CSS→논리 변환
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top)  * scaleY;
  
    const cam = gameState.camera;
    const gx = (cx - canvas.width/2 - cam.x) / cam.zoom;
    const gy = (cy - canvas.height/2 - cam.y) / cam.zoom;
  
    const pos  = pixelToAxial(gx, gy, 50); // ★ 50으로 통일
    const tile = gameState.tiles.get(tileKey(pos));
  
    if (!tile || (!tile.revealed && !tile.explored)) return;
  
    if (tile.revealed) {
      const k = tileKey(pos);
      if (selectedTiles.has(k) && selectedTiles.size > 0 && selectedBuilding) {
        executeMultiAction();
        return;
      }
      toggleTileSelection(pos, e.ctrlKey);
      gameState = assignObj(gameState, { selectedTile: pos });
  
      if (!e.ctrlKey && selectedBuilding && gameState.buildings[selectedBuilding.id] && selectedTiles.size <= 1) {
        gameState = placeOrUpgrade(gameState, pos, selectedBuilding.id);
      }
    } else if (tile.explored) {
      gameState = assignObj(gameState, { selectedTile: pos });
    }
    update();
  };
  
  // ★ hover(enter)
  const handleCanvasHover = (e) => {
    if (!gameState) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top)  * scaleY;
  
    const cam = gameState.camera;
    const gx = (cx - canvas.width/2 - cam.x) / cam.zoom;
    const gy = (cy - canvas.height/2 - cam.y) / cam.zoom;
  
    const pos  = pixelToAxial(gx, gy, 50);
    const tile = gameState.tiles.get(tileKey(pos));
    const hoverInfo = document.getElementById("tileHoverInfo");
    if (!hoverInfo) return;
  
    if (tile && tile.revealed) {
      showTileHover(tile, e.clientX, e.clientY); // 화면 좌표 전달
    } else {
      hoverInfo.classList.add("hidden");
    }
  };
  
  // ★ hover(move)
  const handleCanvasMouseMove = (e) => {
    if (!gameState) return;
    const canvas = document.getElementById("gameCanvas")
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top)  * scaleY;
  
    const cam = gameState.camera;
    const gx = (cx - canvas.width/2 - cam.x) / cam.zoom;
    const gy = (cy - canvas.height/2 - cam.y) / cam.zoom;
  
    const pos  = pixelToAxial(gx, gy, 50);
    const tile = gameState.tiles.get(tileKey(pos));
    const hoverInfo = document.getElementById("tileHoverInfo");
    if (!hoverInfo) return;
  
    if (tile && tile.revealed) {
      showTileHover(tile, e.clientX, e.clientY);
    } else {
      hoverInfo.classList.add("hidden");
    }
  };
  
  // ★ tooltip 위치 보정 (UI 스케일 반영)
  const showTileHover = async (tile, mouseX, mouseY) => {
    const hoverInfo    = document.getElementById("tileHoverInfo");
    const hoverContent = document.getElementById("hoverContent");
    const ui = document.getElementById('ui');
    if (!hoverInfo || !hoverContent || !gameState || !ui) return;
  
    // ... (기존 content 구성 로직 그대로) ...
  
    // 마지막에 위치만 보정
    const rect = ui.getBoundingClientRect();
    const scaleX = rect.width  / 1920;
    const scaleY = rect.height / 1080;
    const ux = (mouseX - rect.left) / (scaleX || 1);
    const uy = (mouseY - rect.top ) / (scaleY || 1);
  
    hoverInfo.style.left = (ux + 10) + "px";
    hoverInfo.style.top  = (uy - 10) + "px";
    hoverInfo.classList.remove("hidden");
  };
  
window.HEX_SIZE = 50;