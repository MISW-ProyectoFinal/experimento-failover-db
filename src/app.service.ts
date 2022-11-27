import { Injectable } from '@nestjs/common';
import { Connection, Request } from 'tedious';

@Injectable()
export class AppService {
  connection: Connection;
  // Anti-pattern
  // En el constructor crear conexion a la bd
  getHello(): string {
    const request = new Request(
      'SELECT TOP (10) * FROM [SalesLT].[vGetAllCategories];',
      (err, rowCount) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rowCount + ' rows');
        }
      },
    );

    const response = [];

    request.on('row', function (columns) {
      columns.forEach(function (column) {
        console.log(column.value);
        response.push(column.value);
      });
    });

    this.connection.execSql(request);
    return response.toString();
  }
}
