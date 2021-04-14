/* Defines the book entity */
export interface Book {
    id: number | null;
    bookName: string;
    bookCode: string;
    description: string;
    starRating: number;
}
