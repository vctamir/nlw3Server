import { Request,Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import Orphanage_views from '../views/orphanages_view';
import * as Yup from 'yup';


export default {
    async index(req: Request,res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({ relations: ['images'] });
        res.status(201).json(Orphanage_views.renderMany(orphanages));
    },
    async show(req: Request,res: Response) {
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id,{ relations: ['images'] });
        res.status(201).json(Orphanage_views.render(orphanage));
    },
    async create(req: Request,res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,

        } = req.body;
        console.log(req.body)
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends.toLowerCase() === 'true',
            images
        };

        const schema = Yup.object().shape({

            name: Yup.string().required('Nome obrigatorio'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))
        })
console.log('antes validado')
        await schema.validate(data,{
            abortEarly: false,
        })
        const orphanage = orphanagesRepository.create(data);

console.log('validado')
        await orphanagesRepository.save(orphanage);
        res.status(201).json(Orphanage_views.render(orphanage));



    }
};