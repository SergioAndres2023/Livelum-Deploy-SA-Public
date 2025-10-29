import { Skill, SkillProps } from '../../../domain/entities/Skill';
import { SkillSchemaType } from '../schemas/SkillSchemaType';

export class SkillMapper {
  static toPersistence(skill: Skill): SkillSchemaType {
    const primitives = skill.toPrimitives();
    
    return {
      _id: primitives.id,
      number: primitives.number,
      title: primitives.title,
      description: primitives.description,
      category: primitives.category,
      status: primitives.status,
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: SkillSchemaType): Skill {
    const props: SkillProps = {
      id: schema._id,
      number: schema.number,
      title: schema.title,
      description: schema.description,
      category: schema.category,
      status: schema.status,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Skill.fromPrimitives(props);
  }
}
