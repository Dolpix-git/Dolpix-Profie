import * as THREE from "three";
import Experience from "./Experience";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import RenderPixelatedPass from "../Experience/Shader/RenderPixelatedPass";
import PixelatePass from "../Experience/Shader/PixelatePass";

export default class Renderer{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        console.log(this.camera, this.camera.perspectiveCamera);
        this.RenderSet = false;
        this.SetRenderer();
        this.RenderSet = true;
    }

    SetRenderer(){
        let screenResolution = new THREE.Vector2( this.sizes.width, this.sizes.height )
        let renderResolution = screenResolution.clone().divideScalar( 1 )

        this.renderer = new THREE.WebGLRenderer( { 
            canvas: this.canvas,
            antialias: false 
        } );
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize( screenResolution.x, screenResolution.y );

        this.composer = new EffectComposer( this.renderer );
        const pixelRender = new RenderPixelatedPass( 6, this.scene, this.camera.orthographicCamera );
        this.composer.addPass( pixelRender );
        this.composer.addPass( new UnrealBloomPass( screenResolution, .2, .1, .9 ) );
        this.composer.addPass( new PixelatePass( renderResolution ) );
    }

    Resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.composer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    Update(){
        if (!this.RenderSet) return;
        //this.renderer.render(this.scene, this.camera.orthographicCamera);
        this.composer.render();
    }
}