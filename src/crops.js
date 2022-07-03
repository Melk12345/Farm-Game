function selectCrop(cropIndex) {
    data.selectedCrop = cropIndex;
    updateHeaderCropSelectedInfo();
    updateSelectedCropColor();
}

function updateSelectedCropColor() {
    for (let i = 0; i < crops.length; i++) {
        document.getElementById("crop" + (i + 1) + "-button").style.borderColor = 'Black';
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

function updateCropInfo() {
    for (let i = 1; i < crops.length; i++) {
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