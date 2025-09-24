package nextdoor.project.tripplan;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ConfirmTrip {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @ManyToOne
    @JoinColumn(name = "trip_plan_id", referencedColumnName = "tripPlanId")
    private TripPlan tripPlan;

    private Long contentId;
    private String day;
    private String name;
    private String time;
    private Long tripOrder;

    public ConfirmTrip() {
    }

    public ConfirmTrip(TripPlan tripPlan, Long contentId, String day, String name, String time, Long tripOrder) {
            this.tripPlan = tripPlan;
            this.contentId = contentId;
            this.day = day;
            this.name = name;
            this.time = time;
            this.tripOrder = tripOrder;
        }
    }