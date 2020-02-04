
    //使用jquery能获取隐藏元素的宽高，获取方法$(元素).actual('width')
    ; (function ($) {
        $.fn.addBack = $.fn.addBack || $.fn.andSelf;

        $.fn.extend({

            actual: function (method, options) {
                // check if the jQuery method exist
                if (!this[method]) {
                    throw '$.actual => The jQuery method "' + method + '" you called does not exist';
                }
                var defaults = {
                    absolute: false,
                    clone: false,
                    includeMargin: false
                };

                var configs = $.extend(defaults, options);
                var $target = this.eq(0);
                var fix, restore;
                if (configs.clone === true) {
                    fix = function () {
                        var style = 'position: absolute !important; top: -1000 !important; ';

                        // this is useful with css3pie
                        $target = $target.
                        clone().
                        attr('style', style).
                        appendTo('body');
                    };

                    restore = function () {
                        // remove DOM element after getting the width
                        $target.remove();
                    };
                } else {
                    var tmp = [];
                    var style = '';
                    var $hidden;

                    fix = function () {
                        // get all hidden parents
                        $hidden = $target.parents().addBack().filter(':hidden');
                        style += 'visibility: hidden !important; display: block !important; ';

                        if (configs.absolute === true) style += 'position: absolute !important; ';

                        // save the origin style props
                        // set the hidden el css to be got the actual value later
                        $hidden.each(function () {
                            var $this = $(this);

                            // Save original style. If no style was set, attr() returns undefined
                            tmp.push($this.attr('style'));
                            $this.attr('style', style);
                        });
                    };

                    restore = function () {
                        // restore origin style values
                        $hidden.each(function (i) {
                            var $this = $(this);
                            var _tmp = tmp[i];

                            if (_tmp === undefined) {
                                $this.removeAttr('style');
                            } else {
                                $this.attr('style', _tmp);
                            }
                        });
                    };
                }

                fix();
                // get the actual value with user specific methed
                // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
                // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
                var actual = /(outer)/.test(method) ?
                    $target[method](configs.includeMargin) :
                    $target[method]();

                restore();
                // IMPORTANT, this plugin only return the value of the first element
                return actual;
            }
        });
    })(jQuery);

    function Base(){}

    //计算等高,参数(外框,规律子元素,需要计算等高的元素,该宽度以下不计算等高)
    Base.prototype.contourFun = function (box, element, obj, resolution) {
        var box_set = $(box),
            win_w = $(window).width();
        if (box_set.length > 0) {
            if (resolution == undefined || win_w > resolution) {
                $.each(box_set, function (i, box_o) {
                    box_o = $(box_o);
                    var element_o = box_o.find(element),
                        obj_o = element_o.find(obj),
                        box_w = box_o.actual('width'),
                        element_w = element_o.actual('width'),
                        oneRowNum = Math.floor(box_w / element_w),
                        rowNum = Math.ceil(element_o.length / oneRowNum),
                        arr = [],
                        max_height;
                    for (var y = 0; y < rowNum; y++) {
                        arr = [];
                        for (var x = oneRowNum * y; x < oneRowNum * (y + 1) ; x++) {
                            arr.push(obj_o.eq(x).actual('height'));
                        }
                        max_height = Math.max.apply(null, arr);
                        for (var x = oneRowNum * y; x < oneRowNum * (y + 1) ; x++) {
                            obj_o.eq(x).height(max_height)
                        }
                    }
                });
            } else {
                box_set.find(element).find(obj).height("auto");
            }
        }
    }
    Base.prototype.v3SetHeight = function (obj, obj2, obj3) {

        var This = $(obj);
        var args = arguments;
        This.each(function () {
          var _this = $(this),
            oList = _this.find(obj2),
            oList_len = oList.length,
            oBox_w = _this.width() + 10,
            oList_w = oList.width(),
            oColumn_len = Math.floor(oBox_w / oList_w),
            oRow_len = Math.ceil(oList_len / oColumn_len),
            oList_H = 0,
            oList_obj = null;
          if (args.length == 2) {
            oList.height('auto');
          } else {
            oList.find(obj3).height('auto');
          }
          for (var i = 0; i < oRow_len; i++) {
            for (var j = i * oColumn_len; j < oColumn_len * (i + 1); j++) {
              oList.eq(j).addClass('oList_obj');
              if (args.length == 2) {
                var H = oList.eq(j).height();
              } else {
                var H = oList.eq(j).find(obj3).height();
              }
              H > oList_H ? oList_H = H : oList_H;
              oList_obj = $('.oList_obj');
            }
            if (args.length == 2) {
              oList_obj.height(oList_H);
            } else {
              oList_obj.find(obj3).height(oList_H);
            }
            oList_obj.removeClass('oList_obj');
            oList_H = 0;
          }
        });
      }
      
    var baseLib = new Base();
//E-= 获取高度一致，并且可以获取隐藏元素