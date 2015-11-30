window.Godmin = window.Godmin || {};

Godmin.SelectBoxes = (function() {
  function initialize() {
    initializeEvents();
    initializeState();
  }

  function initializeEvents() {
      initializeSelectBox($('[data-behavior~=select-box][data-remote="true"]'), {
          valueField: 'name',
          labelField: 'name',
          searchField: 'name',

          load: function(query, cb) {
              if (!query.length) {
                  return cb();
              }
              $.ajax({
                  url: hardCodedURL + '/' + encodeURIComponent(query),
                  type: 'GET',
                  error: function() {
                      cb();
                  },
                  success: function(res) {
                      cb(res);
                  }
              });
          }
      });
  }

  function initializeState() {
    initializeSelectBox($('[data-behavior~=select-box][data-remote="null"]'));
  }

  function initializeSelectBox($el, options) {
    var defaults = {
      inputClass: 'selectize-input',
      render: {
        option_create: function(data, escape) {
          return '<div class="create">' + (this.$input.data("add-label") || "+") + ' <strong>' + escape(data.input) + '</strong>&hellip;</div>';
        }
      }
    };

    $el.selectize($.extend(defaults, options));
  }

  return {
    initialize: initialize,
    initializeSelectBox: initializeSelectBox
  };
})();

$(function() {
  Godmin.SelectBoxes.initialize();
});
