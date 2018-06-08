function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight * 0.8,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var slider = document.querySelector(".slider"),
        display = new Display(".value");

    slider.addEventListener("input", function(){
        display.setValue(this.value);
    }, false);

    slider.addEventListener("change", function(){
        display.setvalue(this.value);
    }, false);

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = Math.round(document.getElementById('isovalue').value * 255);
    var surfaces = Isosurfaces( volume, isovalue, screen);
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight * 0.8 ] );
    });

    screen.loop();

    function Display(selector){
        var elm = doc.querySelector(selector);

        _init();

        function _init(){
            setValue(0);
        }

        function setValue(value){
            elm.innerText = value - 0;
        }

        function getValue(){
            return elm.innerText - 0; 
        }

        return {
            setValue:setValue,
            getValue:getValue,
        };
    }
}
