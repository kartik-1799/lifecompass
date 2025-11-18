export class CreateContentDto {
  title!: string;
  description!: string;
  type!: string;
  url?: string;
  author!: string;
  category!: string;
  tags?: string[];
}

export class UpdateContentDto {
  title?: string;
  description?: string;
  type?: string;
  difficulty?: string;
}
