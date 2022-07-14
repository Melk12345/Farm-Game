const saveName = 'FarmGame';

function saveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
    alert("Game saved!");
}

function loadSavedData() {
    let savedGame = JSON.parse(localStorage.getItem(saveName));
    if (savedGame !== null) data = savedGame;
}

function resetData() {
    if (!confirm("Are you sure you want to reset your data? ALL of your progress will be lost and you will need to start over!")) return;

    data.gold = 0;
    data.xp = 0;
    data.xpReq = baseXPReq;
    data.level = 1;
    data.selectedCrop = 1;
    data.nextPlotLevelRequirement = basePlotLevelRequirement;
    data.nextCropLevelRequirement = baseCropLevelRequirement;
    data.plotsRevealed = [true, false, false, false, false, false, false, false, false];
    data.cropsRevealed = [true, false, false, false, false, false, false, false, false];
    cropIDInPlot = [0, 0, 0, 0, 0, 0, 0, 0],
    data.plotHarvestTime = [-10, -10, -10, -10, -10, -10, -10, -10];
    data.harvestable = [false, false, false, false, false, false, false, false];
    data.upgradeLevel = [0, 0, 0, 0];

    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
    load();
}

function importData() {
    let importedData = prompt("Paste your save data here");
    if (importedData.length <= 0 || importedData === undefined) {
        alert('Error!');
        return;
    }
    data = JSON.parse((atob(importedData)));
    window.localStorage.setItem(saveName, JSON.stringify(data));

    load();
}

function exportData() {
    window.localStorage.setItem(saveName, JSON.stringify(data));
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
    alert("Exported Data Copied to Clipboard! Copy and Paste your Save Data String to a safe place so if you lose your data you can get back to where you were!");
}

const toggleAFKGainsButtonElement = document.getElementById("toggle-afk-gains-button");

function updateAFKGainsButtonInfo() {
    if (data.AFKGains) toggleAFKGainsButtonElement.innerHTML = "AFK Gains: ON";
    else toggleAFKGainsButtonElement.innerHTML = "AFK Gains: OFF";
}

function toggleAFKGains() {
    if (data.AFKGains) {
        data.AFKGains = false;
        updateAFKGainsButtonInfo();
    } else {
        data.AFKGains = true;
        updateAFKGainsButtonInfo();
    }
}