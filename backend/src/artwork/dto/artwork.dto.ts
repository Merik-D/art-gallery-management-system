import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
	Length,
	Min,
} from 'class-validator';

export class ArtworkDto {
    @IsString() @Length(1, 99) readonly title: string;
    @IsString() @Length(1, 50) readonly artist: string;

    @IsString()
    @IsIn(['painting', 'sculpture', 'photograph', 'drawing', 'digital', 'other'], {
        message: 'Type must be one of: painting, sculpture, photograph, drawing',
    })
    readonly type: string;

    @IsNumber()
    @Min(0)
    readonly price: number;

    @IsOptional()
    @IsBoolean()
    readonly availability?: boolean;
}
