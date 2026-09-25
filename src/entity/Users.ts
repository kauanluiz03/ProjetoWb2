import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import type { Situations } from "./Situations.js"

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @ManyToOne("Situations", (situations: Situations) => situations.users)
    @JoinColumn({ name: "situation_id" })
    situation!: Situations

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt!: Date

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt!: Date
}