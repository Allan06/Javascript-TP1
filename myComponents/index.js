
import './lib/webaudio-controls.js';
import './lib/input-knobs.js';

const getBaseURL = () => {
  const base = new URL('.', import.meta.url);
  console.log("Base = " + base);
  return `${base}`;
};

// musics non utilisé
const musics = [
  {
    chemin: 'assets/musics/Panthurr_-_I_Love_U.mp3',
    nom: 'Panthurr - I Love U',
    couverture: "./assets/covers/LoveU.png",
  },
  {
    chemin: './assets/musics/Panthurr_Ft._Jeff_x_Spencer_-_My_17th_Birthday.mp3',
    nom: 'Panthurr Ft. Jeff x Spencer - My 17th Birthday',
    couverture: "./assets/covers/Birthday.jpg",
  },
  {
    chemin: './assets/musics/DJ_Quads_-_For_A_While.mp3',
    nom: 'DJ Quads - For A While',
    couverture: "./assets/covers/People.jpg",
  },
  {
    chemin: './assets/musics/Soul_4_Real.mp3',
    nom: 'Soul 4 Real - Linslee Mix',
    couverture: "./assets/covers/Soul.jpg",
  },
];


const template = document.createElement("template");
template.innerHTML = `
  <style>
    body {
        background: #000;
    }

    #fond {
        position: absolute;
        height: 100%;
        width: 100%;
        margin: auto;
        filter: blur(200px);
        z-index: -1;
    }

    #cover {
        width: 100%;
        border-radius: 4px;
    }

    .player {
        position: absolute;
        height: 640pt;
        width: 450pt;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background:rgb(28,28,28);
    }

    #music-name {
        position: absolute;
        color: rgb(215, 154, 16);
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        font-size: 14px;
        bottom: 12%;
        left: 2%;
        z-index: 4;
    }

    #current-time, #duration-time {
        position: absolute;
        width: 50px;
        cursor: pointer;
        bottom: 4%;
        z-index: 4;
        font-family: 'Montserrat', sans-serif;
        font-size: 13px;
        align-items: center;
        color: rgb(215, 154, 16);
    }

    #duration-time {
        right: 5%;
    }

    #current-time {
        left: 9%;
    }

    #author_assets {
        position: absolute;
        font-size: 12px;
        bottom: 0%;
        z-index: 4;
    }

    #play, #pause {
        position: absolute;
        height: 50px;
        width: 50px;
        filter: invert(1);
        cursor: pointer;
        bottom: 5%;
        z-index: 4;
    }

    #pause{
        display:"none";
    }

    #next_song, #previous_song, #stop {
        position: absolute;
        height: 30px;
        width: 30px;
        filter: invert(1);
        cursor: pointer;
        bottom: 13.5%;
        bottom: 6%;
        z-index: 4;
    }

    #next_song {
        right: 40%;
    }

    #previous_song {
        left: 40%;
    }

    #stop {
      left: 34%;
    }

    #knob_volume {
        position: absolute;
        cursor: pointer;
        bottom: 9%;
        left: 1.5%;
        z-index: 4;
    }

    #knob_balance {
        position: absolute;
        right:0.1%;
        bottom: 8%;
    }

    #progress_bar[value] {
        appearance: none;
        border: none;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;
        color: dodgerblue;
        display: inline;
        height: 15px;
        order: 1;
        position: absolute;
        width: 500px;
        bottom:2%;
    }

    #progress_bar[value]::-webkit-progress-bar {
        background-color: whiteSmoke;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;
    }

    #progress_bar[value]::-webkit-progress-value {
        background-image: linear-gradient(to right, #ff8a00, #e52e71);
        border-radius: 3px;
        position: relative;
        transition: width 0.2s linear;
    }

    #myCanvasWave {
        position: absolute;
        bottom: 84.5%;
        z-index: 10;
        margin: auto;
        top: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #menu {
      position: absolute;
      height: 50px;
      width: 50px;
      filter: invert(1);
      cursor: pointer;
      bottom: 5%;
      z-index: 4;
      right:  1%;
    }

    #equalizer {
      position: absolute;
      height: 130;
      width: 300;
      margin: auto;
      right: 0.5%;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background:rgba(28,28,28, 0.8);
      bottom: 14.9%;
      z-index: 4;
      display: none;
  }
  </style>

  <img src="./assets/covers/cover1.jpg" id="fond" />

  <audio id="myPlayer">
    <source id="audioSource" src='./assets/musics/Soul_4_Real.mp3'/>

    <!--<source src='./assets/musics/Panthurr_Ft._Jeff_x_Spencer_-_My_17th_Birthday.mp3'/>
    <source src='./assets/musics/Panthurr_-_I_Love_U.mp3'/>-->
  </audio>

  <div class="player">

    <canvas id="myCanvasWave" width=600 height=120></canvas>

    <img src = "./assets/covers/cover1.jpg" id="cover"/>
    <div id="music-name">Soul 4 Real - Linslee Mix</div>

    <img src = "./assets/player-icons/001-next.png"     id="next_song"/>
    <img src = "./assets/player-icons/003-stop.png"     id="stop"/>
    <img src = "./assets/player-icons/013-play.png"     id="play"/>
    <img src = "./assets/player-icons/021-pause.png"    id="pause"/>
    <img src = "./assets/player-icons/029-previous.png" id="previous_song"/>

    <webaudio-knob
        id="knob_volume" src="./assets/imgs/ST_knob_slide_numbered.png"
        height="13" width="98" sprites="127" value=1 min="0" max="1"
        step=0.01>
    </webaudio-knob>

    <progress id="progress_bar" max="100" value="0" step=1>Progress</progress>

    <div id="current-time"></div>
    <div id="duration-time"></div>

    <div id="equalizer">
    <webaudio-knob
      id="knob_balance" tooltip="Balance:%s" src="./assets/imgs/Sonatom_gold.png"
      diameter="50" sprites="100" value=0 min="-1" max="1" step=0.01>
    </webaudio-knob>

    <webaudio-knob
      id="gain" tooltip="Gain:%s" src="./assets/imgs/Slider444.png"
      height="128" width="32" sprites="127" value=0 min="-1" max="1" step=0.01>
    </webaudio-knob>
  </div>
    <img src = "./assets/player-icons/020-menu.png" id="menu"/>
  </div>

  <div id="author_assets">
    Buttons icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  </div>

  `;

class MyAudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.volume = 1;
    this.musicId = 0;
    this.src = musics[this.musicId].chemin;
    this.filters = [];
    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // url absolu du composant
    this.basePath = getBaseURL();
    // Fix relative path in WebAudio Controls elements
    this.fixRelativeImagePaths();
  }

  static get observedAttributes() {return ['src']; }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("name : " + name + " - oldvalue : " + oldValue + " - newValue : " + newValue);
    this.shadowRoot.getElementById('audioSource').src = newValue;
    console.log(this.shadowRoot.getElementById('audioSource').src);
  }

  connectedCallback() {
    this.player = this.shadowRoot.querySelector("#myPlayer");
    this.player.loop = true;
    let audioContext = new AudioContext();
    let sourceNode = audioContext.createMediaElementSource(this.player);
    this.pannerNode = audioContext.createStereoPanner();

    // get the canvas, its graphic context...
    this.canvasWave = this.shadowRoot.querySelector("#myCanvasWave");
    this.width = this.canvasWave.width;
    this.height = this.canvasWave.height;
    this.canvasContext = this.canvasWave.getContext('2d');

    this.analyserNode = audioContext.createAnalyser();
    this.analyserNode.fftSize = 512;

    this.bufferLenght = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLenght);

    this.eq = audioContext.createBiquadFilter();
    this.eq.frequency.value = 60;
    this.eq.type = "peaking";
    this.eq.gain.value = 0;
    this.filters.push(this.eq);

    sourceNode.connect(this.pannerNode)
      .connect(this.analyserNode)
      .connect(this.filters[0])
      .connect(audioContext.destination);

    for(var i = 0; i < this.filters.length - 1; i++) {
         this.filters[i].connect(this.filters[i+1]);
    }

    // Met le boutton pause en arrière plan
    this.shadowRoot.getElementById("pause").style.display="none";
    this.shadowRoot.getElementById("pause").style.zIndex="99";

    this.majTexteTemps(0, 0);
    this.visualize();
    this.declareListeners();
  }

  disconnectedCallback() {
  }

  fixRelativeImagePaths() {
    // change webaudiocontrols relative paths for spritesheets to absolute
    let webaudioControls = this.shadowRoot.querySelectorAll(
      'webaudio-knob, webaudio-slider, webaudio-switch, input-knob, img, source, src'
    );
    webaudioControls.forEach((e) => {
      let currentImagePath = e.getAttribute('src');
      if (currentImagePath !== undefined) {
      let imagePath = e.getAttribute('src');
        e.src = this.basePath  + "/" + imagePath;
      }
    });
  }

  declareListeners() {
    this.shadowRoot.querySelector("#play").addEventListener("click", (event) => {
      try{
        //this.chargerPiste(musics[this.musicId]);
        this.play();
      }
      catch{}
    });

    this.shadowRoot.querySelector("#pause").addEventListener("click", (event) => {
      this.pause();
    });

    this.shadowRoot.querySelector("#next_song").addEventListener("click", (event) => {
      this.pisteSuivante();
    });

    this.shadowRoot.querySelector("#previous_song").addEventListener("click", (event) => {
      this.pistePrecedente();
    });

    this.shadowRoot.querySelector("#stop").addEventListener("click", (event) => {
      this.stop();
    });

    // Volume
    this.shadowRoot
    .querySelector("#knob_volume")
    .addEventListener("input", (event) => {
      this.setVolume(event.target.value);
    });

    // Balance
    this.shadowRoot
      .querySelector("#knob_balance")
      .addEventListener("input", (event) => {
        this.setBalance(event.target.value);
    });

    // Barre de lecture
    this.player.addEventListener("timeupdate", (event) => {
      let temps = this.shadowRoot.querySelector("#progress_bar");
      try{
        temps.max = this.player.duration;
        temps.value = this.player.currentTime;
        this.majTexteTemps(temps.value, temps.max);
      }
      catch{}
    });

    // Clics sur la barre de lecture
    this.shadowRoot
      .querySelector("#progress_bar")
      .addEventListener("click", (event) => {
        this.changerPositionLecture(event);
    });

    // Affichage de l'aqualizer
    this.shadowRoot
      .querySelector("#menu")
      .addEventListener("click", (event) => {
        this.afficherEqualizer();
    });

    // Test d"un seul gain
    this.shadowRoot
      .querySelector("#gain")
      .addEventListener("input", (event) => {
        console.log(event.target.value);

        this.changerGain(event.target.value, 0);
    });
  }

  // ===================================================================
  afficherEqualizer(){
    let equalizer = this.shadowRoot.getElementById("equalizer");
    if (equalizer.style.display == "none"){
      equalizer.style.display="block";
    }else{
      equalizer.style.display="none";
    }
  }

  play() {
    this.player.play();
    this.shadowRoot.getElementById("play").style.display="none";
    this.shadowRoot.getElementById("pause").style.display="inline";
  }

  pause(){
    this.player.pause();
    this.shadowRoot.getElementById("pause").style.display="none";
    this.shadowRoot.getElementById("play").style.display="inline";
  }

  stop(){
    this.pause();
    this.player.currentTime = 0;
  }

  setVolume(val) {
    this.player.volume = val;
  }

  setBalance(val){
    this.pannerNode.pan.value = val;
  }

  changerPositionLecture(pos){
    let progressBar = this.shadowRoot.querySelector('#progress_bar');
    let barLeft = progressBar.getBoundingClientRect().left ;
    let barWidth = progressBar.getBoundingClientRect().width ;

    this.player.currentTime = (pos.pageX - barLeft) / barWidth * this.player.duration;
    this.majTexteTemps(this.player.currentTime, this.player.duration);
  }

  formatterTemps(temps){
    return Math.floor(temps / 60) + ':' + Math.floor(temps % 60);
  }

  majTexteTemps(tempsActuel, tempsTotal){
    this.shadowRoot.getElementById("current-time").innerText = this.formatterTemps(tempsActuel);
    this.shadowRoot.getElementById("duration-time").innerText = this.formatterTemps(tempsTotal);
  }

  changerGain(sliderVal, nbFilter){
    let value = parseFloat(sliderVal);
    this.filters[nbFilter].gain.value = value;

    // update output labels
    // let output = this.shadowRoot.getElementById("gain");
    // output.value = value + " dB";
  }

  chargerPiste(music){
    this.shadowRoot.getElementById("music-name").innerText = music.nom;
    this.setAttribute("src", music.chemin);
    this.player.setAttribute("src", music.chemin) = music.chemin;
    this.changerCouverture(music.couverture);
  }

  pisteSuivante(){
    this.stop();
    this.musicId++;
    if (this.musicId >= musics.length){
      this.musicId = 0;
    }
    this.chargerPiste(musics[this.musicId]);
    this.play();
  }

  pistePrecedente(){
    this.stop();
    this.musicId--;
    if (this.musicId < 0){
      this.musicId = musics.length - 1;
    }
    this.chargerPiste(musics[this.musicId]);
    this.play();
  }

  changerCouverture(couverture){
    let coverTmp = this.shadowRoot.getElementById("cover");
    console.log(coverTmp);
    coverTmp.classList.remove("active");
    setTimeout(() => {
      coverTmp.src = couverture;
      coverTmp.classList.add('active');
    }, 100)
    this.shadowRoot.getElementById("fond").src = couverture;
  }


  visualize() {
    // Or use rgba fill to give a slight blur effect
    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // clear the canvas
    this.canvasContext.clearRect(0, 0, this.width, this.height);

    // Get the analyser data
    this.analyserNode.getByteFrequencyData(this.dataArray);

    let barWidth = this.width / this.bufferLenght;
    let barHeight;
    let x = 0;

    // values go from 0 to 255 and the canvas heigt is 100. Let's rescale
    // before drawing. This is the scale factor
    let heightScale = this.height/160;

    for(var i = 0; i < this.bufferLenght; i++) {
      // between 0 and 255
      barHeight = this.dataArray[i];

      // The color is red but lighter or darker depending on the value
      this.canvasContext.fillStyle = 'rgb(' + (barHeight + 255) + ',154,16)';

      // scale from [0, 255] to the canvas height [0, height] pixels
      barHeight *= heightScale;

      // draw the bar
      this.canvasContext.fillRect(x, this.height - barHeight/2, barWidth, barHeight/2);

      // 1 is the number of pixels between bars - you can change it
      x += barWidth + 1.4;
    }
    // once again call the visualize function at 60 frames/s
    requestAnimationFrame(() => {this.visualize()});
  }
}

customElements.define("my-audioplayer", MyAudioPlayer);
