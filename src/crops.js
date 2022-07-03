const crop1ButtonElement = document.getElementById("crop1-button");
const crop2ButtonElement = document.getElementById("crop2-button");

let activeCrop = crop1ButtonElement;
crop1ButtonElement.style.borderColor = 'Orange';
crop2ButtonElement.style.borderColor = 'Black';

function selectCropAndUpdateColor(cropButtonElement, cropIndex) {
    data.selectedCrop = cropIndex;
    updateCropSelectedInfo();
    activeCrop.style.borderColor = 'Black';
    activeCrop = cropButtonElement;
    activeCrop.style.borderColor = 'Orange';
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