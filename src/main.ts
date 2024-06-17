import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Message API')
		.setVersion('1.0')
		.addTag('User')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-doc', app, document);

	await app.listen(configService.get('NEST_PORT'));
}
bootstrap();
