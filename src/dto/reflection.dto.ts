export class CreateReflectionDto {
  title!: string;
  content!: string;
  mood?: string;
  tags?: string[];
  isPrivate?: boolean;
}

export class UpdateReflectionDto {
  title?: string;
  content?: string;
  mood?: string;
  isPrivate?: boolean;
}
