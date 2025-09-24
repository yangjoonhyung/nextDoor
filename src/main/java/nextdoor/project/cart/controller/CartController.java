package nextdoor.project.cart.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import nextdoor.project.aimodel.AiRequest;
import nextdoor.project.aimodel.AiResponse;
import nextdoor.project.aimodel.AiService;
import nextdoor.project.api.Area;
import nextdoor.project.api.CallApi;
import nextdoor.project.cart.Cart;
import nextdoor.project.cart.repository.CartRepository;
import nextdoor.project.cart.service.CartService;
import nextdoor.project.tripplan.ConfirmTrip;
import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.tripplan.repository.ConfirmTripRepository;
import nextdoor.project.tripplan.repository.TripPlanRepository;
import nextdoor.project.tripplan.service.TripPlanService;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final CallApi callApi;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final AiService aiService;
    private final TripPlanRepository tripPlanRepository;
    private final ConfirmTripRepository confirmTripRepository;
    private final TripPlanService tripPlanService;

    private final Map<Integer, String> mappingDate = Map.of(
            1, "월요일",
            2, "화요일",
            3, "수요일",
            4, "목요일",
            5, "금요일",
            6, "토요일",
            7, "일요일"
    );

    @GetMapping
    public String setDestination(@RequestParam String destination, HttpSession httpSession, Model model) {
        String userId = (String) httpSession.getAttribute("userId");
        TripPlan tripPlan = new TripPlan();
        tripPlan.setDestination(destination);
        model.addAttribute("tripPlan", tripPlan);
        return "";
    }

    /**
     * 여기 수정
     */
    @PostMapping("/{tripPlanId}")
    @ResponseBody
    public String setPlan(@PathVariable Long tripPlanId,
                          @RequestParam Integer startYear,
                          @RequestParam Integer startMonth,
                          @RequestParam Integer startDay,
                          @RequestParam Integer finishYear,
                          @RequestParam Integer finishMonth,
                          @RequestParam Integer finishDay,
                          @RequestParam String destination,
                          HttpSession session,
                          Model model
    ) {
        try {
            System.out.println("=== CartController.setPlan 시작 ===");
            System.out.println("tripPlanId: " + tripPlanId);
            System.out.println("destination: " + destination);

            // TripPlan 찾기 또는 생성 (사용자 없이도 가능)
            System.out.println("TripPlan 찾기 시작");
            TripPlan findTrip = tripPlanRepository.findById(tripPlanId);
            System.out.println("findTrip: " + findTrip);

            if (findTrip == null) {
                System.out.println("새 TripPlan 생성");
                // TripPlan이 없으면 새로 생성
                findTrip = new TripPlan();

                // 로그인한 사용자 정보 가져오기
                String userId = (String) session.getAttribute("userId");
                if (userId != null) {
                    User user = userRepository.findById(userId);
                    findTrip.setUser(user);
                    System.out.println("사용자 정보 설정: " + userId);
                } else {
                    findTrip.setUser(null);
                    System.out.println("로그인하지 않은 사용자");
                }

                findTrip.setDestination(destination); // 프론트엔드에서 전달받은 목적지
                findTrip.setTitle(startYear + "년 " + startMonth + "월 " + startDay + "일 " + destination + " 여행"); // 제목 설정

                // 먼저 저장하여 ID 생성
                TripPlan tempSaved = tripPlanRepository.save(findTrip);
                findTrip = tempSaved;
                System.out.println("임시 저장 완료, ID: " + findTrip.getTripPlanID());
            }

            System.out.println("날짜 설정 시작");
            LocalDate startDate = tripPlanService.setStartDate(startYear, startMonth, startDay);
            LocalDate finishDate = tripPlanService.setFinishDate(finishYear, finishMonth, finishDay);

            findTrip.setStartDate(startDate);
            findTrip.setFinishDate(finishDate);
            System.out.println("TripPlan 저장 시작");
            TripPlan savedTrip = tripPlanRepository.save(findTrip); // 변경사항 저장
            System.out.println("저장 완료: " + savedTrip.getTripPlanID());
            return "{\"success\": true, \"tripPlanId\": " + savedTrip.getTripPlanID() + "}"; // 성공 응답과 ID 반환
        } catch (Exception e) {
            System.out.println("에러 발생: " + e.getMessage());
            e.printStackTrace();
            return "error: " + e.getMessage();
        }
    }

    /**
     * 여기 수정
     */
    // 장바구니 목록
    @GetMapping("/list/{tripPlanId}")
    @ResponseBody
    public String cartList(@PathVariable Long tripPlanId, @RequestParam String type, HttpSession session, Model model) {
        try {
            System.out.println("=== cartList 시작 ===");
            System.out.println("tripPlanId: " + tripPlanId);
            System.out.println("type: " + type);

            String userId = (String) session.getAttribute("userId");
            System.out.println("userId: " + userId);

            // 로그인하지 않은 사용자는 접근 불가
            if (userId == null) {
                System.out.println("로그인하지 않은 사용자 접근 시도");
                return "{\"success\": false, \"error\": \"로그인이 필요합니다\", \"redirect\": \"/login\"}";
            }

            List<Cart> cart = cartService.getCart(userId);
            if (cart != null) {
                model.addAttribute("cartItems", cart);
            }

            System.out.println("TripPlan 찾기 시작");
            TripPlan findTrip = tripPlanRepository.findById(tripPlanId);
            System.out.println("findTrip: " + findTrip);

            if (findTrip == null) {
                System.out.println("TripPlan이 없습니다!");
                return "{\"success\": false, \"error\": \"TripPlan을 찾을 수 없습니다\"}";
            }

            String destination = findTrip.getDestination();
            System.out.println("destination: " + destination);

            System.out.println("API 호출 시작");
            List<Area> areaList = callApi.callApi(destination, type);
            System.out.println("API 호출 완료, areaList 크기: " + (areaList != null ? areaList.size() : "null"));

            // JSON 응답을 위한 간단한 문자열 반환 (실제로는 JSON 라이브러리 사용 권장)
            StringBuilder jsonResponse = new StringBuilder();
            jsonResponse.append("{\"success\": true, \"areaList\": [");

            if (areaList != null && !areaList.isEmpty()) {
                for (int i = 0; i < areaList.size(); i++) {
                    Area area = areaList.get(i);
                    if (i > 0) jsonResponse.append(",");
                    jsonResponse.append("{")
                            .append("\"contentId\": \"").append(escapeJson(area.getContentid())).append("\",")
                            .append("\"title\": \"").append(escapeJson(area.getTitle())).append("\",")
                            .append("\"addr1\": \"").append(escapeJson(area.getAddr1())).append("\",")
                            .append("\"firstImage\": \"").append(escapeJson(area.getFirstimage())).append("\",")
                            .append("\"contentTypeId\": \"").append(escapeJson(area.getContenttypeid())).append("\"")
                            .append("}");
                }
            }

            jsonResponse.append("], \"tripPlanId\": ").append(tripPlanId).append("}");
            return jsonResponse.toString();
        } catch (Exception e) {
            System.out.println("cartList 에러 발생: " + e.getMessage());
            e.printStackTrace();
            return "{\"success\": false, \"error\": \"" + e.getMessage() + "\"}";
        }
    }

    @PostMapping("/add/area/{contentId}")
    public String addCart(HttpSession session, @PathVariable String contentId){
        String userId = (String) session.getAttribute("userId");

        cartService.addCart(userId, contentId);
        return "redirect:/cart/list";
    }

    // 삭제
    @PostMapping("/remove/{contentId}")
    public String removeFromCart(@PathVariable String contentId, HttpSession session) {
        String userId = (String) session.getAttribute("loginUserId");
        cartService.removeCart(userId, contentId);
        return "redirect:/cart/list";
    }

    @PostMapping("/set-plan/{tripPlanId}")
    public String setPlan(@PathVariable Long tripPlanId, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        User findUser = userRepository.findById(userId);
        TripPlan tripPlan = tripPlanRepository.findById(tripPlanId);

        List<Cart> carts = cartService.getCart(userId);
        for (Cart cart : carts) {
            if (cart.getTripPlan() == null) {
                cart.setTripPlan(tripPlan);
            }
        }

        int startDay = tripPlan.getStartDate().getDayOfWeek().getValue();
        int finishDay = tripPlan.getFinishDate().getDayOfWeek().getValue();
        ArrayList<String> tripDays = new ArrayList<>();
        for (int i = startDay; i <= finishDay; i++) {
            String tripDate = mappingDate.get(i);
            tripDays.add(tripDate);
        }

        // AI 팀에 넘길 정보들
        List<Cart> sendList = cartRepository.findByTripPlanId(tripPlan);
        ArrayList<Long> contentIds = new ArrayList<>(); // 전송
        for (Cart cart : sendList) {
            contentIds.add(cart.getId());
        }

        List<AiRequest.DaySchedule> days = new ArrayList<>(); // 전송
        for (String tripDay : tripDays) {
            AiRequest.DaySchedule mon = new AiRequest.DaySchedule(tripDay);
            days.add(mon);
        }

        AiRequest aiRequest = new AiRequest(contentIds, days);
        AiResponse aiResponse = aiService.sendPlan(aiRequest).block();

        List<AiResponse.ByDay> byDayList = aiResponse.getByDay();
        for (AiResponse.ByDay day : byDayList) {
            String weekday = day.getWeekday();
            List<Long> visitIds = day.getVisitIds();
            List<String> visitNames = day.getVisitNames();
            List<String> arrivals = day.getArrivals();

            // 요일별 순번(order) 1부터 시작
            for (int i = 0; i < visitIds.size(); i++) {
                ConfirmTrip ct = new ConfirmTrip(
                        tripPlan,               // TripPlan 연결
                        visitIds.get(i),        // contentId
                        weekday,                // day
                        visitNames.get(i),      // name
                        arrivals.get(i).split(" ")[1],        // time
                        (long) i + 1            // order
                );
                ConfirmTrip save = confirmTripRepository.save(ct);
            }
        }
        cartRepository.deleteCart(tripPlan, findUser);

        return "redirect:/get-plan/" + tripPlan.getTripPlanID();
    }

    @GetMapping("/get-plan/{tripPlanId}")
    public String getPlan(@PathVariable Long tripPlanId, HttpSession session, Model model) {
        String userId = (String) session.getAttribute("userId");
        TripPlan findTripPlan = tripPlanRepository.findById(tripPlanId);
        List<ConfirmTrip> tripList = confirmTripRepository.findByTripPlan(findTripPlan);

        // 요일별로 그룹핑
        Map<String, List<ConfirmTrip>> tripsByDay = tripList.stream()
                .collect(Collectors.groupingBy(ConfirmTrip::getDay));

        // 요일 순서대로 정렬된 리스트 만들기
        List<List<ConfirmTrip>> scheduleList = new ArrayList<>();
        List<String> weekdays = List.of("월요일","화요일","수요일","목요일","금요일","토요일","일요일");

        for (String day : weekdays) {
            if (tripsByDay.containsKey(day)) {
                scheduleList.add(tripsByDay.get(day));
            }
        }

        // 모델에 담기
        model.addAttribute("scheduleList", scheduleList);

        return "mypage/page";
    }

    // JSON 이스케이프 메서드
    private String escapeJson(String str) {
        if (str == null) return "";
        return str.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }

}
