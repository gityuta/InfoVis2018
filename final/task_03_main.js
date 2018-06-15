function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    
    var init_isovalue = 0.6;
    var isovalue;
    var surfaces;
    var material;

    var v_shader_type = 'normal';
    var f_shader_type = 'normal';
    var color_value = init_isovalue;
    var color_map_type = 'jet';

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    update_screen(init_isovalue, v_shader_type, f_shader_type);

    var FizzyText = function() {
        this.message = 'Lobster';
        this.isovalue = init_isovalue;
        this.ver_shader = v_shader_type;
        this.frag_shader = f_shader_type;
        this.color_map = color_map_type;
    };

    var text = new FizzyText();
    var gui = new dat.GUI();
    

    var controller_load_data = gui.add(text, 'message');
    var controller_ver_shader = gui.add(text, 'ver_shader', [ 'normal', 'lambertian'] );
    var controller_frag_shader = gui.add(text, 'frag_shader', [ 'normal', 'lambertian', 'phong', 'blinnphong', 'cooktorrance'] );
    var controller_cmap = gui.add(text, 'color_map', [ 'jet', 'white_blue', 'white_green', 'white_red']);

    var controller_isovalue = gui.add(text, 'isovalue', 0, 1);

    controller_isovalue.onChange(function(value){
    });

    controller_load_data.onChange(function(data){
        if(data == 'Lobster'){
            volume = new KVS.LobsterData();
        }
        if(data == 'Hydrogen'){
            volume = new KVS.HydrogenData(120,120,60);
        }
        update_screen(color_value, v_shader_type, f_shader_type);
    })

    controller_isovalue.onFinishChange(function(value){
        color_value = value;
        update_screen(value, v_shader_type, f_shader_type);
    });

    controller_ver_shader.onFinishChange(function(v_type){
        v_shader_type = v_type;
        update_screen(color_value, v_shader_type, f_shader_type);
    });

    controller_frag_shader.onFinishChange(function(f_type){
        f_shader_type = f_type;
        update_screen(color_value, v_shader_type, f_shader_type);
    });

    controller_cmap.onFinishChange(function(cmap_type){
        color_map_type = cmap_type;
        update_screen(color_value, v_shader_type, f_shader_type);
    })


    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight * 0.8 ] );
    });

    screen.loop();

    function update_screen(value, v_type, f_type){
        screen.scene.remove(surfaces);
        isovalue = Math.round(value * 255);
        surfaces = Isosurfaces(volume, isovalue, screen, v_type, f_type, color_map_type);
        screen.scene.add(surfaces);
    };
}
