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

    var ap = new APlayer({
        element: document.getElementById('player1'),                       // Optional, player element
        narrow: false,                                                     // Optional, narrow style
        autoplay: false,                                                    // Optional, autoplay song(s), not supported by mobile browsers
        showlrc: 0,                                                        // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
        mutex: true,                                                       // Optional, pause other players when this player playing
        theme: '#e6d0b2',                                                  // Optional, theme color, default: #b7daff
        mode: 'random',                                                    // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
        preload: 'metadata',                                               // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
        listmaxheight: '513px',                                             // Optional, max height of play list
        music: {                                                           // Required, music info, see: ###With playlist
            title: 'Sona DJ',                                          // Required, music title
            author: 'Riot',                          // Required, music author
            url: '../samples/rythmC.mp3',  // Required, music url
        }
    });

    rythm.connectExternalAudioElement(ap.audio)
    rythm.start();
}

