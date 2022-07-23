"use strict";

const nextCropLevelRequirementTextElement = document.getElementById("next-crop-level-requirement-text");
const unlockNextCropButtonElement = document.getElementById("unlock-crops-button");

// if we unlocked all of the available crops, hide the unlock button
function updateUnlockNextCropInfo() {
    if (data.numCropsRevealed === numCropsMax) {
        unlockNextCropButtonElement.style.display = "none";
        return;
    }

    nextCropLevelRequirementTextElement.innerHTML = nextCropLevelRequirement;
}

function selectCrop(cropIndex) {
    data.selectedCrop = cropIndex;
    updateHeaderCropSelectedInfo();
    updateSelectedCropColor();
    upgradeHeaderCostColor();
}

function updateSelectedCropColor() {
    for (let i = 1; i < crops.length; i++) {
        document.getElementById("crop" + i + "-button").style.borderColor = 'Black';
    }
    document.getElementById("crop" + data.selectedCrop + "-button").style.borderColor = 'Orange';
}

const headerCropSelectedTextElement = document.getElementById("header-cropSelected-text");
const headerGoldTextElement = document.getElementById("header-gold-text");
const headerXpTextElement = document.getElementById("header-xp-text");
const headerCostTextElement = document.getElementById("header-cost-text");
const headerHarvestTimeTextElement = document.getElementById("header-harvestTime-text");

function updateHeaderCropSelectedInfo() {
    let totalSeconds = crops[data.selectedCrop].harvestTime  * harvestTimeBoost;
    let harvestTime = formatHarvestTime(totalSeconds);

    headerCropSelectedTextElement.innerHTML = crops[data.selectedCrop].name;
    headerGoldTextElement.innerHTML = `+${cropGold(data.selectedCrop)}`;
    headerXpTextElement.innerHTML = `+${cropXP(data.selectedCrop)}`;
    headerCostTextElement.innerHTML = `${crops[data.selectedCrop].cost} gold`;
    headerHarvestTimeTextElement.innerHTML = harvestTime;
}

function revealCrops() {
    for (let i = 0; i < numCropsMax; i++) {
        let element = document.getElementById("crop" + i + "-row");
        element.style.display = i < data.numCropsRevealed ? "table-row" : "none";
    }
    updateCropInfo();
}

let nextCropLevelRequirement = 0;

function calculateNextCropLevelRequirement() {
    nextCropLevelRequirement = baseCropLevelRequirement * data.numCropsRevealed;
}

function unlockNextCrop() {
    if (data.level >= nextCropLevelRequirement && data.numCropsRevealed !== numCropsMax) {
        data.numCropsRevealed++;
        calculateNextCropLevelRequirement();
        revealCrops();
        updateUnlockNextCropInfo();
        updateCropInfo();
        updateUnlockNextCropColor();
    }
}

const unlockCropsButtonElement = document.getElementById("unlock-crops-button");

function updateUnlockNextCropColor() {
    if (data.level >= nextCropLevelRequirement) {
        unlockCropsButtonElement.classList.add("enabled");
        unlockCropsButtonElement.classList.remove("disabled");
    } else {
        unlockCropsButtonElement.classList.add("disabled");
        unlockCropsButtonElement.classList.remove("enabled");
    }
    updateCropsMenuButtonColor();
}

function updateCropsMenuButtonColor() {
    if (data.level >= nextCropLevelRequirement) {
        cropsMenuButtonElement.style.backgroundColor = unlockCropsButtonElement.style.display === 'none'  ? 'Silver' : 'Green';
    } else {
        cropsMenuButtonElement.style.backgroundColor = 'Silver';
    }
}

function updateCropInfo() {
    for (let i = 0; i < data.numCropsRevealed; i++) {
        let totalSeconds = crops[i].harvestTime * harvestTimeBoost;
        let harvestTime = formatHarvestTime(totalSeconds);

        document.getElementById("crop" + i + "-name").innerHTML = crops[i].name;
        document.getElementById("crop" + i + "-gold").innerHTML = `+${formatWithCommas(cropGold(i))}`;
        document.getElementById("crop" + i + "-xp").innerHTML = `+${formatWithCommas(cropXP(i))}`;
        document.getElementById("crop" + i + "-cost").innerHTML = `${crops[i].cost} gold`
        document.getElementById("crop" + i + "-harvestTime").innerHTML = harvestTime;
    }
}