// Обратный звонок JS
// ##############################
// Открытие/закрытие списка стран
function callPopupDropdownToggle(el, hide) {
  var
    parent = el,
    button = parent.find('.call-popup-dropdown__button'),
    list = parent.find('.call-popup-dropdown__list');

  if (hide) {
    list.removeClass('is-active');
    button.removeClass('is-active');

    setTimeout(function () {
      list.hide();
    }, 200);
  } else {
    button.addClass('is-active');

    list.show(0, function () {
      list.addClass('is-active');
    });
  }
}

$('.call-popup-dropdown__button').on('click', function (e) {
  var
    parent = $(this).closest('.call-popup-dropdown'),
    isActive = parent.hasClass('is-active');

  e.stopPropagation();

  isActive ? callPopupDropdownToggle(parent, true) : callPopupDropdownToggle(parent);
});

$('html').on('click', function (e) {
  callPopupDropdownToggle($(document).find('.call-popup-dropdown'), true);
});

// Выбор кода региона
$('.call-popup-dropdown__item-wrapper').on('click', function (e) {
  var
    item = $(this).find('.call-popup-dropdown__item'),
    parent = $(this).closest('.call-popup-dropdown'),
    current = parent.find('.call-popup-dropdown__current'),
    textBlock = parent.siblings('.popup__inner_callback-form__country-code'),
    input = parent.find('input'),
    newImg = item.attr('src'),
    newCode = item.data('code'),
    newMask = item.data('mask'),
    oldImg = current.attr('src'),
    oldCode = current.data('code'),
    oldMask = current.data('mask');

  item.attr('src', oldImg).data('code', oldCode).data('mask', oldMask);
  current.attr('src', newImg).data('code', newCode).data('mask', newMask);
  input.val(newCode);

  callPopupDropdownToggle(parent, true);
  textBlock.text(newCode);
});

// ##############################
// Маска поля ввода
function callPopupSetMask(el) {
  var
    item = el,
    popup = item.closest('.popup'),
    input = popup.find('.popup__inner_callback-form__inputbox input'),
    mask = item.data('mask');

  input.attr('placeholder', mask.replace(/\9/g, '_'));
  input.inputmask(mask);
}

callPopupSetMask($(document).find('.call-popup-dropdown__current'));

$('.call-popup-dropdown__item').on('click', function (e) {
  callPopupSetMask($(this));
});
