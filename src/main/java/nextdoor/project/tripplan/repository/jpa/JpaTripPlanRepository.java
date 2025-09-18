package nextdoor.project.tripplan.repository.jpa;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.tripplan.repository.TripPlanRepository;
import nextdoor.project.user.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class JpaTripPlanRepository implements TripPlanRepository {

    private final EntityManager em;

    @Override
    public List<TripPlan> findByUser(User user) {
        String jpql = "select tripPlan from tripPlan t where t.user.userId = :userId";
        List<TripPlan> userList = em.createQuery(jpql, TripPlan.class)
                .setParameter("userId", user.getUserId())
                .getResultList();
        return userList;
    }

    @Override
    public TripPlan findById(Long tripPlanId) {
        TripPlan tripPlan = em.find(TripPlan.class, tripPlanId);
        return tripPlan;
    }
}
