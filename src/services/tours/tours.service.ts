import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class ToursService {
    private toursCount =10;
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {
    }
    generateTours(): void{
        for (let i=0; i<= this.toursCount; i++){
            const tour = new TourDto('test'+i, 'test desc', 'test operator');
            const tourData =  new this.tourModel(tour);
            tourData.save();
        }
    }
    async deleteTours(): Promise<any>{
        return this.tourModel.deleteMany({})
    }
}
