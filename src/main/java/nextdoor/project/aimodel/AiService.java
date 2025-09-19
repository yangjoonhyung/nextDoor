package nextdoor.project.aimodel;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AiService {

    private final WebClient webClient = WebClient.create("http://34.64.124.211:8000");

    public Mono<AiResponse> sendPlan(AiRequest request) {
        return webClient.post()
                .uri("/optimize_vrptw_dynamic") // AI 팀이 준 엔드포인트
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AiResponse.class) // 응답을 String으로 받거나 DTO로 매핑
                .doOnNext(res -> System.out.println("AI Response: " + res))
                .doOnError(err -> System.out.println("AI Error: " + err.getMessage()));
    }

    public Mono<AiResponse> getPlan(AiRequest request) {
        return webClient.post()
                .uri("/optimize_vrptw_dynamic") // AI 서버 엔드포인트
                .bodyValue(request) // JSON 직렬화해서 전송
                .retrieve()
                .bodyToMono(AiResponse.class) // 응답 JSON → DTO 매핑
                .doOnNext(res -> System.out.println("AI Response: " + res))
                .doOnError(err -> System.out.println("AI Error: " + err.getMessage()));
    }
}
