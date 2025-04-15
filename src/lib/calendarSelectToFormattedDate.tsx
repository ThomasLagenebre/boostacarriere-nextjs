export const calendarSelectToFormattedDate = (selectedDate: Date, selectedHour: string) => {
    const planedTo = new Date(selectedDate);
      const [hour, minute] = selectedHour.split(':');
      planedTo.setHours(parseInt(hour), parseInt(minute));
      return `${planedTo.getFullYear()}-${(planedTo.getMonth() + 1).toString().padStart(2, '0')}-${planedTo.getDate().toString().padStart(2, '0')} ${planedTo.getHours().toString().padStart(2, '0')}:${planedTo.getMinutes().toString().padStart(2, '0')}:00`;
}