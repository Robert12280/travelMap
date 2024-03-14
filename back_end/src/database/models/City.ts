import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Tour from "./Tour";

@Table({
    timestamps: false,
    tableName: "cities",
    modelName: "City",
})
class City extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare slug: string;

    @HasMany(() => Tour)
    declare tours: Tour[];
}

export default City;
