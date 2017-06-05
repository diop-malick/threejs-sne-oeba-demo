// global vaiables
var scene, controls, camera, renderer;

container = document.getElementById('configurator');
var WIDTH = $(container).width();
var HEIGHT = $(container).height();

var SPEED = 0.0005;
var MODELSCALE = 5;

var tearModel1 = tearModel2 = null;

var loader = new THREE.JSONLoader();


$(document).ready(function() {
    // jquery code here

    /* =============================================================================================== 
    LAUCH
    =============================================================================================== */

    init();
    render();

    /* =============================================================================================== 
    EVENT
    =============================================================================================== */

    $("#target").click(function() {
        // console.log("Handler for .click() called.");
        // console.log(mesh.material[0]);
        // mesh.material[0].color.setHex(0xff0000);
    });

    $("#gardecorps").click(function() {
        // console.log(mesh.children);
        mesh.visible = true;
    });

    $('#radio_button').click(function() {
        // if ($(this).is(':checked')) alert('is checked'); 
        console.log('check-checky-check was changed');
        $("input[name='name']:checked").val()
    });

});

/* =============================================================================================== 
   FUNCTION
   =============================================================================================== */

function init() {
    scene = new THREE.Scene();
    // init common element
    initCamera();
    initLights();
    initRenderer();
    // init mesh
    initTearsModel1();
    initTearsModel2();
    // render
    container.appendChild(renderer.domElement);
    // control
    initControl();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    // renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.setClearColor(0xff0000, 1);
    renderer.setClearColor( 0xF4F4F4, 1);

}

function initControl() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}



function initTearsModel1() {

    // GC - Ballustre
    loader.load(
        'js/escalier_v3_part2.json',
        function(geometry, materials) {
            tearModel2 = new THREE.Mesh(geometry, materials);
            tearModel2.scale.set(MODELSCALE, MODELSCALE, MODELSCALE);
            // Bout metal et cloux
            // tearModel2.material[0].color.setHex(0xECF400);
            // Ballustre color
            tearModel2.material[1].color.setHex(0x2f3a4c);
            scene.add(tearModel2);
        });

    // CHARPENTE

    loader.load(
        'js/escalier_v3_part4.json',
        function(geometry, materials) {
            // var material = new THREE.MeshPhongMaterial({ 
            //     transparent: false, metal: true, shininess: 30,  wrapAround: true, side: THREE.DoubleSide
            //     map: THREE.ImageUtils.loadTexture('img/textures/metal_dirt.jpg') 
            // });
            tearModel4 = new THREE.Mesh(geometry, materials);
            tearModel4.scale.set(MODELSCALE, MODELSCALE, MODELSCALE);
            tearModel4.material[0].color.setHex(0x2f3a4c);
            scene.add(tearModel4);
        });

    // main courante

    loader.load(
        'js/escalier_v3_part3.json',
        function(geometry, materials) {
            var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('img/textures/AHORN.jpg') });
            material.side = THREE.DoubleSide;
            tearModel3 = new THREE.Mesh(geometry, material);
            tearModel3.scale.x = tearModel3.scale.y = tearModel3.scale.z = 5;
            scene.add(tearModel3);
        });
}

function initTearsModel2() {

    // MARCHE

    loader.load('js/escalier_v3_part1.json', function(geometry, materials) {
        var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('img/textures/Bois_Frene.jpg') });
        tearModel1 = new THREE.Mesh(geometry, material);
        tearModel1.scale.set(MODELSCALE, MODELSCALE, MODELSCALE);
        tearModel1.scale.set(MODELSCALE, MODELSCALE, MODELSCALE);
        // tearModel1.translation = geometry.center();
        // tearModel1.position.setX(3);
        // tearModel1.position.setY(1);
        // tearModel1.position.setZ(0);
        // tearModel1.material[0].color.setHex(0x2f3a4c);
        // tearModel1.material.color.setHex(0xECF400);
        scene.add(tearModel1);
    });


}


function rotateMesh() {

    if (!tearModel1 || !tearModel2 || !tearModel4 || !tearModel3) {
       return;
    }
     // tearModel1.rotation.x += SPEED * 2;
     // tearModel2.rotation.x += SPEED * 2;
     // tearModel3.rotation.x += SPEED * 2;
     // tearModel4.rotation.x += SPEED * 2;
     tearModel1.rotation.y += SPEED * 2;
     tearModel2.rotation.y += SPEED * 2;
     tearModel3.rotation.y += SPEED * 2;
     tearModel4.rotation.y += SPEED * 2;
        // tearModel1.rotation.y -= SPEED;
        // group.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}


function doHvSelect(clickedelement, texture) {
    console.log(clickedelement);
    $('#texture li').removeClass('select').addClass('disable');
    $(clickedelement).parent().removeClass('disable').addClass('select');
    text = THREE.ImageUtils.loadTexture('img/textures/' + texture);
    tearModel1.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.map = text;
            child.material.needsUpdate = true;
            child.geometry.buffersNeedUpdate = true;
            child.geometry.uvsNeedUpdate = true;
        }
    });
};
