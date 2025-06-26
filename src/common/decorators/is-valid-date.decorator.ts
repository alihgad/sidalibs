import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsStartDateNotPast', async: false })
export class IsStartDateNotPast implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value) return true;
    
    const obj = args.object as any;
    const startDate = new Date(value);
    const now = new Date();
    
    // If start date is today, check if start time has passed
    if (startDate.toDateString() === now.toDateString()) {
      const [startHours, startMinutes] = obj.startTime.split(':').map(Number);
      const startTimeInMinutes = startHours * 60 + startMinutes;
      
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      
      return startTimeInMinutes > currentTimeInMinutes;
    }
    
    // If different day, just compare dates
    startDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    return startDate.getTime() >= now.getTime();
  }

  defaultMessage() {
    return 'Start time cannot be in the past';
  }
}

@ValidatorConstraint({ name: 'IsEndDateAfterStartDate', async: false })
export class IsEndDateAfterStartDate implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value) return true;
    
    const obj = args.object as any;
    if (!obj.startDate) return true;
    
    const endDate = new Date(value);
    const startDate = new Date(obj.startDate);
    const now = new Date();
    
    // If end date is today, check if end time has passed
    if (endDate.toDateString() === now.toDateString()) {
      const [endHours, endMinutes] = obj.endTime.split(':').map(Number);
      const endTimeInMinutes = endHours * 60 + endMinutes;
      
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      
      if (endTimeInMinutes <= currentTimeInMinutes) {
        return false;
      }
    }
    
    // If dates are different, just compare dates
    if (endDate.toDateString() !== startDate.toDateString()) {
      return endDate.getTime() > startDate.getTime();
    }
    
    // If same day, compare times
    const [startHours, startMinutes] = obj.startTime.split(':').map(Number);
    const [endHours, endMinutes] = obj.endTime.split(':').map(Number);
    
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;
    
    return endTimeInMinutes > startTimeInMinutes;
  }

  defaultMessage() {
    return 'End time must be after start time and cannot be in the past';
  }
}
