import { container } from 'tsyringe';
import { DependencyIdentifier } from '@/cross-cutting/domain/dependencyIdentifier/DependencyIdentifier';
import { PersonDependencyIdentifier } from '../../domain/dependencyIdentifier/PersonDependencyIdentifier';

import { PersonRepository } from '../../domain/contracts/PersonRepository';
import { PersonMongoRepository } from '../database/repositories/PersonMongoRepository';

import { CreatePersonUseCase } from '../../application/useCases/CreatePersonUseCase';
import { FindPersonByIdUseCase } from '../../application/useCases/FindPersonByIdUseCase';
import { SearchPeopleUseCase } from '../../application/useCases/SearchPeopleUseCase';
import { UpdatePersonUseCase } from '../../application/useCases/UpdatePersonUseCase';
import { DeletePersonUseCase } from '../../application/useCases/DeletePersonUseCase';
import { ChangePersonStatusUseCase } from '../../application/useCases/ChangePersonStatusUseCase';
import { AssignPositionsUseCase } from '../../application/useCases/AssignPositionsUseCase';

export class PersonContainer {
  static initialize(): void {
    container.register<PersonRepository>(PersonDependencyIdentifier.PersonRepository, {
      useClass: PersonMongoRepository,
    });

    container.register(PersonDependencyIdentifier.CreatePersonUseCase, {
      useFactory: (c) =>
        new CreatePersonUseCase(
          c.resolve<PersonRepository>(PersonDependencyIdentifier.PersonRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(PersonDependencyIdentifier.FindPersonByIdUseCase, {
      useFactory: (c) =>
        new FindPersonByIdUseCase(
          c.resolve<PersonRepository>(PersonDependencyIdentifier.PersonRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(PersonDependencyIdentifier.SearchPeopleUseCase, {
      useFactory: (c) =>
        new SearchPeopleUseCase(
          c.resolve<PersonRepository>(PersonDependencyIdentifier.PersonRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(PersonDependencyIdentifier.UpdatePersonUseCase, {
      useFactory: (c) =>
        new UpdatePersonUseCase(
          c.resolve<PersonRepository>(PersonDependencyIdentifier.PersonRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(PersonDependencyIdentifier.DeletePersonUseCase, {
      useFactory: (c) =>
        new DeletePersonUseCase(
          c.resolve<PersonRepository>(PersonDependencyIdentifier.PersonRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(PersonDependencyIdentifier.ChangePersonStatusUseCase, {
      useFactory: (c) =>
        new ChangePersonStatusUseCase(
          c.resolve<PersonRepository>(PersonDependencyIdentifier.PersonRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });

    container.register(PersonDependencyIdentifier.AssignPositionsUseCase, {
      useFactory: (c) =>
        new AssignPositionsUseCase(
          c.resolve<PersonRepository>(PersonDependencyIdentifier.PersonRepository),
          c.resolve(DependencyIdentifier.Logger)
        ),
    });
  }
}

