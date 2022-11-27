import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection, Request } from 'tedious';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const response = await this.getHello2();
    return response;
  }

  @Get('2')
  getHello3() {
    return 'Crashed';
  }

  getHello2(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const config = {
        server: '<ServerName>', //update me
        authentication: {
          type: 'default',
          options: {
            userName: 'Administrador', //update me
            password: '<Password>', //update me
          },
        },
        options: {
          // If you are on Microsoft Azure, you need encryption:
          encrypt: true,
          database: 'experimento-failover-db', //update me
        },
      };
      let connection: Connection;
      try {
        connection = new Connection(config);
      } catch {
        console.log('Error But no crash');
        resolve(['Error']);
      }

      const request = new Request(
        'SELECT TOP (10) * FROM [SalesLT].[vGetAllCategories];',
        (err, rowCount) => {
          if (err) {
            console.log(err);
          } else {
            console.log(rowCount + ' rows');
            resolve(response);
          }
        },
      );
      connection.on('connect', function (err) {
        // If no error, then good to proceed.
        if (err) {
          console.log(err);
          console.log('Hubo un error en la conexion, por favor no crashear');
          reject(['Error']);
          return;
        }
        console.log('Connected');
        connection.execSql(request);
      });

      connection.connect();

      const response = [];

      request.on('row', function (columns) {
        const obj = {};
        columns.forEach(function (column) {
          obj[column.metadata.colName] = column.value;
        });
        console.log(obj);
        response.push(obj);
      });

      request.on('done', function () {
        console.log('Done');
        console.log(response.toString());
        connection.close();
        return response;
      });
    });
  }
}
