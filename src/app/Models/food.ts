export class Food {
  constructor(
    public _id: string,
    public name: string,
    public price: number,
    public favorite: boolean,
    public stars: number,
    public image: string,
    public origins: string,
    public cookTime: string,
    public type:String,
    public starIcons?: any[] // Add this line
  ) {}
}
