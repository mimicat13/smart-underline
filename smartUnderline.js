/**
 * @author Pavel Chigarin <chigarin@gmail.com>
 * @version 1.0
 *
 * @example
 * $('.tabs').smartUnderline({
 *       active: 1,
 *       hideOn: '768px',
 *       marginLeft: '12px',
 *       callback: function(item) {
 *         console.log(
 *             'callback(' + $(item).data('id') + ')'
 *         );
 *       },
 *     });
 *
 * $('.tabs').smartUnderline('destroy');
 *
 * @todo:
 *      toooltip data - build at init not at first hover
 */

(function($) {
  var options = new Array();
  var defaultOptions = {
    callback: null,
    active: 0,
  };

  var private = {
    items: new Array(),

    randomString: function(length_) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
      if (typeof length_ !== 'number') {
        length_ = Math.floor(Math.random() * chars.length_);
      }
      var str = '';
      for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    },

    getUid: function(self) {
      return self.data('uid');
    },

    getOptions: function(dom) {
      var currOptions = {};
      var uid = private.getUid(dom);

      for (var o in options[uid]) {
        currOptions[o] = options[uid][o];
      }

      return currOptions;
    },

    build: function(param) {
      return this.each(function() {
        methods.params(param);
        var uid = private.getUid($(this));

        private.items[uid] = new Object();
        private.items[uid].elements = $(this).children('li');
        private.items[uid].coords = new Array();
        private.items[uid].underline = null;

        $(this).css('position', 'relative');
        private.items[uid].elements.css('display', 'inline-block');

        $(window).off('resize', private.onResize);
        $(window).on('resize', private.onResize);

        private.items[uid].elements.each(function(i, dom) {
          $(dom).data('id', i);

          var $inner = $(dom).children('a');
          if (!$inner.length) {
            $inner = $(dom).children('span');
            if (!$inner.length) {
              $(dom).wrapInner( "<span></span>" );
              $inner = $(dom).children('span');
            }
          }

          private.items[uid].coords[i] = new Object();
          private.items[uid].coords[i].width = Math.min($inner.innerWidth(), $inner.outerWidth());
          private.items[uid].coords[i].left = $inner.parent().position().left;

          $(dom).off('click');
          $(dom).on('click', function(e) {
            private.shiftUnderline($(this), $(this).parent());
          });
        });

        var cssObject = {
          position: 'absolute',
          backgroundColor: '#f15941',
          borderRadius: '4px',
          height: '5px',
          left: '0',
          bottom: '0',
          width: '20px',
          opacity: '0',
          zIndex: '1',
          marginLeft: '0',
          '-moz-transition': 'left 0.5s,width 0.3s ease-out 0s,opacity 0.2s',
          '-webkit-transition': 'left 0.5s,width 0.3s ease-out 0s,opacity 0.2s',
          'transition': 'left 0.5s,width 0.3s ease-out 0s,opacity 0.2s',
        };

        for (var o in cssObject) {
          if (param[o]) {
            cssObject[o] = param[o];
          }
        }

        if (private.underline) {
          private.underline.remove();
        }

        private.items[uid].underline = $('<div/>', {
          class: 'dynamic-underline',
          css: cssObject,
        }).appendTo($(this));

        var currentOptions = private.getOptions($(this));

        private.items[uid].underline.css('opacity', 1).
            css('left', private.items[uid].coords[currentOptions.active].left).
            css('width', private.items[uid].coords[currentOptions.active].width);
        private.onResize();
      });
    },

    shiftUnderline: function(dom, domParent) {
      var id = dom.data('id');
      var uid = private.getUid(domParent);
      var currentOptions = private.getOptions(domParent);

      if (currentOptions.callback) {
        currentOptions.callback(dom);
      }

      private.items[uid].underline.css('opacity', 1).css('left', private.items[uid].coords[id].left).css('width', private.items[uid].coords[id].width);
    },

    onResize: function() {
      //TODO: on resize
      console.log('onResize', $(this));
    },
  };

  var methods = {
    params: function(param) {
      $(this).each(function(i, dom) {
        if (param) {
          var uid = private.getUid($(dom));
          options[uid] = $.extend({}, defaultOptions, param);
        }
      });
    },

    destroy: function(param) {
      return this.each(function() {
        var uid = private.getUid($(this));

        $(window).off('resize', private.onResize);

        private.items[uid].elements.each(function(i, dom) {
          $(dom).off('click');
          private.items[uid].underline.remove();
        });
      });
    },
  };

  $.fn.smartUnderline = function(param) {
    this.each(function(i, dom) {
      if (!$(dom).data('uid')) {
        var uid = private.randomString(10);
        $(dom).data('uid', uid);
        options[uid] = new Array();
        options[uid] = $.extend({}, defaultOptions, param);
      }
    });

    if (methods[param]) {
      return methods[param].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof param === 'object' || !param) {
      return private.build.apply(this, arguments);
    } else {
      console.log('dynamicUnderline: method: "' + param + '" not found!');
    }
  };
})(jQuery);