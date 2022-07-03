const nextCropLevelRequirementTextElement = document.getElementById("next-crop-level-requirement-text");

function updateUnlockNextCropInfo() {
    nextCropLevelRequirementTextElement.innerHTML = data.nextCropLevelRequirement;
}

function selectCrop(cropIndex) {
    data.selectedCrop = cropIndex;
    updateHeaderCropSelectedInfo();
    updateSelectedCropColor();
}

function updateSelectedCropColor() {
    for (let i = 1; i < crops.length; i++) {
        document.getElementById("crop" + i + "-button").style.borderColor = 'Black';
    }
    document.getElementById("crop" + data.selectedCrop + "-button").style.borderColor = 'Orange';
}

function updateHeaderCropSelectedInfo() {
    let harvestTime = " ";
    let totalSeconds = crops[data.selectedCrop].harvestTime;

    let days = totalSeconds / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let seconds = (minutes % 1) * 60;

    if (crops[data.selectedCrop].harvestTime < 60000) harvestTime += `${format(seconds, 0)}s`;
    else if (crops[data.selectedCrop].harvestTime < 3600000) harvestTime += `${format(minutes, 0)}m ${format(seconds, 0)}s`;
    else if (crops[data.selectedCrop].harvestTime < 86400000) harvestTime += `${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;
    else if (crops[data.selectedCrop].harvestTime >= 86400000) harvestTime += `${format(days, 0)}d ${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;

    headerCropSelectedTextElement.innerHTML = crops[data.selectedCrop].name;
    headerGoldTextElement.innerHTML = `+${crops[data.selectedCrop].gold}`;
    headerXpTextElement.innerHTML = `+${crops[data.selectedCrop].xp}`;
    headerCostTextElement.innerHTML = `${crops[data.selectedCrop].cost} gold`;
    headerHarvestTimeTextElement.innerHTML = harvestTime;
}

function updateHeaderCropInfo() {
    for (let i = 1; i < crops.length; i++) {
        if (data.cropsRevealed[i - 1] === true) {
            let harvestTime = " ";
            let totalSeconds = crops[i].harvestTime;

            let days = totalSeconds / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;
            let seconds = (minutes % 1) * 60;

            if (crops[i].harvestTime < 60000) harvestTime += `${format(seconds, 0)}s`;
            else if (crops[i].harvestTime < 3600000) harvestTime += `${format(minutes, 0)}m ${format(seconds, 0)}s`;
            else if (crops[i].harvestTime < 86400000) harvestTime += `${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;
            else if (crops[i].harvestTime >= 86400000) harvestTime += `${format(days, 0)}d ${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;

            document.getElementById("crop" + i + "-name").innerHTML = crops[i].name;
            document.getElementById("crop" + i + "-gold").innerHTML = `+${crops[i].gold}`;
            document.getElementById("crop" + i + "-xp").innerHTML = `+${crops[i].xp}`;
            document.getElementById("crop" + i + "-cost").innerHTML = `${crops[i].cost} gold`
            document.getElementById("crop" + i + "-harvestTime").innerHTML = harvestTime;
        }
    }
    revealCrops();
}

function revealCrops() {
    for (let i = 1; i < data.cropsRevealed.length; i++) {
        if (data.cropsRevealed[i - 1] === true) {
            document.getElementById("crop" + i + "-row").style.display = "table-row";
        } else {
            document.getElementById("crop" + i + "-row").style.display = "none";
        }
    }
}

const unlockNexCropButtonElement = document.getElementById("unlock-crops-button");

function unlockNextCrop() {
    let count = 0;
    for (let i = 0; i < data.cropsRevealed.length; i++) {
        if (data.cropsRevealed[i] === true) {
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
        if (count + 1 === data.cropsRevealed.length - 1) {
            unlockNexCropButtonElement.style.display = "none";
        }
    }
}

function updateUnlockNextCropColor() {
    if (data.level < data.nextCropLevelRequirement) {
        document.getElementById("unlock-crops-button").style.borderColor = '#b33939';
        document.getElementById("unlock-crops-button").style.cursor = "not-allowed";
        document.getElementById("unlock-crops-button").disabled = true;
    } else {
        document.getElementById("unlock-crops-button").style.borderColor = 'Green';
        document.getElementById("unlock-crops-button").style.cursor = "pointer";
        document.getElementById("unlock-crops-button").disabled = false;
    }
}

function updateCropInfo() {
    for (let i = 1; i < data.cropsRevealed.length; i++) {
        let harvestTime = " ";
        let totalSeconds = crops[i].harvestTime;

        let days = totalSeconds / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let seconds = (minutes % 1) * 60;

        if (crops[i].harvestTime < 60000) harvestTime += `${format(seconds, 0)}s`;
        else if (crops[i].harvestTime < 3600000) harvestTime += `${format(minutes, 0)}m ${format(seconds, 0)}s`;
        else if (crops[i].harvestTime < 86400000) harvestTime += `${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;
        else if (crops[i].harvestTime >= 86400000) harvestTime += `${format(days, 0)}d ${format(hours, 0)}h ${format(minutes, 0)}m ${format(seconds, 0)}s`;

        document.getElementById("crop" + i + "-name").innerHTML = crops[i].name;
        document.getElementById("crop" + i + "-gold").innerHTML = `+${crops[i].gold}`;
        document.getElementById("crop" + i + "-xp").innerHTML = `+${crops[i].xp}`;
        document.getElementById("crop" + i + "-cost").innerHTML = `${crops[i].cost} gold`
        document.getElementById("crop" + i + "-harvestTime").innerHTML = harvestTime;
    }
}