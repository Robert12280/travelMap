import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    HasMany,
    BelongsTo,
} from "sequelize-typescript";
import City from "./City";
import TourImage from "./TourImage";

@Table({
    timestamps: true,
    tableName: "tours",
    modelName: "Tour",
})
class Tour extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => City)
    @Column({
        type: DataType.UUID,
    })
    declare city_id: string;

    @BelongsTo(() => City)
    declare city: City;

    @Column({
        type: DataType.STRING,
    })
    declare title: string;

    @Column({
        type: DataType.STRING,
    })
    declare content: string;

    @Column({
        type: DataType.DATEONLY,
    })
    declare date: Date;

    @HasMany(() => TourImage)
    declare images: TourImage[];

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}

export default Tour;
