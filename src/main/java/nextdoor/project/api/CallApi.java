package nextdoor.project.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    private static final Map<String, Integer> mappingContentTypeCode = Map.of(
            "관광지", 12,
            "음식점", 39,
            "숙박", 32,
            "문화시설", 14
    );

    // 지역별 관광지 호출
    public List<Area> callApi(String mapAreaCode, String mapContentTypeId) {

        Integer areaCode = mappingAreaCode.get(mapAreaCode);
        Integer contentTypeId = mappingContentTypeCode.get(mapContentTypeId);

        String urlStr = CALL_BACK_URL +
                "?serviceKey=" + AUTH_ENCODING_KEY +
                "&_type=" + TYPE +
                "&contentTypeId=" + contentTypeId +
                "&areaCode=" + areaCode +
                "&MobileApp=AppTest" +
                "&MobileOS=ETC";

        try {
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(urlStr, String.class);

            JsonNode root = objectMapper.readTree(response);
            JsonNode itemsNode = root.path("response").path("body").path("items").path("item");

            return objectMapper.readValue(itemsNode.toString(), new TypeReference<List<Area>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // 예외 발생 시 빈 리스트 반환
        }
    }
}
