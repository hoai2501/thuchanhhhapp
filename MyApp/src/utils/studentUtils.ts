export const getRank = (gpa: number) => {
  if (gpa >= 8.5) {
    return {
      name: 'Giỏi',
      color: '#16A34A',
      background: '#DCFCE7',
    };
  }

  if (gpa >= 7) {
    return {
      name: 'Khá',
      color: '#2563EB',
      background: '#DBEAFE',
    };
  }

  if (gpa >= 5) {
    return {
      name: 'Trung bình',
      color: '#D97706',
      background: '#FEF3C7',
    };
  }

  return {
    name: 'Yếu',
    color: '#DC2626',
    background: '#FEE2E2',
  };
};