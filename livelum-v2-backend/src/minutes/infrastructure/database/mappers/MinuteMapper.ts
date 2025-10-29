import { Minute, MinuteProps } from '../../../domain/entities/Minute';
import { MinuteSchemaType } from '../schemas/MinuteSchemaType';

export class MinuteMapper {
  static toPersistence(minute: Minute): MinuteSchemaType {
    const primitives = minute.toPrimitives();
    
    return {
      _id: primitives.id,
      meetingDate: primitives.meetingDate,
      title: primitives.title,
      type: primitives.type,
      status: primitives.status,
      participants: primitives.participants,
      participantIds: primitives.participantIds || [],
      content: primitives.content,
      topics: primitives.topics || [],
      agreements: primitives.agreements || [],
      actionItems: primitives.actionItems || [],
      location: primitives.location,
      duration: primitives.duration,
      nextMeetingDate: primitives.nextMeetingDate,
      attachments: primitives.attachments || [],
      createdBy: primitives.createdBy,
      approvedBy: primitives.approvedBy,
      approvedAt: primitives.approvedAt,
      companyId: primitives.companyId,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }

  static toDomain(schema: MinuteSchemaType): Minute {
    const props: MinuteProps = {
      id: schema._id,
      meetingDate: schema.meetingDate,
      title: schema.title,
      type: schema.type,
      status: schema.status,
      participants: schema.participants,
      participantIds: schema.participantIds,
      content: schema.content,
      topics: schema.topics,
      agreements: schema.agreements,
      actionItems: schema.actionItems,
      location: schema.location,
      duration: schema.duration,
      nextMeetingDate: schema.nextMeetingDate,
      attachments: schema.attachments,
      createdBy: schema.createdBy,
      approvedBy: schema.approvedBy,
      approvedAt: schema.approvedAt,
      companyId: schema.companyId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    };

    return Minute.fromPrimitives(props);
  }
}

