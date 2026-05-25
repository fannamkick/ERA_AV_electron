export function money(value: number): string {
  return `${value.toLocaleString()} Pt`;
}

export function timeSlotText(label: string): string {
  if (label === 'first half') return '낮';
  if (label === 'second half') return '밤';
  return label;
}

export function playerFacingReason(reason: string | undefined): string | undefined {
  if (!reason) return undefined;
  if (reason.includes('owner must implement') || reason.includes('remaining-feature') || reason.includes('debug owner')) {
    return '아직 사용할 수 없음';
  }
  if (reason.includes('at least one trainable')) return '조교 가능한 여배우 필요';
  if (reason.includes('at least two characters')) return '소속 인원 2명 이상 필요';
  if (reason.includes('mission access')) return '미션 해금 필요';
  if (reason.includes('stylist access')) return '스타일리스트 해금 필요';
  if (reason.includes('dormitory access')) return '기숙사 해금 필요';
  if (reason.includes('first half')) return '낮 시간에만 가능';
  if (reason.includes('ending')) return '엔딩 조건 필요';
  return reason;
}
