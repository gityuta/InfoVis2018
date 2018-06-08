function main()
{
    var volume = new KVS.CreateTornadoData( 512, 516, 512 );
    var screen = new KVS.THREEScreen();

    screen.init( volume );
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 255, 0, 0 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 2 );

        var seed_point = new KVS.Vec3(128, 128, 128);//volume.objectCenter();
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 100 );
        streamline.setIntegrationTime( 5000 );
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
}
