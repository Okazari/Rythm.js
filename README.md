<♫/> Rythm.js - v2.2.3
========

[![Build Status](https://travis-ci.org/Okazari/Rythm.js.svg?branch=master)](https://travis-ci.org/Okazari/Rythm.js)

Demo at : [https://okazari.github.io/Rythm.js/](https://okazari.github.io/Rythm.js/)

A javascript library that makes your page dance.



Getting started
===============

Install with npm

```
npm install rythm.js
```

CDN :
```
https://unpkg.com/rythm.js/
https://cdnjs.cloudflare.com/ajax/libs/rythm.js/2.x.x/rythm.min.js
```
Good old way
------------

Import rythm into your page

```html
<script type="text/javascript" src="/path/to/rythm.min.js"></script>
```

Add one of the rythm css classes to indicate which element will dance.

```html
<div class="rythm-bass"></div>
```

Create a Rythm object and give it your audio url then use the start function.
```javascript
var rythm = new Rythm();
rythm.setMusic("path/to/sample.mp3");
rythm.start();
```

ES6 module
----------

```js
import Rythm from 'rythm.js'
const rythm = new Rythm();
rythm.setMusic("path/to/sample.mp3");
rythm.start();
```

API Documentation
=============

Rythm object
------------

```javascript
var rythm = new Rythm();

/* The starting scale is the minimum scale your elements will take (Scale ratio is startingScale + (pulseRatio * currentPulse));
 * Value in percentage between 0-1
 * Default 0.75
 */
rythm.startingScale = value;

/* The pulse ratio is be the maximum additionnal scale your element will take (Scale ratio is startingScale + (pulseRatio * currentPulse))
 * Value in percentage between 0-1
 * Default 0.30
 */
rythm.pulseRatio = value;

/* The max value history represent the number of passed value that will be stored to evaluate the current pulse.
 * Int value, minimum 1
 * Default 100
 */
rythm.maxValueHistory = value;

/* Set the music the page will dance to.
 * @audioUrl : '../example/mysong.mp3'
 */
rythm.setMusic(audioUrl);

/* Used to collaborate with other players library
 * You can connect Rythm to an audioElement, and then control the audio with your other player
 */
rythm.connectExternalAudioElement(audioElement)

/* Adjust music's gain.
 * @value : Number
 */
rythm.setGain(value);

/* Add your own rythm-class
 * @elementClass: Class that you want to link your rythm to.
 * @danceType : Use any of the build in effect or give your own function;
 * @startValue: The starting frequence of your rythm.
 * @nbValue: The number of frequences of your rythm.
 * 1024 Frequences, your rythm will react to the average of your selected frequences.
 * Examples : bass 0-10 ; medium 150-40 ; high 500-100
 */
rythm.addRythm(elementClass, danceType, startValue, nbValue);

/* Plug your computer microphone to rythm.js
 * This function return a promise resolved when the microphone is up.
 * Require your website to be run in HTTPS
 */
rythm.plugMicrophone().then(function(){...})

//Let's dance
rythm.start();

/* Stop the party
 * @freeze: Set this to true if you want to prevent the element to reset to their initial position
 */
rythm.stop(freeze);

```

Build in classes with "pulse" effect
-------

+ rythm-bass
+ rythm-medium
+ rythm-high

Custom-classes
--------------

You can use the `addRythm` function to make your own classes listen to specifics frequences.
Here is how the basics classes are created :
+ `addRythm('rythm-bass','pulse',0,10);`
+ `addRythm('rythm-medium','pulse',150,40);`
+ `addRythm('rythm-high','pulse',500,100);`

Availables dance types
-------
For more control of theses dance types, you can give a configuration object as last argument to `addRythm`

```
addRythm('rythm-high', 'shake', 500, 100, { direction:'left', min: 20, max: 300});
```
Here are the build in dances and their options
+ pulse
  + min : Minimum value given to `transform: scale()`. Default: `0.75`
  + max : Maximum value given to `transform: scale()`. Default: `1.25`
+ jump
  + min : Minimum value given to `transform: translateY()`. Default: `0`
  + max : Maximum value given to `transform: translateY()`. Default: `30`
+ shake
  + min : Minimum value given to `transform: translateX()`. Default: `-15`
  + max : Maximum value given to `transform: translateX()`. Default: `15`
  + direction : `left` for a right to left move, `right` for a left to right move. Default: `right`
+ twist
  + min : Minimum value given to `transform: rotate()`. Default: `-20`
  + max : Maximum value given to `transform: rotate()`. Default: `20`
  + direction : `left` for a right to left move, `right` for a left to right move. Default: `right`
+ vanish
  + min : Minimum value (between 0 and 1) given to `opacity`. Default: `0`
  + max : Maximum value (between 0 and 1) given to `opacity`. Default: `1`
  + reverse : Boolean to reverse the effect. Default `false` (Higher the pulse is, the more visible it will be)
+ borderColor
  + from : Array of integer between 0 and 255 corresponding to a RGB color. Default: `[0,0,0]`
  + to : Array of integer between 0 and 255 corresponding to a RGB color. Default: `[255,255,255]`
+ color
  + from : Array of integer between 0 and 255 corresponding to a RGB color. Default: `[0,0,0]`
  + to : Array of integer between 0 and 255 corresponding to a RGB color. Default: `[255,255,255]`
+ radius
  + min : Minimum value given to `border-radius`. Default: `0`
  + max : Maximum value given to `border-radius`. Default: `25`
  + reverse : Boolean to make effect from max to min. Default: `false
+ blur
  + min : Minimum value given to `filter: blur()`. Default: `0`
  + max : Maximum value given to `filter: blur()`. Default: `8`
  + reverse : Boolean to make effect from max to min. Default: `false`
+ swing
  + curve : Whether the element should curve `up` or `down`. Default: `down`
  + direction : Whether the element should swing `right` or `left`. Default: `right`
  + radius : How far the element will swing. Default: `20`
+ kern
  + min : Minimum value given to `letter-spacing`. Default: `0`
  + max : Maximum value given to `letter-spacing`. Default: `25`
  + reverse : Boolean to make effect from max to min. Default: `false
+ Neon
  + from : Array of integer between 0 and 255 corresponding to a RGB color. Default: `[0,0,0]`
  + to : Array of integer between 0 and 255 corresponding to a RGB color. Default: `[255,255,255]`
+ borderWidth
  + min : Minimum value given to `border-width`. Default: `0`
  + max : Maximum value given to `borderr-width`. Default: `5`

To see each visual effect, you can go to the [Demo](https://okazari.github.io/Rythm.js/)

Custom dance type
-------
If you want to use your own dance type, you need to give an object as the 2nd argument of `addRythm` instead of a built in dance key.

This object must have two properties :
 - dance: The custom function to make elements dance
 - reset: The associated custom function that will be called to reset element style.

```js
/* The custom function signature is :
 * @elem: The HTML element target you want to apply your effect to
 * @value: The current pulse ratio (percentage between 0 and 1)
 * @options: The option object user can give as last argument of addRythm function
 */
const pulse = (elem, value, options = {}) => {
  const max = options.max || 1.25
  const min = options.min || 0.75
  const scale = (max - min) * value
  elem.style.transform = `scale(${min + scale})`
}

/* The reset function signature is :
 * @elem: The element to reset
 */
const resetPulse = elem => {
  elem.style.transform = ''
}

addRythm('my-css-class', { dance: pulse, reset: resetPulse }, 150, 40)

```


Features
========

 + Your HTML can dance by using any of the available dance types
 + You can use custom functions to build you own dance type (and if it looks awesome ! Feel free to make a PR ;) )


Contribute
==========

Any pull request will be apreciated. You can start coding on this project following this steps :
 + Fork the project
 + Clone your repository
 + run ```npm install```
 + run ```npm start``` in the main folder to launch a development webserver.
 + Enjoy the rythm.

Adding new dance type
---------

In v2.2.x adding a new dance type is pretty easy
+ Create a new file in `src\dances`
+ This file must export your custom dance type function
+ This file must export a reset function

For example, here is the content of `jump.js file`

```js
/* The function signature is :
 * @elem: The HTML element target you want to apply your effect to
 * @value: The current pulse ratio (percentage between 0 and 1)
 * @options: The option object user can give as last argument of addRythm function
 */
export default (elem, value, options = {}) => {
  const max = options.max || 30
  const min = options.min || 0
  const jump = (max - min) * value
  elem.style.transform = `translateY(${-jump}px)`
}

/* The reset function signature is :
 * @elem: The element to reset
 */
export const reset = elem => {
  elem.style.transform = ''
}
```
+ Import it and register it into the constructor of `Dancer.js` file
```js
import jump, { reset as resetJump } from './dances/jump.js'
class Dancer {
  constructor() {
    this.registerDance('jump', jump, resetJump)
  }
}
```

+ Commit it and create a PR. Then look at everyone enjoying your contribution :) !

Licence : GNU GPL

Author: [@OkazariBzh](https://twitter.com/OkazariBzh)
