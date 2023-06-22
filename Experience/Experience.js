import * as THREE from 'three';

import Sizes from './Utils/Size';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import assets from './Utils/Assets';

import Camera from './Camera';
import Renderer from './Renderer'

import World from './World/World.js';

export default class Experience {
    static instance;
    constructor(canvas){
      if(Experience.instance){
        return Experience.instance;
      }
      Experience.instance = this;
      this.canvas = canvas;
      this.scene = new THREE.Scene();
  
      this.sizes = new Sizes();
      this.time = new Time();
  
      this.camera = new Camera();
      this.renderer = new Renderer();
  
      this.resources = new Resources(assets);
  
      this.world = new World();
  
      this.executionTimes = []; // Array to store execution times
      this.maxExecutionTimes = 10; // Maximum size of the executionTimes array
      this.performanceThreshold = 200; // Threshold for average performance
  
      this.shouldRunHeavyFunction = true;
  
      this.sizes.on("Resize", ()=>{
        this.Resize();
      });
      this.time.on("Update", ()=>{
        this.Update();
      });
    }
  
    Resize(){
      this.camera.Resize();
      this.renderer.Resize();
    }
  
    Update(){
      if (!this.shouldRunHeavyFunction) {
        return;
      }
  
      const t0 = performance.now();
  
      this.camera.Update();
      this.renderer.Update();
      this.world.Update();
  
      const t1 = performance.now();
      const execTime = t1 - t0;
  
      // Store execution time and ensure that the executionTimes array doesn't grow indefinitely
      this.executionTimes.push(execTime);
      if (this.executionTimes.length > this.maxExecutionTimes) {
        this.executionTimes.shift();
      }
  
      // Compute average execution time
      const averageExecutionTime = this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length;
  
      if (averageExecutionTime > this.performanceThreshold) { // If average execution time is more than threshold, stop executing
        this.shouldRunHeavyFunction = false;
      }

      //console.log(`This task took ${averageExecutionTime} milliseconds.`);
    }
}