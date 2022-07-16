function format(amount) {
    let power = Math.floor(Math.log10(Math.floor(amount)));
    let mantissa = amount/Math.pow(10, power);
    if (power < 6) return amount;
    else return mantissa.toFixed(2) + "e" + power;
}

function formatWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatHarvestTime(totalSeconds) {
    let harvestTime = "";
    const seconds = totalSeconds / 1000 % 60;
    const minutes = (totalSeconds / (1000 * 60)) % 60;
    const hours = (totalSeconds / (1000 * 60 * 60)) % 24;
    const days = totalSeconds / (1000 * 60 * 60 * 24);

    if (totalSeconds < 10000) harvestTime += `${formatWithCommas(seconds.toFixed(1))}s`;
    else if (totalSeconds < 60000) harvestTime += `${Math.floor(seconds)}s`;
    else if (totalSeconds < 3600000) harvestTime += `${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
    else if (totalSeconds < 86400000) harvestTime += `${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
    else if (totalSeconds >= 86400000) harvestTime += `${Math.floor(days)}d ${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;

    return harvestTime;
}

function plotGold(plotIndex) {
    let cropID = data.cropIDInPlot[plotIndex];
    return cropGold(cropID);
}

function plotXP(plotIndex) {
    let cropID = data.cropIDInPlot[plotIndex];
    return cropXP(cropID);
}

function cropGold(cropID) {
    return Math.ceil(crops[cropID].gold * goldBoost);
}

function cropXP(cropID) {
    return Math.ceil(crops[cropID].xp * xpBoost);
}