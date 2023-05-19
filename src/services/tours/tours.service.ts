import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Tour, TourDocument} from "../../shemas/tour";
import {TourDto} from "../../dto/tour-dto";

@Injectable()
export class ToursService {
    private toursCount = 10;// максимальное кол-во генераций записей
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {
    }
    generateTours(): void{
        //генерирует сущности, которые будут в базе данных
        for (let i=0; i<= this.toursCount; i++){
            const tour = new TourDto('test'+i, 'test desc', 'test operator','300'+i);
            const tourData =  new this.tourModel(tour);
            tourData.save();
        }
    }
    async deleteTours(): Promise<any>{
        return this.tourModel.deleteMany({}) //удаляются все записи
    }
}
