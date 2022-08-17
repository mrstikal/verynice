/* config file for pages */

interface IPageConfigItem {
    id: number, title: string, templage: string
}

interface IPageConfig extends Array<IPageConfigItem>{}

const PagesConfig: IPageConfig = [
    {
        id: 0,
        title: 'Domů',
        templage: 'Homepage'
    },
    {
        id: 1,
        title: 'Katalog',
        templage: 'Catalog'
    },
    {
        id: 2,
        title: 'O nás',
        templage: 'AboutUs'
    }
];

export default PagesConfig;