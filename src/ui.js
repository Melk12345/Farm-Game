const farmMenuContainerElement = document.getElementById("farm-container");
const cropsMenuContainerElement = document.getElementById("crops-container");
const settingsMenuContainerElement = document.getElementById("settings-container");

let activeMenu = farmMenuContainerElement;
cropsMenuContainerElement.style.display = "none";
settingsMenuContainerElement.style.display = "none";

const farmMenuButtonElement = document.getElementById("farm-menu-button");
const cropsMenuButtonElement = document.getElementById("crops-menu-button");
const settingsMenuButtonElement = document.getElementById("settings-menu-button");

let activeMenuButton = farmMenuButtonElement;
farmMenuButtonElement.style.borderColor = 'Orange';
cropsMenuButtonElement.style.borderColor = 'Black';
settingsMenuButtonElement.style.borderColor = 'Black'; 

function openMenu(clickedMenu, clickedMenuButton) {
    activeMenu.style.display = "none";
    activeMenuButton.style.borderColor = 'Black';
    activeMenu = clickedMenu;
    activeMenuButton = clickedMenuButton;
    activeMenuButton.style.borderColor = 'Orange';
    activeMenu.style.display = "block";
    console.log(activeMenu);
}