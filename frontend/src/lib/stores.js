import { writable } from "svelte/store";

// We use this to switch between the Home, Victim, and Rescuer screens
export const appMode = writable("home");
