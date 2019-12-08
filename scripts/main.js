// ##############################
// Открытие/закрытие списка стран
$.fn.callPopupDropdownToggle = function (hide) {
  var
    parent = this,
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
};

$('.call-popup-dropdown__button').on('click', function (e) {
  var
    parent = $(this).closest('.call-popup-dropdown'),
    isActive = parent.hasClass('is-active');

  e.stopPropagation();

  isActive ? parent.callPopupDropdownToggle(true) : parent.callPopupDropdownToggle();
});

$('html').on('click', function (e) {
  $(document).find('.call-popup-dropdown').callPopupDropdownToggle(true);
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

  parent.callPopupDropdownToggle(true);
  textBlock.text(newCode);
});

// ##############################
// Маска поля ввода
$.fn.callPopupSetMask = function () {
  var
    item = this,
    popup = item.closest('.popup'),
    input = popup.find('.popup__inner_callback-form__inputbox input'),
    mask = this.data('mask');

  input.attr('placeholder', mask.replace(/\9/g, '_'));
  input.inputmask(mask);
};

$(document).find('.call-popup-dropdown__current').callPopupSetMask();

$('.call-popup-dropdown__item').on('click', function (e) {
  $(this).callPopupSetMask();
});
