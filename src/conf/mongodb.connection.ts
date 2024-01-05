// import { MongooseModule } from '@nestjs/mongoose';

// export default MongooseModule.forRootAsync({
//   useFactory: () => ({
//     connectionFactory: (connection) => {
//       if (connection.readyState === 1) {
//         console.log('Database Connected successfully');
//       }
//       connection.on('disconnected', () => {
//         console.log('Database disconnected');
//       });
//       connection.on('error', (error: any) => {
//         console.log('Database connection failed! for error: ', error);
//       });

//       return connection;
//     },
//     uri: 'mongodb://localhost:27017/blog',
//   }),
// });
