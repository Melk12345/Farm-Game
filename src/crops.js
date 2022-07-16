const nextCropLevelRequirementTextElement = document.getElementById("next-crop-level-requirement-text");
const unlockNextCropButtonElement = document.getElementById("unlock-crops-button");

// if we unlocked all of the available crops, hide the unlock button
function updateUnlockNextCropInfo() {
    let count = 0;
    for (let i = 0; i < data.cropsRevealed.length; i++) {
        if (data.cropsRevealed[i]) {
            count++;
        } else {
            break;
        }
    }
    if (count === data.cropsRevealed.length - 1) {
        unlockNextCropButtonElement.style.display = "none";
        return;
    }

    nextCropLevelRequirementTextElement.innerHTML = data.nextCropLevelRequirement;
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
    for (let i = 1; i < data.cropsRevealed.length; i++) {
        if (data.cropsRevealed[i - 1]) {
            document.getElementById("crop" + i + "-row").style.display = "table-row";
        } else {
            document.getElementById("crop" + i + "-row").style.display = "none";
        }
    }
}

function unlockNextCrop() {
    let count = 0;
    for (let i = 0; i < data.cropsRevealed.length; i++) {
        if (data.cropsRevealed[i]) {
            count++;
        } else {
            break;
        }
    }
    if (data.level >= data.nextCropLevelRequirement && count !== data.cropsRevealed.length - 1) {
        for (let i = 0; i < data.cropsRevealed.length; i++) {
            if (data.cropsRevealed[i] === false) {
                data.cropsRevealed[i] = true;
                break;
            }
        }
        data.nextCropLevelRequirement += 2;
        revealCrops();
        updateUnlockNextCropColor();
        updateUnlockNextCropInfo();
        updateCropInfo();
    }
}

const unlockCropsButtonElement = document.getElementById("unlock-crops-button");

function updateUnlockNextCropColor() {
    if (data.level < data.nextCropLevelRequirement) {
        unlockCropsButtonElement.style.borderColor = '#B33939';
        unlockCropsButtonElement.style.cursor = "not-allowed";
        unlockCropsButtonElement.disabled = true;
        cropsMenuButtonElement.style.backgroundColor = 'Silver';
    } else {
        unlockCropsButtonElement.style.borderColor = 'Green';
        unlockCropsButtonElement.style.cursor = "pointer";
        unlockCropsButtonElement.disabled = false;
        cropsMenuButtonElement.style.backgroundColor = 'Green';
    }
}

function updateCropInfo() {
    for (let i = 1; i < data.cropsRevealed.length; i++) {
        let totalSeconds = crops[i].harvestTime * harvestTimeBoost;
        let harvestTime = formatHarvestTime(totalSeconds);

        document.getElementById("crop" + i + "-name").innerHTML = crops[i].name;
        document.getElementById("crop" + i + "-gold").innerHTML = `+${formatWithCommas(cropGold(i))}`;
        document.getElementById("crop" + i + "-xp").innerHTML = `+${formatWithCommas(cropXP(i))}`;
        document.getElementById("crop" + i + "-cost").innerHTML = `${crops[i].cost} gold`
        document.getElementById("crop" + i + "-harvestTime").innerHTML = harvestTime;
    }
}