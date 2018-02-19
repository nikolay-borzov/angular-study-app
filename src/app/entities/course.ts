import { Author } from './author';

export class Course {
  id: number;
  name: string;
  durationMinutes: number;
  createData: Date;
  authors: Author[];

  constructor() {}
}
