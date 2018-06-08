function main()
{
	var volume = new KVS.CreateTornadoData( 64, 256, 64 );
	var screen = new KVS.THREEScreen();

    screen.init( volume );
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 255, 0, 0 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 5 );

        var seed_point = volume.objectCenter();
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 500 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( 100 );
        streamline.setSeedPoint( seed_point );

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        screen.draw();

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });
    }

/*	//var width = window.innerWidth;
	//var height = window.innerHeight;
	//var side = Math.min(width, height) / 50;
	//var scene = new THREE.Scene();
	//var camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
	//var renderer = createRenderer(width, height);
	//var cube = createCube(side, side, side);
	var cube = new KVS.CreateTornadoData(64, 64, 64);
	var screen = new KVS.THREEScreen();
	//camera.position.z = 100;
	//scene.add(cube);
	screen.init(cube);
	setup();
	screen.loop();
	function setup()
    {
        var color = new KVS.Vec3( 255, 0, 0 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 2 );

        var seed_point = volume.objectCenter();
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 500 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( 5 );
        streamline.setSeedPoint( seed_point );

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        screen.draw();

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });
    }
	function createRenderer(width, height) {
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);
		document.body.appendChild(renderer.domElement);
		return renderer;
	}
	function createCube(width, height, depth) {
		var geometry = new THREE.BoxGeometry(width, height, depth);
		var material = new THREE.MeshNormalMaterial();
		var cube = new THREE.Mesh(geometry, material);
		return cube;
	}
	function update() {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		requestAnimationFrame(update);
		renderer.render(scene, camera);
	}
	//update();*/

}