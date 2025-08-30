package nextdoor.project.cart.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import nextdoor.project.cart.service.CartService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public String addCart(@RequestParam String placeId, @RequestParam String placeName, HttpSession session){
        String userId = (String) session.getAttribute("userId");

        cartService.addCart(userId, placeId, placeName);
        return "redirect:/cart/list";
    }

    // 장바구니 목록
    @GetMapping("/list")
    public String cartList(HttpSession session, Model model) {
        String userId = (String) session.getAttribute("loginUserId");
        model.addAttribute("cartItems", cartService.getCart(userId));
        return "cart/list";
    }

    // 삭제
    @PostMapping("/remove")
    public String removeFromCart(@RequestParam String placeId, HttpSession session) {
        String userId = (String) session.getAttribute("loginUserId");
        cartService.removeCart(userId, placeId);
        return "redirect:/cart/list";
    }
}
