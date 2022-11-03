import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {
    @ApiProperty({example: 'inst@inst.com'})
    email: string

    @ApiProperty({example: '_m8D2fcE3'})
    password: string

    @ApiProperty({example: 'inst101'})
    name: string
}