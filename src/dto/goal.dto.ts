export class CreateGoalDto {
  title!: string;
  description!: string;
  category!: string;
  priority?: string;
  targetDate?: Date;
}

export class UpdateGoalDto {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}
