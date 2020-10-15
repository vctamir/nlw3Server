import Orphanage_image from '../models/Orphanage_images';

export default {
    render(orphanage_image: Orphanage_image) {
        return {
            id: orphanage_image.id,
            url: `http://10.1.2.71:3333/uploads/${orphanage_image.path}`,
        }
    },
    renderMany(Orphanage_images: Orphanage_image[]) {
        return Orphanage_images.map(Orphanage_image => this.render(Orphanage_image));

    }
}