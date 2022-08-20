/* require all config files in product folder */
const req = require.context('./products/', false, /.ts$/)

const requiredModules: any = []

/* get modules from files */
req.keys().forEach(key => {
    const strippedName = key.replace('./', '').replace('.ts', '')
    requiredModules.push(strippedName)
});

const allProductsArray: any = []

/* extract content from modules and push them to config array */
requiredModules.forEach((name: string) => {
    const config = require('./products/' + name)
    const content = config.default
    allProductsArray.push(content)
})

const allProducts = [...allProductsArray]

/* options for filter select */
export const filterOptions = [
    { value: 'Vše', label: 'Vše' },
    { value: 'Moře', label: 'Moře' },
    { value: 'Stromy', label: 'Stromy' },
    { value: 'Cesty', label: 'Cesty' },
    { value: 'Hory', label: 'Hory' },
    { value: 'Vodní hladiny', label: 'Vodní hladiny' },
    { value: 'Slunce', label: 'Slunce' },
    { value: 'Krajiny', label: 'Krajiny' },
]

/* options for order by select */
export const orderByOptions = [
    { value: ['price', 'desc'], label: 'Nejvyšší ceny' },
    { value: ['price', 'asc'], label: 'Nejnižší ceny' },
    { value: ['popularity', 'desc'], label: 'Oblíbenosti' },
]

export default allProducts