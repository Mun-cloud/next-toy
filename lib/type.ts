/**
 * 뉴스 아이템 구조
 */
interface NewsItem {
  /** 뉴스 기사 제목 */
  title: string;
  /** 뉴스 기사 원문의 URL */
  originallink: string;
  /** 네이버 뉴스 URL - 네이버에 제공되지 않는 기사는 원문 URL 반환 */
  link: string;
  /** 뉴스 기사의 내용을 요약한 패시지 정보. 검색어와 일치하는 부분은 <b>태그로 감사져 있음. */
  description: string;
  /** 뉴스 기사가 네이버에 제공된 시간 */
  pubDate: string;
}

/** 뉴스API 호출 결과 구조 */
interface NewsResponse {
  /** 검색 결과를 생성한 시간 */
  lastBuildDate: string;
  /** 총검색 결과 개수 */
  total: number;
  /** 검색 시작 위치 */
  start: number;
  /** 한번에 표시할 검색 결과 개수 */
  display: number;
  /** 개별 검색 결과 */
  items: NewsItem[];
}
