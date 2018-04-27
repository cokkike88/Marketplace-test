export class ShoppingCart{
    constructor(
        public userId: number,
        public productId: number,
        public name: string,
        public quantity: number
    ){}
}