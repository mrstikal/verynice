/* interface for product type */
export default interface IProduct {
    id: number,
    name: string,
    text: string,
    price: number,
    popularity: number,
    categories: string[],
    image: string,
    url: string,
}
