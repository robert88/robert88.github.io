/**
 * Share.js
 *
 * @author  overtrue <i@overtrue.me>
 * @license MIT
 *
 * @example
 * <pre>
 * $('.share-components').share();
 *
 * // or
 *
 * $('.share-bar').share({
 *     sites: ['qzone', 'qq', 'weibo','wechat'],
 *     // ...
 * });
 * </pre>
 */
;
(function ($) {
    /**
     * Initialize a share bar.
     *
     * @param {Object}        $options globals (optional).
     *
     * @return {Void}
     */
    $.fn.share = function ($options) {
        var $head = $(document.head);

        var $defaults = {
            url: location.href,
            site_url: location.origin,
            source: $head.find('[name=site], [name=Site]').attr('content') || document.title,
            title: $head.find('[name=title], [name=Title]').attr('content') || document.title,
            description: $head.find('[name=description], [name=Description]').attr('content') || '',
            image: $('img:first').prop('src') || '',

            wechatQrcodeTitle: $("html").hasClass("LANG-cn") ? '使用微信扫描二维码' : "Use Wechat scan QR code",
            wechatQrcodeHelper: $("html").hasClass("LANG-cn") ? '使用微信扫描二维码' : "Use Wechat scan QR code",
            // wechatQrcodeTitle: '微信扫一扫：分享',
            // wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',

            mobileSites: [],
            sites: ['favorite', 'weibo', 'qq', 'wechat', 'tencent', 'douban', 'qzone', 'linkedin', 'diandian', 'facebook', 'twitter', 'google'],
            disabled: [],
            initialized: false,
            email: "information@huawei.com"
        };

        var $globals = $.extend({}, $defaults, $options);

        var $templates = {
            favorite: "javascript:void(0);",
            qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',
            qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}',
            tencent: 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
            weibo: 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}',
            wechat: 'javascript:;',
            douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
            diandian: 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',
            linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
            facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
            twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}',
            google: 'https://plus.google.com/share?url={{URL}}',
            email: 'mailto:{{EMAIL}}?subject={{TITLE}}&body={{URL}}' + encodeURIComponent('\n') + '{{DESCRIPTION}}',
            print: 'javascript:window.print();void(0)'
        };

        this.each(function () {
            if ($(this).data('initialized')) {
                return true;
            }

            var $data = $.extend({}, $globals, $(this).data());
            var $container = $(this).addClass('share-component social-share');

            createIcons($container, $data);
            createWechat($container, $data);
            $container.find(".social-share-icon.icon-favorite").off("click").on("click", function () {
                _addFavorite();
            })
            if (isMobileScreen()) {
                $container.find(".social-share-icon.icon-wechat").off("click").on("click", function () {
                    $container.find(".wechat-qrcode").toggle();
                    return false;
                })
            }

            $(this).trigger("initialized").data('initialized', true);
        });

        function _addFavorite() {
            var url = window.location;
            var title = document.title;
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf("360se") > -1) {
                alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
            } else if (window.external && typeof window.external.AddToFavoritesBar == "function") {
                window.external.AddToFavoritesBar(url, title); //IE8
            } else if (window.external && typeof window.external.addFavorite == "function") { //IE类浏览器
                try {
                    window.external.addFavorite(url, title);
                } catch (e) {
                    alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
                }
            } else if (window.sidebar && typeof window.sidebar.addPanel == "function") { //firfox等浏览器；
                window.sidebar.addPanel(title, url, "");
            } else {
                alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
            }
        }

        /**
         * Create site icons
         *
         * @param {Object|String} $container
         * @param {Object}        $data
         */
        function createIcons($container, $data) {
            var $sites = getSites($data);

            $.each($data.mode == 'prepend' ? $sites.reverse() : $sites, function (i, $name) {
                var $url = makeUrl($name, $data);
                var dataName = $name.slice(0, 1).toUpperCase() + $name.slice(1)
                var $target = ' target="_blank"';
                if ($url.indexOf("javascript:") >= 0 || $url.indexOf("mailto:") >= 0) $target = '';
                if ($container.data("show-text")) {
                    dataName = $container.data($name + "-text") || dataName;
                    var $link = $data.initialized ? $container.find('.icon-' + $name) : $('<a rel="nofollow" class="social-share-icon icon-' + $name + '"' + $target + '><i class="iconfont icon-share-' + $name + '"></i><span class="text">' + dataName + '</span></a>');
                } else {
                    var $link = $data.initialized ? $container.find('.icon-' + $name) : $('<a rel="nofollow" class="social-share-icon icon-' + $name + '"' + $target + ' data-name="' + dataName + '"><i class="iconfont icon-share-' + $name + '"></i></a>');
                }


                if (!$link.length) {
                    return true;
                }

                $link.prop('href', $url);

                if (!$data.initialized) {
                    $data.mode == 'prepend' ? $container.prepend($link) : $container.append($link);
                }
            });
        }

        /**
         * Create the wechat icon and QRCode.
         *
         * @param {Object|String} $container
         * @param {Object}        $data
         */
        function createWechat($container, $data) {
            var $wechat = $container.find('a.icon-wechat');

            $wechat.append('<div class="wechat-qrcode"><h4>' + $data.wechatQrcodeTitle + '</h4><div class="qrcode"></div><div class="help">' + $data.wechatQrcodeHelper + '</div></div>');
            $wechat.find('.qrcode').qrcode({
                render: 'image',
                size: 100,
                text: $data.url
            });
        }

        /**
         * Get available site lists.
         *
         * @param {Array} $data
         *
         * @return {Array}
         */
        function getSites($data) {
            if ($data['mobileSites'].length === 0) {
                $data['mobileSites'] = $data['sites'];
            };

            var $sites = (isMobileScreen() ? $data['mobileSites'] : $data['sites']).slice(0);
            var $disabled = $data['disabled'];

            if (typeof $sites == 'string') {
                $sites = $sites.split(/\s*,\s*/);
            }
            if (typeof $disabled == 'string') {
                $disabled = $disabled.split(/\s*,\s*/);
            }

            if (runningInWeChat()) {
                $disabled.push('wechat');
            }

            // Remove elements
            $disabled.length && $.each($disabled, function (i, el) {
                $sites.splice($.inArray(el, $sites), 1);
            });

            return $sites;
        }

        /**
         * Build the url of icon.
         *
         * @param {String} $name
         * @param {Object} $data
         *
         * @return {String}
         */
        function makeUrl($name, $data) {
            var $template = $templates[$name];

            $data['summary'] = $data['description'];

            for (var $key in $data) {
                if ($data.hasOwnProperty($key)) {
                    var $camelCaseKey = $name + $key.replace(/^[a-z]/, function ($str) {
                        return $str.toUpperCase();
                    });

                    var $value = encodeURIComponent($data[$camelCaseKey] || $data[$key]);
                    $template = $template.replace(new RegExp('{{' + $key.toUpperCase() + '}}', 'g'), $value);
                }
            }

            return $template;
        }

        /**
         * Detect wechat browser.
         *
         * @return {Boolean}
         */
        function runningInWeChat() {
            return /MicroMessenger/i.test(navigator.userAgent);
        }

        /**
         * Mobile screen width.
         *
         * @return {boolean}
         */
        function isMobileScreen() {
            return $(window).width() <= 750;
        }
    };

    // Domready after initialization
    $(function () {
        $('.share-component,.social-share').share();
    });
})(jQuery);