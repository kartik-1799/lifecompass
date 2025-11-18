export class CreateLearningPathDto {
  title!: string;
  description!: string;
  category!: string;
  tags?: string[];
  estimatedDuration?: number;
}

export class UpdateLearningPathDto {
  title?: string;
  description?: string;
  category?: string;
  status?: string;
  progress?: number;
}
