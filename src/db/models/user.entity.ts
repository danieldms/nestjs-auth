import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
const bcrypt = require('bcrypt');

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
      unique: true
    })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
      const salt = bcrypt.genSaltSync(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    
    @Column({
      nullable: true
    })
    remember_token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}