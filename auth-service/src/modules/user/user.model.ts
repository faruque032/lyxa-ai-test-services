import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  },
})
export class User {
  @ApiProperty({ description: 'User ID', example: '507f1f77bcf86cd799439011' })
  id?: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @prop({ required: true, trim: true })
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @prop({ required: true, select: false })
  password: string;

  @ApiProperty({ description: 'User role', enum: UserRole, example: UserRole.USER })
  @prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({ description: 'Account activation status', example: true })
  @prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Email verification status', example: true })
  @prop({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: 'Last login date', example: '2023-01-01T00:00:00.000Z' })
  @prop()
  lastLoginAt?: Date;

  @ApiProperty({ description: 'Account creation date', example: '2023-01-01T00:00:00.000Z' })
  createdAt?: Date;

  @ApiProperty({ description: 'Account last update date', example: '2023-01-01T00:00:00.000Z' })
  updatedAt?: Date;
}
