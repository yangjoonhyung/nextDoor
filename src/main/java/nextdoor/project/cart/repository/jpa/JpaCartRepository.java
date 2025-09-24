package nextdoor.project.cart.repository.jpa;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import nextdoor.project.cart.Cart;
import nextdoor.project.cart.repository.CartRepository;
import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.user.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class JpaCartRepository implements CartRepository {

    private final EntityManager em;

    @Override
    public Cart save(Cart cart) {
        em.persist(cart);
        return cart;
    }

    @Override
    public List<Cart> findByUser(User user) {
        String jpql = "select c from Cart c where c.user.userId = :userId";
        List<Cart> resultList = em.createQuery(jpql, Cart.class)
                .setParameter("userId", user.getUserId())
                .getResultList();

        return resultList;
    }

    @Override
    public void deleteByUserAndPlaceId(User user, String placeId) {
        String jpql = "delete from Cart c where c.user = :user and c.placeId = :placeId";
        em.createQuery(jpql)
                .setParameter("user", user)
                .setParameter("placeId", placeId)
                .executeUpdate();
    }

    @Override
    public List<Cart> findByTripPlanId(TripPlan tripPlan) {
        String jpql = "select c from Cart c where c.tripPlan.tripPlanId = :tripPlanId";
        List<Cart> resultList = em.createQuery(jpql, Cart.class)
                .setParameter("tripPlanId", tripPlan.getTripPlanID())
                .getResultList();

        return resultList;
    }

    @Override
    public void deleteCart(TripPlan tripPlan, User user) {
        String jpql = "delete from Cart c where c.tripPlan = :tripPlan and c.user = :user";
        em.createQuery(jpql)
                .setParameter("tripPlan", tripPlan)
                .setParameter("user", user)
                .executeUpdate();
    }
}
