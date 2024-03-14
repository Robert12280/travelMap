import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
} from "sequelize-typescript";
import Tour from "./Tour";

@Table({
    timestamps: false,
    tableName: "tour_images",
    modelName: "TourImage",
})
class TourImage extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => Tour)
    @Column({
        type: DataType.UUID,
    })
    declare tour_id: string;

    @Column({
        type: DataType.STRING,
    })
    declare img_name: string;
}

export default TourImage;
