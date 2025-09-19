package nextdoor.project.tripplan.repository.jpa;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import nextdoor.project.tripplan.ConfirmTrip;
import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.tripplan.repository.ConfirmTripRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class JpaConfirmTripRepository implements ConfirmTripRepository {

    private final EntityManager em;

    @Override
    public ConfirmTrip save(ConfirmTrip confirmTrip) {
        em.persist(confirmTrip);

        return confirmTrip;
    }

    @Override
    public List<ConfirmTrip> findByTripPlan(TripPlan tripPlan) {
        String jpql = "select confirmTrip from confirmTrip c where c.tripPlan.tripPlanId = :tripPlanId";
        List<ConfirmTrip> resultList = em.createQuery(jpql, ConfirmTrip.class)
                .setParameter("tripPlanId", tripPlan.getTripPlanID())
                .getResultList();
        return resultList;
    }
}
