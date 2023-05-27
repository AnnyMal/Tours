import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ToursService} from "../../services/tours/tours.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {ITourClient} from "../../interfaces/tour";

@Controller('tour-item')
export class TourItemController {
    constructor(private tourService: ToursService) {}
        static imgName: string;

    @Post()
    @UseInterceptors(FileInterceptor('img', {

        storage: diskStorage({
            destination: './public/', //раздел
            //логика для формирования имени файла
            filename(req,file,cb) {

                const imgType = file.mimetype.split('/')
                const uniqueSuffix = Date.now() +'-' + Math.round(Math.random()* 1E9);

               const imgName = file.filename + '-' +uniqueSuffix + '.' +imgType[1];

               cb(null,imgName);

                TourItemController.imgName = imgName;//запись статичного св-ва класса
            }
        })
}))
        initTours(@Body() body: ITourClient): void {
        body.img = TourItemController.imgName;
        this.tourService.uploadTour(body);
    }



}
