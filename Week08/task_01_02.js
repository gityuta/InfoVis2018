function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ], // 2
        [  0,  0, 0 ],
        [  1,  1, 0 ]
    ];

    var faces = [
        [ 0, 1, 3 ],
        [ 1, 2, 3 ],
        [ 2, 4, 3 ],
        [ 3, 4, 0 ]

    ];

    var scalars = [
        0.1,
        0.2,
        0.8,
        0.45,
        0.2
    ]

    var scalar_max = 0.8;
    var scalar_min = 0.1;

    // Create a color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }

    // Draw the color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    material.vertexColors = THREE.VertexColors;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var S0 = scalar_normalization(scalars[ id[0] ]);
        var S1 = scalar_normalization(scalars[ id[1] ]);
        var S2 = scalar_normalization(scalars[ id[2] ]);
        var C0 = new THREE.Color().setHex( cmap[ S0 ][1] );
        var C1 = new THREE.Color().setHex( cmap[ S1 ][1] );
        var C2 = new THREE.Color().setHex( cmap[ S2 ][1] );
        geometry.faces[i].vertexColors.push( C0 );
        geometry.faces[i].vertexColors.push( C1 );
        geometry.faces[i].vertexColors.push( C2 );
    }

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }

    function scalar_normalization(num)
    {
        var normal_num = (num - scalar_min) * 255 / (scalar_max - scalar_min);
        return Math.round(normal_num);
    }
}