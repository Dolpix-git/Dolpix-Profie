import * as THREE from "three"
import Experience from "../Experience";

export default class Enviroment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.SetSunlight();
    }

    SetSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", .8);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(1.5,7,3);
        this.scene.add(this.sunLight);

        // Lights
        this.scene.add( new THREE.AmbientLight( 0x101010, 2) );

        
        // this.spotLight1 = new THREE.SpotLight( 0x005c40, 10, 10, Math.PI / 16, .3, 2 );

        // this.spotLight1.castShadow = true;
        // this.spotLight1.shadow.mapSize.set(2048,2048);
        // this.spotLight1.normalBias = 0.05;
        
        // this.spotLight1.position.set( 2, 3, 0 );
        // this.spotLight1.target.position.set( 0, 1, 0 );

        // this.scene.add( this.spotLight1 );

        // this.spotLight2 = new THREE.SpotLight( 0x5c0026, 3, 10, Math.PI / 10, .3, 2 );

        // this.spotLight2.castShadow = true;
        // this.spotLight2.shadow.mapSize.set(2048,2048);
        // this.spotLight2.normalBias = 0.05;
        
        // this.spotLight2.position.set( -1, 2, 0 );
        // this.spotLight2.target.position.set( 0, 1, 0 );

        // this.scene.add( this.spotLight2 );
    }

    Resize(){

    }

    Update(){

    }
}