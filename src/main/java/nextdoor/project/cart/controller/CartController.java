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

    private final Map<Integer, String> mappingDate = Map.of(
            1, "월요일",
            2, "화요일",
            3, "수요일",
            4, "목요일",
            5, "금요일",
            6, "토요일",
            7, "일요일"
    );

    // 장바구니 목록
    @GetMapping("/list")
    public String cartList(HttpSession session, Model model) {
        String userId = (String) session.getAttribute("userId");
        List<Cart> cart = cartService.getCart(userId);
        if (cart != null) {
            model.addAttribute("cartItems", cart);
        }

        // 담을 수 있는 관광지 리스트 표기 - 프론트에서 받아오기
        // 지희한테 버튼 만들어달라해서 밑에 한줄 따로 @postMapping 빼기 이거 할 때 준형이한테 말하기
        List<Area> areaList = callApi.callApi("서울", "관광지");
        model.addAttribute("areaList", areaList);
        return "cart/list";
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

    @PostMapping("/set-plan")
    public String setPlan(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        User findUser = userRepository.findById(userId);
        // 시작 연 원 일 도착 연 월 일 지희한테 받아서 여기 입력할 수 있게하기
        TripPlan tripPlan = new TripPlan(findUser, 1, 1, 1, 1, 1, 1);

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

    @PostMapping("/get-plan/{tripPlanId}")
    public String goToMyPage(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        return "redirect:/my-page/plan";
    }

    // ai 서버로 보내기
}
