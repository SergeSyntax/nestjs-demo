import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value))
      throw new BadRequestException(`"${value}" is an invalid status`);

    return value;
  }

  private isStatusValid(status: string) {
    const idx = this.allowedStatuses.indexOf(status as TaskStatus);
    return idx !== -1;
  }
}
