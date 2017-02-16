Rythm.js
========

[![Build Status](https://travis-ci.org/Okazari/Rythm.js.svg?branch=master)](https://travis-ci.org/Okazari/Rythm.js)
[![Code Climate](https://codeclimate.com/github/Okazari/Rythm.js/badges/gpa.svg)](https://codeclimate.com/github/Okazari/Rythm.js/code)

Demo at : https://okazari.github.io/Rythm.js/

A javascript library that makes your page dance.

Currently in development

Getting started
===============

Install with npm

```
npm install rythm.js
```

Import rythm into your page

```html
<script type="text/javascript" src="../rythm.js"></script>
```

Add one of the rythm css classes to indicate which element will dance.

```html
<div class="rythm-bass"></div>
```

Create a Rythm object and give it your audio url then use the start function.
```javascript
var rythm = new Rythm();
rythm.setMusic("../examples/sample.mp3");
rythm.start();
```

Documentation
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

/* Adjust music's gain.
 * @value : Number
 */
rythm.setGain(value);

/* Add your own rythm-class
 * @elementClass: Class that you want to link your rythm to.
 * @danceType : Atm just use "size";
 * @startValue: The starting frequence of your rythm.
 * @nbValue: The number of frequences of your rythm.
 * 1024 Frequences, your rythm will react to the average of your selected frequences.
 * Exemples : bass 0-10 ; medium 150-40 ; high 500-100
 */
rythm.addRythm(elementClass, danceType, startValue, nbValue);

/* Plug your computer microphone to rythm.js
 * This function return a promise resolved when the microphone is up.
 * Require your website to be run in HTTPS
 */
rythm.plugMicrophone().then(function(){...})

//Let's dance
rythm.start();

//Stop the party
rythm.stop();
```

Classes
-------

+ rythm-bass
+ rythm-medium
+ rythm-high

Custom-classes
--------------

You can use the `addRythm` function to make your own classes listen to specifics frequences.
Here is how the basics classes are created :
+ `addRythm('rythm-bass','size',0,10);`
+ `addRythm('rythm-medium','size',150,40);`
+ `addRythm('rythm-high','size',500,100);`

Features
========

 + You actually can add classes to make your HTML Elements pulse following the rythm of your music.

Future
------
 + Add more rythm class frequences
 + Add rythm move class (pulse, rotate etc...)

Contribute
==========

Any pull request will be apreciated. You can start coding on this project following this steps :
 + Fork the project
 + Clone your repository
 + run ```npm install```
 + run ```gulp``` in the main folder to launch a development webserver.
 + Enjoy the rythm.
