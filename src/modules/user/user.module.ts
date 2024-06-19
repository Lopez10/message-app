import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserMongoRepository } from './infrastructure/user.mongo.repository';
import { UserRepositoryPortSymbol } from './domain/user.repository.port';
@Module({
	controllers: [],
	providers: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserMongoRepository,
		},
		UserMongoRepository,
	],
	exports: [
		{
			provide: UserRepositoryPortSymbol,
			useClass: UserMongoRepository,
		},
		UserMongoRepository,
	],
	imports: [PrismaModule],
})
export class UserModule {}
