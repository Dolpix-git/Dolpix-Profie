import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        
        this.CreatePerspectiveCamera();
        this.CreateOrthographicCamera();
        this.Resize();


        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || window.pageYOffset;
        
            this.orthographicCamera.position.set(0,3,scrollY * 0.005+5);
        
            this.orthographicCamera.updateProjectionMatrix();
        });

        //this.SetOrbitControls();
    }

    CreatePerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(0,0,5);
    }

    CreateOrthographicCamera(){
        let cameraNear = 0.1; // near clipping plane
        let cameraFar = 20; // far clipping plane

        this.orthographicCamera = new THREE.OrthographicCamera(
            this.sizes.width / -1000,   // left
            this.sizes.width / 1000,    // right
            this.sizes.height / 1000,   // top
            this.sizes.height / -1000,  // bottom
            cameraNear,         // near
            cameraFar           // far
        );
        this.orthographicCamera.position.set(0,3,5);

        // Set the camera to look at the center of the scene
        this.orthographicCamera.lookAt(new THREE.Vector3(0, 0.7, 0));
        this.scene.background = new THREE.Color( 0x101010 );
        this.scene.add(this.orthographicCamera);

        // const size = 10;
        // const diversions = 10;

        // const gridHelper = new THREE.GridHelper(size, diversions);
        // this.scene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(5);
        // this.scene.add(axesHelper);
    }

    SetOrbitControls(){
        this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.target = new THREE.Vector3(0,2,0);
    }

    Resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();


        this.orthographicCamera.left = this.sizes.width / -1000;
        this.orthographicCamera.right = this.sizes.width / 1000;
        this.orthographicCamera.top = this.sizes.height / 1000;
        this.orthographicCamera.bottom = this.sizes.height / -1000;
        this.orthographicCamera.updateProjectionMatrix();
    }

    Update(){
        //this.controls.update();
    }
}