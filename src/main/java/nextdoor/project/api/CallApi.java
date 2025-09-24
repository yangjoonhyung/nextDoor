package nextdoor.project.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CallApi {

    // API 호출에 필요한 인증 키
    public static final String AUTH_ENCODING_KEY = "B%2FGbmWQMMx64PzPDKuYN1HE4j9zYbqj0xfA1TRF3R%2FZIQm45fjefGK6ATD0nqGFfeN%2BN2hlr%2FvU7zgNyzOgzyQ%3D%3D";

    // API 호출에 필요한 callBackURL
    public static final String CALL_BACK_URL = "http://apis.data.go.kr/B551011/KorService2/areaBasedList2";

    // API 엔드포인트 URL
    public static final String FOOD_NUTRIENT_URL = "https://apis.data.go.kr/B551011/KorService2";

    // type
    public static final String TYPE = "json";
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final Map<String, Integer> mappingAreaCode = Map.of(
            "서울", 1,
            "인천", 2,
            "대전", 3,
            "대구", 4,
            "광주", 5,
            "부산", 6,
            "경기도", 31,
            "강원도", 32,
            "제주도", 39
    );

    private static final Map<String, String> mappingContentTypeCode = Map.of(
            "전체", "",
            "관광지", "12",
            "음식점", "39",
            "숙박", "32",
            "문화시설", "14"
    );

    // 지역별 관광지 호출 (모든 데이터 가져오기)
    public List<Area> callApi(String mapAreaCode, String mapContentTypeId) {
        return callApiWithPagination(mapAreaCode, mapContentTypeId, true);
    }

    // 페이지네이션으로 모든 데이터 가져오기
    public List<Area> callApiWithPagination(String mapAreaCode, String mapContentTypeId, boolean getAllData) {
        Integer areaCode = mappingAreaCode.get(mapAreaCode);
        String contentTypeId = mappingContentTypeCode.get(mapContentTypeId);
        
        // 디버깅 로그 추가
        System.out.println("입력된 mapAreaCode: '" + mapAreaCode + "'");
        System.out.println("입력된 mapContentTypeId: '" + mapContentTypeId + "'");
        System.out.println("매핑된 areaCode: " + areaCode);
        System.out.println("매핑된 contentTypeId: '" + contentTypeId + "'");

        List<Area> allAreas = new ArrayList<>();
        int pageNo = 1;
        int numOfRows = 50; // 일단 50개씩 받고 나중에는 전부 받기
        
        while (true) {
            StringBuilder urlBuilder = new StringBuilder(CALL_BACK_URL);
            urlBuilder.append("?serviceKey=").append(AUTH_ENCODING_KEY);
            urlBuilder.append("&_type=").append(TYPE);
            
            // contentTypeId가 빈 문자열이 아닐 때만 추가
            if (contentTypeId != null && !contentTypeId.isEmpty()) {
                urlBuilder.append("&contentTypeId=").append(contentTypeId);
            }
            
            urlBuilder.append("&areaCode=").append(areaCode);
            urlBuilder.append("&numOfRows=").append(numOfRows);
            urlBuilder.append("&pageNo=").append(pageNo);
            urlBuilder.append("&MobileApp=AppTest");
            urlBuilder.append("&MobileOS=ETC");
            
            String urlStr = urlBuilder.toString();

            try {
                RestTemplate restTemplate = new RestTemplate();
                URI uri = URI.create(urlStr);
                String response = restTemplate.getForObject(uri, String.class);
                
                // API 응답 로그 출력
                System.out.println("API URL (페이지 " + pageNo + "): " + urlStr);
                System.out.println("API 응답 (처음 500자): " + (response != null ? response.substring(0, Math.min(500, response.length())) : "null"));
                
                // 응답이 HTML인지 확인
                if (response != null && response.trim().startsWith("<")) {
                    System.out.println("API 응답이 HTML입니다. API 키나 URL을 확인해주세요.");
                    System.out.println("전체 응답: " + response);
                    break;
                }

                JsonNode root = objectMapper.readTree(response);
                JsonNode itemsNode = root.path("response").path("body").path("items");
                
                // items가 빈 문자열이거나 null인지 확인
                if (itemsNode.isTextual() && itemsNode.asText().isEmpty()) {
                    System.out.println("페이지 " + pageNo + "에서 더 이상 데이터가 없습니다. (items가 빈 문자열)");
                    break;
                }
                
                JsonNode itemNode = itemsNode.path("item");
                
                // item이 존재하지 않거나 빈 배열인지 확인
                if (itemNode.isMissingNode() || itemNode.isNull() || (itemNode.isArray() && itemNode.size() == 0)) {
                    System.out.println("페이지 " + pageNo + "에서 더 이상 데이터가 없습니다. (item이 없음)");
                    break;
                }
                
                // 현재 페이지의 데이터 가져오기
                List<Area> currentPageAreas = objectMapper.readValue(itemNode.toString(), new TypeReference<List<Area>>() {});
                
                if (currentPageAreas.isEmpty()) {
                    System.out.println("페이지 " + pageNo + "에서 더 이상 데이터가 없습니다.");
                    break;
                }
                
                allAreas.addAll(currentPageAreas);
                System.out.println("페이지 " + pageNo + "에서 " + currentPageAreas.size() + "개 데이터 수집. 총 " + allAreas.size() + "개");
                
                // 모든 데이터를 가져오는 경우가 아니면 첫 페이지만 가져오고 종료
                if (!getAllData) {
                    break;
                }
                
                pageNo++;
                
                // 무한 루프 방지 (최대 50페이지)
                if (pageNo > 50) {
                    System.out.println("최대 페이지 수(50)에 도달했습니다.");
                    break;
                }
                
            } catch (Exception e) {
                System.out.println("API 호출 에러 (페이지 " + pageNo + "): " + e.getMessage());
                e.printStackTrace();
                break;
            }
        }
        
        System.out.println("총 " + allAreas.size() + "개의 데이터를 수집했습니다.");
        return allAreas;
    }
}
