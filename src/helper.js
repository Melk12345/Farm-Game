function format(amount, numFloatingDigits) {
    let power = Math.log10(Math.floor(amount));
    let mantissa = amount/Math.pow(10, power);
    if (power < 6) return formatWithCommas(amount, numFloatingDigits);
    else return mantissa.toFixed(2) + "e" + power;
}

function formatWithCommas(amount, numFloatingDigits) {
    return amount.toFixed(numFloatingDigits).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatHarvestTime(totalSeconds) {
    let harvestTime = "";
    const seconds = Math.floor(totalSeconds / 1000) % 60;
    const minutes = Math.floor((totalSeconds / (1000 * 60)) % 60);
    const hours = Math.floor((totalSeconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalSeconds / (1000 * 60 * 60 * 24));

    if (totalSeconds < 60000) harvestTime += `${seconds}s`;
    else if (totalSeconds < 3600000) harvestTime += `${minutes}m ${seconds}s`;
    else if (totalSeconds < 86400000) harvestTime += `${hours}h ${minutes}m ${seconds}s`;
    else if (totalSeconds >= 86400000) harvestTime += `${days}d ${hours}h ${minutes}m ${seconds}s`;

    return harvestTime;
}