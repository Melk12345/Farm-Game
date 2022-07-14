function updateBoostsInfo() {
    goldBoost = upgrade[0].boost * data.upgradeLevel[0] + 1;
    xpBoost = upgrade[1].boost * data.upgradeLevel[1] + 1;
    discountBoost = Math.pow(1 - upgrade[2].boost, data.upgradeLevel[2]);
    harvestTimeBoost = Math.pow(1 - upgrade[3].boost, data.upgradeLevel[3]);
}

function updateUpgradeInfo() {
    for (let i = 1; i < data.upgradeLevel.length; i++) {
        document.getElementById("upgrade" + i + "-name").innerHTML = upgrade[i - 1].name;
        document.getElementById("upgrade" + i + "-level").innerHTML = data.upgradeLevel[i - 1];
        document.getElementById("upgrade" + i + "-boost").innerHTML = upgrade[i - 1].boost;
        document.getElementById("upgrade" + i + "-cost").innerHTML = `${upgrade[i - 1].baseCost * Math.pow(1.15, data.upgradeLevel[i - 1]) * discountBoost} gold`
    }
}

function updateUpgradesButtonColor() {
    for (let i = 1; i < data.upgradeLevel.length; i++) {
        if (data.gold < upgrade[i - 1].baseCost * Math.pow(1.15, data.upgradeLevel[i - 1]) * discountBoost) {
            document.getElementById("upgrade" + i + "-button").style.borderColor = '#b33939';
            document.getElementById("upgrade" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("upgrade" + i + "-button").disabled = true;
        } else {
            document.getElementById("upgrade" + i + "-button").style.borderColor = 'Green';
            document.getElementById("upgrade" + i + "-button").style.cursor = "pointer";
            document.getElementById("upgrade" + i + "-button").disabled = false;
        }
    }
}

function buyUpgrade(upgradeIndex) {
    if (data.gold < upgrade[upgradeIndex - 1].baseCost * discountBoost) return;

    data.gold -= upgrade[upgradeIndex - 1].baseCost * discountBoost;
    data.upgradeLevel[upgradeIndex - 1]++;
    updateBoostsInfo();
    updateUpgradeInfo();
    updateUpgradesButtonColor();
}