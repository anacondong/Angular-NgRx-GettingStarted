import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Product } from '../products/product';
import { Book } from '../books/book';
import { Member } from '../members/member';

export class InitData implements InMemoryDbService {

    createDb() {
        const books: Book[] = [
            {
                id: 1,
                bookName: 'Leaf Rake',
                bookCode: 'GDN-0011',
                description: 'Leaf rake with 48-inch wooden handle',
                starRating: 3.2
            },
            {
                id: 2,
                bookName: 'Garden Cart',
                bookCode: 'GDN-0023',
                description: '15 gallon capacity rolling garden cart',
                starRating: 4.2
            },
            {
                id: 5,
                bookName: 'Hammer',
                bookCode: 'TBX-0048',
                description: 'Curved claw steel hammer',
                starRating: 4.8
            },
            {
                id: 8,
                bookName: 'Saw',
                bookCode: 'TBX-0022',
                description: '15-inch steel blade hand saw',
                starRating: 3.7
            },
            {
                id: 10,
                bookName: 'Video Game Controller',
                bookCode: 'GMG-0042',
                description: 'Standard two-button video game controller',
                starRating: 4.6
            }
        ];

        const products: Product[] = [
            {
                id: 1,
                productName: 'Leaf Rake',
                productCode: 'GDN-0011',
                description: 'Leaf rake with 48-inch wooden handle',
                starRating: 3.2
            },
            {
                id: 2,
                productName: 'Garden Cart',
                productCode: 'GDN-0023',
                description: '15 gallon capacity rolling garden cart',
                starRating: 4.2
            },
            {
                id: 5,
                productName: 'Hammer',
                productCode: 'TBX-0048',
                description: 'Curved claw steel hammer',
                starRating: 4.8
            },
            {
                id: 8,
                productName: 'Saw',
                productCode: 'TBX-0022',
                description: '15-inch steel blade hand saw',
                starRating: 3.7
            },
            {
                id: 10,
                productName: 'Video Game Controller',
                productCode: 'GMG-0042',
                description: 'Standard two-button video game controller',
                starRating: 4.6
            }
        ];

        const members: Member[] = [
            {
                id: 1,
                memberName: 'memberName',
                memberCode: 'memberCode',
                description: 'description',
                starRating: 0.0,
                name: 'name',
                email: 'email',
                password: 'password',
            }
        ];
        return { products, books, members };
    }
}
