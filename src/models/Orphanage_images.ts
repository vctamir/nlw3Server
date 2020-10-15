import { Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm'
import Orphanage from './Orphanage';

@Entity('orphanage_images')
export default class orphanage_images {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    path: string;
    @ManyToOne(() => Orphanage,orphanage => orphanage.images)
    @JoinColumn({ name: 'orphanage_id' })

    orphanage: Orphanage;

}