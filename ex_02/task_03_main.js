function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    
    var init_isovalue = 0.5;
    var isovalue;
    var surfaces;
    var max_R;
    var max_G;
    var max_B;

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight * 0.8,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    update_screen(init_isovalue, max_R, max_G, max_B);

    var FizzyText = function() {
        this.message = 'Lobster';
        this.isovalue = init_isovalue;
        this.R = 0.5;
        this.G = 0.5;
        this.B = 0.5;
     };

    var text = new FizzyText();
    var gui = new dat.GUI();
    gui.add(text, 'message');
    
    var controller_isovalue = gui.add(text, 'isovalue', 0, 1);
    var controller_R = gui.add(text, 'R', -1, 1);
    var controller_G = gui.add(text, 'G', -1, 1);
    var controller_B = gui.add(text, 'B', -1, 1);

    controller_isovalue.onChange(function(value){
    });

    controller_isovalue.onFinishChange(function(value){
        update_screen(value);
    });

    controller_R.onFinishChange(function(value){
        max_R = value;
        update_screen(isovalue, max_R, max_G, max_B);
    });

    controller_G.onFinishChange(function(value){
        max_G = value;
        update_screen(isovalue, max_R, max_G, max_B);
    });

    controller_B.onFinishChange(function(value){
        max_B = value;
        update_screen(isovalue, max_R, max_G, max_B);
    });

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight * 0.8 ] );
    });

    screen.loop();

    function update_screen(value, max_R, max_G, max_B){
        screen.scene.remove(surfaces);
        isovalue = Math.round(value * 255);
        surfaces = Isosurfaces(volume, isovalue, screen, max_R, max_G, max_B);
        screen.scene.add(surfaces);
    };
}
