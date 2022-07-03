function format(amount, numFloatingDigits) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount/Math.pow(10, power);
    if (power < 6) return formatWithCommas(amount, numFloatingDigits);
    else return mantissa.toFixed(2) + "e" + power;
}

function formatWithCommas(amount, numFloatingDigits) {
    return amount.toFixed(numFloatingDigits).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatHarvestTime(totalSeconds) {
    let harvestTime = " ";
    let days = totalSeconds / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let seconds = (minutes % 1) * 60;

    if (totalSeconds < 60000) harvestTime += `${Math.floor(seconds)}s`;
    else if (totalSeconds < 3600000) harvestTime += `${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
    else if (totalSeconds < 86400000) harvestTime += `${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;
    else if (totalSeconds >= 86400000) harvestTime += `${Math.floor(days)}d ${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`;

    return harvestTime;
}