기여하기
==========
어떤 Pull Request든 환영합니다. 당신은 이러한 방법으로 프로젝트에 코딩을 시작할수 있습니다.
 + 프로젝트를 Fork합니다.
 + 당신의 Repositoty에 Clone합니다.
 + npm install 을 실행합니다.
 + 개발 웹서버를 설치하기 위해 메인 폴더에서 npm start를 실행합니다.
 + 리듬을 즐기세요!

새로운 댄스 추가하기
---------

2.2.x 버전에서 댄스 추가는 쉽습니다,
+ `src\dances`에 새로운 폴더를 생성합니다.
+ 이 파일은 당신의 새로운 춤 함수를 반드시 export해야 합니다.
+ 이 파일은 reset 함수를 반드시 export해야 합니다.

여기에 jump.js의 예시가 있습니다.

```js
/* The function signature is :
 * @elem: 당신이 효과를 지정할 html 요소
 * @value: 현재 pulse 비율 (0부터 1까지 설정가능)
 * @options: 당신이 마지막 인자로 줄 수 있는 옵션
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
+ Import 하고 Dancer.js파일의 생성자에 등록합니다.
```js
import jump, { reset as resetJump } from './dances/jump.js'
class Dancer {
  constructor() {
    this.registerDance('jump', jump, resetJump)
  }
}
```
+ Commit을 하고 PR를 만드세요. 그리고 모두가 당신의 기여를 즐기는 것을 보세요! :)
