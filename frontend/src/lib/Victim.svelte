<script>
  import { appMode } from '$lib/stores.js';
  
  let status = 'safe'; // 'safe', 'warning', 'trapped'
  let countdown = 10;
  let timer;

  // This simulates the earthquake detection
  function triggerEarthquake() {
    status = 'warning';
    countdown = 10;
    
    // Timer counts down from 10
    timer = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval(timer);
        status = 'trapped';
      }
    }, 1000);
  }

  function cancelAlarm() {
    clearInterval(timer);
    status = 'safe';
    countdown = 10;
  }
</script>

<div class="h-screen w-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-700 ease-in-out"
     class:bg-gray-900={status === 'safe'}
     class:bg-orange-600={status === 'warning'}
     class:bg-red-700={status === 'trapped'}>

  {#if status === 'safe'}
    <div class="space-y-8">
      <div class="w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,197,94,0.5)]">
        <span class="text-4xl">🛡️</span>
      </div>
      <h1 class="text-white text-3xl font-bold tracking-widest">SYSTEM ACTIVE</h1>
      <p class="text-gray-400">Monitoring Seismic Sensors...</p>
      
      <button on:click={triggerEarthquake} class="mt-10 px-6 py-2 bg-gray-800 text-gray-500 rounded border border-gray-700 text-sm hover:text-white hover:border-white transition">
        [DEMO: TRIGGER QUAKE]
      </button>
    </div>
  {/if}

  {#if status === 'warning'}
    <div class="animate-bounce">
      <h1 class="text-white text-6xl font-black mb-4">{countdown}</h1>
      <h2 class="text-white text-2xl font-bold uppercase tracking-widest">Impact Detected</h2>
    </div>
    <button on:click={cancelAlarm} class="mt-12 w-full max-w-sm py-6 bg-white text-orange-600 font-black text-2xl rounded-xl shadow-2xl active:scale-95 transition-transform">
      I AM SAFE
    </button>
  {/if}

  {#if status === 'trapped'}
    <div class="absolute inset-0 bg-red-600 animate-pulse opacity-20 pointer-events-none"></div>
    <div class="z-10 text-white space-y-6">
      <h1 class="text-5xl font-black uppercase tracking-tighter">SOS SIGNAL<br>BROADCASTING</h1>
      <div class="w-full h-1 bg-red-400 rounded overflow-hidden">
        <div class="h-full bg-white animate-progress"></div>
      </div>
      <p class="text-xl">BLE Beacon Active</p>
      <p class="text-sm opacity-70">Power Saving Mode Enabled</p>
      
      <button on:click={() => appMode.set('home')} class="fixed bottom-10 left-0 right-0 mx-auto text-red-200 text-sm underline">
        Stop Signal (Rescued)
      </button>
    </div>
  {/if}
</div>

<style>
  .animate-progress {
    width: 100%;
    animation: loading 2s infinite linear;
    transform-origin: 0% 50%;
  }
  @keyframes loading {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
</style>