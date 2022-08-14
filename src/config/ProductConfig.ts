const req = require.context('./products/', false, /.ts$/)

const requiredModules: any = []

req.keys().forEach(key => {
    const strippedName = key.replace('./', '').replace('.ts', '')
    requiredModules.push(strippedName)
});

let allProducts: any = []

requiredModules.forEach(async (name: string) => {
    const config = await import('./products/' + name)
    const content = config.default
    allProducts.push(content)
})

export default allProducts