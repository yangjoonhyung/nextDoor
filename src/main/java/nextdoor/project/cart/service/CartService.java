package nextdoor.project.cart.service;

import lombok.RequiredArgsConstructor;
import nextdoor.project.cart.Cart;
import nextdoor.project.cart.repository.CartRepository;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    // 장바구니 담기
    public void addCart(String userId, String placeId) {
        User user = userRepository.findById(userId);
        Cart item = new Cart();
        item.setUser(user);
        item.setPlaceId(placeId);
        cartRepository.save(item);
    }

    // 내 장바구니 조회
    public List<Cart> getCart(String userId) {
        User user = userRepository.findById(userId);
        return cartRepository.findByUser(user);
    }

    // 장바구니 삭제
    public void removeCart(String userId, String placeId) {
        User user = userRepository.findById(userId);
        cartRepository.deleteByUserAndPlaceId(user, placeId);
    }

}
