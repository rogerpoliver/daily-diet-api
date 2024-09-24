import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';

import { AuthenticateService } from '../authenticate.service';

export function makeAuthenticateUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const useCase = new AuthenticateService(usersRepository);

	return useCase;
}
