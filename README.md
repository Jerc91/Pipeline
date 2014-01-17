[Pipeline][Pipeline]
========

Control to show process tracking

Getting Started
---------------
The tools has a dependency on [jQuery 1.9+][jQuery.js], which must be loaded before *[js-utils][jherax.js]*.<br>
Also require some [CSS][jherax.css] for tooltip elements and other stuff.<br>
Some functions depend on [jQuery.UI][jQuery.ui]<br><br>
The namespace is `js.utils`, so we must use it to access the methods exposed.<br>
A property called `wrapper` was exposed in `js` namespace to specify where the [tooltip](#fnshowtooltip-dom-message) and [loading](#fnloading-options) elements will be appended. By default `js.wrapper = "body"`<br>
