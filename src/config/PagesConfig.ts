/* config file for pages */

interface IPageConfigItem {
    id: number, title: string, template: string, url: string
}

interface IPageConfig extends Array<IPageConfigItem>{}

const PagesConfig: IPageConfig = [
    {
        id: 0,
        title: 'Domů',
        template: 'Homepage',
        url: ''
    },
    {
        id: 1,
        title: 'Katalog',
        template: 'Catalog',
        url: 'katalog'
    },
    {
        id: 2,
        title: 'O nás',
        template: 'AboutUs',
        url: 'o-nas'
    }
];

export const CATALOG_PAGE =  'Catalog'

export default PagesConfig;