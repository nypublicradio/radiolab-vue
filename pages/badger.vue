<script setup>
import axios from 'axios'
import colors from '~/assets/scss/colors.module.scss'

const config = useRuntimeConfig()

useHead({
  title: 'Terrestrial\'s Submit Questions | Radiolab | WNYC Studios',
  meta: [
    {
      name: 'theme-color',
      content: colors.rlBlue,
    },
    {
      charset: 'UTF-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ],
  /*bodyAttrs: {
    class: 'has-head-color bg-slate-50 min-h-screen p-4 flex flex-col',
  },*/
})


// Reactive data
const userName = ref('')
const userHometown = ref('')
const userEmail = ref('')
const userInsta = ref('')
const timer = ref('00:00')
const statusText = ref('Ready')
const statusDotClass = ref('w-3 h-3 rounded-full bg-slate-300')
const expandLabel = ref('Expands on Record')
const isSetupViewHidden = ref(false)
const isRecordingViewActive = ref(false)
const isPostViewVisible = ref(false)
const isStartBtnDisabled = ref(false)
const isStopBtnDisabled = ref(true)
const stopBtnClass = ref('w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 cursor-not-allowed transition-all')
const scriptWindowExpanded = ref(false)
const audioPlaybackSrc = ref('')
const videoPlaybackSrc = ref('')
const filenameDisplay = ref('file-save-msg')
const micMeterWidth = ref(0)
const newsletterOptIn = ref(true)
const recordVideo = ref(false)
const currentRecordingExt = ref('wav')
const currentMimeType = ref('audio/wav')

// Template ref for live video preview
const livePreview = ref(null)

// Audio recording variables
let mediaRecorder = null
let audioChunks = []
let timerInterval = null
let audioContext = null
let analyser = null
let globalStream = null
let animationFrameId = null
let currentObjectUrl = null

// Computed properties
const displayName = computed(() => userName.value || '[NAME]')
const displayHometown = computed(() => userHometown.value || '[HOMETOWN]')

// Methods
const updateScript = () => {
  // This is handled by computed properties now
}
// Subscribe to newsletter via email-proxy API
const subscribeToNewsletter = () => {
  if (!newsletterOptIn.value || !userEmail.value.trim()) return
  axios
    .post(`${config.API_URL}/email-proxy/subscribe`, {
      list: '2fe8150dd6',
      email: userEmail.value,
      source: 'radiolab_read_credits',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(() => {
      // Silently fail - don't block the recording flow
    })
}

// Initialize media recording (audio + optional video) and visualization
const initMedia = async () => {
  if (!userName.value.trim() || !userEmail.value.trim() || !userHometown.value.trim()) {
    alert('Please fill in all required fields (*) before starting.')
    return
  }

  // Subscribe to newsletter if opted in
  subscribeToNewsletter()

  try {
    globalStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: recordVideo.value ? { facingMode: 'user' } : false
    })
    isRecordingViewActive.value = true
    isSetupViewHidden.value = true

    // Show live video preview if recording video
    if (recordVideo.value && livePreview.value) {
      livePreview.value.srcObject = globalStream
    }
    
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
    analyser = audioContext.createAnalyser()
    audioContext.createMediaStreamSource(globalStream).connect(analyser)
    
    // Start the microphone level meter loop
    const updateMeter = () => {
      const data = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(data)
      const avg = data.reduce((a, b) => a + b, 0) / data.length
      micMeterWidth.value = Math.min(100, avg * 3)
      animationFrameId = requestAnimationFrame(updateMeter)
    }
    updateMeter()
  } catch (e) { 
    alert('Hardware access is required. Please check your camera and microphone permissions.') 
  }
}

// Start recording audio/video and handle data
const startRecording = () => {
  // Expand script
  scriptWindowExpanded.value = true
  expandLabel.value = 'Expanded Mode'

  audioChunks = []

  // Dynamic format negotiation
  let options = {}
  if (recordVideo.value) {
    if (MediaRecorder.isTypeSupported('video/mp4')) {
      options = { mimeType: 'video/mp4' }
      currentRecordingExt.value = 'mp4'
      currentMimeType.value = 'video/mp4'
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
      options = { mimeType: 'video/webm;codecs=vp9,opus' }
      currentRecordingExt.value = 'webm'
      currentMimeType.value = 'video/webm'
    } else if (MediaRecorder.isTypeSupported('video/webm')) {
      options = { mimeType: 'video/webm' }
      currentRecordingExt.value = 'webm'
      currentMimeType.value = 'video/webm'
    }
  } else {
    if (MediaRecorder.isTypeSupported('audio/mp4')) {
      options = { mimeType: 'audio/mp4' }
      currentRecordingExt.value = 'm4a'
      currentMimeType.value = 'audio/mp4'
    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
      options = { mimeType: 'audio/webm' }
      currentRecordingExt.value = 'webm'
      currentMimeType.value = 'audio/webm'
    } else {
      currentRecordingExt.value = 'wav'
      currentMimeType.value = 'audio/wav'
    }
  }

  try {
    mediaRecorder = new MediaRecorder(globalStream, options)
  } catch (e) {
    mediaRecorder = new MediaRecorder(globalStream)
    currentMimeType.value = mediaRecorder.mimeType
    currentRecordingExt.value = recordVideo.value
      ? (currentMimeType.value.includes('mp4') ? 'mp4' : 'webm')
      : 'webm'
  }
  
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) audioChunks.push(e.data)
  }
  
  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: currentMimeType.value })
    
    // Revoke previous object URL to prevent memory leaks
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl)
    }
    const url = URL.createObjectURL(blob)
    currentObjectUrl = url
    
    const name = userName.value.replace(/[^a-z0-9]/gi, '_')
    const hometown = userHometown.value.replace(/[^a-z0-9]/gi, '_')
    const insta = userInsta.value.replace(/[^a-z0-9@]/gi, '_') || 'noinsta'
    const filename = `Radiolab_${name}_${hometown}_${insta}.${currentRecordingExt.value}`

    if (recordVideo.value) {
      videoPlaybackSrc.value = url
      audioPlaybackSrc.value = ''
    } else {
      audioPlaybackSrc.value = url
      videoPlaybackSrc.value = ''
    }
    filenameDisplay.value = filename
    isPostViewVisible.value = true
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  mediaRecorder.start()
  let sec = 0
  timerInterval = setInterval(() => {
    sec++
    timer.value = new Date(sec * 1000).toISOString().substr(14, 5)
  }, 1000)
  
  isStartBtnDisabled.value = true
  isStopBtnDisabled.value = false
  stopBtnClass.value = 'w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center transition-all'
  statusDotClass.value = 'w-3 h-3 rounded-full bg-red-500 recording-pulse'
  statusText.value = 'On Air'
}

// Stop recording and clean up resources
const stopRecording = () => {
  mediaRecorder.stop()
  clearInterval(timerInterval)
  
  // Stop the animation frame loop
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  // Stop microphone stream tracks
  if (globalStream) {
    globalStream.getTracks().forEach(track => track.stop())
    globalStream = null
  }
  
  // Close the audio context
  if (audioContext) {
    audioContext.close()
    audioContext = null
  }
  
  statusText.value = 'Captured'
  statusDotClass.value = 'w-3 h-3 rounded-full bg-green-500'
  // Collapse script slightly to make room for post-view
  scriptWindowExpanded.value = false
  expandLabel.value = 'Collapsed'
}

// Reset the studio to initial state for a new recording
const resetStudio = () => {
  isPostViewVisible.value = false
  audioPlaybackSrc.value = ''
  videoPlaybackSrc.value = ''
  timer.value = '00:00'
  statusText.value = 'Ready'
  statusDotClass.value = 'w-3 h-3 rounded-full bg-slate-300'
  isStartBtnDisabled.value = false
  isStopBtnDisabled.value = true
  stopBtnClass.value = 'w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 cursor-not-allowed transition-all'
}

// Open Dropbox submission link in a new tab
const openDropbox = () => {
  window.open('https://www.dropbox.com/request/zTfBA4cSYrg9YZJ3yVC5', '_blank')
}

onBeforeUnmount(() => {
  clearInterval(timerInterval)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (globalStream) {
    globalStream.getTracks().forEach(track => track.stop())
  }
  if (audioContext) {
    audioContext.close()
  }
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl)
  }
})
</script>

<template>
  <div class="crowdsource-form">
  <div class="max-w-2xl w-full space-y-6">
    <div class="text-center space-y-2 instructions-padding">
      <img src="Badgers3x2_IzxHbjK.png" alt="Badgers -Submit Questions" class="mx-auto">
      <div>(Tara Anand )</div>
      <h1 class="text-3xl font-bold text-slate-800">Submit Questions</h1>
      <p class="text-slate-600 italic">By submitting content through this app, you are agreeing to our terms and conditions available at <a href="https://wnyc.org/terms/" target="_blank" rel="noopener noreferrer" class="html-formatting" style="color: #0454d6;">https://wnyc.org/terms/</a>. You're giving New York Public Radio permission to use your submission.<br><br></p>
      <p>At the end of every Terrestrials episode, listeners of all ages “badger” our experts with questions. It is often people's favorite part of the show. There is no question too big or too small. You never know what kind of answer you'll get. We invite you to submit your questions about the natural world. You can also submit ideas for topics you think Terrestrials should cover, cool people you think we should interview, or nature factoids that blew your mind.<br><br>
      All ages are welcome! A parent/guardian should write us along with you, so we know you have their permission for badgering us, and for maybe even having your ideas mentioned on the show.<br><br></p>
      <p>SUBMIT YOUR QUESTION HERE (voice notes or videos welcome!)<br><br></p>
      <p class="text-slate-600 italic">All ages are welcome. A parent/guardian should write us along with you, so we know you have their permission for badgering us, and for maybe even having your ideas mentioned on the show.<br><br></p>
      <ol class="text-left text-slate-600 space-y-1 instructions">
        <li>Fill in your name, hometown, email address, and (optionally) Instagram handle. The information you add will become part of the question script you can read.</li>
        <li>Before you record please click on the Rehearse Script link to review the script below to practice out loud once or twice.</li>
        <li>Click "Unlock Studio" to turn on the microphone and show the recording tools.</li>
        <li>You will be asked to allow microphone or video permissions from your browser to record. To record video click the Record Video (Optional) checkbox.</li>
        <li>Press the red button to start recording, and read your question script aloud.</li>
        <li>Once you're done, click the gray button to stop. Your recording will download to your device (i.e., phone or computer).</li>
        <li>The Review & Submit box will appear enabling you to listen to your recording, re-record it, and submit it to Terrestrial's Dropbox. You can review your take and submit it to our Dropbox.</li>
        <li>If you like the recording, click the Continue to File Upload button and a new window/tab will appear.</li>
        <li>Click Add files or drag and drop your recording into the Dropbox window to save.</li>
        </ol>
    </div>
    
    <div v-show="!isSetupViewHidden" id="setup-view" class="bg-white rounded-xl shadow-lg p-8 border border-slate-200 items-center">
      <h2 class="text-xl font-bold text-slate-800 mb-4">1. Your Information</h2>
      <div class="crowdsource-grid crowdsource-grid-cols-1 md:crowdsource-grid-cols-2 gap-4 text-left">
        <div>
          <label class="block text-sm font-medium text-slate-600 italic">Full Name *</label>
          <input 
            v-model="userName"
            type="text" 
            @input="updateScript" 
            placeholder="Jane Doe" 
            class="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            aria-label="Full Name"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 italic">Hometown *</label>
          <input 
            v-model="userHometown"
            type="text" 
            @input="updateScript" 
            placeholder="Brooklyn, NY" 
            class="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            aria-label="Hometown"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 italic">Email Address *</label>
          <input 
            v-model="userEmail"
            type="email" 
            placeholder="jane@example.com" 
            class="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            aria-label="Email Address"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 italic">Instagram Handle</label>
          <input 
            v-model="userInsta"
            type="text" 
            placeholder="@username" 
            class="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            aria-label="Instagram Handle"
          >
        </div>
      </div>
      <div class="mt-4 text-left">
        <label class="flex items-start gap-2 text-sm text-slate-600">
          <input
            v-model="newsletterOptIn"
            type="checkbox"
            class="mt-1"
          >
          <span>By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our <a href="https://wnyc.org/terms" target="_blank" rel="noopener noreferrer" style="color: #0454d6;">Terms</a>.</span>
        </label>
      </div>
      <div class="mt-4 text-left bg-slate-50 p-4 rounded-lg border border-slate-100">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            v-model="recordVideo"
            type="checkbox"
            class="h-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
          >
          <span class="text-sm font-bold text-slate-700">Record Video (Optional)</span>
        </label>
        <p class="text-xs text-slate-500 mt-1">Checking this will request camera access alongside your microphone.</p>
      </div>
      <button 
        @click="initMedia" 
        class="w-full mt-6 bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-md"
        id="init-btn"
      >
        Unlock Studio
      </button>
    </div>

    <div 
      id="recording-view" 
      class="bg-white rounded-xl shadow-lg p-6 border border-slate-200 text-center transition-all duration-500"
      :class="{ 'opacity-40 pointer-events-none': !isRecordingViewActive }"
    >
      <div class="flex items-center justify-center gap-4 mb-4">
        <div id="status-dot" :class="statusDotClass"></div>
        <span class="text-sm font-bold uppercase tracking-widest text-slate-500 italic">{{ statusText }}</span>
        <span class="text-2xl font-mono text-slate-800 ml-4">{{ timer }}</span>
      </div>

      <!-- Live Video Preview -->
      <video
        v-show="recordVideo"
        ref="livePreview"
        autoplay
        muted
        playsinline
        class="live-preview w-full rounded-lg shadow-md mb-6"
      ></video>

      <div id="mic-meter-container" class="mb-6">
        <div id="mic-meter-bar" :style="{ width: micMeterWidth + '%' }"></div>
      </div>

      <div class="flex justify-center gap-8">
        <button 
          @click="startRecording"
          :disabled="isStartBtnDisabled"
          class="group relative w-16 h-16 bg-red-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white hover:bg-red-600 transition-all"
          :class="{ 'opacity-30 grayscale': isStartBtnDisabled }"
          id="start-btn" aria-label="Start Recording"
        >
          <span class="sr-only"><!--Start recording--></span>
          <div class="w-6 h-6 bg-white rounded-full group-active:scale-90"></div>
        </button>
        <button 
          @click="stopRecording"
          :disabled="isStopBtnDisabled" 
          :class="stopBtnClass"
          id="stop-btn" aria-label="Stop Recording"
        >
          <span class="sr-only"><!--Stop recording--></span>
          <div class="w-6 h-6 bg-current rounded-sm"></div>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div class="bg-slate-800 p-4 text-white font-bold flex items-center justify-between">
        <span class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" height="60px">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          3. Staff Credits Script
        </span>
        <span class="text-xs uppercase opacity-50 font-normal italic">{{ expandLabel }}</span>
        <span class="text-xs uppercase opacity-50 font-normal italic"><a href="#open-rehearse" class="btn">Rehearse Script</a></span>
      </div>
      <!-- Staff Credits Script Begins Here-->
        <!-- Rehearsal Modal Begins Here-->
       <div id="open-rehearse" class="rehearsal-window">
        <div>
          <!-- Close Link -->
          <a href="#" title="Close" class="modal-close">Close</a>
          <h1>Rehearse Script</h1>
          <div 
        id="script-window" 
        class="p-8 text-slate-800 text-2xl leading-relaxed space-y-8"
        :class="{ 'expanded': scriptWindowExpanded }"
      >
            <p>Hi, I'm <strong class="text-blue-600">{{ displayName }}</strong>, from <strong class="text-blue-600">{{ displayHometown }}</strong>, and my question is...</p>
            <div class="h-12"></div>
          </div>
        </div>
      </div>
      <!-- Rehearsal Modal Ends Here-->
      <div 
        id="script-window" 
        class="p-8 text-slate-800 text-2xl leading-relaxed space-y-8"
        :class="{ 'expanded': scriptWindowExpanded }"
      >
        <p>Hi, I'm <strong class="text-blue-600">{{ displayName }}</strong>, from <strong class="text-blue-600">{{ displayHometown }}</strong>, and my question is...</p>
        <div class="h-12"></div>
      </div>
      <!-- Staff Credits Script Ends Here-->
    </div>

    <div v-show="isPostViewVisible" class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 space-y-4">
      <div class="flex items-center justify-between border-b pb-4">
        <h3 class="font-bold text-lg text-slate-800">Review & Submit</h3>
        <button @click="resetStudio" class="text-sm text-blue-600 font-bold hover:underline">Redo Take</button>
      </div>
      <audio v-if="audioPlaybackSrc" :src="audioPlaybackSrc" controls class="w-full"></audio>
      <video v-if="videoPlaybackSrc" :src="videoPlaybackSrc" controls class="w-full video-playback rounded-lg"></video>
      <div class="bg-blue-600 p-6 rounded-lg text-white">
        <p class="text-sm mb-4 italic file-save-msg">Recording saved as: <br><span class="font-mono bg-blue-700 px-1 rounded not-italic break-all">{{ filenameDisplay }}</span></p>
        <button 
          @click="openDropbox"
          class="w-full bg-white text-blue-600 py-3 rounded font-bold shadow-md hover:bg-blue-50 transition"
        >
          Continue to File Upload
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<style lang="css">
    .recording-pulse { animation: pulse 1.5s infinite; }
    @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
    
    /* Script starts small and expands */
    #script-window { 
        max-height: 200px; 
        transition: max-height 0.8s ease-in-out; 
        overflow-y: auto; 
    }
    #script-window.expanded { 
        max-height: 2000px; 
    }

    #mic-meter-container { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; width: 100%; max-width: 300px; margin: 0 auto; }
    #mic-meter-bar { height: 100%; width: 0%; background: #22c55e; transition: width 0.1s ease; }

    .live-preview { max-width: 24rem; margin: 0 auto; background: #000; object-fit: cover; aspect-ratio: 16/9; }
    .video-playback { max-height: 24rem; background: #000; object-fit: contain; aspect-ratio: 16/9; }

*,
::before,
::after {
  --tw-border-spacing-x:0;
  --tw-border-spacing-y:0;
  --tw-translate-x:0;
  --tw-translate-y:0;
  --tw-rotate:0;
  --tw-skew-x:0;
  --tw-skew-y:0;
  --tw-scale-x:1;
  --tw-scale-y:1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness:proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width:0px;
  --tw-ring-offset-color:#fff;
  --tw-ring-color:rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow:0 0 #0000;
  --tw-ring-shadow:0 0 #0000;
  --tw-shadow:0 0 #0000;
  --tw-shadow-colored:0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: 
}
::backdrop {
  --tw-border-spacing-x:0;
  --tw-border-spacing-y:0;
  --tw-translate-x:0;
  --tw-translate-y:0;
  --tw-rotate:0;
  --tw-skew-x:0;
  --tw-skew-y:0;
  --tw-scale-x:1;
  --tw-scale-y:1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness:proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width:0px;
  --tw-ring-offset-color:#fff;
  --tw-ring-color:rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow:0 0 #0000;
  --tw-ring-shadow:0 0 #0000;
  --tw-shadow:0 0 #0000;
  --tw-shadow-colored:0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: 
}
/* ! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com */*,
::after,
::before {
  box-sizing:border-box;
  border-width:0;
  border-style:solid;
  border-color:#e5e7eb;
}
::after,
::before {
  --tw-content:''
}
:host,
html {
  line-height:1.5;
  -webkit-text-size-adjust:100%;
  -moz-tab-size:4;
  tab-size:4;
  font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings:normal;
  font-variation-settings:normal;
  -webkit-tap-highlight-color:transparent;
}
body {
  margin:0;
  line-height:inherit;
}
hr {
  height:0;
  color:inherit;
  border-top-width:1px
}
abbr:where([title]) {
  -webkit-text-decoration:underline dotted;
  text-decoration:underline dotted
}
h1,
/*h2,*/
h3,
h4,
h5,
h6 {
  font-size:inherit;
  font-weight:inherit
}
a {
  color:inherit;
  text-decoration:inherit
}
b,
strong {
  font-weight:bolder
}
code,
kbd,
pre,
samp {
  font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-feature-settings:normal;
  font-variation-settings:normal;
  font-size:1em
}
small {
  font-size:80%
}
sub,
sup {
  font-size:75%;
  line-height:0;
  position:relative;
  vertical-align:baseline
}
sub {
  bottom:-.25em
}
sup {
  top:-.5em
}
table {
  text-indent:0;
  border-color:inherit;
  border-collapse:collapse
}
button,
input,
optgroup,
select,
textarea {
  font-family:inherit;
  font-feature-settings:inherit;
  font-variation-settings:inherit;
  font-size:100%;
  font-weight:inherit;
  line-height:inherit;
  letter-spacing:inherit;
  color:inherit;
  margin:0;
  padding:0;
}
button,
select {
  text-transform:none;
}
button,
input:where([type=button]),
input:where([type=reset]),
input:where([type=submit]) {
  -webkit-appearance:button;
  background-color:transparent;
  background-image:none
}
:-moz-focusring {
  outline:auto
}
:-moz-ui-invalid {
  box-shadow:none
}
progress {
  vertical-align:baseline
}
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height:auto
}
[type=search] {
  -webkit-appearance:textfield;
  outline-offset:-2px
}
::-webkit-search-decoration {
  -webkit-appearance:none
}
::-webkit-file-upload-button {
  -webkit-appearance:button;
  font:inherit
}
summary {
  display:list-item
}
blockquote,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
pre {
  margin:0; 
}
fieldset {
  margin:0;
  padding:0;
}
legend {
  padding:0;
}
menu,
ol,
ul {
  list-style:none;
  margin:0;
  padding:0;
}
dialog {
  padding:0
}
textarea {
  resize:vertical
}
input::placeholder,
textarea::placeholder {
  opacity:1;
  color:#9ca3af
}
[role=button],
button {
  cursor:pointer
}
:disabled {
  cursor:default
}
audio,
canvas,
embed,
iframe,
img,
object,
svg,
video {
  display:block;
  vertical-align:middle;
}
img,
video {
  max-width:100%;
  height:auto;
}
[hidden]:where(:not([hidden=until-found])) {
  display:none;
}
.pointer-events-none {
  pointer-events:none;
}
.relative {
  position:relative
}
.mb-4 {
  margin-bottom:1rem
}
.mb-6 {
  margin-bottom:1.5rem
}
.ml-4 {
  margin-left:1rem
}
.mt-6 {
  margin-top:1.5rem
}
.block {
  display:block
}
.flex {
  display:flex
}
.crowdsource-grid {
  display:grid
}
.hidden {
  display:none
}
.h-12 {
  height:3rem
}
.h-16 {
  height:4rem
}
.h-3 {
  height:0.75rem
}
.h-5 {
  height:1.25rem
}
.h-6 {
  height:1.5rem
}
.min-h-screen {
  min-height:100vh
}
.w-16 {
  width:4rem
}
.w-3 {
  width:0.75rem
}
.w-5 {
  width:1.25rem
}
.w-6 {
  width:1.5rem !important;
}
.w-full {
  width:100%
}
.max-w-2xl {
  max-width:42rem
}
.cursor-not-allowed {
  cursor:not-allowed
}
.crowdsource-grid-cols-1 {
  grid-template-columns:repeat(1, minmax(0, 1fr))
}
.flex-col {
  flex-direction:column
}
.items-center {
  align-items:center
}
.justify-center {
  justify-content:center
}
.justify-between {
  justify-content:space-between
}
.gap-2 {
  gap:0.5rem
}
.gap-4 {
  gap:1rem
}
.gap-8 {
  gap:2rem
}
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse:0;
  margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom:calc(1rem * var(--tw-space-y-reverse))
}
.space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse:0;
  margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))
}
.space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse:0;
  margin-top:calc(1.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom:calc(1.75rem * var(--tw-space-y-reverse))
}
.overflow-hidden {
  overflow:hidden
}
.break-all {
  word-break:break-all
}
.rounded {
  border-radius:0.25rem
}
.rounded-full {
  border-radius:9999px
}
.rounded-lg {
  border-radius:0.5rem
}
.rounded-md {
  border-radius:0.375rem
}
.rounded-sm {
  border-radius:0.125rem
}
.rounded-xl {
  border-radius:0.75rem
}
.border {
  border-width:1px
}
.border-4 {
  border-width:4px
}
.border-b {
  border-bottom-width:1px
}
.border-t-4 {
  border-top-width:4px
}
.border-green-500 {
  --tw-border-opacity:1;
  border-color:rgb(34 197 94 / var(--tw-border-opacity, 1))
}
.border-slate-200 {
  --tw-border-opacity:1;
  border-color:rgb(226 232 240 / var(--tw-border-opacity, 1))
}
.border-slate-300 {
  --tw-border-opacity:1;
  border-color:rgb(203 213 225 / var(--tw-border-opacity, 1))
}
.border-white {
  --tw-border-opacity:1;
  border-color:rgb(255 255 255 / var(--tw-border-opacity, 1))
}
.bg-blue-600 {
  --tw-bg-opacity:1;
  background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))
}
.bg-blue-700 {
  --tw-bg-opacity:1;
  background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))
}
.bg-current {
  background-color:currentColor
}
.bg-red-500 {
  --tw-bg-opacity:1;
  background-color:rgb(239 68 68 / var(--tw-bg-opacity, 1)) !important 
}
.bg-slate-200 {
  --tw-bg-opacity:1;
  background-color:rgb(226 232 240 / var(--tw-bg-opacity, 1))
}
.bg-slate-300 {
  --tw-bg-opacity:1;
  background-color:rgb(203 213 225 / var(--tw-bg-opacity, 1))
}
.bg-slate-50 {
  --tw-bg-opacity:1;
  background-color:rgb(248 250 252 / var(--tw-bg-opacity, 1))
}
.bg-slate-800 {
  --tw-bg-opacity:1;
  background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))
}
.bg-white {
  --tw-bg-opacity:1;
  background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))
}
.p-2 {
  padding:0.5rem
}
.p-4 {
  padding:1rem
}
.p-6 {
  padding:1.5rem
}
.p-8 {
  padding:2rem
}
.px-1 {
  padding-left:0.25rem;
  padding-right:0.25rem
}
.py-3 {
  padding-top:0.75rem;
  padding-bottom:0.75rem
}
.pb-4 {
  padding-bottom:1rem
}
.text-left {
  text-align:left
}
.text-center {
  text-align:center
}
.font-mono {
  font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
}
.text-2xl {
  font-size:1.5rem;
  line-height:2rem
}
.text-lg {
  font-size:1.125rem;
  line-height:1.75rem
}
.text-sm {
  font-size:0.875rem;
  line-height:1.25rem
}
.text-xl {
  font-size:1.25rem;
  line-height:1.75rem
}
.text-xs {
  font-size:0.75rem;
  line-height:1rem
}
.font-bold {
  font-weight:700
}
.font-medium {
  font-weight:500
}
.font-normal {
  font-weight:400
}
.uppercase {
  text-transform:uppercase
}
.italic {
  font-style:italic
}
.not-italic {
  font-style:normal
}
.leading-relaxed {
  line-height:1.625
}
.tracking-widest {
  letter-spacing:0.1em
}
.text-blue-600 {
  --tw-text-opacity:1;
  color:rgb(37 99 235 / var(--tw-text-opacity, 1))
}
.text-slate-400 {
  --tw-text-opacity:1;
  color:rgb(148 163 184 / var(--tw-text-opacity, 1))
}
.text-slate-500 {
  --tw-text-opacity:1;
  color:rgb(100 116 139 / var(--tw-text-opacity, 1))
}
.text-slate-600 {
  --tw-text-opacity:1;
  color:rgb(71 85 105 / var(--tw-text-opacity, 1))
}
.text-slate-800 {
  --tw-text-opacity:1;
  color:rgb(30 41 59 / var(--tw-text-opacity, 1))
}
.text-white {
  --tw-text-opacity:1;
  color:rgb(255 255 255 / var(--tw-text-opacity, 1))
}
.opacity-40 {
  opacity:0.4
}
.opacity-50 {
  opacity:0.5
}
.shadow-lg {
  --tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}
.shadow-md {
  --tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}
.shadow-xl {
  --tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}
.outline-none {
  outline:2px solid transparent;
  outline-offset:2px
}
.transition {
  transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;
  transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;
  transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration:150ms
}
.transition-all {
  transition-property:all;
  transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration:150ms
}
.duration-500 {
  transition-duration:500ms
}
.hover\:bg-blue-50:hover {
  --tw-bg-opacity:1;
  background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))
}
.hover\:bg-blue-700:hover {
  --tw-bg-opacity:1;
  background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))
}
.hover\:bg-red-600:hover {
  --tw-bg-opacity:1;
  background-color:rgb(220 38 38 / var(--tw-bg-opacity, 1))
}
.hover\:underline:hover {
  -webkit-text-decoration-line:underline;
  text-decoration-line:underline
}
.focus\:ring-2:focus {
  --tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}
.focus\:ring-blue-500:focus {
  --tw-ring-opacity:1;
  --tw-ring-color:rgb(59 130 246 / var(--tw-ring-opacity, 1))
}
.group:active .group-active\:scale-90 {
  --tw-scale-x:.9;
  --tw-scale-y:.9;
  transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}
@media (min-width: 768px) {
  .md\:crowdsource-grid-cols-2 {
    grid-template-columns:repeat(2, minmax(0, 1fr))
  }
}
.crowdsource-form {
    display: flex;
    justify-content: center; /* Horizontal */
    align-items: center;     /* Vertical */
    width: 100%;
    padding-top: 60px;
    padding-bottom: 60px;
}
.sr-only { 
    display: hidden;
}
.instructions {
    font-size: 0.5rem;
    color: #4b5563;
    margin-bottom: 1.5rem;
    text-align: center;
    list-style-type: decimal;
}
.file-save-msg  {
    font-size: 0.875rem;
    color: #ffffff;
    margin-top: 1rem;
    text-align: center;
}
.instructions-padding {
    padding-left: 5%;
    padding-right: 5%;
    margin: 2rem;
}
.html-formatting a {
    color: #0454d6;
}
a {
  text-decoration: none; /* Removes default underline */
}
a:hover {
  text-decoration: underline; /* Adds underline on hover */
}

/* Hidden by default */
.rehearsal-window {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7); /* Dark background overlay */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}

/* Show the modal when the URL hash matches its ID */
.rehearsal-window:target {
  visibility: visible;
  opacity: 1;
}

/* Modal content box styling */
.rehearsal-window > div {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 0.5em;
}

</style>