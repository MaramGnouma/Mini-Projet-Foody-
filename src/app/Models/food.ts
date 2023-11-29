export class Food {
  constructor(
    public _id: string,
   // public code: string,
    public name: string,
    public price: number,
    public favorite: boolean,
    public stars: number,
    public image: string,
    public origins: string,
    public cookTime: string,
    public starIcons?: any[] // Add this line
  ) {}
}
