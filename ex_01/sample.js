function main()
{
    var volume = new THREE.TorusGeometry();
    var screen = new KVS.THREEScreen();
    var sphere = new THREE.Mesh(                                         
        //球のジオメトリ　（半径：２００）   
        new THREE.SphereGeometry(200),      
        //マテリアル （材質） 
        new THREE.MeshPhongMaterial({          
        //色（１６進数）                             
        color: 0xffffff                                  
        }));

    screen.init( sphere );
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 255, 0, 0 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 2 );
        screen.scene.add( spere );
        screen.draw();

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });
    }
}