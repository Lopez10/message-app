import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: ['amqp://localhost:5672'],
			queue: 'notifications_queue',
			queueOptions: {
				durable: false,
			},
		},
	});

	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Message API')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-doc', app, document);

	await app.startAllMicroservices();
	await app.listen(configService.get('NEST_PORT'));
}
bootstrap();
