function change_Isovalue(new_isovalue){
	screen.scene.remove(surfaces);
	surfaces = Isosurfaces(volume, new_isovalue);
	screen.scene.add(surfaces);
}