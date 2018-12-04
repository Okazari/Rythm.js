<♫/> Rythm.js - v2.2.4
======================

[![Build Status](https://travis-ci.org/Okazari/Rythm.js.svg?branch=master)](https://travis-ci.org/Okazari/Rythm.js)

데모 : [https://okazari.github.io/Rythm.js/](https://okazari.github.io/Rythm.js/)

당신의 페이지를 춤추게 하는 자바스크립트 라이브러리

시작하기
===============

npm 으로 설치:

```sh
npm install rythm.js
```

또는 CDN에서 가져오기:

```
https://unpkg.com/rythm.js/
https://cdnjs.cloudflare.com/ajax/libs/rythm.js/2.x.x/rythm.min.js
```

사용방법
------------

rythm을 페이지에 import합니다:

```html
<script type="text/javascript" src="/path/to/rythm.min.js"></script>
```

rythm css 중 하나를 추가하여 어떤 요소가 춤출지 표시합니다:

```html
<div class="rythm-bass"></div>
```

rythm 객체를 만들고 오디오 URL을 지정한 다음 시작 기능을 사용하세요:

```js
var rythm = new Rythm()
rythm.setMusic('path/to/sample.mp3')
rythm.start()
```

ES6 module
----------

```js
import Rythm from 'rythm.js'
const rythm = new Rythm()
rythm.setMusic('path/to/sample.mp3')
rythm.start()
```


API documentation
=================

Rythm object
------------

```js
const rythm = new Rythm()

/* The starting scale is the minimum scale your element will take (Scale ratio is startingScale + (pulseRatio * currentPulse)).
 * Value in percentage between 0 and 1
 * Default: 0.75
 */
rythm.startingScale = value

/* The pulse ratio is be the maximum additional scale your element will take (Scale ratio is startingScale + (pulseRatio * currentPulse)).
 * Value in percentage between 0 and 1
 * Default: 0.30
 */
rythm.pulseRatio = value

/* The max value history represent the number of passed value that will be stored to evaluate the current pulse.
 * Int value, minimum 1
 * Default: 100
 */
rythm.maxValueHistory = value

/* Set the music the page will dance to
 * @audioUrl: '../example/mysong.mp3'
 */
rythm.setMusic(audioUrl)

/* Used to collaborate with other players library.
 * You can connect Rythm to an audioElement, and then control the audio with your other player
 */
rythm.connectExternalAudioElement(audioElement)

/* Adjust audio gain
 * @value: Number
 */
rythm.setGain(value)

/* Add your own rythm-class
 * @elementClass: Class that you want to link your rythm to
 * @danceType: Use any of the build in effect or give your own function
 * @startValue: The starting frequency of your rythm
 * @nbValue: The number of frequency of your rythm
 * 1024 Frequencies, your rythm will react to the average of your selected frequencies.
 * Examples: bass 0-10 ; medium 150-40 ; high 500-100
 */
rythm.addRythm(elementClass, danceType, startValue, nbValue)

/* Plug your computer microphone to rythm.js.
 * This function returns a Promise object that is resolved when the microphone is up.
 * Require your website to be run in HTTPS
 */
rythm.plugMicrophone().then(function(){...})

// Let's dance
rythm.start()

/* Stop the party
 * @freeze: Set this to true if you want to prevent the elements to reset to their initial position
 */
rythm.stop(freeze)
```

"pulse" 효과를 사용하여 클래스 빌드
------------------------------------

+ rythm-bass
+ rythm-medium
+ rythm-high

사용자 정의
--------------

당신은 `addRythm` 함수를 사용하여 특정 frequencies에 반응하는 클래스를 만들 수 있습니다. 
만드는 방법:
+ `addRythm('rythm-bass', 'pulse', 0, 10)`
+ `addRythm('rythm-medium', 'pulse', 150, 40)`
+ `addRythm('rythm-high', 'pulse', 500, 100)`

사용 가능한 댄스 타입
---------------------

이러한 댄스 타입에 대해 더 많은 제어를 하고 싶은 경우, 객체를`addRythm`의 마지막 인자로 추가하세요:

```js
addRythm('rythm-high', 'shake', 500, 100, { direction:'left', min: 20, max: 300 })
```

다음은 춤과 옵션들 입니다:
+ pulse
  + min: 다음에 주어지는 최소 값 `transform: scale()`. Default: `0.75`
  + max: 다음에 주어지는 최대 값`transform: scale()`. Default: `1.25`
+ jump
  + min: 다음에 주어지는 최소 값`transform: translateY()`. Default: `0`
  + max: 다음에 주어지는 최대 값 `transform: translateY()`. Default: `30`
+ shake
  + min: 다음에 주어지는 최소 값 `transform: translateX()`. Default: `-15`
  + max: 다음에 주어지는 최대 값`transform: translateX()`. Default: `15`
  + direction: `left` 오른쪽에서 왼쪽으로 이동, `right` 왼쪽에서 오른쪽으로 이동. Default: `right`
+ twist
  + min: 다음에 주어지는 최소 값 `transform: rotate()`. Default: `-20`
  + max: 다음에 주어지는 최대 값 `transform: rotate()`. Default: `20`
  + direction: `left` 오른쪽에서 왼쪽으로 이동, `right` 왼쪽에서 오른쪽으로 이동. Default: `right`
+ vanish
  + min: 다음에 주어지는 최소 값 (0과 1 사이)`opacity`. Default: `0`
  + max: 다음에 주어지는 최대 값 (0과 1 사이)`opacity`. Default: `1`
  + reverse: 효과를 반대로 하기 위한 Boolean  Default: `false` (purse가 높을 수록 잘보입니다)
+ borderColor
  + from: RGB 색상에 해당하는 0 과 255 사이의 정수 값. Default: `[0,0,0]`
  + to: RGB 색상에 해당하는 0과 255 사이의 정수 값. Default: `[255,255,255]`
+ color
  + from: RGB 색상에 해당하는 0과 255 사이의 정수 값. Default: `[0,0,0]`
  + to: RGB 색상에 해당하는 0과 255 사이의 정수 값. Default: `[255,255,255]`
+ radius
  + min: 다음에 주어지는 최소 값 `border-radius`. Default: `0`
  + max: 다음에 주어지는 최대 값 `border-radius`. Default: `25`
  + reverse: 효과를 최소에서 최대까지 적용할 Boolean. Default: `false`
+ blur
  + min: 다음에 주어지는 최소 값`filter: blur()`. Default: `0`
  + max: 다음에 주어지는 최대 값`filter: blur()`. Default: `8`
  + reverse: 효과를 최소에서 최대까지 적용할 Boolean. Default: `false`
+ swing
  + curve: 요소가 `up` or `down` 곡선으로 처리하는지 여부. Default: `down`
  + direction: 요소가 `right` or `left` 으로 흔들리는지 여부. Default: `right`
  + radius: 요소가 얼마나 흔들리는 지 값. Default: `20`
+ kern
  + min: 다음에 주어지는 최소 값 `letter-spacing`. Default: `0`
  + max: 다음에 주어지는 최대 값 `letter-spacing`. Default: `25`
  + reverse: 효과를 최소에서 최대까지 적용할 Boolean. Default: `false`
+ neon
  + from: RGB 색상에 해당하는 0과 255 사이의 정수 값. Default: `[0,0,0]`
  + to: RGB 색상에 해당하는 0과 255 사이의 정수 값. Default: `[255,255,255]`
+ borderWidth
  + min: 다음에 주어지는 최소 값 `border-width`. Default: `0`
  + max: 다음에 주어지는 최대 값 `border-width`. Default: `5`
+ fontSize
  + min: 다음에 주어지는 최소 값 `font-width`. Default: `0.8`
  + max: 다음에 주어지는 최대 값 `font-width`. Default: `1.2`
+ fontColor
  + from: RGB 색상에 해당하는 0과 255 사이의 정수 값. Default: `[0,0,0]`
  + to: RGB 색상에 해당하는 0과 255 사이의 정수 값. Default: `[255,255,255]`

각각의 효과를 시각적으로 보고 싶다면 [Demo](https://okazari.github.io/Rythm.js/).

사용자 정의 댄스타입
-----------------

만약 자신만의 댄스 타입을 만들고 싶다면,`addRythm` 의 2번째 인자에 객체를 넣어야 합니다.

이 객체는 반드시 2가지 속성을 가지고 있어야합니다:
 - dance: 요소를 춤추게 할 사용자 정의 함수
 - reset: 요소의 스타일을 재설정하기 위해 호출되는 사용자 정의 함수

```js
/* The custom function signature is
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

/* The reset function signature is
 * @elem: The element to reset
 */
const resetPulse = elem => {
  elem.style.transform = ''
}

addRythm('my-css-class', { dance: pulse, reset: resetPulse }, 150, 40)
```


특징
========

 + 당신의 HTML은 사용가능한 모든 댄스 타입을 사용해 춤출 수 있습니다.
 + 당신은 자신만의 춤을 만들기 위해 사용자 정의 함수를 사용할 수 있습니다. (만약 춤이 멋지다면! 자유롭게 PR을 주세요 ;) )


컨트리뷰트
==========

어떠한 pull request도 감사할 것입니다. 다음 단계에 따라 이 프로젝트에서 코딩을 시작할 수  있습니다.:
 + Fork the project
 + Clone your repository
 + Run ```npm install```
 + Run ```npm start``` in the main folder to launch a development web server
 + Enjoy the rythm

새로운 댄스 타입 추가
---------------------

v2.2.x 에서 새로운 댄스를 추가하는 것은 아주 쉽습니다:
+ `src\dances`에 새 파일 생성
+ 이 파일은 당신의 커스텀 댄스함수를 export 합니다
+ 이 파일은 리셋(reset) 함수를 export 합니다

예를들어, 다음은 `jump.js` 파일입니다.:

```js
/* The function signature is
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

/* The reset function signature is
 * @elem: The element to reset
 */
export const reset = elem => {
  elem.style.transform = ''
}
```

+ Import하고`Dancer.js`의 constructor에 등록합니다.:

```js
import jump, { reset as resetJump } from './dances/jump.js'
class Dancer {
  constructor() {
    this.registerDance('jump', jump, resetJump)
  }
}
```

+ 이것을 Commit 하고 PR을 생성합니다. 그러면  모든사람이 당신의 기여를 볼 수 있습니다:)!

License: GNU GPL

Author: [@OkazariBzh](https://twitter.com/OkazariBzh)
