package nextdoor.project.cart.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import nextdoor.project.api.Area;
import nextdoor.project.api.CallApi;
import nextdoor.project.cart.Cart;
import nextdoor.project.cart.repository.CartRepository;
import nextdoor.project.cart.service.CartService;
import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final CallApi callApi;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

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

        // AI 팀에 넘길 정보들
        List<Cart> sendList = cartRepository.findByTripPlanId(tripPlan);
        LocalDate startDate = tripPlan.getStartDate();
        LocalDate finishDate = tripPlan.getFinishDate();
        // 여기까지


        return "받아온 페이지로 리다이렉트 시키기";
    }

    @GetMapping("/get-plan/{tripPlanId}")
    public String getPlan(@PathVariable String tripPlanId, HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        // 현성이한테 받아서 사용하기
        // 리스트 생성
        return "보여주는 페이지";
    }

    @PostMapping("/get-plan/{tripPlanId}")
    public String goToMyPage(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        return "redirect:/my-page/plan";
    }

    // ai 서버로 보내기
}
