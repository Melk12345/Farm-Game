function updateBoostsInfo() {
    goldBoost = farmUpgrades[0].boost * data.farmUpgradesLevel[0] + 1;
    xpBoost = farmUpgrades[1].boost * data.farmUpgradesLevel[1] + 1;
    discountBoost = Math.pow(1 - farmUpgrades[2].boost, data.farmUpgradesLevel[2]);
    harvestTimeBoost = Math.pow(1 - farmUpgrades[3].boost, data.farmUpgradesLevel[3]);
}

function updateFarmUpgradeInfo() {
    for (let i = 1; i < data.farmUpgradesLevel.length; i++) {
        document.getElementById("farmUpgrade" + i + "-name").innerHTML = farmUpgrades[i - 1].name;
        document.getElementById("farmUpgrade" + i + "-level").innerHTML = data.farmUpgradesLevel[i - 1];
        document.getElementById("farmUpgrade" + i + "-boost").innerHTML = farmUpgrades[i - 1].boost;
        document.getElementById("farmUpgrade" + i + "-cost").innerHTML = `${farmUpgrades[i - 1].cost * Math.pow(1.15, data.farmUpgradesLevel[i - 1]) * discountBoost} gold`
    }
}

function updateFarmUpgradesButtonColor() {
    for (let i = 1; i < data.farmUpgradesLevel.length; i++) {
        if (data.gold < farmUpgrades[i - 1].cost * Math.pow(1.15, data.farmUpgradesLevel[i - 1]) * discountBoost) {
            document.getElementById("buyFarmUpgrade" + i + "-button").style.borderColor = '#b33939';
            document.getElementById("buyFarmUpgrade" + i + "-button").style.cursor = "not-allowed";
            document.getElementById("buyFarmUpgrade" + i + "-button").disabled = true;
        } else {
            document.getElementById("buyFarmUpgrade" + i + "-button").style.borderColor = 'Green';
            document.getElementById("buyFarmUpgrade" + i + "-button").style.cursor = "pointer";
            document.getElementById("buyFarmUpgrade" + i + "-button").disabled = false;
        }
    }
}

function buyFarmUpgrade(upgradeIndex) {
    if (data.gold < farmUpgrades[upgradeIndex - 1].cost * discountBoost) return;

    data.gold -= farmUpgrades[upgradeIndex - 1].cost * discountBoost;
    data.farmUpgradesLevel[upgradeIndex - 1]++;
    updateBoostsInfo();
    updateFarmUpgradeInfo();
    updateFarmUpgradesButtonColor();
}