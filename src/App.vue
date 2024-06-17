<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement>()

function resize() {
    canvasRef.value!.width = window.innerWidth
    canvasRef.value!.height = window.innerHeight
    const ctx = canvasRef.value!.getContext('webgl2')
    if (!ctx) {
        throw new Error('webgl2 not supported')
    }
    ctx.viewport(0, 0, window.innerWidth, window.innerHeight)
}

onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
    const ctx = canvasRef.value!.getContext('webgl2')
    if (!ctx) {
        throw new Error('webgl2 not supported')
    }

    const vao = ctx.createVertexArray()
    const vbo = ctx.createBuffer()
    const program = ctx.createProgram()
    const vs = ctx.createShader(ctx.VERTEX_SHADER)
    const fs = ctx.createShader(ctx.FRAGMENT_SHADER)
    if (!vs || !fs || !program || !vao || !vbo) {
        throw new Error('creates required resources failed !')
    }
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vbo)
    ctx.bufferData(
        ctx.ARRAY_BUFFER,
        new Float32Array([-0.5, -0.5, 0, 0, 0.5, 0, 0.5, -0.5, 0]),
        ctx.STATIC_DRAW
    )
    ctx.bindVertexArray(vao)
    ctx.shaderSource(
        vs,
        `
attribute vec3 pos;
void main() {
    gl_Position = vec4(pos, 1.0);
}`
    )
    ctx.shaderSource(
        fs,
        `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`
    )
    ctx.compileShader(vs)
    ctx.compileShader(fs)
    ctx.attachShader(program, vs)
    ctx.attachShader(program, fs)
    ctx.linkProgram(program)
    ctx.useProgram(program)
    const location = ctx.getAttribLocation(program, 'pos')
    ctx.enableVertexAttribArray(location)
    ctx.vertexAttribPointer(location, 3, ctx.FLOAT, false, 0, 0)

    function draw() {
        ctx!.drawArrays(ctx!.TRIANGLES, 0, 3)
        requestAnimationFrame(draw)
    }
    draw()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
})
</script>

<template>
    <canvas ref="canvasRef" class="size-full"></canvas>
</template>

<style lang="sass"></style>
