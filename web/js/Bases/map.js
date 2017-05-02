function createNormalmapShaderMaterial(diffuseMap, normalMap) {
    var shader = THREE.ShaderLib["normalmap"];
    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    var dT = THREE.ImageUtils.loadTexture(diffuseMap);
    var nT = THREE.ImageUtils.loadTexture(normalMap);

    uniforms["uShininess"].value = 50;
    uniforms["enableDiffuse"].value = true;
    uniforms["uDiffuseColor"].value.setHex(0xffffff);
    uniforms["tDiffuse"].value = dT;
    uniforms["tNormal"].value = nT;

    uniforms["uNormalScale"].value.set(1, 1);
    uniforms["uSpecularColor"].value.setHex(0xffffff);
    uniforms["enableSpecular"].value = true;

    return new THREE.ShaderMaterial(
    {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: uniforms,
        lights: true
    });
}