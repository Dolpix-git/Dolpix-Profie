import * as THREE from "three"
import Experience from "../Experience";

import Room from './Room';
import Enviroment from "./Enviroment";

export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.AllowUpdate = false;

        const onResourcesReady = () => {
            this.Enviroment = new Enviroment();
            this.room = new Room();
            this.AllowUpdate = true;
        };

        if (this.resources.loaded === this.resources.queue) {
            onResourcesReady();
        } else {
            this.resources.on("ready", onResourcesReady);
        }
    }

    Resize(){

    }

    Update(){
        if(!this.AllowUpdate) return;
        this.room.Update();
    }
}