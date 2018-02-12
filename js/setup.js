'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var arrRandomElem = function (arrName) {
  return arrName[randomNumber(0, arrName.length - 1)];
};
var fullName = function () {
  return arrRandomElem(WIZARD_NAMES) + ' ' + arrRandomElem(WIZARD_SURNAMES);
};

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var wizards = [
  {
    name: fullName(),
    coatColor: arrRandomElem(COATS_COLOR),
    eyesColor: arrRandomElem(EYES_COLOR)
  },
  {
    name: fullName(),
    coatColor: arrRandomElem(COATS_COLOR),
    eyesColor: arrRandomElem(EYES_COLOR)
  },
  {
    name: fullName(),
    coatColor: arrRandomElem(COATS_COLOR),
    eyesColor: arrRandomElem(EYES_COLOR)
  },
  {
    name: fullName(),
    coatColor: arrRandomElem(COATS_COLOR),
    eyesColor: arrRandomElem(EYES_COLOR)
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupWizard = userDialog.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var wizardForm = userDialog.querySelector('.setup-wizard-form');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && wizardForm.elements.username !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// смена цвета мантии и глаз
var changeColor = function (evt, arrName, inputName) {
  var randomColor = arrRandomElem(arrName);
  evt.target.setAttribute('style', 'fill: ' + randomColor);
  wizardForm.elements[inputName].value = randomColor;
};

wizardCoat.addEventListener('click', function (evt) {
  changeColor(evt, COATS_COLOR, 'coat-color');
});

wizardEyes.addEventListener('click', function (evt) {
  changeColor(evt, EYES_COLOR, 'eyes-color');
});

// смена цвета фаербола
wizardFireball.addEventListener('click', function (evt) {
  var randomColor = arrRandomElem(FIREBALLS_COLOR);
  evt.currentTarget.setAttribute('style', 'background: ' + randomColor);
  wizardForm.elements['fireball-color'].value = randomColor;
});
