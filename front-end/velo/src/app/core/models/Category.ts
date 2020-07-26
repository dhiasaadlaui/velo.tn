import { EventEntity } from './Event';
import { StepEntity } from './Step';

interface CategoryEntityArgs {
    id?: number;
    category_name?: string;
    category_img?: string;
    event?: EventEntity[]
    step?: StepEntity
}
export class CategoryEntity {
    id: number;
    category_name: string
    category_img: string
    step: StepEntity

    constructor(args: CategoryEntityArgs = {}) {
        this.id = args.id;
        this.category_name = args.category_name;
        this.category_img = args.category_img;
        this.step = args.step

    }
}

