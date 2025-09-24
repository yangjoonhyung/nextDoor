package nextdoor.project.tripplan.repository;

import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.user.User;

import java.util.List;

public interface TripPlanRepository {

    TripPlan save(TripPlan tripPlan);

    List<TripPlan> findByUser(User user);

    TripPlan findById(Long tripPlanId);

}
