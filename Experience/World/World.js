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

        this.resources.on("ready", () =>{
            this.Enviroment = new Enviroment();
            this.room = new Room();
            this.AllowUpdate = true;
        });
    }

    Resize(){

    }

    Update(){
        if(!this.AllowUpdate) return;
        this.room.Update();
    }
}