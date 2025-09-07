package nextdoor.project.cart.repository;

import nextdoor.project.cart.Cart;
import nextdoor.project.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository {

    Cart save(Cart cart);
    List<Cart> findByUser(User user);
    void deleteByUserAndPlaceId(User user, String placeId);
}
