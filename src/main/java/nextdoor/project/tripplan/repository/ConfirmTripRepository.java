package nextdoor.project.tripplan.repository;

import nextdoor.project.tripplan.ConfirmTrip;
import nextdoor.project.tripplan.TripPlan;

import java.util.List;

public interface ConfirmTripRepository {

    ConfirmTrip save(ConfirmTrip confirmTrip);

    List<ConfirmTrip> findByTripPlan(TripPlan tripPlan);
}
