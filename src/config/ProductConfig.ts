/* require all config files in product folder */
const req = require.context('./products/', false, /.ts$/)

const requiredModules: any = []

/* get modules from files */
req.keys().forEach(key => {
    const strippedName = key.replace('./', '').replace('.ts', '')
    requiredModules.push(strippedName)
});

let allProducts: any = []

/* extract content from modules and push them to config array */
requiredModules.forEach(async (name: string) => {
    const config = await import('./products/' + name)
    const content = config.default
    allProducts.push(content)
})

export default allProducts