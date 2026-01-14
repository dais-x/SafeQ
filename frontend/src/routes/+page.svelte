<script>
  import { appMode } from '$lib/stores.js';
  import Victim from '$lib/Victim.svelte';
  import Rescuer from '$lib/Rescuer.svelte';
</script>

<main class="font-sans antialiased">
  {#if $appMode === 'home'}
    <div class="h-screen bg-slate-100 flex flex-col items-center justify-center space-y-6">
      <h1 class="text-4xl font-bold text-slate-800">EarthquakeRescue</h1>
      <div class="flex flex-col gap-4 w-64">
        <button on:click={() => appMode.set('victim')} class="p-4 bg-blue-600 text-white rounded shadow-lg font-bold hover:bg-blue-700 transition">
          Mode: Victim App
        </button>
        <button on:click={() => appMode.set('rescuer')} class="p-4 bg-gray-800 text-white rounded shadow-lg font-bold hover:bg-gray-900 transition">
          Mode: Rescuer Radar
        </button>
      </div>
    </div>
  {:else if $appMode === 'victim'}
    <Victim />
  {:else if $appMode === 'rescuer'}
    <Rescuer />
  {/if}
</main>