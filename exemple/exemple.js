window.onload = function(){

  var rythm = new Rythm();
  var audio = document.getElementById('audio');

  document.getElementById('mic').addEventListener('click',
    function(){
      if(rythm.stopped === false){
          rythm.stop();
      }
      rythm.plugMicrophone().then(function(){
        rythm.start();
      })
    })

  document.getElementById('element').addEventListener('click',
    function(){
      if(rythm.stopped === false){
          rythm.stop();
      }
      rythm.setMusic("../samples/rythmC.mp3");
      rythm.setGain(0.1)
      rythm.start();
    })
        
}

