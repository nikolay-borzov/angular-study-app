import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const db = {
      users: [
        {
          id: 'q',
          name: 'Mister Q',
          password: 'q'
        }
      ],

      authors: [
        {
          id: 1,
          name: 'Paul Irish'
        },
        {
          id: 2,
          name: 'Douglas Crockford'
        },
        {
          id: 3,
          name: 'Dan Abramov '
        },
        {
          id: 4,
          name: 'Juho Vepsäläinen '
        },
        {
          id: 5,
          name: 'Brendan Eich'
        },
        {
          id: 6,
          name: 'Sindre Sorhus '
        },
        {
          id: 7,
          name: 'John-David Dalton '
        }
      ],

      courses: [
        {
          id: '1',
          name: 'Template video course',
          durationMinutes: '90',
          createData: '02-08-2018',
          authorsIds: [1, 2]
        }
      ]
    };

    return db;
  }
}
