import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import type { Users } from "./Users.js"

@Entity("situations")
export class Situations {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nameSituation!: string

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt!: Date

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt!: Date

    @OneToMany("Users", (user: Users) => user.situation)
    users!: Users[]
}