import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Message API')
		.setVersion('1.0')
		.addTag('User')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-doc', app, document);

	await app.listen(process.env.NEST_PORT || 3000);
}
bootstrap();
