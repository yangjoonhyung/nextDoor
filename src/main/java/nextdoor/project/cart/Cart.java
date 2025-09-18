package nextdoor.project.cart;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import nextdoor.project.tripplan.TripPlan;
import nextdoor.project.user.User;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Cart {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //아이템 id

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;
    private String placeId;     // api 받아오는 id

    @ManyToOne
    @JoinColumn(name = "trip_plan_id", referencedColumnName = "tripPlanId")
    private TripPlan tripPlan;

    public Cart() {

    }

    public Cart(User user, String placeId, TripPlan tripPlan) {
        this.user = user;
        this.placeId = placeId;
        this.tripPlan = null;
    }
}