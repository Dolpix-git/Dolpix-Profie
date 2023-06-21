import * as THREE from "three"
import Experience from "../Experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.skull = this.resources.items.skull; 
        this.actualSkull = this.skull.scene;

        this.floor = this.resources.items.floor;
        this.actualFloor = this.floor.scene;

        this.HoldUpdate = true;
        this.SetModel();
        this.OnMouseMove();
        this.HoldUpdate = false;
    }

    SetModel(){
        this.actualSkull.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupChild)=>{
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }
        });

        this.scene.add(this.actualSkull);
        this.actualSkull.scale.set(0.3,0.3,0.3);
        this.actualSkull.position.set(0.5,0,0);
        this.actualSkull.rotation.set(0,0,0);


        var geometry = new THREE.PlaneBufferGeometry(100, 100);
        var material = new THREE.MeshLambertMaterial({ color: 0x1f1f1f });
        var plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = - Math.PI / 2;
        plane.receiveShadow = true;
        this.scene.add(plane);

        var geometry = new THREE.BoxGeometry(1, 1, 1);  // Creates a cube with side length 1
        var material = new THREE.MeshLambertMaterial({ color: 0x303030 });
        var cube = new THREE.Mesh(geometry, material);
        cube.receiveShadow = true;
        cube.castShadow = true;
        this.scene.add(cube);
        cube.position.set(1.1,-0.2,6);
        cube.rotation.set(0,1,0);
    }

    OnMouseMove(){
        this.rotation = new THREE.Vector2;
        this.goal = new THREE.Vector2;
        window.addEventListener("mousemove", (e) => {
            this.goal = new THREE.Vector2( ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth , ((e.clientY - window.innerHeight / 2)*2)/window.innerHeight);
        });
    }

    Resize(){

    }

    Update(){
        if (this.HoldUpdate) return;
        let t = performance.now() / 3000;

        this.rotation = lerp( this.rotation, this.goal, 0.05 );

        this.actualSkull.position.y = .7 + Math.sin(t * 2) * .05;
        this.actualSkull.rotation.y = this.rotation.x;
        this.actualSkull.rotation.x = this.rotation.y;
    }
}
function lerp(start, end, t) {
    let x = start.x * (1 - t) + end.x * t;
    let y = start.y * (1 - t) + end.y * t;
    return new THREE.Vector2(x, y);
}


