import * as THREE from 'three';

import Sizes from './Utils/Size';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import assets from './Utils/Assets';

import Camera from './Camera';
import Renderer from './Renderer'

import World from './World/World.js';

export default class Experience{
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
        this.camera.Update();
        this.renderer.Update();
        this.world.Update();
    }
}