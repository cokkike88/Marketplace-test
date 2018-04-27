export class ShoppingCart{
    constructor(
        public userId: number,
        public invoiceId: number,
        public productId: number,
        public name: string,
        public quantity: number,
        public cost: number,
        public total: number
    ){}
}