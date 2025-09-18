package nextdoor.project.tripplan.repository;

import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.user.User;

import java.util.List;

public interface TripPlanRepository {

    List<TripPlan> findByUser(User user);

    TripPlan findById(Long tripPlanId);

}
