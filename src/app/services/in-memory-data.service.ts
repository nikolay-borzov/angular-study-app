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
          id: 1,
          name: 'Lorem course',
          durationMinutes: 180,
          createData: '2018-02-08',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis sapien at magna lacinia pharetra. Maecenas ac lorem semper, sagittis justo non, semper felis. Vestibulum elementum lacus eget laoreet imperdiet. Vestibulum sem dui, posuere sit amet bibendum et, mattis eu ante. Ut urna eros, luctus eu imperdiet id, laoreet id leo. Sed placerat odio sed erat viverra, eget interdum lorem aliquet. Suspendisse quis elit in arcu venenatis facilisis ut in justo. Maecenas efficitur tortor dui, nec iaculis odio congue rutrum. Nullam aliquet lorem sed urna placerat, sed pharetra dolor ullamcorper. Aenean dapibus odio quis mollis congue. In ut suscipit quam, a ultrices tellus. Sed tincidunt ante turpis, vel tincidunt metus porttitor vel.',
          authorsIds: [1, 2]
        },
        {
          id: 2,
          name: 'Ipsum course',
          durationMinutes: 90,
          createData: '2017-12-31',
          authorsIds: [1, 2]
        },
        {
          id: 3,
          name: 'Dolor course',
          durationMinutes: 61,
          createData: '2016-07-06',
          authorsIds: [1, 2]
        },
        {
          id: 4,
          name: 'Sit course',
          durationMinutes: 35,
          createData: '2018-03-05',
          authorsIds: [1, 2]
        }
      ]
    };

    return db;
  }
}
