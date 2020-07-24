import { EventEntity } from './Event';
import { StepEntity } from './Step';

interface CategoryEntityArgs {
    id?: number;
    categoryName?: string;
    categoryImg?: string;
    event?: EventEntity[]
    steps_catalogue?: StepEntity[]
}
export class CategoryEntity {
    id: number;
    categoryName: string
    categoryImg: string
    steps_catalogue:StepEntity[]

    constructor(args: CategoryEntityArgs = {}) {
        this.id = args.id;
        this.categoryName = args.categoryName;
        this.categoryImg = args.categoryImg;
        this.steps_catalogue = args.steps_catalogue

    }
}

