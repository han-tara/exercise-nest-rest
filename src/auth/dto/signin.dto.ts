import { ApiProperty } from "@nestjs/swagger";

export class SigninPartDto {
    @ApiProperty({example: 230050})
    id: number
    @ApiProperty({example: 'password123'})
    password: string
}

export class SigninInstDto {
    @ApiProperty({ example: 'inst@inst.com' })
    email: string

    @ApiProperty({ example: '_m8D2fcE3' })
    password: string
}